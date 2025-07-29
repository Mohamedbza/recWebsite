"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAppSelector } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Briefcase, Calendar, User, 
  TrendingUp, Star, CheckCircle,
  ArrowUpRight, Search,
  Building2, MapPin, Settings,
  FileText, Loader2, Eye
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getMyJobApplications, getRecommendedJobs } from "@/lib/api"
import JobDetailsModal from "@/components/jobs/JobDetailsModal"

interface JobApplication {
  _id: string
  job: {
    _id: string
    title: string
    company: {
      name: string
    }
  }
  status: string
  createdAt: string
  updatedAt: string
}

interface RecommendedJob {
  _id: string
  title: string
  companyId: {
    name: string
  }
  address: string
  skills: string[]
  matchScore: number
  matchingSkills: string[]
}

export default function CandidateDashboardPage() {
  const { locale } = useLanguage()
  const { user, isAuthenticated, token } = useAppSelector((state) => state.account)
  const router = useRouter()

  // State for real data
  const [recentApplications, setRecentApplications] = useState<JobApplication[]>([])
  const [recommendedJobs, setRecommendedJobs] = useState<RecommendedJob[]>([])
  const [isLoadingApplications, setIsLoadingApplications] = useState(true)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Job details modal state
  const [jobDetailsModal, setJobDetailsModal] = useState({
    open: false,
    jobId: null as string | null
  })

  // Stats calculated from real data
  const [stats, setStats] = useState({
    totalApplications: 0,
    inProgress: 0,
    interviews: 0,
    profileCompletion: 85
  })

  // Fetch recent applications
  const fetchRecentApplications = async () => {
    if (!token) return
    
    try {
      setIsLoadingApplications(true)
      const response = await getMyJobApplications(token, 1, 5)
      
      if (response.success) {
        setRecentApplications(response.data.applications || [])
        
        // Calculate stats from applications
        const applications = response.data.applications || []
        const totalApplications = response.data.total || 0
        const inProgress = applications.filter((app: JobApplication) => 
          ['pending', 'reviewing', 'shortlisted'].includes(app.status.toLowerCase())
        ).length
        const interviews = applications.filter((app: JobApplication) => 
          ['interview', 'interviewed'].includes(app.status.toLowerCase())
        ).length

        setStats(prev => ({
          ...prev,
          totalApplications,
          inProgress,
          interviews
        }))
      }
    } catch (err) {
      console.error('Error fetching applications:', err)
      setError(locale === 'fr' ? 'Erreur lors du chargement des candidatures' : 'Error loading applications')
    } finally {
      setIsLoadingApplications(false)
    }
  }

  // Fetch recommended jobs based on skills
  const fetchRecommendedJobs = async () => {
    if (!token) return
    
    try {
      setIsLoadingRecommendations(true)
      const response = await getRecommendedJobs(token, 5)
      
      if (response.success) {
        setRecommendedJobs(response.data.jobs || [])
      }
    } catch (err) {
      console.error('Error fetching recommended jobs:', err)
      setError(locale === 'fr' ? 'Erreur lors du chargement des emplois recommandés' : 'Error loading recommended jobs')
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchRecentApplications()
      fetchRecommendedJobs()
    }
  }, [isAuthenticated, token])

  // Helper function to get status color and text
  const getStatusInfo = (status: string) => {
    const statusLower = status.toLowerCase()
    
    if (['pending', 'reviewing'].includes(statusLower)) {
      return {
        color: 'yellow',
        text: locale === 'fr' ? 'En révision' : 'Under Review'
      }
    } else if (['shortlisted', 'selected'].includes(statusLower)) {
      return {
        color: 'blue',
        text: locale === 'fr' ? 'Sélectionné' : 'Shortlisted'
      }
    } else if (['interview', 'interviewed'].includes(statusLower)) {
      return {
        color: 'green',
        text: locale === 'fr' ? 'Entrevue' : 'Interview'
      }
    } else if (['rejected', 'declined'].includes(statusLower)) {
      return {
        color: 'red',
        text: locale === 'fr' ? 'Refusé' : 'Rejected'
      }
    } else {
      return {
        color: 'gray',
        text: status
      }
    }
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return locale === 'fr' ? 'Hier' : 'Yesterday'
    } else if (diffDays < 7) {
      return locale === 'fr' ? `Il y a ${diffDays} jours` : `${diffDays} days ago`
    } else {
      return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  // Handle job details modal
  const openJobDetails = (jobId: string) => {
    setJobDetailsModal({ open: true, jobId })
  }

  const closeJobDetails = () => {
    setJobDetailsModal({ open: false, jobId: null })
  }

  const handleApplicationSuccess = () => {
    // Refresh the applications list after successful application
    fetchRecentApplications()
  }

  if (!isAuthenticated || user?.role !== 'candidate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
            {locale === 'fr' ? 'Connexion requise' : 'Login required'}
          </h2>
          <p className="mb-6 text-muted-foreground text-center">
            {locale === 'fr'
              ? "Vous devez être connecté en tant que candidat pour accéder au tableau de bord."
              : "You must be logged in as a candidate to access the dashboard."}
          </p>
          <Button 
            onClick={() => router.push('/login')} 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20"
          >
            {locale === 'fr' ? 'Se connecter' : 'Log In'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Modern Header Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background/80 to-secondary/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 lg:p-12">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-bl from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-secondary/20 via-secondary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {new Date().getHours() < 12 
                      ? (locale === 'fr' ? 'Bonjour' : 'Good morning')
                      : new Date().getHours() < 18 
                      ? (locale === 'fr' ? 'Bon après-midi' : 'Good afternoon')
                      : (locale === 'fr' ? 'Bonsoir' : 'Good evening')
                    }
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-4">
                  {user?.name || (locale === 'fr' ? 'Candidat' : 'Candidate')}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                  {locale === 'fr' 
                    ? 'Gérez vos candidatures et découvrez de nouvelles opportunités de carrière.'
                    : 'Manage your applications and discover new career opportunities.'}
                </p>

                {/* Live stats preview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold">{stats.totalApplications}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {locale === 'fr' ? 'Candidatures' : 'Applications'}
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-secondary" />
                      <span className="text-2xl font-bold">{stats.interviews}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {locale === 'fr' ? 'Entrevues' : 'Interviews'}
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold">{stats.inProgress}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {locale === 'fr' ? 'En cours' : 'In Progress'}
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-orange-600" />
                      <span className="text-2xl font-bold">{stats.profileCompletion}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {locale === 'fr' ? 'Profil' : 'Profile'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 group" asChild>
                  <Link href="/candidate/emplois">
                    <Search className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                    {locale === 'fr' ? 'Rechercher Emplois' : 'Find Jobs'}
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="border-2 border-white/30 hover:border-primary/50 bg-white/20 hover:bg-white/30 backdrop-blur-sm font-semibold px-8 py-4 rounded-2xl transition-all duration-300 group" asChild>
                  <Link href="/candidate/profile">
                    <User className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                    {locale === 'fr' ? 'Mon Profil' : 'My Profile'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Completion Card */}
          <Card className="border-0 bg-gradient-to-br from-white/90 via-white/80 to-primary/5 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-primary/10 backdrop-blur-xl shadow-2xl shadow-primary/10">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                    <User className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      {locale === 'fr' ? 'Complétez votre profil' : 'Complete Your Profile'}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {locale === 'fr' ? 'Augmentez vos chances d\'être remarqué' : 'Increase your chances of being noticed'}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xl font-bold px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20">
                  {stats.profileCompletion}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={stats.profileCompletion} className="h-3" />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                    <CheckCircle className="h-3 w-3 mr-2" />
                    {locale === 'fr' ? 'Info de base' : 'Basic Info'}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                    <CheckCircle className="h-3 w-3 mr-2" />
                    {locale === 'fr' ? 'Expérience' : 'Experience'}
                  </Badge>
                  <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20">
                    {locale === 'fr' ? 'Compétences' : 'Skills'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Recent Applications */}
            <Card className="border-0 bg-gradient-to-br from-white/90 via-white/80 to-blue-50/50 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-blue-950/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center shadow-lg">
                      <Briefcase className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {locale === 'fr' ? 'Candidatures Récentes' : 'Recent Applications'}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {locale === 'fr' ? 'Suivez vos demandes' : 'Track your submissions'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-xl group" asChild>
                    <Link href="/candidate/applications">
                      {locale === 'fr' ? 'Voir tout' : 'View All'}
                      <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingApplications ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                    <span className="ml-2 text-muted-foreground">
                      {locale === 'fr' ? 'Chargement...' : 'Loading...'}
                    </span>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={fetchRecentApplications} variant="outline" size="sm">
                      {locale === 'fr' ? 'Réessayer' : 'Retry'}
                    </Button>
                  </div>
                ) : recentApplications.length > 0 ? (
                  <div className="space-y-4">
                    {recentApplications.map((app) => {
                      const statusInfo = getStatusInfo(app.status)
                      return (
                        <div key={app._id} className="group p-4 rounded-xl border border-border hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-foreground group-hover:text-blue-700 transition-colors">
                                {app.job.title || (locale === 'fr' ? 'Titre non spécifié' : 'Title not specified')}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Building2 className="h-3 w-3" />
                                <span>{app.job.company?.name || (locale === 'fr' ? 'Entreprise non spécifiée' : 'Company not specified')}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {locale === 'fr' ? 'Postulé' : 'Applied'} {formatDate(app.createdAt)}
                              </p>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`${
                                statusInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                                statusInfo.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                                statusInfo.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                statusInfo.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                              }`}
                            >
                              {statusInfo.text}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {locale === 'fr' ? 'Aucune candidature' : 'No applications yet'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {locale === 'fr' 
                        ? 'Commencez à postuler pour voir vos candidatures ici'
                        : 'Start applying to see your applications here'}
                    </p>
                    <Button asChild>
                      <Link href="/candidate/emplois">
                        <Search className="h-4 w-4 mr-2" />
                        {locale === 'fr' ? 'Rechercher des emplois' : 'Search Jobs'}
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <Card className="border-0 bg-gradient-to-br from-white/90 via-white/80 to-purple-50/50 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-purple-950/50 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center shadow-lg">
                      <Star className="h-7 w-7 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {locale === 'fr' ? 'Emplois Recommandés' : 'Recommended Jobs'}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {locale === 'fr' ? 'Parfait pour vous' : 'Perfect for you'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50 rounded-xl group" asChild>
                    <Link href="/candidate/emplois">
                      {locale === 'fr' ? 'Voir plus' : 'View More'}
                      <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingRecommendations ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                    <span className="ml-2 text-muted-foreground">
                      {locale === 'fr' ? 'Chargement...' : 'Loading...'}
                    </span>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={fetchRecommendedJobs} variant="outline" size="sm">
                      {locale === 'fr' ? 'Réessayer' : 'Retry'}
                    </Button>
                  </div>
                ) : recommendedJobs.length > 0 ? (
                  <div className="space-y-4">
                    {recommendedJobs.map((job) => (
                      <div key={job._id} className="group p-4 rounded-xl border border-border hover:border-purple-300 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-all duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="font-semibold text-foreground group-hover:text-purple-700 transition-colors">
                              {job.title || (locale === 'fr' ? 'Titre non spécifié' : 'Title not specified')}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.address || (locale === 'fr' ? 'Adresse non spécifiée' : 'Address not specified')}
                              </span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            {job.matchScore}% {locale === 'fr' ? 'compatible' : 'match'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          {job.matchingSkills && job.matchingSkills.length > 0 ? (
                            <>
                              {job.matchingSkills.slice(0, 2).map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200">
                                  {skill}
                                </Badge>
                              ))}
                              {job.matchingSkills.length > 2 && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/10 dark:text-green-300 border-green-200">
                                  +{job.matchingSkills.length - 2} {locale === 'fr' ? 'autres' : 'more'}
                                </Badge>
                              )}
                            </>
                          ) : null}
                          
                          {/* Show missing skills in red */}
                          {job.skills && job.skills.length > 0 && (
                            <>
                              {job.skills
                                .filter(skill => !job.matchingSkills?.includes(skill))
                                .slice(0, 2)
                                .map((skill, index) => (
                                  <Badge key={`missing-${index}`} variant="outline" className="text-xs bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-300 border-red-200">
                                    {skill}
                                  </Badge>
                                ))}
                              {job.skills.filter(skill => !job.matchingSkills?.includes(skill)).length > 2 && (
                                <Badge variant="outline" className="text-xs bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-300 border-red-200">
                                  +{job.skills.filter(skill => !job.matchingSkills?.includes(skill)).length - 2} {locale === 'fr' ? 'manquantes' : 'missing'}
                                </Badge>
                              )}
                            </>
                          )}
                          
                          {(!job.matchingSkills || job.matchingSkills.length === 0) && (!job.skills || job.skills.length === 0) && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                              {locale === 'fr' ? 'Aucune compétence spécifiée' : 'No skills specified'}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-purple-600 hover:bg-purple-50 border-purple-200 hover:border-purple-300 group"
                            onClick={() => openJobDetails(job._id)}
                          >
                            <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                            {locale === 'fr' ? 'Voir détails' : 'View Details'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {locale === 'fr' ? 'Aucune recommandation' : 'No recommendations yet'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {locale === 'fr' 
                        ? 'Complétez votre profil pour recevoir des recommandations personnalisées'
                        : 'Complete your profile to receive personalized recommendations'}
                    </p>
                    <Button asChild>
                      <Link href="/candidate/profile">
                        <User className="h-4 w-4 mr-2" />
                        {locale === 'fr' ? 'Compléter le profil' : 'Complete Profile'}
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 bg-gradient-to-br from-white/90 via-white/80 to-secondary/5 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-secondary/10 backdrop-blur-xl shadow-2xl shadow-secondary/10">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center shadow-lg">
                  <Settings className="h-7 w-7 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {locale === 'fr' ? 'Actions Rapides' : 'Quick Actions'}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {locale === 'fr' ? 'Accès rapide à vos outils essentiels' : 'Quick access to your essential tools'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button variant="outline" className="group h-auto p-6 justify-start border-0 bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg" asChild>
                  <Link href="/candidate/profile">
                    <div className="flex items-center gap-4 w-full">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {locale === 'fr' ? 'Modifier Profil' : 'Edit Profile'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {locale === 'fr' ? 'Mettre à jour vos infos' : 'Update your information'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="group h-auto p-6 justify-start border-0 bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg" asChild>
                  <Link href="/candidate/emplois">
                    <div className="flex items-center gap-4 w-full">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Search className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                          {locale === 'fr' ? 'Rechercher Emplois' : 'Search Jobs'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {locale === 'fr' ? 'Trouver des opportunités' : 'Find opportunities'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="group h-auto p-6 justify-start border-0 bg-gradient-to-br from-green-500/5 to-green-500/10 hover:from-green-500/10 hover:to-green-500/20 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg" asChild>
                  <Link href="/candidate/resume">
                    <div className="flex items-center gap-4 w-full">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-foreground group-hover:text-green-600 transition-colors">
                          {locale === 'fr' ? 'Mon CV' : 'My Resume'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {locale === 'fr' ? 'Gérer votre CV' : 'Manage your resume'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        open={jobDetailsModal.open}
        jobId={jobDetailsModal.jobId}
        onClose={closeJobDetails}
        onApplicationSuccess={handleApplicationSuccess}
      />
    </div>
  )
}