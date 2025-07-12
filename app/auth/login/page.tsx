"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, Eye, EyeOff, KeyRound, LogIn, Mail } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  // Form validation schema
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: locale === 'fr' ? 'L\'email est requis' : 'Email is required' })
      .email({ message: locale === 'fr' ? 'Email invalide' : 'Invalid email' }),
    password: z
      .string()
      .min(1, { message: locale === 'fr' ? 'Le mot de passe est requis' : 'Password is required' }),
    rememberMe: z.boolean().optional(),
  })

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // This would normally submit to an API
    console.log(values)
    
    // Show success toast
    toast({
      title: locale === 'fr' ? 'Connexion réussie' : 'Login successful',
      description: locale === 'fr' 
        ? 'Vous êtes maintenant connecté à votre compte' 
        : 'You are now logged in to your account',
      duration: 3000,
    })
    
    // Redirect to home page
    router.push('/')
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
                {locale === 'fr' ? 'Connexion' : 'Log In'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {locale === 'fr' 
                  ? 'Accédez à votre compte pour gérer vos candidatures et offres d\'emploi' 
                  : 'Access your account to manage your job applications and listings'}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="bg-background/90 backdrop-blur-xl shadow-xl border border-white/20">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl flex items-center">
                    <LogIn className="mr-2 h-6 w-6 text-primary" />
                    {locale === 'fr' ? 'Connexion' : 'Log In'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'fr' 
                      ? 'Entrez vos identifiants pour accéder à votre compte' 
                      : 'Enter your credentials to access your account'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
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
                        control={form.control}
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
                                  placeholder={locale === 'fr' ? 'Votre mot de passe' : 'Your password'} 
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
                            <div className="flex justify-end">
                              <Link
                                href="/auth/reset-password"
                                className="text-sm text-primary hover:underline"
                              >
                                {locale === 'fr' ? 'Mot de passe oublié ?' : 'Forgot password?'}
                              </Link>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {locale === 'fr' ? 'Se souvenir de moi' : 'Remember me'}
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white mt-6"
                      >
                        {locale === 'fr' ? 'Se connecter' : 'Log In'}
                      </Button>
                    </form>
                  </Form>

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
                      {locale === 'fr' ? 'Pas encore de compte ?' : 'Don\'t have an account?'}{' '}
                      <Link
                        href="/auth/register"
                        className="text-primary font-medium hover:underline inline-flex items-center"
                      >
                        {locale === 'fr' ? 'S\'inscrire' : 'Sign up'}
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