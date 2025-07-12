"use client"

import { useState, useEffect } from "react"
import { X, Cookie, CheckCircle2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function CookieConsent() {
  const { locale } = useLanguage()
  const [showConsent, setShowConsent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true and can't be changed
    analytics: true,
    marketing: true,
    preferences: true
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      // Wait a moment before showing the banner
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }))
    setShowConsent(false)
  }

  const rejectNonEssential = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }))
    setShowConsent(false)
  }

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      ...preferences,
      timestamp: new Date().toISOString()
    }))
    setShowConsent(false)
  }

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800">
        {!showDetails ? (
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Cookie className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-lg font-semibold">
                  {locale === 'fr' ? 'Paramètres des cookies' : 'Cookie Settings'}
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setShowConsent(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              {locale === 'fr' 
                ? 'Nous utilisons des cookies pour améliorer votre expérience sur notre site, personnaliser le contenu et les publicités, fournir des fonctionnalités de médias sociaux et analyser notre trafic. Veuillez choisir les cookies que vous acceptez.'
                : 'We use cookies to enhance your experience on our site, personalize content and ads, provide social media features, and analyze our traffic. Please choose which cookies you accept.'}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                className="flex-1 min-w-[120px]" 
                onClick={acceptAll}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Accepter tout' : 'Accept All'}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 min-w-[120px]" 
                onClick={rejectNonEssential}
              >
                {locale === 'fr' ? 'Cookies essentiels uniquement' : 'Essential Cookies Only'}
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 min-w-[120px]" 
                onClick={() => setShowDetails(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Personnaliser' : 'Customize'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Settings className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-lg font-semibold">
                  {locale === 'fr' ? 'Préférences des cookies' : 'Cookie Preferences'}
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setShowDetails(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4 mb-6">
              {/* Necessary cookies */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">
                    {locale === 'fr' ? 'Cookies nécessaires' : 'Necessary Cookies'}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'fr' 
                      ? 'Ces cookies sont essentiels au fonctionnement du site.'
                      : 'These cookies are essential for the website to function.'}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-primary mr-2">
                    {locale === 'fr' ? 'Toujours actif' : 'Always active'}
                  </span>
                  <div className="h-4 w-8 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 h-3 w-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Analytics cookies */}
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-sm">
                    {locale === 'fr' ? 'Cookies analytiques' : 'Analytics Cookies'}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'fr' 
                      ? 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site.'
                      : 'These cookies help us understand how visitors interact with the site.'}
                  </p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={preferences.analytics}
                      onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                      aria-label={locale === 'fr' ? 'Activer les cookies analytiques' : 'Enable analytics cookies'}
                    />
                    <div className={`h-4 w-8 rounded-full transition-colors ${preferences.analytics ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`absolute top-0.5 h-3 w-3 bg-white rounded-full transition-transform ${preferences.analytics ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Marketing cookies */}
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-sm">
                    {locale === 'fr' ? 'Cookies marketing' : 'Marketing Cookies'}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'fr' 
                      ? 'Ces cookies sont utilisés pour suivre les visiteurs sur les sites web afin d\'afficher des publicités pertinentes.'
                      : 'These cookies are used to track visitors across websites to display relevant advertisements.'}
                  </p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={preferences.marketing}
                      onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                      aria-label={locale === 'fr' ? 'Activer les cookies marketing' : 'Enable marketing cookies'}
                    />
                    <div className={`h-4 w-8 rounded-full transition-colors ${preferences.marketing ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`absolute top-0.5 h-3 w-3 bg-white rounded-full transition-transform ${preferences.marketing ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Preferences cookies */}
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-sm">
                    {locale === 'fr' ? 'Cookies de préférences' : 'Preferences Cookies'}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'fr' 
                      ? 'Ces cookies permettent au site web de se souvenir de vos préférences et choix.'
                      : 'These cookies enable the website to remember your preferences and choices.'}
                  </p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={preferences.preferences}
                      onChange={(e) => handlePreferenceChange('preferences', e.target.checked)}
                      aria-label={locale === 'fr' ? 'Activer les cookies de préférences' : 'Enable preferences cookies'}
                    />
                    <div className={`h-4 w-8 rounded-full transition-colors ${preferences.preferences ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`absolute top-0.5 h-3 w-3 bg-white rounded-full transition-transform ${preferences.preferences ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowDetails(false)}
              >
                {locale === 'fr' ? 'Retour' : 'Back'}
              </Button>
              <Button 
                onClick={savePreferences}
              >
                {locale === 'fr' ? 'Enregistrer les préférences' : 'Save Preferences'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 