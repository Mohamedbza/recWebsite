"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/EmployerAuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  Settings, Bell, Globe, Shield, User, 
  Mail, Lock, Smartphone, Database,
  Save, Trash2, AlertTriangle
} from "lucide-react"

export default function SettingsPage() {
  const { locale } = useLanguage()
  const { user } = useAuth()
  
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

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {locale === 'fr' ? 'Paramètres' : 'Settings'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {locale === 'fr' 
            ? 'Gérez vos préférences et paramètres de compte'
            : 'Manage your account preferences and settings'}
        </p>
      </div>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {locale === 'fr' ? 'Notifications' : 'Notifications'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Choisissez comment vous souhaitez être notifié'
              : 'Choose how you want to be notified'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">
                {locale === 'fr' ? 'Notifications par email' : 'Email notifications'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Recevez des emails pour les mises à jour importantes'
                  : 'Receive emails for important updates'}
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.notifications.emailNotifications}
              onCheckedChange={(checked) => 
                handleSettingChange('notifications', 'emailNotifications', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="job-alerts">
                {locale === 'fr' ? 'Alertes emploi' : 'Job alerts'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Soyez alerté des nouvelles offres correspondant à votre profil'
                  : 'Get notified about new jobs matching your profile'}
              </p>
            </div>
            <Switch
              id="job-alerts"
              checked={settings.notifications.jobAlerts}
              onCheckedChange={(checked) => 
                handleSettingChange('notifications', 'jobAlerts', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="application-updates">
                {locale === 'fr' ? 'Mises à jour des candidatures' : 'Application updates'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Notifications sur le statut de vos candidatures'
                  : 'Notifications about your application status'}
              </p>
            </div>
            <Switch
              id="application-updates"
              checked={settings.notifications.applicationUpdates}
              onCheckedChange={(checked) => 
                handleSettingChange('notifications', 'applicationUpdates', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-newsletter">
                {locale === 'fr' ? 'Newsletter hebdomadaire' : 'Weekly newsletter'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Recevez un résumé hebdomadaire des opportunités'
                  : 'Receive a weekly summary of opportunities'}
              </p>
            </div>
            <Switch
              id="weekly-newsletter"
              checked={settings.notifications.weeklyNewsletter}
              onCheckedChange={(checked) => 
                handleSettingChange('notifications', 'weeklyNewsletter', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">
                {locale === 'fr' ? 'Notifications SMS' : 'SMS notifications'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Recevez des SMS pour les événements urgents'
                  : 'Receive SMS for urgent events'}
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.notifications.smsNotifications}
              onCheckedChange={(checked) => 
                handleSettingChange('notifications', 'smsNotifications', checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {locale === 'fr' ? 'Confidentialité' : 'Privacy'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Contrôlez qui peut voir vos informations'
              : 'Control who can see your information'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profile-visible">
                {locale === 'fr' ? 'Profil visible par les employeurs' : 'Profile visible to employers'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Permettre aux employeurs de trouver votre profil'
                  : 'Allow employers to find your profile'}
              </p>
            </div>
            <Switch
              id="profile-visible"
              checked={settings.privacy.profileVisible}
              onCheckedChange={(checked) => 
                handleSettingChange('privacy', 'profileVisible', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-email">
                {locale === 'fr' ? 'Afficher l\'email' : 'Show email'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Afficher votre email sur votre profil public'
                  : 'Display your email on your public profile'}
              </p>
            </div>
            <Switch
              id="show-email"
              checked={settings.privacy.showEmail}
              onCheckedChange={(checked) => 
                handleSettingChange('privacy', 'showEmail', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-contact">
                {locale === 'fr' ? 'Autoriser le contact direct' : 'Allow direct contact'}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'fr' 
                  ? 'Permettre aux employeurs de vous contacter directement'
                  : 'Allow employers to contact you directly'}
              </p>
            </div>
            <Switch
              id="allow-contact"
              checked={settings.privacy.allowContactFromEmployers}
              onCheckedChange={(checked) => 
                handleSettingChange('privacy', 'allowContactFromEmployers', checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {locale === 'fr' ? 'Préférences' : 'Preferences'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Personnalisez votre expérience'
              : 'Customize your experience'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">
                {locale === 'fr' ? 'Langue' : 'Language'}
              </Label>
              <Select
                value={settings.preferences.language}
                onValueChange={(value) => 
                  handleSettingChange('preferences', 'language', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-alert-frequency">
                {locale === 'fr' ? 'Fréquence des alertes emploi' : 'Job alert frequency'}
              </Label>
              <Select
                value={settings.preferences.jobAlertFrequency}
                onValueChange={(value) => 
                  handleSettingChange('preferences', 'jobAlertFrequency', value)
                }
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

            <div className="space-y-2">
              <Label htmlFor="location">
                {locale === 'fr' ? 'Localisation préférée' : 'Preferred location'}
              </Label>
              <Select
                value={settings.preferences.location}
                onValueChange={(value) => 
                  handleSettingChange('preferences', 'location', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="montreal">Montreal, QC</SelectItem>
                  <SelectItem value="toronto">Toronto, ON</SelectItem>
                  <SelectItem value="vancouver">Vancouver, BC</SelectItem>
                  <SelectItem value="calgary">Calgary, AB</SelectItem>
                  <SelectItem value="ottawa">Ottawa, ON</SelectItem>
                  <SelectItem value="remote">{locale === 'fr' ? 'Télétravail' : 'Remote'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {locale === 'fr' ? 'Gestion du compte' : 'Account Management'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Gérez votre compte et vos données'
              : 'Manage your account and data'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <Lock className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Changer le mot de passe' : 'Change Password'}
            </Button>
            
            <Button variant="outline" className="justify-start">
              <Database className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Télécharger mes données' : 'Download My Data'}
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-900 dark:text-red-100">
                  {locale === 'fr' ? 'Zone de danger' : 'Danger Zone'}
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {locale === 'fr' 
                    ? 'Cette action supprimera définitivement votre compte et toutes vos données.'
                    : 'This action will permanently delete your account and all your data.'}
                </p>
                <Button variant="destructive" className="mt-3" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Supprimer le compte' : 'Delete Account'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          {locale === 'fr' ? 'Sauvegarder les modifications' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
} 