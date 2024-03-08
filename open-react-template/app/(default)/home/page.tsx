'use client'

import {useEffect} from 'react';
import Hero from '@/components/hero'
import Zigzag from "@/components/zigzag";
import Newsletter from "@/components/newsletter";
import Testimonials from "@/components/testimonials";
export default function Home() {
    useEffect(() => {
        document.title = '点评数据分析及推荐';
    }, []);

    return (
        <>
            <Hero/>
        </>
    )
}
