'use client'

import {Draw_LineChart_1, Draw_Bar_1, Draw_Bar_5, Draw_Pie_1, Draw_Pie_2} from '@/components/draw-comment'
import React from "react";
import Link from "next/link";
import {useEffect} from 'react';
import PageIllustrationF from "@/components/page-illustration-f";
import PageIllustrationB from "@/components/page-illustration-b";

export default function CommentTotal() {
    useEffect(() => {
        document.title = '评论总览';
    }, []);

    return (
        <section>
            <PageIllustrationF/>
            <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6">
                <div className="py-12 md:py-20">

                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12">
                        <h2 className="h2 mb-4">评论分析</h2>
                        <p className="text-xl text-gray-400">评论总览</p>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col items-center justify-center" data-aos-id-blocks>

                        {/* 1st item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="200"
                             data-aos-anchor="[data-aos-id-blocks]">
                                <Draw_LineChart_1/>
                            <h4 className="h4 text-center mt-4">评论年次 & 2005-2022</h4>
                        </div>

                        {/* 2nd item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="400"
                             data-aos-anchor="[data-aos-id-blocks]">
                                <Draw_Bar_5/>
                            <h4 className="h4 text-center mt-4">年度评论用户 & TOP20</h4>
                        </div>

                        {/* 3rd item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="600"
                             data-aos-anchor="[data-aos-id-blocks]">
                                <Draw_Pie_2/>
                            <h4 className="h4 text-center mt-4">评论类型 & e.g.</h4>
                        </div>

                        {/* 4th item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="600"
                             data-aos-anchor="[data-aos-id-blocks]">
                                <Draw_Bar_1/>
                            <h4 className="h4 text-center mt-4">商户评论排行 & TOP20</h4>

                        </div>

                        {/* 5th item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="600"
                             data-aos-anchor="[data-aos-id-blocks]">
                                <Draw_Pie_1/>
                            <h4 className="h4 text-center mt-4">餐厅菜系评论 & e.g.</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mr-36 mb-36">
                <Link href="/home"
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700">返回首页</Link>
            </div>
            <PageIllustrationB/>
        </section>
    )
}