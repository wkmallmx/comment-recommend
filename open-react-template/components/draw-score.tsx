import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
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
    {"city": "Lutz fl", "avg_stars": 5.0},
    {"city": "Picture Rocks", "avg_stars": 5.0},
    {"city": "West Nashville", "avg_stars": 5.0},
    {"city": "Chattanooga", "avg_stars": 5.0},
    {"city": "Edgemoor", "avg_stars": 5.0},
    {"city": "Newtown Sq.", "avg_stars": 5.0},
    {"city": "Sparks,", "avg_stars": 5.0},
    {"city": "St.  Charles", "avg_stars": 5.0},
    {"city": "MERIDIAN", "avg_stars": 5.0},
    {"city": "Eagle,", "avg_stars": 5.0},
]

const df_2 = [
    {"business_id": "ytynqOUb3hjKeJfRj5Tshw", "count": 4014, "name": "Reading Terminal Market"},
    {"business_id": "ac1AeYqs8Z4_e2X5M3if2A", "count": 4012, "name": "Oceana Grill"},
    {"business_id": "GXFMD0Z4jEVZBCsbPf4CTQ", "count": 3838, "name": "Hattie B’s Hot Chicken - Nashville"},
    {"business_id": "_ab50qdWOk0DdB6XOrBitw", "count": 3645, "name": "Acme Oyster House"},
    {"business_id": "_C7QiQQc47AOEv4PE3Kong", "count": 3095, "name": "Commander's Palace"},
    {"business_id": "oBNrLz4EDhiscSlbOl8uAw", "count": 3075, "name": "Ruby Slipper - New Orleans"},
    {"business_id": "yPSejq3_erxo9zdVYTBnZA", "count": 2693, "name": "Los Agaves"},
    {"business_id": "I_3LMZ_1m2mzR0oLIOePIg", "count": 2675, "name": "Pappy's Smokehouse"},
    {"business_id": "gTC8IQ_i8zXytWSly3Ttvg", "count": 2537, "name": "Cochon Butcher"},
    {"business_id": "GBTPC53ZrG1ZBY3DT8Mbcw", "count": 2365, "name": "Luke"},
    {"business_id": "6a4gLLFSgr-Q6CZXDLzBGQ", "count": 2340, "name": "Cochon"},
    {"business_id": "ctHjyadbDQAtUFfkcAFEHw", "count": 2282, "name": "Zahav"},
    {"business_id": "1b5mnK8bMnnju_cvU65GqQ", "count": 2272, "name": "Biscuit Love: Gulch"},
    {"business_id": "VVH6k9-ycttH3TV_lk5WfQ", "count": 2136, "name": "Willie Mae's Scotch House"},
    {"business_id": "VQcCL9PiNL_wkGf-uF3fjg", "count": 2103, "name": "Royal House"},
    {"business_id": "dsfRniRgfbDjC8os848B6A", "count": 1959, "name": "Bern's Steak House"},
    {"business_id": "9xdXS7jtWjCVzL4_oPGv9A", "count": 1853, "name": "GW Fins"},
    {"business_id": "VaO-VW3e1kARkU9bP1E7Fw", "count": 1784, "name": "Felix's Restaurant & Oyster Bar"},
    {"business_id": "L5LLN0RafiV1Z9cddzvuCw", "count": 1747, "name": "Ulele"},
    {"business_id": "QHWYlmVbLC3K6eglWoHVvA", "count": 1746, "name": "Datz"},
    {"business_id": "C9K3579SJgLPp0oAOM29wg", "count": 1707, "name": "Peg Leg"},
]

const df_3 = [
    {stars: "1.0", Chinese: 4, Mexican: 26, American: 15},
    {stars: "1.5", Chinese: 36, Mexican: 158, American: 161},
    {stars: "2.0", Chinese: 156, Mexican: 268, American: 597},
    {stars: "2.5", Chinese: 356, Mexican: 425, American: 1291},
    {stars: "3.0", Chinese: 663, Mexican: 636, American: 2184},
    {stars: "3.5", Chinese: 941, Mexican: 1041, American: 3295},
    {stars: "4.0", Chinese: 739, Mexican: 1103, American: 3543},
    {stars: "4.5", Chinese: 256, Mexican: 771, American: 1758},
    {stars: "5.0", Chinese: 19, Mexican: 186, American: 222},
]

const df_4 = [
    {"stars": 1.0, "count": 1069561},
    {"stars": 2.0, "count": 544240},
    {"stars": 3.0, "count": 691934},
    {"stars": 4.0, "count": 1452918},
    {"stars": 5.0, "count": 3231627},
]

const df_5 = [
    {"day_of_week": 1, "count": 1145909},
    {"day_of_week": 2, "count": 1030129},
    {"day_of_week": 3, "count": 943417},
    {"day_of_week": 4, "count": 945565},
    {"day_of_week": 5, "count": 917648},
    {"day_of_week": 6, "count": 942156},
    {"day_of_week": 7, "count": 1065456},
]

export const Draw_Pie_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={df_1}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="avg_stars"
                    nameKey="city"
                    label={(entry) => entry.name}
                >
                    {
                        df_1.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Pie>
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export const Draw_Bar_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_2.map(item => ({
                    ...item,
                    nameId: `${item.name} (id:${item.business_id})`,
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
                <YAxis domain={["auto", "auto"]}/>
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

export const Draw_LineChart_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={df_3}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="stars"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="Chinese" stroke="#FF0000" activeDot={{r: 8}} dot={{fill: '#FFFFFF'}}/>
                <Line type="monotone" dataKey="Mexican" stroke="#FFA500" activeDot={{r: 8}} dot={{fill: '#FFFFFF'}}/>
                <Line type="monotone" dataKey="American" stroke="#FFFF00" activeDot={{r: 8}} dot={{fill: '#FFFFFF'}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export const Draw_Pie_2 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={df_4}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="stars"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
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

export const Draw_LineChart_2 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={df_5}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="day_of_week"/>
                <YAxis domain={["auto","auto"]}/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="count" stroke="#FFFF00" activeDot={{r: 8}} dot={{fill: '#FFFFFF'}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};