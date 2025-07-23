"use client"

import React, { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, Briefcase, 
  Settings,
  Plus, Eye
} from "lucide-react"
import Link from "next/link"
import { EmployerAuthProvider } from "@/contexts/EmployerAuthContext"
import { employerApiService, EmployerJob, EmployerApplication, DashboardStats as DashboardStatsType } from "@/lib/employer-api"
import DashboardStats from "@/components/employer/DashboardStats"
import JobsManagement from "@/components/employer/JobsManagement"
import ApplicationsKanban from "@/components/employer/ApplicationsKanban"
import JobModal from "@/components/employer/JobModal"
import ProfileManagement from "@/components/employer/ProfileManagement"
import { motion } from "framer-motion"
import { getLocationLabel } from "@/lib/location-utils"

function DashboardContent() {
  const { locale } = useLanguage()
  const { user, isLoggedIn } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // State for data
  const [dashboardStats, setDashboardStats] = useState<DashboardStatsType | null>(null)
  const [jobs, setJobs] = useState<EmployerJob[]>([])
  const [applications, setApplications] = useState<EmployerApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State for modals and actions
  const [selectedJob, setSelectedJob] = useState<EmployerJob | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<EmployerApplication | null>(null)
  const [showJobModal, setShowJobModal] = useState(false)
  const [showApplicationModal, setShowApplicationModal] = useState(false)

  // Load data on component mount
  useEffect(() => {
    if (isLoggedIn) {
      loadDashboardData()
    }
  }, [isLoggedIn])

  const loadDashboardData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Load all data in parallel
      const [statsData, jobsData, applicationsData] = await Promise.all([
        employerApiService.getDashboardStats(),
        employerApiService.getJobs({ limit: 100 }),
        employerApiService.getApplications({ limit: 100 })
      ])

      setDashboardStats(statsData)
      setJobs(jobsData.jobs)
      setApplications(applicationsData.applications)
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle job actions
  const handleJobClick = (job: EmployerJob) => {
    setSelectedJob(job)
    setShowJobModal(true)
  }

  const handleEditJob = (job: EmployerJob) => {
    setSelectedJob(job)
    setShowJobModal(true)
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      await employerApiService.deleteJob(jobId)
      // Reload data
      await loadDashboardData()
    } catch (err) {
      console.error('Failed to delete job:', err)
      alert(locale === 'fr' ? 'Erreur lors de la suppression' : 'Error deleting job')
    }
  }

  const handleCreateJob = () => {
    setSelectedJob(null)
    setShowJobModal(true)
  }

  const handleSubmitJob = async (jobData: {
    title: string;
    location: string;
    address?: string;
    isRemote: boolean;
    jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
    contractType: 'permanent' | 'contract' | 'temporary' | 'internship';
    experienceLevel: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
    department?: string;
    salary?: string;
    description: string;
    requirements?: string;
    responsibilities?: string[];
    qualifications?: string[];
    benefits?: string[];
    skills?: string[];
    applicationDeadline?: string;
    applicationUrl?: string;
    status: 'active' | 'inactive' | 'draft' | 'closed' | 'expired';
    flags?: {
      isFeatured: boolean;
      isUrgent: boolean;
    };
  }) => {
    try {
      if (selectedJob) {
        // Update existing job
        await employerApiService.updateJob(selectedJob._id, jobData)
      } else {
        // Create new job
        await employerApiService.createJob(jobData)
      }
      // Reload data
      await loadDashboardData()
    } catch (err) {
      console.error('Failed to submit job:', err)
      throw err
    }
  }

  // Handle application actions
  const handleApplicationClick = (application: EmployerApplication) => {
    setSelectedApplication(application)
    setShowApplicationModal(true)
  }

  const handleApplicationStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      await employerApiService.updateApplicationStatus(applicationId, newStatus)
      // Reload applications
      const applicationsData = await employerApiService.getApplications({ limit: 100 })
      setApplications(applicationsData.applications)
    } catch (err) {
      console.error('Failed to update application status:', err)
      alert(locale === 'fr' ? 'Erreur lors de la mise à jour' : 'Error updating status')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">
          {locale === 'fr' ? 'Connexion requise' : 'Login required'}
        </h2>
        <p className="mb-6 text-muted-foreground text-center max-w-md">
          {locale === 'fr'
            ? "Vous devez être connecté en tant qu'employeur pour accéder au tableau de bord."
            : "You must be logged in as an employer to access the dashboard."}
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/employeurs/login">
              {locale === 'fr' ? 'Se connecter' : 'Login'}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/employeurs/register">
              {locale === 'fr' ? 'S\'inscrire' : 'Register'}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          {locale === 'fr' ? 'Erreur' : 'Error'}
        </h2>
        <p className="mb-6 text-muted-foreground text-center max-w-md">
          {error}
        </p>
        <Button onClick={loadDashboardData}>
          {locale === 'fr' ? 'Réessayer' : 'Retry'}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  {locale === 'fr' ? 'Tableau de bord employeur' : 'Employer Dashboard'}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground"
                >
                  {locale === 'fr' 
                    ? `Bienvenue, ${user?.name || 'Employeur'}`
                    : `Welcome, ${user?.name || 'Employer'}`
                  }
                </motion.p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCreateJob} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {locale === 'fr' ? 'Publier une offre' : 'Post a Job'}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {locale === 'fr' ? 'Paramètres' : 'Settings'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard Content */}
        <section className="py-8">
          <div className="container">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Tab Navigation */}
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">
                  {locale === 'fr' ? 'Aperçu' : 'Overview'}
                </TabsTrigger>
                <TabsTrigger value="jobs">
                  {locale === 'fr' ? 'Offres d\'emploi' : 'Jobs'}
                </TabsTrigger>
                <TabsTrigger value="applications">
                  {locale === 'fr' ? 'Candidatures' : 'Applications'}
                </TabsTrigger>
                <TabsTrigger value="profile">
                  {locale === 'fr' ? 'Profil' : 'Profile'}
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-0">
                {isLoading ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i} className="animate-pulse">
                          <CardHeader className="pb-2">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                          </CardHeader>
                          <CardContent>
                            <div className="h-8 bg-gray-200 rounded w-16"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Quick Stats */}
                    {dashboardStats && (
                      <DashboardStats stats={dashboardStats} />
                    )}

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Recent Applications */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            {locale === 'fr' ? 'Candidatures récentes' : 'Recent Applications'}
                          </CardTitle>
                          <CardDescription>
                            {locale === 'fr' 
                              ? 'Les dernières candidatures reçues'
                              : 'Latest applications received'
                            }
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {applications.slice(0, 5).map((application) => (
                              <div key={application._id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {application.candidate.firstName} {application.candidate.lastName}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {application.job.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {application.status}
                                  </Badge>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleApplicationClick(application)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            {applications.length === 0 && (
                              <div className="text-center py-8 text-muted-foreground">
                                <Users className="h-8 w-8 mx-auto mb-2" />
                                <p className="text-sm">
                                  {locale === 'fr' 
                                    ? 'Aucune candidature pour le moment'
                                    : 'No applications yet'
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recent Jobs */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            {locale === 'fr' ? 'Offres récentes' : 'Recent Jobs'}
                          </CardTitle>
                          <CardDescription>
                            {locale === 'fr' 
                              ? 'Vos dernières offres d\'emploi'
                              : 'Your latest job postings'
                            }
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {jobs.slice(0, 5).map((job) => (
                              <div key={job._id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex flex-col">
                                  <span className="font-medium">{job.title}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {getLocationLabel(job.location, locale as 'en' | 'fr')} • {job.jobType}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {job.status}
                                  </Badge>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleJobClick(job)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            {jobs.length === 0 && (
                              <div className="text-center py-8 text-muted-foreground">
                                <Briefcase className="h-8 w-8 mx-auto mb-2" />
                                <p className="text-sm">
                                  {locale === 'fr' 
                                    ? 'Aucune offre pour le moment'
                                    : 'No jobs yet'
                                  }
                                </p>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-2"
                                  onClick={handleCreateJob}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  {locale === 'fr' ? 'Créer une offre' : 'Create Job'}
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-6 mt-0">
                <JobsManagement
                  jobs={jobs}
                  onJobClick={handleJobClick}
                  onEditJob={handleEditJob}
                  onDeleteJob={handleDeleteJob}
                  onCreateJob={handleCreateJob}
                  isLoading={isLoading}
                />
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-6 mt-0">
                <ApplicationsKanban
                  applications={applications}
                  onApplicationClick={handleApplicationClick}
                  onStatusUpdate={handleApplicationStatusUpdate}
                  isLoading={isLoading}
                />
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6 mt-0">
                <ProfileManagement isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Job Modal */}
      <JobModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        job={selectedJob}
        onSubmit={handleSubmitJob}
        isLoading={false}
      />

      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {locale === 'fr' ? 'Détails de la candidature' : 'Application Details'}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">
                  {locale === 'fr' ? 'Candidat' : 'Candidate'}
                </h4>
                <p>
                  {selectedApplication.candidate.firstName} {selectedApplication.candidate.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedApplication.candidate.email}
                </p>
              </div>
              <div>
                <h4 className="font-medium">
                  {locale === 'fr' ? 'Poste' : 'Position'}
                </h4>
                <p>{selectedApplication.job.title}</p>
              </div>
              <div>
                <h4 className="font-medium">
                  {locale === 'fr' ? 'Statut' : 'Status'}
                </h4>
                <Badge variant="outline">{selectedApplication.status}</Badge>
              </div>
              {selectedApplication.coverLetter && (
                <div>
                  <h4 className="font-medium">
                    {locale === 'fr' ? 'Lettre de motivation' : 'Cover Letter'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.coverLetter}
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <Button variant="outline" onClick={() => setShowApplicationModal(false)}>
                {locale === 'fr' ? 'Fermer' : 'Close'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function EmployerDashboardPage() {
  return (
    <EmployerAuthProvider>
      <DashboardContent />
    </EmployerAuthProvider>
  )
} 