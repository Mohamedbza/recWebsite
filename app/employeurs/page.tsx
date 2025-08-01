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
  Building2,
  Globe,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export default function EmployeursPage() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Enhanced Background with better contrast - Theme Aware */}
          <div className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 z-0">
            {/* Dark overlay for text readability - Only in dark mode */}
            <div className="absolute inset-0 bg-transparent dark:bg-black/60 z-10"></div>
            {/* Subtle pattern overlay - Theme Aware */}
            <div
              className="absolute inset-0 opacity-15 dark:opacity-10 z-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Subtle animated shapes - Theme Aware */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-secondary/20 dark:bg-secondary/30 rounded-full filter blur-3xl opacity-30 dark:opacity-40 floating-element z-5"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full filter blur-3xl opacity-30 dark:opacity-40 floating-element z-5"
            style={{ animationDelay: "-3s" }}
          ></div>

          <div className="container relative z-20">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="inline-block mb-6 px-6 py-2 bg-primary/10 dark:bg-secondary/20 backdrop-blur-sm rounded-full text-primary dark:text-white font-medium text-sm shimmer border border-primary/20 dark:border-white/20">
                  <Building2 className="inline-block h-4 w-4 mr-2" />
                  {t('employers.hero.badge')}
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-white">
                  {t('employers.hero.title')}{" "}
                  <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    {t('employers.hero.subtitle')}
                  </span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-white/90 leading-relaxed">
                  {t('employers.hero.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary/90 hover:to-secondary/90 text-white shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 rounded-2xl border-0"
                  >
                    <a href="/login">
                      <Users className="mr-2 h-5 w-5" />
                      {t('employers.hero.post_job_button')}
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group relative overflow-hidden bg-background/90 dark:bg-white/90 backdrop-blur-sm text-foreground dark:text-slate-900 border-2 border-primary/40 dark:border-white/40 hover:border-primary/70 dark:hover:border-white/70 hover:bg-background dark:hover:bg-white shadow-lg hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 rounded-2xl font-semibold"
                  >
                    <a href="/services">
                      {t('employers.hero.services_button')}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="magic-card p-2 overflow-hidden">
                  <Image
                    src="/images/business-meeting-office-recuiteers.jpg"
                    alt="Équipe professionnelle"
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
              <div className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                <Globe className="inline-block h-4 w-4 mr-2" />
                {t('employers.industries.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t('employers.industries.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('employers.industries.description')}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {t('employers.industries.industries').map((industry, index) => {
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
                
                // Industry-specific images for employers/recruiters perspective
                const industryImages = [
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Technology team collaboration
                  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Healthcare professionals team
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Finance business meeting
                  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Education classroom setting
                  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Marketing team strategy
                  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Engineering team at work
                  "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Design team collaboration
                  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"  // Sales team presentation
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
              <div className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                <Zap className="inline-block h-4 w-4 mr-2" />
                Nos Services Spécialisés
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Solutions de Recrutement Complètes
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Des services adaptés à tous vos besoins en recrutement, du local à l'international
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
              {/* Solution 1 - Local Recruitment */}
              <div className="magic-card p-8 group">
                <div className="mb-6 relative">
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                      alt="Recrutement Local"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                    Local
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Services de Recrutement Local</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Chez Recrutement Plus, nous sommes profondément ancrés dans notre communauté. Nous accompagnons les employeurs locaux dans leur recherche de talents qualifiés tout en aidant les candidats à décrocher des postes stables et valorisants.
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Pourquoi nous confier votre recrutement local ?</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Valider la pertinence et l'exactitude de vos offres d'emploi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Identifier et recruter les meilleurs profils pour chaque poste</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Assurer une transition harmonieuse avec les personnes en poste</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Anticiper et planifier vos besoins futurs en recrutement</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                  <h4 className="font-semibold text-xs mb-2">Notre expertise :</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Années d'expertise terrain</li>
                    <li>• Vaste réseau de candidats locaux et actifs</li>
                    <li>• Veille constante des tendances du marché</li>
                    <li>• Processus de présélection rigoureux et rapide</li>
                  </ul>
                </div>
              </div>

              {/* Solution 2 - National Recruitment */}
              <div className="magic-card p-8 group">
                <div className="mb-6 relative">
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                      alt="Recrutement National"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 text-white text-xs font-medium rounded-full">
                    National
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Service de Recrutement National</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Recrutement Plus vous accompagne dans la recherche de talents à travers tout le Canada. Grâce à notre réseau étendu et à notre expertise multisectorielle, nous vous aidons à pourvoir vos postes clés rapidement et efficacement.
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Avantages du recrutement national :</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Accéder à un bassin de candidats plus vaste et diversifié</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Trouver les compétences spécifiques dont votre entreprise a besoin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Assurer une meilleure adéquation entre le poste et la personne</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Réduire les délais d'embauche et les coûts liés au roulement</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary/5 rounded-lg p-3 border border-secondary/10">
                  <h4 className="font-semibold text-xs mb-2">Nos atouts :</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Réseau national de talents actifs et qualifiés</li>
                    <li>• Technologies de présélection avancées</li>
                    <li>• Conseils sur la mobilité et l'intégration</li>
                    <li>• Accompagnement humain personnalisé</li>
                  </ul>
                </div>
              </div>

              {/* Solution 3 - International Recruitment */}
              <div className="magic-card p-8 group">
                <div className="mb-6 relative">
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                      alt="Recrutement International"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium rounded-full">
                    International
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Recrutement International - TET</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Recrutement Plus est une agence accréditée par la CNESST (Québec), spécialisée dans le recrutement de travailleurs étrangers temporaires. Notre équipe vous accompagne de l'analyse des besoins jusqu'à l'intégration du personnel.
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Notre réseau international :</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Afrique du Nord (Maroc, Tunisie)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Émirats arabes unis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Turquie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs">Réseau étendu en Amérique latine</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-3 border border-primary/10">
                  <h4 className="font-semibold text-xs mb-2">Pourquoi nous choisir :</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>🔹 Expertise complète en immigration et conformité</li>
                    <li>🔹 Partenariats avec agences internationales certifiées</li>
                    <li>🔹 Sélection minutieuse et ciblée</li>
                    <li>🔹 Suivi post-intégration pour la stabilité</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                <Target className="inline-block h-4 w-4 mr-2" />
                {t('employers.process.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t('employers.process.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('employers.process.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
              {t('employers.process.steps').map((step, index) => {
                const icons = [Target, Globe, Users, Award, TrendingUp];
                const IconComponent = icons[index % icons.length];
                return (
                <div key={index} className="magic-card p-6 text-center group">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-secondary">{step.step}</span>
                  </div>
                  <div className="mb-4 text-secondary">
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
              <div className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                <Sparkles className="inline-block h-4 w-4 mr-2" />
                {t('employers.additional_services.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t('employers.additional_services.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('employers.additional_services.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {t('employers.additional_services.services').map((service, index) => {
                const icons = [Building2, Users, Target];
                const IconComponent = icons[index % icons.length];
                return (
                <div key={index} className="magic-card p-8 group">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-secondary" />
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
              <div className="magic-border-content bg-gradient-to-r from-secondary to-secondary/80 text-primary-foreground relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="text-center relative p-8 md:p-12">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t('employers.cta.title')}</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {t('employers.cta.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-xl bg-white/90 text-secondary hover:bg-white transition-all duration-300"
                      onClick={() => window.location.href = "/login"}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      {t('employers.cta.post_job_button')}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl bg-transparent text-white border-white/30 hover:bg-white/10 transition-all duration-300"
                      onClick={() => window.location.href = "/contact"}
                    >
                      {t('employers.cta.contact_button')}
                      <ArrowRight className="ml-2 h-4 w-4" />
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
