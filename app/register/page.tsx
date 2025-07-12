"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, User, Building2, Sparkles, Phone, MapPin, Calendar, Briefcase, GraduationCap, Plus, X, Search, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/contexts/LanguageContext"
import { useToast } from "@/hooks/use-toast"
import { apiService } from "@/lib/api" 

// Types
interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
}

interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  dateOfBirth?: string;
  profilePicture?: string;
  resumeUrl?: string;
  coverLetter?: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  isActive: boolean;
}

interface CompanyFormData {
  name: string;
  industry: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  website?: string;
  logo?: string;
  coverImage?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  foundedYear?: string;
  registrationNumber?: string;
  taxId?: string;
  totalEmployees?: string;
  isVerified: boolean;
  isPremium: boolean;
  status: string;
}

const AVAILABLE_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
  'HTML', 'CSS', 'Sass', 'Less', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Ant Design', 'Chakra UI',
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Elasticsearch', 'DynamoDB', 'Firebase',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Heroku', 'Vercel', 'Netlify',
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'CI/CD', 'Jenkins', 'GitHub Actions', 'CircleCI',
  'REST API', 'GraphQL', 'gRPC', 'WebSocket', 'Microservices', 'Serverless', 'JWT', 'OAuth',
  'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
  'Agile', 'Scrum', 'Kanban', 'JIRA', 'Confluence', 'Trello', 'Asana', 'Notion',
  'UI/UX Design', 'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Prototyping', 'User Research',
  'Project Management', 'Team Leadership', 'Mentoring', 'Code Review', 'Technical Writing',
  'Testing', 'Jest', 'Cypress', 'Selenium', 'Unit Testing', 'Integration Testing', 'E2E Testing',
  'Performance Optimization', 'SEO', 'Analytics', 'Google Analytics', 'Mixpanel', 'Hotjar'
];

const AVAILABLE_LOCATIONS = [
  { value: 'montreal', label: ' Canada' },
  { value: 'dubai', label: 'United Arab Emirates' },
  { value: 'turkey', label: 'Turkey' }
];

const INITIAL_CANDIDATE_FORM: CandidateFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  location: '',
  dateOfBirth: '',
  profilePicture: '',
  resumeUrl: '',
  coverLetter: '',
  experiences: [],
  education: [],
  skills: [],
  isActive: true,
};

const INITIAL_COMPANY_FORM: CompanyFormData = {
  name: '',
  industry: '',
  email: '',
  password: '',
  phone: '',
  location: '',
  website: '',
  logo: '',
  coverImage: '',
  linkedin: '',
  twitter: '',
  facebook: '',
  instagram: '',
  foundedYear: '',
  registrationNumber: '',
  taxId: '',
  totalEmployees: '',
  isVerified: false,
  isPremium: false,
  status: 'active',
};

export default function RegisterPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState("candidate")
  
  // Form state
  const [candidateForm, setCandidateForm] = useState<CandidateFormData>(INITIAL_CANDIDATE_FORM)
  const [companyForm, setCompanyForm] = useState<CompanyFormData>(INITIAL_COMPANY_FORM)

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeMarketing, setAgreeMarketing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Experience and Education drafts
  const [expDraft, setExpDraft] = useState<Experience>({
    company: '',
    title: '',
    startDate: '',
    endDate: '',
    description: '',
  })
  const [eduDraft, setEduDraft] = useState<Education>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
  })

  // Skills
  const [skillSearch, setSkillSearch] = useState('')

  const filteredSkills = AVAILABLE_SKILLS.filter(skill => 
    skill.toLowerCase().includes(skillSearch.toLowerCase()) && 
    !candidateForm.skills.includes(skill)
  )

  // Form handlers
  const handleCandidateChange = (field: keyof CandidateFormData, value: string | boolean | string[] | Experience[] | Education[]) => {
    setCandidateForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleCompanyChange = (field: keyof CompanyFormData, value: string | boolean | number) => {
    setCompanyForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Skills handlers
  const handleAddSkill = (skill: string) => {
    if (!candidateForm.skills.includes(skill)) {
      handleCandidateChange('skills', [...candidateForm.skills, skill])
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    handleCandidateChange('skills', candidateForm.skills.filter(skill => skill !== skillToRemove))
  }

  // Experience handlers
  const handleAddExperience = () => {
    if (expDraft.company && expDraft.title && expDraft.startDate) {
      handleCandidateChange('experiences', [...candidateForm.experiences, expDraft])
      setExpDraft({ company: '', title: '', startDate: '', endDate: '', description: '' })
    }
  }

  const handleRemoveExperience = (idx: number) => {
    handleCandidateChange('experiences', candidateForm.experiences.filter((_, i) => i !== idx))
  }

  // Education handlers
  const handleAddEducation = () => {
    if (eduDraft.institution && eduDraft.degree && eduDraft.fieldOfStudy && eduDraft.startDate) {
      handleCandidateChange('education', [...candidateForm.education, eduDraft])
      setEduDraft({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' })
    }
  }

  const handleRemoveEducation = (idx: number) => {
    handleCandidateChange('education', candidateForm.education.filter((_, i) => i !== idx))
  }

  // Validation
  const validateCandidateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!candidateForm.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!candidateForm.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!candidateForm.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(candidateForm.email)) newErrors.email = 'Email is invalid'
    if (!candidateForm.password) newErrors.password = 'Password is required'
    else if (candidateForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!candidateForm.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!candidateForm.location) newErrors.location = 'Location is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateCompanyForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!companyForm.name.trim()) newErrors.name = 'Company name is required'
    if (!companyForm.industry.trim()) newErrors.industry = 'Industry is required'
    if (!companyForm.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(companyForm.email)) newErrors.email = 'Email is invalid'
    if (!companyForm.password) newErrors.password = 'Password is required'
    else if (companyForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!companyForm.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!companyForm.location) newErrors.location = 'Location is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Registration handlers
  const handleCandidateRegister = async () => {
    if (!validateCandidateForm()) return
    if (!agreeTerms) {
      toast({
        title: "Terms Required",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Push drafts if they're filled
      const finalExperiences = [...candidateForm.experiences]
      if (expDraft.company && expDraft.title && expDraft.startDate) {
        finalExperiences.push({ ...expDraft })
      }

      const finalEducation = [...candidateForm.education]
      if (eduDraft.institution && eduDraft.degree && eduDraft.fieldOfStudy && eduDraft.startDate) {
        finalEducation.push({ ...eduDraft })
      }

      const candidateData = {
        firstName: candidateForm.firstName.trim(),
        lastName: candidateForm.lastName.trim(),
        email: candidateForm.email.trim().toLowerCase(),
        password: candidateForm.password,
        phone: candidateForm.phone.trim(),
        location: candidateForm.location,
        dateOfBirth: candidateForm.dateOfBirth || undefined,
        profilePicture: candidateForm.profilePicture?.trim() || undefined,
        resumeUrl: candidateForm.resumeUrl?.trim() || undefined,
        coverLetter: candidateForm.coverLetter?.trim() || undefined,
        experiences: finalExperiences,
        education: finalEducation,
        skills: candidateForm.skills,
        isActive: candidateForm.isActive,
      }

      const response = await apiService.registerCandidate(candidateData)
      
      if (response.success) {
        toast({
          title: "Registration Successful",
          description: "Your candidate account has been created successfully!",
        })
        router.push("/login")
      } else {
        throw new Error(response.error || "Registration failed")
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompanyRegister = async () => {
    if (!validateCompanyForm()) return
    if (!agreeTerms) {
      toast({
        title: "Terms Required",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const companyData = {
        name: companyForm.name.trim(),
        industry: companyForm.industry.trim(),
        email: companyForm.email.trim().toLowerCase(),
        password: companyForm.password,
        phone: companyForm.phone.trim(),
        location: companyForm.location,
        website: companyForm.website?.trim() || undefined,
        logo: companyForm.logo?.trim() || undefined,
        coverImage: companyForm.coverImage?.trim() || undefined,
        socialLinks: {
          linkedin: companyForm.linkedin?.trim() || undefined,
          twitter: companyForm.twitter?.trim() || undefined,
          facebook: companyForm.facebook?.trim() || undefined,
          instagram: companyForm.instagram?.trim() || undefined,
        },
        foundedYear: companyForm.foundedYear ? parseInt(companyForm.foundedYear) : undefined,
        registrationNumber: companyForm.registrationNumber?.trim() || undefined,
        taxId: companyForm.taxId?.trim() || undefined,
        totalEmployees: companyForm.totalEmployees ? parseInt(companyForm.totalEmployees) : undefined,
        isVerified: companyForm.isVerified,
        isPremium: companyForm.isPremium,
        status: companyForm.status,
      }

      const response = await apiService.registerCompany(companyData)
      
      if (response.success) {
        toast({
          title: "Registration Successful",
          description: "Your company account has been created successfully!",
        })
        router.push("/login")
      } else {
        throw new Error(response.error || "Registration failed")
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (accountType === "candidate") {
      await handleCandidateRegister()
    } else {
      await handleCompanyRegister()
    }
  }

  const renderCandidateForm = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="firstName"
                value={candidateForm.firstName}
                onChange={(e) => handleCandidateChange('firstName', e.target.value)}
                className="pl-10"
                placeholder="Enter first name"
                disabled={isLoading}
              />
            </div>
            {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="lastName"
                value={candidateForm.lastName}
                onChange={(e) => handleCandidateChange('lastName', e.target.value)}
                className="pl-10"
                placeholder="Enter last name"
                disabled={isLoading}
              />
            </div>
            {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={candidateForm.email}
              onChange={(e) => handleCandidateChange('email', e.target.value)}
              className="pl-10"
              placeholder="Enter email address"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={candidateForm.password}
              onChange={(e) => handleCandidateChange('password', e.target.value)}
              className="pl-10 pr-10"
              placeholder="Enter password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              value={candidateForm.phone}
              onChange={(e) => handleCandidateChange('phone', e.target.value)}
              className="pl-10"
              placeholder="Enter phone number"
              disabled={isLoading}
            />
          </div>
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              id="location"
              value={candidateForm.location}
              onChange={(e) => handleCandidateChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border"
              disabled={isLoading}
            >
              <option value="">Select location</option>
              {AVAILABLE_LOCATIONS.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="dateOfBirth"
              type="date"
              value={candidateForm.dateOfBirth}
              onChange={(e) => handleCandidateChange('dateOfBirth', e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Briefcase className="w-5 h-5" /> Experience
        </h3>
        {candidateForm.experiences.length > 0 && (
          <div className="space-y-2">
            {candidateForm.experiences.map((exp, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold">{exp.title}</div>
                  <div className="text-sm text-muted-foreground">{exp.company}</div>
                  <div className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate || 'Present'}</div>
                  {exp.description && <div className="text-xs mt-1">{exp.description}</div>}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveExperience(idx)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Input 
            value={expDraft.company} 
            onChange={e => setExpDraft({ ...expDraft, company: e.target.value })} 
            placeholder="Company" 
          />
          <Input 
            value={expDraft.title} 
            onChange={e => setExpDraft({ ...expDraft, title: e.target.value })} 
            placeholder="Title" 
          />
          <Input 
            type="date" 
            value={expDraft.startDate} 
            onChange={e => setExpDraft({ ...expDraft, startDate: e.target.value })} 
          />
          <Input 
            type="date" 
            value={expDraft.endDate} 
            onChange={e => setExpDraft({ ...expDraft, endDate: e.target.value })} 
          />
          <Input 
            value={expDraft.description} 
            onChange={e => setExpDraft({ ...expDraft, description: e.target.value })} 
            placeholder="Description" 
            className="col-span-2"
          />
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleAddExperience} disabled={!expDraft.company || !expDraft.title || !expDraft.startDate}>
          <Plus className="w-4 h-4 mr-1" />Add Experience
        </Button>
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <GraduationCap className="w-5 h-5" /> Education
        </h3>
        {candidateForm.education.length > 0 && (
          <div className="space-y-2">
            {candidateForm.education.map((edu, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-sm text-muted-foreground">{edu.institution}</div>
                  <div className="text-xs text-muted-foreground">{edu.startDate} - {edu.endDate || 'Present'}</div>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveEducation(idx)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input 
            value={eduDraft.institution} 
            onChange={e => setEduDraft({ ...eduDraft, institution: e.target.value })} 
            placeholder="Institution" 
          />
          <Input 
            value={eduDraft.degree} 
            onChange={e => setEduDraft({ ...eduDraft, degree: e.target.value })} 
            placeholder="Degree" 
          />
          <Input 
            value={eduDraft.fieldOfStudy} 
            onChange={e => setEduDraft({ ...eduDraft, fieldOfStudy: e.target.value })} 
            placeholder="Field of Study" 
          />
          <Input 
            type="date" 
            value={eduDraft.startDate} 
            onChange={e => setEduDraft({ ...eduDraft, startDate: e.target.value })} 
          />
          <Input 
            type="date" 
            value={eduDraft.endDate} 
            onChange={e => setEduDraft({ ...eduDraft, endDate: e.target.value })} 
          />
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleAddEducation} disabled={!eduDraft.institution || !eduDraft.degree || !eduDraft.fieldOfStudy || !eduDraft.startDate}>
          <Plus className="w-4 h-4 mr-1" />Add Education
        </Button>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <Label>Skills</Label>
        {candidateForm.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {candidateForm.skills.map((skill, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 hover:bg-black/10 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        
        <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search skills..."
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {filteredSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleAddSkill(skill)}
                className="px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-blue-50 border border-gray-200 hover:border-blue-300"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderCompanyForm = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={companyForm.name}
              onChange={(e) => handleCompanyChange('name', e.target.value)}
              placeholder="Enter company name"
              disabled={isLoading}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="industry">Industry *</Label>
            <Input
              id="industry"
              value={companyForm.industry}
              onChange={(e) => handleCompanyChange('industry', e.target.value)}
              placeholder="e.g., Technology, Healthcare"
              disabled={isLoading}
            />
            {errors.industry && <p className="text-sm text-red-500 mt-1">{errors.industry}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="companyEmail">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="companyEmail"
              type="email"
              value={companyForm.email}
              onChange={(e) => handleCompanyChange('email', e.target.value)}
              className="pl-10"
              placeholder="company@example.com"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="companyPassword">Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="companyPassword"
              type={showPassword ? "text" : "password"}
              value={companyForm.password}
              onChange={(e) => handleCompanyChange('password', e.target.value)}
              className="pl-10 pr-10"
              placeholder="Enter password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div>
          <Label htmlFor="companyPhone">Phone *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="companyPhone"
              value={companyForm.phone}
              onChange={(e) => handleCompanyChange('phone', e.target.value)}
              className="pl-10"
              placeholder="+1 (555) 123-4567"
              disabled={isLoading}
            />
          </div>
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="companyLocation">Location *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              id="companyLocation"
              value={companyForm.location}
              onChange={(e) => handleCompanyChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border"
              disabled={isLoading}
            >
              <option value="">Select location</option>
              {AVAILABLE_LOCATIONS.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={companyForm.website}
              onChange={(e) => handleCompanyChange('website', e.target.value)}
              placeholder="https://www.company.com"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="totalEmployees">Total Employees</Label>
            <Input
              id="totalEmployees"
              type="number"
              value={companyForm.totalEmployees}
              onChange={(e) => handleCompanyChange('totalEmployees', e.target.value)}
              placeholder="0"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="foundedYear">Founded Year</Label>
            <Input
              id="foundedYear"
              type="number"
              value={companyForm.foundedYear}
              onChange={(e) => handleCompanyChange('foundedYear', e.target.value)}
              placeholder="2020"
              min="1800"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              value={companyForm.registrationNumber}
              onChange={(e) => handleCompanyChange('registrationNumber', e.target.value)}
              placeholder="Enter registration number"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={companyForm.linkedin}
              onChange={(e) => handleCompanyChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/company/..."
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={companyForm.twitter}
              onChange={(e) => handleCompanyChange('twitter', e.target.value)}
              placeholder="https://twitter.com/..."
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={companyForm.facebook}
              onChange={(e) => handleCompanyChange('facebook', e.target.value)}
              placeholder="https://facebook.com/..."
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={companyForm.instagram}
              onChange={(e) => handleCompanyChange('instagram', e.target.value)}
              placeholder="https://instagram.com/..."
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center py-20">
      {/* Animated shapes */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50 floating-element"></div>
      <div
        className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-50 floating-element"
        style={{ animationDelay: "-3s" }}
      ></div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
            <Sparkles className="inline-block h-4 w-4 mr-2" />
            {t('register.welcome')}
          </div>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('register.title')}
            </span>
          </h1>
          <p className="text-muted-foreground">
            {t('register.subtitle')}
          </p>
        </div>

        <div className="magic-card p-6 shadow-xl bg-background/70 backdrop-blur-md border border-white/20 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6 relative pointer-events-auto">
            <div className="space-y-4">
              <Label>{t('register.account_type')}</Label>
              <RadioGroup 
                defaultValue="candidate" 
                className="flex justify-center gap-4"
                value={accountType}
                onValueChange={setAccountType}
              >
                <div className="flex items-center space-x-2 w-[200px]">
                  <RadioGroupItem value="candidate" id="candidate" className="peer sr-only" />
                  <Label
                    htmlFor="candidate"
                    className="flex flex-col items-center justify-between w-full rounded-xl border-2 border-muted bg-background/50 backdrop-blur-sm p-5 hover:bg-primary/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 cursor-pointer transition-all duration-200"
                  >
                    <User className="mb-3 h-7 w-7 text-primary" />
                    <span className="text-sm font-medium">{t('register.candidate')}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 w-[200px]">
                  <RadioGroupItem value="employer" id="employer" className="peer sr-only" />
                  <Label
                    htmlFor="employer"
                    className="flex flex-col items-center justify-between w-full rounded-xl border-2 border-muted bg-background/50 backdrop-blur-sm p-5 hover:bg-primary/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 cursor-pointer transition-all duration-200"
                  >
                    <Building2 className="mb-3 h-7 w-7 text-primary" />
                    <span className="text-sm font-medium">{t('register.employer')}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Dynamic Form Content */}
            <div className="space-y-6">
              {accountType === "candidate" ? renderCandidateForm() : renderCompanyForm()}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  required
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  {t('register.terms_text')}{" "}
                  <Link href="/terms" className="text-primary hover:underline underline-offset-4">
                    {t('register.terms_link')}
                  </Link>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="marketing" 
                  checked={agreeMarketing}
                  onCheckedChange={(checked) => setAgreeMarketing(checked as boolean)}
                />
                <Label htmlFor="marketing" className="text-sm font-normal">
                  {t('register.marketing_text')}
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full magic-button bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white font-medium py-2 h-auto text-base"
              disabled={isLoading}
            >
              {isLoading ? t('register.loading') : t('register.submit')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            {t('register.have_account')}{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              {t('register.login_link')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}