'use client'

import React, {useEffect, useContext} from 'react';
import Link from "next/link";
import MapComponent from "@/components/map";
import PageIllustrationF from "@/components/page-illustration-f";
import PageIllustrationB from "@/components/page-illustration-b";
import {UserContext} from "@/context";

export default function Recommend() {
    useEffect(() => {
        document.title = '商家推荐';
    }, []);

    const {user, setUser} = useContext(UserContext);

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

    return (
        <section>
            <PageIllustrationF/>
            <div className="max-w-6xl mx-auto px-4 pt-16 sm:px-6">
                <div className="py-12 md:py-20">

                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h2 className="h2 mb-4">搜索结果</h2>
                        <p className="text-lg">点击标点以查看更多细节♡</p>
                    </div>

                    {/* Map */}
                    <div className="flex justify-center mx-auto pb-12 md:pb-20">
                        <MapComponent/>
                    </div>

                </div>
            </div>
            <div className="flex justify-end pr-36 pb-36">
                <Link href="/search"
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleQuit()}>返回搜索</Link>
            </div>
            <PageIllustrationB/>
        </section>
    );
}