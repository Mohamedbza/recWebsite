"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function SiteFooter() {
  const { t, locale } = useLanguage()
  
  const year = new Date().getFullYear()
  
  return (
    <footer className="relative">
      {/* Wave divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-[-1px]">
        <svg className="relative block" style={{ width: "calc(100% + 1.3px)" }} height="70" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" className="text-background"></path>
        </svg>
      </div>
      
      {/* Main footer content */}
      <div className="bg-gradient-to-br from-primary/90 via-primary to-secondary/90 text-white pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
                <Image
                  src="/images/rp-logo-1.png"
                  alt="Recruitment Plus Logo"
                  width={160}
                  height={36}
                  className="h-10 w-auto filter brightness-0 invert"
                />
              </Link>
              <p className="text-sm text-white/80">
                {locale === 'fr' 
                  ? 'Solutions de recrutement personnalisées pour employeurs et candidats à travers le Canada et au niveau international.' 
                  : 'Customized recruitment solutions for employers and candidates across Canada and internationally.'}
              </p>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Twitter className="h-4 w-4 text-white" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Facebook className="h-4 w-4 text-white" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-white" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-white" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6 text-white">
                {locale === 'fr' ? 'Liens Rapides' : 'Quick Links'}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/candidats" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'Candidats' : 'Candidates'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/employeurs" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'Employeurs' : 'Employers'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'Services' : 'Services'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/a-propos" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'À Propos' : 'About'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'Blog' : 'Blog'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'Contact' : 'Contact'}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6 text-white">
                {locale === 'fr' ? 'Mentions Légales' : 'Legal'}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/policies/terms-of-use" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'Conditions d\'Utilisation' : 'Terms of Use'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/policies/privacy-policy" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/policies/refund-policy" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'Politique de Remboursement' : 'Refund Policy'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/policies/accessibility" 
                    className="text-sm text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {locale === 'fr' ? 'Accessibilité' : 'Accessibility'}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-6 text-white">
                {locale === 'fr' ? 'Contact' : 'Contact'}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-white mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/80">
                    123 {locale === 'fr' ? 'Rue Principale' : 'Main Street'}, {locale === 'fr' ? 'Montréal, QC H3Z 2Y7' : 'Montreal, QC H3Z 2Y7'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-white mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/80">+1 (514) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-white mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/80">info@recruitmentplus.ca</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright Bar */}
          <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/80">
              © {year} Recruitment Plus Inc. {locale === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-sm text-white/80">
                {locale === 'fr' ? 'Conçu avec' : 'Designed with'} ❤️
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}