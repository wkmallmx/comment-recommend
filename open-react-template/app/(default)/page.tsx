
export const metadata = {
    title: '点评数据分析及推荐',
    description: 'Page description',
}

import Hero from '@/components/hero'
import Store_total from '@/components/analysis_store_total'
import Store_distribution from "@/components/analysis_store_distribution";
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'


export default function Home() {
    return (
        <>
            <Hero/>
            <div id="store_total">
                <Store_total/>
            </div>
            <div id="store_distribution">
                <Store_distribution/>
            </div>
            <Zigzag/>
            <Testimonials/>
            <Newsletter/>
        </>
    )
}
