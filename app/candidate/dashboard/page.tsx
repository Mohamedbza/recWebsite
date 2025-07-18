"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Briefcase, Calendar, Clock, Eye, 
  TrendingUp, Users, Star, CheckCircle,
  ArrowUpRight, Plus, Filter, MoreHorizontal,
  Building2, MapPin, DollarSign, User, FileText
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data types
interface Application {
  id: number
  jobId: string
  position: string
  company: string
  companyLogo?: string
  status: 'applied' | 'reviewing' | 'interview' | 'offer' | 'rejected'
  date: string
  salary?: string
  location: string
  type: string
}

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  match: number
  postedDate: string
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
  applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  reviewing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  interview: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  offer: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
}

const statusLabels = {
  applied: { en: 'Applied', fr: 'Postulé' },
  reviewing: { en: 'Under Review', fr: 'En cours' },
  interview: { en: 'Interview', fr: 'Entrevue' },
  offer: { en: 'Offer', fr: 'Offre' },
  rejected: { en: 'Rejected', fr: 'Rejeté' }
}

export default function CandidateDashboardPage() {
  const { locale } = useLanguage()
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  // Mock data
  const stats: Stats = {
    totalApplications: 12,
    inProgress: 8,
    interviews: 3,
    responseRate: 67,
    profileViews: 24,
    profileCompletion: 85
  }

  const recentApplications: Application[] = [
    {
      id: 1,
      jobId: 'job1',
      position: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      status: 'interview',
      date: '2024-01-15',
      salary: '$85,000 - $110,000',
      location: 'Montreal, QC',
      type: 'Full-time'
    },
    {
      id: 2,
      jobId: 'job2',
      position: 'Full Stack Engineer',
      company: 'Innovation Labs',
      status: 'reviewing',
      date: '2024-01-12',
      salary: '$75,000 - $95,000',
      location: 'Toronto, ON',
      type: 'Remote'
    },
    {
      id: 3,
      jobId: 'job3',
      position: 'React Developer',
      company: 'StartupXYZ',
      status: 'applied',
      date: '2024-01-10',
      salary: '$65,000 - $80,000',
      location: 'Vancouver, BC',
      type: 'Hybrid'
    },
    {
      id: 4,
      jobId: 'job4',
      position: 'UI/UX Developer',
      company: 'DesignStudio',
      status: 'offer',
      date: '2024-01-08',
      salary: '$70,000 - $85,000',
      location: 'Calgary, AB',
      type: 'Full-time'
    }
  ]

  const recommendedJobs: Job[] = [
    {
      id: 'job5',
      title: 'Senior React Developer',
      company: 'WebTech Solutions',
      location: 'Montreal, QC',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      match: 95,
      postedDate: '2024-01-16'
    },
    {
      id: 'job6',
      title: 'DevOps Engineer',
      company: 'CloudFirst',
      location: 'Remote',
      type: 'Remote',
      salary: '$85,000 - $115,000',
      match: 88,
      postedDate: '2024-01-15'
    },
    {
      id: 'job7',
      title: 'Frontend Lead',
      company: 'TechVision',
      location: 'Toronto, ON',
      type: 'Hybrid',
      salary: '$95,000 - $130,000',
      match: 92,
      postedDate: '2024-01-14'
    }
  ]

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
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {locale === 'fr' ? `Bonjour, ${user.name || 'Candidat'}!` : `Hello, ${user.name || 'Candidate'}!`}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {locale === 'fr' 
                ? 'Voici un résumé de votre activité récente' 
                : 'Here\'s a summary of your recent activity'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/candidate/emplois">
                <Plus className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Rechercher' : 'Find Jobs'}
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/candidate/profile">
                <User className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Profil' : 'Profile'}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {locale === 'fr' ? 'Candidatures totales' : 'Total Applications'}
              </CardTitle>
              <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.totalApplications}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2 {locale === 'fr' ? 'cette semaine' : 'this week'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {locale === 'fr' ? 'En cours' : 'In Progress'}
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.inProgress}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              {locale === 'fr' ? 'candidatures actives' : 'active applications'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                {locale === 'fr' ? 'Entrevues' : 'Interviews'}
              </CardTitle>
              <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.interviews}</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              {locale === 'fr' ? 'prévues' : 'scheduled'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
                {locale === 'fr' ? 'Taux de réponse' : 'Response Rate'}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.responseRate}%</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              +5% {locale === 'fr' ? 'ce mois' : 'this month'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                {locale === 'fr' ? 'Complétion du profil' : 'Profile Completion'}
              </CardTitle>
              <CardDescription>
                {locale === 'fr' 
                  ? 'Complétez votre profil pour attirer plus d\'employeurs' 
                  : 'Complete your profile to attract more employers'}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {stats.profileCompletion}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={stats.profileCompletion} className="h-2 mb-4" />
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
              {locale === 'fr' ? 'Info de base' : 'Basic Info'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
              {locale === 'fr' ? 'Expérience' : 'Experience'}
            </Badge>
            <Badge variant="outline" className="text-xs text-orange-600 dark:text-orange-400">
              <Clock className="h-3 w-3 mr-1" />
              {locale === 'fr' ? 'Portfolio' : 'Portfolio'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-purple-600" />
                {locale === 'fr' ? 'Candidatures récentes' : 'Recent Applications'}
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/candidate/applications">
                  {locale === 'fr' ? 'Voir tout' : 'View All'}
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.slice(0, 3).map(application => (
                <div 
                  key={application.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {application.position}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <Building2 className="h-3 w-3" />
                          {application.company}
                          <span>•</span>
                          <MapPin className="h-3 w-3" />
                          {application.location}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {locale === 'fr' ? 'Postulé le' : 'Applied'} {application.date}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 ${statusColors[application.status]}`}
                      >
                        {statusLabels[application.status][locale]}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                {locale === 'fr' ? 'Emplois recommandés' : 'Recommended Jobs'}
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/candidate/emplois">
                  {locale === 'fr' ? 'Voir plus' : 'View More'}
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.slice(0, 3).map(job => (
                <div 
                  key={job.id} 
                  className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {job.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Building2 className="h-3 w-3" />
                        {job.company}
                        <span>•</span>
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                      {job.match}% {locale === 'fr' ? 'compatible' : 'match'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {job.salary}
                    </span>
                    <span>{job.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === 'fr' ? 'Actions rapides' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/candidate/profile">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{locale === 'fr' ? 'Modifier le profil' : 'Edit Profile'}</div>
                    <div className="text-xs text-gray-500">{locale === 'fr' ? 'Mettre à jour vos informations' : 'Update your information'}</div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/candidate/resume">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{locale === 'fr' ? 'Gérer le CV' : 'Manage Resume'}</div>
                    <div className="text-xs text-gray-500">{locale === 'fr' ? 'Télécharger ou modifier' : 'Upload or edit'}</div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/candidate/interviews">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{locale === 'fr' ? 'Mes entrevues' : 'My Interviews'}</div>
                    <div className="text-xs text-gray-500">{locale === 'fr' ? 'Voir le calendrier' : 'View schedule'}</div>
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