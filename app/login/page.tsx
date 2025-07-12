"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/LanguageContext"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Mock login function - would connect to authentication service in production
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Example validation
      if (!email || !password) {
        throw new Error("Please enter both email and password")
      }

      // Success notification
      toast({
        title: t('login.success_title'),
        description: t('login.success_message'),
      })

      // Redirect to home page
      router.push("/")
    } catch (error) {
      toast({
        title: t('login.error_title'),
        description: error instanceof Error ? error.message : t('login.error_message'),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
          <div className="inline-block mb-6 px-6 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
            <Sparkles className="inline-block h-4 w-4 mr-2" />
            {t('login.welcome')}
          </div>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('login.title')}
            </span>
          </h1>
          <p className="text-muted-foreground">
            {t('login.subtitle')}
          </p>
        </div>

        <div className="magic-card p-6 shadow-xl bg-background/70 backdrop-blur-md border border-white/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email_label')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login.email_placeholder')}
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
                <Label htmlFor="password">{t('login.password_label')}</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-primary hover:underline underline-offset-4"
                >
                  {t('login.forgot_password')}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t('login.password_placeholder')}
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
              {isLoading ? t('login.loading') : t('login.submit')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            {t('login.no_account')}{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              {t('login.register_link')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}