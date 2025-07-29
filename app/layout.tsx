import type React from "react"
import { Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingContact } from "@/components/floating-contact"
import { CookieConsent } from "@/components/ui/cookie-consent"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AuthProvider } from "@/contexts/EmployerAuthContext"
import { ReduxProvider } from "@/components/providers/ReduxProvider"
import { AuthInitializer } from "@/components/AuthInitializer"
import "./globals.css"
import type { Metadata } from "next"
import { ConditionalLayout } from "@/components/ConditionalLayout"

// Configure Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

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
      <body className={`min-h-screen bg-gradient-to-br from-background via-background to-muted/30 ${montserrat.className}`}>
        <ReduxProvider>
          <AuthInitializer />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <LanguageProvider>
              <AuthProvider>
                <ConditionalLayout>{children}</ConditionalLayout>
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}