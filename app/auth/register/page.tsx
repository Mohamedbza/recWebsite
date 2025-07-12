"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, Eye, EyeOff, KeyRound, Mail, User, UserPlus, Building } from "lucide-react"
import { useRouter } from "next/navigation"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function RegisterPage() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState("candidate")

  // Form validation schema for candidates
  const candidateFormSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: locale === 'fr' ? 'Le prénom est requis' : 'First name is required' }),
    lastName: z
      .string()
      .min(1, { message: locale === 'fr' ? 'Le nom est requis' : 'Last name is required' }),
    email: z
      .string()
      .min(1, { message: locale === 'fr' ? 'L\'email est requis' : 'Email is required' })
      .email({ message: locale === 'fr' ? 'Email invalide' : 'Invalid email' }),
    password: z
      .string()
      .min(8, { message: locale === 'fr' ? 'Le mot de passe doit contenir au moins 8 caractères' : 'Password must be at least 8 characters' }),
    acceptTerms: z
      .boolean()
      .refine(val => val === true, {
        message: locale === 'fr' ? 'Vous devez accepter les termes et conditions' : 'You must accept the terms and conditions'
      }),
  })

  // Form validation schema for employers
  const employerFormSchema = z.object({
    companyName: z
      .string()
      .min(1, { message: locale === 'fr' ? 'Le nom de l\'entreprise est requis' : 'Company name is required' }),
    contactName: z
      .string()
      .min(1, { message: locale === 'fr' ? 'Le nom du contact est requis' : 'Contact name is required' }),
    email: z
      .string()
      .min(1, { message: locale === 'fr' ? 'L\'email est requis' : 'Email is required' })
      .email({ message: locale === 'fr' ? 'Email invalide' : 'Invalid email' }),
    password: z
      .string()
      .min(8, { message: locale === 'fr' ? 'Le mot de passe doit contenir au moins 8 caractères' : 'Password must be at least 8 characters' }),
    companySize: z
      .string()
      .min(1, { message: locale === 'fr' ? 'La taille de l\'entreprise est requise' : 'Company size is required' }),
    acceptTerms: z
      .boolean()
      .refine(val => val === true, {
        message: locale === 'fr' ? 'Vous devez accepter les termes et conditions' : 'You must accept the terms and conditions'
      }),
  })

  // Initialize candidate form
  const candidateForm = useForm<z.infer<typeof candidateFormSchema>>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  })

  // Initialize employer form
  const employerForm = useForm<z.infer<typeof employerFormSchema>>({
    resolver: zodResolver(employerFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      password: "",
      companySize: "",
      acceptTerms: false,
    },
  })

  // Candidate form submission handler
  const onCandidateSubmit = (values: z.infer<typeof candidateFormSchema>) => {
    // This would normally submit to an API
    console.log(values)
    
    // Show success toast
    toast({
      title: locale === 'fr' ? 'Inscription réussie' : 'Registration successful',
      description: locale === 'fr' 
        ? 'Votre compte a été créé avec succès' 
        : 'Your account has been created successfully',
      duration: 3000,
    })
    
    // Redirect to login page
    router.push('/auth/login')
  }

  // Employer form submission handler
  const onEmployerSubmit = (values: z.infer<typeof employerFormSchema>) => {
    // This would normally submit to an API
    console.log(values)
    
    // Show success toast
    toast({
      title: locale === 'fr' ? 'Inscription réussie' : 'Registration successful',
      description: locale === 'fr' 
        ? 'Votre compte a été créé avec succès' 
        : 'Your account has been created successfully',
      duration: 3000,
    })
    
    // Redirect to login page
    router.push('/auth/login')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          {/* Background with animated gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-background/90 to-primary/15 z-0">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23031F28' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-pulse" style={{ animationDuration: '10s' }} />
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-8">
              <Badge variant="outline" className="px-4 py-1 mb-4 border-primary/50 bg-primary/5 text-primary font-medium">
                {locale === 'fr' ? 'Espace Utilisateur' : 'User Area'}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Créer un compte' : 'Create an account'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {locale === 'fr' 
                  ? 'Rejoignez notre plateforme pour accéder à toutes les fonctionnalités' 
                  : 'Join our platform to access all features'}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="bg-background/90 backdrop-blur-xl shadow-xl border border-white/20">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl flex items-center">
                    <UserPlus className="mr-2 h-6 w-6 text-primary" />
                    {locale === 'fr' ? 'Inscription' : 'Sign Up'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'fr' 
                      ? 'Créez votre compte en quelques étapes simples' 
                      : 'Create your account in a few simple steps'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Tabs defaultValue="candidate" className="w-full" onValueChange={setAccountType}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="candidate" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {locale === 'fr' ? 'Candidat' : 'Candidate'}
                      </TabsTrigger>
                      <TabsTrigger value="employer" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {locale === 'fr' ? 'Employeur' : 'Employer'}
                      </TabsTrigger>
                    </TabsList>

                    {/* Candidate Registration Form */}
                    <TabsContent value="candidate">
                      <Form {...candidateForm}>
                        <form onSubmit={candidateForm.handleSubmit(onCandidateSubmit)} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={candidateForm.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {locale === 'fr' ? 'Prénom' : 'First Name'}
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={locale === 'fr' ? 'Prénom' : 'First name'} 
                                      className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={candidateForm.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {locale === 'fr' ? 'Nom' : 'Last Name'}
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={locale === 'fr' ? 'Nom' : 'Last name'} 
                                      className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={candidateForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <Mail className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Email' : 'Email'}
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={locale === 'fr' ? 'votre@email.com' : 'your@email.com'} 
                                    className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={candidateForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <KeyRound className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Mot de passe' : 'Password'}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      type={showPassword ? "text" : "password"}
                                      placeholder={locale === 'fr' ? 'Créer un mot de passe' : 'Create a password'} 
                                      className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50 pr-10"
                                      {...field} 
                                    />
                                    <button
                                      type="button"
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                      {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </button>
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  {locale === 'fr' 
                                    ? 'Au moins 8 caractères avec des lettres et des chiffres' 
                                    : 'At least 8 characters with letters and numbers'}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={candidateForm.control}
                            name="acceptTerms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-normal">
                                    {locale === 'fr' 
                                      ? 'J\'accepte les ' 
                                      : 'I accept the '}
                                    <Link href="/terms" className="text-primary hover:underline">
                                      {locale === 'fr' ? 'conditions générales' : 'terms and conditions'}
                                    </Link>
                                    {locale === 'fr' ? ' et la ' : ' and '}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                      {locale === 'fr' ? 'politique de confidentialité' : 'privacy policy'}
                                    </Link>
                                  </FormLabel>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white mt-6"
                          >
                            {locale === 'fr' ? 'Créer un compte' : 'Create account'}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>

                    {/* Employer Registration Form */}
                    <TabsContent value="employer">
                      <Form {...employerForm}>
                        <form onSubmit={employerForm.handleSubmit(onEmployerSubmit)} className="space-y-4">
                          <FormField
                            control={employerForm.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <Building className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Nom de l\'entreprise' : 'Company Name'}
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={locale === 'fr' ? 'Nom de votre entreprise' : 'Your company name'} 
                                    className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={employerForm.control}
                            name="contactName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <User className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Nom du contact' : 'Contact Name'}
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={locale === 'fr' ? 'Votre nom complet' : 'Your full name'} 
                                    className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={employerForm.control}
                            name="companySize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <User className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Taille de l\'entreprise' : 'Company Size'}
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50">
                                      <SelectValue placeholder={locale === 'fr' ? 'Sélectionnez la taille' : 'Select size'} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1-10">1-10 {locale === 'fr' ? 'employés' : 'employees'}</SelectItem>
                                    <SelectItem value="11-50">11-50 {locale === 'fr' ? 'employés' : 'employees'}</SelectItem>
                                    <SelectItem value="51-200">51-200 {locale === 'fr' ? 'employés' : 'employees'}</SelectItem>
                                    <SelectItem value="201-500">201-500 {locale === 'fr' ? 'employés' : 'employees'}</SelectItem>
                                    <SelectItem value="501+">501+ {locale === 'fr' ? 'employés' : 'employees'}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={employerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <Mail className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Email professionnel' : 'Business Email'}
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={locale === 'fr' ? 'votre@entreprise.com' : 'your@company.com'} 
                                    className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={employerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <KeyRound className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Mot de passe' : 'Password'}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      type={showPassword ? "text" : "password"}
                                      placeholder={locale === 'fr' ? 'Créer un mot de passe' : 'Create a password'} 
                                      className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50 pr-10"
                                      {...field} 
                                    />
                                    <button
                                      type="button"
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                      {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </button>
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  {locale === 'fr' 
                                    ? 'Au moins 8 caractères avec des lettres et des chiffres' 
                                    : 'At least 8 characters with letters and numbers'}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={employerForm.control}
                            name="acceptTerms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-normal">
                                    {locale === 'fr' 
                                      ? 'J\'accepte les ' 
                                      : 'I accept the '}
                                    <Link href="/terms" className="text-primary hover:underline">
                                      {locale === 'fr' ? 'conditions générales' : 'terms and conditions'}
                                    </Link>
                                    {locale === 'fr' ? ' et la ' : ' and '}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                      {locale === 'fr' ? 'politique de confidentialité' : 'privacy policy'}
                                    </Link>
                                  </FormLabel>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white mt-6"
                          >
                            {locale === 'fr' ? 'Créer un compte entreprise' : 'Create business account'}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          {locale === 'fr' ? 'Ou continuer avec' : 'Or continue with'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Button variant="outline" className="bg-background/50 backdrop-blur-sm border-input/50">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" className="bg-background/50 backdrop-blur-sm border-input/50">
                        <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Facebook
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-center w-full">
                    <span className="text-sm text-muted-foreground">
                      {locale === 'fr' ? 'Déjà un compte ?' : 'Already have an account?'}{' '}
                      <Link
                        href="/auth/login"
                        className="text-primary font-medium hover:underline inline-flex items-center"
                      >
                        {locale === 'fr' ? 'Se connecter' : 'Log in'}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}