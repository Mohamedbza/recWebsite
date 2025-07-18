"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Video, MapPin, Plus, Users } from "lucide-react"

export default function InterviewsPage() {
  const { locale } = useLanguage()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {locale === 'fr' ? 'Mes entrevues' : 'My Interviews'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'fr' 
              ? 'Gérez vos entrevues programmées'
              : 'Manage your scheduled interviews'}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'fr' ? 'Ajouter une entrevue' : 'Add Interview'}
        </Button>
      </div>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {locale === 'fr' ? 'Entrevues à venir' : 'Upcoming Interviews'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Vos prochaines entrevues programmées'
              : 'Your scheduled upcoming interviews'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {locale === 'fr' ? 'Aucune entrevue programmée' : 'No interviews scheduled'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {locale === 'fr' 
                ? 'Vos entrevues apparaîtront ici une fois programmées'
                : 'Your interviews will appear here once scheduled'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interview Preparation */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === 'fr' ? 'Préparation d\'entrevue' : 'Interview Preparation'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Ressources pour vous aider à réussir vos entrevues'
              : 'Resources to help you succeed in your interviews'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">
                    {locale === 'fr' ? 'Questions fréquentes' : 'Common Questions'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {locale === 'fr' ? 'Préparez-vous aux questions' : 'Prepare for questions'}
                  </div>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                  <Video className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">
                    {locale === 'fr' ? 'Entrevue virtuelle' : 'Virtual Interview'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {locale === 'fr' ? 'Conseils pour les entrevues en ligne' : 'Tips for online interviews'}
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 