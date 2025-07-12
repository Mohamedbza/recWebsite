"use client"

import { Mail, Accessibility, Eye, Headphones, Cpu } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function AccessibilityPage() {
  const { t, locale } = useLanguage()
  
  // Accessibility sections with icons
  const accessibilitySections = locale === 'fr' ? [
    {
      title: "Nos Standards",
      icon: <Accessibility className="h-6 w-6 text-primary" />,
      content: (
        <div>
          <p>Recrutement Plus s'engage à respecter les standards internationaux d'accessibilité du web, notamment:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Les Règles pour l'accessibilité des contenus Web (WCAG) 2.1 de niveau AA</li>
            <li>Les normes d'accessibilité pour les technologies de l'information et de la communication</li>
            <li>Les meilleures pratiques en matière d'expérience utilisateur inclusive</li>
          </ul>
        </div>
      )
    },
    {
      title: "Fonctionnalités d'Accessibilité",
      icon: <Eye className="h-6 w-6 text-primary" />,
      content: (
        <div>
          <p>Notre site web inclut les fonctionnalités d'accessibilité suivantes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Navigation au clavier pour tous les éléments interactifs</li>
            <li>Texte alternatif pour les images</li>
            <li>Structure sémantique permettant une navigation par lecteur d'écran</li>
            <li>Contraste suffisant entre le texte et l'arrière-plan</li>
            <li>Redimensionnement du texte sans perte de fonctionnalité</li>
            <li>Contrôles accessibles et étiquetés appropriés</li>
          </ul>
        </div>
      )
    },
    {
      title: "Assistance Technique",
      icon: <Headphones className="h-6 w-6 text-primary" />,
      content: (
        <div>
          <p>Si vous rencontrez des difficultés en utilisant notre site web, ou si vous avez besoin d'assistance pour accéder à un contenu spécifique, n'hésitez pas à nous contacter:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Par téléphone: +1 (514) 123-4567</li>
            <li>Par email: accessibilite@recruitmentplus.ca</li>
          </ul>
          <p className="mt-2">Notre équipe est disponible pour vous aider et pour fournir des formats alternatifs de contenu si nécessaire.</p>
        </div>
      )
    },
    {
      title: "Amélioration Continue",
      icon: <Cpu className="h-6 w-6 text-primary" />,
      content: (
        <div>
          <p>Nous nous engageons dans un processus d'amélioration continue de l'accessibilité de notre site web:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Nous effectuons des audits d'accessibilité réguliers</li>
            <li>Nous formons notre équipe aux bonnes pratiques d'accessibilité</li>
            <li>Nous intégrons l'accessibilité dès la conception de nouvelles fonctionnalités</li>
            <li>Nous sollicitons les retours des utilisateurs ayant des besoins d'accessibilité</li>
          </ul>
          <p className="mt-2">Vos commentaires sont précieux pour nous aider à améliorer. N'hésitez pas à nous faire part de vos suggestions.</p>
        </div>
      )
    }
  ] : [
    {
      title: "Our Standards",
      icon: <Accessibility className="h-6 w-6 text-primary" />,
      content: (
        <div>
          <p>Recruitment Plus is committed to adhering to international web accessibility standards, including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
            <li>Accessibility standards for Information and Communication Technology</li>
            <li>Best practices for inclusive user experience</li>
          </ul>
        </div>
      )
    },
    {
      title: "Accessibility Features",
      icon: <Eye className="h-6 w-6 text-primary" />,
      content: (
        <div>
          <p>Our website includes the following accessibility features:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Keyboard navigation for all interactive elements</li>
            <li>Alternative text for images</li>
            <li>Semantic structure enabling screen reader navigation</li>
            <li>Sufficient contrast between text and background</li>
            <li>Text resizing without loss of functionality</li>
            <li>Accessible controls with appropriate labels</li>
          </ul>
        </div>
      )
    },
    {
      title: "Technical Assistance",
      icon: <Headphones className="h-6 w-6 text-primary" />,
      content: (
        <div>
          <p>If you encounter difficulties using our website, or if you need assistance accessing specific content, please don't hesitate to contact us:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>By phone: +1 (514) 123-4567</li>
            <li>By email: accessibility@recruitmentplus.ca</li>
          </ul>
          <p className="mt-2">Our team is available to help you and to provide alternative formats of content if necessary.</p>
        </div>
      )
    },
    {
      title: "Continuous Improvement",
      icon: <Cpu className="h-6 w-6 text-primary" />,
      content: (
        <div>
          <p>We are committed to a process of continuous improvement in the accessibility of our website:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>We conduct regular accessibility audits</li>
            <li>We train our team on accessibility best practices</li>
            <li>We integrate accessibility from the design phase of new features</li>
            <li>We solicit feedback from users with accessibility needs</li>
          </ul>
          <p className="mt-2">Your feedback is valuable in helping us improve. Please feel free to share your suggestions with us.</p>
        </div>
      )
    }
  ]

  const accessibilityCommitment = locale === 'fr' ? {
    title: "Notre Engagement pour l'Accessibilité",
    description: "Chez Recrutement Plus, nous sommes engagés à garantir l'accessibilité numérique pour les personnes en situation de handicap. Nous nous efforçons d'améliorer continuellement l'expérience utilisateur pour tous et d'appliquer les normes d'accessibilité pertinentes."
  } : {
    title: "Our Commitment to Accessibility",
    description: "At Recruitment Plus, we are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards."
  }

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
                {locale === 'fr' ? 'Déclaration d\'Accessibilité' : 'Accessibility Declaration'}
              </span>
            </h1>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {locale === 'fr' 
                ? 'Notre engagement pour un accès égal aux opportunités professionnelles pour tous.' 
                : 'Our commitment to equal access to professional opportunities for everyone.'}
            </p>
            <div className="text-sm text-muted-foreground text-center">
              {locale === 'fr' ? 'Dernière mise à jour: 4 juin 2025' : 'Last updated: June 4, 2025'}
            </div>
          </div>
        </section>

        {/* Main content with visual elements */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Introduction card */}
              <div className="bg-background/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-8 mb-12 text-center">
                <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Accessibility className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">{accessibilityCommitment.title}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {accessibilityCommitment.description}
                </p>
              </div>
              
              {/* Four visual cards with icons for each section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {accessibilitySections.map((section, index) => (
                  <div 
                    key={index}
                    className="bg-background/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-6 
                              transition-transform duration-300 hover:scale-105"
                  >
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    <div className="prose prose-sm max-w-none">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Contact card with highlighting */}
              <div className="bg-primary/10 backdrop-blur-md rounded-xl border border-primary/20 shadow-lg p-8 text-center">
                <h2 className="text-xl font-bold mb-4">
                  {locale === 'fr' ? 'Contactez-nous à propos de l\'accessibilité' : 'Contact Us About Accessibility'}
                </h2>
                <p className="mb-6">
                  {locale === 'fr' 
                    ? 'Nous accueillons vos commentaires sur l\'accessibilité du site web de Recrutement Plus:' 
                    : 'We welcome your feedback on the accessibility of the Recruitment Plus website:'}
                </p>
                <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{locale === 'fr' ? 'accessibilite@recruitmentplus.ca' : 'accessibility@recruitmentplus.ca'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional resources section */}
        <section className="py-12 bg-gradient-to-t from-muted/50 to-transparent">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">
                {locale === 'fr' ? 'Ressources d\'accessibilité' : 'Accessibility Resources'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a 
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-background/60 backdrop-blur-md rounded-xl border border-white/10 p-5 text-center hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold mb-2">WCAG 2.1</h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'fr' 
                      ? 'Règles pour l\'accessibilité des contenus Web'
                      : 'Web Content Accessibility Guidelines'}
                  </p>
                </a>
                
                <a 
                  href="https://www.w3.org/WAI/fundamentals/accessibility-intro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-background/60 backdrop-blur-md rounded-xl border border-white/10 p-5 text-center hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold mb-2">W3C WAI</h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'fr' 
                      ? 'Initiative pour l\'accessibilité du Web'
                      : 'Web Accessibility Initiative'}
                  </p>
                </a>
                
                <a 
                  href="https://accessibilite.public.lu/fr/raam1/referentiel-technique.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-background/60 backdrop-blur-md rounded-xl border border-white/10 p-5 text-center hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold mb-2">
                    {locale === 'fr' ? 'RGAA' : 'AODA'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'fr' 
                      ? 'Référentiel Général d\'Amélioration de l\'Accessibilité'
                      : 'Accessibility for Ontarians with Disabilities Act'}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}