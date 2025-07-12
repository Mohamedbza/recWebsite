"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { EmployerAuthProvider, useEmployerAuth } from "@/contexts/EmployerAuthContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"

function EmployerLoginContent() {
  const { locale } = useLanguage()
  const { login, isEmployerLoggedIn } = useEmployerAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/employeurs/publier-offre"

  // If already logged in, redirect immediately
  useEffect(() => {
    if (isEmployerLoggedIn) {
      router.replace(returnTo)
    }
  }, [isEmployerLoggedIn])

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card className="bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {locale === 'fr' ? 'Connexion Employeur' : 'Employer Login'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' ? 'Connectez-vous pour continuer' : 'Log in to continue'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              login()
              router.replace(returnTo)
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">{locale === 'fr' ? 'Email' : 'Email'}</label>
              <Input type="email" placeholder="employer@example.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{locale === 'fr' ? 'Mot de passe' : 'Password'}</label>
              <Input type="password" placeholder="********" required />
            </div>
            <Button type="submit" className="w-full mt-6">
              {locale === 'fr' ? 'Se connecter' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          {locale === 'fr' ? 'Démo UI uniquement — n\'importe quel compte fonctionnera' : 'UI demo only — any account works'}
        </CardFooter>
      </Card>
    </div>
  )
}

export default function EmployerLoginPage() {
  return (
    <EmployerAuthProvider>
      <EmployerLoginContent />
    </EmployerAuthProvider>
  )
} 