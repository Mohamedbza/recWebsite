"use client"

import { ReactNode, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { EmployerAuthProvider, useEmployerAuth } from "@/contexts/EmployerAuthContext"

function AuthGate({ children }: { children: ReactNode }) {
  const { isEmployerLoggedIn } = useEmployerAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isEmployerLoggedIn) {
      router.replace(`/employeurs/login?returnTo=${encodeURIComponent(pathname)}`)
    }
  }, [isEmployerLoggedIn, pathname])

  if (!isEmployerLoggedIn) return null

  return <>{children}</>
}

export default function PublierOffreLayout({ children }: { children: ReactNode }) {
  return (
    <EmployerAuthProvider>
      <AuthGate>{children}</AuthGate>
    </EmployerAuthProvider>
  )
} 