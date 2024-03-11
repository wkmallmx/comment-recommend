import {
    BarChart,
    Bar,
    LineChart,
    Line,
    Legend,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Cell,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import React, {useEffect, useRef} from 'react';
import ReactWordcloud from 'react-wordcloud';
import * as d3 from 'd3';

const COLORS = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];

const df_1 = [
    {"year": 2005, "count": 854},
    {"year": 2006, "count": 3853},
    {"year": 2007, "count": 15363},
    {"year": 2008, "count": 48226},
    {"year": 2009, "count": 74387},
    {"year": 2010, "count": 138587},
    {"year": 2011, "count": 230813},
    {"year": 2012, "count": 286570},
    {"year": 2013, "count": 383950},
    {"year": 2014, "count": 522275},
    {"year": 2015, "count": 688415},
    {"year": 2016, "count": 758882},
    {"year": 2017, "count": 820048},
    {"year": 2018, "count": 906362},
    {"year": 2019, "count": 907284},
    {"year": 2020, "count": 554557},
    {"year": 2021, "count": 618189},
    {"year": 2022, "count": 31665},
]
const df_2 = [
    {name: "Starbucks", count: 5877},
    {name: "First Watch", count: 4550},
    {name: "Reading Terminal ...", count: 4014},
    {name: "Oceana Grill", count: 4012},
    {name: "Acme Oyster House", count: 3979},
    {name: "Hattie B’s Hot Ch...", count: 3838},
    {name: "Los Agaves", count: 3496},
    {name: "Chick-fil-A", count: 3473},
    {name: "Ruby Slipper Cafe", count: 3360},
    {name: "Commander's Palace", count: 3095},
    {name: "Ruby Slipper - Ne...", count: 3075},
    {name: "Pappy's Smokehouse", count: 2675},
    {name: "Cochon Butcher", count: 2625},
    {name: "Cochon", count: 2434},
    {name: "Luke", count: 2365},
    {name: "Sabrina's Café", count: 2317},
    {name: "Zahav", count: 2282},
    {name: "Biscuit Love: Gulch", count: 2272},
    {name: "Enterprise Rent-A...", count: 2269},
    {name: "European Wax Center", count: 2251},
]

const df_3 = [
    {categories: "Chinese", count: 221083},
    {categories: "Mexican", count: 432248},
    {categories: "American", count: 1730875},
]

const df_4 = [
    {"word": "go back", "cnt": 7991},
    {"word": "first time", "cnt": 6977},
    {"word": "customer service", "cnt": 6203},
    {"word": "highly recommend", "cnt": 6178},
    {"word": "really good", "cnt": 5734},
    {"word": "come back", "cnt": 5723},
    {"word": "food good", "cnt": 5192},
    {"word": "ice cream", "cnt": 5108},
    {"word": "new orleans", "cnt": 4706},
    {"word": "next time", "cnt": 4702},
    {"word": "great place", "cnt": 4693},
    {"word": "pretty good", "cnt": 4683},
    {"word": "great service", "cnt": 4350},
    {"word": "staff friendly", "cnt": 3955},
    {"word": "love place", "cnt": 3852},
    {"word": "happy hour", "cnt": 3511},
    {"word": "one best", "cnt": 3142},
    {"word": "definitely back", "cnt": 2491},
    {"word": "last night", "cnt": 2283},
    {"word": "st louis", "cnt": 2262},
]

const df_5 = [
    {"words ": "highly recommend", "cnt": 5989},
    {"words ": "first time", "cnt": 4838},
    {"words ": "go back", "cnt": 4793},
    {"words ": "really good", "cnt": 4486},
    {"words ": "great food", "cnt": 4230},
    {"words ": "great place", "cnt": 4149},
    {"words ": "ice cream", "cnt": 4041},
    {"words ": "come back", "cnt": 3890},
    {"words ": "great service", "cnt": 3867},
    {"words ": "new orleans", "cnt": 3849},
]

const df_6 = [
    {"words ": "go back", "cnt": 3198},
    {"words ": "customer service", "cnt": 3135},
    {"words ": "food good", "cnt": 2170},
    {"words ": "pretty good", "cnt": 2140},
    {"words ": "first time", "cnt": 2139},
    {"words ": "come back", "cnt": 1833},
    {"words ": "tasted like", "cnt": 1571},
    {"words ": "even though", "cnt": 1516},
    {"words ": "next time", "cnt": 1234},
    {"words ": "much better", "cnt": 1154},
]

const df_7 = [
    {categories: "cool", count: 1612316},
    {categories: "useful", count: 3149790},
    {categories: "funny", count: 1096163},
]

const df_8 = [
    {"year": 2005, "user_id": "n-lBS02-3yvlY5Q91mmwDA", "max_reviews": 171},
    {"year": 2006, "user_id": "gfQqQYI5_hCAGEHlHXIz2Q", "max_reviews": 137},
    {"year": 2007, "user_id": "0yYCMhDWCEIVUyZLzDWwqQ", "max_reviews": 316},
    {"year": 2008, "user_id": "bnVzSHI48lEHPaEzZNIqJg", "max_reviews": 413},
    {"year": 2009, "user_id": "_BcWyKQL16ndpBdggh2kNA", "max_reviews": 407},
    {"year": 2010, "user_id": "f9lq4KAus-xCsmJmjXeKVw", "max_reviews": 381},
    {"year": 2011, "user_id": "1HM81n6n4iPIFU5d2Lokhw", "max_reviews": 292},
    {"year": 2012, "user_id": "1HM81n6n4iPIFU5d2Lokhw", "max_reviews": 413},
    {"year": 2013, "user_id": "zYFGMy1_thjMnvQLX6JNBw", "max_reviews": 331},
    {"year": 2014, "user_id": "EQpFHqGT9Tk6YSwORTtwpg", "max_reviews": 287},
    {"year": 2015, "user_id": "vYMvOTL31e0KbTo9Hd0tjg", "max_reviews": 343},
    {"year": 2016, "user_id": "B1OVDsstzC_RaESmtd1oWQ", "max_reviews": 355},
    {"year": 2017, "user_id": "qcf3A5mtPntTmmSfADo6tg", "max_reviews": 302},
    {"year": 2018, "user_id": "wXdbkFZsfDR7utJvbWElyA", "max_reviews": 367},
    {"year": 2019, "user_id": "wXdbkFZsfDR7utJvbWElyA", "max_reviews": 400},
    {"year": 2020, "user_id": "Sp2GV7D-_JLZMPQmDanzPQ", "max_reviews": 216},
    {"year": 2021, "user_id": "xalgcjscRLNPuyaAeKNThA", "max_reviews": 242},
    {"year": 2022, "user_id": "vjLQ8F8opdDXGyXISRnuYQ", "max_reviews": 39},
]

const df_9 = [
    {"text": "go back", "value": 7991},
    {"text": "first time", "value": 6977},
    {"text": "customer service", "value": 6203},
    {"text": "highly recommend", "value": 6178},
    {"text": "really good", "value": 5734},
    {"text": "come back", "value": 5723},
    {"text": "food good", "value": 5192},
    {"text": "ice cream", "value": 5108},
    {"text": "great food", "value": 4755},
    {"text": "new orleans", "value": 4706},
    {"text": "next time", "value": 4702},
    {"text": "great place", "value": 4693},
    {"text": "pretty good", "value": 4683},
    {"text": "great service", "value": 4350},
    {"text": "good food", "value": 4001},
    {"text": "staff friendly", "value": 3955},
    {"text": "food great", "value": 3890},
    {"text": "love place", "value": 3852},
    {"text": "every time", "value": 3754},
    {"text": "even though", "value": 3626},
    {"text": "service great", "value": 3608},
    {"text": "happy hour", "value": 3511},
    {"text": "make sure", "value": 3316},
    {"text": "one best", "value": 3142},
    {"text": "feel like", "value": 3018},
    {"text": "going back", "value": 2891},
    {"text": "good service", "value": 2648},
    {"text": "service good", "value": 2633},
    {"text": "coming back", "value": 2623},
    {"text": "friendly staff", "value": 2521},
    {"text": "food service", "value": 2496},
    {"text": "definitely back", "value": 2491},
    {"text": "last night", "value": 2283},
    {"text": "st louis", "value": 2262},
    {"text": "much better", "value": 2234},
    {"text": "place go", "value": 2185},
    {"text": "long time", "value": 2141},
    {"text": "place great", "value": 2138},
    {"text": "definitely recommend", "value": 2103},
    {"text": "tasted like", "value": 2080},
    {"text": "recommend place", "value": 2078},
    {"text": "fried chicken", "value": 2042},
    {"text": "front desk", "value": 2039},
    {"text": "mac cheese", "value": 2003},
    {"text": "great experience", "value": 1981},
    {"text": "wait staff", "value": 1961},
    {"text": "really nice", "value": 1957},
    {"text": "super friendly", "value": 1907},
    {"text": "felt like", "value": 1903},
    {"text": "food delicious", "value": 1891},
    {"text": "french toast", "value": 1870},
    {"text": "last time", "value": 1836},
    {"text": "came back", "value": 1821},
    {"text": "one favorite", "value": 1810},
    {"text": "sweet potato", "value": 1784},
    {"text": "really enjoyed", "value": 1783},
    {"text": "friendly helpful", "value": 1678},
    {"text": "santa barbara", "value": 1660},
    {"text": "parking lot", "value": 1660},
    {"text": "pretty much", "value": 1645},
    {"text": "friendly service", "value": 1642},
    {"text": "top notch", "value": 1642},
    {"text": "beer selection", "value": 1616},
    {"text": "gave us", "value": 1614},
    {"text": "back try", "value": 1601},
    {"text": "right away", "value": 1599},
    {"text": "several times", "value": 1598},
    {"text": "good place", "value": 1573},
    {"text": "reasonably priced", "value": 1559},
    {"text": "quality food", "value": 1511},
    {"text": "mexican food", "value": 1503},
    {"text": "told us", "value": 1499},
    {"text": "pulled pork", "value": 1498},
    {"text": "fast food", "value": 1495},
    {"text": "great job", "value": 1479},
    {"text": "food amazing", "value": 1470},
    {"text": "next day", "value": 1461},
    {"text": "gluten free", "value": 1443},
    {"text": "service food", "value": 1442},
    {"text": "shrimp grits", "value": 1435},
    {"text": "well worth", "value": 1432},
    {"text": "definitely go", "value": 1425},
    {"text": "go wrong", "value": 1419},
    {"text": "years ago", "value": 1410},
    {"text": "live music", "value": 1410},
    {"text": "little bit", "value": 1400},
    {"text": "looked like", "value": 1395},
    {"text": "great atmosphere", "value": 1394},
    {"text": "food came", "value": 1385},
    {"text": "service excellent", "value": 1361},
    {"text": "looking forward", "value": 1354},
    {"text": "saturday night", "value": 1347},
    {"text": "second time", "value": 1338},
    {"text": "nothing special", "value": 1337},
    {"text": "really like", "value": 1313},
    {"text": "service friendly", "value": 1308},
    {"text": "across street", "value": 1308},
    {"text": "wait go", "value": 1305},
    {"text": "many times", "value": 1305},
    {"text": "food always", "value": 1300},
    {"text": "looks like", "value": 1297},
    {"text": "next door", "value": 1294},
    {"text": "definitely worth", "value": 1292},
    {"text": "friday night", "value": 1262},
    {"text": "went back", "value": 1261},
    {"text": "even better", "value": 1261},
    {"text": "bread pudding", "value": 1252},
    {"text": "prices reasonable", "value": 1251},
    {"text": "year old", "value": 1249},
    {"text": "delicious food", "value": 1247},
    {"text": "always good", "value": 1243},
    {"text": "highly recommended", "value": 1242},
    {"text": "give place", "value": 1234},
    {"text": "great time", "value": 1232},
    {"text": "dining experience", "value": 1217},
    {"text": "best part", "value": 1215},
    {"text": "definitely come", "value": 1213},
    {"text": "also good", "value": 1208},
    {"text": "excellent service", "value": 1186},
    {"text": "minutes later", "value": 1185},
    {"text": "first visit", "value": 1165},
    {"text": "fried rice", "value": 1164},
    {"text": "like place", "value": 1161},
    {"text": "get food", "value": 1148},
    {"text": "always great", "value": 1146},
    {"text": "worth wait", "value": 1142},
    {"text": "time go", "value": 1140},
    {"text": "really great", "value": 1139},
    {"text": "try place", "value": 1138},
    {"text": "food excellent", "value": 1133},
    {"text": "pad thai", "value": 1123},
    {"text": "place get", "value": 1115},
    {"text": "give stars", "value": 1110},
    {"text": "nice place", "value": 1109},
    {"text": "one thing", "value": 1106},
    {"text": "staff always", "value": 1105},
    {"text": "seems like", "value": 1103},
    {"text": "french quarter", "value": 1098},
    {"text": "dining room", "value": 1093},
    {"text": "place good", "value": 1090},
    {"text": "food really", "value": 1071},
    {"text": "also ordered", "value": 1068},
    {"text": "love love", "value": 1059},
    {"text": "great selection", "value": 1051},
    {"text": "must try", "value": 1049},
    {"text": "well done", "value": 1048},
    {"text": "place eat", "value": 1035},
    {"text": "give try", "value": 1035},
    {"text": "service always", "value": 1035},
    {"text": "back next", "value": 1030},
    {"text": "great location", "value": 1028},
    {"text": "also great", "value": 1021},
    {"text": "seemed like", "value": 1020},
    {"text": "always friendly", "value": 1008},
    {"text": "amazing food", "value": 1003},
    {"text": "everything else", "value": 1000},
    {"text": "never go", "value": 999},
    {"text": "pleasantly surprised", "value": 994},
    {"text": "waited minutes", "value": 987},
    {"text": "also got", "value": 985},
    {"text": "staff great", "value": 973},
    {"text": "always get", "value": 972},
    {"text": "outdoor seating", "value": 970},
    {"text": "late night", "value": 967},
    {"text": "long wait", "value": 958},
    {"text": "look forward", "value": 957},
    {"text": "anywhere else", "value": 957},
    {"text": "go place", "value": 953},
    {"text": "decided try", "value": 952},
    {"text": "time went", "value": 948},
    {"text": "took minutes", "value": 947},
    {"text": "good time", "value": 942},
    {"text": "food ok", "value": 936},
    {"text": "super nice", "value": 935},
    {"text": "chinese food", "value": 934},
    {"text": "behind counter", "value": 930},
    {"text": "somewhere else", "value": 929},
    {"text": "food drinks", "value": 927},
    {"text": "absolutely delicious", "value": 926},
    {"text": "one star", "value": 917},
    {"text": "good great", "value": 917},
    {"text": "really liked", "value": 910},
    {"text": "goat cheese", "value": 910},
    {"text": "menu items", "value": 904},
    {"text": "friendly attentive", "value": 902},
]

const df_10 = [
    {
    word: "go back",
    related_words: [
        "first time",
        "customer service",
        "really good",
        "have ever",
        "next time",
        "pretty good",
        "even though"
    ]
},{
    word: "first time",
    related_words: [
        "go back",
        "customer service",
        "highly recommend",
        "really good",
        "come back",
        "have ever",
        "next time",
        "going back"
    ]
},{
    word: "customer service",
    related_words: [
        "go back",
        "first time",
        "come back",
        "have ever",
        "make sure"
    ]
},{
    word: "highly recommend",
    related_words: [
        "first time",
        "have ever"
    ]
},{
    word: "really good",
    related_words: [
        "go back",
        "first time",
        "come back",
        "have ever",
        "pretty good",
        "good food"
    ]
},{
    word: "come back",
    related_words: [
        "first time",
        "customer service",
        "really good",
        "have ever",
        "next time",
        "pretty good"
    ]
},{
    word: "ice cream",
    related_words: [
        "have ever"
    ]
},{
    word: "have ever",
    related_words: [
        "go back",
        "first time",
        "customer service",
        "highly recommend",
        "really good",
        "come back",
        "ice cream",
        "next time",
        "every time",
        "make sure"
    ]
},{
    word: "next time",
    related_words: [
        "go back",
        "first time",
        "come back",
        "have ever"
    ]
},{
    word: "pretty good",
    related_words: [
        "go back",
        "really good",
        "come back"
    ]
},{
    word: "good food",
    related_words: [
        "really good"
    ]
},{
    word: "every time",
    related_words: [
        "have ever"
    ]
},{
    word: "even though",
    related_words: [
        "go back"
    ]
},{
    word: "make sure",
    related_words: [
        "customer service",
        "have ever"
    ]
}
]

export const Draw_LineChart_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={df_1}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="year"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="count" stroke="#FFFF00" activeDot={{r: 8}} dot={{fill: '#FFFFFF'}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export const Draw_Bar_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_2}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="count" fill="#8884d8">
                    {
                        df_2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
export const Draw_Pie_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={df_3}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="categories"
                    label={(entry) => entry.name}
                >
                    {
                        df_3.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Pie>
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export const Draw_Bar_2 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_4}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="word"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="cnt" fill="#8884d8">
                    {
                        df_4.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export const Draw_Bar_3 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_5}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="words "/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="cnt" fill="#8884d8">
                    {
                        df_5.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export const Draw_Bar_4 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_6}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="words "/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="cnt" fill="#8884d8">
                    {
                        df_6.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export const Draw_Pie_2 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={df_7}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="categories"
                    label={(entry) => entry.name}
                >
                    {
                        df_7.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Pie>
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export const Draw_Bar_5 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_8.map(item => ({
                    ...item,
                    yearId: `${item.year} (user_id:${item.user_id})`,
                }))}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="yearId"/>
                <YAxis domain={["auto", "auto"]}/>
                <Tooltip/>
                <Bar dataKey="max_reviews" fill="#8884d8">
                    {
                        df_2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

const fontSizes: [number, number] = [8, 64];

const options = {
    fontSizes,
};

export const Draw_Wordcloud_1 = () => {
    return <ReactWordcloud words={df_9} options={options}/>;
};

interface Node extends d3.SimulationNodeDatum {
    id: string;
    group: number;
    x?: number;
    y?: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: string | Node;
    target: string | Node;
    value: number;
}

export const Draw_WordRelation_1 = () => {
    const nodes: Node[] = [];
    const links: Link[] = [];
    const nodeSet = new Set();

    df_10.forEach(item => {
        if (!nodeSet.has(item.word)) {
            nodes.push({id: item.word, group: 1});
            nodeSet.add(item.word);
        }

        item.related_words.forEach(word => {
            if (!nodeSet.has(word)) {
                nodes.push({id: word, group: 2});
                nodeSet.add(word);
            }
        });
    });

    df_10.forEach(item => {
        item.related_words.forEach(relatedWord => {
            links.push({
                source: item.word,
                target: relatedWord,
                value: 1
            });
        });
    });

    const svgRef = useRef(null);

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            const width = +svg.attr("width");
            const height = +svg.attr("height");

            // 清空 SVG 内容以避免重复绘制
            svg.selectAll("*").remove();

            // 创建力学模拟
            const simulation = d3.forceSimulation<Node>(nodes)
                .force("link", d3.forceLink<Node, Link>(links).id((d: any)=> d.id).distance(200))
                .force("charge", d3.forceManyBody().strength(-800))
                .force("center", d3.forceCenter(width / 2, height / 2));

            const drag = (simulation: any) => {
                const dragstarted = (event: any) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    event.subject.fx = event.subject.x;
                    event.subject.fy = event.subject.y;
                }

                const dragged = (event: any) => {
                    event.subject.fx = event.x;
                    event.subject.fy = event.y;
                }

                const dragended = (event: any) => {
                    if (!event.active) simulation.alphaTarget(0);
                    event.subject.fx = null;
                    event.subject.fy = null;
                }

                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
            }


            // 绘制连线
            const link = svg.append("g")
                .attr("stroke", "#FFFF00")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", d => Math.sqrt(d.value));

            // 绘制结点

            const node = svg.append("g")
                .attr("stroke", "#FFFFFF")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("r", 5)
                .attr("fill", d => d.group === 1 ? "red" : "blue")
                .call(drag(simulation) as any);

            node.append("title")
                .text((d: any) => d.id);

            const labels = svg.append("g")
                .attr("class", "labels")
                .selectAll("text")
                .data(nodes)
                .enter().append("text")
                .text((d: any) => d.id) // 假设 d.id 包含了节点代表的单词
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y)
                .attr("dy", "-0.5em")
                .style("font-size", "24px") // 可以调整文本大小
                .style("text-anchor", "middle")// 使文本居中对齐于节点
                .style("fill", "#EE82EE")


            labels.style("pointer-events", "none");

            // 更新结点和连线的位置
            simulation.on("tick", () => {
                link
                    .attr("x1", (d: any) => d.source.x)
                    .attr("y1", (d: any) => d.source.y)
                    .attr("x2", (d: any) => d.target.x)
                    .attr("y2", (d: any) => d.target.y);

                node
                    .attr("cx", (d: any) => d.x)
                    .attr("cy", (d: any) => d.y);

                labels
                    .attr("x", (d: any) => d.x)
                    .attr("y", (d: any) => d.y);
            });


        }

    }, [nodes, links]); // 依赖于 nodes 和 links，当它们变化时重新渲染

    return <svg ref={svgRef} width="1200" height="600" viewBox="0 0 1200 600"></svg>;
};