'use client'

import React from "react";
import Link from "next/link";
import {useEffect} from 'react';
import {Draw_Pie_1} from '@/components/draw-total'
import PageIllustrationF from "@/components/page-illustration-f";
import PageIllustrationB from "@/components/page-illustration-b";

export default function Total() {
    useEffect(() => {
        document.title = '最佳商家';
    }, []);

    return (
        <section>
            <PageIllustrationF/>
            <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6">
                <div className="py-12 md:py-20">

                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12" data-aos="fade-up">
                        <h2 className="h2 mb-4">综合分析</h2>
                        <p className="text-xl text-gray-400">最佳商家</p>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col items-center justify-center" data-aos-id-blocks>

                        {/* 1st item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="200"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <div className="chart-container">
                                <Draw_Pie_1/>
                            </div>
                            <h4 className="h4 text-center mt-4">城市最佳 & e.g.</h4>
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