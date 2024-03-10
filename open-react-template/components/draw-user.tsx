import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import React from 'react';

const COLORS = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];

const df_1 = [
    {"registration_year": 2004, "count": 90},
    {"registration_year": 2005, "count": 937},
    {"registration_year": 2006, "count": 5423},
    {"registration_year": 2007, "count": 15340},
    {"registration_year": 2008, "count": 31097},
    {"registration_year": 2009, "count": 64911},
    {"registration_year": 2010, "count": 109054},
    {"registration_year": 2011, "count": 176435},
    {"registration_year": 2012, "count": 195955},
    {"registration_year": 2013, "count": 209762},
    {"registration_year": 2014, "count": 233465},
    {"registration_year": 2015, "count": 247850},
    {"registration_year": 2016, "count": 217620},
    {"registration_year": 2017, "count": 151024},
    {"registration_year": 2018, "count": 133568},
    {"registration_year": 2019, "count": 104655},
    {"registration_year": 2020, "count": 47444},
    {"registration_year": 2021, "count": 40485},
    {"registration_year": 2022, "count": 2782},
]

const df_2 = [
    {"elite_year": "2006", "elite_count": 775},
    {"elite_year": "2007", "elite_count": 2023},
    {"elite_year": "2008", "elite_count": 3185},
    {"elite_year": "2009", "elite_count": 5479},
    {"elite_year": "2010", "elite_count": 8772},
    {"elite_year": "2011", "elite_count": 10997},
    {"elite_year": "2012", "elite_count": 15222},
    {"elite_year": "2013", "elite_count": 16193},
    {"elite_year": "2014", "elite_count": 18571},
    {"elite_year": "2015", "elite_count": 24175},
    {"elite_year": "2016", "elite_count": 29636},
    {"elite_year": "2017", "elite_count": 36015},
    {"elite_year": "2018", "elite_count": 41009},
    {"elite_year": "2019", "elite_count": 44044},
    {"elite_year": "2021", "elite_count": 44542},
]

const df_3 = [
    {"name": "Fox", "user_id": "Hi10sGSZNxQH3NLyWSZ1oA", "review_count": 17473},
    {"name": "Victor", "user_id": "8k3aO-mPeyhbR5HUucA5aA", "review_count": 16978},
    {"name": "Bruce", "user_id": "hWDybu_KvYLSdEFzGrniTw", "review_count": 16567},
    {"name": "Shila", "user_id": "RtGqdDBvvBCjcu5dUqwfzA", "review_count": 12868},
    {"name": "Kim", "user_id": "P5bUL3Engv-2z6kKohB6qQ", "review_count": 9941},
    {"name": "Nijole", "user_id": "nmdkHL2JKFx55T3nq5VziA", "review_count": 8363},
    {"name": "Vincent", "user_id": "bQCHF5rn5lMI9c5kEwCaNA", "review_count": 8354},
    {"name": "George", "user_id": "8RcEwGrFIgkt9WQ35E6SnQ", "review_count": 7738},
    {"name": "Kenneth", "user_id": "Xwnf20FKuikiHcSpcEbpKQ", "review_count": 6766},
    {"name": "Jennifer", "user_id": "CxDOIDnH8gp9KXzpBHJYXw", "review_count": 6679},
    {"name": "Sunil", "user_id": "IucvvxdQXXhjQ4z6Or6Nrw", "review_count": 6459},
    {"name": "Eric", "user_id": "HFECrzYDpgbS5EmTBtj2zQ", "review_count": 5887},
    {"name": "Ed", "user_id": "m07sy7eLtOjVdZ8oN9JKag", "review_count": 5800},
    {"name": "Rob", "user_id": "kS1MQHYwIfD0462PE61IBw", "review_count": 5511},
    {"name": "Dominik", "user_id": "IlGYj_XAMG3v75rfmtBs_Q", "review_count": 5434},
    {"name": "Misha", "user_id": "Eypq5gLLjCapBVVnMw_MyA", "review_count": 5163},
    {"name": "Michael", "user_id": "U4INQZOPSUaj8hMjLlZ3KA", "review_count": 5061},
    {"name": "Stefany", "user_id": "bLbSNkLggFnqwNNzzq-Ijw", "review_count": 5014},
    {"name": "Jess", "user_id": "wZPizeBxMAyOSl0M0zuCjg", "review_count": 5002},
    {"name": "Hannah", "user_id": "GHoG4X4FY8D8L563zzPX5w", "review_count": 4994},
]

const df_4 = [
    {"name": "Mike", "user_id": "37cpUoM8hlkSQfReIEBd-Q", "fans": 12497},
    {"name": "Katie", "user_id": "hizGc5W1tBHPghM5YKCAtg", "fans": 3642},
    {"name": "Fox", "user_id": "Hi10sGSZNxQH3NLyWSZ1oA", "fans": 3493},
    {"name": "Richard", "user_id": "JjXuiru1_ONzDkYVrHN0aw", "fans": 3243},
    {"name": "Daniel", "user_id": "j14WgRoU_-2ZE1aw1dXrJg", "fans": 3138},
    {"name": "Jessica", "user_id": "VHdY6oG2JPVNjihWhOooAQ", "fans": 2627},
    {"name": "Ruggy", "user_id": "iLjMdZi0Tm7DQxX1C1_2dg", "fans": 2547},
    {"name": "Megan", "user_id": "lt7bNHl-TXziny4FETu8nA", "fans": 2451},
    {"name": "Emi", "user_id": "fgwI3rYHOv1ipfVfCSx7pg", "fans": 2424},
    {"name": "Peter", "user_id": "ITa3vh5ERI90G_WP4SmGUQ", "fans": 2388},
    {"name": "Carl", "user_id": "UsXqCXRZwSCSw0AT7y1uBg", "fans": 2290},
    {"name": "Ed", "user_id": "m07sy7eLtOjVdZ8oN9JKag", "fans": 2251},
    {"name": "Emma", "user_id": "CdeyZZ6ZGhvs7YCzVheeRg", "fans": 2172},
    {"name": "Jeremy", "user_id": "nkN_do3fJ9xekchVC-v68A", "fans": 2107},
    {"name": "Brittany", "user_id": "AHRrG3T1gJpHvtpZ-K0G_g", "fans": 2086},
    {"name": "Farrah", "user_id": "3zxy3LVBV3ttxoYbY4rQ8A", "fans": 2073},
    {"name": "Jando", "user_id": "ysCBsXWPB-LAiewVS3jZfQ", "fans": 2018},
    {"name": "Cara", "user_id": "NfU0zDaTMEQ4-X9dbQWd9A", "fans": 1949},
    {"name": "Brittany", "user_id": "peuxbSQwXed-81cSqL7Ykw", "fans": 1927},
    {"name": "Abby", "user_id": "djxnI8Ux8ZYQJhiOQkrRhA", "fans": 1806},
]

const df_5 = [
    {"elite_year": "2006", "elite_count": 775, "cumulative_total": 6450, "elite_ratio": 0.12015503875968993},
    {"elite_year": "2007", "elite_count": 2023, "cumulative_total": 21790, "elite_ratio": 0.09284075263882514},
    {"elite_year": "2008", "elite_count": 3185, "cumulative_total": 52887, "elite_ratio": 0.060222739047402954},
    {"elite_year": "2009", "elite_count": 5479, "cumulative_total": 117798, "elite_ratio": 0.046511825328104044},
    {"elite_year": "2010", "elite_count": 8772, "cumulative_total": 226852, "elite_ratio": 0.03866838291044381},
    {"elite_year": "2011", "elite_count": 10997, "cumulative_total": 403287, "elite_ratio": 0.027268421744316082},
    {"elite_year": "2012", "elite_count": 15222, "cumulative_total": 599242, "elite_ratio": 0.02540209130868664},
    {"elite_year": "2013", "elite_count": 16193, "cumulative_total": 809004, "elite_ratio": 0.020015970254782425},
    {"elite_year": "2014", "elite_count": 18571, "cumulative_total": 1042469, "elite_ratio": 0.01781443860680749},
    {"elite_year": "2015", "elite_count": 24175, "cumulative_total": 1290319, "elite_ratio": 0.01873567699150365},
    {"elite_year": "2016", "elite_count": 29636, "cumulative_total": 1507939, "elite_ratio": 0.019653314888732235},
    {"elite_year": "2017", "elite_count": 36015, "cumulative_total": 1658963, "elite_ratio": 0.021709344934154648},
    {"elite_year": "2018", "elite_count": 41009, "cumulative_total": 1792531, "elite_ratio": 0.022877707554290555},
    {"elite_year": "2019", "elite_count": 44044, "cumulative_total": 1897186, "elite_ratio": 0.02321543591403268},
    {"elite_year": "2021", "elite_count": 44542, "cumulative_total": 1985115, "elite_ratio": 0.02243799477612128},
]

const df_6 = [
    {
        "registration_year": 2007,
        "total_users": 15340,
        "cumulative_total": 21790,
        "review_year": 2007,
        "active_users": 3143,
        "silent_users": 18647,
        "silent_users_ratio": 0.8557595227168426
    },
    {
        "registration_year": 2018,
        "total_users": 133568,
        "cumulative_total": 1792531,
        "review_year": 2018,
        "active_users": 422063,
        "silent_users": 1370468,
        "silent_users_ratio": 0.7645435420642656
    },
    {
        "registration_year": 2015,
        "total_users": 247850,
        "cumulative_total": 1290319,
        "review_year": 2015,
        "active_users": 289059,
        "silent_users": 1001260,
        "silent_users_ratio": 0.775978653340763
    },
    {
        "registration_year": 2006,
        "total_users": 5423,
        "cumulative_total": 6450,
        "review_year": 2006,
        "active_users": 857,
        "silent_users": 5593,
        "silent_users_ratio": 0.8671317829457365
    },
    {
        "registration_year": 2022,
        "total_users": 2782,
        "cumulative_total": 1987897,
        "review_year": 2022,
        "active_users": 22671,
        "silent_users": 1965226,
        "silent_users_ratio": 0.9885954855809934
    },
    {
        "registration_year": 2013,
        "total_users": 209762,
        "cumulative_total": 809004,
        "review_year": 2013,
        "active_users": 140050,
        "silent_users": 668954,
        "silent_users_ratio": 0.8268858992044539
    },
    {
        "registration_year": 2014,
        "total_users": 233465,
        "cumulative_total": 1042469,
        "review_year": 2014,
        "active_users": 209581,
        "silent_users": 832888,
        "silent_users_ratio": 0.7989570912900048
    },
    {
        "registration_year": 2019,
        "total_users": 104655,
        "cumulative_total": 1897186,
        "review_year": 2019,
        "active_users": 431436,
        "silent_users": 1465750,
        "silent_users_ratio": 0.7725916172689447
    },
    {
        "registration_year": 2004,
        "total_users": 90,
        "cumulative_total": 90,
        "silent_users": 90,
        "silent_users_ratio": 1.0
    },
    {
        "registration_year": 2020,
        "total_users": 47444,
        "cumulative_total": 1944630,
        "review_year": 2020,
        "active_users": 283781,
        "silent_users": 1660849,
        "silent_users_ratio": 0.8540694116618586
    },
    {
        "registration_year": 2012,
        "total_users": 195955,
        "cumulative_total": 599242,
        "review_year": 2012,
        "active_users": 97201,
        "silent_users": 502041,
        "silent_users_ratio": 0.8377934123442616
    },
    {
        "registration_year": 2009,
        "total_users": 64911,
        "cumulative_total": 117798,
        "review_year": 2009,
        "active_users": 19386,
        "silent_users": 98412,
        "silent_users_ratio": 0.8354301431263689
    },
    {
        "registration_year": 2016,
        "total_users": 217620,
        "cumulative_total": 1507939,
        "review_year": 2016,
        "active_users": 338893,
        "silent_users": 1169046,
        "silent_users_ratio": 0.7752608029900414
    },
    {
        "registration_year": 2005,
        "total_users": 937,
        "cumulative_total": 1027,
        "review_year": 2005,
        "active_users": 126,
        "silent_users": 901,
        "silent_users_ratio": 0.8773125608568647
    },
    {
        "registration_year": 2010,
        "total_users": 109054,
        "cumulative_total": 226852,
        "review_year": 2010,
        "active_users": 37990,
        "silent_users": 188862,
        "silent_users_ratio": 0.83253398691658
    },
    {
        "registration_year": 2011,
        "total_users": 176435,
        "cumulative_total": 403287,
        "review_year": 2011,
        "active_users": 70154,
        "silent_users": 333133,
        "silent_users_ratio": 0.8260444794897926
    },
    {
        "registration_year": 2008,
        "total_users": 31097,
        "cumulative_total": 52887,
        "review_year": 2008,
        "active_users": 8753,
        "silent_users": 44134,
        "silent_users_ratio": 0.8344961899899787
    },
    {
        "registration_year": 2017,
        "total_users": 151024,
        "cumulative_total": 1658963,
        "review_year": 2017,
        "active_users": 377195,
        "silent_users": 1281768,
        "silent_users_ratio": 0.7726320599073035
    },
    {
        "registration_year": 2021,
        "total_users": 40485,
        "cumulative_total": 1985115,
        "review_year": 2021,
        "active_users": 314237,
        "silent_users": 1670878,
        "silent_users_ratio": 0.8417033773861967
    },
]

{/* 新增用户 */
}
export const Draw_LineChart_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={df_1}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="registration_year"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="count" stroke="#FFFF00" activeDot={{r: 8}} dot={{fill: '#FFFFFF'}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

{/* 优质用户 */
}
export const Draw_LineChart_2 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={df_2}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="elite_year"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="elite_count" stroke="#FFFF00" activeDot={{r: 8}}
                      dot={{fill: '#FFFFFF'}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

{/* 评论达人 */
}
export const Draw_Bar_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_3.map(item => ({
                    ...item,
                    nameId: `${item.name} (id:${item.user_id})`,
                }))}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="nameId"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="review_count" fill="#8884d8">
                    {
                        df_3.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

{/* 人气最高 */
}
export const Draw_Bar_2 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_4.map(item => ({
                    ...item,
                    nameId: `${item.name} (id:${item.user_id})`,
                }))}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="nameId"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="fans" fill="#8884d8">
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

{/* 优质/普通 */
}
export const Draw_LineChart_3 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={df_5}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="elite_year"/>
                <YAxis />
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="elite_ratio" stroke="#EE82EE" activeDot={{r: 8}}
                      dot={{fill: '#FFFFFF'}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

{/* 沉默比例 */
}
export const Draw_LineChart_4 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={df_6}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="registration_year"/>
                <YAxis domain={['auto', 'auto']}/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="silent_users_ratio" stroke="#EE82EE" activeDot={{r: 8}} dot={{fill: '#FFFFFF'}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};