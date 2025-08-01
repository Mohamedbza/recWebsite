"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Search,
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
  ArrowRight,
  Info,
  Settings,
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  const { t, locale } = useLanguage()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.account)
  
  // Define dropdown content
  const candidatsDropdown: DropdownItem[] = [
    {
      href: "/candidats",
      icon: <Sparkles className="h-4 w-4 text-primary" />,
      title: t('navigation.overview'),
      description: t('navigation.overview_desc'),
    },
    {
      href: "/emplois",
      icon: <Briefcase className="h-4 w-4 text-primary" />,
      title: t('navigation.job_offers'),
      description: t('navigation.job_offers_desc'),
    },
  ]

  const employeursDropdown: DropdownItem[] = [
    {
      href: "/employeurs",
      icon: <Building2 className="h-4 w-4 text-primary" />,
      title: t('navigation.overview'),
      description: t('navigation.overview_desc'),
    },
    {
      href: "/employeurs/dashboard",
      icon: <Users className="h-4 w-4 text-primary" />,
      title: t('navigation.dashboard'),
      description: t('navigation.dashboard_desc'),
    },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  
  // Refs for dropdowns and search
  const accountRef = useRef<HTMLDivElement>(null)
  const candidatsRef = useRef<HTMLDivElement>(null)
  const employeursRef = useRef<HTMLDivElement>(null)
  const languageRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Handle scroll effect for header background with smooth transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
    }
    
    // Throttle scroll events for better performance
    let ticking = false
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener("scroll", scrollHandler, { passive: true })
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [])

  // Check if a navigation link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname?.startsWith(path)
  }

  // Toggle dropdown visibility with animation
  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  // Toggle search expansion
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded)
    if (!isSearchExpanded) {
      // Focus the input when expanding
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 150)
    } else {
      // Clear search when collapsing
      setSearchQuery("")
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
        activeDropdown === "candidats" &&
        candidatsRef.current &&
        !candidatsRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null)
      } else if (
        activeDropdown === "employeurs" &&
        employeursRef.current &&
        !employeursRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null)
      } else if (
        activeDropdown === "language" &&
        languageRef.current &&
        !languageRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null)
      } else if (
        isSearchExpanded &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsSearchExpanded(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown, isSearchExpanded])

  // Close dropdown on route change
  useEffect(() => {
    if (activeDropdown) {
      setActiveDropdown(null)
    }
    if (isSearchExpanded) {
      setIsSearchExpanded(false)
      setSearchQuery("")
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

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/emplois?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchExpanded(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2 md:px-6">
      <div
        className={`
          mx-auto max-w-[1920px] rounded-2xl transition-all duration-700 ease-out mt-2 group
          ${
            isScrolled
              ? "bg-background/80 backdrop-blur-xl shadow-2xl border border-white/30 transform scale-[0.98]"
              : "bg-background/50 backdrop-blur-lg shadow-xl border border-white/20 transform scale-100"
          }
        `}
      >
        <div className="flex h-16 items-center justify-between px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-12">
            {/* Enhanced Logo with Hover Animation */}
            <Link href="/" className="flex items-center group/logo transition-all duration-300 hover:scale-105">
              <div className="relative">
                <Image
                  src="/images/rp-logo-1.png"
                  alt="Recruitment Plus Logo"
                  width={160}
                  height={36}
                  className="h-8 w-auto transition-all duration-300 group-hover/logo:brightness-110"
                />
                {/* Animated Badge */}
                <div className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                </div>
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-primary/20 opacity-0 group-hover/logo:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
              </div>
            </Link>

            {/* Enhanced Navigation with Better Animations */}
            <nav className="hidden lg:flex gap-2">
              {/* Candidats Dropdown */}
              <div className="relative" ref={candidatsRef}>
                <button
                  onClick={() => toggleDropdown("candidats")}
                  className={`group/nav flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive("/candidats") || isActive("/emplois")
                      ? "text-primary bg-primary/15 backdrop-blur-sm shadow-md border border-primary/20"
                      : "hover:bg-white/15 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                  }`}
                >
                  <Users className="h-4 w-4 transition-transform duration-300 group-hover/nav:scale-110" />
                  <span className="relative">
                    {t('navigation.candidates')}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                  <ChevronDown
                    className={`h-3 w-3 transition-all duration-300 ${
                      activeDropdown === "candidats" 
                        ? "rotate-180 text-primary" 
                        : "group-hover/nav:rotate-180"
                    }`}
                  />
                </button>

                {/* Candidats Dropdown Menu */}
                {activeDropdown === "candidats" && (
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-background/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50">
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {t('navigation.candidates_header')}
                        </h3>
                        <p className="text-sm text-muted-foreground">{t('navigation.candidates_subtitle')}</p>
                      </div>
                      <div className="space-y-3">
                        {candidatsDropdown.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleDropdownItemClick(item.href)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer text-left"
                          >
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              {item.icon}
                            </div>
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Employeurs Dropdown */}
              <div className="relative" ref={employeursRef}>
                <button
                  onClick={() => toggleDropdown("employeurs")}
                  className={`group/nav flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive("/employeurs") || activeDropdown === "employeurs"
                      ? "text-primary bg-primary/15 backdrop-blur-sm shadow-md border border-primary/20"
                      : "hover:bg-white/15 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                  }`}
                >
                  <Building2 className="h-4 w-4 transition-transform duration-300 group-hover/nav:scale-110" />
                  <span className="relative">
                    {t('navigation.employers')}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                  <ChevronDown
                    className={`h-3 w-3 transition-all duration-300 ${
                      activeDropdown === "employeurs" 
                        ? "rotate-180 text-primary" 
                        : "group-hover/nav:rotate-180"
                    }`}
                  />
                </button>

                {/* Employeurs Dropdown Menu */}
                {activeDropdown === "employeurs" && (
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-background/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50">
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {t('navigation.employers_header')}
                        </h3>
                        <p className="text-sm text-muted-foreground">{t('navigation.employers_subtitle')}</p>
                      </div>
                      <div className="space-y-3">
                        {employeursDropdown.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleDropdownItemClick(item.href)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer text-left"
                          >
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              {item.icon}
                            </div>
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About Link */}
              <Link
                href="/a-propos"
                className={`group/nav flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive("/a-propos")
                    ? "text-primary bg-primary/15 backdrop-blur-sm shadow-md border border-primary/20"
                    : "hover:bg-white/15 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                }`}
              >
                <Info className="h-4 w-4 transition-transform duration-300 group-hover/nav:scale-110" />
                <span className="relative">
                  {t('navigation.about')}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>

              {/* Services Link */}
              <Link
                href="/services"
                className={`group/nav flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive("/services")
                    ? "text-primary bg-primary/15 backdrop-blur-sm shadow-md border border-primary/20"
                    : "hover:bg-white/15 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                }`}
              >
                <Settings className="h-4 w-4 transition-transform duration-300 group-hover/nav:scale-110" />
                <span className="relative">
                  {t('navigation.services')}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>

            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Blog Link */}
            <Link
              href="/blog"
              className="hidden lg:flex group/nav px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:text-primary hover:shadow-lg hover:shadow-primary/10 transform hover:scale-105"
            >
              <span className="relative">
                {t('navigation.blog')}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
            </Link>

            {/* Enhanced Expandable Search */}
            <div ref={searchRef} className="hidden md:flex items-center">
              <div className={`flex items-center rounded-xl backdrop-blur-sm transition-all duration-500 ease-out ${
                isSearchExpanded 
                  ? "bg-background/90 border border-primary/30 shadow-lg shadow-primary/10 w-80" 
                  : "bg-transparent w-auto"
              }`}>
                {isSearchExpanded ? (
                  <form onSubmit={handleSearch} className="flex items-center w-full">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary transition-colors duration-300" />
                      <Input
                        ref={searchInputRef}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={locale === 'fr' ? 'Rechercher un poste, entreprise...' : 'Search jobs, companies...'}
                        className="pl-10 pr-12 border-0 bg-transparent focus:ring-0 focus:ring-offset-0 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setIsSearchExpanded(false)
                            setSearchQuery("")
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={toggleSearch}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                        aria-label="Fermer la recherche"
                      >
                        <X className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={toggleSearch}
                    className="group/search flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:text-primary hover:shadow-lg hover:shadow-primary/10 transform hover:scale-105"
                    aria-label="Rechercher"
                  >
                    <Search className="h-4 w-4 transition-transform duration-300 group-hover/search:scale-110 group-hover/search:rotate-12" />
                  </button>
                )}
              </div>
            </div>

            {/* Enhanced Account Dropdown */}
            <div className="relative hidden md:block" ref={accountRef}>
              <button
                onClick={() => toggleDropdown("account")}
                className={`group/account flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeDropdown === "account"
                    ? "text-primary bg-primary/15 backdrop-blur-sm shadow-md border border-primary/20"
                    : "hover:bg-white/15 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                }`}
                aria-label="Compte"
              >
                {isAuthenticated && user ? (
                  <>
                    <Avatar className="h-6 w-6 ring-2 ring-primary/20 transition-all duration-300 group-hover/account:ring-primary/40">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium max-w-24 truncate">{user.name}</span>
                  </>
                ) : (
                  <User className="h-4 w-4 transition-transform duration-300 group-hover/account:scale-110" />
                )}
                <ChevronDown
                  className={`h-4 w-4 transition-all duration-300 ${
                    activeDropdown === "account" 
                      ? "rotate-180 text-primary" 
                      : "group-hover/account:rotate-180"
                  }`}
                />
              </button>

              {/* Enhanced Dropdown Menu */}
              {activeDropdown === "account" && (
                <div className="absolute top-full right-0 mt-3 w-72 rounded-2xl bg-background/95 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-1">
                    {isAuthenticated && user ? (
                      <div className="space-y-1">
                        {/* User Info Card */}
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                          <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-foreground truncate">{user.name}</div>
                            <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                            <div className="text-xs text-primary capitalize font-medium bg-primary/10 px-2 py-0.5 rounded-full w-fit mt-1">
                              {user.role}
                            </div>
                          </div>
                        </div>
                        
                        {/* Dashboard Button */}
                        <button
                          onClick={() => handleDropdownItemClick(user.role === 'candidate' ? '/candidate/dashboard' : '/employeurs/dashboard')}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-all duration-200 group/item cursor-pointer text-left"
                        >
                          <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-200">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">Dashboard</div>
                            <div className="text-xs text-muted-foreground">Gérer votre profil</div>
                          </div>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-all duration-200" />
                        </button>
                        
                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group/item cursor-pointer text-left"
                        >
                          <div className="p-1.5 rounded-lg bg-red-100 text-red-600 group-hover/item:bg-red-600 group-hover/item:text-white transition-all duration-200">
                            <LogOut className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{t('navigation.logout') || 'Déconnexion'}</div>
                            <div className="text-xs text-muted-foreground">Se déconnecter du compte</div>
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {/* Login Button */}
                        <button
                          onClick={() => handleDropdownItemClick("/login")}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-all duration-200 group/item cursor-pointer text-left"
                        >
                          <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-200">
                            <LogIn className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{t('navigation.login')}</div>
                            <div className="text-xs text-muted-foreground">Accéder à votre compte</div>
                          </div>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-all duration-200" />
                        </button>
                        
                        {/* Register Button */}
                        <button
                          onClick={() => handleDropdownItemClick("/register")}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-all duration-200 group/item cursor-pointer text-left"
                        >
                          <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-200">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{t('navigation.register')}</div>
                            <div className="text-xs text-muted-foreground">Créer un nouveau compte</div>
                          </div>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-all duration-200" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Language Switcher */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <LanguageSwitcher />
            </div>
            
            {/* Enhanced Theme Toggle */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <ThemeToggle />
            </div>

            {/* Enhanced Contact Button */}
            <Button
              size="sm"
              className="hidden md:inline-flex rounded-xl bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 group/contact border border-primary/20"
              onClick={() => router.push('/contact')}
            >
              <Phone className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/contact:scale-110 group-hover/contact:rotate-12" />
              <span className="font-medium">{t('navigation.contact')}</span>
            </Button>

            {/* Enhanced Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 rounded-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group/menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-2 rounded-2xl bg-background/90 backdrop-blur-xl shadow-2xl border border-white/30 overflow-hidden animate-in slide-in-from-top-5 duration-300 ease-out">
          <div className="py-6 space-y-6 px-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
            {/* Primary Navigation - Enhanced */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
                Navigation Principale
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-primary px-4 py-1">{t('navigation.candidates')}</div>
                {candidatsDropdown.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 px-4 py-3 font-medium rounded-xl hover:bg-primary/10 transition-all duration-300 group/mobile transform hover:scale-[1.02] ml-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${50 + index * 25}ms` }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/mobile:bg-primary group-hover/mobile:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/mobile:opacity-100 transition-all duration-300" />
                  </Link>
                ))}
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold text-primary px-4 py-1">{t('navigation.employers')}</div>
                {employeursDropdown.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 px-4 py-3 font-medium rounded-xl hover:bg-primary/10 transition-all duration-300 group/mobile transform hover:scale-[1.02] ml-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${100 + index * 25}ms` }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/mobile:bg-primary group-hover/mobile:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/mobile:opacity-100 transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Secondary Navigation - Enhanced */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
                Découvrir
              </div>
              <Link
                href="/a-propos"
                className="flex items-center gap-4 px-4 py-3 font-medium rounded-xl hover:bg-primary/10 transition-all duration-300 group/mobile transform hover:scale-[1.02]"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: '150ms' }}
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/mobile:bg-primary group-hover/mobile:text-white transition-all duration-300">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">À Propos</div>
                  <div className="text-xs text-muted-foreground">Notre histoire et mission</div>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover/mobile:opacity-100 transition-all duration-300" />
              </Link>

              <Link
                href="/services"
                className="flex items-center gap-4 px-4 py-3 font-medium rounded-xl hover:bg-primary/10 transition-all duration-300 group/mobile transform hover:scale-[1.02]"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: '200ms' }}
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/mobile:bg-primary group-hover/mobile:text-white transition-all duration-300">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{t('navigation.services')}</div>
                  <div className="text-xs text-muted-foreground">Nos solutions complètes</div>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover/mobile:opacity-100 transition-all duration-300" />
              </Link>


              <Link
                href="/blog"
                className="flex items-center gap-4 px-4 py-3 font-medium rounded-xl hover:bg-primary/10 transition-all duration-300 group/mobile transform hover:scale-[1.02]"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: '225ms' }}
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/mobile:bg-primary group-hover/mobile:text-white transition-all duration-300">
                  <Search className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Blog</div>
                  <div className="text-xs text-muted-foreground">Actualités et conseils</div>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover/mobile:opacity-100 transition-all duration-300" />
              </Link>
            </div>
              
            {/* Enhanced Mobile Account Section */}
            {isAuthenticated && user ? (
              <div className="space-y-2 border-t border-white/10 pt-6" style={{ animationDelay: '300ms' }}>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
                  Mon Compte
                </div>
                <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/30">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground truncate">{user.name}</div>
                    <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                    <div className="text-xs text-primary capitalize font-medium bg-primary/10 px-2 py-0.5 rounded-full w-fit mt-1">
                      {user.role}
                    </div>
                  </div>
                </div>
                
                <Link
                  href={user.role === 'candidate' ? '/candidate/dashboard' : '/employeurs/dashboard'}
                  className="flex items-center gap-4 px-4 py-3 font-medium rounded-xl hover:bg-primary/10 transition-all duration-300 group/mobile transform hover:scale-[1.02]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/mobile:bg-primary group-hover/mobile:text-white transition-all duration-300">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Dashboard</div>
                    <div className="text-xs text-muted-foreground">Gérer votre profil</div>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover/mobile:opacity-100 transition-all duration-300" />
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 font-medium rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 group/mobile text-left transform hover:scale-[1.02]"
                >
                  <div className="p-2 rounded-lg bg-red-100 text-red-600 group-hover/mobile:bg-red-600 group-hover/mobile:text-white transition-all duration-300">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{t('navigation.logout') || 'Déconnexion'}</div>
                    <div className="text-xs text-muted-foreground">Se déconnecter du compte</div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-2 border-t border-white/10 pt-6" style={{ animationDelay: '300ms' }}>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
                  Connexion
                </div>
                <Link
                  href="/login"
                  className="flex items-center gap-4 px-4 py-3 font-medium rounded-xl hover:bg-primary/10 transition-all duration-300 group/mobile transform hover:scale-[1.02]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/mobile:bg-primary group-hover/mobile:text-white transition-all duration-300">
                    <LogIn className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{t('navigation.login')}</div>
                    <div className="text-xs text-muted-foreground">Accéder à votre compte</div>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover/mobile:opacity-100 transition-all duration-300" />
                </Link>
                
                <Link
                  href="/register"
                  className="flex items-center gap-4 px-4 py-3 font-medium rounded-xl hover:bg-primary/10 transition-all duration-300 group/mobile transform hover:scale-[1.02]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/mobile:bg-primary group-hover/mobile:text-white transition-all duration-300">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{t('navigation.register')}</div>
                    <div className="text-xs text-muted-foreground">Créer un nouveau compte</div>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover/mobile:opacity-100 transition-all duration-300" />
                </Link>
              </div>
            )}

            {/* Enhanced Contact CTA */}
            <div className="pt-6 border-t border-white/10" style={{ animationDelay: '350ms' }}>
              <Button
                className="w-full rounded-xl bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-[1.02] group/cta"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  router.push('/contact')
                }}
              >
                <Phone className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/cta:scale-110 group-hover/cta:rotate-12" />
                <span className="font-medium">{t('navigation.contact')}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}