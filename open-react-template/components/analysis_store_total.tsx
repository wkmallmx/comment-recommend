'use client'

import {Draw_Bar_1, Draw_Bar_2} from '@/components/picture'


export default function Store_total() {
    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-12 md:py-20">

                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12">
                        <h2 className="h2 mb-4">商户分析</h2>
                        <p className="text-xl text-gray-400">商户总览</p>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col items-center justify-center" data-aos-id-blocks>

                        {/* 1st item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="200"
                        data-aos-anchor="[data-aos-id-blocks]">
                            <div className="chart-container">
                                <Draw_Bar_1 />
                            </div>
                            <h4 className="h4 text-center mt-4">美国最常见的商户</h4>
                        </div>

                        {/* 2nd item */}
                        <div className="w-full max-w-full mx-auto my-16" data-aos="fade-up" data-aos-delay="200"
                        data-aos-anchor="[data-aos-id-blocks]">
                            <div className="chart-container">
                                <Draw_Bar_2 />
                            </div>
                            <h4 className="h4 text-center mt-4">美国最常见的商户种类</h4>
                        </div>

                        {/* 3rd item */}
                        <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                <rect className="fill-current text-purple-600" width="64" height="64" rx="32"/>
                                <g transform="translate(21 21)" strokeLinecap="square" strokeWidth="2" fill="none"
                                   fillRule="evenodd">
                                    <ellipse className="stroke-current text-purple-300" cx="11" cy="11" rx="5.5"
                                             ry="11"/>
                                    <path className="stroke-current text-purple-100" d="M11 0v22M0 11h22"/>
                                    <circle className="stroke-current text-purple-100" cx="11" cy="11" r="11"/>
                                </g>
                            </svg>
                            <h4 className="h4 mb-2">Instant Features</h4>
                            <p className="text-lg text-gray-400 text-center">Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat.</p>
                        </div>

                        {/* 4th item */}
                        <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="300"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                <rect className="fill-current text-purple-600" width="64" height="64" rx="32"/>
                                <g transform="translate(22 21)" strokeLinecap="square" strokeWidth="2" fill="none"
                                   fillRule="evenodd">
                                    <path className="stroke-current text-purple-100"
                                          d="M17 22v-6.3a8.97 8.97 0 003-6.569A9.1 9.1 0 0011.262 0 9 9 0 002 9v1l-2 5 2 1v4a2 2 0 002 2h4a5 5 0 005-5v-5"/>
                                    <circle className="stroke-current text-purple-300" cx="13" cy="9" r="3"/>
                                </g>
                            </svg>
                            <h4 className="h4 mb-2">Instant Features</h4>
                            <p className="text-lg text-gray-400 text-center">Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat.</p>
                        </div>

                        {/* 5th item */}
                        <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="400"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                <rect className="fill-current text-purple-600" width="64" height="64" rx="32"/>
                                <g strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                                    <path className="stroke-current text-purple-100"
                                          d="M29 42h10.229a2 2 0 001.912-1.412l2.769-9A2 2 0 0042 29h-7v-4c0-2.373-1.251-3.494-2.764-3.86a1.006 1.006 0 00-1.236.979V26l-5 6"/>
                                    <path className="stroke-current text-purple-300" d="M22 30h4v12h-4z"/>
                                </g>
                            </svg>
                            <h4 className="h4 mb-2">Instant Features</h4>
                            <p className="text-lg text-gray-400 text-center">Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat.</p>
                        </div>

                        {/* 6th item */}
                        <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="500"
                             data-aos-anchor="[data-aos-id-blocks]">
                            <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                <rect className="fill-current text-purple-600" width="64" height="64" rx="32"/>
                                <g transform="translate(21 22)" strokeLinecap="square" strokeWidth="2" fill="none"
                                   fillRule="evenodd">
                                    <path className="stroke-current text-purple-300"
                                          d="M17 2V0M19.121 2.879l1.415-1.415M20 5h2M19.121 7.121l1.415 1.415M17 8v2M14.879 7.121l-1.415 1.415M14 5h-2M14.879 2.879l-1.415-1.415"/>
                                    <circle className="stroke-current text-purple-300" cx="17" cy="5" r="3"/>
                                    <path className="stroke-current text-purple-100"
                                          d="M8.86 1.18C3.8 1.988 0 5.6 0 10c0 5 4.9 9 11 9a10.55 10.55 0 003.1-.4L20 21l-.6-5.2a9.125 9.125 0 001.991-2.948"/>
                                </g>
                            </svg>
                            <h4 className="h4 mb-2">Instant Features</h4>
                            <p className="text-lg text-gray-400 text-center">Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}