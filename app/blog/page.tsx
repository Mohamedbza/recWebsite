"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, Clock, Tag, Search, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import { useLanguage } from "@/contexts/LanguageContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import BlogDetailModal from "@/components/blog/BlogDetailModal"
import newArticles from "./new-articles"

// Define a type for blog categories
type Category = {
  id: string
  name: string
  slug: string
  count: number
}

// Define a type for blog posts
type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: {
    intro: string
    sections: Array<{
      title: string
      content: string
      image?: string
    }>
    conclusion: string
  }
  date: string
  readTime: number
  category: string
  author: {
    name: string
    image: string
    bio?: string
  }
  image: string
  tags: string[]
  featured?: boolean
  views?: number
}

export default function BlogPage() {
  const { t, locale } = useLanguage()
  const dateLocale = locale === 'fr' ? fr : enUS
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Sample blog categories
  const categories: Category[] = [
    { id: "1", name: locale === 'fr' ? "Recrutement" : "Recruitment", slug: "recruitment", count: 8 },
    { id: "2", name: locale === 'fr' ? "Carrière" : "Career", slug: "career", count: 12 },
    { id: "3", name: locale === 'fr' ? "Immigration" : "Immigration", slug: "immigration", count: 6 },
    { id: "4", name: locale === 'fr' ? "Emploi" : "Employment", slug: "employment", count: 10 },
    { id: "5", name: locale === 'fr' ? "Tendances RH" : "HR Trends", slug: "hr-trends", count: 7 },
  ]

  // Create a function to convert detailed articles to blog post listings
  const createBlogPostFromArticle = (article: any, isEnglish: boolean): BlogPost => {
    // If we're in French but don't have a French version, show the English one
    const articleData = isEnglish ? article : article;
    
    return {
      id: articleData.id,
      title: articleData.title,
      slug: articleData.slug,
      excerpt: articleData.content.intro.substring(0, 150) + "...",
      date: articleData.date,
      readTime: articleData.readTime,
      category: articleData.category,
      author: {
        name: articleData.author.name,
        image: articleData.author.image || "/placeholder-user.jpg"
      },
      image: articleData.image,
      tags: articleData.tags,
      featured: articleData.id === "1" // Make the first article featured
    };
  };
  
  // Sample blog posts with comprehensive content
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: locale === 'fr' ? "Les tendances du marché du travail canadien en 2025" : "Canadian Job Market Trends in 2025",
      slug: "canadian-job-market-trends-2025",
      excerpt: locale === 'fr' 
        ? "Découvrez les principales tendances qui façonnent le marché du travail canadien en 2025 et comment vous pouvez vous positionner pour réussir." 
        : "Discover the key trends shaping the Canadian job market in 2025 and how you can position yourself for success.",
      content: {
        intro: locale === 'fr'
          ? "Le marché du travail canadien connaît une transformation sans précédent en 2025. Entre l'évolution technologique, les nouvelles attentes des employés et les défis économiques, les entreprises et les candidats doivent s'adapter rapidement pour rester compétitifs."
          : "The Canadian job market is undergoing unprecedented transformation in 2025. Between technological evolution, new employee expectations, and economic challenges, both companies and candidates must adapt quickly to remain competitive.",
        sections: [
          {
            title: locale === 'fr' ? "L'Impact de l'Intelligence Artificielle" : "The Impact of Artificial Intelligence",
            content: locale === 'fr'
              ? "L'IA révolutionne les processus de recrutement et les méthodes de travail. Plus de 65% des entreprises canadiennes utilisent désormais des outils d'IA pour filtrer les candidatures et identifier les talents. Cette technologie permet non seulement d'accélérer le processus de recrutement, mais aussi d'améliorer la précision dans l'évaluation des compétences.\n\nPour les candidats, cela signifie qu'il est crucial d'optimiser leur CV avec les bons mots-clés et de développer des compétences complémentaires à l'IA. Les professionnels qui savent travailler avec l'IA, plutôt que contre elle, sont particulièrement recherchés."
              : "AI is revolutionizing recruitment processes and working methods. Over 65% of Canadian companies now use AI tools to filter applications and identify talent. This technology not only accelerates the recruitment process but also improves accuracy in skills assessment.\n\nFor candidates, this means it's crucial to optimize their resume with the right keywords and develop skills complementary to AI. Professionals who know how to work with AI, rather than against it, are particularly sought after.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: locale === 'fr' ? "Le Travail Hybride Devient la Norme" : "Hybrid Work Becomes the Norm",
            content: locale === 'fr'
              ? "Le travail hybride n'est plus une exception mais bien la norme au Canada. 78% des entreprises offrent maintenant des options de travail flexibles. Cette tendance redéfinit complètement les attentes en matière d'équilibre travail-vie personnelle.\n\nLes employeurs doivent repenser leurs stratégies de management et leurs espaces de bureau, tandis que les employés développent de nouvelles compétences en communication digitale et en gestion du temps. Les outils de collaboration comme Slack, Microsoft Teams et Zoom sont devenus essentiels."
              : "Hybrid work is no longer an exception but truly the norm in Canada. 78% of companies now offer flexible work options. This trend completely redefines expectations regarding work-life balance.\n\nEmployers must rethink their management strategies and office spaces, while employees develop new skills in digital communication and time management. Collaboration tools like Slack, Microsoft Teams, and Zoom have become essential.",
            image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: locale === 'fr' ? "Les Compétences les Plus Demandées" : "Most In-Demand Skills",
            content: locale === 'fr'
              ? "Certaines compétences se démarquent particulièrement en 2025 :\n\n• Analyse de données et business intelligence\n• Cybersécurité et protection des données\n• Développement durable et ESG\n• Intelligence émotionnelle et leadership\n• Compétences en IA et automatisation\n\nLes professionnels qui investissent dans ces domaines voient leur valeur sur le marché augmenter de manière significative. La formation continue devient un avantage concurrentiel crucial."
              : "Certain skills particularly stand out in 2025:\n\n• Data analysis and business intelligence\n• Cybersecurity and data protection\n• Sustainability and ESG\n• Emotional intelligence and leadership\n• AI and automation skills\n\nProfessionals who invest in these areas see their market value increase significantly. Continuous learning becomes a crucial competitive advantage.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          }
        ],
        conclusion: locale === 'fr'
          ? "Le marché du travail canadien de 2025 offre de nombreuses opportunités pour ceux qui savent s'adapter. La clé du succès réside dans la capacité à rester flexible, à continuer d'apprendre et à embrasser les nouvelles technologies tout en développant des compétences humaines irremplaçables."
          : "The Canadian job market of 2025 offers many opportunities for those who know how to adapt. The key to success lies in the ability to remain flexible, continue learning, and embrace new technologies while developing irreplaceable human skills."
      },
      date: "2025-01-28",
      readTime: 8,
      category: "hr-trends",
      author: {
        name: "Marie Tremblay",
        image: "https://images.unsplash.com/photo-1494790108755-2616b332c74c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: locale === 'fr'
          ? "Experte en ressources humaines avec plus de 15 ans d'expérience dans le recrutement au Canada. Marie aide les entreprises à naviguer les défis du marché du travail moderne."
          : "HR expert with over 15 years of experience in Canadian recruitment. Marie helps companies navigate the challenges of the modern job market."
      },
      image: "/images/business-meeting-office-recuiteers.jpg",
      tags: ["Market Trends", "Future of Work", "Career Development", "AI", "Hybrid Work"],
      featured: true,
      views: 2847
    },
    {
      id: "2",
      title: locale === 'fr' ? "Guide complet du Programme des travailleurs qualifiés" : "Complete Guide to the Skilled Worker Program",
      slug: "skilled-worker-program-guide",
      excerpt: locale === 'fr'
        ? "Tout ce que vous devez savoir sur le Programme des travailleurs qualifiés du Canada, de l'admissibilité aux avantages et au processus de demande."
        : "Everything you need to know about Canada's Skilled Worker Program, from eligibility to benefits and the application process.",
      content: {
        intro: locale === 'fr'
          ? "Le Programme des travailleurs qualifiés du Canada représente l'une des voies les plus accessibles pour immigrer au Canada. Ce programme vise à attirer des professionnels expérimentés qui peuvent contribuer à l'économie canadienne tout en réalisant leurs objectifs de carrière."
          : "Canada's Skilled Worker Program represents one of the most accessible pathways to immigrate to Canada. This program aims to attract experienced professionals who can contribute to the Canadian economy while achieving their career goals.",
        sections: [
          {
            title: locale === 'fr' ? "Critères d'Admissibilité" : "Eligibility Criteria",
            content: locale === 'fr'
              ? "Pour être admissible au Programme des travailleurs qualifiés, vous devez répondre à plusieurs critères clés :\n\n• Avoir au moins 1 an d'expérience de travail qualifié\n• Démontrer vos compétences linguistiques en français ou en anglais\n• Posséder l'équivalent d'un diplôme d'études secondaires canadien\n• Disposer de fonds suffisants pour vous établir au Canada\n• Être admissible médicalement et ne pas avoir de casier judiciaire\n\nLe système utilise un système de points pour évaluer votre profil, avec un score minimum requis qui varie selon les tirages."
              : "To be eligible for the Skilled Worker Program, you must meet several key criteria:\n\n• Have at least 1 year of skilled work experience\n• Demonstrate your language skills in French or English\n• Have the equivalent of a Canadian high school diploma\n• Have sufficient funds to settle in Canada\n• Be medically admissible and have no criminal record\n\nThe system uses a points system to evaluate your profile, with a minimum required score that varies by draw.",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: locale === 'fr' ? "Processus de Candidature" : "Application Process",
            content: locale === 'fr'
              ? "Le processus se déroule en plusieurs étapes importantes :\n\n1. **Évaluation de l'admissibilité** : Utilisez l'outil en ligne pour vérifier si vous répondez aux critères de base.\n\n2. **Création du profil Entrée express** : Soumettez votre profil avec tous les documents requis.\n\n3. **Invitation à présenter une demande** : Si votre score est suffisant, vous recevrez une invitation lors d'un tirage.\n\n4. **Soumission de la demande complète** : Vous avez 60 jours pour soumettre tous les documents requis.\n\n5. **Traitement de la demande** : Le gouvernement traite généralement les demandes en 6 mois ou moins."
              : "The process takes place in several important steps:\n\n1. **Eligibility Assessment**: Use the online tool to check if you meet the basic criteria.\n\n2. **Create Express Entry Profile**: Submit your profile with all required documents.\n\n3. **Invitation to Apply**: If your score is sufficient, you'll receive an invitation during a draw.\n\n4. **Submit Complete Application**: You have 60 days to submit all required documents.\n\n5. **Application Processing**: The government typically processes applications in 6 months or less.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: locale === 'fr' ? "Conseils pour Maximiser vos Chances" : "Tips to Maximize Your Chances",
            content: locale === 'fr'
              ? "Voici des stratégies éprouvées pour améliorer votre profil :\n\n• **Améliorez vos compétences linguistiques** : Chaque point supplémentaire en langue peut faire la différence.\n\n• **Obtenez une offre d'emploi valide** : Cela peut ajouter jusqu'à 200 points à votre score.\n\n• **Considérez un Programme Nominé Provincial (PNP)** : Certaines provinces ont des critères plus flexibles.\n\n• **Complétez vos études au Canada** : Les diplômes canadiens donnent des points bonus.\n\n• **Travaillez au Canada temporairement** : L'expérience de travail canadienne est très valorisée."
              : "Here are proven strategies to improve your profile:\n\n• **Improve your language skills**: Every additional language point can make the difference.\n\n• **Get a valid job offer**: This can add up to 200 points to your score.\n\n• **Consider a Provincial Nominee Program (PNP)**: Some provinces have more flexible criteria.\n\n• **Complete your studies in Canada**: Canadian degrees give bonus points.\n\n• **Work in Canada temporarily**: Canadian work experience is highly valued.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          }
        ],
        conclusion: locale === 'fr'
          ? "Le Programme des travailleurs qualifiés offre une excellente opportunité pour les professionnels qualifiés de s'établir au Canada. Avec une préparation minutieuse et une stratégie bien définie, vos chances de succès augmentent considérablement. N'hésitez pas à consulter un consultant en immigration pour optimiser votre dossier."
          : "The Skilled Worker Program offers an excellent opportunity for qualified professionals to settle in Canada. With careful preparation and a well-defined strategy, your chances of success increase considerably. Don't hesitate to consult an immigration consultant to optimize your file."
      },
      date: "2025-01-22",
      readTime: 12,
      category: "immigration",
      author: {
        name: "Sophie Martin",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: locale === 'fr'
          ? "Consultante certifiée en immigration avec plus de 10 ans d'expérience. Sophie a aidé plus de 500 familles à réaliser leur rêve canadien."
          : "Certified immigration consultant with over 10 years of experience. Sophie has helped over 500 families achieve their Canadian dream."
      },
      image: "/images/team-working.png",
      tags: ["Immigration", "Skilled Workers", "Work Permits", "Express Entry", "Canada"],
      views: 1923
    },
    {
      id: "3",
      title: locale === 'fr' ? "Comment Réussir son Entretien d'Embauche Virtuel" : "How to Ace Your Virtual Job Interview",
      slug: "virtual-interview-success",
      excerpt: locale === 'fr'
        ? "Maîtrisez l'art de l'entretien virtuel avec nos conseils pratiques pour impressionner les recruteurs à distance."
        : "Master the art of virtual interviewing with our practical tips to impress recruiters remotely.",
      content: {
        intro: locale === 'fr'
          ? "Les entretiens virtuels sont devenus la norme dans le processus de recrutement moderne. Bien qu'ils offrent plus de flexibilité, ils présentent aussi des défis uniques qu'il faut savoir surmonter pour faire bonne impression."
          : "Virtual interviews have become the norm in modern recruitment processes. While they offer more flexibility, they also present unique challenges that must be overcome to make a good impression.",
        sections: [
          {
            title: locale === 'fr' ? "Préparation Technique" : "Technical Preparation",
            content: locale === 'fr'
              ? "La préparation technique est cruciale pour éviter les problèmes embarrassants :\n\n• **Testez votre équipement** : Vérifiez votre caméra, microphone et connexion internet 24h avant.\n\n• **Choisissez le bon environnement** : Trouvez un endroit calme avec un bon éclairage naturel.\n\n• **Préparez un plan B** : Ayez le numéro de téléphone du recruteur en cas de problème technique.\n\n• **Utilisez un arrière-plan professionnel** : Optez pour un mur neutre ou un arrière-plan virtuel discret.\n\nLe jour J, connectez-vous 10 minutes avant l'heure prévue pour résoudre d'éventuels problèmes."
              : "Technical preparation is crucial to avoid embarrassing problems:\n\n• **Test your equipment**: Check your camera, microphone, and internet connection 24 hours before.\n\n• **Choose the right environment**: Find a quiet place with good natural lighting.\n\n• **Prepare a plan B**: Have the recruiter's phone number in case of technical issues.\n\n• **Use a professional background**: Opt for a neutral wall or discrete virtual background.\n\nOn the day, connect 10 minutes before the scheduled time to resolve any potential issues.",
            image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: locale === 'fr' ? "Communication Non-Verbale" : "Non-Verbal Communication",
            content: locale === 'fr'
              ? "Votre langage corporel reste important même à travers un écran :\n\n• **Maintenez le contact visuel** : Regardez directement la caméra, pas l'écran.\n\n• **Adoptez une posture droite** : Asseyez-vous droit et penchez-vous légèrement vers l'avant.\n\n• **Utilisez vos mains** : Les gestes naturels rendent votre discours plus engageant.\n\n• **Souriez authentiquement** : Un sourire sincère transperce l'écran.\n\n• **Gérez les silences** : Les pauses peuvent sembler plus longues en virtuel, restez patient."
              : "Your body language remains important even through a screen:\n\n• **Maintain eye contact**: Look directly at the camera, not the screen.\n\n• **Adopt a straight posture**: Sit straight and lean slightly forward.\n\n• **Use your hands**: Natural gestures make your speech more engaging.\n\n• **Smile authentically**: A sincere smile comes through the screen.\n\n• **Manage silences**: Pauses can seem longer virtually, remain patient.",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          }
        ],
        conclusion: locale === 'fr'
          ? "Réussir un entretien virtuel demande une préparation spécifique, mais les principes fondamentaux restent les mêmes : soyez authentique, bien préparé et professionnel. Avec ces conseils, vous serez prêt à impressionner même à distance."
          : "Succeeding in a virtual interview requires specific preparation, but the fundamental principles remain the same: be authentic, well-prepared, and professional. With these tips, you'll be ready to impress even from a distance."
      },
      date: "2025-01-20",
      readTime: 6,
      category: "career",
      author: {
        name: "Alexandre Dubois",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: locale === 'fr'
          ? "Coach en développement de carrière et ancien recruteur. Alexandre aide les professionnels à maximiser leur potentiel lors des entretiens."
          : "Career development coach and former recruiter. Alexandre helps professionals maximize their potential during interviews."
      },
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Interview Tips", "Virtual Interview", "Career Advice", "Job Search", "Communication"],
      views: 1456
    },
    {
      id: "4",
      title: locale === 'fr' ? "Négociation Salariale : Stratégies Gagnantes" : "Salary Negotiation: Winning Strategies",
      slug: "salary-negotiation-strategies",
      excerpt: locale === 'fr'
        ? "Apprenez les techniques éprouvées pour négocier efficacement votre salaire et obtenir la rémunération que vous méritez."
        : "Learn proven techniques to effectively negotiate your salary and get the compensation you deserve.",
      content: {
        intro: locale === 'fr'
          ? "La négociation salariale reste un défi pour beaucoup de professionnels. Pourtant, c'est une compétence essentielle qui peut significativement impacter votre carrière et votre qualité de vie sur le long terme."
          : "Salary negotiation remains a challenge for many professionals. However, it's an essential skill that can significantly impact your career and quality of life in the long term.",
        sections: [
          {
            title: locale === 'fr' ? "Recherche et Préparation" : "Research and Preparation",
            content: locale === 'fr'
              ? "Une négociation réussie commence toujours par une préparation minutieuse :\n\n• **Recherchez les salaires du marché** : Utilisez des sites comme Glassdoor, PayScale, et les rapports salariaux.\n\n• **Évaluez votre valeur unique** : Listez vos réalisations, compétences spécialisées et contributions.\n\n• **Considérez l'ensemble du package** : Salaire de base, bonus, avantages, formation, flexibilité.\n\n• **Timing parfait** : Négociez après avoir prouvé votre valeur ou lors d'évaluations annuelles.\n\nLa confiance en négociation vient de la connaissance de votre valeur sur le marché."
              : "A successful negotiation always starts with thorough preparation:\n\n• **Research market salaries**: Use sites like Glassdoor, PayScale, and salary reports.\n\n• **Evaluate your unique value**: List your achievements, specialized skills, and contributions.\n\n• **Consider the entire package**: Base salary, bonus, benefits, training, flexibility.\n\n• **Perfect timing**: Negotiate after proving your value or during annual reviews.\n\nConfidence in negotiation comes from knowing your market value.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: locale === 'fr' ? "Techniques de Négociation" : "Negotiation Techniques",
            content: locale === 'fr'
              ? "Voici les stratégies les plus efficaces :\n\n• **Commencez par écouter** : Comprenez les contraintes et priorités de l'employeur.\n\n• **Présentez des données** : Appuyez vos demandes sur des faits et des chiffres concrets.\n\n• **Négociez l'ensemble** : Si le salaire est fixe, explorez les autres avantages.\n\n• **Restez professionnel** : Gardez un ton collaboratif, pas conflictuel.\n\n• **Préparez des alternatives** : Ayez plusieurs options pour créer de la flexibilité.\n\n• **Sachez dire non** : Parfois, il vaut mieux refuser une offre insuffisante."
              : "Here are the most effective strategies:\n\n• **Start by listening**: Understand the employer's constraints and priorities.\n\n• **Present data**: Support your requests with concrete facts and figures.\n\n• **Negotiate the whole package**: If salary is fixed, explore other benefits.\n\n• **Stay professional**: Keep a collaborative tone, not confrontational.\n\n• **Prepare alternatives**: Have several options to create flexibility.\n\n• **Know when to say no**: Sometimes it's better to refuse an insufficient offer.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          }
        ],
        conclusion: locale === 'fr'
          ? "La négociation salariale est un art qui s'apprend et se perfectionne. N'ayez pas peur de valoriser votre travail - c'est un investissement dans votre avenir professionnel. Avec de la préparation et de la confiance, vous pouvez obtenir la rémunération que vous méritez."
          : "Salary negotiation is an art that can be learned and perfected. Don't be afraid to value your work - it's an investment in your professional future. With preparation and confidence, you can get the compensation you deserve."
      },
      date: "2025-01-18",
      readTime: 7,
      category: "career",
      author: {
        name: "Isabelle Rousseau",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: locale === 'fr'
          ? "Experte en rémunération et benefits avec 12 ans d'expérience. Isabelle conseille les professionnels sur l'optimisation de leur package salarial."
          : "Compensation and benefits expert with 12 years of experience. Isabelle advises professionals on optimizing their salary package."
      },
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Salary Negotiation", "Career Growth", "Professional Development", "Compensation", "Workplace"],
      views: 2156
    },
    {
      id: "5",
      title: locale === 'fr' ? "L'avenir du Travail à Distance au Canada" : "The Future of Remote Work in Canada",
      slug: "future-remote-work-canada",
      excerpt: locale === 'fr'
        ? "Explorez comment le travail à distance transforme le paysage professionnel canadien et les opportunités qu'il crée."
        : "Explore how remote work is transforming the Canadian professional landscape and the opportunities it creates.",
      content: {
        intro: locale === 'fr'
          ? "Le travail à distance n'est plus une tendance temporaire au Canada, mais une réalité permanente qui redéfinit les relations employeur-employé et ouvre de nouvelles possibilités géographiques."
          : "Remote work is no longer a temporary trend in Canada, but a permanent reality that is redefining employer-employee relationships and opening new geographical possibilities.",
        sections: [
          {
            title: locale === 'fr' ? "Statistiques et Tendances Actuelles" : "Current Statistics and Trends",
            content: locale === 'fr'
              ? "Les chiffres parlent d'eux-mêmes :\n\n• **42% des Canadiens** travaillent maintenant à distance au moins 3 jours par semaine\n\n• **85% des entreprises** prévoient maintenir des options de travail flexible\n\n• **Économies moyennes de 3,200$ par an** par employé (transport, repas, vêtements)\n\n• **Productivité en hausse de 15%** selon les études récentes\n\n• **Réduction de 35% du turnover** dans les entreprises offrant le télétravail\n\nCes tendances montrent que le travail à distance est là pour rester."
              : "The numbers speak for themselves:\n\n• **42% of Canadians** now work remotely at least 3 days per week\n\n• **85% of companies** plan to maintain flexible work options\n\n• **Average savings of $3,200 per year** per employee (transport, meals, clothing)\n\n• **15% increase in productivity** according to recent studies\n\n• **35% reduction in turnover** in companies offering remote work\n\nThese trends show that remote work is here to stay.",
            image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: locale === 'fr' ? "Défis et Solutions" : "Challenges and Solutions",
            content: locale === 'fr'
              ? "Le travail à distance présente aussi des défis qu'il faut adresser :\n\n**Défis principaux :**\n• Isolement social et professionnel\n• Difficulté à séparer vie pro et perso\n• Gestion d'équipe à distance\n• Cybersécurité et protection des données\n\n**Solutions émergentes :**\n• Espaces de coworking locaux\n• Outils de collaboration avancés\n• Formations en management virtuel\n• Politiques de sécurité renforcées\n• Sessions de team building virtuelles\n\nLes entreprises qui réussissent investissent dans ces solutions."
              : "Remote work also presents challenges that must be addressed:\n\n**Main challenges:**\n• Social and professional isolation\n• Difficulty separating work and personal life\n• Remote team management\n• Cybersecurity and data protection\n\n**Emerging solutions:**\n• Local coworking spaces\n• Advanced collaboration tools\n• Virtual management training\n• Enhanced security policies\n• Virtual team building sessions\n\nSuccessful companies invest in these solutions.",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          }
        ],
        conclusion: locale === 'fr'
          ? "L'avenir du travail au Canada sera hybride, flexible et centré sur les résultats plutôt que sur la présence. Les professionnels et entreprises qui s'adaptent à cette nouvelle réalité en tireront des avantages concurrentiels significatifs."
          : "The future of work in Canada will be hybrid, flexible, and focused on results rather than presence. Professionals and companies that adapt to this new reality will gain significant competitive advantages."
      },
      date: "2025-01-15",
      readTime: 9,
      category: "hr-trends",
      author: {
        name: "Jean-François Leblanc",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: locale === 'fr'
          ? "Consultant en transformation digitale RH et spécialiste du travail à distance. Jean-François accompagne les entreprises dans leur transition vers le travail hybride."
          : "HR digital transformation consultant and remote work specialist. Jean-François supports companies in their transition to hybrid work."
      },
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Remote Work", "Future of Work", "Digital Transformation", "Productivity", "Work-Life Balance"],
      views: 1789
    }
  ]

  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory ? post.category === activeCategory : true
    const matchesSearch = searchQuery.trim()
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.intro.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.sections.some(section => 
          section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          section.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true
    return matchesCategory && matchesSearch
  })

  // Modal handlers
  const openModal = (post: BlogPost) => {
    setSelectedPost(post)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedPost(null)
  }

  const handlePostChange = (post: BlogPost) => {
    setSelectedPost(post)
  }

  // Get related posts
  const getRelatedPosts = (currentPost: BlogPost) => {
    return blogPosts
      .filter(post => 
        post.id !== currentPost.id && 
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, 4)
  }

  // Find featured post
  const featuredPost = blogPosts.find(post => post.featured)

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'PPP', { locale: dateLocale })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 pt-24 overflow-hidden">
          {/* Enhanced Background with better contrast */}
          <div className="absolute inset-0 bg-white dark:bg-gray-900 z-0">
            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-15 dark:opacity-25 z-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          
          {/* Subtle animated shapes */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full filter blur-3xl opacity-30 dark:opacity-40 floating-element z-5"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/20 dark:bg-secondary/30 rounded-full filter blur-3xl opacity-30 dark:opacity-40 floating-element z-5"
            style={{ animationDelay: "-3s" }}
          ></div>
          
          <div className="container relative z-20">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm rounded-full text-primary dark:text-white font-medium text-sm shimmer mx-auto border border-primary/20 dark:border-white/20">
              <CalendarIcon className="inline-block h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Blog & Ressources' : 'Blog & Resources'}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Actualités et perspectives sur le recrutement canadien' : 'Canadian Recruitment News & Insights'}
              </span>
            </h1>
            
            <p className="text-center text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {locale === 'fr' 
                ? 'Découvrez les dernières tendances, conseils et informations sur le recrutement, l\'immigration et le marché du travail canadien.'
                : 'Discover the latest trends, tips, and insights on recruitment, immigration, and the Canadian job market.'}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 dark:border-gray-700/30 p-4">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder={locale === 'fr' ? "Rechercher des articles..." : "Search articles..."} 
                  className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-primary/50 dark:focus:border-primary/50 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 container">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {locale === 'fr' ? 'Article à la une' : 'Featured Article'}
            </h2>
            <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="mb-2">
                      {categories.find(c => c.slug === featuredPost.category)?.name}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(featuredPost.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime} {locale === 'fr' ? 'min de lecture' : 'min read'}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image 
                          src={featuredPost.author.image || "/placeholder-user.jpg"}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium">{featuredPost.author.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-primary border-primary/30 hover:bg-primary/5"
                      onClick={() => openModal(featuredPost)}
                    >
                      {locale === 'fr' ? 'Lire plus' : 'Read more'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Content Section */}
        <section className="py-8 container">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  {locale === 'fr' ? 'Catégories' : 'Categories'}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center transition-colors ${
                      activeCategory === null ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                    }`}
                  >
                    <span>{locale === 'fr' ? 'Tous les articles' : 'All posts'}</span>
                    <Badge variant="secondary">{blogPosts.length}</Badge>
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center transition-colors ${
                        activeCategory === category.slug ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                      }`}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-primary" />
                  {locale === 'fr' ? 'Tags populaires' : 'Popular Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 10).map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary/10 border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {searchQuery.trim() 
                    ? `${locale === 'fr' ? 'Résultats pour' : 'Results for'} "${searchQuery}"`
                    : activeCategory 
                    ? `${locale === 'fr' ? 'Articles dans' : 'Posts in'} ${categories.find(c => c.slug === activeCategory)?.name}`
                    : locale === 'fr' ? 'Articles récents' : 'Recent Posts'}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {filteredPosts.length} {locale === 'fr' ? 'articles' : 'posts'}
                  {searchQuery.trim() && (
                    <span className="ml-2">
                      • <button 
                        onClick={() => setSearchQuery("")}
                        className="text-primary hover:underline"
                      >
                        {locale === 'fr' ? 'Effacer' : 'Clear'}
                      </button>
                    </span>
                  )}
                </div>
              </div>

              {/* Search/Filter Active Indicators */}
              {(searchQuery.trim() || activeCategory) && (
                <div className="flex flex-wrap gap-2">
                  {searchQuery.trim() && (
                    <Badge variant="outline" className="flex items-center gap-2">
                      <Search className="h-3 w-3" />
                      {searchQuery}
                      <button onClick={() => setSearchQuery("")}>
                        <X className="h-3 w-3 hover:text-destructive" />
                      </button>
                    </Badge>
                  )}
                  {activeCategory && (
                    <Badge variant="outline" className="flex items-center gap-2">
                      <Filter className="h-3 w-3" />
                      {categories.find(c => c.slug === activeCategory)?.name}
                      <button onClick={() => setActiveCategory(null)}>
                        <X className="h-3 w-3 hover:text-destructive" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/20 group">
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <Badge variant="secondary" className="mb-2">
                            {categories.find(c => c.slug === post.category)?.name}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image 
                                src={post.author.image || "/placeholder-user.jpg"}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-medium">{post.author.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(post.date)} • {post.readTime} {locale === 'fr' ? 'min' : 'min read'}
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary hover:bg-primary/5 -mr-2"
                            onClick={() => openModal(post)}
                          >
                            {locale === 'fr' ? 'Lire plus' : 'Read more'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-8 text-center">
                  <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchQuery.trim() 
                      ? locale === 'fr' ? 'Aucun résultat trouvé' : 'No results found'
                      : locale === 'fr' ? 'Aucun article trouvé' : 'No posts found'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery.trim() 
                      ? locale === 'fr' 
                        ? `Aucun article ne correspond à "${searchQuery}". Essayez avec d'autres mots-clés.`
                        : `No articles match "${searchQuery}". Try different keywords.`
                      : locale === 'fr' 
                        ? 'Aucun article trouvé. Essayez de modifier vos filtres de recherche.'
                        : 'No posts found. Try adjusting your search filters.'}
                  </p>
                  <div className="flex justify-center gap-3">
                    {searchQuery.trim() && (
                      <Button variant="outline" onClick={() => setSearchQuery("")}>
                        <X className="h-4 w-4 mr-2" />
                        {locale === 'fr' ? 'Effacer la recherche' : 'Clear search'}
                      </Button>
                    )}
                    {activeCategory && (
                      <Button variant="outline" onClick={() => setActiveCategory(null)}>
                        <Filter className="h-4 w-4 mr-2" />
                        {locale === 'fr' ? 'Effacer les filtres' : 'Clear filters'}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      {/* Blog Detail Modal */}
      <BlogDetailModal
        open={modalOpen}
        onClose={closeModal}
        post={selectedPost}
        relatedPosts={selectedPost ? getRelatedPosts(selectedPost) : []}
        onPostChange={handlePostChange}
      />
    </div>
  )
}