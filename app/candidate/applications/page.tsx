"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Briefcase, Search, Filter, MoreVertical, 
  Building2, MapPin, Calendar, DollarSign, 
  Clock, CheckCircle, X, Eye, Edit,
  TrendingUp, Users, Target
} from "lucide-react"
import Link from "next/link"

interface Application {
  id: number
  jobId: string
  position: string
  company: string
  companyLogo?: string
  status: 'applied' | 'reviewing' | 'interview' | 'offer' | 'rejected'
  appliedDate: string
  lastUpdate: string
  salary?: string
  location: string
  type: string
  description: string
  nextStep?: string
}

const statusColors = {
  applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  reviewing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  interview: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  offer: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
}

const statusLabels = {
  applied: { en: 'Applied', fr: 'Postulé' },
  reviewing: { en: 'Under Review', fr: 'En cours d\'examen' },
  interview: { en: 'Interview', fr: 'Entrevue' },
  offer: { en: 'Offer', fr: 'Offre reçue' },
  rejected: { en: 'Rejected', fr: 'Rejeté' }
}

export default function ApplicationsPage() {
  const { locale } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Mock data
  const applications: Application[] = [
    {
      id: 1,
      jobId: 'job1',
      position: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      status: 'interview',
      appliedDate: '2024-01-15',
      lastUpdate: '2024-01-18',
      salary: '$85,000 - $110,000',
      location: 'Montreal, QC',
      type: 'Full-time',
      description: 'Leading frontend development with React and TypeScript',
      nextStep: 'Technical interview scheduled for Jan 22'
    },
    {
      id: 2,
      jobId: 'job2',
      position: 'Full Stack Engineer',
      company: 'Innovation Labs',
      status: 'reviewing',
      appliedDate: '2024-01-12',
      lastUpdate: '2024-01-16',
      salary: '$75,000 - $95,000',
      location: 'Toronto, ON',
      type: 'Remote',
      description: 'Building scalable web applications',
      nextStep: 'Waiting for HR response'
    },
    {
      id: 3,
      jobId: 'job3',
      position: 'React Developer',
      company: 'StartupXYZ',
      status: 'applied',
      appliedDate: '2024-01-10',
      lastUpdate: '2024-01-10',
      salary: '$65,000 - $80,000',
      location: 'Vancouver, BC',
      type: 'Hybrid',
      description: 'Frontend development for e-commerce platform'
    },
    {
      id: 4,
      jobId: 'job4',
      position: 'UI/UX Developer',
      company: 'DesignStudio',
      status: 'offer',
      appliedDate: '2024-01-08',
      lastUpdate: '2024-01-19',
      salary: '$70,000 - $85,000',
      location: 'Calgary, AB',
      type: 'Full-time',
      description: 'Creating beautiful user interfaces',
      nextStep: 'Review offer details'
    },
    {
      id: 5,
      jobId: 'job5',
      position: 'JavaScript Developer',
      company: 'WebSolutions',
      status: 'rejected',
      appliedDate: '2024-01-05',
      lastUpdate: '2024-01-12',
      salary: '$60,000 - $75,000',
      location: 'Ottawa, ON',
      type: 'Full-time',
      description: 'JavaScript development for various projects'
    },
    {
      id: 6,
      jobId: 'job6',
      position: 'Frontend Lead',
      company: 'TechVision',
      status: 'reviewing',
      appliedDate: '2024-01-03',
      lastUpdate: '2024-01-14',
      salary: '$95,000 - $130,000',
      location: 'Montreal, QC',
      type: 'Hybrid',
      description: 'Leading a team of frontend developers',
      nextStep: 'Technical assessment'
    }
  ]

  // Filter applications based on search and status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
      case 'oldest':
        return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
      case 'company':
        return a.company.localeCompare(b.company)
      case 'position':
        return a.position.localeCompare(b.position)
      default:
        return 0
    }
  })

  const getStats = () => {
    const total = applications.length
    const inProgress = applications.filter(app => ['applied', 'reviewing', 'interview'].includes(app.status)).length
    const offers = applications.filter(app => app.status === 'offer').length
    const responseRate = total > 0 ? Math.round(((total - applications.filter(app => app.status === 'applied').length) / total) * 100) : 0
    
    return { total, inProgress, offers, responseRate }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {locale === 'fr' ? 'Mes candidatures' : 'My Applications'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'fr' 
              ? 'Suivez et gérez toutes vos candidatures'
              : 'Track and manage all your job applications'}
          </p>
        </div>
        <Button asChild>
          <Link href="/candidate/emplois">
            <Search className="h-4 w-4 mr-2" />
            {locale === 'fr' ? 'Rechercher des emplois' : 'Find New Jobs'}
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {locale === 'fr' ? 'Total des candidatures' : 'Total Applications'}
              </CardTitle>
              <Briefcase className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">
              {locale === 'fr' ? 'candidatures soumises' : 'applications submitted'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {locale === 'fr' ? 'En cours' : 'In Progress'}
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-gray-500 mt-1">
              {locale === 'fr' ? 'candidatures actives' : 'active applications'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {locale === 'fr' ? 'Offres reçues' : 'Offers Received'}
              </CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offers}</div>
            <p className="text-xs text-gray-500 mt-1">
              {locale === 'fr' ? 'offres en attente' : 'pending offers'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {locale === 'fr' ? 'Taux de réponse' : 'Response Rate'}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.responseRate}%</div>
            <p className="text-xs text-gray-500 mt-1">
              {locale === 'fr' ? 'réponses reçues' : 'responses received'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {locale === 'fr' ? 'Filtrer les candidatures' : 'Filter Applications'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={locale === 'fr' ? 'Rechercher par poste ou entreprise...' : 'Search by position or company...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
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
                <SelectItem value="interview">{locale === 'fr' ? 'Entrevue' : 'Interview'}</SelectItem>
                <SelectItem value="offer">{locale === 'fr' ? 'Offre' : 'Offer'}</SelectItem>
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

      {/* Applications List */}
      <div className="space-y-4">
        {sortedApplications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {locale === 'fr' ? 'Aucune candidature trouvée' : 'No applications found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {locale === 'fr' 
                  ? 'Essayez de modifier vos filtres ou recherchez de nouveaux emplois'
                  : 'Try adjusting your filters or search for new jobs'}
              </p>
              <Button asChild>
                <Link href="/candidate/emplois">
                  {locale === 'fr' ? 'Rechercher des emplois' : 'Search Jobs'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          sortedApplications.map(application => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {application.position}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {application.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {application.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {application.type}
                          </span>
                          {application.salary && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {application.salary}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <Badge 
                          variant="secondary" 
                          className={statusColors[application.status]}
                        >
                          {statusLabels[application.status][locale]}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {application.description}
                    </p>

                    {application.nextStep && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          <strong>{locale === 'fr' ? 'Prochaine étape:' : 'Next step:'}</strong> {application.nextStep}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>
                        {locale === 'fr' ? 'Postulé le' : 'Applied on'} {application.appliedDate}
                      </span>
                      <span>
                        {locale === 'fr' ? 'Dernière mise à jour:' : 'Last updated:'} {application.lastUpdate}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination placeholder */}
      {sortedApplications.length > 0 && (
        <div className="flex justify-center pt-6">
          <div className="text-sm text-gray-500 dark:text-gray-500">
            {locale === 'fr' 
              ? `Affichage de ${sortedApplications.length} candidature(s)`
              : `Showing ${sortedApplications.length} application(s)`}
          </div>
        </div>
      )}
    </div>
  )
} 