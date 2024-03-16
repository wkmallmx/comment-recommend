'use client'

import React, {useEffect} from 'react';

import PageIllustrationF from "@/components/page-illustration-f";
import Link from "next/link";

import Mood from "@/components/mood";
import Advice from "@/components/advice";

export default function Operation() {

    useEffect(() => {
        document.title = '经营推荐';
    }, []);

    return (
        <section>
            <PageIllustrationF/>
            <div className="max-w-6xl mx-auto px-4 pt-24 sm:px-6">
                <div className="pt-12 md:py-20">
                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h1 className="h2 mb-4">智能推荐</h1>
                        <p className="text-xl text-gray-400">以下建议可能会帮助你更好地经营♡</p>
                    </div>
                    {/* Advice */}
                    <Advice/>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                    <p className="text-xl text-gray-400">情感分析图♡</p>
                </div>
                {/* Mood */}
                <Mood/>
            </div>

            <div className="flex justify-end mr-36 mb-36">
                <Link href="/home"
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700">返回首页</Link>
            </div>
        </section>
    )
}