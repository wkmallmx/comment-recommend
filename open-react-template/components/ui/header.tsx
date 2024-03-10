'use client'

import Link from 'next/link'
import Image from 'next/image';
import MobileMenu from './mobile-menu'
import React, {useState} from 'react';
import logo from '@/public/images/logo.png'

export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
    e.preventDefault(); // 阻止链接的默认跳转行为

    const targetSection = document.getElementById(pageId);

    if (targetSection) {
        const topOffset = targetSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({top: topOffset, behavior: "smooth"});
    }
};

export default function Header() {
    const [isOpen_store, setIsOpen_store] = useState(false);
    const [isOpen_user, setIsOpen_user] = useState(false);
    const [isOpen_comment, setIsOpen_comment] = useState(false);
    const [isOpen_score, setIsOpen_score] = useState(false);
    const [isOpen_checkin, setIsOpen_checkin] = useState(false);
    const [isOpen_total, setIsOpen_total] = useState(false);


    return (
        <header className="absolute w-full z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-24">
                    {/* Site branding */}
                    <div className="shrink-0 mr-4">
                        {/* Logo */}
                        <div className="block mr-4">
                            <Image
                                src={logo}
                                alt="四川大学"
                                width={56}
                                height={56}
                            />
                        </div>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex md:grow">
                        {/* Dropdown */}
                        <div className="relative">
                            {/* store trigger */}
                            <button
                                className="group font-medium text-purple-600 hover:text-gray-200 px-8 py-3 flex items-center transition duration-150 ease-in-out"
                                onClick={() => setIsOpen_store(!isOpen_store)}>
                                商户分析
                                <svg
                                    className="w-4 h-4 relative top-1 -mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {/* store menu */}
                            <div
                                className={`absolute mt-0 ml-5 w-24 bg-black bg-opacity-20 rounded-md shadow-lg z-50 ${isOpen_store ? '' : 'hidden'}`}
                                aria-labelledby="menu-button">
                                <div className="py-1">
                                    <Link href="/store-total"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_store(!isOpen_store)}>商户总览</Link>
                                    <Link href="/store-distribution"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_store(!isOpen_store)}>商户分布</Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* user trigger */}
                            <button
                                className="group font-medium text-purple-600 hover:text-gray-200 px-8 py-3 flex items-center transition duration-150 ease-in-out"
                                onClick={() => setIsOpen_user(!isOpen_user)}>
                                用户分析
                                <svg
                                    className="w-4 h-4 relative top-1 -mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {/* user menu */}
                            <div
                                className={`absolute mt-0 ml-5 w-24 bg-black bg-opacity-20 rounded-md shadow-lg z-50 ${isOpen_user ? '' : 'hidden'}`}
                                aria-labelledby="menu-button">
                                <div className="py-1">
                                    <Link href="/user-total"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_user(!isOpen_user)}>用户总览</Link>
                                    <Link href="/user-quality"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_user(!isOpen_user)}> 用户质量 </Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* comment trigger */}
                            <button
                                className="group font-medium text-purple-600 hover:text-gray-200 px-8 py-3 flex items-center transition duration-150 ease-in-out"
                                onClick={() => setIsOpen_comment(!isOpen_comment)}>
                                评论分析
                                <svg
                                    className="w-4 h-4 relative top-1 -mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {/* comment menu */}
                            <div
                                className={`absolute mt-0 ml-5 w-24 bg-black bg-opacity-20 rounded-md shadow-lg z-50 ${isOpen_comment ? '' : 'hidden'}`}
                                aria-labelledby="menu-button">
                                <div className="py-1">
                                    <Link href="/comment-total"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_comment(!isOpen_comment)}>评论总览</Link>
                                    <Link href="/comment-word"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_comment(!isOpen_comment)}>评论热词</Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* score trigger */}
                            <button
                                className="group font-medium text-purple-600 hover:text-gray-200 px-8 py-3 flex items-center transition duration-150 ease-in-out"
                                onClick={() => setIsOpen_score(!isOpen_score)}>
                                评分分析
                                <svg
                                    className="w-4 h-4 relative top-1 -mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {/* score menu */}
                            <div
                                className={`absolute mt-0 ml-5 w-24 bg-black bg-opacity-20 rounded-md shadow-lg z-50 ${isOpen_score ? '' : 'hidden'}`}
                                aria-labelledby="menu-button">
                                <div className="py-1">
                                    <Link href="/score-total"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_score(!isOpen_score)}>评分总览</Link>
                                    <Link href="/score-distribution"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_score(!isOpen_score)}> 评分分布 </Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* checkin trigger */}
                            <button
                                className="group font-medium text-purple-600 hover:text-gray-200 px-8 py-3 flex items-center transition duration-150 ease-in-out"
                                onClick={() => setIsOpen_checkin(!isOpen_checkin)}>
                                打卡分析
                                <svg
                                    className="w-4 h-4 relative top-1 -mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {/* checkin menu */}
                            <div
                                className={`absolute mt-0 ml-5 w-24 bg-black bg-opacity-20 rounded-md shadow-lg z-50 ${isOpen_checkin ? '' : 'hidden'}`}
                                aria-labelledby="menu-button">
                                <div className="py-1">
                                     <Link href="/checkin-total"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_checkin(!isOpen_checkin)}>打卡总览</Link>
                                     <Link href="/checkin-hot"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_checkin(!isOpen_checkin)}>打卡热门</Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* total trigger */}
                            <button
                                className="group font-medium text-purple-600 hover:text-gray-200 px-8 py-3 flex items-center transition duration-150 ease-in-out"
                                onClick={() => setIsOpen_total(!isOpen_total)}>
                                综合分析
                                <svg
                                    className="w-4 h-4 relative top-1 -mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            {/* total menu */}
                            <div
                                className={`absolute mt-0 ml-5 w-24 bg-black bg-opacity-20 rounded-md shadow-lg z-50 ${isOpen_total ? '' : 'hidden'}`}
                                aria-labelledby="menu-button">
                                <div className="py-1">
                                    <Link href="/total"
                                          className="block px-4 py-2 text-sm text-purple-600 hover:text-gray-200"
                                          onClick={() => setIsOpen_total(!isOpen_total)}>最佳商家</Link>
                                </div>
                            </div>
                        </div>

                        {/* Desktop sign in links */}
                        <ul className="flex grow justify-end flex-wrap items-center">
                            {/*    <li>
                                <Link href="/signup"
                                      className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                                    注册
                                </Link>
                            </li> */}
                            <li>
                                <Link href="/signin"
                                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                                    登陆
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <MobileMenu/>

                </div>
            </div>
        </header>
    )
}
