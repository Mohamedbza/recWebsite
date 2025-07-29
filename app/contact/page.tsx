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
  CheckCircle2,
  Clock,
  Globe,
  Zap,
  ArrowRight,
  Star,
  Users,
  Calendar,
  Headphones
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

  // Contact methods data
  const contactMethods = [
    {
      icon: Phone,
      title: locale === 'fr' ? 'Appelez-nous' : 'Call Us',
      description: locale === 'fr' ? 'Lun-Ven: 9h-17h' : 'Mon-Fri: 9am-5pm',
      contact: '+1 (514) 123-4567',
      action: 'tel:+15141234567',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: locale === 'fr' ? 'Écrivez-nous' : 'Email Us',
      description: locale === 'fr' ? 'Réponse sous 24h' : 'Response within 24h',
      contact: 'contact@recruitmentplus.ca',
      action: 'mailto:contact@recruitmentplus.ca',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: MessageSquare,
      title: locale === 'fr' ? 'Chat en direct' : 'Live Chat',
      description: locale === 'fr' ? 'Support instantané' : 'Instant support',
      contact: locale === 'fr' ? 'Disponible maintenant' : 'Available now',
      action: '#',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Calendar,
      title: locale === 'fr' ? 'Rendez-vous' : 'Book Meeting',
      description: locale === 'fr' ? 'Consultation gratuite' : 'Free consultation',
      contact: locale === 'fr' ? 'Planifier maintenant' : 'Schedule now',
      action: '#',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  // Office locations
  const officeLocations = [
    {
      city: locale === 'fr' ? 'Montréal (Siège social)' : 'Montreal (Headquarters)',
      address: locale === 'fr' 
        ? '123 Rue Principale, Montréal, QC H3Z 2Y7'
        : '123 Main Street, Montreal, QC H3Z 2Y7',
      phone: '+1 (514) 123-4567',
      email: 'montreal@recruitmentplus.ca',
      flag: '🇨🇦',
      timezone: 'EST'
    },
    {
      city: 'Istanbul',
      address: 'Levent Mahallesi, İstanbul, Turkey',
      phone: '+90 212 123-4567',
      email: 'istanbul@recruitmentplus.ca',
      flag: '🇹🇷',
      timezone: 'TRT'
    },
    {
      city: 'Dubai',
      address: 'Business Bay, Dubai, UAE',
      phone: '+971 4 123-4567',
      email: 'dubai@recruitmentplus.ca',
      flag: '🇦🇪',
      timezone: 'GST'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Revolutionary Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Dynamic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
            
            {/* Floating Elements */}
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-white/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white/5 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: "-2s" }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "-4s" }}></div>
          </div>

          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                <Zap className="h-4 w-4" />
                <span className="text-sm">
                  {locale === 'fr' ? '⚡ Réponse garantie sous 2 heures' : '⚡ Response guaranteed within 2 hours'}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                {locale === 'fr' ? 'Parlons de vos' : 'Let\'s Talk About'}<br />
                <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  {locale === 'fr' ? 'Ambitions' : 'Your Vision'}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
                {locale === 'fr' 
                  ? 'Que vous soyez candidat ou employeur, nous sommes là pour transformer vos objectifs en réussites concrètes.'
                  : 'Whether you\'re a candidate or employer, we\'re here to transform your goals into concrete successes.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-white/90 hover:bg-white text-primary hover:text-primary/90 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105">
                  <Users className="mr-2 h-5 w-5" />
                  {locale === 'fr' ? 'Démarrer maintenant' : 'Get Started Now'}
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                  <Calendar className="mr-2 h-5 w-5" />
                  {locale === 'fr' ? 'Prendre rendez-vous' : 'Book a Meeting'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <section className="py-20 relative">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="px-4 py-2 mb-6 border-primary/30 bg-primary/5 text-primary font-medium">
                {locale === 'fr' ? 'Plusieurs façons de nous joindre' : 'Multiple Ways to Reach Us'}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Choisissez votre méthode préférée' : 'Choose Your Preferred Method'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {contactMethods.map((method, index) => (
                <Card key={index} className="group cursor-pointer border-0 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {method.description}
                    </p>
                    <p className="font-semibold text-primary">
                      {method.contact}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-muted/30 to-muted/10"></div>
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
              
              {/* Contact Form - Taking More Space */}
              <div className="lg:col-span-3">
                <Card className="bg-background/95 backdrop-blur-xl shadow-2xl border-0 rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-1">
                    <div className="bg-background rounded-3xl">
                      <CardHeader className="p-8 pb-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-primary/10 rounded-xl">
                            <MessageSquare className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">
                              {locale === 'fr' ? 'Envoyez-nous un message' : 'Send Us a Message'}
                            </CardTitle>
                            <CardDescription className="text-base mt-1">
                              {locale === 'fr' 
                                ? 'Décrivez votre projet et recevez une réponse personnalisée' 
                                : 'Describe your project and receive a personalized response'}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-8 pt-4">
                        {formSuccess ? (
                          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-2xl p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 mb-6">
                              <CheckCircle2 className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-emerald-700 dark:text-emerald-300">
                              {locale === 'fr' ? 'Message envoyé avec succès!' : 'Message sent successfully!'}
                            </h3>
                            <p className="text-emerald-600 dark:text-emerald-400 text-lg">
                              {locale === 'fr' 
                                ? 'Notre équipe vous contactera dans les 2 prochaines heures.'
                                : 'Our team will contact you within the next 2 hours.'}
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
                                      <FormLabel className="text-base font-semibold">
                                        {locale === 'fr' ? 'Nom complet' : 'Full Name'}
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder={locale === 'fr' ? 'Votre nom' : 'Your name'} 
                                          className="h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
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
                                      <FormLabel className="text-base font-semibold">
                                        {locale === 'fr' ? 'Email' : 'Email'}
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder={locale === 'fr' ? 'votre@email.com' : 'your@email.com'} 
                                          className="h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
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
                                      <FormLabel className="text-base font-semibold">
                                        {locale === 'fr' ? 'Téléphone (optionnel)' : 'Phone (optional)'}
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder={locale === 'fr' ? 'Votre numéro' : 'Your phone number'} 
                                          className="h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="userType"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-base font-semibold">
                                        {locale === 'fr' ? 'Vous êtes' : 'You are'}
                                      </FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl">
                                            <SelectValue placeholder={locale === 'fr' ? 'Sélectionnez' : 'Select'} />
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
                              </div>

                              <FormField
                                control={form.control}
                                name="officeLocation"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-base font-semibold">
                                      {locale === 'fr' ? 'Bureau à contacter' : 'Office to contact'}
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl">
                                          <SelectValue placeholder={locale === 'fr' ? 'Sélectionnez un bureau' : 'Select an office'} />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {officeLocations.map((office, index) => (
                                          <SelectItem key={index} value={office.city}>
                                            {office.flag} {office.city}
                                          </SelectItem>
                                        ))}
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
                                    <FormLabel className="text-base font-semibold">
                                      {locale === 'fr' ? 'Sujet' : 'Subject'}
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder={locale === 'fr' ? 'Sujet de votre message' : 'Subject of your message'} 
                                        className="h-12 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
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
                                    <FormLabel className="text-base font-semibold">
                                      {locale === 'fr' ? 'Message' : 'Message'}
                                    </FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder={locale === 'fr' ? 'Décrivez votre projet, vos besoins et objectifs...' : 'Describe your project, needs and objectives...'} 
                                        className="min-h-32 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 rounded-xl resize-none transition-all duration-300"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormDescription className="text-sm text-muted-foreground">
                                      {locale === 'fr' 
                                        ? 'Plus vous serez précis, mieux nous pourrons vous aider.' 
                                        : 'The more specific you are, the better we can help you.'}
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Button 
                                type="submit" 
                                className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                              >
                                <Send className="mr-3 h-5 w-5" />
                                {locale === 'fr' ? 'Envoyer le message' : 'Send Message'}
                                <ArrowRight className="ml-3 h-5 w-5" />
                              </Button>
                            </form>
                          </Form>
                        )}
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Global Offices */}
                <Card className="bg-background/90 backdrop-blur-xl shadow-xl border-0 rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6">
                    <CardTitle className="flex items-center text-xl">
                      <Globe className="mr-3 h-6 w-6 text-primary" />
                      {locale === 'fr' ? 'Nos Bureaux Internationaux' : 'Our Global Offices'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {officeLocations.map((location, index) => (
                        <div key={index} className="group p-4 rounded-xl border border-muted/30 hover:border-primary/30 bg-gradient-to-r from-background to-muted/20 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{location.flag}</span>
                              <div>
                                <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                                  {location.city}
                                </h4>
                                <p className="text-sm text-muted-foreground">{location.timezone}</p>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{location.address}</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-primary" />
                              <span className="font-medium">{location.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-primary" />
                              <span className="font-medium">{location.email}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose Us */}
                <Card className="bg-background/90 backdrop-blur-xl shadow-xl border-0 rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-6">
                    <CardTitle className="flex items-center text-xl">
                      <Star className="mr-3 h-6 w-6 text-primary" />
                      {locale === 'fr' ? 'Pourquoi nous choisir?' : 'Why Choose Us?'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          icon: Headphones,
                          title: locale === 'fr' ? 'Support 24/7' : '24/7 Support',
                          desc: locale === 'fr' ? 'Toujours là pour vous' : 'Always there for you'
                        },
                        {
                          icon: Users,
                          title: locale === 'fr' ? 'Experts dédiés' : 'Dedicated Experts',
                          desc: locale === 'fr' ? 'Équipe spécialisée' : 'Specialized team'
                        },
                        {
                          icon: Globe,
                          title: locale === 'fr' ? 'Portée internationale' : 'Global Reach',
                          desc: locale === 'fr' ? 'Présence mondiale' : 'Worldwide presence'
                        },
                        {
                          icon: Clock,
                          title: locale === 'fr' ? 'Réponse rapide' : 'Quick Response',
                          desc: locale === 'fr' ? 'Sous 2 heures' : 'Within 2 hours'
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-semibold">{item.title}</h5>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-16 bg-gradient-to-r from-muted/20 to-muted/10">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {locale === 'fr' ? 'Trouvez-nous facilement' : 'Find Us Easily'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {locale === 'fr' 
                  ? 'Nos bureaux sont stratégiquement situés pour mieux vous servir à travers le monde.'
                  : 'Our offices are strategically located to better serve you worldwide.'}
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 h-[500px] group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178784.32285048092!2d-73.99038534179685!3d45.55856668105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C%20QC!5e0!3m2!1sen!2sca!4v1654195420431!5m2!1sen!2sca" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                  className="transition-all duration-300 group-hover:scale-105"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}