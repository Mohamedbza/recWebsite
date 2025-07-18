"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Search, 
  User, 
  FileText,
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
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    title: { en: "Job Search", fr: "Recherche d'emploi" },
    href: "/candidate/emplois",
    icon: Search,
    color: "text-green-600 dark:text-green-400"
  },
  {
    title: { en: "My Applications", fr: "Mes candidatures" },
    href: "/candidate/applications",
    icon: Briefcase,
    color: "text-purple-600 dark:text-purple-400"
  },
  {
    title: { en: "Profile", fr: "Profil" },
    href: "/candidate/profile",
    icon: User,
    color: "text-orange-600 dark:text-orange-400"
  }
]

const toolsItems = [
  {
    title: { en: "My Resume", fr: "Mon CV" },
    href: "/candidate/resume",
    icon: FileText,
    color: "text-gray-600 dark:text-gray-400"
  },
  {
    title: { en: "Interviews", fr: "Entrevues" },
    href: "/candidate/interviews",
    icon: Calendar,
    color: "text-indigo-600 dark:text-indigo-400"
  },
  {
    title: { en: "Certifications", fr: "Certifications" },
    href: "/candidate/certifications",
    icon: Award,
    color: "text-yellow-600 dark:text-yellow-400"
  },
  {
    title: { en: "Learning", fr: "Formation" },
    href: "/candidate/learning",
    icon: BookOpen,
    color: "text-pink-600 dark:text-pink-400"
  }
]

export default function CandidateLayout({ children }: CandidateLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { locale } = useLanguage()
  const { user, isLoggedIn, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check if user is authenticated and has candidate role
  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'candidate') {
      router.push('/login')
    }
  }, [isLoggedIn, user, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Don't render layout if user is not authenticated or not a candidate
  if (!isLoggedIn || user?.role !== 'candidate') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 transform bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Candidate Hub
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 space-y-8">
            {/* Main Navigation */}
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {locale === 'fr' ? 'Navigation' : 'Navigation'}
              </h3>
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isActive ? item.color : "text-gray-400 group-hover:text-gray-500"
                      )} />
                      {item.title[locale]}
                      {isActive && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Tools Section */}
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {locale === 'fr' ? 'Outils' : 'Tools'}
              </h3>
              <nav className="space-y-1">
                {toolsItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className={cn(
                        "mr-3 h-4 w-4 transition-colors",
                        isActive ? item.color : "text-gray-400 group-hover:text-gray-500"
                      )} />
                      {item.title[locale]}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Settings & Logout */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
            <Link
              href="/candidate/settings"
              className="group flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              <Settings className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500" />
              {locale === 'fr' ? 'Paramètres' : 'Settings'}
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              {locale === 'fr' ? 'Déconnexion' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex h-full items-center justify-between px-6">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Page Title */}
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {pathname === '/candidate/dashboard' && (locale === 'fr' ? 'Tableau de bord' : 'Dashboard')}
                {pathname === '/candidate/emplois' && (locale === 'fr' ? 'Recherche d\'emploi' : 'Job Search')}
                {pathname === '/candidate/applications' && (locale === 'fr' ? 'Mes candidatures' : 'My Applications')}
                {pathname === '/candidate/profile' && (locale === 'fr' ? 'Mon profil' : 'My Profile')}
                {pathname === '/candidate/settings' && (locale === 'fr' ? 'Paramètres' : 'Settings')}
              </h1>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/candidate/emplois">
                  <Search className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Rechercher' : 'Search Jobs'}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 