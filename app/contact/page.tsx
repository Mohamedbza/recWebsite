"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  User, 
  MapPin, 
  Building, 
  CheckCircle2 
} from "lucide-react"
import Link from "next/link"

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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ContactPage() {
  const { t, locale } = useLanguage()
  const [formSuccess, setFormSuccess] = useState(false)

  // Form validation schema
  const formSchema = z.object({
    name: z.string().min(1, { 
      message: locale === 'fr' ? 'Votre nom est requis' : 'Your name is required' 
    }),
    email: z.string()
      .min(1, { message: locale === 'fr' ? 'L\'email est requis' : 'Email is required' })
      .email({ message: locale === 'fr' ? 'Email invalide' : 'Invalid email' }),
    phone: z.string().optional(),
    subject: z.string().min(1, { 
      message: locale === 'fr' ? 'Le sujet est requis' : 'Subject is required' 
    }),
    message: z.string()
      .min(20, { 
        message: locale === 'fr' 
          ? 'Le message doit contenir au moins 20 caractères' 
          : 'Message must be at least 20 characters' 
      }),
    userType: z.string().optional(),
    officeLocation: z.string().min(1, {
      message: locale === 'fr' ? 'Veuillez sélectionner un bureau' : 'Please select an office'
    }),
  })

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      userType: "",
      officeLocation: "",
    },
  })

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // This would normally submit to an API
    console.log(values)
    
    // Show success toast
    toast({
      title: locale === 'fr' ? 'Message envoyé' : 'Message sent',
      description: locale === 'fr' 
        ? 'Nous vous répondrons dans les plus brefs délais' 
        : 'We will get back to you as soon as possible',
      duration: 5000,
    })

    // Reset form and show success state
    form.reset()
    setFormSuccess(true)
    
    // Reset success state after 5 seconds
    setTimeout(() => {
      setFormSuccess(false)
    }, 5000)
  }

  // Office locations
  const officeLocations = [
    {
      city: locale === 'fr' ? 'Montréal (Siège social)' : 'Montreal (Headquarters)',
      address: locale === 'fr' 
        ? '123 Rue Principale, Montréal, QC H3Z 2Y7'
        : '123 Main Street, Montreal, QC H3Z 2Y7',
      phone: '+1 (514) 123-4567',
      email: 'montreal@recruitmentplus.ca'
    },
    {
      city: locale === 'fr' ? 'Québec' : 'Quebec City',
      address: locale === 'fr'
        ? '456 Boulevard des Forges, Québec, QC G1K 7P4'
        : '456 Des Forges Blvd, Quebec City, QC G1K 7P4',
      phone: '+1 (418) 987-6543',
      email: 'quebec@recruitmentplus.ca'
    },
    {
      city: 'Toronto',
      address: '789 Bay Street, Toronto, ON M5G 2N8',
      phone: '+1 (416) 555-7890',
      email: 'toronto@recruitmentplus.ca'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-16 md:py-20 overflow-hidden">
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
            <div className="text-center mb-10">
              <Badge variant="outline" className="px-4 py-1 mb-4 border-primary/50 bg-primary/5 text-primary font-medium">
                {locale === 'fr' ? 'Discutons ensemble' : 'Let\'s Talk'}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {locale === 'fr' 
                  ? 'Vous avez des questions ou souhaitez discuter de vos besoins spécifiques? Nous sommes là pour vous aider.' 
                  : 'Have questions or want to discuss your specific needs? We\'re here to help you.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <Card className="bg-background/90 backdrop-blur-xl shadow-xl border border-white/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Phone className="mr-2 h-6 w-6 text-primary" />
                      {locale === 'fr' ? 'Nos Coordonnées' : 'Our Contact Details'}
                    </CardTitle>
                    <CardDescription>
                      {locale === 'fr' 
                        ? 'Plusieurs façons de nous joindre' 
                        : 'Multiple ways to reach us'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">{locale === 'fr' ? 'Email' : 'Email'}</h3>
                          <p className="text-sm text-muted-foreground">info@recruitmentplus.ca</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">{locale === 'fr' ? 'Téléphone' : 'Phone'}</h3>
                          <p className="text-sm text-muted-foreground">+1 (514) 123-4567</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Building className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">{locale === 'fr' ? 'Heures d\'ouverture' : 'Office Hours'}</h3>
                          <p className="text-sm text-muted-foreground">
                            {locale === 'fr' 
                              ? 'Lun - Ven: 9h à 17h' 
                              : 'Mon - Fri: 9am to 5pm'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-primary" />
                        {locale === 'fr' ? 'Nos Bureaux' : 'Our Offices'}
                      </h3>
                      <div className="space-y-4">
                        {officeLocations.map((location, index) => (
                          <div key={index} className="rounded-lg bg-primary/5 p-3">
                            <h4 className="font-medium text-sm">{location.city}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{location.address}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="text-xs flex items-center">
                                <Phone className="h-3 w-3 mr-1 text-primary" />
                                {location.phone}
                              </div>
                              <div className="text-xs flex items-center">
                                <Mail className="h-3 w-3 mr-1 text-primary" />
                                {location.email}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">{locale === 'fr' ? 'Suivez-nous' : 'Follow Us'}</h3>
                      <div className="flex gap-3">
                        <Button variant="outline" size="icon" className="rounded-full bg-background/50 backdrop-blur-sm border-input/50">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full bg-background/50 backdrop-blur-sm border-input/50">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.196 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.93 4.93 0 001.52 6.575 4.868 4.868 0 01-2.228-.616v.06a4.925 4.925 0 003.95 4.828 4.95 4.95 0 01-2.224.084 4.935 4.935 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.9 13.9 0 007.548 2.209c9.054 0 14.004-7.5 14.004-14.001 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full bg-background/50 backdrop-blur-sm border-input/50">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full bg-background/50 backdrop-blur-sm border-input/50">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="bg-background/90 backdrop-blur-xl shadow-xl border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <MessageSquare className="mr-2 h-6 w-6 text-primary" />
                      {locale === 'fr' ? 'Envoyez-nous un message' : 'Send Us a Message'}
                    </CardTitle>
                    <CardDescription>
                      {locale === 'fr' 
                        ? 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais' 
                        : 'Fill out the form below and we\'ll get back to you as soon as possible'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {formSuccess ? (
                      <div className="bg-primary/10 rounded-xl p-6 text-center">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mb-4">
                          <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">
                          {locale === 'fr' ? 'Message envoyé!' : 'Message sent!'}
                        </h3>
                        <p className="text-muted-foreground">
                          {locale === 'fr' 
                            ? 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.'
                            : 'Thank you for contacting us. We\'ll get back to you as soon as possible.'}
                        </p>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center text-base">
                                    <User className="mr-2 h-4 w-4 text-primary" />
                                    {locale === 'fr' ? 'Nom complet' : 'Full Name'}
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={locale === 'fr' ? 'Votre nom' : 'Your name'} 
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
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center text-base">
                                    <Phone className="mr-2 h-4 w-4 text-primary" />
                                    {locale === 'fr' ? 'Téléphone (optionnel)' : 'Phone (optional)'}
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={locale === 'fr' ? 'Votre numéro de téléphone' : 'Your phone number'} 
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
                              name="officeLocation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center text-base">
                                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                                    {locale === 'fr' ? 'Bureau à contacter' : 'Office to contact'}
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50">
                                        <SelectValue placeholder={locale === 'fr' ? 'Sélectionnez un bureau' : 'Select an office'} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {officeLocations.map((office, index) => (
                                        <SelectItem key={index} value={office.city}>
                                          {office.city}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    {locale === 'fr' 
                                      ? 'Sélectionnez le bureau que vous souhaitez contacter' 
                                      : 'Select the office you want to contact'}
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="userType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <User className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Vous êtes' : 'You are'}
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50">
                                      <SelectValue placeholder={locale === 'fr' ? 'Sélectionnez une option' : 'Select an option'} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="candidate">
                                      {locale === 'fr' ? 'Candidat' : 'Candidate'}
                                    </SelectItem>
                                    <SelectItem value="employer">
                                      {locale === 'fr' ? 'Employeur' : 'Employer'}
                                    </SelectItem>
                                    <SelectItem value="other">
                                      {locale === 'fr' ? 'Autre' : 'Other'}
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Sujet' : 'Subject'}
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={locale === 'fr' ? 'Sujet de votre message' : 'Subject of your message'} 
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
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-base">
                                  <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                                  {locale === 'fr' ? 'Message' : 'Message'}
                                </FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder={locale === 'fr' ? 'Votre message...' : 'Your message...'} 
                                    className="min-h-32 bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  {locale === 'fr' 
                                    ? 'Veuillez inclure tous les détails pertinents pour que nous puissions mieux vous aider.' 
                                    : 'Please include all relevant details so we can better assist you.'}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white mt-6"
                          >
                            <Send className="mr-2 h-4 w-4" />
                            {locale === 'fr' ? 'Envoyer le message' : 'Send Message'}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps Embed */}
        <section className="py-12 relative">
          <div className="container max-w-6xl">
            <div className="rounded-xl overflow-hidden shadow-xl border border-white/20 h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178784.32285048092!2d-73.99038534179685!3d45.55856668105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C%20QC!5e0!3m2!1sen!2sca!4v1654195420431!5m2!1sen!2sca" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              ></iframe>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary/5">
          <div className="container max-w-4xl text-center">
            <h2 className="text-2xl font-bold mb-4">
              {locale === 'fr' ? 'Rejoignez notre réseau' : 'Join Our Network'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {locale === 'fr' 
                ? 'Inscrivez-vous à notre newsletter pour recevoir nos dernières offres d\'emploi et conseils de carrière.'
                : 'Subscribe to our newsletter to receive our latest job offers and career advice.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input 
                placeholder={locale === 'fr' ? 'Votre adresse email' : 'Your email address'} 
                className="bg-background/50 backdrop-blur-sm border-input/50 focus-visible:ring-primary/50"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white">
                {locale === 'fr' ? 'S\'inscrire' : 'Subscribe'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {locale === 'fr' ? 'En vous inscrivant, vous acceptez notre ' : 'By subscribing, you accept our '}
              <Link href="/privacy" className="text-primary hover:underline">
                {locale === 'fr' ? 'politique de confidentialité' : 'privacy policy'}
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}