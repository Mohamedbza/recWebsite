"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Sparkles, ArrowRight, CheckCircle, Star, TrendingUp, Users, Award, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/LanguageContext"

export default function CandidatsPage() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Enhanced Design */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background with gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-secondary/20 z-0">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%230F766E' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Animated shapes */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50 floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-50 floating-element"
            style={{ animationDelay: "-3s" }}
          ></div>

          <div className="container relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="inline-block mb-6 px-6 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                  <Sparkles className="inline-block h-4 w-4 mr-2" />
                  {t('candidates.hero.badge')}
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {t('candidates.hero.title')}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('candidates.hero.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="magic-button">
                    <Search className="mr-2 h-5 w-5" />
                    {t('candidates.hero.find_job_button')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl border-white/20 backdrop-blur-sm hover:bg-white/10"
                  >
                    {t('candidates.hero.services_button')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="magic-card p-2 overflow-hidden">
                  <Image
                    src="/images/hero-background.png"
                    alt="Espace de travail moderne pour candidats"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Search Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Search className="inline-block h-4 w-4 mr-2" />
                {t('candidates.job_search.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('candidates.job_search.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('candidates.job_search.description')}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="magic-card p-6 shadow-2xl">
                <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t('candidates.jobs.search_placeholder')}
                      className="magic-input pl-10"
                    />
                  </div>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <Input type="text" placeholder={t('candidates.jobs.location_placeholder')} className="magic-input pl-10" />
                  </div>
                  <Button size="lg" className="magic-button w-full md:w-auto">
                    {t('candidates.job_search.search_button')}
                  </Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="text-sm font-medium text-muted-foreground">{t('candidates.job_search.popular_searches')}</span>
                  {t('candidates.job_search.popular_terms').map((term, index) => (
                    <Link
                      key={term}
                      href={`/candidats/emplois?q=${term.toLowerCase()}`}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-all duration-300"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Award className="inline-block h-4 w-4 mr-2" />
                {t('candidates.services.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('candidates.services.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('candidates.services.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Service 1 */}
              <div className="magic-card p-8 group">
                <div className="mb-6 relative">
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Recrutement Local"
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                    {t('candidates.services.service_types.local.badge')}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('candidates.services.service_types.local.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('candidates.services.service_types.local.description')}
                </p>
                <ul className="space-y-3 mb-6">
                  {t('candidates.services.service_types.local.features').map(
                    (item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ),
                  )}
                </ul>
                <Link
                  href="/candidats/recrutement-local"
                  className="inline-flex items-center text-sm font-medium text-primary group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                    {t('candidates.services.learn_more')}
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Service 2 */}
              <div className="magic-card p-8 group">
                <div className="mb-6 relative">
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt={t('candidates.services.service_types.national.title')}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/90 text-white text-xs font-medium rounded-full">
                    {t('candidates.services.service_types.national.badge')}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('candidates.services.service_types.national.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('candidates.services.service_types.national.description')}
                </p>
                <ul className="space-y-3 mb-6">
                  {t('candidates.services.service_types.national.features').map(
                    (item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ),
                  )}
                </ul>
                <Link
                  href="/candidats/recrutement-national"
                  className="inline-flex items-center text-sm font-medium text-primary group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                    {t('candidates.services.learn_more')}
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Service 3 */}
              <div className="magic-card p-8 group">
                <div className="mb-6 relative">
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt={t('candidates.services.service_types.international.title')}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium rounded-full">
                    {t('candidates.services.service_types.international.badge')}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{t('candidates.services.service_types.international.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('candidates.services.service_types.international.description')}
                </p>
                <ul className="space-y-3 mb-6">
                  {t('candidates.services.service_types.international.features').map(
                    (item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ),
                  )}
                </ul>
                <Link
                  href="/candidats/recrutement-international"
                  className="inline-flex items-center text-sm font-medium text-primary group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                    {t('candidates.services.learn_more')}
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
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Target className="inline-block h-4 w-4 mr-2" />
                {t('candidates.process.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('candidates.process.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('candidates.process.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {t('candidates.process.steps').map((step, index) => {
                const icons = [Users, TrendingUp, Target, Award];
                const IconComponent = icons[index % icons.length];
                return (
                  <div key={index} className="magic-card p-6 text-center group">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-primary">{step.step}</span>
                    </div>
                    <div className="mb-4 text-primary">
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

        {/* Impulse Program */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="container relative">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium text-sm">
                  <Sparkles className="inline-block h-4 w-4 mr-2" />
                  {t('candidates.impulse_program.badge')}
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('candidates.impulse_program.title')}</h2>
                <p className="text-xl leading-relaxed opacity-90">
                  {t('candidates.impulse_program.description')}
                </p>
                <ul className="space-y-4">
                  {t('candidates.impulse_program.features').map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 shrink-0 mt-0.5" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-xl bg-white/90 text-primary hover:bg-white transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t('candidates.impulse_program.button')}
                </Button>
              </div>
              <div className="relative">
                <div className="magic-card p-2 bg-white/10 backdrop-blur-sm">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt={t('candidates.impulse_program.title')}
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-white/10 rounded-full filter blur-3xl floating-element"
            style={{ animationDelay: "-2s" }}
          ></div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Star className="inline-block h-4 w-4 mr-2" />
                {t('candidates.testimonials.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('candidates.testimonials.title')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('candidates.testimonials.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {t('candidates.testimonials.testimonials').map((testimonial, index) => (
                <div key={index} className="magic-card p-6 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="flex items-center gap-4 mb-4 relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="italic text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t('candidates.cta.title')}</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {t('candidates.cta.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-xl bg-white/90 text-primary hover:bg-white transition-all duration-300"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      {t('candidates.cta.find_job_button')}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl bg-transparent text-white border-white/30 hover:bg-white/10 transition-all duration-300"
                    >
                      {t('candidates.cta.contact_button')}
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
