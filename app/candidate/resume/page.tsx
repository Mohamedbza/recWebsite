"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  FileText, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Plus, 
  Eye,
  Star,
  Calendar,
  FileUp,
  Palette,
  Zap
} from "lucide-react"
import { useState } from "react"

interface Resume {
  id: string
  name: string
  type: string
  lastModified: string
  size: string
  status: 'active' | 'draft' | 'archived'
  views: number
  downloads: number
  rating: number
}

export default function ResumePage() {
  const { locale } = useLanguage()
  const [isDragOver, setIsDragOver] = useState(false)

  // Mock data for demonstration
 

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    // Handle file upload logic here
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return locale === 'fr' ? 'Actif' : 'Active'
      case 'draft': return locale === 'fr' ? 'Brouillon' : 'Draft'
      case 'archived': return locale === 'fr' ? 'Archivé' : 'Archived'
      default: return status
    }
  }

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {locale === 'fr' ? 'Mon CV' : 'My Resume'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Gérez et optimisez vos CV pour maximiser vos chances'
                  : 'Manage and optimize your resumes to maximize your chances'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="gap-2">
            <Palette className="h-4 w-4" />
            {locale === 'fr' ? 'Créateur de CV' : 'Resume Builder'}
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Upload className="h-4 w-4" />
            {locale === 'fr' ? 'Télécharger un CV' : 'Upload Resume'}
          </Button>
        </div>
      </div>

 

      {/* Main Content Tabs */}
      <Tabs defaultValue="resumes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
          <TabsTrigger value="resumes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {locale === 'fr' ? 'Mes CV' : 'My Resumes'}
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {locale === 'fr' ? 'Créateur' : 'Builder'}
          </TabsTrigger> 
        </TabsList>

        <TabsContent value="resumes" className="space-y-6">
          {/* Upload Area */}
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <CardContent className="p-8">
              <div
                className={`text-center transition-all duration-200 ${
                  isDragOver ? 'scale-105' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <FileUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {locale === 'fr' ? 'Glissez votre CV ici' : 'Drag your resume here'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {locale === 'fr' 
                    ? 'ou cliquez pour sélectionner un fichier (PDF, DOC, DOCX)'
                    : 'or click to select a file (PDF, DOC, DOCX)'}
                </p>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  {locale === 'fr' ? 'Choisir un fichier' : 'Choose File'}
                </Button>
              </div>
            </CardContent>
          </Card>

      
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                {locale === 'fr' ? 'Créateur de CV Intelligent' : 'Smart Resume Builder'}
              </CardTitle>
              <CardDescription>
                {locale === 'fr' 
                  ? 'Créez un CV professionnel optimisé pour l\'IA avec nos modèles modernes'
                  : 'Create an AI-optimized professional resume with our modern templates'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Template Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {locale === 'fr' ? 'Choisissez un modèle' : 'Choose a Template'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((template) => (
                    <Card key={template} className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500">
                      <CardContent className="p-4">
                        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg mb-3 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">
                            {locale === 'fr' ? `Modèle ${template}` : `Template ${template}`}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {locale === 'fr' ? 'Moderne et professionnel' : 'Modern & Professional'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Quick Start */}
              <div className="text-center py-8">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'fr' ? 'Prêt à créer votre CV ?' : 'Ready to create your resume?'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {locale === 'fr' 
                    ? 'Notre créateur intelligent vous guide à travers chaque étape'
                    : 'Our smart builder guides you through every step'}
                </p>
                <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Plus className="h-5 w-5" />
                  {locale === 'fr' ? 'Commencer maintenant' : 'Start Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

         
      </Tabs>
    </div>
  )
} 