"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { 
  CalendarIcon, Clock, ChevronLeft, Tag, Share2, Bookmark, 
  Briefcase, MapPin, Building2, GraduationCap, DollarSign, 
  CheckCircle2, ArrowRight
} from "lucide-react"
import { format } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import jobListings from "../job-listings"

export default function JobDetailsPage({ params }: { params: { slug: string } }) {
  const { locale } = useLanguage()
  const router = useRouter()
  const dateLocale = locale === 'fr' ? fr : enUS
  const t = locale === 'fr' ? frTranslations : enTranslations
  
  // Use params.slug directly as provided by Next.js
  const slug = params.slug
  
  // Get the appropriate job based on the slug and language
  // Use type assertion to fix TypeScript error
  const job = jobListings[locale]?.[slug as keyof typeof jobListings[typeof locale]]
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'PPP', { locale: dateLocale })
  }

  // Calculate days remaining until application deadline
  const calculateDaysRemaining = (deadlineString: string) => {
    const today = new Date()
    const deadline = new Date(deadlineString)
    const differenceInTime = deadline.getTime() - today.getTime()
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))
    
    if (differenceInDays <= 0) {
      return t.application_closed
    } else if (differenceInDays === 1) {
      return t.one_day_remaining
    } else {
      return t.days_remaining.replace('{count}', differenceInDays.toString())
    }
  }

  // If job not found
  if (!job) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">
              {t.job_not_found}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t.job_not_found_description}
            </p>
            <Link href="/candidats/emplois">
              <Button>
                {t.back_to_jobs}
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
              <Link href="/candidats/emplois" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                <ChevronLeft className="h-4 w-4" />
                {t.back_to_jobs}
              </Link>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-background rounded-lg flex items-center justify-center overflow-hidden">
                  <Image 
                    src={job.companyLogo || "/placeholder-logo.svg"}
                    alt={job.company}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-medium">{job.company}</h2>
                  <div className="text-sm text-muted-foreground">{job.location}</div>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.type}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  {job.department}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {t.posted_on} {formatDate(job.postedDate)}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {job.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white">
                      {t.apply_now}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{t.apply_for_job}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="mb-4">{t.redirect_to_application}</p>
                      <Button 
                        className="w-full" 
                        onClick={() => router.push(`/candidats/emplois/${slug}/postuler`)}
                      >
                        {t.continue_to_application}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="text-sm text-muted-foreground">
                  <Clock className="inline-block h-4 w-4 mr-1" />
                  {calculateDaysRemaining(job.applicationDeadline)}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Job Content */}
        <section className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <div className="max-w-3xl">
              {/* Overview */}
              <div className="prose prose-lg dark:prose-invert mb-8 max-w-none">
                <h2 className="text-2xl font-bold mb-4">{t.job_overview}</h2>
                <p>{job.description.overview}</p>
              </div>
              
              {/* Responsibilities */}
              <div className="prose dark:prose-invert mb-8 max-w-none">
                <h2 className="text-2xl font-bold mb-4">{t.responsibilities}</h2>
                <ul>
                  {job.description.responsibilities.map((item: string, index: number) => (
                    <li key={index} className="mb-2 flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Requirements */}
              <div className="prose dark:prose-invert mb-8 max-w-none">
                <h2 className="text-2xl font-bold mb-4">{t.requirements}</h2>
                <ul>
                  {job.description.requirements.map((item: string, index: number) => (
                    <li key={index} className="mb-2 flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Benefits */}
              <div className="prose dark:prose-invert mb-8 max-w-none">
                <h2 className="text-2xl font-bold mb-4">{t.benefits}</h2>
                <ul>
                  {job.description.benefits.map((item: string, index: number) => (
                    <li key={index} className="mb-2 flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Apply Button (Bottom) */}
              <div className="mt-12">
                <Link href={`/candidats/emplois/${slug}/postuler`}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white">
                    {t.apply_now}
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Job Summary */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">{t.job_summary}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.location}</div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      {job.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.job_type}</div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-primary mr-2" />
                      {job.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.department}</div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-primary mr-2" />
                      {job.department}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.experience}</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      {job.experience}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.education}</div>
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 text-primary mr-2" />
                      {job.education}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.salary}</div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-primary mr-2" />
                      {job.salary}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.deadline}</div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-primary mr-2" />
                      {formatDate(job.applicationDeadline)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link href={`/candidats/emplois/${slug}/postuler`}>
                    <Button className="w-full">
                      {t.apply_now}
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="h-4 w-4 mr-2" />
                    {t.share}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Bookmark className="h-4 w-4 mr-2" />
                    {t.save}
                  </Button>
                </div>
              </div>
              
              {/* Company Info */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">{t.about_company}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center overflow-hidden">
                    <Image 
                      src={job.companyLogo || "/placeholder-logo.svg"}
                      alt={job.company}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{job.company}</h4>
                    <div className="text-sm text-muted-foreground">{job.location}</div>
                  </div>
                </div>
                <p className="text-sm mb-4">
                  {t.company_description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {t.view_company_profile}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              {/* Similar Jobs */}
              <div className="bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">{t.similar_jobs}</h3>
                <div className="space-y-4">
                  {Object.values(jobListings[locale])
                    .filter((j: any) => j.id !== job.id && j.tags.some((tag: string) => job.tags.includes(tag)))
                    .slice(0, 3)
                    .map((similarJob: any) => (
                      <Link href={`/candidats/emplois/${similarJob.slug}`} key={similarJob.id} className="block">
                        <div className="p-3 rounded-lg hover:bg-primary/5 transition-colors">
                          <h4 className="font-medium text-sm">{similarJob.title}</h4>
                          <p className="text-xs text-muted-foreground mb-1">{similarJob.company}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {similarJob.location}
                            <span className="mx-2">•</span>
                            <Briefcase className="h-3 w-3 mr-1" />
                            {similarJob.type}
                          </div>
                        </div>
                      </Link>
                    ))
                  }
                </div>
                <div className="mt-4 text-center">
                  <Link href="/candidats/emplois">
                    <Button variant="link" size="sm" className="text-primary">
                      {t.view_all_jobs}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-gradient-to-br from-primary/20 via-background/80 to-secondary/20 py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t.interested_in_job}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t.application_process_description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={`/candidats/emplois/${slug}/postuler`}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white">
                    {t.apply_now}
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  {t.browse_similar_jobs}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Translations
const enTranslations = {
  back_to_jobs: "Back to jobs",
  job_not_found: "Job Not Found",
  job_not_found_description: "We couldn't find the job you're looking for.",
  apply_now: "Apply Now",
  apply_for_job: "Apply for this job",
  redirect_to_application: "You will be redirected to our application form.",
  continue_to_application: "Continue to Application",
  posted_on: "Posted on",
  application_closed: "Application Closed",
  one_day_remaining: "1 day remaining",
  days_remaining: "{count} days remaining",
  job_overview: "Job Overview",
  responsibilities: "Responsibilities",
  requirements: "Requirements & Qualifications",
  benefits: "Benefits & Perks",
  job_summary: "Job Summary",
  location: "Location",
  job_type: "Job Type",
  department: "Department",
  experience: "Experience",
  education: "Education",
  salary: "Salary",
  deadline: "Application Deadline",
  share: "Share",
  save: "Save",
  about_company: "About the Company",
  company_description: "This is a leading company in its industry with a strong focus on innovation and employee development. The company offers a dynamic work environment and opportunities for career growth.",
  view_company_profile: "View Company Profile",
  similar_jobs: "Similar Jobs",
  view_all_jobs: "View all jobs",
  interested_in_job: "Interested in this job?",
  application_process_description: "Our application process is quick and easy. Submit your application now to be considered for this position.",
  browse_similar_jobs: "Browse Similar Jobs"
};

const frTranslations = {
  back_to_jobs: "Retour aux offres",
  job_not_found: "Offre Non Trouvée",
  job_not_found_description: "Nous n'avons pas pu trouver l'offre d'emploi que vous cherchez.",
  apply_now: "Postuler Maintenant",
  apply_for_job: "Postuler à cette offre",
  redirect_to_application: "Vous serez redirigé vers notre formulaire de candidature.",
  continue_to_application: "Continuer vers la Candidature",
  posted_on: "Publié le",
  application_closed: "Candidature Fermée",
  one_day_remaining: "1 jour restant",
  days_remaining: "{count} jours restants",
  job_overview: "Aperçu du Poste",
  responsibilities: "Responsabilités",
  requirements: "Exigences & Qualifications",
  benefits: "Avantages & Rémunération",
  job_summary: "Résumé du Poste",
  location: "Lieu",
  job_type: "Type de Poste",
  department: "Département",
  experience: "Expérience",
  education: "Formation",
  salary: "Salaire",
  deadline: "Date Limite de Candidature",
  share: "Partager",
  save: "Sauvegarder",
  about_company: "À propos de l'Entreprise",
  company_description: "C'est une entreprise leader dans son secteur avec un fort accent sur l'innovation et le développement des employés. L'entreprise offre un environnement de travail dynamique et des opportunités de croissance professionnelle.",
  view_company_profile: "Voir le Profil de l'Entreprise",
  similar_jobs: "Offres Similaires",
  view_all_jobs: "Voir toutes les offres",
  interested_in_job: "Intéressé par ce poste ?",
  application_process_description: "Notre processus de candidature est rapide et facile. Soumettez votre candidature maintenant pour être considéré pour ce poste.",
  browse_similar_jobs: "Parcourir des Offres Similaires"
};