"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { logoutUser } from "@/store/slices/accountSlice"

export default function PublierOffreLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.account)

  // Check if user is authenticated and has employer role
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login')
      } else if (user?.role === 'candidate') {
        // If user is a candidate trying to access employer routes, logout and redirect
        dispatch(logoutUser())
        router.push('/login')
      } else if (user?.role !== 'employer') {  
        router.push('/login')
      }
    }
  }, [isAuthenticated, user, router, isLoading, dispatch])

  // Show loading state while auth is being initialized
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-primary/20 border-t-primary"></div>
      </div>
    )
  }

  // Don't render layout if user is not authenticated or not an employer
  if (!isAuthenticated || user?.role !== 'employer') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-primary/20 border-t-primary"></div>
      </div>
    )
  }

  return <>{children}</>
} 