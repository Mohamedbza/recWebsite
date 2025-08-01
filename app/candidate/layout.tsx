"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { logoutUser } from "@/store/slices/accountSlice"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Search, 
  User, 
  Settings,
  Briefcase,
  Calendar,
  Award,
  BookOpen,
  LogOut,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface CandidateLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  {
    title: { en: "Dashboard", fr: "Tableau de bord" },
    href: "/candidate/dashboard",
    icon: LayoutDashboard,
    gradient: "from-primary to-primary/80"
  },
  {
    title: { en: "Job Search", fr: "Recherche d'emploi" },
    href: "/candidate/emplois",
    icon: Search,
    gradient: "from-green-500 to-green-600"
  },
  {
    title: { en: "My Applications", fr: "Mes candidatures" },
    href: "/candidate/applications",
    icon: Briefcase,
    gradient: "from-purple-500 to-purple-600"
  },
  {
    title: { en: "Profile", fr: "Profil" },
    href: "/candidate/profile",
    icon: User,
    gradient: "from-orange-500 to-orange-600"
  }
]


export default function CandidateLayout({ children }: CandidateLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { locale } = useLanguage()
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.account)
  const dispatch = useAppDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check if user is authenticated and has candidate role
  useEffect(() => {
    if (!isLoading && !isAuthenticated || user?.role !== 'candidate') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router, isLoading])

  const handleLogout = async () => {
    await dispatch(logoutUser())
    router.push('/')
  }

  // Show loading state while auth is being initialized
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-primary/20 border-t-primary"></div>
      </div>
    )
  }

  // Don't render layout if user is not authenticated or not a candidate
  if (!isAuthenticated || user?.role !== 'candidate') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-primary/20 border-t-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full w-72 transform bg-gradient-to-b from-white/95 via-white/90 to-primary/5 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-primary/10 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20 shadow-2xl shadow-primary/10 transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Mobile Close Button */}
          <div className="flex justify-end p-4 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-white/20 rounded-xl"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                {user?.name ? user.name[0].toUpperCase() : user?.email?.[0].toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">
                    {locale === 'fr' ? 'En ligne' : 'Online'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <h3 className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                {locale === 'fr' ? 'Navigation' : 'Navigation'}
              </h3>
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-300 relative overflow-hidden",
                        isActive
                          ? "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent text-primary shadow-lg shadow-primary/10 border border-primary/20"
                          : "text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-foreground hover:shadow-md hover:scale-105"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className={cn(
                        "h-8 w-8 rounded-xl flex items-center justify-center mr-4 transition-all duration-300",
                        isActive 
                          ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                          : "bg-muted/50 group-hover:bg-muted"
                      )}>
                        <Icon className={cn(
                          "h-4 w-4 transition-all duration-300",
                          isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                        )} />
                      </div>
                      {item.title[locale]}
                      {isActive && (
                        <div className="ml-auto flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        </div>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

          </div>

          {/* Settings & Logout */}
          <div className="p-4 border-t border-white/20 dark:border-gray-700/20 space-y-2">
            <Link
              href="/candidate/settings"
              className="group flex items-center px-4 py-3 text-sm font-medium text-muted-foreground rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-foreground transition-all duration-300 hover:scale-105"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="h-7 w-7 rounded-xl bg-muted/50 group-hover:bg-muted flex items-center justify-center mr-3 transition-all duration-300">
                <Settings className="h-3.5 w-3.5" />
              </div>
              {locale === 'fr' ? 'Paramètres' : 'Settings'}
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-2xl py-3 h-auto font-medium hover:scale-105 transition-all duration-300"
              onClick={handleLogout}
            >
              <div className="h-7 w-7 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                <LogOut className="h-3.5 w-3.5" />
              </div>
              {locale === 'fr' ? 'Déconnexion' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Mobile Menu Button - Fixed Position */}
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-4 left-4 z-40 lg:hidden hover:bg-white/20 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}