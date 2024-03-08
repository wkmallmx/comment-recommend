'use client'

import {Draw_Bar_1, Draw_Bar_2, Draw_Pie_1} from '@/components/draw-store'
import React from "react";
import {scrollToSection} from "@/components/ui/header";
import PageIllustrationF from "@/components/page-illustration-f";
import PageIllustrationB from "@/components/page-illustration-b";

export default function CommentTotal() {

    return (
        <section>
            <PageIllustrationF/>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
                            <div className="chart-container">
                                <Draw_Bar_1/>
                            </div>
                            <h4 className="h4 text-center mt-4">用户增量 & 2018-2024</h4>
                        </div>

                        {/* 2nd item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="400"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <div className="chart-container">
                                <Draw_Bar_2/>
                            </div>
                            <h4 className="h4 text-center mt-4">商户种类 & TOP10</h4>
                        </div>

                        {/* 3rd item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="600"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <div className="chart-container">
                                <Draw_Pie_1/>
                            </div>
                            <h4 className="h4 text-center mt-4">餐厅菜系 & TOP3</h4>
                            <div className="flex justify-end">
                                <a href="/#hero" onClick={(e) => scrollToSection(e, 'hero')}
                                   className="btn-sm text-white bg-purple-600 hover:bg-purple-700">返回首页</a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <PageIllustrationB/>
        </section>
    )
}