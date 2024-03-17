import {BarChart, Bar, PieChart, Pie, XAxis, YAxis, Cell, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import React from 'react';

const COLORS = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];

const df_1 = [
    {name: 'Starbucks', count: 724},
    {name: 'McDonald\'s', count: 703},
    {name: ' Dunkin\'', count: 510},
    {name: 'Subway', count: 459},
    {name: 'Taco Bell', count: 365},
    {name: 'CVS Pharmacy', count: 345},
    {name: 'Walgreens', count: 341},
    {name: 'Burger King', count: 338},
    {name: 'Wendy\'s', count: 331},
    {name: 'Wawa', count: 307},
    {name: 'Domino\'s Pizza', count: 295},
    {name: 'The UPS Store', count: 281},
    {name: 'Pizza Hut', count: 272},
    {name: 'Enterprise Rent-A...', count: 232},
    {name: 'Papa John\'s Pizza', count: 196},
    {name: 'Great Clips', count: 185},
    {name: 'Jimmy John\'s', count: 175},
    {name: 'US Post Office', count: 174},
    {name: 'KFC', count: 171},
    {name: 'Chick-fil-A', count: 162},
];

const df_2 = [
    {categories: 'Beauty & Spas, Na...', count: 1012},
    {categories: 'Restaurants, Pizza', count: 935},
    {categories: 'Nail Salons, Beau...', count: 934},
    {categories: 'Pizza, Restaurants', count: 823},
    {categories: 'Restaurants, Mexican', count: 728},
    {categories: 'Restaurants, Chinese', count: 708},
    {categories: 'Mexican, Restaurants', count: 672},
    {categories: 'Chinese, Restaurants', count: 651},
    {categories: 'Food, Coffee & Tea', count: 508},
    {categories: 'Beauty & Spas, Ha...', count: 493},
];

const df_3 = [
    {categories: 'American', count: 13066},
    {categories: 'Mexican', count: 4614},
    {categories: 'Chinese', count: 3170},
]

const df_4 = [
    {"city": "Philadelphia", "count": 14569},
    {"city": "Tucson", "count": 9250},
    {"city": "Tampa", "count": 9050},
    {"city": "Indianapolis", "count": 7540},
    {"city": "Nashville", "count": 6971},
    {"city": "New Orleans", "count": 6209},
    {"city": "Reno", "count": 5935},
    {"city": "Edmonton", "count": 5054},
    {"city": "Saint Louis", "count": 4827},
    {"city": "Santa Barbara", "count": 3829},
]

const df_5 = [
    {"state": "PA", "count": 34039},
    {"state": "FL", "count": 26330},
    {"state": "TN", "count": 12056},
    {"state": "IN", "count": 11247},
    {"state": "MO", "count": 10913},
]

{/* top20商家 */}
export const Draw_Bar_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_1}
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
                        df_1.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

{/* top10商家种类 */
}
export const Draw_Bar_2 = () => {
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
                <XAxis dataKey="categories"/>
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

{/* top3餐厅菜系 */}
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

{/* top10商家最多的城市 */}
export const Draw_Bar_3 = () => {
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
                <XAxis dataKey="city"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="count" fill="#8884d8">
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

{/* top5商家最多的州 */}
export const Draw_Pie_2 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={df_5}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="state"
                    label={(entry) => entry.name}
                >
                    {
                        df_5.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Pie>
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
    );
};

