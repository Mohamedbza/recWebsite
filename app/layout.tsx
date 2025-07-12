import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingContact } from "@/components/floating-contact"
import { CookieConsent } from "@/components/ui/cookie-consent"
import { LanguageProvider } from "@/contexts/LanguageContext"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recruitment Plus",
  description: "Solutions de recrutement personnalisées pour employeurs et candidats",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <FloatingContact />
              <CookieConsent />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}