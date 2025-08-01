"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  X, CheckCircle, Users, Clock, Award, Globe, TrendingUp, Search,
  Sparkles, Building2, Target, Zap, ArrowRight, Star, Shield,
  Lightbulb, Briefcase, HeadphonesIcon, Phone, Mail, Calendar
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ServiceDetails {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  overview: {
    intro: string
    keyPoints: string[]
    benefits: string[]
  }
  process: {
    title: string
    steps: Array<{
      step: string
      title: string
      description: string
      duration?: string
    }>
  }
  expertise: {
    title: string
    areas: Array<{
      name: string
      description: string
      technologies?: string[]
    }>
  }
  whyChooseUs: {
    title: string
    reasons: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  pricing: {
    title: string
    packages: Array<{
      name: string
      description: string
      features: string[]
      price?: string
    }>
  }
  caseStudies: Array<{
    title: string
    description: string
    results: string[]
    image?: string
  }>
}

interface ServiceDetailModalProps {
  open: boolean
  onClose: () => void
  serviceId: string | null
}

export default function ServiceDetailModal({ open, onClose, serviceId }: ServiceDetailModalProps) {
  const { locale } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")

  if (!serviceId) return null

  // Comprehensive service details data
  const getServiceDetails = (id: string): ServiceDetails => {
    const serviceDetailsData: { [key: string]: ServiceDetails } = {
      "talent-acquisition": {
        id: "talent-acquisition",
        title: locale === 'fr' ? "Acquisition de Talents" : "Talent Acquisition",
        description: locale === 'fr' 
          ? "Services complets de recrutement pour identifier et attirer les meilleurs talents pour votre organisation."
          : "Comprehensive recruitment services to identify and attract the best talent for your organization.",
        icon: "Users",
        features: [
          locale === 'fr' ? "Recrutement exécutif" : "Executive recruitment",
          locale === 'fr' ? "Recherche de candidats passifs" : "Passive candidate search",
          locale === 'fr' ? "Évaluation comportementale" : "Behavioral assessment",
          locale === 'fr' ? "Intégration des nouveaux employés" : "Employee onboarding"
        ],
        overview: {
          intro: locale === 'fr'
            ? "Notre service d'acquisition de talents combine expertise humaine et technologies avancées pour identifier, attirer et recruter les professionnels les plus qualifiés. Nous comprenons que chaque poste est unique et nécessite une approche personnalisée."
            : "Our talent acquisition service combines human expertise and advanced technologies to identify, attract, and recruit the most qualified professionals. We understand that each position is unique and requires a personalized approach.",
          keyPoints: [
            locale === 'fr' ? "Processus de recrutement optimisé avec IA" : "AI-optimized recruitment process",
            locale === 'fr' ? "Réseau international de candidats qualifiés" : "International network of qualified candidates",
            locale === 'fr' ? "Évaluation psychométrique avancée" : "Advanced psychometric assessment",
            locale === 'fr' ? "Garantie de remplacement de 6 mois" : "6-month replacement guarantee",
            locale === 'fr' ? "Support post-embauche pendant 3 mois" : "3-month post-hire support"
          ],
          benefits: [
            locale === 'fr' ? "Réduction de 60% du temps de recrutement" : "60% reduction in recruitment time",
            locale === 'fr' ? "Taux de rétention de 95% à 12 mois" : "95% retention rate at 12 months",
            locale === 'fr' ? "Accès à des candidats passifs exclusifs" : "Access to exclusive passive candidates",
            locale === 'fr' ? "ROI moyen de 300% sur les investissements RH" : "Average ROI of 300% on HR investments"
          ]
        },
        process: {
          title: locale === 'fr' ? "Notre Processus de Recrutement" : "Our Recruitment Process",
          steps: [
            {
              step: "01",
              title: locale === 'fr' ? "Analyse des Besoins" : "Needs Analysis",
              description: locale === 'fr'
                ? "Nous analysons en profondeur vos besoins, votre culture d'entreprise et les compétences requises pour définir le profil idéal."
                : "We thoroughly analyze your needs, company culture, and required skills to define the ideal profile.",
              duration: "1-2 jours"
            },
            {
              step: "02", 
              title: locale === 'fr' ? "Sourcing Stratégique" : "Strategic Sourcing",
              description: locale === 'fr'
                ? "Utilisation de notre réseau, des plateformes spécialisées et de l'IA pour identifier les meilleurs candidats, y compris les profils passifs."
                : "Using our network, specialized platforms, and AI to identify the best candidates, including passive profiles.",
              duration: "3-5 jours"
            },
            {
              step: "03",
              title: locale === 'fr' ? "Évaluation Complète" : "Comprehensive Assessment", 
              description: locale === 'fr'
                ? "Tests psychométriques, évaluations techniques et entretiens comportementaux pour valider l'adéquation parfaite."
                : "Psychometric tests, technical evaluations, and behavioral interviews to validate perfect fit.",
              duration: "1-2 semaines"
            },
            {
              step: "04",
              title: locale === 'fr' ? "Présentation & Négociation" : "Presentation & Negotiation",
              description: locale === 'fr'
                ? "Présentation des candidats présélectionnés et accompagnement dans les négociations salariales et contractuelles."
                : "Presentation of pre-selected candidates and support in salary and contract negotiations.",
              duration: "1 semaine"
            },
            {
              step: "05",
              title: locale === 'fr' ? "Intégration & Suivi" : "Integration & Follow-up",
              description: locale === 'fr'
                ? "Accompagnement dans l'intégration du nouveau collaborateur et suivi de satisfaction pendant 3 mois."
                : "Support in integrating the new employee and satisfaction follow-up for 3 months.",
              duration: "3 mois"
            }
          ]
        },
        expertise: {
          title: locale === 'fr' ? "Nos Domaines d'Expertise" : "Our Areas of Expertise",
          areas: [
            {
              name: locale === 'fr' ? "Recrutement Exécutif" : "Executive Recruitment",
              description: locale === 'fr'
                ? "Recherche de dirigeants et cadres supérieurs avec approche confidentielle et discrète."
                : "Search for executives and senior managers with confidential and discreet approach.",
              technologies: ["LinkedIn Recruiter", "Executive Networks", "Headhunting Tools"]
            },
            {
              name: locale === 'fr' ? "Talents Techniques" : "Technical Talent",
              description: locale === 'fr'
                ? "Recrutement spécialisé en IT, ingénierie, et positions techniques hautement qualifiées."
                : "Specialized recruitment in IT, engineering, and highly skilled technical positions.",
              technologies: ["GitHub Talent", "Stack Overflow Jobs", "Technical Assessment Platforms"]
            },
            {
              name: locale === 'fr' ? "Ventes & Marketing" : "Sales & Marketing", 
              description: locale === 'fr'
                ? "Identification de talents commerciaux performants et spécialistes marketing digital."
                : "Identification of high-performing sales talent and digital marketing specialists.",
              technologies: ["Sales Intelligence Tools", "Marketing Automation Platforms"]
            }
          ]
        },
        whyChooseUs: {
          title: locale === 'fr' ? "Pourquoi Nous Choisir" : "Why Choose Us",
          reasons: [
            {
              title: locale === 'fr' ? "Expertise Reconnue" : "Recognized Expertise",
              description: locale === 'fr'
                ? "Plus de 15 ans d'expérience avec un taux de succès de 98% dans nos placements."
                : "Over 15 years of experience with a 98% success rate in our placements.",
              icon: "Award"
            },
            {
              title: locale === 'fr' ? "Réseau International" : "International Network",
              description: locale === 'fr'
                ? "Accès à un vivier de plus de 50,000 candidats qualifiés à travers le monde."
                : "Access to a pool of over 50,000 qualified candidates worldwide.",
              icon: "Globe"
            },
            {
              title: locale === 'fr' ? "Technologie Avancée" : "Advanced Technology",
              description: locale === 'fr'
                ? "Utilisation de l'IA et du machine learning pour optimiser le matching candidat-poste."
                : "Use of AI and machine learning to optimize candidate-position matching.",
              icon: "Zap"
            },
            {
              title: locale === 'fr' ? "Approche Personnalisée" : "Personalized Approach",
              description: locale === 'fr'
                ? "Chaque mission est unique et bénéficie d'une stratégie sur mesure adaptée à vos besoins."
                : "Each mission is unique and benefits from a tailor-made strategy adapted to your needs.",
              icon: "Target"
            }
          ]
        },
        pricing: {
          title: locale === 'fr' ? "Nos Formules" : "Our Packages",
          packages: [
            {
              name: locale === 'fr' ? "Essentiel" : "Essential",
              description: locale === 'fr' ? "Pour les postes juniors et intermédiaires" : "For junior and intermediate positions",
              features: [
                locale === 'fr' ? "Sourcing multi-canal" : "Multi-channel sourcing",
                locale === 'fr' ? "Présélection de 3-5 candidats" : "Pre-selection of 3-5 candidates", 
                locale === 'fr' ? "Rapport de recommandation" : "Recommendation report",
                locale === 'fr' ? "Garantie 3 mois" : "3-month guarantee"
              ],
              price: locale === 'fr' ? "15% du salaire annuel" : "15% of annual salary"
            },
            {
              name: locale === 'fr' ? "Premium" : "Premium",
              description: locale === 'fr' ? "Pour les postes seniors et spécialisés" : "For senior and specialized positions",
              features: [
                locale === 'fr' ? "Recherche de candidats passifs" : "Passive candidate search",
                locale === 'fr' ? "Évaluation psychométrique" : "Psychometric assessment",
                locale === 'fr' ? "Tests techniques personnalisés" : "Customized technical tests",
                locale === 'fr' ? "Support négociation" : "Negotiation support",
                locale === 'fr' ? "Garantie 6 mois" : "6-month guarantee"
              ],
              price: locale === 'fr' ? "20% du salaire annuel" : "20% of annual salary"
            },
            {
              name: locale === 'fr' ? "Exécutif" : "Executive",
              description: locale === 'fr' ? "Pour les postes de direction" : "For executive positions",
              features: [
                locale === 'fr' ? "Approche confidentielle" : "Confidential approach",
                locale === 'fr' ? "Évaluation 360°" : "360° assessment",
                locale === 'fr' ? "Due diligence complète" : "Complete due diligence",
                locale === 'fr' ? "Accompagnement intégration" : "Integration support",
                locale === 'fr' ? "Garantie 12 mois" : "12-month guarantee"
              ],
              price: locale === 'fr' ? "25% du salaire annuel" : "25% of annual salary"
            }
          ]
        },
        caseStudies: [
          {
            title: locale === 'fr' ? "Recrutement CTO Startup Fintech" : "CTO Recruitment for Fintech Startup",
            description: locale === 'fr'
              ? "Identification et recrutement d'un CTO pour une startup fintech en croissance rapide."
              : "Identification and recruitment of a CTO for a fast-growing fintech startup.",
            results: [
              locale === 'fr' ? "Position pourvue en 3 semaines" : "Position filled in 3 weeks",
              locale === 'fr' ? "Candidat toujours en poste après 2 ans" : "Candidate still in position after 2 years", 
              locale === 'fr' ? "Équipe technique doublée sous sa direction" : "Technical team doubled under their leadership"
            ],
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      
      "staffing-solutions": {
        id: "staffing-solutions",
        title: locale === 'fr' ? "Solutions de Dotation" : "Staffing Solutions",
        description: locale === 'fr'
          ? "Solutions flexibles de dotation temporaire et permanente pour répondre à vos besoins en personnel."
          : "Flexible temporary and permanent staffing solutions to meet your personnel needs.",
        icon: "Clock",
        features: [
          locale === 'fr' ? "Personnel temporaire" : "Temporary staffing",
          locale === 'fr' ? "Remplacement urgent" : "Emergency replacement",
          locale === 'fr' ? "Projets à court terme" : "Short-term projects",
          locale === 'fr' ? "Évaluation en situation" : "Trial periods"
        ],
        overview: {
          intro: locale === 'fr'
            ? "Nos solutions de dotation offrent la flexibilité nécessaire pour gérer les fluctuations de charge de travail, les remplacements urgents et les projets spéciaux. Nous maintenons un vivier de candidats pré-qualifiés disponibles rapidement."
            : "Our staffing solutions provide the flexibility needed to manage workload fluctuations, emergency replacements, and special projects. We maintain a pool of pre-qualified candidates available quickly.",
          keyPoints: [
            locale === 'fr' ? "Déploiement rapide (24-48h)" : "Rapid deployment (24-48h)",
            locale === 'fr' ? "Candidats pré-évalués et qualifiés" : "Pre-assessed and qualified candidates",
            locale === 'fr' ? "Gestion administrative complète" : "Complete administrative management",
            locale === 'fr' ? "Flexibilité contractuelle totale" : "Total contractual flexibility",
            locale === 'fr' ? "Support RH dédié" : "Dedicated HR support"
          ],
          benefits: [
            locale === 'fr' ? "Réduction des coûts de recrutement de 40%" : "40% reduction in recruitment costs",
            locale === 'fr' ? "Flexibilité optimale des effectifs" : "Optimal workforce flexibility",
            locale === 'fr' ? "Accès immédiat aux compétences spécialisées" : "Immediate access to specialized skills",
            locale === 'fr' ? "Réduction des risques administratifs" : "Reduced administrative risks"
          ]
        },
        process: {
          title: locale === 'fr' ? "Processus de Dotation" : "Staffing Process",
          steps: [
            {
              step: "01",
              title: locale === 'fr' ? "Analyse Express" : "Express Analysis",
              description: locale === 'fr'
                ? "Évaluation rapide de vos besoins, durée de mission et compétences requises."
                : "Quick assessment of your needs, mission duration, and required skills.",
              duration: "2-4 heures"
            },
            {
              step: "02",
              title: locale === 'fr' ? "Matching Candidats" : "Candidate Matching",
              description: locale === 'fr'
                ? "Sélection dans notre vivier de candidats pré-qualifiés selon vos critères précis."
                : "Selection from our pool of pre-qualified candidates according to your precise criteria.",
              duration: "4-8 heures"
            },
            {
              step: "03", 
              title: locale === 'fr' ? "Présentation & Validation" : "Presentation & Validation",
              description: locale === 'fr'
                ? "Présentation des profils sélectionnés avec CV détaillés et recommandations."
                : "Presentation of selected profiles with detailed CVs and recommendations.",
              duration: "12-24 heures"
            },
            {
              step: "04",
              title: locale === 'fr' ? "Déploiement Rapide" : "Rapid Deployment",
              description: locale === 'fr'
                ? "Mise en place immédiate avec gestion administrative et contractuelle complète."
                : "Immediate implementation with complete administrative and contractual management.",
              duration: "24-48 heures"
            }
          ]
        },
        expertise: {
          title: locale === 'fr' ? "Secteurs de Spécialisation" : "Specialization Sectors",
          areas: [
            {
              name: locale === 'fr' ? "Administration & Support" : "Administration & Support",
              description: locale === 'fr'
                ? "Personnel administratif, assistants, réceptionnistes, agents de saisie."
                : "Administrative staff, assistants, receptionists, data entry clerks.",
              technologies: ["Office Suite", "CRM Systems", "Database Management"]
            },
            {
              name: locale === 'fr' ? "Production & Logistique" : "Production & Logistics",
              description: locale === 'fr'
                ? "Opérateurs, manutentionnaires, préparateurs de commandes, conducteurs."
                : "Operators, handlers, order pickers, drivers.",
              technologies: ["WMS Systems", "ERP Manufacturing", "Quality Control Tools"]
            },
            {
              name: locale === 'fr' ? "Services Spécialisés" : "Specialized Services",
              description: locale === 'fr'
                ? "Experts techniques, consultants, chefs de projet pour missions spécifiques."
                : "Technical experts, consultants, project managers for specific missions.",
              technologies: ["Project Management Tools", "Specialized Software", "Industry-specific Platforms"]
            }
          ]
        },
        whyChooseUs: {
          title: locale === 'fr' ? "Nos Avantages" : "Our Advantages",
          reasons: [
            {
              title: locale === 'fr' ? "Réactivité Exceptionnelle" : "Exceptional Responsiveness",
              description: locale === 'fr'
                ? "Délais de déploiement ultra-rapides grâce à notre vivier de candidats qualifiés."
                : "Ultra-fast deployment times thanks to our pool of qualified candidates.",
              icon: "Zap"
            },
            {
              title: locale === 'fr' ? "Gestion Simplifiée" : "Simplified Management",
              description: locale === 'fr'
                ? "Nous gérons tous les aspects administratifs, légaux et RH de vos intérimaires."
                : "We manage all administrative, legal, and HR aspects of your temporary staff.",
              icon: "Shield"
            },
            {
              title: locale === 'fr' ? "Qualité Garantie" : "Guaranteed Quality",
              description: locale === 'fr'
                ? "Tous nos candidats sont pré-évalués et régulièrement formés aux meilleures pratiques."
                : "All our candidates are pre-assessed and regularly trained in best practices.",
              icon: "Star"
            },
            {
              title: locale === 'fr' ? "Flexibilité Maximale" : "Maximum Flexibility",
              description: locale === 'fr'
                ? "Adaptation en temps réel de vos effectifs selon l'évolution de vos besoins."
                : "Real-time adaptation of your workforce according to your evolving needs.",
              icon: "Target"
            }
          ]
        },
        pricing: {
          title: locale === 'fr' ? "Tarification Flexible" : "Flexible Pricing",
          packages: [
            {
              name: locale === 'fr' ? "Ponctuel" : "Occasional",
              description: locale === 'fr' ? "Pour des besoins occasionnels" : "For occasional needs",
              features: [
                locale === 'fr' ? "Tarif horaire standard" : "Standard hourly rate",
                locale === 'fr' ? "Facturation à la semaine" : "Weekly billing",
                locale === 'fr' ? "Gestion administrative incluse" : "Administrative management included",
                locale === 'fr' ? "Support téléphonique" : "Phone support"
              ]
            },
            {
              name: locale === 'fr' ? "Récurrent" : "Recurring",
              description: locale === 'fr' ? "Pour des besoins réguliers" : "For regular needs",
              features: [
                locale === 'fr' ? "Tarif préférentiel -10%" : "Preferential rate -10%",
                locale === 'fr' ? "Candidats dédiés" : "Dedicated candidates",
                locale === 'fr' ? "Facturation mensuelle" : "Monthly billing",
                locale === 'fr' ? "Account manager dédié" : "Dedicated account manager"
              ]
            },
            {
              name: locale === 'fr' ? "Volume" : "Volume",
              description: locale === 'fr' ? "Pour des besoins importants" : "For large needs",
              features: [
                locale === 'fr' ? "Tarif dégressif jusqu'à -25%" : "Declining rate up to -25%",
                locale === 'fr' ? "Équipe dédiée sur site" : "Dedicated on-site team",
                locale === 'fr' ? "Contrat annuel personnalisé" : "Personalized annual contract",
                locale === 'fr' ? "Reporting mensuel détaillé" : "Detailed monthly reporting"
              ]
            }
          ]
        },
        caseStudies: [
          {
            title: locale === 'fr' ? "Support Pic d'Activité E-commerce" : "E-commerce Activity Peak Support",
            description: locale === 'fr'
              ? "Fourniture de 50 préparateurs de commandes pour le Black Friday d'un leader e-commerce."
              : "Provision of 50 order pickers for the Black Friday of an e-commerce leader.",
            results: [
              locale === 'fr' ? "50 personnes déployées en 48h" : "50 people deployed in 48h",
              locale === 'fr' ? "100% des commandes traitées dans les délais" : "100% of orders processed on time",
              locale === 'fr' ? "Renouvellement pour les soldes d'hiver" : "Renewal for winter sales"
            ]
          }
        ]
      },

      // Add more services here...
      "consulting": {
        id: "consulting",
        title: locale === 'fr' ? "Conseil RH" : "HR Consulting",
        description: locale === 'fr'
          ? "Accompagnement stratégique en ressources humaines pour optimiser vos processus et développer vos talents."
          : "Strategic HR support to optimize your processes and develop your talents.",
        icon: "Award",
        features: [
          locale === 'fr' ? "Audit RH complet" : "Complete HR audit",
          locale === 'fr' ? "Stratégie de rétention" : "Retention strategy",
          locale === 'fr' ? "Optimisation des processus" : "Process optimization",
          locale === 'fr' ? "Formation des managers" : "Manager training"
        ],
        overview: {
          intro: locale === 'fr'
            ? "Notre expertise en conseil RH vous aide à transformer votre fonction ressources humaines en avantage concurrentiel. Nous analysons, concevons et implémentons des solutions RH sur mesure."
            : "Our HR consulting expertise helps you transform your human resources function into a competitive advantage. We analyze, design, and implement tailor-made HR solutions.",
          keyPoints: [
            locale === 'fr' ? "Diagnostic RH 360° approfondi" : "In-depth 360° HR diagnosis",
            locale === 'fr' ? "Recommandations stratégiques personnalisées" : "Personalized strategic recommendations",
            locale === 'fr' ? "Accompagnement dans la mise en œuvre" : "Implementation support",
            locale === 'fr' ? "Mesure de la performance RH" : "HR performance measurement",
            locale === 'fr' ? "Formation et développement des équipes" : "Team training and development"
          ],
          benefits: [
            locale === 'fr' ? "Amélioration de 35% de l'efficacité RH" : "35% improvement in HR efficiency",
            locale === 'fr' ? "Réduction de 25% du turnover" : "25% reduction in turnover",
            locale === 'fr' ? "Augmentation de 40% de l'engagement employé" : "40% increase in employee engagement",
            locale === 'fr' ? "ROI moyen de 450% sur les investissements RH" : "Average ROI of 450% on HR investments"
          ]
        },
        process: {
          title: locale === 'fr' ? "Méthodologie de Conseil" : "Consulting Methodology",
          steps: [
            {
              step: "01",
              title: locale === 'fr' ? "Diagnostic Complet" : "Complete Diagnosis",
              description: locale === 'fr'
                ? "Audit approfondi de vos pratiques RH actuelles, analyse des données et entretiens avec les parties prenantes."
                : "In-depth audit of your current HR practices, data analysis, and stakeholder interviews.",
              duration: "2-3 semaines"
            },
            {
              step: "02",
              title: locale === 'fr' ? "Analyse & Recommandations" : "Analysis & Recommendations",
              description: locale === 'fr'
                ? "Identification des axes d'amélioration et élaboration d'un plan d'action stratégique personnalisé."
                : "Identification of improvement areas and development of a personalized strategic action plan.",
              duration: "1-2 semaines"
            },
            {
              step: "03",
              title: locale === 'fr' ? "Plan d'Implémentation" : "Implementation Plan",
              description: locale === 'fr'
                ? "Définition du roadmap, priorisation des actions et planification détaillée des étapes."
                : "Roadmap definition, action prioritization, and detailed planning of steps.",
              duration: "1 semaine"
            },
            {
              step: "04",
              title: locale === 'fr' ? "Accompagnement" : "Support",
              description: locale === 'fr'
                ? "Support dans la mise en œuvre des recommandations avec coaching et formation des équipes."
                : "Support in implementing recommendations with coaching and team training.",
              duration: "3-6 mois"
            },
            {
              step: "05",
              title: locale === 'fr' ? "Mesure & Optimisation" : "Measurement & Optimization",
              description: locale === 'fr'
                ? "Suivi des KPIs, mesure des résultats et ajustements continus pour optimiser les performances."
                : "KPI monitoring, results measurement, and continuous adjustments to optimize performance.",
              duration: "Ongoing"
            }
          ]
        },
        expertise: {
          title: locale === 'fr' ? "Domaines de Conseil" : "Consulting Areas",
          areas: [
            {
              name: locale === 'fr' ? "Stratégie RH & Organisation" : "HR Strategy & Organization",
              description: locale === 'fr'
                ? "Définition de la stratégie RH alignée sur les objectifs business et restructuration organisationnelle."
                : "Definition of HR strategy aligned with business objectives and organizational restructuring.",
              technologies: ["HR Analytics", "Organizational Design Tools", "Strategy Frameworks"]
            },
            {
              name: locale === 'fr' ? "Gestion des Talents" : "Talent Management",
              description: locale === 'fr'
                ? "Programmes de développement, plans de succession, gestion des hauts potentiels."
                : "Development programs, succession planning, high-potential management.",
              technologies: ["Talent Management Platforms", "Learning Management Systems", "Assessment Tools"]
            },
            {
              name: locale === 'fr' ? "Performance & Engagement" : "Performance & Engagement",
              description: locale === 'fr'
                ? "Systèmes d'évaluation, programmes d'engagement et amélioration de la culture d'entreprise."
                : "Evaluation systems, engagement programs, and company culture improvement.",
              technologies: ["Performance Management Systems", "Employee Survey Tools", "Culture Assessment Platforms"]
            }
          ]
        },
        whyChooseUs: {
          title: locale === 'fr' ? "Notre Expertise Reconnue" : "Our Recognized Expertise",
          reasons: [
            {
              title: locale === 'fr' ? "Consultants Certifiés" : "Certified Consultants",
              description: locale === 'fr'
                ? "Équipe de consultants seniors certifiés avec plus de 10 ans d'expérience moyenne."
                : "Team of certified senior consultants with over 10 years of average experience.",
              icon: "Award"
            },
            {
              title: locale === 'fr' ? "Approche Data-Driven" : "Data-Driven Approach",
              description: locale === 'fr'
                ? "Utilisation des derniers outils d'analytics RH pour des recommandations basées sur les données."
                : "Use of the latest HR analytics tools for data-based recommendations.",
              icon: "TrendingUp"
            },
            {
              title: locale === 'fr' ? "Méthodologie Éprouvée" : "Proven Methodology",
              description: locale === 'fr'
                ? "Méthodologie propriétaire testée sur plus de 200 missions avec un taux de satisfaction de 96%."
                : "Proprietary methodology tested on over 200 missions with a 96% satisfaction rate.",
              icon: "Target"
            },
            {
              title: locale === 'fr' ? "Support Continu" : "Continuous Support",
              description: locale === 'fr'
                ? "Accompagnement long terme avec support post-mission et hotline dédiée."
                : "Long-term support with post-mission support and dedicated hotline.",
              icon: "HeadphonesIcon"
            }
          ]
        },
        pricing: {
          title: locale === 'fr' ? "Nos Offres de Conseil" : "Our Consulting Offers",
          packages: [
            {
              name: locale === 'fr' ? "Audit Flash" : "Flash Audit",
              description: locale === 'fr' ? "Diagnostic rapide et recommandations clés" : "Quick diagnosis and key recommendations",
              features: [
                locale === 'fr' ? "Audit RH en 5 jours" : "HR audit in 5 days",
                locale === 'fr' ? "Rapport de synthèse" : "Summary report",
                locale === 'fr' ? "Top 5 des recommandations" : "Top 5 recommendations",
                locale === 'fr' ? "Présentation executive" : "Executive presentation"
              ],
              price: locale === 'fr' ? "À partir de 5,000€" : "From €5,000"
            },
            {
              name: locale === 'fr' ? "Conseil Stratégique" : "Strategic Consulting",
              description: locale === 'fr' ? "Accompagnement complet et plan d'action" : "Complete support and action plan",
              features: [
                locale === 'fr' ? "Diagnostic approfondi" : "In-depth diagnosis",
                locale === 'fr' ? "Plan d'action détaillé" : "Detailed action plan",
                locale === 'fr' ? "Roadmap d'implémentation" : "Implementation roadmap",
                locale === 'fr' ? "3 mois de support" : "3 months of support"
              ],
              price: locale === 'fr' ? "À partir de 15,000€" : "From €15,000"
            },
            {
              name: locale === 'fr' ? "Transformation RH" : "HR Transformation",
              description: locale === 'fr' ? "Accompagnement complet de transformation" : "Complete transformation support",
              features: [
                locale === 'fr' ? "Stratégie RH complète" : "Complete HR strategy",
                locale === 'fr' ? "Refonte des processus" : "Process redesign",
                locale === 'fr' ? "Formation des équipes" : "Team training",
                locale === 'fr' ? "6 mois d'accompagnement" : "6 months of support"
              ],
              price: locale === 'fr' ? "Sur devis personnalisé" : "Custom quote"
            }
          ]
        },
        caseStudies: [
          {
            title: locale === 'fr' ? "Transformation RH Startup Tech" : "HR Transformation Tech Startup",
            description: locale === 'fr'
              ? "Accompagnement d'une startup tech dans la structuration de sa fonction RH lors de sa croissance rapide."
              : "Supporting a tech startup in structuring its HR function during rapid growth.",
            results: [
              locale === 'fr' ? "Réduction de 40% du temps de recrutement" : "40% reduction in recruitment time",
              locale === 'fr' ? "Amélioration de 50% de la satisfaction employé" : "50% improvement in employee satisfaction",
              locale === 'fr' ? "Mise en place de 15 nouveaux processus RH" : "Implementation of 15 new HR processes"
            ]
          }
        ]
      }
    }

    return serviceDetailsData[id] || serviceDetailsData["talent-acquisition"]
  }

  const serviceDetails = getServiceDetails(serviceId)
  
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Users, Clock, Award, Globe, TrendingUp, Search, Sparkles, Building2, 
      Target, Zap, Star, Shield, Lightbulb, Briefcase, HeadphonesIcon
    }
    return iconMap[iconName] || Users
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-0 pb-4">
          <DialogTitle className="sr-only">{serviceDetails.title}</DialogTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                {(() => {
                  const IconComponent = getIcon(serviceDetails.icon)
                  return <IconComponent className="h-6 w-6 text-primary" />
                })()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{serviceDetails.title}</h2>
                <p className="text-muted-foreground">{serviceDetails.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              {locale === 'fr' ? 'Vue d\'ensemble' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="process">
              {locale === 'fr' ? 'Processus' : 'Process'}
            </TabsTrigger>
            <TabsTrigger value="expertise">
              {locale === 'fr' ? 'Expertise' : 'Expertise'}
            </TabsTrigger>
            <TabsTrigger value="cases">
              {locale === 'fr' ? 'Cas d\'usage' : 'Case Studies'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {serviceDetails.overview.intro}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {locale === 'fr' ? 'Points Clés' : 'Key Points'}
                  </h3>
                  <ul className="space-y-2">
                    {serviceDetails.overview.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {locale === 'fr' ? 'Bénéfices Mesurables' : 'Measurable Benefits'}
                  </h3>
                  <ul className="space-y-2">
                    {serviceDetails.overview.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 shrink-0 mt-1" />
                        <span className="text-sm font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {serviceDetails.whyChooseUs.reasons.map((reason, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      {(() => {
                        const IconComponent = getIcon(reason.icon)
                        return <IconComponent className="h-5 w-5 text-primary" />
                      })()}
                      <h4 className="font-semibold text-sm">{reason.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="process" className="mt-6">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">{serviceDetails.process.title}</h3>
              </div>

              <div className="space-y-6">
                {serviceDetails.process.steps.map((step, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                      {index < serviceDetails.process.steps.length - 1 && (
                        <div className="w-px h-16 bg-border mt-4" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-semibold">{step.title}</h4>
                        {step.duration && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {step.duration}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expertise" className="mt-6">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">{serviceDetails.expertise.title}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceDetails.expertise.areas.map((area, index) => (
                  <div key={index} className="p-6 rounded-lg border bg-muted/30">
                    <h4 className="font-semibold text-lg mb-3">{area.name}</h4>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {area.description}
                    </p>
                    {area.technologies && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-primary">
                          {locale === 'fr' ? 'Technologies utilisées :' : 'Technologies used:'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {area.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>


          <TabsContent value="cases" className="mt-6">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  {locale === 'fr' ? 'Études de Cas' : 'Case Studies'}
                </h3>
                <p className="text-muted-foreground">
                  {locale === 'fr' 
                    ? 'Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs.'
                    : 'Discover how we helped our clients achieve their goals.'}
                </p>
              </div>

              <div className="space-y-8">
                {serviceDetails.caseStudies.map((caseStudy, index) => (
                  <div key={index} className="p-6 rounded-lg border bg-muted/30">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-3">{caseStudy.title}</h4>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {caseStudy.description}
                        </p>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-primary">
                            {locale === 'fr' ? 'Résultats obtenus :' : 'Results achieved:'}
                          </h5>
                          <ul className="space-y-1">
                            {caseStudy.results.map((result, resultIndex) => (
                              <li key={resultIndex} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {caseStudy.image && (
                        <div className="relative h-48 rounded-lg overflow-hidden">
                          <Image
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-6">
                <Button size="lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Planifier une consultation' : 'Schedule a consultation'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}