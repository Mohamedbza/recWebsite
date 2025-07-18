"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, Mail, MapPin, Phone, Calendar, 
  Briefcase, GraduationCap, Award, Globe,
  Edit, Save, X, Plus, Upload, Download,
  CheckCircle, Clock, Star, ExternalLink
} from "lucide-react"

interface ProfileData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    website?: string
    linkedIn?: string
    github?: string
  }
  summary: string
  experience: Array<{
    id: number
    company: string
    position: string
    startDate: string
    endDate?: string
    current: boolean
    description: string
    location: string
  }>
  education: Array<{
    id: number
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa?: string
    description?: string
  }>
  skills: Array<{
    id: number
    name: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    category: string
  }>
  certifications: Array<{
    id: number
    name: string
    issuer: string
    date: string
    expiryDate?: string
    credentialId?: string
  }>
}

const skillLevels = {
  beginner: { en: 'Beginner', fr: 'Débutant', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
  intermediate: { en: 'Intermediate', fr: 'Intermédiaire', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
  advanced: { en: 'Advanced', fr: 'Avancé', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
  expert: { en: 'Expert', fr: 'Expert', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' }
}

export default function ProfilePage() {
  const { locale } = useLanguage()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock profile data
  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      firstName: user?.name?.split(' ')[0] || 'John',
      lastName: user?.name?.split(' ')[1] || 'Doe',
      email: user?.email || 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: user?.location || 'Montreal, QC',
      website: 'https://johndoe.dev',
      linkedIn: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    },
    summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Experienced in React, Node.js, and modern development practices. Always eager to learn new technologies and solve complex problems.",
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Frontend Developer',
        startDate: '2022-01',
        current: true,
        description: 'Leading frontend development for multiple client projects using React, TypeScript, and modern UI frameworks.',
        location: 'Montreal, QC'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        startDate: '2020-06',
        endDate: '2021-12',
        current: false,
        description: 'Built and maintained web applications using React, Node.js, and PostgreSQL.',
        location: 'Toronto, ON'
      }
    ],
    education: [
      {
        id: 1,
        institution: 'University of Montreal',
        degree: 'Bachelor',
        field: 'Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8',
        description: 'Focused on software engineering and web technologies'
      }
    ],
    skills: [
      { id: 1, name: 'React', level: 'expert', category: 'Frontend' },
      { id: 2, name: 'TypeScript', level: 'advanced', category: 'Languages' },
      { id: 3, name: 'Node.js', level: 'advanced', category: 'Backend' },
      { id: 4, name: 'PostgreSQL', level: 'intermediate', category: 'Database' },
      { id: 5, name: 'AWS', level: 'intermediate', category: 'Cloud' },
      { id: 6, name: 'Docker', level: 'intermediate', category: 'DevOps' }
    ],
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2023-06',
        expiryDate: '2026-06',
        credentialId: 'ABC123456'
      }
    ]
  })

  const calculateProfileCompletion = () => {
    let score = 0
    const maxScore = 100

    // Personal info (20 points)
    if (profileData.personalInfo.firstName) score += 5
    if (profileData.personalInfo.lastName) score += 5
    if (profileData.personalInfo.phone) score += 5
    if (profileData.personalInfo.location) score += 5

    // Summary (15 points)
    if (profileData.summary && profileData.summary.length > 50) score += 15

    // Experience (25 points)
    if (profileData.experience.length > 0) score += 25

    // Education (15 points)
    if (profileData.education.length > 0) score += 15

    // Skills (15 points)
    if (profileData.skills.length >= 3) score += 15

    // Social links (10 points)
    if (profileData.personalInfo.linkedIn) score += 5
    if (profileData.personalInfo.github || profileData.personalInfo.website) score += 5

    return Math.min(score, maxScore)
  }

  const completionPercentage = calculateProfileCompletion()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {locale === 'fr' ? 'Mon profil' : 'My Profile'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'fr' 
              ? 'Gérez vos informations personnelles et professionnelles'
              : 'Manage your personal and professional information'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {locale === 'fr' ? 'Télécharger CV' : 'Download Resume'}
          </Button>
          <Button 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "secondary" : "default"}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Annuler' : 'Cancel'}
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Modifier' : 'Edit Profile'}
              </>
            )}
          </Button>
        </div>
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
                  ? 'Un profil complet augmente vos chances de trouver un emploi'
                  : 'A complete profile increases your chances of finding a job'}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {completionPercentage}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-2" />
        </CardContent>
      </Card>

      {/* Main Profile Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">{locale === 'fr' ? 'Vue d\'ensemble' : 'Overview'}</TabsTrigger>
          <TabsTrigger value="experience">{locale === 'fr' ? 'Expérience' : 'Experience'}</TabsTrigger>
          <TabsTrigger value="education">{locale === 'fr' ? 'Éducation' : 'Education'}</TabsTrigger>
          <TabsTrigger value="skills">{locale === 'fr' ? 'Compétences' : 'Skills'}</TabsTrigger>
          <TabsTrigger value="certifications">{locale === 'fr' ? 'Certifications' : 'Certifications'}</TabsTrigger>
          <TabsTrigger value="settings">{locale === 'fr' ? 'Paramètres' : 'Settings'}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {locale === 'fr' ? 'Informations personnelles' : 'Personal Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Prénom' : 'First Name'}
                  </label>
                  {isEditing ? (
                    <Input 
                      value={profileData.personalInfo.firstName}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                      }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 dark:text-white">{profileData.personalInfo.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Nom' : 'Last Name'}
                  </label>
                  {isEditing ? (
                    <Input 
                      value={profileData.personalInfo.lastName}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                      }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 dark:text-white">{profileData.personalInfo.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <p className="mt-1 text-gray-900 dark:text-white">{profileData.personalInfo.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Téléphone' : 'Phone'}
                  </label>
                  {isEditing ? (
                    <Input 
                      value={profileData.personalInfo.phone}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 dark:text-white">{profileData.personalInfo.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Localisation' : 'Location'}
                  </label>
                  {isEditing ? (
                    <Input 
                      value={profileData.personalInfo.location}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, location: e.target.value }
                      }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 dark:text-white">{profileData.personalInfo.location}</p>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {locale === 'fr' ? 'Liens sociaux' : 'Social Links'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">LinkedIn</label>
                    {isEditing ? (
                      <Input 
                        value={profileData.personalInfo.linkedIn || ''}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, linkedIn: e.target.value }
                        }))}
                        className="mt-1"
                        placeholder="https://linkedin.com/in/..."
                      />
                    ) : (
                      <p className="mt-1 text-blue-600 dark:text-blue-400">
                        {profileData.personalInfo.linkedIn ? (
                          <a href={profileData.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            {profileData.personalInfo.linkedIn}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-gray-500">{locale === 'fr' ? 'Non spécifié' : 'Not specified'}</span>
                        )}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">GitHub</label>
                    {isEditing ? (
                      <Input 
                        value={profileData.personalInfo.github || ''}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, github: e.target.value }
                        }))}
                        className="mt-1"
                        placeholder="https://github.com/..."
                      />
                    ) : (
                      <p className="mt-1 text-blue-600 dark:text-blue-400">
                        {profileData.personalInfo.github ? (
                          <a href={profileData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            {profileData.personalInfo.github}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-gray-500">{locale === 'fr' ? 'Non spécifié' : 'Not specified'}</span>
                        )}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'fr' ? 'Site web' : 'Website'}
                    </label>
                    {isEditing ? (
                      <Input 
                        value={profileData.personalInfo.website || ''}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, website: e.target.value }
                        }))}
                        className="mt-1"
                        placeholder="https://..."
                      />
                    ) : (
                      <p className="mt-1 text-blue-600 dark:text-blue-400">
                        {profileData.personalInfo.website ? (
                          <a href={profileData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            {profileData.personalInfo.website}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-gray-500">{locale === 'fr' ? 'Non spécifié' : 'Not specified'}</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                {locale === 'fr' ? 'Résumé professionnel' : 'Professional Summary'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea 
                  value={profileData.summary}
                  onChange={(e) => setProfileData(prev => ({ ...prev, summary: e.target.value }))}
                  rows={4}
                  placeholder={locale === 'fr' ? 'Décrivez votre expérience et vos objectifs...' : 'Describe your experience and goals...'}
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {profileData.summary}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Briefcase className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold">{profileData.experience.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'fr' ? 'Expériences' : 'Experiences'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold">{profileData.education.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'fr' ? 'Formations' : 'Education'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                <div className="text-2xl font-bold">{profileData.skills.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'fr' ? 'Compétences' : 'Skills'}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Expérience professionnelle' : 'Work Experience'}</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Ajouter' : 'Add Experience'}
            </Button>
          </div>
          
          {profileData.experience.map(exp => (
            <Card key={exp.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.position}</h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {exp.startDate} - {exp.current ? (locale === 'fr' ? 'Présent' : 'Present') : exp.endDate} • {exp.location}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                  </div>
                  {exp.current && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                      {locale === 'fr' ? 'Actuel' : 'Current'}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Formation' : 'Education'}</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Ajouter' : 'Add Education'}
            </Button>
          </div>
          
          {profileData.education.map(edu => (
            <Card key={edu.id}>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree} {locale === 'fr' ? 'en' : 'in'} {edu.field}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                </p>
                {edu.description && (
                  <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Compétences' : 'Skills'}</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Ajouter' : 'Add Skill'}
            </Button>
          </div>
          
          <div className="grid gap-4">
            {Object.entries(
              profileData.skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = []
                acc[skill.category].push(skill)
                return acc
              }, {} as Record<string, typeof profileData.skills>)
            ).map(([category, skills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-base">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <Badge 
                        key={skill.id} 
                        variant="secondary" 
                        className={skillLevels[skill.level].color}
                      >
                        {skill.name} • {skillLevels[skill.level][locale]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Certifications' : 'Certifications'}</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Ajouter' : 'Add Certification'}
            </Button>
          </div>
          
          {profileData.certifications.map(cert => (
            <Card key={cert.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.name}</h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{cert.issuer}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'fr' ? 'Obtenu le' : 'Issued'} {cert.date} 
                      {cert.expiryDate && ` • ${locale === 'fr' ? 'Expire le' : 'Expires'} ${cert.expiryDate}`}
                    </p>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {locale === 'fr' ? 'Vérifié' : 'Verified'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'fr' ? 'Paramètres du profil' : 'Profile Settings'}</CardTitle>
              <CardDescription>
                {locale === 'fr' 
                  ? 'Gérez la visibilité et les préférences de votre profil'
                  : 'Manage your profile visibility and preferences'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Les paramètres avancés seront disponibles bientôt.'
                  : 'Advanced settings will be available soon.'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={() => setIsEditing(false)}>
            <Save className="h-4 w-4 mr-2" />
            {locale === 'fr' ? 'Sauvegarder' : 'Save Changes'}
          </Button>
        </div>
      )}
    </div>
  )
} 