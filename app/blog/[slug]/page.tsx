"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, Clock, ChevronLeft, Tag, Share2, Bookmark, User, Briefcase, MapPin, Globe } from "lucide-react"
import { format } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import newArticles from "../new-articles"

// Define article types
type Author = {
  name: string
  image: string
  role: string
}

type Article = {
  id: string
  title: string
  slug: string
  date: string
  readTime: number
  author: Author
  category: string
  tags: string[]
  image: string
  content: {
    intro: string
    sections: {
      title: string
      content: string
      image?: string
    }[]
    conclusion: string
  }
  relatedArticles?: string[]
}

// Combine existing and new blog articles data
const blogArticles: Record<string, Record<string, Article>> = {
  "en": {
    "canadian-job-market-trends-2025": {
      id: "1",
      title: "Canadian Job Market Trends in 2025",
      slug: "canadian-job-market-trends-2025",
      date: "2025-05-28",
      readTime: 8,
      author: {
        name: "Marie Tremblay",
        image: "/placeholder-user.jpg",
        role: "HR Specialist"
      },
      category: "hr-trends",
      tags: ["Market Trends", "Future of Work", "Career Development"],
      image: "/images/business-meeting-office-recuiteers.jpg",
      content: {
        intro: "The Canadian job market is constantly evolving, driven by technological advancements, economic shifts, and changing workforce demographics. As we move through 2025, understanding these emerging trends is crucial for both job seekers and employers to navigate the competitive landscape successfully. This article explores the key trends shaping Canada's employment sector and offers insights on how to leverage these changes for career growth and organizational success.",
        sections: [
          {
            title: "Remote Work Becomes the New Standard",
            content: "While remote work gained traction during the global pandemic, it has now become a permanent fixture in the Canadian job market. In 2025, approximately 65% of Canadian businesses offer either fully remote or hybrid working arrangements. This shift has expanded the talent pool for employers and provided workers with greater flexibility and improved work-life balance.\n\nCompanies that continue to resist remote work opportunities are finding themselves at a disadvantage when competing for top talent. To attract and retain skilled professionals, organizations must develop robust remote work policies, invest in digital collaboration tools, and create virtual company cultures that foster engagement and productivity."
          },
          {
            title: "Skills-Based Hiring Overtakes Traditional Credentials",
            content: "Employers across Canada are increasingly prioritizing skills and competencies over formal education credentials. This trend reflects the recognition that traditional degrees don't always equip workers with the practical skills needed in rapidly evolving industries.\n\nSkills-based assessments, portfolio reviews, and practical demonstrations have become standard components of the hiring process. For job seekers, this means focusing on developing and showcasing relevant skills through certification programs, online courses, and personal projects. Employers are also investing more in upskilling and reskilling initiatives to address skills gaps within their existing workforce.",
            image: "/images/young-woman-office-style-clothes-glasses-holds-tablet-with-documents-employee.jpg"
          },
          {
            title: "Artificial Intelligence and Automation Reshape Roles",
            content: "AI and automation continue to transform job roles across industries. Rather than wholesale replacement of human workers, we're seeing a reconfiguration of job responsibilities. Routine and repetitive tasks are increasingly automated, allowing employees to focus on more strategic, creative, and interpersonal aspects of their work.\n\nThis evolution has created high demand for professionals who can work alongside AI systems and leverage automation tools effectively. Skills in AI management, data interpretation, and human-machine collaboration have become highly valuable in the job market. Meanwhile, uniquely human capabilities such as emotional intelligence, creative problem-solving, and ethical decision-making are commanding premium compensation."
          },
          {
            title: "Growing Demand for Sustainability Professionals",
            content: "As Canada strengthens its commitment to addressing climate change and achieving sustainability goals, we're seeing a surge in demand for professionals with expertise in environmental sustainability. From renewable energy specialists to sustainable supply chain managers, organizations across sectors are creating new roles focused on reducing environmental impact and meeting regulatory requirements.\n\nThis trend is particularly pronounced in resource-intensive industries such as energy, manufacturing, and transportation, which face increasing pressure to reduce carbon footprints. Professionals with backgrounds in environmental science, sustainable business practices, or green technology development are finding abundant opportunities in the current job market."
          },
          {
            title: "The Rise of the Gig Economy and Project-Based Work",
            content: "The gig economy continues to expand in Canada, with more professionals opting for freelance and contract work arrangements. Organizations are increasingly adopting project-based approaches, assembling teams of specialized contractors for specific initiatives rather than expanding permanent headcount.\n\nThis shift offers advantages for both parties: businesses gain flexibility and access to specialized expertise without long-term commitments, while workers enjoy variety and autonomy. However, it also presents challenges related to income stability, benefits coverage, and professional development. Successful navigation of this landscape requires adaptability, excellent self-marketing skills, and financial planning acumen.",
            image: "/images/team-working.png"
          }
        ],
        conclusion: "The Canadian job market in 2025 offers both exciting opportunities and significant challenges. By staying informed about these trends and adapting proactively, job seekers can position themselves for success in a rapidly evolving landscape. For employers, understanding these shifts is essential for developing effective talent acquisition and retention strategies.\n\nAt Recruitment Plus, we remain committed to helping both candidates and employers navigate these changes successfully. Our specialized recruiters stay ahead of industry trends to provide informed guidance and connect the right talent with the right opportunities in this dynamic environment."
      },
      relatedArticles: ["skilled-worker-program-guide", "essential-tech-skills-2025"]
    },
    "skilled-worker-program-guide": {
      id: "2",
      title: "Complete Guide to the Skilled Worker Program",
      slug: "skilled-worker-program-guide",
      date: "2025-05-22",
      readTime: 12,
      author: {
        name: "Sophie Martin",
        image: "/placeholder-user.jpg",
        role: "Immigration Specialist"
      },
      category: "immigration",
      tags: ["Immigration", "Skilled Workers", "Work Permits"],
      image: "/images/team-working.png",
      content: {
        intro: "Canada's Skilled Worker Program represents one of the country's primary pathways for skilled foreign professionals seeking to immigrate permanently. Designed to attract individuals whose skills, education, and work experience will contribute to the Canadian economy, this program has helped thousands of qualified workers and their families build new lives in Canada. This comprehensive guide breaks down the eligibility requirements, application process, and strategic considerations for those interested in applying.",
        sections: [
          {
            title: "Understanding the Federal Skilled Worker Program",
            content: "The Federal Skilled Worker Program (FSWP) operates under Canada's Express Entry system, which manages applications for permanent residence from skilled workers. The program uses a comprehensive ranking system to assess candidates based on their potential to succeed economically in Canada.\n\nThe Express Entry system was introduced in 2015 to streamline the immigration process for skilled workers. Rather than processing applications on a first-come, first-served basis, this system allows Canadian immigration authorities to select candidates with the highest potential for successful economic integration."
          },
          {
            title: "Key Eligibility Requirements",
            content: "To qualify for the Federal Skilled Worker Program, applicants must meet several core requirements:\n\n1. **Work Experience**: At least one year of continuous full-time (or equivalent part-time) skilled work experience within the past 10 years in a National Occupational Classification (NOC) job category 0, A, or B.\n\n2. **Language Proficiency**: Demonstrated proficiency in English or French, verified through approved language tests such as IELTS or CELPIP for English, or TEF for French.\n\n3. **Education**: A Canadian secondary or post-secondary certificate, diploma, or degree, or a foreign credential with an Educational Credential Assessment (ECA) confirming equivalency to Canadian standards.\n\n4. **Sufficient Funds**: Proof of adequate financial resources to support yourself and your family upon arrival in Canada (unless you already have a valid job offer from a Canadian employer).\n\n5. **Intention to Reside Outside Quebec**: Plans to live in any Canadian province or territory except Quebec, which operates its own skilled worker program.",
            image: "/images/young-woman-office-style-clothes-glasses-holds-tablet-with-documents-employee.jpg"
          },
          {
            title: "The Comprehensive Ranking System (CRS)",
            content: "Once candidates meet the minimum eligibility requirements, they're evaluated through the Comprehensive Ranking System (CRS), which assigns points based on the following factors:\n\n- **Core Human Capital Factors**: Age, education level, official language proficiency, and Canadian work experience (up to 500 points)\n\n- **Spouse or Common-Law Partner Factors**: Their level of education, language proficiency, and Canadian work experience (up to 40 points)\n\n- **Skill Transferability Factors**: Combinations of education, work experience, and language proficiency (up to 100 points)\n\n- **Additional Points**: Provincial nomination, qualified job offer, Canadian education, French language proficiency, sibling in Canada, etc. (up to 600 points)\n\nRegular draws select candidates with the highest CRS scores from the Express Entry pool, inviting them to apply for permanent residence."
          },
          {
            title: "Provincial Nominee Programs: An Alternative Pathway",
            content: "In addition to the federal program, most Canadian provinces and territories operate their own Provincial Nominee Programs (PNPs) that allow them to nominate individuals who wish to immigrate to their region and who meet specific local labor market needs.\n\nReceiving a provincial nomination adds 600 points to a candidate's CRS score, virtually guaranteeing an invitation to apply for permanent residence in the next Express Entry draw. Many provinces have Express Entry-aligned streams that allow them to select candidates directly from the federal pool, while others operate independently with their own application criteria and processes.\n\nFor candidates who may not have competitive CRS scores for federal selection, pursuing a provincial nomination can be a strategic alternative pathway."
          },
          {
            title: "Application Process and Timeline",
            content: "The application process for the Federal Skilled Worker Program involves several key steps:\n\n1. **Determine Eligibility**: Assess whether you meet the minimum requirements for the program.\n\n2. **Prepare Documentation**: Gather necessary documents, including language test results, educational credential assessments, and proof of work experience.\n\n3. **Create Express Entry Profile**: Submit your profile to the Express Entry pool.\n\n4. **Receive an Invitation to Apply (ITA)**: If selected based on your CRS score, you'll receive an invitation to apply for permanent residence.\n\n5. **Submit Complete Application**: After receiving an ITA, you have 60 days to submit a complete application for permanent residence.\n\n6. **Application Processing**: Once submitted, applications are typically processed within 6 months.\n\n7. **Final Steps**: If approved, you'll need to complete a medical examination, provide police certificates, and pay the Right of Permanent Residence Fee before receiving your confirmation of permanent residence.",
            image: "/images/business-meeting-office-recuiteers.jpg"
          }
        ],
        conclusion: "The Federal Skilled Worker Program offers a structured pathway to Canadian permanent residence for qualified professionals from around the world. While the process requires careful preparation and patience, successful applicants gain access to Canada's high quality of life, robust economy, and inclusive society.\n\nAt Recruitment Plus, our immigration specialists provide comprehensive support throughout the skilled worker application process. From initial eligibility assessment to document preparation and application submission, we guide candidates through each step to maximize their chances of success. If you're considering immigrating to Canada as a skilled worker, contact our team to explore how we can assist with your journey."
      },
      relatedArticles: ["canadian-job-market-trends-2025", "international-recruitment-benefits"]
    },
    ...newArticles.en
  },
  "fr": {
    "canadian-job-market-trends-2025": {
      id: "1",
      title: "Les tendances du marché du travail canadien en 2025",
      slug: "canadian-job-market-trends-2025",
      date: "2025-05-28",
      readTime: 8,
      author: {
        name: "Marie Tremblay",
        image: "/placeholder-user.jpg",
        role: "Spécialiste RH"
      },
      category: "hr-trends",
      tags: ["Tendances du marché", "Avenir du travail", "Développement de carrière"],
      image: "/images/business-meeting-office-recuiteers.jpg",
      content: {
        intro: "Le marché du travail canadien évolue constamment, influencé par les avancées technologiques, les changements économiques et l'évolution démographique de la main-d'œuvre. En 2025, comprendre ces tendances émergentes est crucial tant pour les chercheurs d'emploi que pour les employeurs afin de naviguer avec succès dans ce paysage concurrentiel. Cet article explore les principales tendances qui façonnent le secteur de l'emploi au Canada et offre des perspectives sur la façon de tirer parti de ces changements pour la croissance professionnelle et le succès organisationnel.",
        sections: [
          {
            title: "Le travail à distance devient la nouvelle norme",
            content: "Alors que le travail à distance a gagné du terrain pendant la pandémie mondiale, il est maintenant devenu une caractéristique permanente du marché du travail canadien. En 2025, environ 65% des entreprises canadiennes offrent des arrangements de travail entièrement à distance ou hybrides. Ce changement a élargi le bassin de talents pour les employeurs et a offert aux travailleurs une plus grande flexibilité et un meilleur équilibre travail-vie personnelle.\n\nLes entreprises qui continuent de résister aux opportunités de travail à distance se retrouvent désavantagées lorsqu'elles sont en concurrence pour attirer les meilleurs talents. Pour attirer et retenir des professionnels qualifiés, les organisations doivent développer des politiques solides de travail à distance, investir dans des outils de collaboration numérique et créer des cultures d'entreprise virtuelles qui favorisent l'engagement et la productivité."
          },
          {
            title: "Le recrutement basé sur les compétences dépasse les diplômes traditionnels",
            content: "Les employeurs à travers le Canada accordent de plus en plus d'importance aux compétences plutôt qu'aux diplômes d'éducation formelle. Cette tendance reflète la reconnaissance que les diplômes traditionnels n'équipent pas toujours les travailleurs des compétences pratiques nécessaires dans des industries en rapide évolution.\n\nLes évaluations basées sur les compétences, les revues de portfolio et les démonstrations pratiques sont devenues des composantes standard du processus d'embauche. Pour les chercheurs d'emploi, cela signifie se concentrer sur le développement et la mise en valeur des compétences pertinentes à travers des programmes de certification, des cours en ligne et des projets personnels. Les employeurs investissent également davantage dans des initiatives de perfectionnement et de reconversion pour combler les lacunes en compétences au sein de leur main-d'œuvre existante.",
            image: "/images/young-woman-office-style-clothes-glasses-holds-tablet-with-documents-employee.jpg"
          },
          {
            title: "L'intelligence artificielle et l'automatisation redéfinissent les rôles",
            content: "L'IA et l'automatisation continuent de transformer les rôles professionnels dans tous les secteurs. Plutôt que de remplacer complètement les travailleurs humains, nous assistons à une reconfiguration des responsabilités. Les tâches routinières et répétitives sont de plus en plus automatisées, permettant aux employés de se concentrer sur les aspects plus stratégiques, créatifs et interpersonnels de leur travail.\n\nCette évolution a créé une forte demande pour les professionnels qui peuvent travailler aux côtés des systèmes d'IA et utiliser efficacement les outils d'automatisation. Les compétences en gestion de l'IA, en interprétation des données et en collaboration homme-machine sont devenues très précieuses sur le marché du travail. Pendant ce temps, les capacités uniquement humaines telles que l'intelligence émotionnelle, la résolution créative de problèmes et la prise de décision éthique commandent une rémunération premium."
          },
          {
            title: "Demande croissante pour les professionnels du développement durable",
            content: "Alors que le Canada renforce son engagement à lutter contre le changement climatique et à atteindre des objectifs de durabilité, nous assistons à une augmentation de la demande pour les professionnels ayant une expertise en durabilité environnementale. Des spécialistes des énergies renouvelables aux gestionnaires de chaînes d'approvisionnement durables, les organisations de tous les secteurs créent de nouveaux rôles axés sur la réduction de l'impact environnemental et le respect des exigences réglementaires.\n\nCette tendance est particulièrement prononcée dans les industries à forte intensité de ressources comme l'énergie, la fabrication et les transports, qui font face à une pression croissante pour réduire leur empreinte carbone. Les professionnels ayant une formation en sciences environnementales, en pratiques commerciales durables ou en développement de technologies vertes trouvent de nombreuses opportunités sur le marché du travail actuel."
          },
          {
            title: "L'essor de l'économie des petits boulots et du travail par projet",
            content: "L'économie des petits boulots continue de s'étendre au Canada, avec plus de professionnels optant pour des arrangements de travail freelance et contractuel. Les organisations adoptent de plus en plus des approches basées sur des projets, réunissant des équipes de contractants spécialisés pour des initiatives spécifiques plutôt que d'augmenter l'effectif permanent.\n\nCe changement offre des avantages pour les deux parties : les entreprises gagnent en flexibilité et en accès à une expertise spécialisée sans engagements à long terme, tandis que les travailleurs bénéficient de variété et d'autonomie. Cependant, cela présente également des défis liés à la stabilité des revenus, à la couverture des avantages sociaux et au développement professionnel. Une navigation réussie dans ce paysage nécessite de l'adaptabilité, d'excellentes compétences d'auto-marketing et une acuité en planification financière.",
            image: "/images/team-working.png"
          }
        ],
        conclusion: "Le marché du travail canadien en 2025 offre à la fois des opportunités passionnantes et des défis significatifs. En restant informés de ces tendances et en s'adaptant de manière proactive, les chercheurs d'emploi peuvent se positionner pour réussir dans un paysage en rapide évolution. Pour les employeurs, comprendre ces changements est essentiel pour développer des stratégies efficaces d'acquisition et de rétention de talents.\n\nChez Recruitment Plus, nous restons engagés à aider les candidats et les employeurs à naviguer avec succès dans ces changements. Nos recruteurs spécialisés restent à l'avant-garde des tendances de l'industrie pour fournir des conseils éclairés et connecter les bons talents avec les bonnes opportunités dans cet environnement dynamique."
      },
      relatedArticles: ["skilled-worker-program-guide", "essential-tech-skills-2025"]
    },
    "skilled-worker-program-guide": {
      id: "2",
      title: "Guide complet du Programme des travailleurs qualifiés",
      slug: "skilled-worker-program-guide",
      date: "2025-05-22",
      readTime: 12,
      author: {
        name: "Sophie Martin",
        image: "/placeholder-user.jpg",
        role: "Spécialiste en immigration"
      },
      category: "immigration",
      tags: ["Immigration", "Travailleurs qualifiés", "Permis de travail"],
      image: "/images/team-working.png",
      content: {
        intro: "Le Programme des travailleurs qualifiés du Canada représente l'une des principales voies d'accès du pays pour les professionnels étrangers qualifiés cherchant à immigrer de façon permanente. Conçu pour attirer des personnes dont les compétences, l'éducation et l'expérience professionnelle contribueront à l'économie canadienne, ce programme a aidé des milliers de travailleurs qualifiés et leurs familles à construire une nouvelle vie au Canada. Ce guide complet détaille les exigences d'admissibilité, le processus de demande et les considérations stratégiques pour ceux qui sont intéressés à postuler.",
        sections: [
          {
            title: "Comprendre le Programme fédéral des travailleurs qualifiés",
            content: "Le Programme fédéral des travailleurs qualifiés (PFTQ) fonctionne dans le cadre du système Entrée express du Canada, qui gère les demandes de résidence permanente des travailleurs qualifiés. Le programme utilise un système de classement complet pour évaluer les candidats en fonction de leur potentiel à réussir économiquement au Canada.\n\nLe système Entrée express a été introduit en 2015 pour rationaliser le processus d'immigration pour les travailleurs qualifiés. Plutôt que de traiter les demandes selon le principe du premier arrivé, premier servi, ce système permet aux autorités canadiennes d'immigration de sélectionner les candidats ayant le plus grand potentiel d'intégration économique réussie."
          },
          {
            title: "Principales exigences d'admissibilité",
            content: "Pour être admissible au Programme fédéral des travailleurs qualifiés, les candidats doivent répondre à plusieurs exigences fondamentales :\n\n1. **Expérience professionnelle** : Au moins un an d'expérience de travail qualifié continue à temps plein (ou l'équivalent à temps partiel) au cours des 10 dernières années dans une catégorie d'emploi de la Classification nationale des professions (CNP) 0, A ou B.\n\n2. **Compétence linguistique** : Maîtrise démontrée du français ou de l'anglais, vérifiée par des tests linguistiques approuvés comme l'IELTS ou le CELPIP pour l'anglais, ou le TEF pour le français.\n\n3. **Éducation** : Un certificat, diplôme ou grade canadien d'études secondaires ou postsecondaires, ou un diplôme étranger avec une évaluation des diplômes d'études (EDE) confirmant l'équivalence aux normes canadiennes.\n\n4. **Fonds suffisants** : Preuve de ressources financières adéquates pour vous soutenir, vous et votre famille, à votre arrivée au Canada (sauf si vous avez déjà une offre d'emploi valide d'un employeur canadien).\n\n5. **Intention de résider hors Québec** : Projets de vivre dans n'importe quelle province ou territoire canadien sauf le Québec, qui exploite son propre programme de travailleurs qualifiés.",
            image: "/images/young-woman-office-style-clothes-glasses-holds-tablet-with-documents-employee.jpg"
          },
          {
            title: "Le Système de classement global (SCG)",
            content: "Une fois que les candidats répondent aux exigences minimales d'admissibilité, ils sont évalués par le Système de classement global (SCG), qui attribue des points en fonction des facteurs suivants :\n\n- **Facteurs de capital humain fondamental** : Âge, niveau d'éducation, maîtrise des langues officielles et expérience de travail canadienne (jusqu'à 500 points)\n\n- **Facteurs liés à l'époux ou au conjoint de fait** : Leur niveau d'éducation, maîtrise linguistique et expérience de travail canadienne (jusqu'à 40 points)\n\n- **Facteurs de transférabilité des compétences** : Combinaisons d'éducation, d'expérience professionnelle et de compétence linguistique (jusqu'à 100 points)\n\n- **Points supplémentaires** : Nomination provinciale, offre d'emploi qualifiée, éducation canadienne, maîtrise du français, frère ou sœur au Canada, etc. (jusqu'à 600 points)\n\nDes tirages réguliers sélectionnent les candidats ayant les scores SCG les plus élevés du bassin d'Entrée express, les invitant à présenter une demande de résidence permanente."
          },
          {
            title: "Programmes de nomination des provinces : Une voie alternative",
            content: "En plus du programme fédéral, la plupart des provinces et territoires canadiens exploitent leurs propres Programmes de nomination des provinces (PNP) qui leur permettent de nommer des personnes qui souhaitent immigrer dans leur région et qui répondent à des besoins spécifiques du marché du travail local.\n\nRecevoir une nomination provinciale ajoute 600 points au score SCG d'un candidat, garantissant pratiquement une invitation à présenter une demande de résidence permanente lors du prochain tirage d'Entrée express. De nombreuses provinces ont des volets alignés sur Entrée express qui leur permettent de sélectionner des candidats directement du bassin fédéral, tandis que d'autres fonctionnent indépendamment avec leurs propres critères et processus de demande.\n\nPour les candidats qui n'ont pas de scores SCG compétitifs pour la sélection fédérale, poursuivre une nomination provinciale peut être une voie alternative stratégique."
          },
          {
            title: "Processus et calendrier de demande",
            content: "Le processus de demande pour le Programme fédéral des travailleurs qualifiés comprend plusieurs étapes clés :\n\n1. **Déterminer l'admissibilité** : Évaluer si vous répondez aux exigences minimales du programme.\n\n2. **Préparer la documentation** : Rassembler les documents nécessaires, y compris les résultats de tests linguistiques, les évaluations de diplômes d'études et la preuve d'expérience professionnelle.\n\n3. **Créer un profil Entrée express** : Soumettre votre profil au bassin d'Entrée express.\n\n4. **Recevoir une invitation à présenter une demande (IPD)** : Si vous êtes sélectionné en fonction de votre score SCG, vous recevrez une invitation à présenter une demande de résidence permanente.\n\n5. **Soumettre une demande complète** : Après avoir reçu une IPD, vous avez 60 jours pour soumettre une demande complète de résidence permanente.\n\n6. **Traitement de la demande** : Une fois soumises, les demandes sont généralement traitées dans un délai de 6 mois.\n\n7. **Étapes finales** : Si approuvé, vous devrez compléter un examen médical, fournir des certificats de police et payer les frais de droit de résidence permanente avant de recevoir votre confirmation de résidence permanente.",
            image: "/images/business-meeting-office-recuiteers.jpg"
          }
        ],
        conclusion: "Le Programme fédéral des travailleurs qualifiés offre une voie structurée vers la résidence permanente canadienne pour les professionnels qualifiés du monde entier. Bien que le processus exige une préparation minutieuse et de la patience, les candidats retenus ont accès à la haute qualité de vie du Canada, à son économie robuste et à sa société inclusive.\n\nChez Recruitment Plus, nos spécialistes en immigration fournissent un soutien complet tout au long du processus de demande pour les travailleurs qualifiés. De l'évaluation initiale de l'admissibilité à la préparation des documents et à la soumission de la demande, nous guidons les candidats à chaque étape pour maximiser leurs chances de succès. Si vous envisagez d'immigrer au Canada en tant que travailleur qualifié, contactez notre équipe pour explorer comment nous pouvons vous aider dans votre parcours."
      },
      relatedArticles: ["canadian-job-market-trends-2025", "international-recruitment-benefits"]
    }
    // French versions can be added later if needed
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const { locale } = useLanguage()
  const dateLocale = locale === 'fr' ? fr : enUS
  
  // Get the appropriate article based on the slug and language
  const article = blogArticles[locale]?.[params.slug]
  
  // State for related articles
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'PPP', { locale: dateLocale })
  }
  
  // Get related articles
  useEffect(() => {
    if (article?.relatedArticles) {
      const related = article.relatedArticles
        .map(relatedSlug => blogArticles[locale]?.[relatedSlug])
        .filter(Boolean) as Article[]
      setRelatedArticles(related)
    }
  }, [article, locale])

  // If article not found
  if (!article) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">
              {locale === 'fr' ? 'Article non trouvé' : 'Article Not Found'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {locale === 'fr' 
                ? "Nous n'avons pas pu trouver l'article que vous cherchez."
                : "We couldn't find the article you're looking for."}
            </p>
            <Link href="/blog">
              <Button>
                {locale === 'fr' ? 'Retour au blog' : 'Back to Blog'}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30 floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-30 floating-element"
            style={{ animationDelay: "-3s" }}
          ></div>
          
          <div className="container relative z-10 py-16">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                <ChevronLeft className="h-4 w-4" />
                {locale === 'fr' ? 'Retour aux articles' : 'Back to articles'}
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-6 flex-wrap mb-8">
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image 
                      src={article.author.image || "/placeholder-user.jpg"}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{article.author.name}</div>
                    <div className="text-xs text-muted-foreground">{article.author.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {formatDate(article.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime} {locale === 'fr' ? 'min de lecture' : 'min read'}
                  </div>
                </div>
                
                <Badge variant="secondary">
                  {locale === 'fr' 
                    ? (article.category === 'hr-trends' ? 'Tendances RH' : 
                       article.category === 'immigration' ? 'Immigration' : 
                       article.category === 'career' ? 'Carrière' : 
                       article.category === 'recruitment' ? 'Recrutement' : 
                       article.category === 'employment' ? 'Emploi' : article.category)
                    : (article.category === 'hr-trends' ? 'HR Trends' : 
                       article.category === 'immigration' ? 'Immigration' : 
                       article.category === 'career' ? 'Career' : 
                       article.category === 'recruitment' ? 'Recruitment' : 
                       article.category === 'employment' ? 'Employment' : article.category)
                  }
                </Badge>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Image */}
        <div className="relative h-96 md:h-[500px] w-full bg-black/10">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <div className="max-w-3xl">
              {/* Introduction */}
              <div className="prose prose-lg dark:prose-invert mb-12 max-w-none">
                <p className="lead text-xl font-medium text-foreground">{article.content.intro}</p>
              </div>
              
              {/* Article Sections */}
              <div className="space-y-12">
                {article.content.sections.map((section, index) => (
                  <section key={index} className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                    {section.image && (
                      <div className="my-8 relative h-80 rounded-xl overflow-hidden">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </section>
                ))}
              </div>
              
              {/* Conclusion */}
              <div className="prose dark:prose-invert mt-12 max-w-none">
                <h2 className="text-2xl font-bold mb-4">
                  {locale === 'fr' ? 'Conclusion' : 'Conclusion'}
                </h2>
                {article.content.conclusion.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              {/* Tags */}
              <div className="mt-12">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-primary" />
                  {locale === 'fr' ? 'Tags' : 'Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary/10 border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Share and Actions */}
              <div className="mt-12 flex flex-wrap gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  {locale === 'fr' ? 'Partager' : 'Share'}
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  {locale === 'fr' ? 'Sauvegarder' : 'Save'}
                </Button>
              </div>
              
              {/* Author Info */}
              <div className="mt-12 bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image 
                      src={article.author.image || "/placeholder-user.jpg"}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{article.author.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{article.author.role}</p>
                    <p className="text-sm">
                      {locale === 'fr'
                        ? `${article.author.name} est un(e) spécialiste en recrutement chez Recruitment Plus avec une expertise en ${article.category === 'hr-trends' ? 'tendances RH' : article.category === 'immigration' ? 'immigration' : article.category === 'career' ? 'développement de carrière' : article.category === 'recruitment' ? 'recrutement' : 'emploi'}.`
                        : `${article.author.name} is a recruitment specialist at Recruitment Plus with expertise in ${article.category === 'hr-trends' ? 'HR trends' : article.category === 'immigration' ? 'immigration' : article.category === 'career' ? 'career development' : article.category === 'recruitment' ? 'recruitment' : 'employment'}.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6 sticky top-24">
                  <h3 className="text-lg font-bold mb-4">
                    {locale === 'fr' ? 'Articles connexes' : 'Related Articles'}
                  </h3>
                  <div className="space-y-6">
                    {relatedArticles.map((related) => (
                      <div key={related.id} className="group">
                        <Link href={`/blog/${related.slug}`} className="flex gap-3">
                          <div className="relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={related.image}
                              alt={related.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                              {related.title}
                            </h4>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatDate(related.date)}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Company Info */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'À propos de Recruitment Plus' : 'About Recruitment Plus'}
                </h3>
                <p className="text-sm mb-4">
                  {locale === 'fr'
                    ? "Recruitment Plus est une agence de recrutement canadienne de premier plan, spécialisée dans le recrutement local et international pour les entreprises canadiennes et les professionnels cherchant des opportunités au Canada."
                    : "Recruitment Plus is a leading Canadian recruitment agency, specializing in both local and international recruitment for Canadian businesses and professionals seeking opportunities in Canada."
                  }
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>
                      {locale === 'fr' ? 'Services de recrutement spécialisés' : 'Specialized Recruitment Services'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>
                      {locale === 'fr' ? 'Bureaux à Montréal, Toronto et Vancouver' : 'Offices in Montreal, Toronto, and Vancouver'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span>
                      {locale === 'fr' ? 'Connexions mondiales avec plus de 30 pays' : 'Global connections with over 30 countries'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>
                      {locale === 'fr' ? 'Plus de 5000 placements réussis' : 'Over 5,000 successful placements'}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/a-propos">
                    <Button variant="outline" className="w-full">
                      {locale === 'fr' ? 'En savoir plus' : 'Learn More'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-primary/20 via-background/80 to-secondary/20 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {locale === 'fr' 
                  ? 'Besoin d\'aide pour votre recrutement ou votre carrière?' 
                  : 'Need help with your recruitment or career?'}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {locale === 'fr'
                  ? "Nos experts en recrutement sont prêts à vous aider à trouver les meilleurs talents ou la prochaine étape de votre carrière au Canada."
                  : "Our recruitment experts are ready to help you find the best talent or your next career move in Canada."
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white">
                  {locale === 'fr' ? 'Contacter un expert' : 'Contact an Expert'}
                </Button>
                <Button variant="outline">
                  {locale === 'fr' ? 'Voir nos services' : 'View Our Services'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}