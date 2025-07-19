"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingContact } from "@/components/floating-contact"
import { CookieConsent } from "@/components/ui/cookie-consent"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Hide header and footer in candidate section
  const isCandidateSection = pathname?.startsWith('/candidate')
  
  return (
    <div className="flex min-h-screen flex-col">
      {!isCandidateSection && <SiteHeader />}
      <main className="flex-1">{children}</main>
      {!isCandidateSection && <SiteFooter />}
      <FloatingContact />
      <CookieConsent />
    </div>
  )
} 