"use client"

import { useState, useEffect } from "react"
import { Mail, ShieldCheck, Lock, User, Database, Globe, Check } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function PrivacyPolicyPage() {
  const { t, locale } = useLanguage()
  const [activeSection, setActiveSection] = useState<string | null>(null)
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      let currentSection: string | null = null
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop <= 100) {
          currentSection = section.getAttribute('data-section')
        }
      })
      
      setActiveSection(currentSection)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  // Privacy policy sections
  const privacySections = locale === 'fr' ? [
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <div>
          <p>Chez Recrutement Plus Inc., nous prenons très au sérieux la protection de vos données personnelles. Cette politique de confidentialité vous informe de la manière dont nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.</p>
          <p className="mt-2">Veuillez lire attentivement cette politique pour comprendre nos pratiques concernant vos données personnelles.</p>
        </div>
      )
    },
    {
      id: "informations-collectees",
      title: "Informations collectées",
      content: (
        <div>
          <p>Nous collectons les types d'informations suivants:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Informations d'identification (nom, prénom, adresse email, numéro de téléphone)</li>
            <li>Informations professionnelles (CV, expériences, compétences)</li>
            <li>Informations de connexion et d'utilisation de notre site</li>
            <li>Préférences de communication</li>
          </ul>
        </div>
      )
    },
    {
      id: "utilisation-informations",
      title: "Utilisation des informations",
      content: (
        <div>
          <p>Nous utilisons vos informations personnelles aux fins suivantes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Fournir et améliorer nos services de recrutement</li>
            <li>Vous mettre en relation avec des opportunités d'emploi pertinentes</li>
            <li>Communiquer avec vous concernant votre compte ou nos services</li>
            <li>Personnaliser votre expérience sur notre plateforme</li>
            <li>Respecter nos obligations légales et réglementaires</li>
          </ul>
        </div>
      )
    },
    {
      id: "partage-informations",
      title: "Partage des informations",
      content: (
        <div>
          <p>Nous pouvons partager vos informations avec:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Les employeurs potentiels (avec votre consentement explicite)</li>
            <li>Nos prestataires de services (qui nous aident à fournir nos services)</li>
            <li>Les autorités légales (lorsque requis par la loi)</li>
          </ul>
          <p className="mt-2">Nous ne vendons jamais vos données personnelles à des tiers.</p>
        </div>
      )
    },
    {
      id: "conservation-donnees",
      title: "Conservation des données",
      content: (
        <div>
          <p>Nous conservons vos données personnelles aussi longtemps que nécessaire pour:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Fournir nos services</li>
            <li>Respecter nos obligations légales</li>
            <li>Résoudre les litiges</li>
            <li>Faire respecter nos accords</li>
          </ul>
          <p className="mt-2">Généralement, nous conservons les profils des candidats pendant une période de 2 ans après la dernière activité sur le compte.</p>
        </div>
      )
    },
    {
      id: "cookies",
      title: "Cookies et technologies similaires",
      content: (
        <div>
          <p>Notre site utilise des cookies et des technologies similaires pour:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Assurer le bon fonctionnement du site</li>
            <li>Mémoriser vos préférences</li>
            <li>Analyser l'utilisation du site</li>
            <li>Personnaliser votre expérience</li>
          </ul>
          <p className="mt-2">Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait affecter certaines fonctionnalités de notre site.</p>
        </div>
      )
    },
    {
      id: "droits",
      title: "Vos droits",
      content: (
        <div>
          <p>Conformément aux lois sur la protection des données, vous disposez des droits suivants:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement (« droit à l'oubli »)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition au traitement</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
        </div>
      )
    },
    {
      id: "securite",
      title: "Sécurité des données",
      content: (
        <div>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles, notamment:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Chiffrement des données sensibles</li>
            <li>Contrôles d'accès stricts</li>
            <li>Audits de sécurité réguliers</li>
            <li>Formation du personnel sur la protection des données</li>
          </ul>
        </div>
      )
    },
    {
      id: "transferts-internationaux",
      title: "Transferts internationaux",
      content: (
        <div>
          <p>Étant une entreprise opérant à l'international, nous pouvons transférer vos données personnelles vers des pays situés en dehors du Canada.</p>
          <p className="mt-2">Lorsque nous transférons vos données à l'étranger, nous nous assurons qu'elles bénéficient d'un niveau de protection adéquat, conformément aux lois applicables sur la protection des données.</p>
        </div>
      )
    },
    {
      id: "enfants",
      title: "Protection des enfants",
      content: (
        <div>
          <p>Nos services ne s'adressent pas aux personnes de moins de 18 ans. Nous ne collectons pas sciemment des informations personnelles concernant des enfants.</p>
          <p className="mt-2">Si vous êtes un parent ou un tuteur et que vous pensez que votre enfant nous a fourni des informations personnelles, veuillez nous contacter pour que nous puissions prendre les mesures nécessaires.</p>
        </div>
      )
    },
    {
      id: "modifications",
      title: "Modifications de la politique",
      content: (
        <div>
          <p>Nous pouvons modifier cette politique de confidentialité de temps à autre pour refléter les changements dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires.</p>
          <p className="mt-2">Nous vous encourageons à consulter régulièrement cette page pour rester informé des mises à jour. La date de la dernière mise à jour est indiquée en haut de cette politique.</p>
        </div>
      )
    },
    {
      id: "reclamations",
      title: "Réclamations",
      content: (
        <div>
          <p>Si vous avez des préoccupations concernant notre traitement de vos données personnelles, veuillez nous contacter en premier lieu.</p>
          <p className="mt-2">Vous avez également le droit de déposer une plainte auprès de l'autorité de protection des données compétente, comme le Commissariat à la protection de la vie privée du Canada.</p>
        </div>
      )
    },
    {
      id: "contact",
      title: "Nous contacter",
      content: (
        <div>
          <p>Pour toute question ou préoccupation concernant cette politique de confidentialité ou nos pratiques en matière de protection des données, veuillez nous contacter à:</p>
          <div className="mt-2 space-y-1">
            <div>Email: confidentialite@recruitmentplus.ca</div>
            <div>Téléphone: +1 (514) 123-4567</div>
            <div>Adresse: 123 Rue Principale, Montréal, QC H3Z 2Y7, Canada</div>
          </div>
        </div>
      )
    }
  ] : [
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <div>
          <p>At Recruitment Plus Inc., we take the protection of your personal data very seriously. This privacy policy informs you of how we collect, use, and protect your information when you use our website and services.</p>
          <p className="mt-2">Please read this policy carefully to understand our practices regarding your personal data.</p>
        </div>
      )
    },
    {
      id: "information-collected",
      title: "Information Collected",
      content: (
        <div>
          <p>We collect the following types of information:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Identification information (name, email address, phone number)</li>
            <li>Professional information (resume, experience, skills)</li>
            <li>Login and website usage information</li>
            <li>Communication preferences</li>
          </ul>
        </div>
      )
    },
    {
      id: "use-of-information",
      title: "Use of Information",
      content: (
        <div>
          <p>We use your personal information for the following purposes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Providing and improving our recruitment services</li>
            <li>Connecting you with relevant job opportunities</li>
            <li>Communicating with you about your account or our services</li>
            <li>Personalizing your experience on our platform</li>
            <li>Complying with our legal and regulatory obligations</li>
          </ul>
        </div>
      )
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      content: (
        <div>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Potential employers (with your explicit consent)</li>
            <li>Our service providers (who help us provide our services)</li>
            <li>Legal authorities (when required by law)</li>
          </ul>
          <p className="mt-2">We never sell your personal data to third parties.</p>
        </div>
      )
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: (
        <div>
          <p>We retain your personal data for as long as necessary to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide our services</li>
            <li>Comply with our legal obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce our agreements</li>
          </ul>
          <p className="mt-2">Generally, we keep candidate profiles for a period of 2 years after the last activity on the account.</p>
        </div>
      )
    },
    {
      id: "cookies",
      title: "Cookies and Similar Technologies",
      content: (
        <div>
          <p>Our site uses cookies and similar technologies to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Ensure the proper functioning of the site</li>
            <li>Remember your preferences</li>
            <li>Analyze site usage</li>
            <li>Personalize your experience</li>
          </ul>
          <p className="mt-2">You can configure your browser to refuse cookies, but this may affect certain features of our site.</p>
        </div>
      )
    },
    {
      id: "your-rights",
      title: "Your Rights",
      content: (
        <div>
          <p>In accordance with data protection laws, you have the following rights:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restriction of processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw your consent at any time</li>
          </ul>
        </div>
      )
    },
    {
      id: "data-security",
      title: "Data Security",
      content: (
        <div>
          <p>We implement appropriate technical and organizational measures to protect your personal data, including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Encryption of sensitive data</li>
            <li>Strict access controls</li>
            <li>Regular security audits</li>
            <li>Staff training on data protection</li>
          </ul>
        </div>
      )
    },
    {
      id: "international-transfers",
      title: "International Transfers",
      content: (
        <div>
          <p>As an internationally operating company, we may transfer your personal data to countries located outside of Canada.</p>
          <p className="mt-2">When we transfer your data abroad, we ensure that it benefits from an adequate level of protection, in accordance with applicable data protection laws.</p>
        </div>
      )
    },
    {
      id: "children",
      title: "Children's Protection",
      content: (
        <div>
          <p>Our services are not directed at individuals under 18 years of age. We do not knowingly collect personal information from children.</p>
          <p className="mt-2">If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can take the necessary steps.</p>
        </div>
      )
    },
    {
      id: "policy-changes",
      title: "Policy Changes",
      content: (
        <div>
          <p>We may modify this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>
          <p className="mt-2">We encourage you to regularly review this page to stay informed of updates. The date of the last update is indicated at the top of this policy.</p>
        </div>
      )
    },
    {
      id: "complaints",
      title: "Complaints",
      content: (
        <div>
          <p>If you have concerns about our processing of your personal data, please contact us first.</p>
          <p className="mt-2">You also have the right to file a complaint with the competent data protection authority, such as the Office of the Privacy Commissioner of Canada.</p>
        </div>
      )
    },
    {
      id: "contact-us",
      title: "Contact Us",
      content: (
        <div>
          <p>For any questions or concerns regarding this privacy policy or our data protection practices, please contact us at:</p>
          <div className="mt-2 space-y-1">
            <div>Email: privacy@recruitmentplus.ca</div>
            <div>Phone: +1 (514) 123-4567</div>
            <div>Address: 123 Main Street, Montreal, QC H3Z 2Y7, Canada</div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="flex min-h-screen flex-col pt-16">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30 floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-30 floating-element"
            style={{ animationDelay: "-3s" }}
          ></div>
          
          <div className="container relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
              </span>
            </h1>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {locale === 'fr' 
                ? 'Comment nous collectons, utilisons et protégeons vos informations personnelles.' 
                : 'How we collect, use and protect your personal information.'}
            </p>
            <div className="text-sm text-muted-foreground text-center">
              {locale === 'fr' ? 'Dernière mise à jour: 4 juin 2025' : 'Last updated: June 4, 2025'}
            </div>
          </div>
        </section>

        {/* Two-column layout with sticky TOC */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              {/* Table of Contents - Sticky on desktop */}
              <div className="hidden lg:block lg:sticky lg:top-24 h-fit bg-background/80 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg">
                <div className="flex items-center mb-4 space-x-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">
                    {locale === 'fr' ? 'Table des matières' : 'Table of Contents'}
                  </h3>
                </div>
                <nav className="space-y-2">
                  {privacySections.map((section) => (
                    <a 
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block p-2 rounded-lg transition-all text-sm ${
                        activeSection === section.id 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "hover:bg-primary/5"
                      }`}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
              
              {/* Content sections */}
              <div className="space-y-8">
                {privacySections.map((section) => (
                  <div 
                    id={section.id}
                    key={section.id} 
                    data-section={section.id}
                    className="bg-background/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-6 scroll-mt-24"
                  >
                    <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                    <div className="prose prose-sm max-w-none">
                      {section.content}
                    </div>
                  </div>
                ))}
                
                {/* Privacy commitments section */}
                <div className="bg-primary/5 backdrop-blur-md rounded-xl border border-primary/10 shadow-lg p-6 mt-12">
                  <h2 className="text-xl font-bold mb-6 text-center">
                    {locale === 'fr' ? 'Nos engagements en matière de confidentialité' : 'Our Privacy Commitments'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2">
                        {locale === 'fr' ? 'Sécurité' : 'Security'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'fr' 
                          ? 'Nous utilisons des mesures de sécurité avancées pour protéger vos données.'
                          : 'We use advanced security measures to protect your data.'}
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2">
                        {locale === 'fr' ? 'Transparence' : 'Transparency'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'fr' 
                          ? 'Nous sommes clairs sur la façon dont vos données sont utilisées.'
                          : 'We are clear about how your data is used.'}
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2">
                        {locale === 'fr' ? 'Choix' : 'Choice'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'fr' 
                          ? 'Vous contrôlez comment vos informations sont partagées.'
                          : 'You control how your information is shared.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}