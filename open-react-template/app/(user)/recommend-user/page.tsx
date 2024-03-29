'use client'

import React, {useRef, useEffect, useState, useContext} from 'react';
import Image from 'next/image'
import PageIllustrationF from "@/components/page-illustration-f";
import FriendImage from '@/public/images/friend.png'
import Link from "next/link";

import axios from 'axios'
import {UserContext} from "@/context";


export default function Recommend() {
    const {user, setUser} = useContext(UserContext);
    const [firstTwelve, setFirstTwelve] = useState([])
    const handleRequest = async () => {
        let formData = new FormData();
        formData.append("username", user.name);
        formData.append("search_text", user.text);

        console.log('请求已发送...')

        try {
            const response = await axios.post("http://127.0.0.1:5000/search/user", formData);
            setFirstTwelve(JSON.parse(response.data.data).slice(1, 13))

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

    const handleQuit = () => {
        setUser(() => ({
            latitude: user.latitude,
            longitude: user.longitude,
            role: user.role,
            name: user.name,
            text: null,
            id: user.id,
        }));

        console.log('搜索信息', user.text);
    }

    const renderRef = useRef(true)

    useEffect(() => {
         if (renderRef.current) {
            renderRef.current = false
            return
        }
        document.title = '用户推荐';
        handleRequest()
    }, []);

    return (
        <section>
            <PageIllustrationF/>
            <div className="max-w-6xl mx-auto px-4 pt-16 sm:px-6">
                <div className="py-12 md:py-20">

                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h2 className="h2 mb-4">搜索结果</h2>
                    </div>

                    {/* Friends */}
                    <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">

                        {
                            firstTwelve.map((friend, index) => (
                                <div key={index} className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up">
                                    <div>
                                        <div className="relative inline-flex flex-col mb-4">
                                            <Image className="rounded-full" src={FriendImage} width={48}
                                                   height={48}
                                                   alt={`Testimonial 01`}/>
                                            <svg
                                                className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                                                viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <blockquote className="text-lg text-gray-400 grow">
                                        — fans: {friend.fans} <br/>
                                        — review: {friend.review_count} <br/>
                                        — stars: {friend.average_stars} <br/></blockquote>
                                    <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                                        <cite className="text-gray-200 not-italic">{friend.name}</cite>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            <div className="flex justify-end pr-36 pb-36">
                <Link href="/search"
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleQuit()}>返回搜索</Link>
            </div>
        </section>
    )
}