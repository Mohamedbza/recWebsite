"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAppSelector } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  Briefcase, Search, Filter, MoreVertical, 
  Building2, MapPin, Calendar, DollarSign, 
  Clock, CheckCircle, X, Eye, Edit,
  TrendingUp, Users, Target, Loader2,
  ChevronLeft, ChevronRight, Star, 
  ArrowUpRight, CalendarDays, FileText,
  MessageSquare, Phone, Video, Award,
  Zap, Activity, BarChart3, Sparkles
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getMyJobApplications } from "@/lib/api"

interface JobApplication {
  _id: string
  job: {
    _id: string
    title: string
    company?: {
      name: string
    }
    location?: string
    salary?: string
    type?: string
    description?: string
  }
  status: string
  createdAt: string
  updatedAt: string
}

const statusConfig = {
  applied: {
    color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    icon: FileText,
    progress: 20,
    gradient: 'from-blue-500 to-blue-600'
  },
  pending: {
    color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    icon: FileText,
    progress: 20,
    gradient: 'from-blue-500 to-blue-600'
  },
  reviewing: {
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    icon: Eye,
    progress: 40,
    gradient: 'from-yellow-500 to-orange-500'
  },
  shortlisted: {
    color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    icon: Star,
    progress: 60,
    gradient: 'from-purple-500 to-purple-600'
  },
  interview: {
    color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    icon: Video,
    progress: 80,
    gradient: 'from-purple-500 to-indigo-500'
  },
  interviewed: {
    color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    icon: MessageSquare,
    progress: 80,
    gradient: 'from-purple-500 to-indigo-500'
  },
  selected: {
    color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    icon: Award,
    progress: 100,
    gradient: 'from-green-500 to-emerald-500'
  },
  offer: {
    color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    icon: Award,
    progress: 100,
    gradient: 'from-green-500 to-emerald-500'
  },
  rejected: {
    color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    icon: X,
    progress: 0,
    gradient: 'from-red-500 to-red-600'
  },
  declined: {
    color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    icon: X,
    progress: 0,
    gradient: 'from-red-500 to-red-600'
  }
}

const statusLabels = {
  applied: { en: 'Applied', fr: 'Postulé' },
  pending: { en: 'Applied', fr: 'Postulé' },
  reviewing: { en: 'Under Review', fr: 'En cours d\'examen' },
  shortlisted: { en: 'Shortlisted', fr: 'Sélectionné' },
  interview: { en: 'Interview', fr: 'Entrevue' },
  interviewed: { en: 'Interviewed', fr: 'Entrevu' },
  selected: { en: 'Selected', fr: 'Sélectionné' },
  offer: { en: 'Offer', fr: 'Offre reçue' },
  rejected: { en: 'Rejected', fr: 'Rejeté' },
  declined: { en: 'Declined', fr: 'Refusé' }
}

export default function ApplicationsPage() {
  const { locale } = useLanguage()
  const { user, isAuthenticated, token } = useAppSelector((state) => state.account)
  const router = useRouter()
  
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalApplications, setTotalApplications] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const applicationsPerPage = 10

  // Fetch applications from API
  const fetchApplications = async (page: number = 1) => {
    if (!token) return
    
    try {
      setIsLoading(true)
      setError(null)
      const response = await getMyJobApplications(token, page, applicationsPerPage)
      
      if (response.success) {
        setApplications(response.data.applications || [])
        setTotalApplications(response.data.total || 0)
        setTotalPages(response.data.totalPages || 1)
      } else {
        setError(locale === 'fr' ? 'Erreur lors du chargement des candidatures' : 'Error loading applications')
      }
    } catch (err) {
      console.error('Error fetching applications:', err)
      setError(locale === 'fr' ? 'Erreur lors du chargement des candidatures' : 'Error loading applications')
    } finally {
      setIsLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchApplications(currentPage)
    }
  }, [isAuthenticated, token, currentPage])

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  // Get status info for display
  const getStatusInfo = (status: string) => {
    const statusLower = status.toLowerCase()
    
    if (['pending', 'applied'].includes(statusLower)) {
      return { ...statusConfig.applied, text: statusLabels.applied[locale] }
    } else if (['reviewing'].includes(statusLower)) {
      return { ...statusConfig.reviewing, text: statusLabels.reviewing[locale] }
    } else if (['shortlisted', 'selected'].includes(statusLower)) {
      return { ...statusConfig.shortlisted, text: statusLabels.shortlisted[locale] }
    } else if (['interview', 'interviewed'].includes(statusLower)) {
      return { ...statusConfig.interview, text: statusLabels.interview[locale] }
    } else if (['offer'].includes(statusLower)) {
      return { ...statusConfig.offer, text: statusLabels.offer[locale] }
    } else if (['rejected', 'declined'].includes(statusLower)) {
      return { ...statusConfig.rejected, text: statusLabels.rejected[locale] }
    } else {
      return { 
        ...statusConfig.applied, 
        text: status,
        color: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
      }
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return locale === 'fr' ? 'Aujourd\'hui' : 'Today'
    if (diffInDays === 1) return locale === 'fr' ? 'Hier' : 'Yesterday'
    if (diffInDays < 7) return locale === 'fr' ? `Il y a ${diffInDays} jours` : `${diffInDays} days ago`
    if (diffInDays < 30) return locale === 'fr' ? `Il y a ${Math.floor(diffInDays / 7)} semaines` : `${Math.floor(diffInDays / 7)} weeks ago`
    return formatDate(dateString)
  }

  // Filter applications based on search and status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'company':
        return (a.job.company?.name || '').localeCompare(b.job.company?.name || '')
      case 'position':
        return (a.job.title || '').localeCompare(b.job.title || '')
      default:
        return 0
    }
  })

  // Calculate stats
  const getStats = () => {
    const total = totalApplications
    const inProgress = applications.filter(app => 
      ['pending', 'applied', 'reviewing', 'shortlisted', 'interview', 'interviewed'].includes(app.status.toLowerCase())
    ).length
    const offers = applications.filter(app => 
      ['selected', 'offer'].includes(app.status.toLowerCase())
    ).length
    const responseRate = total > 0 ? Math.round(((total - applications.filter(app => 
      ['pending', 'applied'].includes(app.status.toLowerCase())
    ).length) / total) * 100) : 0
    
    return { total, inProgress, offers, responseRate }
  }

  const stats = getStats()

  // Authentication check
  if (!isAuthenticated || user?.role !== 'candidate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
            {locale === 'fr' ? 'Connexion requise' : 'Login required'}
          </h2>
          <p className="mb-6 text-muted-foreground text-center">
            {locale === 'fr'
              ? "Vous devez être connecté en tant que candidat pour accéder à vos candidatures."
              : "You must be logged in as a candidate to access your applications."}
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
    <div className="space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {locale === 'fr' ? 'Mes candidatures' : 'My Applications'}
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                {locale === 'fr' 
                  ? 'Suivez et gérez toutes vos candidatures professionnelles'
                  : 'Track and manage all your professional applications'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" asChild className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30">
                <Link href="/candidate/emplois">
                  <Search className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Rechercher des emplois' : 'Find New Jobs'}
                </Link>
              </Button>
              <Button variant="secondary" asChild className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30">
                <Link href="/candidate/resume">
                  <FileText className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Mon CV' : 'My Resume'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -translate-y-8 translate-x-8"></div>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {locale === 'fr' ? 'Total des candidatures' : 'Total Applications'}
              </CardTitle>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {locale === 'fr' ? 'candidatures soumises' : 'applications submitted'}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-800/20">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-full -translate-y-8 translate-x-8"></div>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                {locale === 'fr' ? 'En cours' : 'In Progress'}
              </CardTitle>
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Activity className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{stats.inProgress}</div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
              {locale === 'fr' ? 'candidatures actives' : 'active applications'}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -translate-y-8 translate-x-8"></div>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                {locale === 'fr' ? 'Offres reçues' : 'Offers Received'}
              </CardTitle>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Award className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.offers}</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              {locale === 'fr' ? 'offres en attente' : 'pending offers'}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-800/20">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full -translate-y-8 translate-x-8"></div>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {locale === 'fr' ? 'Taux de réponse' : 'Response Rate'}
              </CardTitle>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.responseRate}%</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              {locale === 'fr' ? 'réponses reçues' : 'responses received'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              {locale === 'fr' ? 'Filtrer les candidatures' : 'Filter Applications'}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={locale === 'fr' ? 'Rechercher par poste ou entreprise...' : 'Search by position or company...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={locale === 'fr' ? 'Filtrer par statut' : 'Filter by status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'fr' ? 'Tous les statuts' : 'All statuses'}</SelectItem>
                <SelectItem value="applied">{locale === 'fr' ? 'Postulé' : 'Applied'}</SelectItem>
                <SelectItem value="reviewing">{locale === 'fr' ? 'En examen' : 'Under Review'}</SelectItem>
                <SelectItem value="shortlisted">{locale === 'fr' ? 'Sélectionné' : 'Shortlisted'}</SelectItem>
                <SelectItem value="interview">{locale === 'fr' ? 'Entrevue' : 'Interview'}</SelectItem>
                <SelectItem value="selected">{locale === 'fr' ? 'Sélectionné' : 'Selected'}</SelectItem>
                <SelectItem value="rejected">{locale === 'fr' ? 'Rejeté' : 'Rejected'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={locale === 'fr' ? 'Trier par' : 'Sort by'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">{locale === 'fr' ? 'Plus récent' : 'Most Recent'}</SelectItem>
                <SelectItem value="oldest">{locale === 'fr' ? 'Plus ancien' : 'Oldest First'}</SelectItem>
                <SelectItem value="company">{locale === 'fr' ? 'Entreprise' : 'Company'}</SelectItem>
                <SelectItem value="position">{locale === 'fr' ? 'Poste' : 'Position'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-16 text-center">
            <div className="relative">
              <Loader2 className="h-12 w-12 mx-auto animate-spin text-blue-600 mb-6" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-20"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {locale === 'fr' ? 'Chargement des candidatures...' : 'Loading applications...'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {locale === 'fr' ? 'Récupération de vos données...' : 'Fetching your data...'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-16 text-center">
            <div className="relative">
              <X className="h-16 w-16 mx-auto text-red-500 mb-6" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-xl opacity-20"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {locale === 'fr' ? 'Erreur de chargement' : 'Loading Error'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
                         <Button onClick={() => fetchApplications(currentPage)} className="bg-primary hover:shadow-lg">
               <Zap className="h-4 w-4 mr-2" />
               {locale === 'fr' ? 'Réessayer' : 'Retry'}
             </Button>
          </CardContent>
        </Card>
      )}

      {/* Applications List */}
      {!isLoading && !error && (
        <div className="space-y-6">
          {sortedApplications.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-16 text-center">
                <div className="relative">
                  <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-6" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full blur-xl opacity-20"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {locale === 'fr' ? 'Aucune candidature trouvée' : 'No applications found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {locale === 'fr' 
                    ? 'Essayez de modifier vos filtres ou recherchez de nouveaux emplois pour commencer votre parcours professionnel'
                    : 'Try adjusting your filters or search for new jobs to start your professional journey'}
                </p>
                                 <Button asChild className="bg-primary hover:shadow-lg">
                   <Link href="/candidate/emplois">
                     <Search className="h-4 w-4 mr-2" />
                     {locale === 'fr' ? 'Rechercher des emplois' : 'Search Jobs'}
                   </Link>
                 </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {sortedApplications.map(application => {
                const statusInfo = getStatusInfo(application.status)
                const StatusIcon = statusInfo.icon
                
                return (
                  <Card key={application._id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${statusInfo.gradient}`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${statusInfo.gradient} text-white`}>
                              <StatusIcon className="h-4 w-4" />
                            </div>
                                                         <div className="flex-1 min-w-0">
                               <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                                 {application.job.title || (locale === 'fr' ? 'Titre non spécifié' : 'Title not specified')}
                               </h3>
                             </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <MapPin className="h-3 w-3" />
                              <span>{application.job.location || (locale === 'fr' ? 'Localisation non spécifiée' : 'Location not specified')}</span>
                            </div>
                            {application.job.type && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Calendar className="h-3 w-3" />
                                <span>{application.job.type}</span>
                              </div>
                            )}
                            {application.job.salary && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <DollarSign className="h-3 w-3" />
                                <span>{application.job.salary}</span>
                              </div>
                            )}
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                {locale === 'fr' ? 'Progression' : 'Progress'}
                              </span>
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                {statusInfo.progress}%
                              </span>
                            </div>
                            <Progress value={statusInfo.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`${statusInfo.color} border`}
                          >
                            {statusInfo.text}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                          <CalendarDays className="h-3 w-3" />
                          <span>{getRelativeTime(application.createdAt)}</span>
                        </div>
                      </div>

                      {application.job.description && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {application.job.description}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Enhanced Pagination */}
      {!isLoading && !error && totalPages > 1 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? `Page ${currentPage} sur ${totalPages} • ${totalApplications} candidature(s) au total`
                  : `Page ${currentPage} of ${totalPages} • ${totalApplications} application(s) total`}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {locale === 'fr' ? 'Précédent' : 'Previous'}
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2"
                >
                  {locale === 'fr' ? 'Suivant' : 'Next'}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 