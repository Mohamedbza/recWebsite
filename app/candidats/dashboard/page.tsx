"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User, Briefcase, ChevronRight, Calendar, 
  FileText, Settings, Search, BookOpen, Award
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CandidateDashboardPage() {
  const { locale } = useLanguage()
  const { user, isLoggedIn, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("applications")

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

  // Sample data for the dashboard
  const applications = [
    { id: 1, position: "Développeur Full Stack", company: "TechCorp Inc.", status: "En cours", date: "2024-01-15" },
    { id: 2, position: "Ingénieur logiciel", company: "Innovation Labs", status: "Entrevue", date: "2024-01-10" },
    { id: 3, position: "Développeur Frontend", company: "StartupXYZ", status: "Nouveau", date: "2024-01-08" }
  ]

  const recommendedJobs = [
    { id: 1, title: "Développeur React", company: "WebTech Solutions", location: "Montréal, QC", type: "Temps plein" },
    { id: 2, title: "Ingénieur DevOps", company: "CloudFirst", location: "Toronto, ON", type: "Télétravail" },
    { id: 3, title: "Analyste de données", company: "DataCorp", location: "Vancouver, BC", type: "Hybride" }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {locale === 'fr' ? 'Tableau de bord candidat' : 'Candidate Dashboard'}
                </h1>
                <p className="text-muted-foreground">
                  {locale === 'fr' ? `Bienvenue, ${user.name || user.email}` : `Welcome, ${user.name || user.email}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  {locale === 'fr' ? 'Rechercher des emplois' : 'Search Jobs'}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={logout}
                >
                  <Settings className="h-4 w-4" />
                  {locale === 'fr' ? 'Déconnexion' : 'Logout'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard Content */}
        <section className="py-8">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
              {/* Sidebar Navigation */}
              <div className="bg-background/80 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg h-fit">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm text-muted-foreground mb-2 px-2">
                    {locale === 'fr' ? 'NAVIGATION' : 'NAVIGATION'}
                  </h3>
                  <Button 
                    variant={activeTab === "applications" ? "secondary" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("applications")}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    {locale === 'fr' ? 'Mes candidatures' : 'My Applications'}
                  </Button>
                  <Button 
                    variant={activeTab === "jobs" ? "secondary" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("jobs")}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {locale === 'fr' ? 'Emplois recommandés' : 'Recommended Jobs'}
                  </Button>
                  <Button 
                    variant={activeTab === "profile" ? "secondary" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {locale === 'fr' ? 'Mon profil' : 'My Profile'}
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="font-medium text-sm text-muted-foreground mb-2 px-2">
                    {locale === 'fr' ? 'OUTILS' : 'TOOLS'}
                  </h3>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Mon CV' : 'My Resume'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Formations' : 'Training'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Certifications' : 'Certifications'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Entrevues' : 'Interviews'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  {/* Applications Tab */}
                  <TabsContent value="applications" className="space-y-6 mt-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-primary" />
                        {locale === 'fr' ? 'Mes candidatures' : 'My Applications'}
                      </h2>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        {locale === 'fr' ? 'Voir tout' : 'View all'}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Candidatures totales' : 'Total Applications'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">12</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'En cours' : 'In Progress'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">5</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Entrevues' : 'Interviews'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">3</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Taux de réponse' : 'Response Rate'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">42%</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Applications List */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{locale === 'fr' ? 'Candidatures récentes' : 'Recent Applications'}</CardTitle>
                        <CardDescription>
                          {locale === 'fr' ? 'Vos candidatures les plus récentes' : 'Your most recent job applications'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {applications.map(application => (
                            <div key={application.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex flex-col">
                                <span className="font-medium">{application.position}</span>
                                <span className="text-sm text-muted-foreground">{application.company}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm">{application.date}</span>
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                  {application.status}
                                </Badge>
                                <Button variant="ghost" size="sm">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          {locale === 'fr' ? 'Voir toutes les candidatures' : 'View all applications'}
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  {/* Recommended Jobs Tab */}
                  <TabsContent value="jobs" className="space-y-6 mt-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold flex items-center">
                        <Search className="h-5 w-5 mr-2 text-secondary" />
                        {locale === 'fr' ? 'Emplois recommandés' : 'Recommended Jobs'}
                      </h2>
                      <Link href="/candidats/emplois">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          {locale === 'fr' ? 'Voir tous les emplois' : 'View all jobs'}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    <div className="grid gap-4">
                      {recommendedJobs.map(job => (
                        <Card key={job.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{job.title}</CardTitle>
                                <CardDescription>{job.company} • {job.location}</CardDescription>
                              </div>
                              <Badge variant="secondary">{job.type}</Badge>
                            </div>
                          </CardHeader>
                          <CardFooter>
                            <Button className="w-full">
                              {locale === 'fr' ? 'Postuler' : 'Apply Now'}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6 mt-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        {locale === 'fr' ? 'Mon profil' : 'My Profile'}
                      </h2>
                      <Button variant="outline" size="sm">
                        {locale === 'fr' ? 'Modifier' : 'Edit'}
                      </Button>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>{locale === 'fr' ? 'Informations personnelles' : 'Personal Information'}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Nom' : 'Name'}
                          </label>
                          <p className="font-medium">{user.name || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Localisation' : 'Location'}
                          </label>
                          <p className="font-medium">{user.location || 'N/A'}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 