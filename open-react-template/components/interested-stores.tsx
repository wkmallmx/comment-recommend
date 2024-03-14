import Image from 'next/image'

import StoreImage from '@/public/images/store.png'

import {UserContext} from "@/context";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

export default function InterestedStores() {
    const {user, setUser} = useContext(UserContext);
    const [firstThree, setFirstThree] = useState()

    const handleRequest = async () => {
        let formData = new FormData();
        formData.append("username", user.name);

        try {
            const response = await axios.post("http://127.0.0.1:5000/recommend/business", formData);
            setFirstThree(JSON.parse(response.data.data).slice(0, 3))

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

     useEffect(() => {
        handleRequest()
    }, []);

    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-12 md:py-20 border-t border-gray-800">

                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h3 className="h3 mb-4">可能感兴趣的商家</h3>
                    </div>

                    {/* Stores */}
                    <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">

                        {/* 1st store */}
                        <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up">
                            <div>
                                <div className="relative inline-flex flex-col mb-4">
                                    <Image className="rounded-full" src={StoreImage} width={48} height={48}
                                           alt="Testimonial 01"/>
                                    <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                                         viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z"/>
                                    </svg>
                                </div>
                            </div>
                            <blockquote className="text-lg text-gray-400 grow">{firstThree ?
                                <p>— address: {firstThree[0].address} <br />
                                    — city: {firstThree[0].city} <br />
                                    — state: {firstThree[0].state} <br />
                                    — distance: {firstThree[0].distance} km <br />
                                    — stars: {firstThree[0].stars} <br />
                                </p>
                                :
                                <p>加载中...</p>}
                            </blockquote>
                            <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                                <cite className="text-gray-200 not-italic">{firstThree ? <p>{firstThree[0].name}</p> :
                                    <p>加载中...</p>}</cite>
                            </div>
                        </div>

                        {/* 2nd store */}
                        <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="200">
                            <div>
                                <div className="relative inline-flex flex-col mb-4">
                                    <Image className="rounded-full" src={StoreImage} width={48} height={48}
                                           alt="Testimonial 02"/>
                                    <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                                         viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z"/>
                                    </svg>
                                </div>
                            </div>
                            <blockquote className="text-lg text-gray-400 grow">{firstThree ?
                                <p>— address: {firstThree[1].address} <br />
                                    — city: {firstThree[1].city} <br />
                                    — state: {firstThree[1].state} <br />
                                    — distance: {firstThree[1].distance} km <br />
                                    — stars: {firstThree[1].stars} <br />
                                </p>
                                :
                                <p>加载中...</p>}
                            </blockquote>
                            <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                                <cite className="text-gray-200 not-italic">{firstThree ? <p>{firstThree[1].name}</p> :
                                    <p>加载中...</p>}</cite>
                            </div>
                        </div>

                        {/* 3rd store */}
                        <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
                            <div>
                                <div className="relative inline-flex flex-col mb-4">
                                    <Image className="rounded-full" src={StoreImage} width={48} height={48}
                                           alt="Testimonial 03"/>
                                    <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                                         viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z"/>
                                    </svg>
                                </div>
                            </div>
                           <blockquote className="text-lg text-gray-400 grow">{firstThree ?
                                <p>— address: {firstThree[2].address} <br />
                                    — city: {firstThree[2].city} <br />
                                    — state: {firstThree[2].state} <br />
                                    — distance: {firstThree[2].distance} km <br />
                                    — stars: {firstThree[2].stars} <br />
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