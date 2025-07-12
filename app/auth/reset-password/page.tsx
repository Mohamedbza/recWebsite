"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Mail, ShieldQuestion } from "lucide-react"
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
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function ResetPasswordPage() {
  const { t, locale } = useLanguage()
  const router = useRouter()

  // Form validation schema
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: locale === 'fr' ? 'L\'email est requis' : 'Email is required' })
      .email({ message: locale === 'fr' ? 'Email invalide' : 'Invalid email' }),
  })

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // This would normally submit to an API
    console.log(values)
    
    // Show success toast
    toast({
      title: locale === 'fr' ? 'Email envoyé' : 'Email sent',
      description: locale === 'fr' 
        ? 'Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe' 
        : 'If an account exists with this email, you will receive a link to reset your password',
      duration: 5000,
    })
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push('/auth/login')
    }, 3000)
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
                {locale === 'fr' ? 'Réinitialiser votre mot de passe' : 'Reset your password'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {locale === 'fr' 
                  ? 'Entrez votre email pour recevoir un lien de réinitialisation' 
                  : 'Enter your email to receive a reset link'}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="bg-background/90 backdrop-blur-xl shadow-xl border border-white/20">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl flex items-center">
                    <ShieldQuestion className="mr-2 h-6 w-6 text-primary" />
                    {locale === 'fr' ? 'Mot de passe oublié' : 'Forgot Password'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'fr' 
                      ? 'Nous vous enverrons un lien de réinitialisation' 
                      : 'We\'ll send you a reset link'}
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
                                type="email"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              {locale === 'fr' 
                                ? 'Entrez l\'email associé à votre compte' 
                                : 'Enter the email associated with your account'}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white mt-6"
                      >
                        {locale === 'fr' ? 'Envoyer le lien de réinitialisation' : 'Send reset link'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link
                    href="/auth/login"
                    className="text-sm text-primary font-medium hover:underline inline-flex items-center"
                  >
                    <ArrowLeft className="mr-1 h-3 w-3" />
                    {locale === 'fr' ? 'Retour à la connexion' : 'Back to login'}
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}