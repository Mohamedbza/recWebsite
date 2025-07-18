"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, Download, Edit, Trash2, Plus } from "lucide-react"

export default function ResumePage() {
  const { locale } = useLanguage()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {locale === 'fr' ? 'Mon CV' : 'My Resume'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'fr' 
              ? 'Gérez et téléchargez vos CV'
              : 'Manage and upload your resumes'}
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          {locale === 'fr' ? 'Télécharger un CV' : 'Upload Resume'}
        </Button>
      </div>

      {/* Resume Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {locale === 'fr' ? 'Mes CV' : 'My Resumes'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Gérez vos différents CV pour différents types d\'emplois'
              : 'Manage your different resumes for different job types'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {locale === 'fr' ? 'Aucun CV téléchargé' : 'No resumes uploaded'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {locale === 'fr' 
                ? 'Téléchargez votre premier CV pour commencer'
                : 'Upload your first resume to get started'}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Ajouter un CV' : 'Add Resume'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resume Builder */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === 'fr' ? 'Créateur de CV' : 'Resume Builder'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Créez un CV professionnel avec notre outil intégré'
              : 'Create a professional resume with our built-in tool'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {locale === 'fr' 
              ? 'Le créateur de CV sera disponible bientôt.'
              : 'Resume builder will be available soon.'}
          </p>
          <Button variant="outline" disabled>
            {locale === 'fr' ? 'Bientôt disponible' : 'Coming Soon'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 