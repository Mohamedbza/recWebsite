"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Briefcase, Calendar, Clock, 
  TrendingUp, Star, CheckCircle,
  ArrowUpRight, Plus,
  Building2, MapPin, DollarSign, User, FileText
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getMyJobApplications, getRecommendedJobs } from "@/lib/api"

// Real data types based on API response
interface JobApplication {
  _id: string
  job: {
    _id: string
    title: string
    companyId: {
      _id: string
      name: string
      logo?: string
      location: string
    }
    location: string
    salary?: string
    type: string
  }
  status: 'new' | 'reviewed' | 'interview' | 'offer' | 'hired' | 'rejected'
  createdAt: string
  updatedAt: string
}

interface JobApplicationsResponse {
  jobApplications: JobApplication[]
  total: number
  page: number
  totalPages: number
}

interface RecommendedJob {
  _id: string
  title: string
  companyId: {
    _id: string
    name: string
    logo?: string
    location: string
  }
  location: string
  salary?: string
  type: string
  matchScore: number
  matchingSkills: string[]
  createdAt: string
}

interface RecommendedJobsResponse {
  success: boolean
  data: {
    candidate: {
      id: string
      firstName: string
      lastName: string
      skills: string[]
    }
    jobs: RecommendedJob[]
    total: number
  }
}

interface Stats {
  totalApplications: number
  inProgress: number
  interviews: number
  responseRate: number
  profileViews: number
  profileCompletion: number
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  reviewed: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  interview: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  offer: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  hired: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
}

const statusLabels = {
  new: { en: 'New', fr: 'Nouveau' },
  reviewed: { en: 'Reviewed', fr: 'Examiné' },
  interview: { en: 'Interview', fr: 'Entrevue' },
  offer: { en: 'Offer', fr: 'Offre' },
  hired: { en: 'Hired', fr: 'Embauché' },
  rejected: { en: 'Rejected', fr: 'Rejeté' }
}

// Helper function to get status label with fallback
const getStatusLabel = (status: string, locale: string) => {
  if (statusLabels[status as keyof typeof statusLabels]) {
    return statusLabels[status as keyof typeof statusLabels][locale as keyof typeof statusLabels[keyof typeof statusLabels]]
  }
  return status // fallback to raw status if not found
}

// Helper function to get status color with fallback
const getStatusColor = (status: string) => {
  return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
}

export default function CandidateDashboardPage() {
  const { locale } = useLanguage()
  const { user, isLoggedIn, token } = useAuth()
  const router = useRouter()
  const [recentApplications, setRecentApplications] = useState<JobApplication[]>([])
  const [applicationsLoading, setApplicationsLoading] = useState(true)
  const [applicationsError, setApplicationsError] = useState<string | null>(null)
  const [recommendedJobs, setRecommendedJobs] = useState<RecommendedJob[]>([])
  const [recommendedJobsLoading, setRecommendedJobsLoading] = useState(true)
  const [recommendedJobsError, setRecommendedJobsError] = useState<string | null>(null)

  // Mock data for stats (keeping these for now)
  const stats: Stats = {
    totalApplications: 12,
    inProgress: 8,
    interviews: 3,
    responseRate: 67,
    profileViews: 24,
    profileCompletion: 85
  }

  // Fetch recent applications and recommended jobs
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn || !token || !user?.id) {
        setApplicationsLoading(false)
        setRecommendedJobsLoading(false)
        return
      }

      try {
        // Fetch applications
        setApplicationsLoading(true)
        setApplicationsError(null)
        
        const applicationsResponse: JobApplicationsResponse = await getMyJobApplications(token, 1, 5)
        setRecentApplications(applicationsResponse.jobApplications)
        
        // Update stats with real data
        stats.totalApplications = applicationsResponse.total
        stats.inProgress = applicationsResponse.jobApplications.filter(app => 
          ['new', 'reviewed'].includes(app.status)
        ).length
        stats.interviews = applicationsResponse.jobApplications.filter(app => 
          app.status === 'interview'
        ).length
        
      } catch (error) {
        console.error('Error fetching applications:', error)
        setApplicationsError(error instanceof Error ? error.message : 'Failed to fetch applications')
      } finally {
        setApplicationsLoading(false)
      }

      try {
        // Fetch recommended jobs
        setRecommendedJobsLoading(true)
        setRecommendedJobsError(null)
        
        const recommendedResponse: RecommendedJobsResponse = await getRecommendedJobs(token, 5)
        setRecommendedJobs(recommendedResponse.data.jobs)
        
      } catch (error) {
        console.error('Error fetching recommended jobs:', error)
        setRecommendedJobsError(error instanceof Error ? error.message : 'Failed to fetch recommended jobs')
      } finally {
        setRecommendedJobsLoading(false)
      }
    }

    fetchData()
  }, [isLoggedIn, token, user?.id])

  if (!isLoggedIn || user?.role !== 'candidate') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">
          {locale === 'fr' ? 'Connexion requise' : 'Login required'}
        </h2>
        <p className="mb-6 text-muted-foreground text-center max-w-md">
          {locale === 'fr'
            ? "Vous devez être connecté en tant que candidat pour accéder au tableau de bord."
            : "You must be logged in as a candidate to access the dashboard."}
        </p>
        <Button onClick={() => router.push('/login')}>
          {locale === 'fr' ? 'Se connecter' : 'Log In'}
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 border border-primary/20 p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50"></div>
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {locale === 'fr' ? `Bonjour, ${user.name || 'Candidat'}!` : `Hello, ${user.name || 'Candidate'}!`}
            </h1>
            <p className="text-muted-foreground text-lg">
              {locale === 'fr' 
                ? 'Voici un aperçu de votre activité récente' 
                : 'Here\'s an overview of your recent activity'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/5" asChild>
              <Link href="/candidate/emplois">
                <Plus className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Rechercher' : 'Find Jobs'}
              </Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/candidate/profile">
                <User className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Profil' : 'Profile'}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stats.totalApplications}</p>
              <p className="text-sm text-muted-foreground">
                {locale === 'fr' ? 'Candidatures totales' : 'Total Applications'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">
                {locale === 'fr' ? 'En cours' : 'In Progress'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Calendar className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stats.interviews}</p>
              <p className="text-sm text-muted-foreground">
                {locale === 'fr' ? 'Entrevues' : 'Interviews'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stats.responseRate}%</p>
              <p className="text-sm text-muted-foreground">
                {locale === 'fr' ? 'Taux de réponse' : 'Response Rate'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card className="border-primary/10">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                {locale === 'fr' ? 'Complétion du profil' : 'Profile Completion'}
              </CardTitle>
              <CardDescription>
                {locale === 'fr' 
                  ? 'Complétez votre profil pour attirer plus d\'employeurs' 
                  : 'Complete your profile to attract more employers'}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-primary/10 text-primary border-primary/20">
              {stats.profileCompletion}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={stats.profileCompletion} className="h-3" />
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
              <CheckCircle className="h-3 w-3 mr-1" />
              {locale === 'fr' ? 'Info de base' : 'Basic Info'}
            </Badge>
            <Badge variant="outline" className="text-xs border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
              <CheckCircle className="h-3 w-3 mr-1" />
              {locale === 'fr' ? 'Expérience' : 'Experience'}
            </Badge>
            <Badge variant="outline" className="text-xs border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
              <Clock className="h-3 w-3 mr-1" />
              {locale === 'fr' ? 'Portfolio' : 'Portfolio'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <Card className="border-primary/10">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                {locale === 'fr' ? 'Candidatures récentes' : 'Recent Applications'}
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5" asChild>
                <Link href="/candidate/applications">
                  {locale === 'fr' ? 'Voir tout' : 'View All'}
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {applicationsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-muted rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : applicationsError ? (
              <div className="text-center py-8">
                <p className="text-destructive mb-4">{applicationsError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.location.reload()}
                >
                  {locale === 'fr' ? 'Réessayer' : 'Retry'}
                </Button>
              </div>
            ) : recentApplications.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">
                  {locale === 'fr' 
                    ? 'Aucune candidature pour le moment' 
                    : 'No applications yet'}
                </p>
                <Button asChild>
                  <Link href="/candidate/emplois">
                    {locale === 'fr' ? 'Rechercher des emplois' : 'Search Jobs'}
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentApplications.slice(0, 3).map(application => (
                  <div 
                    key={application._id} 
                    className="group p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 space-y-2">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {application.job.title}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" /> 
                            
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {application.job.location}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {locale === 'fr' ? 'Postulé le' : 'Applied'} {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`ml-3 ${getStatusColor(application.status)}`}
                      >
                        {getStatusLabel(application.status, locale)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <Card className="border-primary/10">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                {locale === 'fr' ? 'Emplois recommandés' : 'Recommended Jobs'}
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5" asChild>
                <Link href="/candidate/emplois">
                  {locale === 'fr' ? 'Voir plus' : 'View More'}
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recommendedJobsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-muted rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : recommendedJobsError ? (
              <div className="text-center py-8">
                <p className="text-destructive mb-4">{recommendedJobsError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.location.reload()}
                >
                  {locale === 'fr' ? 'Réessayer' : 'Retry'}
                </Button>
              </div>
            ) : recommendedJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">
                  {locale === 'fr' 
                    ? 'Aucun emploi recommandé pour le moment' 
                    : 'No recommended jobs yet'}
                </p>
                <Button asChild>
                  <Link href="/candidate/emplois">
                    {locale === 'fr' ? 'Rechercher des emplois' : 'Search Jobs'}
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recommendedJobs.slice(0, 3).map(job => (
                  <div 
                    key={job._id} 
                    className="group p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                    onClick={() => router.push(`/candidate/emplois/${job._id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {job.title}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" /> 
                            
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
                        {job.matchScore}% {locale === 'fr' ? 'compatible' : 'match'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {job.salary || locale === 'fr' ? 'Salaire non spécifié' : 'Salary not specified'}
                      </span>
                      <span>{job.type}</span>
                    </div>
                    {job.matchingSkills && job.matchingSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {job.matchingSkills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                            {skill}
                          </Badge>
                        ))}
                        {job.matchingSkills.length > 3 && (
                          <Badge variant="outline" className="text-xs text-muted-foreground">
                            +{job.matchingSkills.length - 3} {locale === 'fr' ? 'autres' : 'more'}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-primary/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">
            {locale === 'fr' ? 'Actions rapides' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-6 justify-start border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200" asChild>
              <Link href="/candidate/profile">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{locale === 'fr' ? 'Modifier le profil' : 'Edit Profile'}</div>
                    <div className="text-sm text-muted-foreground">{locale === 'fr' ? 'Mettre à jour vos informations' : 'Update your information'}</div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto p-6 justify-start border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200" asChild>
              <Link href="/candidate/resume">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{locale === 'fr' ? 'Gérer le CV' : 'Manage Resume'}</div>
                    <div className="text-sm text-muted-foreground">{locale === 'fr' ? 'Télécharger ou modifier' : 'Upload or edit'}</div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto p-6 justify-start border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200" asChild>
              <Link href="/candidate/interviews">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{locale === 'fr' ? 'Mes entrevues' : 'My Interviews'}</div>
                    <div className="text-sm text-muted-foreground">{locale === 'fr' ? 'Voir le calendrier' : 'View schedule'}</div>
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 