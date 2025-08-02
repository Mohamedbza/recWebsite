"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAppSelector } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  User, Briefcase, GraduationCap,
  Edit, Save, X, Plus, Download,
  Star, Search,
  Loader2, Zap, Target
} from "lucide-react"
import { useRouter } from "next/navigation"
import { apiService } from "@/lib/api"

// Available Skills Database
const AVAILABLE_SKILLS = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
  
  // Frontend Technologies
  'HTML', 'CSS', 'Sass', 'Less', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Ant Design', 'Chakra UI', 'Styled Components', 'Next.js', 'Nuxt.js', 'Gatsby',
  
  // Backend & Databases
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Elasticsearch', 'DynamoDB', 'Firebase', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel',
  
  // Cloud & DevOps
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Heroku', 'Vercel', 'Netlify', 'Terraform', 'Jenkins', 'GitHub Actions', 'CircleCI',
  
  // Tools & Collaboration
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'CI/CD', 'JIRA', 'Confluence', 'Trello', 'Asana', 'Notion', 'Slack', 'Microsoft Teams',
  
  // API & Architecture
  'REST API', 'GraphQL', 'gRPC', 'WebSocket', 'Microservices', 'Serverless', 'JWT', 'OAuth', 'API Design', 'System Architecture',
  
  // Data & AI
  'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'R', 'SQL', 'Data Analysis', 'Statistics',
  
  // Design & UX
  'UI/UX Design', 'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems', 'Adobe Creative Suite',
  
  // Project Management
  'Agile', 'Scrum', 'Kanban', 'Project Management', 'Team Leadership', 'Mentoring', 'Code Review', 'Technical Writing', 'Product Management',
  
  // Testing & Quality
  'Testing', 'Jest', 'Cypress', 'Selenium', 'Unit Testing', 'Integration Testing', 'E2E Testing', 'TDD', 'Quality Assurance',
  
  // Marketing & Analytics
  'Performance Optimization', 'SEO', 'Analytics', 'Google Analytics', 'Mixpanel', 'Hotjar', 'Digital Marketing', 'Content Marketing', 'Social Media Marketing',
  
  // Soft Skills
  'Communication', 'Leadership', 'Problem Solving', 'Critical Thinking', 'Creativity', 'Adaptability', 'Time Management', 'Teamwork', 'Negotiation', 'Public Speaking'
];

// Skill Categories for better organization
const SKILL_CATEGORIES = {
  'Programming': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin'],
  'Frontend': ['React', 'Vue.js', 'Angular', 'HTML', 'CSS', 'Sass', 'Tailwind CSS', 'Bootstrap', 'Next.js', 'Nuxt.js'],
  'Backend': ['Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'MongoDB', 'PostgreSQL', 'MySQL'],
  'Cloud & DevOps': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'CI/CD', 'Jenkins', 'GitHub Actions'],
  'Design': ['UI/UX Design', 'Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
  'Data & AI': ['Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'SQL', 'Data Analysis', 'Statistics'],
  'Soft Skills': ['Communication', 'Leadership', 'Problem Solving', 'Critical Thinking', 'Teamwork', 'Project Management']
};

interface Candidate {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  dateOfBirth?: string
  profilePicture?: string
  resumeUrl?: string
  coverLetter?: string
  experiences: Array<{
    _id?: string
    company: string
    title: string
    startDate: string
    endDate?: string
    description?: string
  }>
  education: Array<{
    _id?: string
    institution: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate?: string
  }>
  skills: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface ExperienceForm {
  company: string
  title: string
  startDate: string
  endDate: string
  description: string
}

interface EducationForm {
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
}



export default function ProfilePage() {
  const { locale } = useLanguage()
  const { user, isAuthenticated, token, isLoading: authLoading } = useAppSelector((state) => state.account)
  const router = useRouter()
  
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  
  // Form states
  const [experienceForm, setExperienceForm] = useState<ExperienceForm>({
    company: '',
    title: '',
    startDate: '',
    endDate: '',
    description: ''
  })
  const [educationForm, setEducationForm] = useState<EducationForm>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: ''
  })
  const [newSkill, setNewSkill] = useState('')
  const [skillSearch, setSkillSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false)
  const [selectedSkillsForBatch, setSelectedSkillsForBatch] = useState<string[]>([])
  const [showExperienceForm, setShowExperienceForm] = useState(false)
  const [showEducationForm, setShowEducationForm] = useState(false)
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null)
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null)

  // Filter available skills based on search and category
  const getFilteredSkills = () => {
    let skills = AVAILABLE_SKILLS;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      skills = SKILL_CATEGORIES[selectedCategory as keyof typeof SKILL_CATEGORIES] || [];
    }
    
    // Filter by search term
    if (skillSearch) {
      skills = skills.filter(skill => 
        skill.toLowerCase().includes(skillSearch.toLowerCase())
      );
    }
    
    // Filter out already selected skills
    if (candidate) {
      skills = skills.filter(skill => !candidate.skills.includes(skill));
    }
    
    return skills;
  }

  // Toggle skill selection for batch adding
  const toggleSkillSelection = (skill: string) => {
    setSelectedSkillsForBatch(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
  }

  // Add multiple selected skills at once
  const handleAddSelectedSkills = () => {
    if (!candidate || selectedSkillsForBatch.length === 0) return;
    
    const newSkills = [...candidate.skills, ...selectedSkillsForBatch];
    updateCandidate({ skills: newSkills });
    setSelectedSkillsForBatch([]);
  }

  // Clear selected skills
  const clearSelectedSkills = () => {
    setSelectedSkillsForBatch([]);
  }

  // Select all visible skills
  const selectAllVisibleSkills = () => {
    const filteredSkills = getFilteredSkills();
    const skillsToAdd = filteredSkills.filter(skill => !selectedSkillsForBatch.includes(skill));
    setSelectedSkillsForBatch(prev => [...prev, ...skillsToAdd.slice(0, 20)]); // Limit to 20 for performance
  }

  // Fetch candidate data
  const fetchCandidateData = async () => {
    console.log('fetchCandidateData called', { token: !!token, user, isAuthenticated })
    
    if (!token) {
      console.log('No token available')
      setError(locale === 'fr' ? 'Token d\'authentification manquant' : 'Authentication token missing')
      setIsLoading(false)
      return
    }
    
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('Making API request to get current candidate profile...')
      const response = await apiService.getCurrentCandidate(token)
      
      console.log('API response:', response)
      
      if (response.success && response.data) {
        console.log('Current candidate data:', response.data)
        setCandidate(response.data)
      } else {
        console.error('API response error:', response.error)
        throw new Error(response.error || 'Failed to fetch candidate data')
      }
    } catch (err) {
      console.error('Error fetching candidate data:', err)
      setError(locale === 'fr' ? 'Erreur lors du chargement des données' : 'Error loading data')
    } finally {
      setIsLoading(false)
    }
  }

  // Update candidate data
  const updateCandidate = async (updateData: Partial<Candidate>) => {
    if (!token) return
    
    try {
      setIsSaving(true)
      setError(null)
      
      const { config } = await import('../../../config/environment');
      const response = await fetch(`${config.apiUrl}/candidate-profile/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to update candidate data')
      }
      
      const updatedCandidate = await response.json()
      setCandidate(updatedCandidate)
      setIsEditing(false)
    } catch (err) {
      console.error('Error updating candidate data:', err)
      setError(locale === 'fr' ? 'Erreur lors de la sauvegarde' : 'Error saving data')
    } finally {
      setIsSaving(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    console.log('useEffect triggered', { isAuthenticated, token: !!token, user })
    if (isAuthenticated && token) {
      fetchCandidateData()
    } else {
      console.log('Conditions not met for API call')
      if (!isAuthenticated) console.log('Not authenticated')
      if (!token) console.log('No token')
    }
  }, [isAuthenticated, token])

  // Calculate profile completion
  const calculateProfileCompletion = () => {
    if (!candidate) return 0
    
    let score = 0
    const maxScore = 100

    // Personal info (25 points)
    if (candidate.firstName) score += 5
    if (candidate.lastName) score += 5
    if (candidate.phone) score += 5
    if (candidate.location) score += 5
    if (candidate.dateOfBirth) score += 5

    // Cover letter (15 points)
    if (candidate.coverLetter && candidate.coverLetter.length > 50) score += 15

    // Experience (25 points)
    if (candidate.experiences && candidate.experiences.length > 0) score += 25

    // Education (20 points)
    if (candidate.education && candidate.education.length > 0) score += 20

    // Skills (15 points)
    if (candidate.skills && candidate.skills.length >= 3) score += 15

    return Math.min(score, maxScore)
  }

  const completionPercentage = calculateProfileCompletion()

  // Handle form submissions
  const handleAddExperience = () => {
    if (!candidate) return
    
    const newExperiences = [...candidate.experiences]
    if (editingExperienceIndex !== null) {
      newExperiences[editingExperienceIndex] = experienceForm
    } else {
      newExperiences.push(experienceForm)
    }
    
    updateCandidate({ experiences: newExperiences })
    setExperienceForm({ company: '', title: '', startDate: '', endDate: '', description: '' })
    setShowExperienceForm(false)
    setEditingExperienceIndex(null)
  }

  const handleAddEducation = () => {
    if (!candidate) return
    
    const newEducation = [...candidate.education]
    if (editingEducationIndex !== null) {
      newEducation[editingEducationIndex] = educationForm
    } else {
      newEducation.push(educationForm)
    }
    
    updateCandidate({ education: newEducation })
    setEducationForm({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' })
    setShowEducationForm(false)
    setEditingEducationIndex(null)
  }

  const handleAddSkill = (skill?: string) => {
    if (!candidate) return
    
    const skillToAdd = skill || newSkill.trim()
    if (!skillToAdd) return
    
    // Check if skill already exists
    if (candidate.skills.includes(skillToAdd)) return
    
    const newSkills = [...candidate.skills, skillToAdd]
    updateCandidate({ skills: newSkills })
    setNewSkill('')
    setSkillSearch('')
    setShowSkillSuggestions(false)
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!candidate) return
    
    const newSkills = candidate.skills.filter(skill => skill !== skillToRemove)
    updateCandidate({ skills: newSkills })
  }

  const handleRemoveExperience = (index: number) => {
    if (!candidate) return
    
    const newExperiences = candidate.experiences.filter((_, i) => i !== index)
    updateCandidate({ experiences: newExperiences })
  }

  const handleRemoveEducation = (index: number) => {
    if (!candidate) return
    
    const newEducation = candidate.education.filter((_, i) => i !== index)
    updateCandidate({ education: newEducation })
  }

  const handleEditExperience = (index: number) => {
    if (!candidate) return
    
    const exp = candidate.experiences[index]
    setExperienceForm({
      company: exp.company,
      title: exp.title,
      startDate: exp.startDate.split('T')[0],
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      description: exp.description || ''
    })
    setEditingExperienceIndex(index)
    setShowExperienceForm(true)
  }

  const handleEditEducation = (index: number) => {
    if (!candidate) return
    
    const edu = candidate.education[index]
    setEducationForm({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: edu.startDate.split('T')[0],
      endDate: edu.endDate ? edu.endDate.split('T')[0] : ''
    })
    setEditingEducationIndex(index)
    setShowEducationForm(true)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  // Authentication check
  // Show loading state while auth is being initialized
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground text-center">
              {locale === 'fr' ? 'Chargement...' : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'candidate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center">
            {locale === 'fr' ? 'Connexion requise' : 'Login required'}
          </h2>
          <p className="mb-6 text-muted-foreground text-center">
            {locale === 'fr'
              ? "Vous devez être connecté en tant que candidat pour accéder à votre profil."
              : "You must be logged in as a candidate to access your profile."}
          </p>
          <Button 
            onClick={() => router.push('/login')} 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20"
          >
            {locale === 'fr' ? 'Se connecter' : 'Log In'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {locale === 'fr' ? 'Mon profil' : 'My Profile'}
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                {locale === 'fr' 
                  ? 'Gérez vos informations personnelles et professionnelles'
                  : 'Manage your personal and professional information'}
              </p>
            </div>
            <div className="flex gap-3">
             
              <Button 
                variant="secondary" 
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30"
                onClick={() => setIsEditing(!isEditing)}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : isEditing ? (
                  <X className="h-4 w-4 mr-2" />
                ) : (
                  <Edit className="h-4 w-4 mr-2" />
                )}
                {isSaving ? (locale === 'fr' ? 'Sauvegarde...' : 'Saving...') : 
                 isEditing ? (locale === 'fr' ? 'Annuler' : 'Cancel') : 
                 (locale === 'fr' ? 'Modifier' : 'Edit Profile')}
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-16 text-center">
            <div className="relative">
              <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary mb-6" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary rounded-full blur-xl opacity-20"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {locale === 'fr' ? 'Chargement du profil...' : 'Loading profile...'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {locale === 'fr' ? 'Récupération de vos données...' : 'Fetching your data...'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-16 text-center">
            <div className="relative">
              <X className="h-16 w-16 mx-auto text-red-500 mb-6" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-xl opacity-20"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {locale === 'fr' ? 'Erreur de chargement' : 'Loading Error'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <Button onClick={fetchCandidateData} className="bg-primary hover:shadow-lg">
              <Zap className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Réessayer' : 'Retry'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Profile Content */}
      {!isLoading && !error && candidate && (
        <>
          {/* Profile Completion */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">{locale === 'fr' ? 'Vue d\'ensemble' : 'Overview'}</TabsTrigger>
              <TabsTrigger value="experience">{locale === 'fr' ? 'Expérience' : 'Experience'}</TabsTrigger>
              <TabsTrigger value="education">{locale === 'fr' ? 'Éducation' : 'Education'}</TabsTrigger>
              <TabsTrigger value="skills">{locale === 'fr' ? 'Compétences' : 'Skills'}</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Personal Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
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
                          value={candidate.firstName}
                          onChange={(e) => setCandidate(prev => prev ? { ...prev, firstName: e.target.value } : null)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 dark:text-white">{candidate.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {locale === 'fr' ? 'Nom' : 'Last Name'}
                      </label>
                      {isEditing ? (
                        <Input 
                          value={candidate.lastName}
                          onChange={(e) => setCandidate(prev => prev ? { ...prev, lastName: e.target.value } : null)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 dark:text-white">{candidate.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <p className="mt-1 text-gray-900 dark:text-white">{candidate.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {locale === 'fr' ? 'Téléphone' : 'Phone'}
                      </label>
                      {isEditing ? (
                        <Input 
                          value={candidate.phone}
                          onChange={(e) => setCandidate(prev => prev ? { ...prev, phone: e.target.value } : null)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 dark:text-white">{candidate.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {locale === 'fr' ? 'Localisation' : 'Location'}
                      </label>
                      {isEditing ? (
                        <Select 
                          value={candidate.location} 
                          onValueChange={(value) => setCandidate(prev => prev ? { ...prev, location: value } : null)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="montreal">Montreal</SelectItem>
                            <SelectItem value="dubai">Dubai</SelectItem>
                            <SelectItem value="turkey">Turkey</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 text-gray-900 dark:text-white capitalize">{candidate.location}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {locale === 'fr' ? 'Date de naissance' : 'Date of Birth'}
                      </label>
                      {isEditing ? (
                        <Input 
                          type="date"
                          value={candidate.dateOfBirth ? candidate.dateOfBirth.split('T')[0] : ''}
                          onChange={(e) => setCandidate(prev => prev ? { ...prev, dateOfBirth: e.target.value } : null)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {candidate.dateOfBirth ? formatDate(candidate.dateOfBirth) : (locale === 'fr' ? 'Non spécifié' : 'Not specified')}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    {locale === 'fr' ? 'Lettre de motivation' : 'Cover Letter'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea 
                      value={candidate.coverLetter || ''}
                      onChange={(e) => setCandidate(prev => prev ? { ...prev, coverLetter: e.target.value } : null)}
                      rows={4}
                      placeholder={locale === 'fr' ? 'Décrivez votre expérience et vos objectifs...' : 'Describe your experience and goals...'}
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {candidate.coverLetter || (locale === 'fr' ? 'Aucune lettre de motivation ajoutée' : 'No cover letter added')}
                    </p>
                  )}
                </CardContent>
              </Card>
 
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Expérience professionnelle' : 'Work Experience'}</h3>
                <Button 
                  size="sm" 
                  onClick={() => {
                    setShowExperienceForm(true)
                    setEditingExperienceIndex(null)
                    setExperienceForm({ company: '', title: '', startDate: '', endDate: '', description: '' })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Ajouter' : 'Add Experience'}
                </Button>
              </div>
              
              {/* Experience Form */}
              {showExperienceForm && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>
                      {editingExperienceIndex !== null ? 
                        (locale === 'fr' ? 'Modifier l\'expérience' : 'Edit Experience') : 
                        (locale === 'fr' ? 'Ajouter une expérience' : 'Add Experience')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Company</label>
                        <Input 
                          value={experienceForm.company}
                          onChange={(e) => setExperienceForm(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input 
                          value={experienceForm.title}
                          onChange={(e) => setExperienceForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Job title"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Start Date</label>
                        <Input 
                          type="date"
                          value={experienceForm.startDate}
                          onChange={(e) => setExperienceForm(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">End Date</label>
                        <Input 
                          type="date"
                          value={experienceForm.endDate}
                          onChange={(e) => setExperienceForm(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea 
                        value={experienceForm.description}
                        onChange={(e) => setExperienceForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your role and achievements"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddExperience} disabled={!experienceForm.company || !experienceForm.title || !experienceForm.startDate}>
                        <Save className="h-4 w-4 mr-2" />
                        {editingExperienceIndex !== null ? (locale === 'fr' ? 'Mettre à jour' : 'Update') : (locale === 'fr' ? 'Ajouter' : 'Add')}
                      </Button>
                      <Button variant="outline" onClick={() => setShowExperienceForm(false)}>
                        <X className="h-4 w-4 mr-2" />
                        {locale === 'fr' ? 'Annuler' : 'Cancel'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Experience List */}
              <div className="space-y-4">
                {candidate.experiences.length === 0 ? (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="py-12 text-center">
                      <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {locale === 'fr' ? 'Aucune expérience' : 'No experience'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {locale === 'fr' ? 'Ajoutez votre première expérience professionnelle' : 'Add your first work experience'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  candidate.experiences.map((exp, index) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                            <p className="text-primary font-medium">{exp.company}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : (locale === 'fr' ? 'Présent' : 'Present')}
                            </p>
                            {exp.description && (
                              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm" onClick={() => handleEditExperience(index)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleRemoveExperience(index)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Formation' : 'Education'}</h3>
                <Button 
                  size="sm" 
                  onClick={() => {
                    setShowEducationForm(true)
                    setEditingEducationIndex(null)
                    setEducationForm({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Ajouter' : 'Add Education'}
                </Button>
              </div>
              
              {/* Education Form */}
              {showEducationForm && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>
                      {editingEducationIndex !== null ? 
                        (locale === 'fr' ? 'Modifier la formation' : 'Edit Education') : 
                        (locale === 'fr' ? 'Ajouter une formation' : 'Add Education')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Institution</label>
                        <Input 
                          value={educationForm.institution}
                          onChange={(e) => setEducationForm(prev => ({ ...prev, institution: e.target.value }))}
                          placeholder="University/College name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Degree</label>
                        <Input 
                          value={educationForm.degree}
                          onChange={(e) => setEducationForm(prev => ({ ...prev, degree: e.target.value }))}
                          placeholder="Bachelor, Master, etc."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Field of Study</label>
                        <Input 
                          value={educationForm.fieldOfStudy}
                          onChange={(e) => setEducationForm(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                          placeholder="Computer Science, Business, etc."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Start Date</label>
                        <Input 
                          type="date"
                          value={educationForm.startDate}
                          onChange={(e) => setEducationForm(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">End Date</label>
                        <Input 
                          type="date"
                          value={educationForm.endDate}
                          onChange={(e) => setEducationForm(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddEducation} disabled={!educationForm.institution || !educationForm.degree || !educationForm.fieldOfStudy || !educationForm.startDate}>
                        <Save className="h-4 w-4 mr-2" />
                        {editingEducationIndex !== null ? (locale === 'fr' ? 'Mettre à jour' : 'Update') : (locale === 'fr' ? 'Ajouter' : 'Add')}
                      </Button>
                      <Button variant="outline" onClick={() => setShowEducationForm(false)}>
                        <X className="h-4 w-4 mr-2" />
                        {locale === 'fr' ? 'Annuler' : 'Cancel'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Education List */}
              <div className="space-y-4">
                {candidate.education.length === 0 ? (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="py-12 text-center">
                      <GraduationCap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {locale === 'fr' ? 'Aucune formation' : 'No education'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {locale === 'fr' ? 'Ajoutez votre première formation' : 'Add your first education'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  candidate.education.map((edu, index) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree} {locale === 'fr' ? 'en' : 'in'} {edu.fieldOfStudy}</h4>
                            <p className="text-primary font-medium">{edu.institution}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : (locale === 'fr' ? 'En cours' : 'Ongoing')}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm" onClick={() => handleEditEducation(index)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleRemoveEducation(index)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Enhanced Skills Tab */}
            <TabsContent value="skills" className="space-y-6">
              {/* Skills Header */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {locale === 'fr' ? 'Compétences professionnelles' : 'Professional Skills'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {locale === 'fr' 
                        ? 'Ajoutez vos compétences pour améliorer votre profil'
                        : 'Add your skills to enhance your profile'
                      }
                    </p>
                  </div>
                  
                  {/* Browse Skills Button */}
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      if (showSkillSuggestions) {
                        // Clear selections when closing
                        setSelectedSkillsForBatch([]);
                      }
                      setShowSkillSuggestions(!showSkillSuggestions);
                    }}
                    className="w-full sm:w-auto"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {showSkillSuggestions 
                      ? (locale === 'fr' ? 'Fermer' : 'Close')
                      : (locale === 'fr' ? 'Parcourir les compétences' : 'Browse Skills')
                    }
                    {selectedSkillsForBatch.length > 0 && showSkillSuggestions && (
                      <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                        {selectedSkillsForBatch.length}
                      </Badge>
                    )}
                  </Button>
                </div>
                
                {/* Manual Skill Input */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Input 
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder={locale === 'fr' ? 'Ajouter une compétence manuellement...' : 'Add a skill manually...'}
                          className="pr-10"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        />
                        <button 
                          onClick={() => handleAddSkill()}
                          disabled={!newSkill.trim()}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label={locale === 'fr' ? 'Ajouter la compétence' : 'Add skill'}
                        >
                          <Plus className="h-4 w-4 text-primary" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Skills Browser */}
              {showSkillSuggestions && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-primary" />
                      {locale === 'fr' ? 'Parcourir les technologies' : 'Browse Technologies'}
                    </CardTitle>
                    <CardDescription>
                      {locale === 'fr' 
                        ? 'Sélectionnez parmi une liste de compétences prédéfinies'
                        : 'Select from a list of predefined skills'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={skillSearch}
                          onChange={(e) => setSkillSearch(e.target.value)}
                          placeholder={locale === 'fr' ? 'Rechercher des compétences...' : 'Search skills...'}
                          className="pl-10"
                        />
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="sm:w-48">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{locale === 'fr' ? 'Toutes les catégories' : 'All Categories'}</SelectItem>
                          {Object.keys(SKILL_CATEGORIES).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={selectAllVisibleSkills}
                        disabled={getFilteredSkills().length === 0}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {locale === 'fr' ? 'Tout sélectionner' : 'Select All'}
                      </Button>
                    </div>
                    
                    {/* Skills Grid */}
                    <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {getFilteredSkills().slice(0, 50).map((skill) => (
                          <button
                            key={skill}
                            onClick={() => toggleSkillSelection(skill)}
                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary border border-gray-200 hover:border-primary/30 text-left ${
                              selectedSkillsForBatch.includes(skill) ? 'bg-primary/10 text-primary border-primary/20' : ''
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                      {getFilteredSkills().length === 0 && (
                        <p className="text-center text-gray-500 py-4">
                          {locale === 'fr' ? 'Aucune compétence trouvée' : 'No skills found'}
                        </p>
                      )}
                    </div>
                    
                    {/* Selected Skills for Batch Add */}
                    {selectedSkillsForBatch.length > 0 && (
                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-primary">
                            {locale === 'fr' 
                              ? `${selectedSkillsForBatch.length} compétence(s) sélectionnée(s)` 
                              : `${selectedSkillsForBatch.length} skill(s) selected`
                            }
                          </h4>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={handleAddSelectedSkills}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {locale === 'fr' ? 'Ajouter tout' : 'Add All'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={clearSelectedSkills}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <X className="h-3 w-3 mr-1" />
                              {locale === 'fr' ? 'Effacer' : 'Clear'}
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedSkillsForBatch.map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="secondary" 
                              className="bg-primary/10 text-primary border-primary/30 text-xs"
                            >
                              {skill}
                              <button
                                onClick={() => toggleSkillSelection(skill)}
                                className="ml-1 hover:text-red-600 transition-colors"
                                aria-label={locale === 'fr' ? `Retirer ${skill} de la sélection` : `Remove ${skill} from selection`}
                              >
                                <X className="h-2 w-2" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {/* Skills Stats */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {locale === 'fr' ? 'Total des compétences' : 'Total Skills'}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {candidate.skills.length}
                        </p>
                      </div>
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                 
              </div>
              
              {/* Skills Display */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    {locale === 'fr' ? 'Vos compétences' : 'Your Skills'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'fr' 
                      ? 'Gérez vos compétences professionnelles'
                      : 'Manage your professional skills'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {candidate.skills.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="relative">
                        <Star className="h-16 w-16 mx-auto text-gray-300 mb-6" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl opacity-30"></div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {locale === 'fr' ? 'Aucune compétence ajoutée' : 'No skills added yet'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        {locale === 'fr' 
                          ? 'Commencez par ajouter vos premières compétences professionnelles pour améliorer votre profil.'
                          : 'Start by adding your first professional skills to enhance your profile.'
                        }
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {['JavaScript', 'React', 'Python', 'Leadership', 'Communication'].map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3 items-center rounded-sm">
                      {candidate.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30 dark:hover:bg-primary/30 transition-all duration-200 group px-3 py-1.5 text-sm font-medium text-center"
                        >
                          {skill}
                          <button 
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            aria-label={locale === 'fr' ? `Supprimer ${skill}` : `Remove ${skill}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          {isEditing && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-2" />
                    {locale === 'fr' ? 'Annuler' : 'Cancel'}
                  </Button>
                  <Button 
                    onClick={() => updateCandidate(candidate)}
                    disabled={isSaving}
                    className="bg-primary hover:shadow-lg"
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {isSaving ? (locale === 'fr' ? 'Sauvegarde...' : 'Saving...') : (locale === 'fr' ? 'Sauvegarder' : 'Save Changes')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
} 