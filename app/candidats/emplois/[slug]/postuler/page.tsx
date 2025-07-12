"use client"

import { useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { 
  ChevronLeft, Upload, FileText, X, CheckCircle2, 
  ArrowLeft, ArrowRight, Loader2, Mail, User, Phone
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import jobListings from "../../job-listings"

export default function JobApplicationPage() {
  const { locale } = useLanguage()
  const t = locale === 'fr' ? frTranslations : enTranslations
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  
  // Get slug from params directly
  const slug = params.slug
  
  // Get job details from the job listings
  // Use type assertion to fix TypeScript error
  const job = jobListings[locale]?.[slug as keyof typeof jobListings[typeof locale]]
  
  // State for multi-step form
  const [currentStep, setCurrentStep] = useState<'upload' | 'personal' | 'confirmation'>('upload')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
  const [coverLetterText, setCoverLetterText] = useState('')
  const [coverLetterType, setCoverLetterType] = useState<'upload' | 'text'>('upload')
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // File upload handlers
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetterFile(e.target.files[0])
    }
  }

  const clearResumeFile = () => setResumeFile(null)
  const clearCoverLetterFile = () => setCoverLetterFile(null)

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep === 'upload') {
      setCurrentStep('personal')
      window.scrollTo(0, 0)
    } else if (currentStep === 'personal') {
      setIsSubmitting(true)
      
      // Simulate API call with timeout
      setTimeout(() => {
        setIsSubmitting(false)
        setCurrentStep('confirmation')
        window.scrollTo(0, 0)
      }, 1500)
    }
  }

  // Personal info form change handler
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({ ...prev, [name]: value }))
  }

  // Check if current step is complete
  const isCurrentStepComplete = () => {
    if (currentStep === 'upload') {
      // Resume is required, cover letter can be either uploaded or typed
      return !!resumeFile && (coverLetterType === 'upload' ? !!coverLetterFile : !!coverLetterText)
    } else if (currentStep === 'personal') {
      // All personal info fields are required
      return Object.values(personalInfo).every(value => !!value)
    }
    return true
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
      <main className="flex-1 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container py-12">
          <Link href={`/candidats/emplois/${slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ChevronLeft className="h-4 w-4" />
            {t.back_to_job_details}
          </Link>
          
          <div className="max-w-3xl mx-auto">
            <Card className="bg-background/80 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle>{t.apply_for_job}</CardTitle>
                <CardDescription>
                  {job.title} - {job.company}
                </CardDescription>
                
                {/* Steps indicator */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'upload' || currentStep === 'personal' || currentStep === 'confirmation' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {currentStep === 'upload' ? (
                        <span>1</span>
                      ) : (
                        <CheckCircle2 className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 h-1 mx-2 bg-gradient-to-r from-primary to-primary-foreground/20"></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'personal' || currentStep === 'confirmation' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {currentStep === 'personal' ? (
                        <span>2</span>
                      ) : currentStep === 'confirmation' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span>2</span>
                      )}
                    </div>
                    <div className="flex-1 h-1 mx-2 bg-gradient-to-r from-primary-foreground/20 to-primary"></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'confirmation' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <span>3</span>
                    </div>
                  </div>
                </div>
                
                {/* Step titles */}
                <div className="flex items-center justify-between text-xs mt-2">
                  <div className="w-8 text-center">{t.step1_short}</div>
                  <div className="flex-1"></div>
                  <div className="w-8 text-center">{t.step2_short}</div>
                  <div className="flex-1"></div>
                  <div className="w-8 text-center">{t.step3_short}</div>
                </div>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent>
                  {/* Step 1: Upload Resume and Cover Letter */}
                  {currentStep === 'upload' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">{t.step1_title}</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          {t.step1_description}
                        </p>
                      </div>
                      
                      {/* Resume Upload */}
                      <div className="space-y-2">
                        <Label htmlFor="resume" className="text-base flex items-center">
                          {t.resume} <span className="text-destructive ml-1">*</span>
                        </Label>
                        <div className="border border-dashed border-primary/40 rounded-lg p-4 bg-background/50">
                          {!resumeFile ? (
                            <div className="text-center py-8">
                              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground mb-3">{t.drop_resume}</p>
                              <Label htmlFor="resume-upload" className="cursor-pointer">
                                <Button type="button" variant="outline" className="relative">
                                  {t.browse_files}
                                  <Input 
                                    id="resume-upload" 
                                    type="file" 
                                    accept=".pdf,.doc,.docx" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    onChange={handleResumeUpload}
                                  />
                                </Button>
                              </Label>
                              <p className="text-xs text-muted-foreground mt-2">
                                {t.supported_formats}: PDF, DOC, DOCX
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between p-2">
                              <div className="flex items-center">
                                <FileText className="h-6 w-6 text-primary mr-2" />
                                <div>
                                  <p className="text-sm font-medium">{resumeFile.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={clearResumeFile}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Cover Letter */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-base flex items-center">
                            {t.cover_letter} <span className="text-destructive ml-1">*</span>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t.cover_letter_description}
                          </p>
                        </div>
                        
                        <Tabs defaultValue="upload" onValueChange={(value) => setCoverLetterType(value as 'upload' | 'text')}>
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="upload">{t.upload_file}</TabsTrigger>
                            <TabsTrigger value="text">{t.write_text}</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="upload" className="space-y-4 mt-4">
                            <div className="border border-dashed border-primary/40 rounded-lg p-4 bg-background/50">
                              {!coverLetterFile ? (
                                <div className="text-center py-6">
                                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-sm text-muted-foreground mb-3">{t.drop_cover_letter}</p>
                                  <Label htmlFor="cover-letter-upload" className="cursor-pointer">
                                    <Button type="button" variant="outline" className="relative">
                                      {t.browse_files}
                                      <Input 
                                        id="cover-letter-upload" 
                                        type="file" 
                                        accept=".pdf,.doc,.docx,.txt" 
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                        onChange={handleCoverLetterUpload}
                                      />
                                    </Button>
                                  </Label>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    {t.supported_formats}: PDF, DOC, DOCX, TXT
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between p-2">
                                  <div className="flex items-center">
                                    <FileText className="h-6 w-6 text-primary mr-2" />
                                    <div>
                                      <p className="text-sm font-medium">{coverLetterFile.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {(coverLetterFile.size / 1024 / 1024).toFixed(2)} MB
                                      </p>
                                    </div>
                                  </div>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={clearCoverLetterFile}
                                    className="text-muted-foreground hover:text-destructive"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="text" className="space-y-4 mt-4">
                            <Textarea 
                              placeholder={t.cover_letter_placeholder} 
                              value={coverLetterText}
                              onChange={(e) => setCoverLetterText(e.target.value)}
                              className="min-h-40 bg-background/50"
                            />
                            <p className="text-xs text-muted-foreground">
                              {t.cover_letter_hint}
                            </p>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Personal Information */}
                  {currentStep === 'personal' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">{t.step2_title}</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          {t.step2_description}
                        </p>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="flex items-center">
                            {t.first_name} <span className="text-destructive ml-1">*</span>
                          </Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            value={personalInfo.firstName}
                            onChange={handlePersonalInfoChange}
                            placeholder={t.first_name_placeholder}
                            className="bg-background/50"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="flex items-center">
                            {t.last_name} <span className="text-destructive ml-1">*</span>
                          </Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            value={personalInfo.lastName}
                            onChange={handlePersonalInfoChange}
                            placeholder={t.last_name_placeholder}
                            className="bg-background/50"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          {t.email} <span className="text-destructive ml-1">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            placeholder={t.email_placeholder}
                            className="pl-10 bg-background/50"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          {t.phone} <span className="text-destructive ml-1">*</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            id="phone"
                            name="phone"
                            type="tel"
                            value={personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                            placeholder={t.phone_placeholder}
                            className="pl-10 bg-background/50"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{t.application_summary}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {t.resume}: {resumeFile?.name}
                              <br />
                              {t.cover_letter}: {coverLetterType === 'upload' 
                                ? coverLetterFile?.name 
                                : `${coverLetterText.substring(0, 30)}${coverLetterText.length > 30 ? '...' : ''}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Confirmation */}
                  {currentStep === 'confirmation' && (
                    <div className="text-center py-8">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">
                        {t.application_submitted}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        {t.confirmation_message}
                      </p>
                      
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-md mx-auto mb-8">
                        <h4 className="font-medium mb-4">{t.application_details}</h4>
                        <div className="text-sm space-y-2 text-left">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t.job_title}:</span>
                            <span className="font-medium">{job.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t.company}:</span>
                            <span className="font-medium">{job.company}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t.applicant}:</span>
                            <span className="font-medium">{personalInfo.firstName} {personalInfo.lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t.email}:</span>
                            <span className="font-medium">{personalInfo.email}</span>
                          </div>
                          <Separator className="my-3" />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t.reference_number}:</span>
                            <span className="font-medium">APP-{job.id}-{Date.now().toString().substring(5)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <Link href={`/candidats/emplois/${slug}`}>
                          <Button variant="outline" className="w-full">
                            {t.back_to_job_details}
                          </Button>
                        </Link>
                        <Link href="/candidats/emplois">
                          <Button className="w-full">
                            {t.browse_more_jobs}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                {(currentStep === 'upload' || currentStep === 'personal') && (
                  <CardFooter className="flex justify-between border-t pt-6">
                    {currentStep === 'upload' ? (
                      <Link href={`/candidats/emplois/${slug}`}>
                        <Button type="button" variant="ghost">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          {t.back}
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => {
                          setCurrentStep('upload')
                          window.scrollTo(0, 0)
                        }}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {t.previous}
                      </Button>
                    )}
                    
                    <Button 
                      type="submit" 
                      disabled={!isCurrentStepComplete() || isSubmitting}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {t.submitting}
                        </>
                      ) : (
                        <>
                          {currentStep === 'upload' ? t.next : t.submit}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                )}
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// Translations
const enTranslations = {
  back_to_jobs: "Back to jobs",
  back_to_job_details: "Back to job details",
  job_not_found: "Job Not Found",
  job_not_found_description: "We couldn't find the job you're looking for.",
  apply_for_job: "Apply for this position",
  step1_short: "Resume",
  step2_short: "Info",
  step3_short: "Submit",
  step1_title: "Upload Your Documents",
  step1_description: "Please upload your resume and cover letter to apply for this position.",
  step2_title: "Personal Information",
  step2_description: "Please provide your contact information so we can get in touch with you.",
  resume: "Resume",
  drop_resume: "Drag and drop your resume here or click to browse",
  cover_letter: "Cover Letter",
  cover_letter_description: "You can either upload a file or write your cover letter directly.",
  drop_cover_letter: "Drag and drop your cover letter here or click to browse",
  cover_letter_placeholder: "Write your cover letter here...",
  cover_letter_hint: "Explain why you're interested in this position and why you're a good fit for the role.",
  browse_files: "Browse Files",
  supported_formats: "Supported formats",
  upload_file: "Upload File",
  write_text: "Write Text",
  first_name: "First Name",
  first_name_placeholder: "Enter your first name",
  last_name: "Last Name",
  last_name_placeholder: "Enter your last name",
  email: "Email",
  email_placeholder: "Enter your email address",
  phone: "Phone",
  phone_placeholder: "Enter your phone number",
  application_summary: "Application Summary",
  back: "Back",
  previous: "Previous",
  next: "Next",
  submit: "Submit Application",
  submitting: "Submitting...",
  application_submitted: "Application Submitted!",
  confirmation_message: "Thank you for applying. We have sent a confirmation email to your address. Please check your inbox (and spam folder) to verify your application.",
  application_details: "Application Details",
  job_title: "Job Title",
  company: "Company",
  applicant: "Applicant",
  reference_number: "Reference Number",
  browse_more_jobs: "Browse More Jobs"
};

const frTranslations = {
  back_to_jobs: "Retour aux offres",
  back_to_job_details: "Retour aux détails de l'offre",
  job_not_found: "Offre Non Trouvée",
  job_not_found_description: "Nous n'avons pas pu trouver l'offre d'emploi que vous cherchez.",
  apply_for_job: "Postuler à ce poste",
  step1_short: "CV",
  step2_short: "Info",
  step3_short: "Envoi",
  step1_title: "Téléchargez Vos Documents",
  step1_description: "Veuillez télécharger votre CV et votre lettre de motivation pour postuler à ce poste.",
  step2_title: "Informations Personnelles",
  step2_description: "Veuillez fournir vos coordonnées afin que nous puissions vous contacter.",
  resume: "CV",
  drop_resume: "Glissez et déposez votre CV ici ou cliquez pour parcourir",
  cover_letter: "Lettre de Motivation",
  cover_letter_description: "Vous pouvez soit télécharger un fichier, soit rédiger directement votre lettre de motivation.",
  drop_cover_letter: "Glissez et déposez votre lettre de motivation ici ou cliquez pour parcourir",
  cover_letter_placeholder: "Rédigez votre lettre de motivation ici...",
  cover_letter_hint: "Expliquez pourquoi vous êtes intéressé par ce poste et pourquoi vous êtes un bon candidat pour ce rôle.",
  browse_files: "Parcourir les Fichiers",
  supported_formats: "Formats pris en charge",
  upload_file: "Télécharger un Fichier",
  write_text: "Rédiger un Texte",
  first_name: "Prénom",
  first_name_placeholder: "Entrez votre prénom",
  last_name: "Nom",
  last_name_placeholder: "Entrez votre nom",
  email: "Email",
  email_placeholder: "Entrez votre adresse email",
  phone: "Téléphone",
  phone_placeholder: "Entrez votre numéro de téléphone",
  application_summary: "Résumé de la Candidature",
  back: "Retour",
  previous: "Précédent",
  next: "Suivant",
  submit: "Soumettre la Candidature",
  submitting: "Soumission en cours...",
  application_submitted: "Candidature Soumise !",
  confirmation_message: "Merci pour votre candidature. Nous avons envoyé un email de confirmation à votre adresse. Veuillez vérifier votre boîte de réception (et dossier spam) pour valider votre candidature.",
  application_details: "Détails de la Candidature",
  job_title: "Titre du Poste",
  company: "Entreprise",
  applicant: "Candidat",
  reference_number: "Numéro de Référence",
  browse_more_jobs: "Parcourir Plus d'Offres"
};