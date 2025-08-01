"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logoutUser } from "@/store/slices/accountSlice"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Eye, 
  MessageSquare, 
  Plus,
  Settings,
  Building2,
  ChevronRight,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Bell,
  Globe,
  Shield,
  Lock,
  Mail,
  Smartphone,
  Save,
  User
} from "lucide-react"
import Link from "next/link"
import { EmployerAuthProvider } from "@/contexts/EmployerAuthContext"
import { EmployerJob, EmployerApplication, DashboardStats as DashboardStatsType } from "@/lib/employer-api"
import DashboardStats from "@/components/employer/DashboardStats"
import { 
  loadDashboardData, 
  createEmployerJob, 
  updateEmployerJob, 
  deleteEmployerJob, 
  updateApplicationStatus,
  clearErrors,
  clearStatsError,
  clearJobsError,
  clearApplicationsError 
} from "@/store/slices/employerDashboardSlice"
import JobsManagement from "@/components/employer/JobsManagement"
import ApplicationsKanban from "@/components/employer/ApplicationsKanban"
import JobModal from "@/components/employer/JobModal"
import ProfileManagement from "@/components/employer/ProfileManagement"
import { motion } from "framer-motion"
import { getLocationLabel } from "@/lib/location-utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

function DashboardContent() {
  const { locale } = useLanguage()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState("overview")

  // Use Redux authentication state instead of EmployerAuthContext
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAppSelector((state) => state.account)
  
  // Redux state
  const {
    stats: dashboardStats,
    statsLoading,
    statsError,
    jobs,
    jobsLoading,
    jobsError,
    applications,
    applicationsLoading,
    applicationsError,
    initialLoading,
  } = useAppSelector((state) => state.employerDashboard)

  // Check if user is authenticated and is an employer
  const isLoggedIn = isAuthenticated && authUser?.role === 'employer'
  const user = authUser

  // Combined loading and error states
  const isLoading = authLoading || initialLoading || (statsLoading && jobsLoading && applicationsLoading)
  const error = statsError || jobsError || applicationsError

  // State for modals and actions
  const [selectedJob, setSelectedJob] = useState<EmployerJob | null>(null)
  const [showJobModal, setShowJobModal] = useState(false)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<EmployerApplication | null>(null);
  const [editingJob, setEditingJob] = useState<EmployerJob | null>(null);
  
  // Settings state
  const [employerSettings, setEmployerSettings] = useState({
    notifications: {
      emailNotifications: true,
      applicationAlerts: true,
      jobExpiryReminders: true,
      weeklyReport: true,
      smsNotifications: false
    },
    privacy: {
      companyProfileVisible: true,
      showContactInfo: true,
      allowDirectMessages: true,
      showJobStatistics: false
    },
    preferences: {
      language: locale,
      jobAutoExpiry: '30',
      defaultJobType: 'full-time',
      autoReplyEnabled: false
    }
  });

  // Load data on component mount using Redux
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadDashboardData())
    }
  }, [isLoggedIn, dispatch])

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground text-center">
              {locale === 'fr' ? 'Vérification de l\'authentification...' : 'Checking authentication...'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Refresh data function
  const handleRefreshData = () => {
    dispatch(clearErrors())
    dispatch(loadDashboardData())
  }

  // Handle job actions
  const handleJobClick = (job: EmployerJob) => {
    setSelectedJob(job)
    setShowJobModal(true)
  }

  const handleEditJob = (job: EmployerJob) => {
    setEditingJob(job)
    setShowJobModal(true)
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      await dispatch(deleteEmployerJob(jobId)).unwrap()
    } catch (err) {
      console.error('Failed to delete job:', err)
      alert(locale === 'fr' ? 'Erreur lors de la suppression' : 'Error deleting job')
    }
  }

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowJobModal(true);
  };

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
      if (editingJob) {
        // Update existing job
        await dispatch(updateEmployerJob({ jobId: editingJob._id, jobData })).unwrap()
      } else {
        // Create new job
        await dispatch(createEmployerJob(jobData)).unwrap()
      }
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
      await dispatch(updateApplicationStatus({ applicationId, status: newStatus })).unwrap()
    } catch (err) {
      console.error('Failed to update application status:', err)
      alert(locale === 'fr' ? 'Erreur lors de la mise à jour' : 'Error updating status')
    }
  }

  // Settings handlers
  const handleOpenSettings = () => {
    setShowSettingsModal(true);
  };

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setEmployerSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    try {
      // TODO: Implement API call to save settings
      console.log('Saving settings:', employerSettings);
      
      // Show success feedback (you can replace this with a toast notification)
      alert(locale === 'fr' 
        ? 'Paramètres sauvegardés avec succès!' 
        : 'Settings saved successfully!'
      );
      
      // Close the modal
      setShowSettingsModal(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      
      // Show error feedback (you can replace this with a toast notification)
      alert(locale === 'fr' 
        ? 'Erreur lors de la sauvegarde des paramètres.' 
        : 'Error saving settings.'
      );
    }
  };

  // Redirect to login if not authenticated (instead of showing login required message)
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login')
      } else if (authUser?.role === 'candidate') {
        // If user is a candidate trying to access employer routes, logout and redirect
        dispatch(logoutUser())
        router.push('/login')
      } else if (authUser?.role !== 'employer') {
        router.push('/login')
      }
    }
  }, [authLoading, isAuthenticated, authUser, router, dispatch])

  // Don't render anything if not logged in (will redirect)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground text-center">
              {locale === 'fr' ? 'Redirection vers la page de connexion...' : 'Redirecting to login...'}
            </p>
          </div>
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
        <Button onClick={handleRefreshData} disabled={isLoading}>
          {isLoading ? (
            locale === 'fr' ? 'Chargement...' : 'Loading...'
          ) : (
            locale === 'fr' ? 'Réessayer' : 'Retry'
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 pt-16">
      <main className="flex-1">
        {/* Enhanced Header Section */}
        <section className="relative overflow-hidden py-12">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3">
                <motion.h1 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent"
                >
                  {locale === 'fr' ? 'Tableau de bord employeur' : 'Employer Dashboard'}
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-muted-foreground flex items-center gap-2"
                >
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  {locale === 'fr' 
                    ? `Bienvenue, ${user?.name || 'Employeur'}`
                    : `Welcome, ${user?.name || 'Employer'}`
                  }
                </motion.div>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleCreateJob} 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {locale === 'fr' ? 'Publier une offre' : 'Post a Job'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleOpenSettings}
                  className="border-2 border-white/20 hover:bg-white/10 hover:border-primary/30 backdrop-blur-sm font-semibold px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2"
                >
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              {/* Enhanced Tab Navigation */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-2 border border-white/20 shadow-lg">
                <TabsList className="grid w-full grid-cols-4 bg-transparent gap-2 p-0">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 font-semibold py-3 transition-all duration-300"
                  >
                    {locale === 'fr' ? 'Aperçu' : 'Overview'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="jobs"
                    className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 font-semibold py-3 transition-all duration-300"
                  >
                    {locale === 'fr' ? 'Offres d\'emploi' : 'Jobs'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="applications"
                    className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 font-semibold py-3 transition-all duration-300"
                  >
                    {locale === 'fr' ? 'Candidatures' : 'Applications'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="profile"
                    className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 font-semibold py-3 transition-all duration-300"
                  >
                    {locale === 'fr' ? 'Profil' : 'Profile'}
                  </TabsTrigger>
                </TabsList>
              </div>

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
                    {dashboardStats ? (
                      <DashboardStats stats={dashboardStats} />
                    ) : isLoading ? (
                      <DashboardStats stats={{} as any} isLoading={true} />
                    ) : error ? (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 text-red-500">⚠️</div>
                          <h3 className="font-medium text-red-800">
                            {locale === 'fr' ? 'Erreur de chargement' : 'Loading Error'}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-red-700">
                          {locale === 'fr' 
                            ? 'Impossible de charger les statistiques du tableau de bord.'
                            : 'Unable to load dashboard statistics.'}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <p className="text-center text-gray-500">
                          {locale === 'fr' 
                            ? 'Aucune donnée statistique disponible.'
                            : 'No statistical data available.'}
                        </p>
                      </div>
                    )}

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Recent Applications */}
                      <Card className="border-0 bg-gradient-to-br from-white/90 via-white/80 to-blue-50/50 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-blue-950/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                        <CardHeader className="pb-6">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center shadow-lg">
                              <Users className="h-7 w-7 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl text-foreground">
                                {locale === 'fr' ? 'Candidatures récentes' : 'Recent Applications'}
                              </CardTitle>
                              <CardDescription className="text-muted-foreground font-medium">
                                {locale === 'fr' 
                                  ? 'Les dernières candidatures reçues'
                                  : 'Latest applications received'
                                }
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {applications.slice(0, 5).map((application) => (
                              <div key={application._id} className="group flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-white/20 hover:border-blue-300/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-300 cursor-pointer">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-foreground group-hover:text-blue-700 transition-colors">
                                    {application.candidate.firstName} {application.candidate.lastName}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {application.job.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs">
                                    {application.status}
                                  </Badge>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-xl group-hover:scale-110 transition-all duration-300"
                                    onClick={() => handleApplicationClick(application)}
                                  >
                                    <Eye className="h-4 w-4 text-blue-600" />
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
                      <Card className="border-0 bg-gradient-to-br from-white/90 via-white/80 to-purple-50/50 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-purple-950/50 backdrop-blur-xl shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
                        <CardHeader className="pb-6">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center shadow-lg">
                              <Briefcase className="h-7 w-7 text-purple-600" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl text-foreground">
                                {locale === 'fr' ? 'Offres récentes' : 'Recent Jobs'}
                              </CardTitle>
                              <CardDescription className="text-muted-foreground font-medium">
                                {locale === 'fr' 
                                  ? 'Vos dernières offres d\'emploi'
                                  : 'Your latest job postings'
                                }
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {jobs.slice(0, 5).map((job) => (
                              <div key={job._id} className="group flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-white/20 hover:border-purple-300/50 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-all duration-300 cursor-pointer">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-foreground group-hover:text-purple-700 transition-colors">{job.title}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {getLocationLabel(job.location, locale as 'en' | 'fr')} • {job.jobType}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-800 text-xs">
                                    {job.status}
                                  </Badge>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-xl group-hover:scale-110 transition-all duration-300"
                                    onClick={() => handleJobClick(job)}
                                  >
                                    <Eye className="h-4 w-4 text-purple-600" />
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
        job={editingJob}
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

      {/* Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {locale === 'fr' ? 'Paramètres' : 'Settings'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'fr' 
                ? 'Gérez vos préférences et paramètres de compte'
                : 'Manage your account preferences and settings'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Notifications Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {locale === 'fr' ? 'Notifications' : 'Notifications'}
                </CardTitle>
                <CardDescription>
                  {locale === 'fr' 
                    ? 'Choisissez comment vous souhaitez être notifié'
                    : 'Choose how you want to be notified'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Notifications par email' : 'Email Notifications'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Recevez des mises à jour par email'
                        : 'Receive updates via email'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      handleSettingChange('notifications', 'emailNotifications', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Alertes de candidatures' : 'Application Alerts'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Notification immédiate pour les nouvelles candidatures'
                        : 'Instant notification for new applications'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.notifications.applicationAlerts}
                    onCheckedChange={(checked) => 
                      handleSettingChange('notifications', 'applicationAlerts', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Rappels d\'expiration' : 'Job Expiry Reminders'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Rappels avant l\'expiration des offres'
                        : 'Reminders before job postings expire'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.notifications.jobExpiryReminders}
                    onCheckedChange={(checked) => 
                      handleSettingChange('notifications', 'jobExpiryReminders', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Rapport hebdomadaire' : 'Weekly Report'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Résumé hebdomadaire de l\'activité'
                        : 'Weekly summary of activity'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.notifications.weeklyReport}
                    onCheckedChange={(checked) => 
                      handleSettingChange('notifications', 'weeklyReport', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Notifications SMS' : 'SMS Notifications'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Notifications urgentes par SMS'
                        : 'Urgent notifications via SMS'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.notifications.smsNotifications}
                    onCheckedChange={(checked) => 
                      handleSettingChange('notifications', 'smsNotifications', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {locale === 'fr' ? 'Confidentialité' : 'Privacy'}
                </CardTitle>
                <CardDescription>
                  {locale === 'fr' 
                    ? 'Contrôlez la visibilité de vos informations'
                    : 'Control the visibility of your information'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Profil d\'entreprise visible' : 'Company Profile Visible'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Votre profil est visible aux candidats'
                        : 'Your profile is visible to candidates'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.privacy.companyProfileVisible}
                    onCheckedChange={(checked) => 
                      handleSettingChange('privacy', 'companyProfileVisible', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Afficher les informations de contact' : 'Show Contact Information'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Email et téléphone visibles publiquement'
                        : 'Email and phone publicly visible'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.privacy.showContactInfo}
                    onCheckedChange={(checked) => 
                      handleSettingChange('privacy', 'showContactInfo', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Autoriser les messages directs' : 'Allow Direct Messages'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Les candidats peuvent vous contacter directement'
                        : 'Candidates can contact you directly'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.privacy.allowDirectMessages}
                    onCheckedChange={(checked) => 
                      handleSettingChange('privacy', 'allowDirectMessages', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Afficher les statistiques d\'emploi' : 'Show Job Statistics'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Nombre de vues et candidatures visibles'
                        : 'View and application counts visible'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.privacy.showJobStatistics}
                    onCheckedChange={(checked) => 
                      handleSettingChange('privacy', 'showJobStatistics', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferences Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {locale === 'fr' ? 'Préférences' : 'Preferences'}
                </CardTitle>
                <CardDescription>
                  {locale === 'fr' 
                    ? 'Personnalisez votre expérience'
                    : 'Customize your experience'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    {locale === 'fr' ? 'Langue' : 'Language'}
                  </Label>
                  <Select
                    value={employerSettings.preferences.language}
                    onValueChange={(value) => 
                      handleSettingChange('preferences', 'language', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    {locale === 'fr' ? 'Expiration automatique des emplois (jours)' : 'Auto Job Expiry (days)'}
                  </Label>
                  <Select
                    value={employerSettings.preferences.jobAutoExpiry}
                    onValueChange={(value) => 
                      handleSettingChange('preferences', 'jobAutoExpiry', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 {locale === 'fr' ? 'jours' : 'days'}</SelectItem>
                      <SelectItem value="30">30 {locale === 'fr' ? 'jours' : 'days'}</SelectItem>
                      <SelectItem value="45">45 {locale === 'fr' ? 'jours' : 'days'}</SelectItem>
                      <SelectItem value="60">60 {locale === 'fr' ? 'jours' : 'days'}</SelectItem>
                      <SelectItem value="90">90 {locale === 'fr' ? 'jours' : 'days'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    {locale === 'fr' ? 'Type d\'emploi par défaut' : 'Default Job Type'}
                  </Label>
                  <Select
                    value={employerSettings.preferences.defaultJobType}
                    onValueChange={(value) => 
                      handleSettingChange('preferences', 'defaultJobType', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
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
                      <SelectItem value="freelance">
                        {locale === 'fr' ? 'Freelance' : 'Freelance'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      {locale === 'fr' ? 'Réponse automatique activée' : 'Auto Reply Enabled'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'fr' 
                        ? 'Réponse automatique aux candidatures'
                        : 'Automatic reply to applications'}
                    </p>
                  </div>
                  <Switch
                    checked={employerSettings.preferences.autoReplyEnabled}
                    onCheckedChange={(checked) => 
                      handleSettingChange('preferences', 'autoReplyEnabled', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </Button>
            <Button onClick={handleSaveSettings} className="bg-primary text-white">
              <Save className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Enregistrer' : 'Save Settings'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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