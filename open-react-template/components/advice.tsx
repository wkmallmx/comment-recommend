import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "@/context";
import axios from "axios";
import Image from "next/image";
import AdviceImage from "@/public/images/advice.png";

export default function Advice() {

    const {user, setUser} = useContext(UserContext);
    const [adviceText, setAdviceText] = useState('')

    const handleRequest = async () => {
        let formData = new FormData();
        formData.append("business_id", user.id);

        console.log('请求已发送...')

        try {
            const response = await axios.post('http://127.0.0.1:5000/suggest', formData);
            setAdviceText(response.data.data.advice)

            console.log('回复已收到...')

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

    return (
        <div className="max-w-full mx-auto  items-center lg:max-w-none">

            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="200">
                <div>
                    <div className="relative inline-flex flex-col mb-4">
                        <Image className="rounded-full" src={AdviceImage} width={56} height={56}
                               alt="Advice"/>
                        <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                             viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z"/>
                        </svg>
                    </div>
                </div>
                <blockquote className="text-lg text-gray-400 grow">{adviceText}
                </blockquote>
                <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                    <cite className="font-architects-daughter text-xl text-purple-600 mb-2">More Stars Less
                        Spend</cite>
                </div>
            </div>
        </div>
)
}