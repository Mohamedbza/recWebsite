"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { 
  CalendarIcon, User, Briefcase, MapPin, Send, 
  Eye, Save, FileText, PlusCircle, CheckCircle2, 
  Clock, Award, ListChecks, CreditCard, Sparkles, Mail
} from "lucide-react"
import { format } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import { useRouter } from "next/navigation"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useEmployerAuth } from "@/contexts/EmployerAuthContext"

function PublierOffreContent() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const { isEmployerLoggedIn, logout } = useEmployerAuth()
  // Layout already handles redirect; just render nothing if not logged in
  if (!isEmployerLoggedIn) return null

  // All hooks must be called before any early return
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [formStep, setFormStep] = useState(1)
  const totalSteps = 3

  // Form validation schema
  const formSchema = z.object({
    jobTitle: z.string().min(1, { message: t('employers.post_job.validation.title_required') }),
    company: z.string().min(1, { message: t('employers.post_job.validation.company_required') }),
    location: z.string().min(1, { message: t('employers.post_job.validation.location_required') }),
    jobType: z.string().min(1, { message: t('employers.post_job.validation.job_type_required') }),
    description: z.string()
      .min(100, { message: t('employers.post_job.validation.description_min') })
      .min(1, { message: t('employers.post_job.validation.description_required') }),
    requirements: z.string().optional(),
    benefits: z.string().optional(),
    contactEmail: z.string()
      .min(1, { message: t('employers.post_job.validation.email_required') })
      .email({ message: t('employers.post_job.validation.email_invalid') }),
    applicationDeadline: z.date().optional(),
    salary: z.string().optional(),
  })

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      location: "",
      jobType: "",
      description: "",
      requirements: "",
      benefits: "",
      contactEmail: "",
      salary: "",
    },
    mode: "onChange",
  })

  // Track form completion progress
  const watchedFields = form.watch()
  const calculateProgress = () => {
    const requiredFields = ['jobTitle', 'company', 'location', 'jobType', 'description', 'contactEmail']
    const filledFields = requiredFields.filter(field => watchedFields[field as keyof typeof watchedFields])
    return Math.round((filledFields.length / requiredFields.length) * 100)
  }

  // Get completion percentage
  const progressPercentage = calculateProgress()

  // Add tag to list
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  // Remove tag from list
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Handle key press in tag input
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  // Handle form step navigation
  const nextStep = () => {
    if (formStep < totalSteps) {
      setFormStep(formStep + 1)
      // Scroll to top of form
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const prevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1)
      // Scroll to top of form
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // This would normally submit to an API
    console.log({ ...values, tags })
    
    // Show success toast
    toast({
      title: t('employers.post_job.success.title'),
      description: t('employers.post_job.success.message'),
      duration: 5000,
    })
    
    // Redirect to employer dashboard or job listing
    router.push('/employeurs/dashboard')
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {locale === 'fr' ? 'Publier une offre d\'emploi' : 'Post a Job Offer'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {locale === 'fr' ? 'Remplissez le formulaire ci-dessous pour publier votre offre' : 'Fill out the form below to publish your job offer'}
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            {locale === 'fr' ? 'Déconnexion' : 'Logout'}
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              {locale === 'fr' ? 'Progression' : 'Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{locale === 'fr' ? 'Étape' : 'Step'} {formStep} / {totalSteps}</span>
                <span>{progressPercentage}% {locale === 'fr' ? 'complété' : 'completed'}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === 'fr' ? 'Informations de base' : 'Basic Information'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'fr' ? 'Commençons par les détails essentiels de votre offre' : 'Let\'s start with the essential details of your job offer'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Briefcase className="mr-2 h-4 w-4" />
                          {locale === 'fr' ? 'Titre du poste' : 'Job Title'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={locale === 'fr' ? 'ex: Développeur Web Senior' : 'e.g. Senior Web Developer'} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          {locale === 'fr' ? 'Entreprise' : 'Company'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={locale === 'fr' ? 'Nom de votre entreprise' : 'Your company name'} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            {locale === 'fr' ? 'Lieu' : 'Location'}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={locale === 'fr' ? 'ex: Montréal, QC' : 'e.g. Montreal, QC'} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jobType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {locale === 'fr' ? 'Type d\'emploi' : 'Job Type'}
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={locale === 'fr' ? 'Sélectionnez le type' : 'Select type'} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full-time">
                                {locale === 'fr' ? 'Temps plein' : 'Full-time'}
                              </SelectItem>
                              <SelectItem value="part-time">
                                {locale === 'fr' ? 'Temps partiel' : 'Part-time'}
                              </SelectItem>
                              <SelectItem value="contract">
                                {locale === 'fr' ? 'Contrat' : 'Contract'}
                              </SelectItem>
                              <SelectItem value="internship">
                                {locale === 'fr' ? 'Stage' : 'Internship'}
                              </SelectItem>
                              <SelectItem value="remote">
                                {locale === 'fr' ? 'Télétravail' : 'Remote'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          {locale === 'fr' ? 'Salaire (optionnel)' : 'Salary (optional)'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={locale === 'fr' ? 'ex: 60,000$ - 80,000$ par année' : 'e.g. $60,000 - $80,000 per year'} 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {locale === 'fr' 
                            ? 'Les offres avec salaire reçoivent 2x plus de candidatures' 
                            : 'Job posts with salary get 2x more applications'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    {locale === 'fr' ? 'Suivant' : 'Next'}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {formStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === 'fr' ? 'Description détaillée' : 'Detailed Description'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'fr' 
                      ? 'Fournissez des détails sur le poste, les exigences et les avantages' 
                      : 'Provide details about the position, requirements, and benefits'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          {locale === 'fr' ? 'Description du poste' : 'Job Description'}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={locale === 'fr' 
                              ? 'Décrivez le poste, les responsabilités et les qualifications requises...' 
                              : 'Describe the position, responsibilities, and required qualifications...'
                            } 
                            className="min-h-[200px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          {locale === 'fr' 
                            ? 'Minimum 100 caractères. Soyez précis et détaillé.' 
                            : 'Minimum 100 characters. Be specific and detailed.'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <ListChecks className="mr-2 h-4 w-4" />
                          {locale === 'fr' ? 'Exigences (optionnel)' : 'Requirements (optional)'}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={locale === 'fr' 
                              ? 'Listez les compétences, l\'expérience et les qualifications spécifiques requises...' 
                              : 'List specific skills, experience, and qualifications required...'
                            } 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Award className="mr-2 h-4 w-4" />
                          {locale === 'fr' ? 'Avantages (optionnel)' : 'Benefits (optional)'}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={locale === 'fr' 
                              ? 'Décrivez les avantages sociaux, la culture d\'entreprise et autres perks...' 
                              : 'Describe benefits, company culture, and other perks...'
                            } 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    {locale === 'fr' ? 'Précédent' : 'Previous'}
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    {locale === 'fr' ? 'Suivant' : 'Next'}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {formStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === 'fr' ? 'Finalisation' : 'Finalization'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'fr' 
                      ? 'Derniers détails et informations de contact' 
                      : 'Final details and contact information'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <FormLabel className="flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      {locale === 'fr' ? 'Tags (optionnel)' : 'Tags (optional)'}
                    </FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="px-2 py-1">
                          {tag}
                          <button 
                            type="button"
                            onClick={() => removeTag(tag)} 
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder={locale === 'fr' ? 'Ajouter un tag et appuyer sur Entrée' : 'Add a tag and press Enter'}
                        className="flex-1"
                      />
                      <Button type="button" size="sm" onClick={addTag}>
                        {locale === 'fr' ? 'Ajouter' : 'Add'}
                      </Button>
                    </div>
                    <FormDescription>
                      {locale === 'fr' 
                        ? 'Ajoutez des tags pertinents pour améliorer la visibilité de votre offre' 
                        : 'Add relevant tags to improve your job offer visibility'}
                    </FormDescription>
                  </div>

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Mail className="mr-2 h-4 w-4" />
                          {locale === 'fr' ? 'Email de contact' : 'Contact Email'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={locale === 'fr' ? 'Email pour recevoir les candidatures' : 'Email to receive applications'} 
                            type="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicationDeadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {locale === 'fr' ? 'Date limite de candidature (optionnel)' : 'Application Deadline (optional)'}
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: locale === 'fr' ? fr : enUS })
                                ) : (
                                  <span>{locale === 'fr' ? 'Choisir une date' : 'Pick a date'}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    {locale === 'fr' ? 'Précédent' : 'Previous'}
                  </Button>
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" />
                    {locale === 'fr' ? 'Publier l\'offre' : 'Publish Job Offer'}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default PublierOffreContent