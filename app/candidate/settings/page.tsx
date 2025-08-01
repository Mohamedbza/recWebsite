"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, Bell, Globe, Shield, User, Palette,
  Mail, Lock, Smartphone, Database, Sun, Moon, Monitor,
  Save, Trash2, AlertTriangle, Check, X, Eye, EyeOff
} from "lucide-react"

export default function SettingsPage() {
  const { locale, setLanguage } = useLanguage()
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      jobAlerts: true,
      applicationUpdates: true,
      weeklyNewsletter: false,
      smsNotifications: false
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      allowContactFromEmployers: true
    },
    preferences: {
      language: locale,
      jobAlertFrequency: 'daily',
      location: user?.location || 'montreal'
    }
  })

  const [showSaveNotification, setShowSaveNotification] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }))
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'fr')
    handleSettingChange('preferences', 'language', newLanguage)
  }

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    setShowSaveNotification(true)
    setTimeout(() => setShowSaveNotification(false), 3000)
  }

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />
      case 'dark': return <Moon className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  const getThemeLabel = () => {
    if (!mounted) return locale === 'fr' ? 'Système' : 'System'
    switch (theme) {
      case 'light': return locale === 'fr' ? 'Clair' : 'Light'
      case 'dark': return locale === 'fr' ? 'Sombre' : 'Dark'
      default: return locale === 'fr' ? 'Système' : 'System'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {locale === 'fr' ? 'Paramètres' : 'Settings'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {locale === 'fr' 
                  ? 'Personnalisez votre expérience et gérez vos préférences'
                  : 'Customize your experience and manage your preferences'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {showSaveNotification && (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                  <Check className="h-3 w-3 mr-1" />
                  {locale === 'fr' ? 'Sauvegardé' : 'Saved'}
                </Badge>
              )}
            </div>
          </div>
          <Separator />
        </div>

        {/* Appearance & Theme */}
        <Card className="bg-background/60 backdrop-blur-sm border-muted/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Apparence' : 'Appearance'}</h3>
                <p className="text-sm text-muted-foreground font-normal">
                  {locale === 'fr' ? 'Personnalisez l\'apparence de l\'interface' : 'Customize the interface appearance'}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                {locale === 'fr' ? 'Mode d\'affichage' : 'Display Mode'}
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', icon: Sun, label: locale === 'fr' ? 'Clair' : 'Light' },
                  { value: 'dark', icon: Moon, label: locale === 'fr' ? 'Sombre' : 'Dark' },
                  { value: 'system', icon: Monitor, label: locale === 'fr' ? 'Système' : 'System' }
                ].map((themeOption) => (
                  <Button
                    key={themeOption.value}
                    variant={theme === themeOption.value ? "default" : "outline"}
                    size="sm"
                    className={`justify-start h-12 ${theme === themeOption.value ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    onClick={() => setTheme(themeOption.value)}
                  >
                    <themeOption.icon className="h-4 w-4 mr-2" />
                    {themeOption.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                {locale === 'fr' ? 'Langue' : 'Language'}
              </Label>
              <Select value={settings.preferences.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card className="bg-background/60 backdrop-blur-sm border-muted/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Notifications' : 'Notifications'}</h3>
                <p className="text-sm text-muted-foreground font-normal">
                  {locale === 'fr' ? 'Gérez vos préférences de notification' : 'Manage your notification preferences'}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                id: 'emailNotifications',
                title: locale === 'fr' ? 'Notifications par email' : 'Email notifications',
                description: locale === 'fr' ? 'Recevez des emails pour les mises à jour importantes' : 'Receive emails for important updates',
                checked: settings.notifications.emailNotifications
              },
              {
                id: 'jobAlerts',
                title: locale === 'fr' ? 'Alertes emploi' : 'Job alerts',
                description: locale === 'fr' ? 'Soyez alerté des nouvelles offres correspondant à votre profil' : 'Get notified about new jobs matching your profile',
                checked: settings.notifications.jobAlerts
              },
              {
                id: 'applicationUpdates',
                title: locale === 'fr' ? 'Mises à jour des candidatures' : 'Application updates',
                description: locale === 'fr' ? 'Notifications sur le statut de vos candidatures' : 'Notifications about your application status',
                checked: settings.notifications.applicationUpdates
              },
              {
                id: 'weeklyNewsletter',
                title: locale === 'fr' ? 'Newsletter hebdomadaire' : 'Weekly newsletter',
                description: locale === 'fr' ? 'Recevez un résumé hebdomadaire des opportunités' : 'Receive a weekly summary of opportunities',
                checked: settings.notifications.weeklyNewsletter
              },
              {
                id: 'smsNotifications',
                title: locale === 'fr' ? 'Notifications SMS' : 'SMS notifications',
                description: locale === 'fr' ? 'Recevez des SMS pour les événements urgents' : 'Receive SMS for urgent events',
                checked: settings.notifications.smsNotifications
              }
            ].map((notification, index) => (
              <div key={notification.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-muted/40">
                <div className="space-y-1 flex-1">
                  <Label htmlFor={notification.id} className="font-medium cursor-pointer">
                    {notification.title}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <Switch
                  id={notification.id}
                  checked={notification.checked}
                  onCheckedChange={(checked) => 
                    handleSettingChange('notifications', notification.id, checked)
                  }
                />
              </div>
            ))}

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                {locale === 'fr' ? 'Fréquence des alertes emploi' : 'Job alert frequency'}
              </Label>
              <Select
                value={settings.preferences.jobAlertFrequency}
                onValueChange={(value) => handleSettingChange('preferences', 'jobAlertFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">{locale === 'fr' ? 'Immédiat' : 'Immediate'}</SelectItem>
                  <SelectItem value="daily">{locale === 'fr' ? 'Quotidien' : 'Daily'}</SelectItem>
                  <SelectItem value="weekly">{locale === 'fr' ? 'Hebdomadaire' : 'Weekly'}</SelectItem>
                  <SelectItem value="never">{locale === 'fr' ? 'Jamais' : 'Never'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="bg-background/60 backdrop-blur-sm border-muted/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Confidentialité' : 'Privacy'}</h3>
                <p className="text-sm text-muted-foreground font-normal">
                  {locale === 'fr' ? 'Contrôlez la visibilité de vos informations' : 'Control the visibility of your information'}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                id: 'profileVisible',
                title: locale === 'fr' ? 'Profil visible par les employeurs' : 'Profile visible to employers',
                description: locale === 'fr' ? 'Permettre aux employeurs de trouver votre profil' : 'Allow employers to find your profile',
                checked: settings.privacy.profileVisible,
                icon: settings.privacy.profileVisible ? Eye : EyeOff
              },
              {
                id: 'showEmail',
                title: locale === 'fr' ? 'Afficher l\'email' : 'Show email',
                description: locale === 'fr' ? 'Afficher votre email sur votre profil public' : 'Display your email on your public profile',
                checked: settings.privacy.showEmail,
                icon: Mail
              },
              {
                id: 'allowContactFromEmployers',
                title: locale === 'fr' ? 'Autoriser le contact direct' : 'Allow direct contact',
                description: locale === 'fr' ? 'Permettre aux employeurs de vous contacter directement' : 'Allow employers to contact you directly',
                checked: settings.privacy.allowContactFromEmployers,
                icon: Smartphone
              }
            ].map((privacy) => (
              <div key={privacy.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-muted/40">
                <div className="flex items-start gap-3 flex-1">
                  <privacy.icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <Label htmlFor={privacy.id} className="font-medium cursor-pointer">
                      {privacy.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {privacy.description}
                    </p>
                  </div>
                </div>
                <Switch
                  id={privacy.id}
                  checked={privacy.checked}
                  onCheckedChange={(checked) => 
                    handleSettingChange('privacy', privacy.id, checked)
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card className="bg-background/60 backdrop-blur-sm border-muted/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{locale === 'fr' ? 'Gestion du compte' : 'Account Management'}</h3>
                <p className="text-sm text-muted-foreground font-normal">
                  {locale === 'fr' ? 'Gérez votre compte et vos données' : 'Manage your account and data'}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-12">
                <Lock className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Changer le mot de passe' : 'Change Password'}
              </Button>
              
              <Button variant="outline" className="justify-start h-12">
                <Database className="h-4 w-4 mr-2" />
                {locale === 'fr' ? 'Télécharger mes données' : 'Download My Data'}
              </Button>
            </div>

            <Separator />

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/40">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-900 dark:text-red-100">
                    {locale === 'fr' ? 'Zone de danger' : 'Danger Zone'}
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1 mb-3">
                    {locale === 'fr' 
                      ? 'Cette action supprimera définitivement votre compte et toutes vos données.'
                      : 'This action will permanently delete your account and all your data.'}
                  </p>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    {locale === 'fr' ? 'Supprimer le compte' : 'Delete Account'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <Button 
            size="lg" 
            className="px-8 h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleSaveSettings}
          >
            <Save className="h-4 w-4 mr-2" />
            {locale === 'fr' ? 'Sauvegarder les modifications' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}