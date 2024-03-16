from transformers import AutoTokenizer, CLIPTextModelWithProjection
import torch.nn.functional as F
import torch
import pandas as pd
import numpy as np
import math


class Search_Recommend_Module():
    def __init__(self):
        super().__init__()
        self.model = CLIPTextModelWithProjection.from_pretrained(
            "openai/clip-vit-base-patch32", cache_dir="public/search")
        self.tokenizer = AutoTokenizer.from_pretrained(
            "openai/clip-vit-base-patch32", cache_dir="public/search")
        self.business_data = pd.read_json(
            "public/search/yelp_academic_dataset_business.json", lines=True)  # 改一下路径
        categories = pd.read_excel("public/search/categories.xlsx")
        attributes = pd.read_excel("public/search/attributes.xlsx")  # 把对应文件加上去
        self.attributes = attributes['Attribute'].tolist()
        self.categories = categories['Category'].tolist()
        self.attributes_embedding = pd.read_json(
            "public/search/attribute_encodings.json")
        self.attributes_embedding = self.attributes_embedding.values
        self.attributes_embedding = torch.from_numpy(
            self.attributes_embedding.T)
        self.categories_embedding = pd.read_json(
            "public/search/category_encodings.json")
        self.categories_embedding = self.categories_embedding.values
        self.categories_embedding = torch.from_numpy(
            self.categories_embedding.T)
        self.user_embedding = pd.read_json("public/search/user_encodings.json")
        self.user = pd.read_excel("public/search/user.xlsx")
    # wzy：修改计算距离方法，使用球面距离计算

    def cal_distance(self, lat1, lon1, lat2, lon2):
        """
        Calculate the great circle distance between two points
        on the earth (specified in decimal degrees)
        """
        # 将十进制度数转化为弧度
        lon1, lat1, lon2, lat2 = map(math.radians, [float(
            lon1), float(lat1), float(lon2), float(lat2)])
        # haversine 公式
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * \
            math.cos(lat2) * math.sin(dlon / 2) ** 2
        c = 2 * math.asin(math.sqrt(a))
        r = 6371  # 地球平均半径，单位为公里
        return c * r

    def select(self, row, selected_categories, selected_attributes):  # 筛选商户
        if (row['categories'] != None):
            if any(word in row['categories'] for word in selected_categories["category"]):
                return True
        if (row['attributes'] != None):
            attributes = row['attributes']
            for w in selected_attributes["attribute"]:
                if w in attributes and attributes[w] == "True":
                    return True
        return False

    def score(self, row, attributes_sim, categories_sim, k):
        score = 0
        weight = 1
        if (row['categories'][k] != None):
            str_value = row["categories"][k].replace(',', ' ')
            categories_list = str_value.split()
            for i in range(len(categories_sim)):
                for j in range(len(categories_list)):
                    if (categories_sim["category"][i] == categories_list[j]):
                        score += categories_sim["sim"][i]*weight
                        weight *= 0.8
        weight = 1
        if (row['attributes'][k] != None):
            attributes = row['attributes'][k]
            for i in range(len(attributes_sim)):
                for w in attributes:
                    if attributes_sim["attribute"][i] == w and attributes[w] == "True":
                        score += attributes_sim["sim"][i] * weight
                        weight *= 0.8
        return score

    def score_business(self, selected_business, attributes_sim, categories_sim):  # 计算匹配度分数
        scores = []
        for i in range(len(selected_business)):
            score = self.score(selected_business,
                               attributes_sim, categories_sim, k=i)
            scores.append(score)
            # print(selected_business["name"][i], score)
        selected_business["score"] = pd.Series(scores)

        return selected_business

    # 使用信息茧房需要用户embedding，做完推荐系统才能搞这个
    def search_business(self, latitude, longitude, search_text, user_id=None, limit_distance=None, Info_Cocoons=False, is_recommend=False):
        if limit_distance == None:
            limit_distance = 5
        else:
            pass
        distances = []
        res = pd.DataFrame(columns=self.business_data.columns)
        for i in range(len(self.business_data)):
            # print(cal_distance(df["latitude"][i],df["longitude"][i],latitude,-longitude))
            distance = self.cal_distance(
                self.business_data["latitude"][i], self.business_data["longitude"][i], latitude, longitude)
            if (distance < limit_distance):
                res.loc[len(res)] = self.business_data.loc[i]
                distances.append(distance)
        distances = pd.Series(distances)
        res["distance"] = distances
        if (is_recommend == False):
            inputs = self.tokenizer(
                search_text, padding=True, return_tensors="pt")
            outputs = self.model(**inputs)
            text_embeds = outputs.text_embeds
        else:
            text_embeds = search_text

        attributes_sim = F.cosine_similarity(
            text_embeds.reshape(-1, 512), self.attributes_embedding.unsqueeze(0), dim=2)
        categories_sim = F.cosine_similarity(
            text_embeds.reshape(-1, 512), self.categories_embedding.unsqueeze(0), dim=2)
        attributes_sim_df = pd.DataFrame()
        attributes_sim_df["attribute"] = pd.Series(self.attributes)
        attributes_sim_df["sim"] = pd.Series(
            attributes_sim[0].detach().numpy())
        categories_sim_df = pd.DataFrame()
        categories_sim_df["category"] = pd.Series(self.categories)
        categories_sim_df["sim"] = pd.Series(
            categories_sim[0].detach().numpy())
        attributes_sim_df = attributes_sim_df.sort_values(
            'sim', ascending=False)
        categories_sim_df = categories_sim_df.sort_values(
            'sim', ascending=False)
        top_attributs = attributes_sim_df.head(5)
        top_attributs = top_attributs.reset_index()
        top_categories = categories_sim_df.head(30)
        top_categories = top_categories.reset_index()
        selected_business = res[res.apply(
            self.select, axis=1, selected_categories=top_categories, selected_attributes=top_attributs)]

        selected_business = selected_business.reset_index()
        selected_business = self.score_business(
            selected_business, top_attributs, top_categories)
        selected_business = selected_business.sort_values(
            'score', ascending=False)
        return selected_business.head(100)

    def search_user(self, latitude, longtitude, search_text, user_id=None, limit_distance=None, Info_Cocoons=False, is_recommend=False):
        if (is_recommend == False):
            inputs = self.tokenizer(
                search_text, padding=True, return_tensors="pt")
            outputs = self.model(**inputs)
            text_embeds = outputs.text_embeds
        else:
            text_embeds = search_text
        all_user_embedding = self.user_embedding.values
        all_user_embedding = torch.from_numpy(all_user_embedding.T)
        sim = F.cosine_similarity(
            text_embeds.reshape(-1, 512), all_user_embedding.unsqueeze(0), dim=2)
        user = pd.DataFrame()
        user["user_id"] = self.user["user_id"]
        user["sim"] = pd.Series(sim[0].detach().numpy())
        user = user.sort_values("sim", ascending=False)
        selected_user = user.head(100)
        selected_user_id = selected_user["user_id"].tolist()
        res = self.user[self.user['user_id'].isin(selected_user_id)]
        return res.head(100)

    def recommend_business(self, latitude, longtitude, user_id=None, limit_distance=None, Info_Cocoons=False):
        user_embedding = self.user_embedding[user_id].values
        user_embedding = torch.from_numpy(user_embedding.T)
        res = self.search_business(latitude, longtitude, search_text=user_embedding, user_id=user_id,
                                   limit_distance=limit_distance, Info_Cocoons=Info_Cocoons, is_recommend=True)
        return res.head(100)

    def recommend_user(self, latitude, longtitude, user_id=None, limit_distance=None, Info_Cocoons=False):
        user_embedding = self.user_embedding[user_id].values
        user_embedding = torch.from_numpy(user_embedding.T)
        res = self.search_user(latitude, longtitude, search_text=user_embedding, user_id=user_id,
                               limit_distance=limit_distance, Info_Cocoons=Info_Cocoons, is_recommend=True)
        return res.head(10)


"""
需要安装
pip install torch
pip install transformers
pip install thefuzz
clip_text_encoder运行代码会自动安装
"""
"""search_text="search a user"
search_recommend=Search_Recommend_Module()
res=search_recommend.search_user(latitude=40,longtitude=-75,search_text=search_text)
print(res)"""
search_module = Search_Recommend_Module()
