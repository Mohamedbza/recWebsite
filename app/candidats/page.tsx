"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Award,
  Target,
  Search,
  Globe,
  Zap,
  Briefcase,
  User,
  Building2,
  FileText,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export default function CandidatsPage() {
  const { locale } = useLanguage()

  const industries = [
    "Technology", "Healthcare", "Finance", "Education", 
    "Marketing", "Engineering", "Design", "Sales"
  ]

  const services = [
    {
      title: locale === 'fr' ? 'Recherche d\'emploi avancée' : 'Advanced Job Search',
      description: locale === 'fr' ? 'Trouvez des opportunités qui correspondent parfaitement à vos compétences et aspirations.' : 'Find opportunities that perfectly match your skills and aspirations.',
      badge: locale === 'fr' ? 'Intelligent' : 'Smart',
      features: [
        locale === 'fr' ? 'Algorithme de correspondance IA' : 'AI matching algorithm',
        locale === 'fr' ? 'Filtres personnalisés avancés' : 'Advanced custom filters',
        locale === 'fr' ? 'Alertes emploi en temps réel' : 'Real-time job alerts',
        locale === 'fr' ? 'Recherche par compétences' : 'Skills-based search'
      ]
    },
    {
      title: locale === 'fr' ? 'Gestion de profil' : 'Profile Management',
      description: locale === 'fr' ? 'Créez un profil professionnel qui vous démarque et attire les recruteurs.' : 'Create a professional profile that stands out and attracts recruiters.',
      badge: locale === 'fr' ? 'Professionnel' : 'Professional',
      features: [
        locale === 'fr' ? 'CV intégré optimisé' : 'Optimized integrated resume',
        locale === 'fr' ? 'Portfolio de projets' : 'Project portfolio',
        locale === 'fr' ? 'Recommandations de connexions' : 'Connection recommendations',
        locale === 'fr' ? 'Analyse de visibilité' : 'Visibility analytics'
      ]
    },
    {
      title: locale === 'fr' ? 'Suivi des candidatures' : 'Application Tracking',
      description: locale === 'fr' ? 'Gérez toutes vos candidatures et suivez votre progression en temps réel.' : 'Manage all your applications and track your progress in real-time.',
      badge: locale === 'fr' ? 'Organisé' : 'Organized',
      features: [
        locale === 'fr' ? 'Tableau de bord centralisé' : 'Centralized dashboard',
        locale === 'fr' ? 'Notifications de statut' : 'Status notifications',
        locale === 'fr' ? 'Rappels de suivi' : 'Follow-up reminders',
        locale === 'fr' ? 'Historique complet' : 'Complete history'
      ]
    }
  ]

  const processSteps = [
    {
      step: "01",
      title: locale === 'fr' ? 'Créez votre profil' : 'Create Your Profile',
      description: locale === 'fr' ? 'Construisez un profil professionnel complet avec vos compétences et expériences.' : 'Build a complete professional profile with your skills and experiences.'
    },
    {
      step: "02", 
      title: locale === 'fr' ? 'Recherchez des emplois' : 'Search for Jobs',
      description: locale === 'fr' ? 'Utilisez nos outils de recherche avancés pour trouver les opportunités parfaites.' : 'Use our advanced search tools to find perfect opportunities.'
    },
    {
      step: "03",
      title: locale === 'fr' ? 'Postulez facilement' : 'Apply Easily',
      description: locale === 'fr' ? 'Candidatez en un clic avec votre profil optimisé pour chaque poste.' : 'Apply with one click using your optimized profile for each position.'
    },
    {
      step: "04",
      title: locale === 'fr' ? 'Suivez vos progrès' : 'Track Progress',
      description: locale === 'fr' ? 'Surveillez vos candidatures et recevez des mises à jour en temps réel.' : 'Monitor your applications and receive real-time updates.'
    },
    {
      step: "05",
      title: locale === 'fr' ? 'Décrochez l\'emploi' : 'Land the Job',
      description: locale === 'fr' ? 'Obtenez votre emploi idéal grâce à notre plateforme optimisée.' : 'Get your dream job through our optimized platform.'
    }
  ]

  const additionalServices = [
    {
      title: locale === 'fr' ? 'Développement de carrière' : 'Career Development',
      description: locale === 'fr' ? 'Accédez à des ressources de formation et de développement professionnel pour faire progresser votre carrière.' : 'Access training and professional development resources to advance your career.'
    },
    {
      title: locale === 'fr' ? 'Networking professionnel' : 'Professional Networking',
      description: locale === 'fr' ? 'Connectez-vous avec des professionnels de votre secteur et élargissez votre réseau.' : 'Connect with professionals in your industry and expand your network.'
    },
    {
      title: locale === 'fr' ? 'Coaching personnalisé' : 'Personalized Coaching',
      description: locale === 'fr' ? 'Bénéficiez de conseils personnalisés pour optimiser votre recherche d\'emploi et vos entretiens.' : 'Get personalized advice to optimize your job search and interviews.'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background with gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-secondary/20 z-0">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23031F28' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Animated shapes */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50 floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-50 floating-element"
            style={{ animationDelay: "-3s" }}
          ></div>

          <div className="container relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="inline-block mb-6 px-6 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                  <Users className="inline-block h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Plateforme Candidats' : 'Candidate Platform'}
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  {locale === 'fr' ? 'Trouvez Votre' : 'Find Your'}{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {locale === 'fr' ? 'Carrière Idéale' : 'Dream Career'}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {locale === 'fr' 
                    ? 'Découvrez des milliers d\'opportunités d\'emploi, gérez vos candidatures et accélérez votre croissance professionnelle avec notre plateforme intelligente.'
                    : 'Discover thousands of job opportunities, manage your applications, and accelerate your professional growth with our intelligent platform.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="magic-button" asChild>
                    <Link href="/candidate/emplois">
                      <Search className="mr-2 h-5 w-5" />
                      {locale === 'fr' ? 'Rechercher des Emplois' : 'Search Jobs'}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl border-white/20 backdrop-blur-sm hover:bg-white/10"
                    asChild
                  >
                    <Link href="/register">
                      {locale === 'fr' ? 'Créer un Compte' : 'Create Account'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="magic-card p-2 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2326&q=80"
                    alt="Candidat professionnel"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Globe className="inline-block h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Secteurs d\'activité' : 'Industry Sectors'}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Explorez Tous les Secteurs' : 'Explore All Sectors'}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {locale === 'fr' 
                  ? 'Des opportunités dans tous les domaines professionnels pour correspondre à vos compétences et passions.'
                  : 'Opportunities in all professional fields to match your skills and passions.'}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {industries.map((industry, index) => {
                const colors = [
                  "from-blue-500/20 to-blue-600/20",
                  "from-green-500/20 to-green-600/20",
                  "from-yellow-500/20 to-yellow-600/20",
                  "from-purple-500/20 to-purple-600/20",
                  "from-red-500/20 to-red-600/20",
                  "from-orange-500/20 to-orange-600/20",
                  "from-indigo-500/20 to-indigo-600/20",
                  "from-pink-500/20 to-pink-600/20"
                ];
                const color = colors[index % colors.length];
                
                const industryImages = [
                  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Technology - Developer coding
                  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Healthcare - Medical professionals
                  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Finance - Financial analysis
                  "https://images.unsplash.com/photo-1491841573337-20c23e0b30b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Education - Teacher in classroom
                  "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Marketing - Digital marketing workspace
                  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Engineering - Engineers with blueprints
                  "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Design - Graphic designer at work
                  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"  // Sales - Business meeting/presentation
                ];
                
                return (
                <div key={index} className="magic-card group overflow-hidden">
                  <div className={`h-48 bg-gradient-to-br ${color} relative`}>
                    <Image
                      src={industryImages[index % industryImages.length]}
                      alt={industry}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h3 className="font-bold text-white text-lg">{industry}</h3>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Zap className="inline-block h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Outils Puissants' : 'Powerful Tools'}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Tout pour Réussir' : 'Everything to Succeed'}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {locale === 'fr' 
                  ? 'Des outils innovants et des fonctionnalités avancées pour optimiser votre recherche d\'emploi.'
                  : 'Innovative tools and advanced features to optimize your job search.'}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const serviceImages = [
                  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80", // Advanced Job Search - Person searching jobs online
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Profile Management - Resume/CV writing and creation
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"  // Application Tracking - Dashboard and analytics
                ];
                
                return (
                <div key={index} className="magic-card p-8 group">
                  <div className="mb-6 relative">
                    <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                      <Image
                        src={serviceImages[index % serviceImages.length]}
                        alt={service.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                      {service.badge}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((item, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/candidate/emplois"
                    className="inline-flex items-center text-sm font-medium text-primary group"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                      {locale === 'fr' ? 'En savoir plus' : 'Learn More'}
                    </span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Target className="inline-block h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Processus Simple' : 'Simple Process'}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Comment Ça Marche' : 'How It Works'}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {locale === 'fr' 
                  ? 'Un processus simple et efficace pour vous aider à trouver l\'emploi de vos rêves en quelques étapes.'
                  : 'A simple and efficient process to help you find your dream job in just a few steps.'}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
              {processSteps.map((step, index) => {
                const icons = [User, Search, Briefcase, TrendingUp, Award];
                const IconComponent = icons[index % icons.length];
                return (
                <div key={index} className="magic-card p-6 text-center group">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-primary">{step.step}</span>
                  </div>
                  <div className="mb-4 text-primary">
                    <IconComponent className="h-8 w-8 mx-auto" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Sparkles className="inline-block h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Services Additionnels' : 'Additional Services'}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Accompagnement Complet' : 'Complete Support'}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {locale === 'fr' 
                  ? 'Des services supplémentaires pour maximiser vos chances de succès et accélérer votre carrière.'
                  : 'Additional services to maximize your chances of success and accelerate your career.'}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {additionalServices.map((service, index) => {
                const icons = [Award, Users, Target];
                const IconComponent = icons[index % icons.length];
                return (
                <div key={index} className="magic-card p-8 group">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container relative">
            <div className="magic-border">
              <div className="magic-border-content bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="text-center relative p-8 md:p-12">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                    {locale === 'fr' ? 'Prêt à Commencer Votre Parcours ?' : 'Ready to Start Your Journey?'}
                  </h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {locale === 'fr' 
                      ? 'Rejoignez des milliers de candidats qui ont trouvé leur emploi idéal avec notre plateforme.'
                      : 'Join thousands of candidates who have found their dream job with our platform.'}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-xl bg-white/90 text-primary hover:bg-white transition-all duration-300"
                      asChild
                    >
                      <Link href="/register">
                        <Users className="mr-2 h-5 w-5" />
                        {locale === 'fr' ? 'Créer un Compte Gratuit' : 'Create Free Account'}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl bg-transparent text-white border-white/30 hover:bg-white/10 transition-all duration-300"
                      asChild
                    >
                      <Link href="/candidate/emplois">
                        {locale === 'fr' ? 'Parcourir les Emplois' : 'Browse Jobs'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"></div>
                <div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"
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