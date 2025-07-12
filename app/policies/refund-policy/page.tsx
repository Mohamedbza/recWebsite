"use client"

import { Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function RefundPolicyPage() {
  const { t, locale } = useLanguage()
  
  // Policy sections for French and English
  const policySections = locale === 'fr' ? [
    {
      title: "Introduction",
      content: (
        <div>
          <p>Cette politique décrit les conditions dans lesquelles Recrutement Plus Inc. peut rembourser les frais administratifs payés par les clients pour nos services de recrutement.</p>
          <p className="mt-2">Nous nous efforçons de maintenir une politique de remboursement équitable et transparente qui respecte à la fois les intérêts de nos clients et la viabilité de notre entreprise.</p>
        </div>
      )
    },
    {
      title: "Frais Remboursables",
      content: (
        <div>
          <p>Les frais administratifs suivants peuvent être éligibles à un remboursement sous certaines conditions:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Frais de traitement de dossier</li>
            <li>Frais d'évaluation des compétences</li>
            <li>Frais de préparation de documentation</li>
            <li>Frais d'accompagnement à l'intégration</li>
          </ul>
        </div>
      )
    },
    {
      title: "Conditions de Remboursement",
      content: (
        <div>
          <p>Un remboursement peut être accordé dans les circonstances suivantes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Annulation des services par Recrutement Plus Inc. avant le début du processus</li>
            <li>Erreur administrative ayant entraîné une double facturation</li>
            <li>Services non fournis pour des raisons indépendantes de la volonté du client</li>
            <li>Autre circonstance exceptionnelle évaluée au cas par cas par notre équipe de direction</li>
          </ul>
        </div>
      )
    },
    {
      title: "Délais de Remboursement",
      content: (
        <div>
          <p>Les demandes de remboursement doivent être soumises dans les délais suivants:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Dans les 30 jours suivant le paiement pour les services non commencés</li>
            <li>Dans les 15 jours suivant l'identification d'une erreur administrative</li>
            <li>Dans les 7 jours suivant la notification officielle de l'annulation du service par Recrutement Plus Inc.</li>
          </ul>
        </div>
      )
    },
    {
      title: "Procédure de Demande",
      content: (
        <div>
          <p>Pour demander un remboursement, veuillez suivre ces étapes:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>Envoyez un email à remboursements@recruitmentplus.ca avec le sujet "Demande de Remboursement"</li>
            <li>Incluez votre nom complet, la date du paiement et le numéro de référence de la transaction</li>
            <li>Expliquez clairement la raison de votre demande de remboursement</li>
            <li>Joignez tout document pertinent (reçu, correspondance, etc.)</li>
          </ol>
        </div>
      )
    },
    {
      title: "Traitement des Remboursements",
      content: (
        <div>
          <p>Notre processus de traitement des remboursements:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Nous accuserons réception de votre demande dans un délai de 3 jours ouvrables</li>
            <li>Une décision sera communiquée dans un délai de 10 jours ouvrables</li>
            <li>Si le remboursement est approuvé, le montant sera crédité sur le mode de paiement original dans un délai de 15 jours ouvrables</li>
          </ul>
        </div>
      )
    },
    {
      title: "Cas de Non-Remboursement",
      content: (
        <div>
          <p>Les frais administratifs ne sont généralement pas remboursables dans les situations suivantes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Services déjà fournis, même partiellement</li>
            <li>Annulation par le client après le début du processus de recrutement</li>
            <li>Non-respect par le client des conditions préalablement établies</li>
            <li>Informations inexactes ou incomplètes fournies par le client</li>
            <li>Expiration des délais de demande de remboursement</li>
          </ul>
        </div>
      )
    }
  ] : [
    {
      title: "Introduction",
      content: (
        <div>
          <p>This policy outlines the conditions under which Recruitment Plus Inc. may refund administrative fees paid by clients for our recruitment services.</p>
          <p className="mt-2">We strive to maintain a fair and transparent refund policy that respects both our clients' interests and our business viability.</p>
        </div>
      )
    },
    {
      title: "Refundable Fees",
      content: (
        <div>
          <p>The following administrative fees may be eligible for a refund under certain conditions:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>File processing fees</li>
            <li>Skills assessment fees</li>
            <li>Documentation preparation fees</li>
            <li>Integration support fees</li>
          </ul>
        </div>
      )
    },
    {
      title: "Refund Conditions",
      content: (
        <div>
          <p>A refund may be granted under the following circumstances:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Cancellation of services by Recruitment Plus Inc. before the process begins</li>
            <li>Administrative error resulting in double billing</li>
            <li>Services not provided for reasons beyond the client's control</li>
            <li>Other exceptional circumstance evaluated case by case by our management team</li>
          </ul>
        </div>
      )
    },
    {
      title: "Refund Timeframes",
      content: (
        <div>
          <p>Refund requests must be submitted within the following timeframes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Within 30 days of payment for services not yet started</li>
            <li>Within 15 days of identifying an administrative error</li>
            <li>Within 7 days of official notification of service cancellation by Recruitment Plus Inc.</li>
          </ul>
        </div>
      )
    },
    {
      title: "Request Procedure",
      content: (
        <div>
          <p>To request a refund, please follow these steps:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>Send an email to refunds@recruitmentplus.ca with the subject "Refund Request"</li>
            <li>Include your full name, payment date, and transaction reference number</li>
            <li>Clearly explain the reason for your refund request</li>
            <li>Attach any relevant documentation (receipt, correspondence, etc.)</li>
          </ol>
        </div>
      )
    },
    {
      title: "Refund Processing",
      content: (
        <div>
          <p>Our refund processing procedure:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>We will acknowledge receipt of your request within 3 business days</li>
            <li>A decision will be communicated within 10 business days</li>
            <li>If the refund is approved, the amount will be credited to the original payment method within 15 business days</li>
          </ul>
        </div>
      )
    },
    {
      title: "Non-Refundable Cases",
      content: (
        <div>
          <p>Administrative fees are generally not refundable in the following situations:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Services already provided, even partially</li>
            <li>Cancellation by the client after the recruitment process has begun</li>
            <li>Client's failure to comply with previously established conditions</li>
            <li>Inaccurate or incomplete information provided by the client</li>
            <li>Expiration of refund request deadlines</li>
          </ul>
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
                {locale === 'fr' ? 'Politique de Remboursement des Frais Administratifs' : 'Administrative Fee Refund Policy'}
              </span>
            </h1>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {locale === 'fr' 
                ? 'Nos politiques concernant le remboursement des frais administratifs pour nos services de recrutement.' 
                : 'Our policies regarding reimbursement of administrative fees for our recruitment services.'}
            </p>
            <div className="text-sm text-muted-foreground text-center">
              {locale === 'fr' ? 'Dernière mise à jour: 4 juin 2025' : 'Last updated: June 4, 2025'}
            </div>
          </div>
        </section>

        {/* Content section with card styling for each policy section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Map through policy sections */}
              {policySections.map((section, index) => (
                <div key={index} className="bg-background/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                  <div className="prose prose-sm max-w-none">
                    {section.content}
                  </div>
                </div>
              ))}
              
              {/* Contact information card with special styling */}
              <div className="bg-primary/10 backdrop-blur-md rounded-xl border border-primary/20 shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                  {locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                </h2>
                <p>
                  {locale === 'fr' 
                    ? 'Pour toute question concernant notre politique de remboursement, veuillez nous contacter:' 
                    : 'For questions about our refund policy, please contact us:'}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-2" />
                    <span>{locale === 'fr' ? 'remboursements@recruitmentplus.ca' : 'refunds@recruitmentplus.ca'}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-2" />
                    <span>+1 (514) 123-4567</span>
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