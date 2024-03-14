'use client'

import Link from 'next/link'
import Image from 'next/image';
import MobileMenu from './mobile-menu'
import React, {useContext, useState, useEffect} from 'react';
import logo from '@/public/images/logo.png'
import {UserContext} from "@/context";
import {useRouter} from 'next/navigation';

export default function Header() {
    const [isOpen_store, setIsOpen_store] = useState(false);
    const [isOpen_user, setIsOpen_user] = useState(false);
    const [isOpen_comment, setIsOpen_comment] = useState(false);
    const [isOpen_score, setIsOpen_score] = useState(false);
    const [isOpen_checkin, setIsOpen_checkin] = useState(false);
    const [isOpen_total, setIsOpen_total] = useState(false);

    const {user, setUser} = useContext(UserContext);
    const router = useRouter()

    const handleLogout = () => {
        setUser(() => ({
            latitude: null,
            longitude: null,
            role: null,
            name: null,
            text: null,
            id: null,
        }));

        console.log('用户信息', user.name);
    }

    useEffect(() => {
        // 检查 user 状态，如果不为空则表示已经更新
        if (user.name === null) {
            // 根据 user.role 决定跳转路径
            router.push('/home'); // 执行跳转
        }
    }, [user, router]); // 依赖项包含 user 和 router，以便在它们变化时重新执行

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

                            <div className="relative">
                                {/* Logout */}
                                <button
                                    className="group font-medium text-purple-600 hover:text-gray-200 px-8 py-3 flex items-center transition duration-150 ease-in-out"
                                    onClick={() => handleLogout()}>
                                    登出
                                </button>
                            </div>

                    </nav>
                    <MobileMenu/>
                </div>
            </div>
        </header>
    )
}
