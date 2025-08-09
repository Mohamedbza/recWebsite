"use client"

import Link from "next/link"
import Image from "next/image"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  Users, 
  Award, 
  Target, 
  Heart, 
  Shield, 
  Zap, 
  Globe,
  Building2,
  CheckCircle,
  Calendar,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { Badge } from "@/components/ui/badge"

export default function AProposPage() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Enhanced Background with better contrast */}
          <div className="absolute inset-0 bg-white dark:bg-gray-900 z-0">
            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-15 dark:opacity-25 z-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Subtle animated shapes */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full filter blur-3xl opacity-30 dark:opacity-40 floating-element z-5"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/20 dark:bg-secondary/30 rounded-full filter blur-3xl opacity-30 dark:opacity-40 floating-element z-5"
            style={{ animationDelay: "-3s" }}
          ></div>

          <div className="container relative z-20">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="inline-block mb-6 px-6 py-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm rounded-full text-primary dark:text-white font-medium text-sm shimmer border border-primary/20 dark:border-white/20">
                  <Heart className="inline-block h-4 w-4 mr-2" />
                  {t('about.hero.badge')}
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {t('about.hero.title')}
                  </span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.hero.description')}
                </p>
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary/90 hover:to-secondary/90 text-white shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 rounded-2xl border-0"
                  onClick={() => window.location.href = '/contact'}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('about.hero.contact_button')}
                </Button>
              </div>
              <div className="relative">
                <div className="magic-card p-2 overflow-hidden">
                  <Image
                    src="/images/team-working.png"
                    alt="Équipe Recruitment Plus en collaboration"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Target className="inline-block h-4 w-4 mr-2" />
                {t('about.mission.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('about.mission.title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                {t('about.mission.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Users,
                  title: t('about.mission.values.0.title'),
                  description: t('about.mission.values.0.description'),
                  color: "from-blue-500/20 to-blue-600/20",
                },
                {
                  icon: Shield,
                  title: t('about.mission.values.1.title'),
                  description: t('about.mission.values.1.description'),
                  color: "from-green-500/20 to-green-600/20",
                },
                {
                  icon: Award,
                  title: t('about.mission.values.2.title'),
                  description: t('about.mission.values.2.description'),
                  color: "from-purple-500/20 to-purple-600/20",
                },
              ].map((value, index) => (
                <div key={index} className="magic-card p-8 text-center group">
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="magic-card p-2 overflow-hidden">
                  <Image
                    src="/images/business-meeting-office-recuiteers.jpg"
                    alt="Notre équipe au travail"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <div className="inline-block px-4 py-1.5 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                  <Sparkles className="inline-block h-4 w-4 mr-2" />
                  {t('about.why_choose.badge')}
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {t('about.why_choose.title')}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('about.why_choose.description')}
                </p>
                <ul className="space-y-6">
                  {[
                    {
                      icon: Award,
                      title: t('about.why_choose.advantages.0.title'),
                      description: t('about.why_choose.advantages.0.description'),
                    },
                    {
                      icon: Heart,
                      title: t('about.why_choose.advantages.1.title'),
                      description: t('about.why_choose.advantages.1.description'),
                    },
                    {
                      icon: Globe,
                      title: t('about.why_choose.advantages.2.title'),
                      description: t('about.why_choose.advantages.2.description'),
                    },
                  ].map((advantage, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-primary/10 shrink-0">
                        <advantage.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{advantage.title}</h3>
                        <p className="text-muted-foreground">{advantage.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Branch Offices Section (Replacing Team Section) */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <MapPin className="inline-block h-4 w-4 mr-2" />
                {t('about.branch_offices.badge') || t('about.team.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('about.branch_offices.title') || t('about.locations.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('about.branch_offices.description') || t('about.locations.description')}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
              {/* Canada Offices Combined Card */}
              <div className="magic-card overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Canada offices"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl text-primary">🇨🇦 Canada</h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      25+ {t('about.branch_offices.employees') || "Employés"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    {/* Longueuil Office */}
                    <div className="border-l-2 border-primary/20 pl-4">
                      <h4 className="font-semibold text-primary mb-2">Longueuil (Siège social)</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">1494 Ch. de Chambly, Bureau 211, Longueuil, QC J4J 3X3</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm text-muted-foreground">1866 305-8982</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm text-muted-foreground">info@recrutementplus.ca</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Montreal Office */}
                    <div className="border-l-2 border-secondary/20 pl-4">
                      <h4 className="font-semibold text-secondary mb-2">Montréal</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">3418 rue Stanley, R 2, Montréal, Québec, H3A 1R8</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-secondary shrink-0" />
                          <span className="text-sm text-muted-foreground">1866 305-8982</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-secondary shrink-0" />
                          <span className="text-sm text-muted-foreground">info@recrutementplus.ca</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">{t('about.branch_offices.services') || "Services"}</h4>
                    <p className="text-sm text-muted-foreground">{t('about.branch_offices.offices.0.services') || "Recrutement local et international - Siège social"}</p>
                  </div>
                </div>
              </div>

              {/* Dubai Office */}
              <div className="magic-card overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Dubai office"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl text-primary">🇦🇪 Dubai</h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      8+ {t('about.branch_offices.employees') || "Employés"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">33rd Floor, Office No. 3301, Latifa Tower, Trade Center 1, Sheikh Zayed Rd, Dubai, UAE</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">1866 305-8982</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">info@recrutementplus.ca</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">{t('about.branch_offices.services') || "Services"}</h4>
                    <p className="text-sm text-muted-foreground">{t('about.branch_offices.offices.2.services') || "Recrutement Moyen-Orient et Asie - Secteurs émergents"}</p>
                  </div>
                </div>
              </div>

              {/* Istanbul Office */}
              <div className="magic-card overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                    alt="Istanbul office"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl text-primary">🇹🇷 Istanbul</h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      10+ {t('about.branch_offices.employees') || "Employés"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">10 floor, Block A, 48, BJK Plaza, Vişnezade, Süleyman Seba street, 34357 Beşiktaş/ Istanbul</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">1866 305-8982</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">info@recrutementplus.ca</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">{t('about.branch_offices.services') || "Services"}</h4>
                    <p className="text-sm text-muted-foreground">{t('about.branch_offices.offices.1.services') || "Recrutement Europe et Moyen-Orient - Spécialités techniques"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="container relative">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium text-sm">
                <Zap className="inline-block h-4 w-4 mr-2" />
                {t('about.stats.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t('about.stats.title')}</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {t('about.stats.description')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { 
                  number: t('about.stats.stats.0.number'), 
                  label: t('about.stats.stats.0.label'), 
                  icon: Building2,
                  color: "from-blue-500/20 to-blue-600/20"
                },
                { 
                  number: t('about.stats.stats.1.number'), 
                  label: t('about.stats.stats.1.label'), 
                  icon: CheckCircle,
                  color: "from-green-500/20 to-green-600/20"
                },
                { 
                  number: t('about.stats.stats.2.number'), 
                  label: t('about.stats.stats.2.label'), 
                  icon: Calendar,
                  color: "from-purple-500/20 to-purple-600/20"
                },
                { 
                  number: t('about.stats.stats.3.number'), 
                  label: t('about.stats.stats.3.label'), 
                  icon: Star,
                  color: "from-yellow-500/20 to-yellow-600/20"
                },
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg magic-card group"
                  >
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"
            style={{ animationDelay: "-2s" }}
          ></div>
        </section>


        {/* Contact Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container relative">
            <div className="magic-border">
              <div className="magic-border-content bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="text-center relative p-8 md:p-12">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t('about.contact.title')}</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {t('about.contact.description')}
                  </p>

                  <div className="grid gap-8 md:grid-cols-3 mb-8">
                    {[
                      { 
                        icon: Phone, 
                        title: t('about.contact.contacts.0.title'), 
                        info: t('about.contact.contacts.0.info') 
                      },
                      { 
                        icon: Mail, 
                        title: t('about.contact.contacts.1.title'), 
                        info: t('about.contact.contacts.1.info')
                      },
                      { 
                        icon: MapPin, 
                        title: t('about.contact.contacts.2.title'), 
                        info: t('about.contact.contacts.2.info')
                      },
                    ].map((contact, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                          <contact.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold mb-2">{contact.title}</h3>
                        <p className="text-sm opacity-90">{contact.info}</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-xl bg-white/90 text-primary hover:bg-white transition-all duration-300"
                    onClick={() => window.location.href = '/contact'}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    {t('about.contact.contact_button')}
                  </Button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"></div>
                <div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"
                  style={{ animationDelay: "-2.5s" }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
