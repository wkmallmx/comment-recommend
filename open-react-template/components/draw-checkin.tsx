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
    {"year": 2009, "yearly_checkin_count": 2},
    {"year": 2010, "yearly_checkin_count": 209153},
    {"year": 2011, "yearly_checkin_count": 901457},
    {"year": 2012, "yearly_checkin_count": 1289492},
    {"year": 2013, "yearly_checkin_count": 1552799},
    {"year": 2014, "yearly_checkin_count": 1625884},
    {"year": 2015, "yearly_checkin_count": 1709857},
    {"year": 2016, "yearly_checkin_count": 1554774},
    {"year": 2017, "yearly_checkin_count": 1348466},
    {"year": 2018, "yearly_checkin_count": 1157252},
    {"year": 2019, "yearly_checkin_count": 1035160},
    {"year": 2020, "yearly_checkin_count": 474172},
    {"year": 2021, "yearly_checkin_count": 477467},
    {"year": 2022, "yearly_checkin_count": 20940},
]

const df_2 = [
    {"hour": 0, "hourly_checkin_count": 1155092},
    {"hour": 1, "hourly_checkin_count": 935985},
    {"hour": 2, "hourly_checkin_count": 669574},
    {"hour": 3, "hourly_checkin_count": 437035},
    {"hour": 4, "hourly_checkin_count": 264905},
    {"hour": 5, "hourly_checkin_count": 152476},
    {"hour": 6, "hourly_checkin_count": 85066},
    {"hour": 7, "hourly_checkin_count": 52295},
    {"hour": 8, "hourly_checkin_count": 35589},
    {"hour": 9, "hourly_checkin_count": 37079},
    {"hour": 10, "hourly_checkin_count": 63824},
    {"hour": 11, "hourly_checkin_count": 115876},
    {"hour": 12, "hourly_checkin_count": 201427},
    {"hour": 13, "hourly_checkin_count": 296364},
    {"hour": 14, "hourly_checkin_count": 407969},
    {"hour": 15, "hourly_checkin_count": 587904},
    {"hour": 16, "hourly_checkin_count": 873108},
    {"hour": 17, "hourly_checkin_count": 1018438},
    {"hour": 18, "hourly_checkin_count": 995358},
    {"hour": 19, "hourly_checkin_count": 922177},
    {"hour": 20, "hourly_checkin_count": 858803},
    {"hour": 21, "hourly_checkin_count": 910653},
    {"hour": 22, "hourly_checkin_count": 1073857},
    {"hour": 23, "hourly_checkin_count": 1206021},
]

const df_3 = [
    {"name": "Philadelphia International Airport - PHL", "checkin_count": 52144},
    {"name": "Café Du Monde", "checkin_count": 40109},
    {"name": "Louis Armstrong New Orleans International Airport  MSY", "checkin_count": 37562},
    {"name": "Tampa International Airport", "checkin_count": 37518},
    {"name": "Nashville International Airport - BNA", "checkin_count": 31168},
    {"name": "St. Louis Lambert International Airport - STL", "checkin_count": 29606},
    {"name": "Royal House", "checkin_count": 28927},
    {"name": "Oceana Grill", "checkin_count": 21542},
    {"name": "Indianapolis International Airport - IND", "checkin_count": 21487},
    {"name": "Reading Terminal Market", "checkin_count": 18615},
    {"name": "Acme Oyster House", "checkin_count": 15205},
    {"name": "Reno-Tahoe International Airport", "checkin_count": 13420},
    {"name": "The Jug Handle Inn", "checkin_count": 13244},
    {"name": "Grand Sierra Resort and Casino", "checkin_count": 10478},
    {"name": "Ruby Slipper - New Orleans", "checkin_count": 10209},
    {"name": "Pat O'Brien’s", "checkin_count": 10135},
    {"name": "Tucson International Airport - TUS", "checkin_count": 10089},
    {"name": "30th Street Station", "checkin_count": 10063},
    {"name": "Gumbo Shop", "checkin_count": 9574},
    {"name": "The Original Pierre Maspero's", "checkin_count": 9464},
]

const df_4 = [
    {"city": "Philadelphia", "total_checkin_count": 1838206},
    {"city": "New Orleans", "total_checkin_count": 1486495},
    {"city": "Tampa", "total_checkin_count": 918203},
    {"city": "Indianapolis", "total_checkin_count": 886001},
    {"city": "Nashville", "total_checkin_count": 817283},
    {"city": "Tucson", "total_checkin_count": 772140},
    {"city": "Reno", "total_checkin_count": 712312},
    {"city": "Saint Louis", "total_checkin_count": 638978},
    {"city": "Santa Barbara", "total_checkin_count": 507626},
    {"city": "Edmonton", "total_checkin_count": 193675},
    {"city": "Metairie", "total_checkin_count": 162429},
    {"city": "Boise", "total_checkin_count": 154077},
    {"city": "Clearwater", "total_checkin_count": 148659},
    {"city": "Saint Petersburg", "total_checkin_count": 142044},
    {"city": "Sparks", "total_checkin_count": 141143},
    {"city": "St. Louis", "total_checkin_count": 120826},
    {"city": "St. Petersburg", "total_checkin_count": 105836},
    {"city": "Goleta", "total_checkin_count": 98544},
    {"city": "Franklin", "total_checkin_count": 91802},
    {"city": "Cherry Hill", "total_checkin_count": 82735},
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
                <Line type="monotone" dataKey="yearly_checkin_count" stroke="#FFFF00" activeDot={{r: 8}}
                      dot={{fill: '#FFFFFF'}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export const Draw_LineChart_2 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={df_2}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="hour"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="hourly_checkin_count" stroke="#FFA500" activeDot={{r: 8}}
                      dot={{fill: '#FFFFFF'}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export const Draw_Bar_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={df_3}
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
                <Bar dataKey="checkin_count" fill="#8884d8">
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
                <XAxis dataKey="city"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="total_checkin_count" fill="#8884d8">
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