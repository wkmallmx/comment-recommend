'use client'

import Image from 'next/image'
import {UserContext} from "@/context";
import FriendImage from '@/public/images/friend.png'

import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";

export default function Friends() {
    const {user, setUser} = useContext(UserContext);

    const [firstThree, setFirstThree] = useState()

    const handleRequest = async () => {
        let formData = new FormData();
        formData.append("username", user.name);

        try {
            const response = await axios.post("http://127.0.0.1:5000/recommend/user", formData);
            setFirstThree(JSON.parse(response.data.data).slice(1, 4))

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
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-12 md:py-20 border-t border-gray-800">

                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h3 className="h3 mb-4">可能认识的人</h3>
                    </div>

                    {/* Friends */}
                    <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">

                        {/* 1st friend */}
                        <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up">
                            <div>
                                <div className="relative inline-flex flex-col mb-4">
                                    <Image className="rounded-full" src={FriendImage} width={48} height={48}
                                           alt="Testimonial 01"/>
                                    <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                                         viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z"/>
                                    </svg>
                                </div>
                            </div>
                            <blockquote className="text-lg text-gray-400 grow">{firstThree ?
                                <p>— fans: {firstThree[0].fans} <br/>
                                    — review: {firstThree[0].review_count} <br/>
                                    — stars: {firstThree[0].average_stars} <br/>
                                </p>
                                :
                                <p>加载中...</p>}
                            </blockquote>
                            <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                                <cite className="text-gray-200 not-italic">{firstThree ? <p>{firstThree[0].name}</p> :
                                    <p>加载中...</p>}</cite>
                            </div>
                        </div>

                        {/* 2nd friend */}
                        <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="200">
                            <div>
                                <div className="relative inline-flex flex-col mb-4">
                                    <Image className="rounded-full" src={FriendImage} width={48} height={48}
                                           alt="Testimonial 02"/>
                                    <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                                         viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z"/>
                                    </svg>
                                </div>
                            </div>
                            <blockquote className="text-lg text-gray-400 grow">{firstThree ?
                                <p>— fans: {firstThree[1].fans} <br/>
                                    — review: {firstThree[1].review_count} <br/>
                                    — stars: {firstThree[1].average_stars} <br/>
                                </p>
                                :
                                <p>加载中...</p>}
                            </blockquote>
                            <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                                <cite className="text-gray-200 not-italic">{firstThree ? <p>{firstThree[1].name}</p> :
                                    <p>加载中...</p>}</cite>
                            </div>
                        </div>

                        {/* 3rd friend */}
                        <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
                            <div>
                                <div className="relative inline-flex flex-col mb-4">
                                    <Image className="rounded-full" src={FriendImage} width={48} height={48}
                                           alt="Testimonial 03"/>
                                    <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                                         viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z"/>
                                    </svg>
                                </div>
                            </div>
                            <blockquote className="text-lg text-gray-400 grow">{firstThree ?
                                <p>— fans: {firstThree[2].fans} <br/>
                                    — review: {firstThree[2].review_count} <br/>
                                    — stars: {firstThree[2].average_stars} <br/>
                                </p>
                                :
                                <p>加载中...</p>}
                            </blockquote>
                            <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                                <cite className="text-gray-200 not-italic">{firstThree ? <p>{firstThree[2].name}</p> :
                                    <p>加载中...</p>}</cite>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}