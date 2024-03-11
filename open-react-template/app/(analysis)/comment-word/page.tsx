'use client'

import {Draw_Bar_2, Draw_Bar_3, Draw_Bar_4, Draw_Wordcloud_1, Draw_WordRelation_1} from '@/components/draw-comment'
import React from "react";
import Link from "next/link";
import {useEffect} from 'react';
import PageIllustrationF from "@/components/page-illustration-f";
import PageIllustrationB from "@/components/page-illustration-b";

export default function CommentWord() {
    useEffect(() => {
        document.title = '评论热词';
    }, []);

    return (
        <section>
            <PageIllustrationF/>
            <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6">
                <div className="py-12 md:py-20">

                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12">
                        <h2 className="h2 mb-4">评论分析</h2>
                        <p className="text-xl text-gray-400">评论热词</p>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col items-center justify-center" data-aos-id-blocks>

                        {/* 1st item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="200"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <Draw_Bar_2/>
                            <h4 className="h4 text-center mt-4">评论热词 & TOP20</h4>
                        </div>

                        {/* 2nd item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="400"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <Draw_Bar_3/>
                            <h4 className="h4 text-center mt-4">正面热词 & TOP10</h4>
                        </div>

                        {/* 3rd item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="600"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <Draw_Bar_4/>
                            <h4 className="h4 text-center mt-4">负面热词 & TOP10</h4>
                        </div>

                        {/* 4th item */}
                        <div className="w-full h-96 max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="800"
                             data-aos-anchor="[data-aos-id-blocks]">
                                <Draw_Wordcloud_1/>
                            <h4 className="h4 text-center mt-4">词云分析</h4>
                        </div>

                        {/* 5th item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="1000"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <div className="flex justify-center items-center">
                                <Draw_WordRelation_1/>
                            </div>
                            <h4 className="h4 text-center mt-4">单词关系图</h4>
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