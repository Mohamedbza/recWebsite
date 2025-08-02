"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Award,
  Target,
  Building2,
  Globe,
  Zap,
  MapPin,
  Clock,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { RecruitmentSolutionModal } from "@/components/employer/RecruitmentSolutionModal"

interface RecruitmentSolution {
  id: string
  title: string
  type: "Local" | "National" | "International"
  image: string
  description: string
  benefits: string[]
  expertise: string[]
  features: {
    icon: any
    title: string
    description: string
  }[]
  stats: {
    icon: any
    value: string
    label: string
  }[]
}

export default function EmployeursPage() {
  const { t } = useLanguage();
  const [selectedSolution, setSelectedSolution] = useState<RecruitmentSolution | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recruitmentSolutions = [
    {
      id: "local",
      title: "Services de Recrutement Local",
      type: "Local" as const,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description: "Chez Recrutement Plus, nous sommes profondément ancrés dans notre communauté. Nous accompagnons les employeurs locaux dans leur recherche de talents qualifiés tout en aidant les candidats à décrocher des postes stables et valorisants. Dans un contexte marqué par la rareté de main-d'œuvre, le recrutement local exige précision et stratégie. Il est essentiel d'évaluer vos processus internes et de bien cerner les compétences nécessaires à votre croissance.",
      benefits: [
        "Valider la pertinence et l'exactitude de vos offres d'emploi",
        "Identifier et recruter les meilleurs profils pour chaque poste",
        "Assurer une transition harmonieuse avec les personnes en poste",
        "Anticiper et planifier vos besoins futurs en recrutement"
      ],
      expertise: [
        "Années d'expertise terrain",
        "Vaste réseau de candidats locaux et actifs",
        "Veille constante des tendances du marché",
        "Processus de présélection rigoureux et rapide"
      ],
      features: [
        {
          icon: MapPin,
          title: "Couverture locale",
          description: "Expertise approfondie du marché local et des spécificités régionales"
        },
        {
          icon: Users,
          title: "Réseau local",
          description: "Accès privilégié aux talents locaux et aux candidats qualifiés"
        },
        {
          icon: Clock,
          title: "Rapidité d'exécution",
          description: "Processus optimisé pour des recrutements rapides et efficaces"
        },
        {
          icon: Target,
          title: "Précision ciblée",
          description: "Sélection précise basée sur la connaissance du terrain"
        }
      ],
      stats: [
        {
          icon: Users,
          value: "500+",
          label: "Candidats locaux"
        },
        {
          icon: Building2,
          value: "100+",
          label: "Entreprises servies"
        },
        {
          icon: Clock,
          value: "72h",
          label: "Délai moyen"
        },
        {
          icon: Star,
          value: "95%",
          label: "Taux de satisfaction"
        }
      ]
    },
    {
      id: "national",
      title: "Service de Recrutement National",
      type: "National" as const,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description: "Recrutement Plus vous accompagne dans la recherche de talents à travers tout le Canada. Grâce à notre réseau étendu et à notre expertise multisectorielle, nous vous aidons à pourvoir vos postes clés rapidement et efficacement, peu importe la région ou l'industrie.",
      benefits: [
        "Accéder à un bassin de candidats plus vaste et diversifié",
        "Trouver les compétences spécifiques dont votre entreprise a besoin",
        "Assurer une meilleure adéquation entre le poste et la personne",
        "Réduire les délais d'embauche et les coûts liés au roulement"
      ],
      expertise: [
        "Réseau national de talents actifs et qualifiés",
        "Technologies de présélection avancées",
        "Conseils sur la mobilité et l'intégration",
        "Accompagnement humain personnalisé"
      ],
      features: [
        {
          icon: Building2,
          title: "Couverture nationale",
          description: "Réseau étendu à travers toutes les provinces canadiennes"
        },
        {
          icon: Globe,
          title: "Expertise multisectorielle",
          description: "Spécialisation dans tous les secteurs d'activité"
        },
        {
          icon: Target,
          title: "Recrutement ciblé",
          description: "Technologies avancées pour une sélection précise"
        },
        {
          icon: Users,
          title: "Accompagnement complet",
          description: "Support pour la mobilité et l'intégration des candidats"
        }
      ],
      stats: [
        {
          icon: Globe,
          value: "10",
          label: "Provinces couvertes"
        },
        {
          icon: Users,
          value: "2000+",
          label: "Candidats nationaux"
        },
        {
          icon: Building2,
          value: "500+",
          label: "Entreprises partenaires"
        },
        {
          icon: Star,
          value: "98%",
          label: "Taux de réussite"
        }
      ]
    },
    {
      id: "international",
      title: "Recrutement International - TET",
      type: "International" as const,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description: "Recrutement Plus est une agence accréditée par la CNESST (Québec), spécialisée dans le recrutement de travailleurs étrangers temporaires. Notre équipe chevronnée vous accompagne à chaque étape du processus, de l'analyse des besoins jusqu'à l'intégration du personnel, en passant par la gestion complète des Études d'impact sur le marché du travail (EIMT) et des formalités d'immigration, en collaboration avec nos avocats spécialisés.",
      benefits: [
        "Expertise complète en immigration et conformité",
        "Partenariats avec agences internationales certifiées",
        "Sélection minutieuse et ciblée",
        "Suivi post-intégration pour la stabilité"
      ],
      expertise: [
        "Accréditation CNESST pour le Québec",
        "Réseau international étendu",
        "Expertise en immigration et conformité",
        "Accompagnement post-intégration"
      ],
      features: [
        {
          icon: Globe,
          title: "Réseau international",
          description: "Partenariats en Afrique du Nord, Émirats arabes unis, Turquie et Amérique latine"
        },
        {
          icon: Award,
          title: "Accréditation officielle",
          description: "Agence accréditée par la CNESST pour le recrutement TET"
        },
        {
          icon: Users,
          title: "Sélection rigoureuse",
          description: "Processus de sélection minutieux et ciblé"
        },
        {
          icon: Clock,
          title: "Suivi complet",
          description: "Accompagnement de l'embauche à l'intégration"
        }
      ],
      stats: [
        {
          icon: Globe,
          value: "15+",
          label: "Pays partenaires"
        },
        {
          icon: Users,
          value: "1000+",
          label: "Travailleurs placés"
        },
        {
          icon: Award,
          value: "100%",
          label: "Conformité"
        },
        {
          icon: Star,
          value: "99%",
          label: "Taux de rétention"
        }
      ]
    }
  ];

  const handleShowMore = (solution: RecruitmentSolution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

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
                Des services adaptés à tous vos besoins en recrutement, du local à l&apos;international
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
              {recruitmentSolutions.map((solution) => {
                const getTypeColor = (type: string) => {
                  switch (type) {
                    case "Local":
                      return "bg-primary/90"
                    case "National":
                      return "bg-secondary/90"
                    case "International":
                      return "bg-gradient-to-r from-primary to-secondary"
                    default:
                      return "bg-primary/90"
                  }
                }

                                 return (
                   <div key={solution.id} className="magic-card p-6 group flex flex-col h-full">
                     <div className="mb-6 relative">
                       <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                         <Image
                           src={solution.image}
                           alt={solution.title}
                           width={500}
                           height={300}
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                         />
                       </div>
                       <div className={`absolute top-4 left-4 px-3 py-1 ${getTypeColor(solution.type)} text-white text-xs font-medium rounded-full`}>
                         {solution.type}
                       </div>
                     </div>
                     
                     <div className="flex-1">
                       <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
                       <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                         {solution.description}
                       </p>
                     </div>
                     
                     <div className="mt-auto pt-4">
                       <Button
                         onClick={() => handleShowMore(solution)}
                         className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 rounded-xl border-0 font-medium"
                       >
                         <Eye className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                         Voir plus
                         <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                       </Button>
                     </div>
                   </div>
                 )
              })}
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

      {/* Recruitment Solution Modal */}
      <RecruitmentSolutionModal
        solution={selectedSolution}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
