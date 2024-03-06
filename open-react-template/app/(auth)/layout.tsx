import PageIllustration from '@/components/page-illustration'
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) ;
  return (
    <main className="grow">

      <PageIllustration />

      {children}

    </main>
  )
}
