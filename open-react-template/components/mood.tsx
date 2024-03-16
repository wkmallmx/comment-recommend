import React, {useContext, useState, useEffect, useRef} from 'react';
import {
    CartesianGrid, Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {UserContext} from "@/context";
import axios from "axios";

export default function Mood() {

    const COLORS = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];

    const {user, setUser} = useContext(UserContext);
    const [sentiment, setSentiment] = useState([])
    const [moodData, setMoodData] = useState([]);

    const handleRequest = async () => {
        let formData = new FormData();
        formData.append("business_id", user.id);
        console.log("请求已发送...")

        try {
            const response = await axios.post("http://127.0.0.1:5000/mood", formData);

            console.log("回复已收到...")

            const neg = response.data.data.neg
            const neu = response.data.data.neu
            const pos = response.data.data.pos

            setMoodData([
                {name: "Negative", value: neg},
                {name: "Neutral", value: neu},
                {name: "Positive", value: pos},
            ]);

            setSentiment(response.data.data.sentiment_ma)

        } catch (error: any) {
            // error.response 可能包含来自服务器的响应对象
            if (error.response) {
                console.error('响应状态码:', error.response.status);
                console.error('错误响应数据:', error.response.data);
            } else {
                console.error('请求失败:', error.message);
            }
        }
    }

    const renderRef = useRef(true)

    useEffect(() => {
        if (renderRef.current) {
            renderRef.current = false
            return
        }
        handleRequest()
    }, []);

    const sentimentData = sentiment.map((score, index) => ({
        index,
        score,
    }));

    const DrawPie = () => {
        return (
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={moodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={160}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={(entry) => entry.name}
                    >
                        {
                            moodData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))
                        }
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        )
    }

    const DrawLineChart = () => {
        return (
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={sentimentData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="index"/>
                    <YAxis domain={["auto", "auto"]}/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="score" stroke="#FFFF00" dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        )
    }


    return (
        <div className="max-w-full mx-auto  items-center lg:max-w-none">
            <div className="flex-1">
                <DrawPie/>
            </div>
            {sentimentData && sentimentData.length > 0 && (
                <div className="flex-1">
                    <DrawLineChart/>
                </div>
            )}
        </div>
    )
};

