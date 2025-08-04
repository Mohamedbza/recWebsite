"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, User, Building2, Sparkles, Phone, MapPin, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/contexts/LanguageContext"
import { useToast } from "@/hooks/use-toast"
import { apiService } from "@/lib/api"
import { useAppSelector } from "@/store/hooks" 

// Simplified Types - Only essential fields
interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  isActive: boolean;
}

interface CompanyFormData {
  name: string;
  industry: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  isVerified: boolean;
  isPremium: boolean;
  status: string;
}

const AVAILABLE_LOCATIONS = [
  { value: 'montreal', label: 'Canada' },
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
  isActive: true,
};

const INITIAL_COMPANY_FORM: CompanyFormData = {
  name: '',
  industry: '',
  email: '',
  password: '',
  phone: '',
  location: '',
  isVerified: false,
  isPremium: false,
  status: 'active',
};

export default function RegisterPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const { isAuthenticated, user } = useAppSelector((state) => state.account)
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState("candidate")

  // Check if user is already authenticated and redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'employer') {
        router.push("/employeurs/dashboard")
      } else if (user.role === 'candidate') {
        router.push("/candidate/dashboard")
      }
    }
  }, [isAuthenticated, user, router])

  // Show loading state while checking authentication or during redirect
  if (isAuthenticated && user) {
    return (
      <div className="container relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-24 mt-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
          <p className="text-muted-foreground">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    )
  }
  
  // Form state
  const [candidateForm, setCandidateForm] = useState<CandidateFormData>(INITIAL_CANDIDATE_FORM)
  const [companyForm, setCompanyForm] = useState<CompanyFormData>(INITIAL_COMPANY_FORM)

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeMarketing, setAgreeMarketing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Form handlers
  const handleCandidateChange = (field: keyof CandidateFormData, value: string | boolean) => {
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

  // Validation
  const validateCandidateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    // First name validation
    if (!candidateForm.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (candidateForm.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }
    
    // Last name validation
    if (!candidateForm.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (candidateForm.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }
    
    // Email validation
    if (!candidateForm.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidateForm.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Password validation
    if (!candidateForm.password) {
      newErrors.password = 'Password is required'
    } else if (candidateForm.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(candidateForm.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
    
    // Phone validation
    if (!candidateForm.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(candidateForm.phone.trim().replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    // Location validation
    if (!candidateForm.location) {
      newErrors.location = 'Location is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateCompanyForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    // Company name validation
    if (!companyForm.name.trim()) {
      newErrors.name = 'Company name is required'
    } else if (companyForm.name.trim().length < 2) {
      newErrors.name = 'Company name must be at least 2 characters'
    }
    
    // Industry validation
    if (!companyForm.industry.trim()) {
      newErrors.industry = 'Industry is required'
    } else if (companyForm.industry.trim().length < 2) {
      newErrors.industry = 'Industry must be at least 2 characters'
    }
    
    // Email validation
    if (!companyForm.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyForm.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Password validation
    if (!companyForm.password) {
      newErrors.password = 'Password is required'
    } else if (companyForm.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(companyForm.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
    
    // Phone validation
    if (!companyForm.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(companyForm.phone.trim().replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    // Location validation
    if (!companyForm.location) {
      newErrors.location = 'Location is required'
    }
    
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
      const candidateData = {
        firstName: candidateForm.firstName.trim(),
        lastName: candidateForm.lastName.trim(),
        email: candidateForm.email.trim().toLowerCase(),
        password: candidateForm.password,
        phone: candidateForm.phone.trim(),
        location: candidateForm.location,
        isActive: candidateForm.isActive,
        // Initialize empty arrays for fields that can be completed later in dashboard
        experiences: [],
        education: [],
        skills: [],
      }

      const response = await apiService.registerCandidate(candidateData)
      
      if (response.success) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created! You can complete your profile in the dashboard.",
        })
        router.push("/login")
      } else {
        throw new Error(response.error || "Registration failed")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during registration"
      
      // Handle specific error types
      if (errorMessage.toLowerCase().includes('email already exists') || 
          errorMessage.toLowerCase().includes('duplicate email') ||
          errorMessage.toLowerCase().includes('email is already taken')) {
        toast({
          title: "Email Already Exists",
          description: "An account with this email address already exists. Please use a different email or try logging in.",
          variant: "destructive",
        })
      } else if (errorMessage.toLowerCase().includes('validation') || 
                 errorMessage.toLowerCase().includes('invalid')) {
        toast({
          title: "Invalid Information",
          description: "Please check your information and make sure all required fields are filled correctly.",
          variant: "destructive",
        })
      } else if (errorMessage.toLowerCase().includes('network') || 
                 errorMessage.toLowerCase().includes('connection')) {
        toast({
          title: "Connection Error",
          description: "Unable to connect to the server. Please check your internet connection and try again.",
          variant: "destructive",
        })
      } else if (errorMessage.toLowerCase().includes('password') && 
                 errorMessage.toLowerCase().includes('weak')) {
        toast({
          title: "Weak Password",
          description: "Your password is too weak. Please use a stronger password with at least 8 characters.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Registration Failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
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
        isVerified: companyForm.isVerified,
        isPremium: companyForm.isPremium,
        status: companyForm.status,
        // Optional fields can be completed later in dashboard
        socialLinks: {},
      }

      const response = await apiService.registerCompany(companyData)
      
      if (response.success) {
        toast({
          title: "Registration Successful",
          description: "Your company account has been created! You can complete your company profile in the dashboard.",
        })
        router.push("/login")
      } else {
        throw new Error(response.error || "Registration failed")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during registration"
      
      // Handle specific error types
      if (errorMessage.toLowerCase().includes('email already exists') || 
          errorMessage.toLowerCase().includes('duplicate email') ||
          errorMessage.toLowerCase().includes('email is already taken')) {
        toast({
          title: "Email Already Exists",
          description: "A company account with this email address already exists. Please use a different email or try logging in.",
          variant: "destructive",
        })
      } else if (errorMessage.toLowerCase().includes('company name') && 
                 errorMessage.toLowerCase().includes('already exists')) {
        toast({
          title: "Company Name Already Exists",
          description: "A company with this name already exists. Please use a different company name.",
          variant: "destructive",
        })
      } else if (errorMessage.toLowerCase().includes('validation') || 
                 errorMessage.toLowerCase().includes('invalid')) {
        toast({
          title: "Invalid Information",
          description: "Please check your company information and make sure all required fields are filled correctly.",
          variant: "destructive",
        })
      } else if (errorMessage.toLowerCase().includes('network') || 
                 errorMessage.toLowerCase().includes('connection')) {
        toast({
          title: "Connection Error",
          description: "Unable to connect to the server. Please check your internet connection and try again.",
          variant: "destructive",
        })
      } else if (errorMessage.toLowerCase().includes('password') && 
                 errorMessage.toLowerCase().includes('weak')) {
        toast({
          title: "Weak Password",
          description: "Your password is too weak. Please use a stronger password with at least 8 characters.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Registration Failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
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
        <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
          <User className="w-5 h-5" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="firstName"
                value={candidateForm.firstName}
                onChange={(e) => handleCandidateChange('firstName', e.target.value)}
                className="pl-10 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
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
                className="pl-10 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
                placeholder="Enter last name"
                disabled={isLoading}
              />
            </div>
            {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={candidateForm.email}
              onChange={(e) => handleCandidateChange('email', e.target.value)}
              className="pl-10 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
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
              className="pl-10 pr-12 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
              placeholder="Enter password (min. 6 characters)"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
              className="pl-10 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
              placeholder="Enter phone number"
              disabled={isLoading}
            />
          </div>
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
            <select
              id="location"
              value={candidateForm.location}
              onChange={(e) => handleCandidateChange('location', e.target.value)}
              className="w-full pl-10 pr-4 h-12 bg-muted/30 border border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300 appearance-none"
              disabled={isLoading}
              title="Select your location"
            >
              <option value="">Select your location</option>
              {AVAILABLE_LOCATIONS.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
        </div>
      </div>

      {/* Profile Completion Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-1">Complete Your Profile Later</h4>
            <p className="text-sm text-muted-foreground">
              After registration, you can add your experience, education, skills, and upload your resume in your dashboard to enhance your profile and increase your chances of being discovered by employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCompanyForm = () => (
    <div className="space-y-6">
      {/* Company Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
          <Building2 className="w-5 h-5" />
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="companyName"
                value={companyForm.name}
                onChange={(e) => handleCompanyChange('name', e.target.value)}
                className="pl-10 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
                placeholder="Enter company name"
                disabled={isLoading}
              />
            </div>
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="industry">Industry *</Label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="industry"
                value={companyForm.industry}
                onChange={(e) => handleCompanyChange('industry', e.target.value)}
                className="pl-10 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
                placeholder="e.g., Technology, Healthcare, Finance"
                disabled={isLoading}
              />
            </div>
            {errors.industry && <p className="text-sm text-red-500 mt-1">{errors.industry}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="companyEmail">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="companyEmail"
              type="email"
              value={companyForm.email}
              onChange={(e) => handleCompanyChange('email', e.target.value)}
              className="pl-10 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
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
              className="pl-10 pr-12 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
              placeholder="Enter password (min. 6 characters)"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div>
          <Label htmlFor="companyPhone">Phone Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="companyPhone"
              value={companyForm.phone}
              onChange={(e) => handleCompanyChange('phone', e.target.value)}
              className="pl-10 h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
              placeholder="1866 305-8982"
              disabled={isLoading}
            />
          </div>
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="companyLocation">Location *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
            <select
              id="companyLocation"
              value={companyForm.location}
              onChange={(e) => handleCompanyChange('location', e.target.value)}
              className="w-full pl-10 pr-4 h-12 bg-muted/30 border border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300 appearance-none"
              disabled={isLoading}
              title="Select company location"
            >
              <option value="">Select company location</option>
              {AVAILABLE_LOCATIONS.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
        </div>
      </div>

      {/* Company Profile Completion Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-1">Complete Your Company Profile Later</h4>
            <p className="text-sm text-muted-foreground">
              After registration, you can add your company logo, website, social media links, founding details, and other information in your dashboard to create a compelling company profile.
            </p>
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

      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px] md:w-[600px] lg:w-[700px] xl:w-[800px]">
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

        <div className="magic-card p-8 shadow-xl bg-background/90 backdrop-blur-md border border-white/20 relative z-10 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-8 relative pointer-events-auto">
            <div className="space-y-4">
              <Label className="text-base font-semibold">{t('register.account_type')}</Label>
              <RadioGroup 
                defaultValue="candidate" 
                className="flex justify-center gap-6"
                value={accountType}
                onValueChange={setAccountType}
              >
                <div className="flex items-center space-x-2 w-[220px]">
                  <RadioGroupItem value="candidate" id="candidate" className="peer sr-only" />
                  <Label
                    htmlFor="candidate"
                    className="flex flex-col items-center justify-between w-full rounded-2xl border-2 border-muted bg-background/50 backdrop-blur-sm p-6 hover:bg-primary/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 cursor-pointer transition-all duration-300 transform hover:scale-105"
                  >
                    <User className="mb-3 h-8 w-8 text-primary" />
                    <span className="text-base font-semibold">{t('register.candidate')}</span>
                    <span className="text-sm text-muted-foreground text-center mt-1">Find your dream job</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 w-[220px]">
                  <RadioGroupItem value="employer" id="employer" className="peer sr-only" />
                  <Label
                    htmlFor="employer"
                    className="flex flex-col items-center justify-between w-full rounded-2xl border-2 border-muted bg-background/50 backdrop-blur-sm p-6 hover:bg-primary/5 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 cursor-pointer transition-all duration-300 transform hover:scale-105"
                  >
                    <Building2 className="mb-3 h-8 w-8 text-primary" />
                    <span className="text-base font-semibold">{t('register.employer')}</span>
                    <span className="text-sm text-muted-foreground text-center mt-1">Hire top talent</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Dynamic Form Content */}
            <div className="space-y-6">
              {accountType === "candidate" ? renderCandidateForm() : renderCompanyForm()}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  required
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  {t('register.terms_text')}{" "}
                  <Link href="/terms" className="text-primary hover:underline underline-offset-4 font-medium">
                    {t('register.terms_link')}
                  </Link>
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="marketing" 
                  checked={agreeMarketing}
                  onCheckedChange={(checked) => setAgreeMarketing(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="marketing" className="text-sm leading-relaxed">
                  {t('register.marketing_text')}
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
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