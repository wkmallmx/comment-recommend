'use client'

import React, { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import PageIllustrationF from '@/components/page-illustration-f'
import Footer from '@/components/ui/footer'
import React from "react";

export default function DefaultLayout({children,}: { children: React.ReactNode })
{

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <>
      <main className="grow">

        <PageIllustrationF />

        {children}

      </main>

      <Footer />
    </>
  )
}
