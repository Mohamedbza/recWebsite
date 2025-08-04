"use client"

import React, { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Building2, Mail, Phone, MapPin, Globe, 
  Calendar, Users, Award, Edit, Save, X,
  Upload, ExternalLink, CheckCircle, Clock
} from "lucide-react"
import { employerApiService, EmployerProfile } from "@/lib/employer-api"
import { motion } from "framer-motion"

interface ProfileManagementProps {
  isLoading: boolean
}

export default function ProfileManagement({ isLoading }: ProfileManagementProps) {
  const { locale } = useLanguage()
  const [profile, setProfile] = useState<EmployerProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    website: "",
    foundedYear: "",
    registrationNumber: "",
    taxId: "",
    totalEmployees: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: ""
    }
  })

  // Load profile data
  useEffect(() => {
    if (!isLoading) {
      loadProfile()
    }
  }, [isLoading])

  const loadProfile = async () => {
    try {
      const profileData = await employerApiService.getProfile()
      setProfile(profileData)
      setFormData({
        name: profileData.name || "",
        industry: profileData.industry || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        address: profileData.address || "",
        city: profileData.city || "",
        country: profileData.country || "",
        website: profileData.website || "",
        foundedYear: profileData.foundedYear?.toString() || "",
        registrationNumber: profileData.registrationNumber || "",
        taxId: profileData.taxId || "",
        totalEmployees: profileData.totalEmployees?.toString() || "",
        socialLinks: {
          linkedin: profileData.socialLinks?.linkedin || "",
          twitter: profileData.socialLinks?.twitter || "",
          facebook: profileData.socialLinks?.facebook || "",
          instagram: profileData.socialLinks?.instagram || ""
        }
      })
    } catch (err) {
      console.error('Failed to load profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to load profile')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.split('.')[1] as keyof typeof formData.socialLinks
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const updateData = {
        ...formData,
        foundedYear: formData.foundedYear ? parseInt(formData.foundedYear) : undefined,
        totalEmployees: formData.totalEmployees ? parseInt(formData.totalEmployees) : undefined
      }

      await employerApiService.updateProfile(updateData)
      await loadProfile() // Reload to get updated data
      setIsEditing(false)
      setSuccess(locale === 'fr' ? 'Profil mis à jour avec succès' : 'Profile updated successfully')
    } catch (err) {
      console.error('Failed to update profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        industry: profile.industry || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        country: profile.country || "",
        website: profile.website || "",
        foundedYear: profile.foundedYear?.toString() || "",
        registrationNumber: profile.registrationNumber || "",
        taxId: profile.taxId || "",
        totalEmployees: profile.totalEmployees?.toString() || "",
        socialLinks: {
          linkedin: profile.socialLinks?.linkedin || "",
          twitter: profile.socialLinks?.twitter || "",
          facebook: profile.socialLinks?.facebook || "",
          instagram: profile.socialLinks?.instagram || ""
        }
      })
    }
    setIsEditing(false)
    setError(null)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {locale === 'fr' ? 'Profil non trouvé' : 'Profile not found'}
          </h3>
          <p className="text-muted-foreground text-center mb-4">
            {locale === 'fr' 
              ? 'Impossible de charger les informations du profil.'
              : 'Unable to load profile information.'
            }
          </p>
          <Button onClick={loadProfile}>
            {locale === 'fr' ? 'Réessayer' : 'Retry'}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">
            {locale === 'fr' ? 'Profil de l\'entreprise' : 'Company Profile'}
          </h2>
          <p className="text-muted-foreground">
            {locale === 'fr' 
              ? 'Gérez les informations de votre entreprise'
              : 'Manage your company information'
            }
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              {locale === 'fr' ? 'Modifier' : 'Edit'}
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving 
                  ? (locale === 'fr' ? 'Enregistrement...' : 'Saving...')
                  : (locale === 'fr' ? 'Enregistrer' : 'Save')
                }
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                {locale === 'fr' ? 'Annuler' : 'Cancel'}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-red-600 text-sm">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-green-600 text-sm">{success}</p>
        </motion.div>
      )}

      {/* Profile Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {locale === 'fr' ? 'Statut du profil' : 'Profile Status'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant={profile.isVerified ? "default" : "secondary"} className="flex items-center gap-1">
              {profile.isVerified ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
              {profile.isVerified 
                ? (locale === 'fr' ? 'Vérifié' : 'Verified')
                : (locale === 'fr' ? 'En attente' : 'Pending')
              }
            </Badge>
            <Badge variant={profile.isPremium ? "default" : "outline"}>
              {profile.isPremium 
                ? (locale === 'fr' ? 'Premium' : 'Premium')
                : (locale === 'fr' ? 'Standard' : 'Standard')
              }
            </Badge>
            <Badge variant="outline">
              {profile.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === 'fr' ? 'Informations de base' : 'Basic Information'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Informations principales de votre entreprise'
              : 'Main company information'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {locale === 'fr' ? 'Nom de l\'entreprise' : 'Company Name'} *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={locale === 'fr' ? 'Nom de votre entreprise' : 'Your company name'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">
                {locale === 'fr' ? 'Secteur d\'activité' : 'Industry'} *
              </Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={locale === 'fr' ? 'Ex: Technologie, Santé, Finance' : 'Ex: Technology, Healthcare, Finance'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {locale === 'fr' ? 'Email' : 'Email'} *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="contact@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                {locale === 'fr' ? 'Téléphone' : 'Phone'} *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="1866 305-8982"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              {locale === 'fr' ? 'Adresse' : 'Address'} *
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder={locale === 'fr' ? 'Adresse complète' : 'Complete address'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                {locale === 'fr' ? 'Ville' : 'City'}
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={locale === 'fr' ? 'Ville' : 'City'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">
                {locale === 'fr' ? 'Pays' : 'Country'}
              </Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={locale === 'fr' ? 'Pays' : 'Country'}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === 'fr' ? 'Informations supplémentaires' : 'Additional Information'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Détails supplémentaires sur votre entreprise'
              : 'Additional company details'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">
                {locale === 'fr' ? 'Site web' : 'Website'}
              </Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://www.company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="foundedYear">
                {locale === 'fr' ? 'Année de création' : 'Founded Year'}
              </Label>
              <Input
                id="foundedYear"
                name="foundedYear"
                type="number"
                value={formData.foundedYear}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="2020"
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">
                {locale === 'fr' ? 'Numéro d\'enregistrement' : 'Registration Number'}
              </Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={locale === 'fr' ? 'Numéro d\'enregistrement' : 'Registration number'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">
                {locale === 'fr' ? 'Numéro de TVA' : 'Tax ID'}
              </Label>
              <Input
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={locale === 'fr' ? 'Numéro de TVA' : 'Tax ID'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalEmployees">
              {locale === 'fr' ? 'Nombre d\'employés' : 'Total Employees'}
            </Label>
            <Input
              id="totalEmployees"
              name="totalEmployees"
              type="number"
              value={formData.totalEmployees}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="50"
              min="1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {locale === 'fr' ? 'Réseaux sociaux' : 'Social Media'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Liens vers vos réseaux sociaux'
              : 'Links to your social media profiles'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://linkedin.com/company/your-company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">
                Twitter
              </Label>
              <Input
                id="twitter"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://twitter.com/your-company"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">
                Facebook
              </Label>
              <Input
                id="facebook"
                name="socialLinks.facebook"
                value={formData.socialLinks.facebook}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://facebook.com/your-company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">
                Instagram
              </Label>
              <Input
                id="instagram"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="https://instagram.com/your-company"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 