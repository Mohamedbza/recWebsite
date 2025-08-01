"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { loginUser, clearError } from "@/store/slices/accountSlice"

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, error, isAuthenticated, user } = useAppSelector((state) => state.account)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate')

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

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Login attempt:', { email, userType })

    // Validate inputs
    if (!email.trim() || !password) {
      const missingFields = []
      if (!email.trim()) missingFields.push('email')
      if (!password) missingFields.push('password')
      
      toast({
        title: "Missing Information",
        description: `Please enter your ${missingFields.join(' and ')}`,
        variant: "destructive",
      })
      return
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    try {
      // Clear any previous errors
      dispatch(clearError())

      console.log('Dispatching login action...')

      // Call the login function from Redux
      const result = await dispatch(loginUser({ email: email.trim(), password, userType }))

      console.log('Login result:', result)

      if (loginUser.fulfilled.match(result)) {
        console.log('Login successful:', result.payload)
        
        // Success notification
        toast({
          title: "Success",
          description: "You have successfully signed in.",
        })

        // Redirect based on user type
        if (userType === 'employer') {
          console.log('Redirecting to employer dashboard')
          router.push("/employeurs/dashboard")
        } else {
          console.log('Redirecting to candidate dashboard')
          router.push("/candidate/dashboard")
        }
      } else if (loginUser.rejected.match(result)) {
        console.log('Login failed:', result.payload)
        
        // Handle login failure with specific error messages
        const errorMessage = result.payload as string
        
        if (errorMessage?.toLowerCase().includes('timeout')) {
          toast({
            title: "Request Timeout",
            description: "The server is taking too long to respond. Please try again.",
            variant: "destructive",
          })
        } else if (errorMessage?.toLowerCase().includes('401') || 
            errorMessage?.toLowerCase().includes('unauthorized') ||
            errorMessage?.toLowerCase().includes('invalid credentials') ||
            errorMessage?.toLowerCase().includes('wrong password') ||
            errorMessage?.toLowerCase().includes('user not found') ||
            errorMessage?.toLowerCase().includes('invalid email or password')) {
          toast({
            title: "Authentication Failed",
            description: "Invalid email or password. Please check your credentials and try again.",
            variant: "destructive",
          })
        } else if (errorMessage?.toLowerCase().includes('network') || 
                   errorMessage?.toLowerCase().includes('connection') ||
                   errorMessage?.toLowerCase().includes('fetch')) {
          toast({
            title: "Connection Error",
            description: "Unable to connect to the server. Please check your internet connection and try again.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Login Error",
            description: errorMessage || "An error occurred while signing in. Please try again.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error('Unexpected login error:', error)
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-24 mt-16">
      {/* Animated shapes */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50 floating-element"></div>
      <div
        className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-50 floating-element"
        style={{ animationDelay: "-3s" }}
      ></div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px] md:w-[450px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sign in to your account
            </span>
          </h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your dashboard
          </p>
        </div>

        <div className="magic-card p-6 shadow-xl bg-background/70 backdrop-blur-md border border-white/20">
          <Tabs defaultValue="candidate" className="w-full mb-6" onValueChange={(value) => setUserType(value as 'candidate' | 'employer')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="candidate" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Candidate
              </TabsTrigger>
              <TabsTrigger value="employer" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Employer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="candidate">
              <p className="text-sm text-muted-foreground mb-6">
                Access your candidate portal to manage your job applications
              </p>
            </TabsContent>

            <TabsContent value="employer">
              <p className="text-sm text-muted-foreground mb-6">
                Access your employer dashboard to manage job postings
              </p>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={userType === 'employer' ? 'company@example.com' : 'name@example.com'}
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/auth/reset-password" 
                  className="text-xs text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full magic-button bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white font-medium py-2 h-auto text-base"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}