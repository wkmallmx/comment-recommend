'use client'

import {useEffect} from 'react';
import Hero from '@/components/hero'

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
