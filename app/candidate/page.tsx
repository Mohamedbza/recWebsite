"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Sparkles, ArrowRight, TrendingUp, Users, Award, Target, Briefcase, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"

export default function CandidatePage() {
  const { locale } = useLanguage()
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()

  // Redirect authenticated candidate users to dashboard
  useEffect(() => {
    if (isLoggedIn && user?.role === 'candidate') {
      router.push('/candidate/dashboard')
    }
  }, [isLoggedIn, user, router])

  // If user is logged in as candidate, show loading while redirecting
  if (isLoggedIn && user?.role === 'candidate') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {locale === 'fr' ? 'Redirection vers le tableau de bord...' : 'Redirecting to dashboard...'}
          </p>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: Search,
      title: locale === 'fr' ? 'Recherche intelligente' : 'Smart Job Search',
      description: locale === 'fr' 
        ? 'Trouvez des emplois qui correspondent parfaitement à vos compétences et aspirations'
        : 'Find jobs that perfectly match your skills and aspirations'
    },
    {
      icon: TrendingUp,
      title: locale === 'fr' ? 'Suivi des candidatures' : 'Application Tracking',
      description: locale === 'fr'
        ? 'Suivez le statut de toutes vos candidatures en temps réel'
        : 'Track the status of all your applications in real-time'
    },
    {
      icon: Users,
      title: locale === 'fr' ? 'Réseau professionnel' : 'Professional Network',
      description: locale === 'fr'
        ? 'Connectez-vous avec des employeurs et des professionnels de votre secteur'
        : 'Connect with employers and professionals in your industry'
    },
    {
      icon: Award,
      title: locale === 'fr' ? 'Développement de carrière' : 'Career Development',
      description: locale === 'fr'
        ? 'Accédez à des ressources pour faire progresser votre carrière'
        : 'Access resources to advance your career'
    }
  ]

  const stats = [
    {
      number: '10,000+',
      label: locale === 'fr' ? 'Offres d\'emploi' : 'Job Opportunities'
    },
    {
      number: '500+',
      label: locale === 'fr' ? 'Entreprises partenaires' : 'Partner Companies'
    },
    {
      number: '95%',
      label: locale === 'fr' ? 'Taux de satisfaction' : 'Satisfaction Rate'
    },
    {
      number: '24/7',
      label: locale === 'fr' ? 'Support disponible' : 'Support Available'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40" />
        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Plateforme de recrutement nouvelle génération' : 'Next-Generation Recruitment Platform'}
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {locale === 'fr' ? 'Trouvez votre' : 'Find Your'}
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                {locale === 'fr' ? 'Emploi de Rêve' : 'Dream Job'}
                  </span>
                </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {locale === 'fr'
                ? 'Rejoignez des milliers de candidats qui ont trouvé leur carrière idéale grâce à notre plateforme intelligente de mise en relation.'
                : 'Join thousands of candidates who found their ideal career through our intelligent matching platform.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="px-8 py-3" asChild>
                <Link href="/register">
                  <Target className="h-5 w-5 mr-2" />
                  {locale === 'fr' ? 'Commencer maintenant' : 'Get Started Now'}
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3" asChild>
                <Link href="/login">
                  <Briefcase className="h-5 w-5 mr-2" />
                  {locale === 'fr' ? 'Se connecter' : 'Sign In'}
                </Link>
              </Button>
              </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'fr' ? 'Pourquoi choisir notre plateforme ?' : 'Why Choose Our Platform?'}
              </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {locale === 'fr'
                ? 'Découvrez les fonctionnalités qui font de nous la plateforme de recrutement la plus avancée.'
                : 'Discover the features that make us the most advanced recruitment platform.'}
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
                return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
              })}
            </div>
          </div>
        </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'fr' ? 'Comment ça marche ?' : 'How It Works?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {locale === 'fr' ? 'Trois étapes simples pour trouver votre emploi idéal' : 'Three simple steps to find your ideal job'}
            </p>
                </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: locale === 'fr' ? 'Créez votre profil' : 'Create Your Profile',
                description: locale === 'fr' ? 'Renseignez vos compétences, expériences et préférences' : 'Fill in your skills, experience and preferences'
              },
              {
                step: '02',
                title: locale === 'fr' ? 'Explorez les opportunités' : 'Explore Opportunities',
                description: locale === 'fr' ? 'Découvrez des offres personnalisées selon votre profil' : 'Discover personalized offers based on your profile'
              },
              {
                step: '03',
                title: locale === 'fr' ? 'Postulez et réussissez' : 'Apply and Succeed',
                description: locale === 'fr' ? 'Suivez vos candidatures et décrochez votre emploi de rêve' : 'Track your applications and land your dream job'
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                    {step.step}
              </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-blue-400" />
                )}
              </div>
            ))}
          </div>
        </div>
        </section>

        {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'fr' ? 'Prêt à commencer votre parcours ?' : 'Ready to Start Your Journey?'}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {locale === 'fr'
                ? 'Rejoignez notre communauté de professionnels et trouvez les meilleures opportunités de carrière.'
                : 'Join our community of professionals and find the best career opportunities.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-3" asChild>
                <Link href="/register">
                  <Star className="h-5 w-5 mr-2" />
                  {locale === 'fr' ? 'Inscription gratuite' : 'Free Registration'}
                </Link>
                    </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/candidate/emplois">
                  <Search className="h-5 w-5 mr-2" />
                  {locale === 'fr' ? 'Parcourir les emplois' : 'Browse Jobs'}
                </Link>
                    </Button>
            </div>
            </div>
          </div>
        </section>
    </div>
  )
}
