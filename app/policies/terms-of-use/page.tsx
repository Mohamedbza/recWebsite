"use client"

import { FileText } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"

export default function TermsOfUsePage() {
  const { t, locale } = useLanguage()
  
  // Terms of use sections
  const termsSections = locale === 'fr' ? [
    {
      title: "1. Acceptation des Conditions",
      content: (
        <div>
          <p>En accédant ou en utilisant le site web de Recrutement Plus Inc. (ci-après "le Site"), vous acceptez d'être lié par les présentes Conditions d'Utilisation, toutes les lois et réglementations applicables, et vous acceptez que vous êtes responsable du respect des lois locales applicables.</p>
          <p className="mt-2">Si vous n'acceptez pas l'une de ces conditions, vous êtes interdit d'utiliser ou d'accéder à ce site. Les contenus présents sur ce site sont protégés par les lois applicables en matière de droits d'auteur et de marques.</p>
        </div>
      )
    },
    {
      title: "2. Utilisation de la Licence",
      content: (
        <div>
          <p>La permission est accordée pour télécharger temporairement une copie des documents (informations ou logiciels) sur le Site de Recrutement Plus uniquement pour une consultation transitoire personnelle et non commerciale.</p>
          <p className="mt-2">Cette licence ne constitue pas un transfert de titre et, sous cette licence, vous ne pouvez pas:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Modifier ou copier les documents</li>
            <li>Utiliser les documents à des fins commerciales ou pour une présentation publique</li>
            <li>Tenter de décompiler ou de désossiérer tout logiciel contenu sur le Site</li>
            <li>Supprimer tout droit d'auteur ou autres notations de propriété des documents</li>
            <li>Transférer les documents à une autre personne ou "reproduire" les documents sur un autre serveur</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Clause de Non-Responsabilité",
      content: (
        <div>
          <p>Les documents sur le Site sont fournis "tels quels". Recrutement Plus ne donne aucune garantie, expresse ou implicite, et décline et annule par la présente toutes les autres garanties, y compris, sans limitation, les garanties ou conditions implicites de qualité marchande, d'adéquation à un usage particulier, ou de non-violation de la propriété intellectuelle ou autre violation des droits.</p>
          <p className="mt-2">En outre, Recrutement Plus ne garantit ni ne fait aucune représentation concernant l'exactitude, les résultats probables, ou la fiabilité de l'utilisation des documents sur son Site ou autrement liés à ces documents ou sur tout site lié à ce Site.</p>
        </div>
      )
    },
    {
      title: "4. Limitations",
      content: (
        <div>
          <p>En aucun cas, Recrutement Plus ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation ou de l'impossibilité d'utiliser les matériaux sur le Site, même si Recrutement Plus ou un représentant autorisé de Recrutement Plus a été notifié oralement ou par écrit de la possibilité de tels dommages.</p>
          <p className="mt-2">Étant donné que certaines juridictions n'autorisent pas les limitations sur les garanties implicites, ou les limitations de responsabilité pour les dommages consécutifs ou accessoires, ces limitations peuvent ne pas s'appliquer à vous.</p>
        </div>
      )
    },
    {
      title: "5. Exactitude des Documents",
      content: (
        <div>
          <p>Les documents apparaissant sur le Site pourraient inclure des erreurs techniques, typographiques ou photographiques. Recrutement Plus ne garantit pas que les documents de son Site sont exacts, complets ou à jour.</p>
          <p className="mt-2">Recrutement Plus peut apporter des modifications aux documents contenus sur son Site à tout moment sans préavis. Recrutement Plus ne s'engage toutefois pas à mettre à jour les documents.</p>
        </div>
      )
    },
    {
      title: "6. Liens",
      content: (
        <div>
          <p>Recrutement Plus n'a pas examiné tous les sites liés à son Site et n'est pas responsable du contenu de ces sites liés. L'inclusion de tout lien n'implique pas l'approbation par Recrutement Plus du site. L'utilisation de tout site web lié est aux risques et périls de l'utilisateur.</p>
        </div>
      )
    },
    {
      title: "7. Modifications des Conditions d'Utilisation",
      content: (
        <div>
          <p>Recrutement Plus peut réviser ces Conditions d'Utilisation de son Site à tout moment sans préavis. En utilisant ce Site, vous acceptez d'être lié par la version alors en vigueur de ces Conditions d'Utilisation.</p>
        </div>
      )
    },
    {
      title: "8. Confidentialité",
      content: (
        <div>
          <p>Veuillez consulter notre Politique de Confidentialité pour comprendre nos pratiques.</p>
        </div>
      )
    },
    {
      title: "9. Loi Applicable",
      content: (
        <div>
          <p>Toute réclamation relative au Site sera régie par les lois de la province du Québec et les lois du Canada applicables, sans égard aux dispositions relatives aux conflits de lois.</p>
        </div>
      )
    },
    {
      title: "10. Comptes Utilisateurs",
      content: (
        <div>
          <p>Lorsque vous créez un compte sur notre Site, vous devez fournir des informations exactes, complètes et à jour à tout moment. Le non-respect de cette obligation constitue une violation des Conditions, ce qui peut entraîner la résiliation immédiate de votre compte sur notre Site.</p>
          <p className="mt-2">Vous êtes responsable de la protection du mot de passe que vous utilisez pour accéder au Site et de toutes les activités ou actions sous votre mot de passe. Vous acceptez de ne pas divulguer votre mot de passe à un tiers. Vous devez nous avertir immédiatement de toute violation de la sécurité ou utilisation non autorisée de votre compte.</p>
        </div>
      )
    },
    {
      title: "11. Résiliation",
      content: (
        <div>
          <p>Nous pouvons résilier ou suspendre votre compte immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous violez les Conditions.</p>
          <p className="mt-2">Lors de la résiliation, votre droit d'utiliser le Site cessera immédiatement. Si vous souhaitez résilier votre compte, vous pouvez simplement cesser d'utiliser le Site.</p>
        </div>
      )
    },
    {
      title: "12. Coordonnées",
      content: (
        <div>
          <p>Pour toute question concernant ces Conditions d'Utilisation, veuillez nous contacter à:</p>
          <p className="mt-2">Recrutement Plus Inc.<br />
          123 Rue Principale<br />
          Montréal, QC H3Z 2Y7<br />
          Canada<br />
          Email: conditions@recruitmentplus.ca<br />
          Téléphone: +1 (514) 123-4567</p>
        </div>
      )
    }
  ] : [
    {
      title: "1. Acceptance of Terms",
      content: (
        <div>
          <p>By accessing or using the Recruitment Plus Inc. website (hereinafter "the Site"), you agree to be bound by these Terms of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          <p className="mt-2">If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this site are protected by applicable copyright and trademark law.</p>
        </div>
      )
    },
    {
      title: "2. License Usage",
      content: (
        <div>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Recruitment Plus's Site for personal, non-commercial transitory viewing only.</p>
          <p className="mt-2">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the Site</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Disclaimer",
      content: (
        <div>
          <p>The materials on the Site are provided "as is". Recruitment Plus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          <p className="mt-2">Further, Recruitment Plus does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Site or otherwise relating to such materials or on any sites linked to this Site.</p>
        </div>
      )
    },
    {
      title: "4. Limitations",
      content: (
        <div>
          <p>In no event shall Recruitment Plus or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Site, even if Recruitment Plus or a Recruitment Plus authorized representative has been notified orally or in writing of the possibility of such damage.</p>
          <p className="mt-2">Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
        </div>
      )
    },
    {
      title: "5. Accuracy of Materials",
      content: (
        <div>
          <p>The materials appearing on the Site could include technical, typographical, or photographic errors. Recruitment Plus does not warrant that any of the materials on its Site are accurate, complete, or current.</p>
          <p className="mt-2">Recruitment Plus may make changes to the materials contained on its Site at any time without notice. However, Recruitment Plus does not make any commitment to update the materials.</p>
        </div>
      )
    },
    {
      title: "6. Links",
      content: (
        <div>
          <p>Recruitment Plus has not reviewed all of the sites linked to its Site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Recruitment Plus of the site. Use of any such linked website is at the user's own risk.</p>
        </div>
      )
    },
    {
      title: "7. Modifications to Terms of Use",
      content: (
        <div>
          <p>Recruitment Plus may revise these Terms of Use for its Site at any time without notice. By using this Site, you are agreeing to be bound by the then current version of these Terms of Use.</p>
        </div>
      )
    },
    {
      title: "8. Privacy",
      content: (
        <div>
          <p>Please review our Privacy Policy to understand our practices.</p>
        </div>
      )
    },
    {
      title: "9. Governing Law",
      content: (
        <div>
          <p>Any claim relating to the Site shall be governed by the laws of the Province of Quebec and the applicable laws of Canada, without regard to its conflict of law provisions.</p>
        </div>
      )
    },
    {
      title: "10. User Accounts",
      content: (
        <div>
          <p>When you create an account on our Site, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Site.</p>
          <p className="mt-2">You are responsible for safeguarding the password that you use to access the Site and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
        </div>
      )
    },
    {
      title: "11. Termination",
      content: (
        <div>
          <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          <p className="mt-2">Upon termination, your right to use the Site will immediately cease. If you wish to terminate your account, you may simply discontinue using the Site.</p>
        </div>
      )
    },
    {
      title: "12. Contact Information",
      content: (
        <div>
          <p>For any questions about these Terms of Use, please contact us at:</p>
          <p className="mt-2">Recruitment Plus Inc.<br />
          123 Main Street<br />
          Montreal, QC H3Z 2Y7<br />
          Canada<br />
          Email: terms@recruitmentplus.ca<br />
          Phone: +1 (514) 123-4567</p>
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
                {locale === 'fr' ? 'Conditions d\'Utilisation' : 'Terms of Use'}
              </span>
            </h1>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {locale === 'fr' 
                ? 'Veuillez lire attentivement ces conditions avant d\'utiliser notre site web et nos services.' 
                : 'Please read these terms carefully before using our website and services.'}
            </p>
            <div className="text-sm text-muted-foreground text-center">
              {locale === 'fr' ? 'Dernière mise à jour: 4 juin 2025' : 'Last updated: June 4, 2025'}
            </div>
          </div>
        </section>

        {/* Terms content with accordions */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="bg-background/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {locale === 'fr' ? 'Conditions d\'Utilisation' : 'Terms of Use'}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {locale === 'fr' 
                    ? 'Veuillez lire attentivement ces conditions avant d\'utiliser notre site web et nos services. En accédant ou en utilisant notre site, vous acceptez d\'être lié par ces conditions.' 
                    : 'Please read these terms carefully before using our website and services. By accessing or using our site, you agree to be bound by these terms.'}
                </p>
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mt-6">
                  {locale === 'fr' ? 'Dernière mise à jour: 4 juin 2025' : 'Last updated: June 4, 2025'}
                </div>
              </div>
              
              {/* Terms sections as accordions */}
              <Accordion type="single" collapsible className="space-y-4">
                {termsSections.map((section, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`section-${index}`}
                    className="bg-background/80 backdrop-blur-md rounded-xl border border-white/20 shadow-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-primary/5">
                      <h3 className="text-lg font-medium text-left">{section.title}</h3>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="prose prose-sm max-w-none pt-2">
                        {section.content}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {/* Agreement acknowledgment */}
              <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <p className="font-medium text-center">
                  {locale === 'fr' 
                    ? 'En utilisant notre site web, vous confirmez que vous avez lu, compris et accepté ces Conditions d\'Utilisation.' 
                    : 'By using our website, you confirm that you have read, understood, and agree to these Terms of Use.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}