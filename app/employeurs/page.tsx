"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Award,
  Target,
  Building2,
  Globe,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export default function EmployeursPage() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background with gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background/80 to-primary/20 z-0">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23031F28' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Animated shapes */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-50 floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50 floating-element"
            style={{ animationDelay: "-3s" }}
          ></div>

          <div className="container relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="inline-block mb-6 px-6 py-2 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                  <Building2 className="inline-block h-4 w-4 mr-2" />
                  {t('employers.hero.badge')}
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  {t('employers.hero.title')}{" "}
                  <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    {t('employers.hero.subtitle')}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('employers.hero.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="magic-button">
                    <Users className="mr-2 h-5 w-5" />
                    {t('employers.hero.post_job_button')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl border-white/20 backdrop-blur-sm hover:bg-white/10"
                  >
                    {t('employers.hero.services_button')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="magic-card p-2 overflow-hidden">
                  <Image
                    src="/images/business-meeting-office-recuiteers.jpg"
                    alt="Équipe professionnelle"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                <Globe className="inline-block h-4 w-4 mr-2" />
                {t('employers.industries.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t('employers.industries.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('employers.industries.description')}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {t('employers.industries.industries').map((industry, index) => {
                const colors = [
                  "from-blue-500/20 to-blue-600/20",
                  "from-green-500/20 to-green-600/20",
                  "from-yellow-500/20 to-yellow-600/20",
                  "from-purple-500/20 to-purple-600/20",
                  "from-red-500/20 to-red-600/20",
                  "from-orange-500/20 to-orange-600/20",
                  "from-indigo-500/20 to-indigo-600/20",
                  "from-pink-500/20 to-pink-600/20"
                ];
                const color = colors[index % colors.length];
                return (
                <div key={index} className="magic-card group overflow-hidden">
                  <div className={`h-48 bg-gradient-to-br ${color} relative`}>
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt={industry}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <h3 className="font-bold text-white text-lg">{industry}</h3>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                <Zap className="inline-block h-4 w-4 mr-2" />
                {t('employers.solutions.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t('employers.solutions.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('employers.solutions.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Solution 1 */}
              <div className="magic-card p-8 group">
                <div className="mb-6 relative">
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt={t('employers.solutions.service_types.local.title')}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                    {t('employers.solutions.service_types.local.badge')}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('employers.solutions.service_types.local.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('employers.solutions.service_types.local.description')}
                </p>
                <ul className="space-y-3 mb-6">
                  {t('employers.solutions.service_types.local.features').map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/employeurs/recrutement-local"
                  className="inline-flex items-center text-sm font-medium text-primary group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                    {t('employers.solutions.learn_more')}
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Solution 2 */}
              <div className="magic-card p-8 group">
                <div className="mb-6 relative">
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt={t('employers.solutions.service_types.national.title')}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 text-white text-xs font-medium rounded-full">
                    {t('employers.solutions.service_types.national.badge')}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('employers.solutions.service_types.national.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('employers.solutions.service_types.national.description')}
                </p>
                <ul className="space-y-3 mb-6">
                  {t('employers.solutions.service_types.national.features').map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/employeurs/recrutement-national"
                  className="inline-flex items-center text-sm font-medium text-primary group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                    {t('employers.solutions.learn_more')}
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Solution 3 */}
              <div className="magic-card p-8 group">
                <div className="mb-6 relative">
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt={t('employers.solutions.service_types.international.title')}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium rounded-full">
                    {t('employers.solutions.service_types.international.badge')}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('employers.solutions.service_types.international.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('employers.solutions.service_types.international.description')}
                </p>
                <ul className="space-y-3 mb-6">
                  {t('employers.solutions.service_types.international.features').map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/employeurs/recrutement-international"
                  className="inline-flex items-center text-sm font-medium text-primary group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                    {t('employers.solutions.learn_more')}
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                <Target className="inline-block h-4 w-4 mr-2" />
                {t('employers.process.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t('employers.process.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('employers.process.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
              {t('employers.process.steps').map((step, index) => {
                const icons = [Target, Globe, Users, Award, TrendingUp];
                const IconComponent = icons[index % icons.length];
                return (
                <div key={index} className="magic-card p-6 text-center group">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-secondary">{step.step}</span>
                  </div>
                  <div className="mb-4 text-secondary">
                    <IconComponent className="h-8 w-8 mx-auto" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 backdrop-blur-sm rounded-full text-secondary font-medium text-sm shimmer">
                <Sparkles className="inline-block h-4 w-4 mr-2" />
                {t('employers.additional_services.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t('employers.additional_services.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('employers.additional_services.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {t('employers.additional_services.services').map((service, index) => {
                const icons = [Building2, Users, Target];
                const IconComponent = icons[index % icons.length];
                return (
                <div key={index} className="magic-card p-8 group">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container relative">
            <div className="magic-border">
              <div className="magic-border-content bg-gradient-to-r from-secondary to-secondary/80 text-primary-foreground relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="text-center relative p-8 md:p-12">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t('employers.cta.title')}</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {t('employers.cta.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-xl bg-white/90 text-secondary hover:bg-white transition-all duration-300"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      {t('employers.cta.post_job_button')}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl bg-transparent text-white border-white/30 hover:bg-white/10 transition-all duration-300"
                    >
                      {t('employers.cta.contact_button')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
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
