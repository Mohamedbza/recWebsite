"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronRight, Search, MapPin, Users, Calendar, Target, Sparkles, CheckCircle, Star, Globe, Building, UserCheck } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { heroImage } from "@/config/assets"

const locations = ["Canada (National)", "United Emirates Arab (Internatoinal)", "Turkey (International)"]

export default function HomePage() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false)
  const [isNationalModalOpen, setIsNationalModalOpen] = useState(false)
  const [isInternationalModalOpen, setIsInternationalModalOpen] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm) params.set('q', searchTerm)
    if (selectedLocation && selectedLocation !== 'all') params.set('location', selectedLocation)
    router.push(`/emplois?${params.toString()}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-28 md:py-44 overflow-hidden">
          {/* Enhanced Background with better contrast - Theme Aware */}
          <div className="absolute inset-0 bg-white dark:bg-gray-900 z-0">
            {/* Subtle pattern overlay - Theme Aware */}
            <div
              className="absolute inset-0 opacity-15 dark:opacity-25 z-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>

          {/* Subtle animated shapes - Theme Aware */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full filter blur-3xl opacity-30 dark:opacity-40 floating-element z-5"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/20 dark:bg-secondary/30 rounded-full filter blur-3xl opacity-30 dark:opacity-40 floating-element z-5"
            style={{ animationDelay: "-3s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-full filter blur-xl opacity-20 dark:opacity-30 floating-element z-5"
            style={{ animationDelay: "-1.5s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-secondary/10 dark:bg-secondary/20 rounded-full filter blur-xl opacity-20 dark:opacity-30 floating-element z-5"
            style={{ animationDelay: "-4.5s" }}
          ></div>

          <div className="container relative z-20 flex flex-col items-center text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer border border-primary/20">
              <Sparkles className="inline-block h-4 w-4 mr-2" />
              Recrutement innovant et personnalisé
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.hero.title')}
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-bold text-gray-700 dark:text-gray-300 mb-8">
              {t('home.hero.subtitle')}
            </p>
            <div className="magic-card w-full max-w-3xl p-4 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
              <form onSubmit={handleSearch}>
                <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder={t('candidates.jobs.search_placeholder')}
                      className="magic-input pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="w-full magic-input pl-10">
                        <SelectValue placeholder={t('candidates.jobs.location_placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('candidates.jobs.location_all') || "Toutes les localisations"}</SelectItem>
                        {locations.map((loc: string) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                  <Button type="submit" className="magic-button w-full md:w-auto">{t('candidates.jobs.search_button')}</Button>
                </div>
              </form>
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-6 gap-1 rounded-full border-white/40 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 hover:text-gray-900"
            >
              <Link href="/a-propos">
                {t('home.hero.learn_more')}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Services Highlight Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Sparkles className="inline-block h-4 w-4 mr-2" />
                {t('home.services.title')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.services.subtitle')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('home.services.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Service Card 1 */}
              <div className="magic-card p-6 group">
                <div className="mb-4 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t('services.local.title')}</h3>
                <p className="mt-2 text-muted-foreground">
                  {t('services.local.description')}
                </p>
                <Dialog open={isLocalModalOpen} onOpenChange={setIsLocalModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary group"
                    >
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                        {t('services.more')}
                      </span>
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {locale === 'fr' ? 'Local' : 'Local'}
                        </Badge>
                      </div>
                      <DialogTitle className="text-2xl font-bold">
                        {locale === 'fr' ? 'Recrutement Local' : 'Local Recruitment'}
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        {locale === 'fr' 
                          ? 'Accompagnement personnalisé avec aide à la rédaction de CV et préparation aux entretiens.'
                          : 'Personalized support with resume writing assistance and interview preparation.'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          {locale === 'fr' ? 'Caractéristiques Principales' : 'Key Features'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            locale === 'fr' ? 'Accompagnement personnalisé' : 'Personalized support',
                            locale === 'fr' ? 'Aide à la rédaction de CV' : 'Resume writing assistance', 
                            locale === 'fr' ? 'Préparation aux entretiens' : 'Interview preparation',
                            locale === 'fr' ? 'Suivi post-placement' : 'Post-placement follow-up',
                            locale === 'fr' ? 'Coaching professionnel' : 'Professional coaching',
                            locale === 'fr' ? 'Réseau local d\'employeurs' : 'Local employer network'
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Process Steps */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          {locale === 'fr' ? 'Notre Processus' : 'Our Process'}
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              step: '1',
                              title: locale === 'fr' ? 'Évaluation initiale' : 'Initial Assessment',
                              desc: locale === 'fr' ? 'Analyse de votre profil et de vos objectifs' : 'Analysis of your profile and objectives'
                            },
                            {
                              step: '2', 
                              title: locale === 'fr' ? 'Optimisation du CV' : 'Resume Optimization',
                              desc: locale === 'fr' ? 'Amélioration de votre CV pour maximiser vos chances' : 'Enhance your resume to maximize your chances'
                            },
                            {
                              step: '3',
                              title: locale === 'fr' ? 'Recherche d\'emplois' : 'Job Search',
                              desc: locale === 'fr' ? 'Identification des opportunités locales pertinentes' : 'Identify relevant local opportunities'
                            },
                            {
                              step: '4',
                              title: locale === 'fr' ? 'Préparation aux entretiens' : 'Interview Preparation', 
                              desc: locale === 'fr' ? 'Coaching personnalisé pour réussir vos entretiens' : 'Personalized coaching to ace your interviews'
                            }
                          ].map((item) => (
                            <div key={item.step} className="flex gap-4 p-4 border border-primary/20 rounded-lg">
                              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                                {item.step}
                              </div>
                              <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Section */}
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold mb-2">
                            {locale === 'fr' ? 'Prêt à commencer?' : 'Ready to get started?'}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {locale === 'fr' 
                              ? 'Contactez-nous dès aujourd\'hui pour débuter votre recherche d\'emploi local.'
                              : 'Contact us today to begin your local job search journey.'}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={() => router.push('/contact')} className="bg-primary hover:bg-primary/90">
                              {locale === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                            </Button>
                            <Button variant="outline" onClick={() => setIsLocalModalOpen(false)}>
                              {locale === 'fr' ? 'Fermer' : 'Close'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Service Card 2 */}
              <div className="magic-card p-6 group">
                <div className="mb-4 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t('services.national.title')}</h3>
                <p className="mt-2 text-muted-foreground">
                  {t('services.national.description')}
                </p>
                <Dialog open={isNationalModalOpen} onOpenChange={setIsNationalModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary group"
                    >
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                        {t('services.more')}
                      </span>
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Building className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {locale === 'fr' ? 'National' : 'National'}
                        </Badge>
                      </div>
                      <DialogTitle className="text-2xl font-bold">
                        {locale === 'fr' ? 'Recrutement National' : 'National Recruitment'}
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        {locale === 'fr' 
                          ? 'Service adapté aux besoins professionnels avec une couverture à travers tout le Canada.'
                          : 'Service adapted to professional needs with coverage throughout Canada.'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          {locale === 'fr' ? 'Avantages Clés' : 'Key Benefits'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            locale === 'fr' ? 'Couverture nationale complète' : 'Complete national coverage',
                            locale === 'fr' ? 'Mobilité interrégionale' : 'Interregional mobility', 
                            locale === 'fr' ? 'Réseau d\'employeurs étendu' : 'Extended employer network',
                            locale === 'fr' ? 'Opportunités diversifiées' : 'Diversified opportunities',
                            locale === 'fr' ? 'Support à la relocalisation' : 'Relocation support',
                            locale === 'fr' ? 'Négociation salariale' : 'Salary negotiation'
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Coverage Areas */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Globe className="h-5 w-5 text-primary" />
                          {locale === 'fr' ? 'Zones de Couverture' : 'Coverage Areas'}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { name: 'Québec', cities: ['Montréal', 'Québec', 'Gatineau'] },
                            { name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Hamilton'] },
                            { name: 'Alberta', cities: ['Calgary', 'Edmonton', 'Red Deer'] },
                            { name: 'Colombie-Britannique', cities: ['Vancouver', 'Victoria', 'Surrey'] }
                          ].map((province, index) => (
                            <div key={index} className="p-3 border border-primary/20 rounded-lg">
                              <h4 className="font-medium text-sm mb-2">{province.name}</h4>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {province.cities.map((city, cityIndex) => (
                                  <li key={cityIndex}>• {city}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Process Steps */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          {locale === 'fr' ? 'Processus National' : 'National Process'}
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              step: '1',
                              title: locale === 'fr' ? 'Analyse du marché national' : 'National Market Analysis',
                              desc: locale === 'fr' ? 'Étude des opportunités à travers le Canada' : 'Study opportunities across Canada'
                            },
                            {
                              step: '2', 
                              title: locale === 'fr' ? 'Matching géographique' : 'Geographic Matching',
                              desc: locale === 'fr' ? 'Identification des régions correspondant à vos critères' : 'Identify regions matching your criteria'
                            },
                            {
                              step: '3',
                              title: locale === 'fr' ? 'Candidatures stratégiques' : 'Strategic Applications',
                              desc: locale === 'fr' ? 'Soumission ciblée dans les meilleures provinces' : 'Targeted submissions in the best provinces'
                            },
                            {
                              step: '4',
                              title: locale === 'fr' ? 'Support à la transition' : 'Transition Support', 
                              desc: locale === 'fr' ? 'Accompagnement pour votre déménagement si nécessaire' : 'Support for your move if necessary'
                            }
                          ].map((item) => (
                            <div key={item.step} className="flex gap-4 p-4 border border-primary/20 rounded-lg">
                              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                                {item.step}
                              </div>
                              <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Section */}
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold mb-2">
                            {locale === 'fr' ? 'Explorez le Canada!' : 'Explore Canada!'}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {locale === 'fr' 
                              ? 'Découvrez des opportunités partout au Canada avec notre service national.'
                              : 'Discover opportunities across Canada with our national service.'}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={() => router.push('/contact')} className="bg-primary hover:bg-primary/90">
                              {locale === 'fr' ? 'Commencer' : 'Get Started'}
                            </Button>
                            <Button variant="outline" onClick={() => setIsNationalModalOpen(false)}>
                              {locale === 'fr' ? 'Fermer' : 'Close'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Service Card 3 */}
              <div className="magic-card p-6 group">
                <div className="mb-4 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t('services.international.title')}</h3>
                <p className="mt-2 text-muted-foreground">
                  {t('services.international.description')}
                </p>
                <Dialog open={isInternationalModalOpen} onOpenChange={setIsInternationalModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary group"
                    >
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                        {t('services.more')}
                      </span>
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Globe className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {locale === 'fr' ? 'International' : 'International'}
                        </Badge>
                      </div>
                      <DialogTitle className="text-2xl font-bold">
                        {locale === 'fr' ? 'Recrutement International' : 'International Recruitment'}
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        {locale === 'fr' 
                          ? 'Accompagnement pour les procédures d\'immigration et aide à l\'intégration au Canada.'
                          : 'Support for immigration procedures and assistance with integration in Canada.'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          {locale === 'fr' ? 'Services Spécialisés' : 'Specialized Services'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            locale === 'fr' ? 'Support immigration complète' : 'Complete immigration support',
                            locale === 'fr' ? 'Aide à l\'intégration' : 'Integration assistance', 
                            locale === 'fr' ? 'Pré-sélection rigoureuse' : 'Rigorous pre-selection',
                            locale === 'fr' ? 'Partenaires internationaux' : 'International partners',
                            locale === 'fr' ? 'Support multiculturel' : 'Multicultural support',
                            locale === 'fr' ? 'Validation des diplômes' : 'Credential validation'
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Immigration Programs */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <UserCheck className="h-5 w-5 text-primary" />
                          {locale === 'fr' ? 'Programmes d\'Immigration' : 'Immigration Programs'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { 
                              name: locale === 'fr' ? 'Entrée Express' : 'Express Entry',
                              desc: locale === 'fr' ? 'Système fédéral de sélection' : 'Federal selection system',
                              processing: '6-8 ' + (locale === 'fr' ? 'mois' : 'months')
                            },
                            { 
                              name: locale === 'fr' ? 'Programme des Candidats Provinciaux' : 'Provincial Nominee Program',
                              desc: locale === 'fr' ? 'Nomination provinciale' : 'Provincial nomination',
                              processing: '12-18 ' + (locale === 'fr' ? 'mois' : 'months')
                            },
                            { 
                              name: locale === 'fr' ? 'Travailleur Qualifié Québec' : 'Quebec Skilled Worker',
                              desc: locale === 'fr' ? 'Programme du Québec' : 'Quebec program',
                              processing: '10-14 ' + (locale === 'fr' ? 'mois' : 'months')
                            },
                            { 
                              name: locale === 'fr' ? 'Permis de Travail' : 'Work Permit',
                              desc: locale === 'fr' ? 'Autorisation temporaire' : 'Temporary authorization',
                              processing: '2-4 ' + (locale === 'fr' ? 'mois' : 'months')
                            }
                          ].map((program, index) => (
                            <div key={index} className="p-4 border border-primary/20 rounded-lg">
                              <h4 className="font-medium mb-1">{program.name}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{program.desc}</p>
                              <Badge variant="outline" className="text-xs">
                                {locale === 'fr' ? 'Traitement: ' : 'Processing: '}{program.processing}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Global Reach */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Star className="h-5 w-5 text-primary" />
                          {locale === 'fr' ? 'Portée Internationale' : 'Global Reach'}
                        </h3>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-center">
                          {[
                            { flag: '🇫🇷', country: 'France' },
                            { flag: '🇺🇸', country: 'États-Unis' },
                            { flag: '🇬🇧', country: 'Royaume-Uni' },
                            { flag: '🇩🇪', country: 'Allemagne' },
                            { flag: '🇮🇳', country: 'Inde' },
                            { flag: '🇧🇷', country: 'Brésil' }
                          ].map((location, index) => (
                            <div key={index} className="p-3 bg-primary/5 rounded-lg">
                              <div className="text-2xl mb-1">{location.flag}</div>
                              <div className="text-xs font-medium">{location.country}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Process Steps */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          {locale === 'fr' ? 'Processus International' : 'International Process'}
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              step: '1',
                              title: locale === 'fr' ? 'Évaluation d\'éligibilité' : 'Eligibility Assessment',
                              desc: locale === 'fr' ? 'Analyse de votre profil pour l\'immigration' : 'Analysis of your profile for immigration'
                            },
                            {
                              step: '2', 
                              title: locale === 'fr' ? 'Préparation des documents' : 'Document Preparation',
                              desc: locale === 'fr' ? 'Compilation et validation de tous les documents requis' : 'Compilation and validation of all required documents'
                            },
                            {
                              step: '3',
                              title: locale === 'fr' ? 'Soumission de candidature' : 'Application Submission',
                              desc: locale === 'fr' ? 'Dépôt officiel auprès des autorités canadiennes' : 'Official submission to Canadian authorities'
                            },
                            {
                              step: '4',
                              title: locale === 'fr' ? 'Intégration au Canada' : 'Integration in Canada', 
                              desc: locale === 'fr' ? 'Support pour votre installation et recherche d\'emploi' : 'Support for your settlement and job search'
                            }
                          ].map((item) => (
                            <div key={item.step} className="flex gap-4 p-4 border border-primary/20 rounded-lg">
                              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                                {item.step}
                              </div>
                              <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Section */}
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold mb-2">
                            {locale === 'fr' ? 'Votre Nouveau Départ au Canada!' : 'Your New Beginning in Canada!'}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {locale === 'fr' 
                              ? 'Commencez votre parcours d\'immigration avec notre expertise internationale.'
                              : 'Start your immigration journey with our international expertise.'}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={() => router.push('/contact')} className="bg-primary hover:bg-primary/90">
                              {locale === 'fr' ? 'Consultation Gratuite' : 'Free Consultation'}
                            </Button>
                            <Button variant="outline" onClick={() => setIsInternationalModalOpen(false)}>
                              {locale === 'fr' ? 'Fermer' : 'Close'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* Audience Sections */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Candidates Section */}
              <div className="magic-card p-8 overflow-hidden relative group">
                <div className="mb-4 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/young-woman-office-style-clothes-glasses-holds-tablet-with-documents-employee.jpg"
                    alt="Candidate with tablet"
                    width={600}
                    height={400}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <h2 className="text-2xl font-bold mb-4 relative">{t('home.audiences.candidates.title')}</h2>
                <p className="text-muted-foreground mb-6 relative">
                  {t('home.audiences.candidates.description')}
                </p>
                <ul className="space-y-3 mb-6 relative">
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.candidates.items.0')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.candidates.items.1')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.candidates.items.2')}</span>
                  </li>
                </ul>
                <Button 
                  className="magic-button w-full sm:w-auto relative"
                  onClick={() => router.push('/register')}
                >
                  {t('home.audiences.candidates.button')}
                </Button>
              </div>

              {/* Employers Section */}
              <div className="magic-card p-8 overflow-hidden relative group">
                <div className="mb-4 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/business-meeting-office-recuiteers.jpg"
                    alt="Business meeting"
                    width={600}
                    height={400}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <h2 className="text-2xl font-bold mb-4 relative">{t('home.audiences.employers.title')}</h2>
                <p className="text-muted-foreground mb-6 relative">
                  {t('home.audiences.employers.description')}
                </p>
                <ul className="space-y-3 mb-6 relative">
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.employers.items.0')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.employers.items.1')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.employers.items.2')}</span>
                  </li>
                </ul>
                <Button 
                  className="magic-button w-full sm:w-auto relative"
                  onClick={() => router.push('/register')}
                >
                  {t('home.audiences.employers.button')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230E7490' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="container relative">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="text-4xl font-bold">500+</div>
                <div className="mt-2">{t('home.stats.companies')}</div>
              </div>
              <div className="text-center backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="text-4xl font-bold">5000+</div>
                <div className="mt-2">{t('home.stats.placements')}</div>
              </div>
              <div className="text-center backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="text-4xl font-bold">15+</div>
                <div className="mt-2">{t('home.stats.experience')}</div>
              </div>
              <div className="text-center backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="text-4xl font-bold">98%</div>
                <div className="mt-2">{t('home.stats.satisfaction')}</div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"
            style={{ animationDelay: "-2s" }}
          ></div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Sparkles className="inline-block h-4 w-4 mr-2" />
                {t('home.newsletter.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.newsletter.title')}
              </h2>
              <p className="mt-4 text-muted-foreground mb-6">
                {t('home.newsletter.description')}
              </p>
              <form onSubmit={async (e) => {
                e.preventDefault()
                if (isNewsletterSubmitting) return
                
                setIsNewsletterSubmitting(true)
                try {
                  // Newsletter subscription logic here
                  const formData = new FormData(e.target as HTMLFormElement)
                  const email = formData.get('email') as string
                  
                  // Simulate API call
                  await new Promise(resolve => setTimeout(resolve, 1000))
                  
                  console.log('Newsletter subscription:', email)
                  alert(locale === 'fr' ? 'Merci pour votre inscription à notre newsletter!' : 'Thank you for subscribing to our newsletter!')
                  setNewsletterEmail("")
                  // Reset form
                  ;(e.target as HTMLFormElement).reset()
                } catch (error) {
                  alert(locale === 'fr' ? 'Erreur lors de l\'inscription. Veuillez réessayer.' : 'Error subscribing. Please try again.')
                } finally {
                  setIsNewsletterSubmitting(false)
                }
              }} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input 
                  type="email" 
                  name="email"
                  placeholder={t('home.newsletter.placeholder')} 
                  className="magic-input flex-1" 
                  required 
                  disabled={isNewsletterSubmitting}
                />
                <Button type="submit" className="magic-button" disabled={isNewsletterSubmitting}>
                  {isNewsletterSubmitting ? (
                    locale === 'fr' ? 'Inscription...' : 'Subscribing...'
                  ) : (
                    t('home.newsletter.button')
                  )}
                </Button>
              </form>
              <p className="mt-2 text-xs text-muted-foreground">
                {t('home.newsletter.privacy')}{" "}
                <Link
                  href="/politique-confidentialite"
                  className="underline underline-offset-2 hover:text-primary transition-colors"
                >
                  {t('home.newsletter.privacy_link')}
                </Link>
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl floating-element"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl floating-element"
            style={{ animationDelay: "-3s" }}
          ></div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="container relative">
            <div className="magic-border">
              <div className="magic-border-content bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="grid gap-6 md:grid-cols-2 md:gap-12 relative p-8 md:p-12">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t('home.cta.title')}</h2>
                    <p className="mt-4">
                      {t('home.cta.description')}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-4 md:items-end md:justify-center relative z-10">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="rounded-full backdrop-blur-sm hover:bg-white/90 transition-all duration-300 relative z-20 cursor-pointer pointer-events-auto"
                      onClick={() => {
                        console.log('CTA button clicked')
                        router.push('/contact')
                      }}
                    >
                      {t('home.cta.button')}
                    </Button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element -z-10 pointer-events-none"></div>
                <div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element -z-10 pointer-events-none"
                  style={{ animationDelay: "-2.5s" }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}