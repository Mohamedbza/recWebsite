"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAppSelector } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Briefcase, MapPin, Calendar, Clock, 
  DollarSign, Users, CheckCircle, X,
  Building2, Star, TrendingUp, FileText,
  Send, Loader2, AlertCircle
} from "lucide-react"
import { createJobApplication } from "@/lib/api"

interface JobDetailsModalProps {
  open: boolean
  jobId: string | null
  onClose: () => void
  onApplicationSuccess?: () => void
}

interface JobDetails {
  _id: string
  title: string
  description: string
  responsibilities: string
  requirements: string
  location: string
  address: string
  jobType: string
  contractType: string
  experienceLevel: string
  salaryMin?: number
  salaryMax?: number
  salaryCurrency: string
  benefits: string
  skills: string[]
  matchScore: number
  matchingSkills: string[]
  postingDate: string
  deadlineDate?: string
  isRemote: boolean
  isHybrid: boolean
}

export default function JobDetailsModal({ 
  open, 
  jobId, 
  onClose, 
  onApplicationSuccess 
}: JobDetailsModalProps) {
  const { locale } = useLanguage()
  const { user, token } = useAppSelector((state) => state.account)
  
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  // Fetch job details when modal opens
  useEffect(() => {
    if (open && jobId) {
      fetchJobDetails()
    }
  }, [open, jobId])

  const fetchJobDetails = async () => {
    if (!jobId || !token) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const { config } = await import('../../config/environment');
      const response = await fetch(`${config.apiUrl}/job-applications/public/jobs/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch job details')
      }
      
      const job = await response.json()
      
      // Transform the job data to match our interface
      setJobDetails({
        _id: job._id,
        title: job.title,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        location: job.location,
        address: job.address,
        jobType: job.jobType,
        contractType: job.contractType,
        experienceLevel: job.experienceLevel,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryCurrency: job.salaryCurrency || 'USD',
        benefits: job.benefits,
        skills: job.skills || [],
        matchScore: job.matchScore || 0,
        matchingSkills: job.matchingSkills || [],
        postingDate: job.postingDate,
        deadlineDate: job.deadlineDate,
        isRemote: job.isRemote,
        isHybrid: job.isHybrid,
      })
    } catch (err) {
      console.error('Error fetching job details:', err)
      setError(locale === 'fr' ? 'Erreur lors du chargement des détails du poste' : 'Error loading job details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApply = async () => {
    if (!jobId || !token) return
    
    setIsApplying(true)
    setError(null)
    
    try {
      await createJobApplication({
        job: jobId,
      }, token)
      
      setShowSuccess(true)
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
        onApplicationSuccess?.()
      }, 3000)
    } catch (err: any) {
      console.error('Error applying for job:', err)
      setError(err.message || (locale === 'fr' ? 'Erreur lors de la candidature' : 'Error applying for job'))
    } finally {
      setIsApplying(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatSalary = (min?: number, max?: number, currency: string = 'USD') => {
    if (!min && !max) return locale === 'fr' ? 'Salaire non spécifié' : 'Salary not specified'
    
    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency
    const minFormatted = min ? `${currencySymbol}${min.toLocaleString()}` : ''
    const maxFormatted = max ? `${currencySymbol}${max.toLocaleString()}` : ''
    
    if (min && max) {
      return `${minFormatted} - ${maxFormatted}`
    } else if (min) {
      return `${minFormatted}+`
    } else if (max) {
      return `Up to ${maxFormatted}`
    }
    
    return locale === 'fr' ? 'Salaire non spécifié' : 'Salary not specified'
  }

  const getJobTypeText = (jobType: string) => {
    const types: Record<string, { en: string; fr: string }> = {
      'full-time': { en: 'Full Time', fr: 'Temps plein' },
      'part-time': { en: 'Part Time', fr: 'Temps partiel' },
      'contract': { en: 'Contract', fr: 'Contrat' },
      'internship': { en: 'Internship', fr: 'Stage' },
      'freelance': { en: 'Freelance', fr: 'Freelance' }
    }
    return types[jobType]?.[locale as 'en' | 'fr'] || jobType
  }

  const getExperienceLevelText = (level: string) => {
    const levels: Record<string, { en: string; fr: string }> = {
      'entry': { en: 'Entry Level', fr: 'Débutant' },
      'junior': { en: 'Junior', fr: 'Junior' },
      'mid': { en: 'Mid Level', fr: 'Intermédiaire' },
      'senior': { en: 'Senior', fr: 'Senior' },
      'lead': { en: 'Lead', fr: 'Lead' },
      'executive': { en: 'Executive', fr: 'Direction' }
    }
    return levels[level]?.[locale as 'en' | 'fr'] || level
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {locale === 'fr' ? 'Détails du Poste' : 'Job Details'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'fr' 
                ? 'Consultez les détails du poste et postulez si vous êtes intéressé'
                : 'Review job details and apply if interested'
              }
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">
                {locale === 'fr' ? 'Chargement...' : 'Loading...'}
              </span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <span className="ml-3 text-red-600">{error}</span>
            </div>
          ) : jobDetails ? (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {jobDetails.title}
                    </h2>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{jobDetails.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{getJobTypeText(jobDetails.jobType)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(jobDetails.postingDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Match Score */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-lg font-bold text-primary">
                        {jobDetails.matchScore}% {locale === 'fr' ? 'compatible' : 'match'}
                      </span>
                    </div>
                    <Progress value={jobDetails.matchScore} className="w-24 h-2" />
                  </div>
                </div>

                {/* Salary and Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">
                      {formatSalary(jobDetails.salaryMin, jobDetails.salaryMax, jobDetails.salaryCurrency)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">
                      {getExperienceLevelText(jobDetails.experienceLevel)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">
                      {jobDetails.isRemote 
                        ? (locale === 'fr' ? 'Télétravail' : 'Remote')
                        : jobDetails.isHybrid
                        ? (locale === 'fr' ? 'Hybride' : 'Hybrid')
                        : (locale === 'fr' ? 'Sur site' : 'On-site')
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {locale === 'fr' ? 'Compétences Requises' : 'Required Skills'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {jobDetails.skills.map((skill, index) => {
                      const isMatching = jobDetails.matchingSkills.includes(skill)
                      return (
                        <Badge 
                          key={index}
                          variant={isMatching ? "default" : "outline"}
                          className={isMatching 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }
                        >
                          {isMatching && <CheckCircle className="h-3 w-3 mr-1" />}
                          {skill}
                        </Badge>
                      )
                    })}
                  </div>
                  {jobDetails.matchingSkills.length > 0 && (
                    <p className="text-sm text-green-600 mt-3">
                      {locale === 'fr' 
                        ? `${jobDetails.matchingSkills.length} compétences correspondent à votre profil`
                        : `${jobDetails.matchingSkills.length} skills match your profile`
                      }
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Description Section */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === 'fr' ? 'Description du Poste' : 'Job Description'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="whitespace-pre-wrap">{jobDetails.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Responsibilities Section */}
              {jobDetails.responsibilities && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'fr' ? 'Responsabilités' : 'Responsibilities'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="whitespace-pre-wrap">{jobDetails.responsibilities}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Requirements Section */}
              {jobDetails.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'fr' ? 'Exigences' : 'Requirements'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="whitespace-pre-wrap">{jobDetails.requirements}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Benefits Section */}
              {jobDetails.benefits && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'fr' ? 'Avantages' : 'Benefits'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="whitespace-pre-wrap">{jobDetails.benefits}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Application Deadline */}
              {jobDetails.deadlineDate && (
                <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">
                        {locale === 'fr' ? 'Date limite de candidature' : 'Application Deadline'}: {formatDate(jobDetails.deadlineDate)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Fermer' : 'Close'}
                </Button>
                <Button 
                  onClick={handleApply}
                  disabled={isApplying}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20"
                >
                  {isApplying ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {locale === 'fr' ? 'Candidature...' : 'Applying...'}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Postuler' : 'Apply Now'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {locale === 'fr' ? 'Candidature Soumise !' : 'Application Submitted!'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {locale === 'fr'
                  ? 'Votre candidature a été soumise avec succès. Nous examinerons votre profil et vous contacterons bientôt.'
                  : 'Your job application has been submitted successfully. We\'ll review your profile and get back to you soon.'
                }
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 