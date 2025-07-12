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
  
  // Refs for dropdowns
  const candidatsRef = useRef<HTMLDivElement>(null)
  const employeursRef = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)
  const languageRef = useRef<HTMLDivElement>(null)

  // Define dropdown content
  const candidatsDropdown: DropdownItem[] = [
    {
      href: "/candidats",
      icon: <Briefcase className="h-4 w-4 text-primary" />,
      title: "Vue d'ensemble",
      description: "Découvrez nos services",
    },
    {
      href: "/candidats/emplois",
      icon: <Search className="h-4 w-4 text-primary" />,
      title: "Offres d'emploi",
      description: "Trouvez votre emploi idéal",
    },
    // {
    //   href: "/candidats/faire-carriere",
    //   icon: <Sparkles className="h-4 w-4 text-primary" />,
    //   title: "Faire carrière avec R+",
    //   description: "Accompagnement personnalisé",
    // },
  ]

  const employeursDropdown: DropdownItem[] = [
    {
      href: "/employeurs",
      icon: <Building2 className="h-4 w-4 text-primary" />,
      title: "Vue d'ensemble",
      description: "Nos solutions RH",
    },
    {
      href: "https://recplus.vercel.app/login",
      icon: <Users className="h-4 w-4 text-primary" />,
      title: "Tableau de bord",
      description: "Gérer vos offres",
    },
  ]

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
              {/* Candidats Dropdown */}
              <div className="relative" ref={candidatsRef}>
                <button
                  onClick={() => toggleDropdown("candidats")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive("/candidats") || activeDropdown === "candidats"
                      ? "text-primary bg-primary/10 backdrop-blur-sm shadow-md"
                      : "hover:bg-white/10 hover:text-primary hover:shadow-md"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  {t('navigation.candidates')}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === "candidats" ? "rotate-180" : ""}`}
                  />
                </button>

                {activeDropdown === "candidats" && (
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-background/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50">
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          Pour les Candidats
                        </h3>
                        <p className="text-sm text-muted-foreground">Explorez vos opportunités de carrière</p>
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive("/employeurs") || activeDropdown === "employeurs"
                      ? "text-primary bg-primary/10 backdrop-blur-sm shadow-md"
                      : "hover:bg-white/10 hover:text-primary hover:shadow-md"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  {t('navigation.employers')}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === "employeurs" ? "rotate-180" : ""}`}
                  />
                </button>

                {activeDropdown === "employeurs" && (
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-background/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50">
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          Pour les Employeurs
                        </h3>
                        <p className="text-sm text-muted-foreground">Solutions de recrutement sur mesure</p>
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
                <User className="h-4 w-4" />
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === "account" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "account" && (
                <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-background/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden z-50">
                  <div className="p-4">
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
              <div className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Candidats
              </div>
              <nav className="flex flex-col space-y-2 pl-4">
                {candidatsDropdown.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-xl hover:bg-primary/5 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {})}
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <div className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Employeurs
              </div>
              <nav className="flex flex-col space-y-2 pl-4">
                {employeursDropdown.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-xl hover:bg-primary/5 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {})}
                    {item.title}
                  </Link>
                ))}
              </nav>
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