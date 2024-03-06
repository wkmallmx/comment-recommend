import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import React from 'react';

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
                <Bar dataKey="count" fill="#8884d8"/>
            </BarChart>
        </ResponsiveContainer>
    );
};

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
                <Bar dataKey="count" fill="#8884d8"/>
            </BarChart>
        </ResponsiveContainer>
    );
};

