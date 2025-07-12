"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, Users, Briefcase, ChevronRight, PieChart, 
  BarChart3, Calendar, FileText, Settings, Plane
} from "lucide-react"
import Link from "next/link"
import { EmployerAuthProvider, useEmployerAuth } from "@/contexts/EmployerAuthContext"

function DashboardContent() {
  const { t, locale } = useLanguage()
  const { isEmployerLoggedIn, login } = useEmployerAuth()
  const [activeTab, setActiveTab] = useState("aerospace")

  if (!isEmployerLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">{locale === 'fr' ? 'Connexion requise' : 'Login required'}</h2>
        <p className="mb-6 text-muted-foreground text-center max-w-md">
          {locale === 'fr'
            ? "Vous devez être connecté en tant qu'employeur pour accéder au tableau de bord."
            : "You must be logged in as an employer to access the dashboard."}
        </p>
        <Button onClick={() => { login(); }}>
          {locale === 'fr' ? 'Se connecter en tant qu\'employeur (démo)' : 'Login as Employer (demo)'}
        </Button>
      </div>
    )
  }

  // Sample data for the dashboard
  const aerospaceCandidates = [
    { id: 1, name: "Alexandre Dubois", position: "Ingénieur aéronautique", experience: "8 ans", status: "Nouveau" },
    { id: 2, name: "Marie Tremblay", position: "Technicien aérospatial", experience: "5 ans", status: "En cours" },
    { id: 3, name: "Jean Lefebvre", position: "Spécialiste en matériaux composites", experience: "10 ans", status: "Entrevue" }
  ]

  const otherCandidates = [
    { id: 4, name: "Sophie Martin", position: "Développeur Full Stack", experience: "4 ans", status: "Nouveau" },
    { id: 5, name: "Pierre Lavoie", position: "Comptable", experience: "7 ans", status: "En cours" },
    { id: 6, name: "Isabelle Roy", position: "Directrice marketing", experience: "12 ans", status: "Entrevue" }
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
                  {locale === 'fr' ? 'Tableau de bord employeur' : 'Employer Dashboard'}
                </h1>
                <p className="text-muted-foreground">
                  {locale === 'fr' ? 'Gérez vos offres d\'emploi et candidats' : 'Manage your job listings and candidates'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {locale === 'fr' ? 'Publier une offre' : 'Post a Job'}
                </Button>
                <Button className="flex items-center gap-2">
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
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
              {/* Sidebar Navigation */}
              <div className="bg-background/80 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg h-fit">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm text-muted-foreground mb-2 px-2">
                    {locale === 'fr' ? 'CATÉGORIES' : 'CATEGORIES'}
                  </h3>
                  <Button 
                    variant={activeTab === "aerospace" ? "secondary" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("aerospace")}
                  >
                    <Plane className="h-4 w-4 mr-2" />
                    {locale === 'fr' ? 'Aérospatiale' : 'Aerospace'}
                  </Button>
                  <Button 
                    variant={activeTab === "other" ? "secondary" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("other")}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    {locale === 'fr' ? 'Autres industries' : 'Other industries'}
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="font-medium text-sm text-muted-foreground mb-2 px-2">
                    {locale === 'fr' ? 'BACKOFFICE' : 'BACKOFFICE'}
                  </h3>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Équipes' : 'Teams'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Building2 className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Entreprises' : 'Companies'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Candidats' : 'Candidates'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Entrevues' : 'Interviews'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Offres d\'emploi' : 'Job Listings'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <PieChart className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Rapports' : 'Reports'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      {locale === 'fr' ? 'Paramètres' : 'Settings'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  {/* Aerospace Tab */}
                  <TabsContent value="aerospace" className="space-y-6 mt-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold flex items-center">
                        <Plane className="h-5 w-5 mr-2 text-primary" />
                        {locale === 'fr' ? 'Aérospatiale' : 'Aerospace'}
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
                            {locale === 'fr' ? 'Offres actives' : 'Active Jobs'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">12</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Candidatures' : 'Applications'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">48</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Entrevues planifiées' : 'Scheduled Interviews'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">8</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Taux de conversion' : 'Conversion Rate'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">16.7%</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Candidates */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{locale === 'fr' ? 'Candidats récents - Aérospatiale' : 'Recent Candidates - Aerospace'}</CardTitle>
                        <CardDescription>
                          {locale === 'fr' ? 'Candidats récemment ajoutés dans le secteur aérospatial' : 'Recently added candidates in the aerospace sector'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {aerospaceCandidates.map(candidate => (
                            <div key={candidate.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex flex-col">
                                <span className="font-medium">{candidate.name}</span>
                                <span className="text-sm text-muted-foreground">{candidate.position}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm">{candidate.experience}</span>
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                  {candidate.status}
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
                          {locale === 'fr' ? 'Voir tous les candidats' : 'View all candidates'}
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  {/* Other Industries Tab */}
                  <TabsContent value="other" className="space-y-6 mt-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-secondary" />
                        {locale === 'fr' ? 'Autres industries' : 'Other Industries'}
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
                            {locale === 'fr' ? 'Offres actives' : 'Active Jobs'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">24</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Candidatures' : 'Applications'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">96</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Entrevues planifiées' : 'Scheduled Interviews'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">15</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {locale === 'fr' ? 'Taux de conversion' : 'Conversion Rate'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">15.6%</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Candidates */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{locale === 'fr' ? 'Candidats récents - Autres industries' : 'Recent Candidates - Other Industries'}</CardTitle>
                        <CardDescription>
                          {locale === 'fr' ? 'Candidats récemment ajoutés dans les autres secteurs' : 'Recently added candidates in other sectors'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {otherCandidates.map(candidate => (
                            <div key={candidate.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex flex-col">
                                <span className="font-medium">{candidate.name}</span>
                                <span className="text-sm text-muted-foreground">{candidate.position}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm">{candidate.experience}</span>
                                <Badge variant="outline" className="bg-secondary/10 text-secondary">
                                  {candidate.status}
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
                          {locale === 'fr' ? 'Voir tous les candidats' : 'View all candidates'}
                        </Button>
                      </CardFooter>
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

export default function EmployerDashboardPage() {
  return (
    <EmployerAuthProvider>
      <DashboardContent />
    </EmployerAuthProvider>
  )
} 