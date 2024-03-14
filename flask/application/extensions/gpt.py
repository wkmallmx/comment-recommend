from openai import OpenAI
client = OpenAI(
    api_key="sk-MiYCdEnRkCqsz2s1WyWNhgFysAcrrDyrGSyT0rxIU2AvbCG4",
    base_url="https://api.chatanywhere.tech"
)

def get_suggestion(business_df : list, result : list):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "你是一个点评推荐系统，用来给商家提出经营建议。\
          现在，我会告诉你商家的基本信息，以及相比于同类型商家，他缺少的属性。\
            你需要根据这些信息，给出一个完整的经营建议。"},
        {"role": "user", "content": "商家信息："+ business_df + "缺少的属性："+ result},
    ]
    )
    return completion.choices[0].message.content

