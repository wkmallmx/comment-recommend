import PageIllustrationF from '@/components/page-illustration-f'
import React from "react";

export default function AuthLayout({children,}: { children: React.ReactNode })
{
  return (
    <main className="grow">

      <PageIllustrationF />

      {children}

    </main>
  )
}
