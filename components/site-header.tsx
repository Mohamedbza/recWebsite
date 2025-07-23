"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Search,
  Globe,
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  LogOut,
  Sparkles,
  Briefcase,
  Users,
  Building2,
  Phone,
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { logoutUser } from "@/store/slices/accountSlice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react"

// Define dropdown item types
type DropdownItem = {
  href: string
  icon: React.ReactNode
  title: string
  description: string
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.account)
  
  // Refs for dropdowns
  const accountRef = useRef<HTMLDivElement>(null)
  const languageRef = useRef<HTMLDivElement>(null)


  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if a navigation link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname?.startsWith(path)
  }

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        activeDropdown === "account" &&
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null)
      } else if (
        activeDropdown === "language" &&
        languageRef.current &&
        !languageRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  // Close dropdown on route change
  useEffect(() => {
    if (activeDropdown) {
      setActiveDropdown(null)
    }
  }, [pathname])

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [pathname])

  // Handle dropdown item click
  const handleDropdownItemClick = (href: string) => {
    setActiveDropdown(null)
    if (href.startsWith("http")) {
      window.location.href = href
    } else {
      router.push(href)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    await dispatch(logoutUser())
    setActiveDropdown(null)
    router.push('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 md:px-4">
      <div
        className={`
          mx-auto max-w-7xl rounded-2xl transition-all duration-500 mt-2
          ${
            isScrolled
              ? "bg-background/70 backdrop-blur-xl shadow-2xl border border-white/20"
              : "bg-background/40 backdrop-blur-lg shadow-xl border border-white/10"
          }
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
              <div className="relative">
                <Image
                  src="/images/rp-logo-1.png"
                  alt="Recruitment Plus Logo"
                  width={160}
                  height={36}
                  className="h-8 w-auto"
                />
                {!isScrolled && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                )}
              </div>
            </Link>

            <nav className="hidden lg:flex gap-2">
              {/* Candidats Direct Link */}
              <Link
                href="/candidats"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive("/candidats")
                    ? "text-primary bg-primary/10 backdrop-blur-sm shadow-md"
                    : "hover:bg-white/10 hover:text-primary hover:shadow-md"
                }`}
              >
                <Users className="h-4 w-4" />
                {t('navigation.candidates')}
              </Link>

              {/* Employeurs Direct Link */}
              <Link
                href="http://localhost:3001/employeurs"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive("/employeurs")
                    ? "text-primary bg-primary/10 backdrop-blur-sm shadow-md"
                    : "hover:bg-white/10 hover:text-primary hover:shadow-md"
                }`}
              >
                <Building2 className="h-4 w-4" />
                {t('navigation.employers')}
              </Link>

              <Link
                href="/a-propos"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive("/a-propos")
                    ? "text-primary bg-primary/10 backdrop-blur-sm shadow-md"
                    : "hover:bg-white/10 hover:text-primary hover:shadow-md"
                }`}
              >
                {t('navigation.about')}
              </Link>

              <Link
                href="/services"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive("/services")
                    ? "text-primary bg-primary/10 backdrop-blur-sm shadow-md"
                    : "hover:bg-white/10 hover:text-primary hover:shadow-md"
                }`}
              >
                {t('navigation.services')}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="hidden lg:flex px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:text-primary hover:shadow-md"
            >
              {t('navigation.blog')}
            </Link>

            <button
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:text-primary hover:shadow-md"
              aria-label="Rechercher"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Account Dropdown */}
            <div className="relative hidden md:block" ref={accountRef}>
              <button
                onClick={() => toggleDropdown("account")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeDropdown === "account"
                    ? "text-primary bg-primary/10 backdrop-blur-sm shadow-md"
                    : "hover:bg-white/10 hover:text-primary hover:shadow-md"
                }`}
                aria-label="Compte"
              >
                {isAuthenticated && user ? (
                  <>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </>
                ) : (
                  <User className="h-4 w-4" />
                )}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === "account" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "account" && (
                <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-background/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50">
                  <div className="p-4">
                    {isAuthenticated && user ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{user.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                            <div className="text-xs text-primary capitalize">{user.role}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDropdownItemClick(user.role === 'candidate' ? '/candidate/dashboard' : '/employeurs/dashboard')}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer text-left"
                        >
                          <User className="h-4 w-4 text-primary" />
                          <span>Dashboard</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer text-left"
                        >
                          <LogOut className="h-4 w-4 text-primary" />
                          <span>{t('navigation.logout') || 'Déconnexion'}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <button
                          onClick={() => handleDropdownItemClick("/login")}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer text-left"
                        >
                          <LogIn className="h-4 w-4 text-primary" />
                          <span>{t('navigation.login')}</span>
                        </button>
                        <button
                          onClick={() => handleDropdownItemClick("/register")}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer text-left"
                        >
                          <User className="h-4 w-4 text-primary" />
                          <span>{t('navigation.register')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />
            
            <ThemeToggle />

            <Button
              size="sm"
              className="hidden md:inline-flex rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              onClick={() => router.push('/contact')}
            >
              <Phone className="mr-2 h-4 w-4" />
              {t('navigation.contact')}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-2 rounded-2xl bg-background/80 backdrop-blur-xl shadow-2xl border border-white/20 overflow-y-auto max-h-[calc(100vh-5rem)] animate-in slide-in-from-top-5 duration-300">
          <div className="py-6 space-y-6 px-6">
            {/* Mobile Menu Content */}
            <div className="space-y-4">
              <Link
                href="/candidats"
                className="flex items-center gap-3 px-3 py-2 font-medium rounded-xl hover:bg-primary/5 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="h-4 w-4 text-primary" />
                {t('navigation.candidates')}
              </Link>
            </div>

            <div className="space-y-4">
              <Link
                href="http://localhost:3001/employeurs"
                className="flex items-center gap-3 px-3 py-2 font-medium rounded-xl hover:bg-primary/5 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Building2 className="h-4 w-4 text-primary" />
                {t('navigation.employers')}
              </Link>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <Link
                href="/a-propos"
                className="flex items-center gap-3 px-3 py-2 font-medium rounded-xl hover:bg-primary/5 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="h-4 w-4 text-primary" />À Propos
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-3 px-3 py-2 font-medium rounded-xl hover:bg-primary/5 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Briefcase className="h-4 w-4 text-primary" />
                {t('navigation.services')}
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-3 px-3 py-2 font-medium rounded-xl hover:bg-primary/5 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search className="h-4 w-4 text-primary" />
                Blog
              </Link>
              
              {/* Mobile Account Section */}
              {isAuthenticated && user ? (
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-primary/5">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{user.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                      <div className="text-xs text-primary capitalize">{user.role}</div>
                    </div>
                  </div>
                  <Link
                    href={user.role === 'candidate' ? '/candidate/dashboard' : '/employeurs/dashboard'}
                    className="flex items-center gap-3 px-3 py-2 font-medium rounded-xl hover:bg-primary/5 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 text-primary" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 font-medium rounded-xl hover:bg-primary/5 transition-all duration-300 text-left"
                  >
                    <LogOut className="h-4 w-4 text-primary" />
                    {t('navigation.logout') || 'Déconnexion'}
                  </button>
                </div>
              ) : (
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-3 py-2 font-medium rounded-xl hover:bg-primary/5 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4 text-primary" />
                    {t('navigation.login')}
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-3 px-3 py-2 font-medium rounded-xl hover:bg-primary/5 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 text-primary" />
                    {t('navigation.register')}
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button
                className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  router.push('/contact')
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                {t('navigation.contact')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}