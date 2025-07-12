"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, ChevronRight, Phone, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/LanguageContext"
import { useRouter } from "next/navigation"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import React from "react"

export default function Home() {
  const { t } = useLanguage();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [locations, setLocations] = React.useState<string[]>([]);

  // Extract locations on mount (client only)
  React.useEffect(() => {
    const jobExamplesData = t('candidates.jobs.job_examples');
    setLocations(Array.isArray(jobExamplesData)
      ? Array.from(new Set(jobExamplesData.map((job: any) => job.location))).filter(Boolean)
      : []);
  }, [t]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (selectedLocation && selectedLocation !== "all") params.set("location", selectedLocation);
    router.push(`/candidats/emplois?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Gradient Background */}
        <section className="relative py-28 md:py-44 overflow-hidden">
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
          <div
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary/5 rounded-full filter blur-xl opacity-30 floating-element"
            style={{ animationDelay: "-1.5s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-secondary/5 rounded-full filter blur-xl opacity-30 floating-element"
            style={{ animationDelay: "-4.5s" }}
          ></div>

          <div className="container relative z-10 flex flex-col items-center text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
              <Sparkles className="inline-block h-4 w-4 mr-2" />
              Recrutement innovant et personnalisé
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.hero.title')}
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground mb-8">
              {t('home.hero.subtitle')}
            </p>
            <div className="magic-card w-full max-w-3xl p-4 shadow-2xl">
              <form onSubmit={handleSearch}>
                <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder={t('candidates.jobs.search_placeholder')}
                      className="magic-input pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="w-full magic-input pl-10">
                        <SelectValue placeholder={t('candidates.jobs.location_placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('candidates.jobs.location_all') || "Toutes les localisations"}</SelectItem>
                        {locations.map((loc: string) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                  <Button type="submit" className="magic-button w-full md:w-auto">{t('candidates.jobs.search_button')}</Button>
                </div>
              </form>
            </div>
            <Button
              variant="outline"
              className="mt-6 gap-1 rounded-full border-white/20 backdrop-blur-sm hover:bg-white/10"
            >
              {t('home.hero.learn_more')}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Services Highlight Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent"></div>
          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Sparkles className="inline-block h-4 w-4 mr-2" />
                {t('home.services.title')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.services.subtitle')}
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t('home.services.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Service Card 1 */}
              <div className="magic-card p-6 group">
                <div className="mb-4 text-primary">
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
                    className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t('services.local.title')}</h3>
                <p className="mt-2 text-muted-foreground">
                  {t('services.local.description')}
                </p>
                <Link
                  href="/services/recrutement-local"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                    {t('services.more')}
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Service Card 2 */}
              <div className="magic-card p-6 group">
                <div className="mb-4 text-primary">
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
                    className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t('services.national.title')}</h3>
                <p className="mt-2 text-muted-foreground">
                  {t('services.national.description')}
                </p>
                <Link
                  href="/services/recrutement-national"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                    {t('services.more')}
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Service Card 3 */}
              <div className="magic-card p-6 group">
                <div className="mb-4 text-primary">
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
                    className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{t('services.international.title')}</h3>
                <p className="mt-2 text-muted-foreground">
                  {t('services.international.description')}
                </p>
                <Link
                  href="/services/recrutement-international"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary group"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-bottom-right after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                    {t('services.more')}
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Audience Sections */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Candidates Section */}
              <div className="magic-card p-8 overflow-hidden relative group">
                <div className="mb-4 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/young-woman-office-style-clothes-glasses-holds-tablet-with-documents-employee.jpg"
                    alt="Candidate with tablet"
                    width={600}
                    height={400}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <h2 className="text-2xl font-bold mb-4 relative">{t('home.audiences.candidates.title')}</h2>
                <p className="text-muted-foreground mb-6 relative">
                  {t('home.audiences.candidates.description')}
                </p>
                <ul className="space-y-3 mb-6 relative">
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
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
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.candidates.items.0')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
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
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.candidates.items.1')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
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
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.candidates.items.2')}</span>
                  </li>
                </ul>
                <Button className="magic-button w-full sm:w-auto relative">
                  {t('home.audiences.candidates.button')}
                </Button>
              </div>

              {/* Employers Section */}
              <div className="magic-card p-8 overflow-hidden relative group">
                <div className="mb-4 rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/business-meeting-office-recuiteers.jpg"
                    alt="Business meeting"
                    width={600}
                    height={400}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <h2 className="text-2xl font-bold mb-4 relative">{t('home.audiences.employers.title')}</h2>
                <p className="text-muted-foreground mb-6 relative">
                  {t('home.audiences.employers.description')}
                </p>
                <ul className="space-y-3 mb-6 relative">
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
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
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.employers.items.0')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
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
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.employers.items.1')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
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
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>{t('home.audiences.employers.items.2')}</span>
                  </li>
                </ul>
                <Button className="magic-button w-full sm:w-auto relative">
                  {t('home.audiences.employers.button')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230E7490' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="container relative">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="text-4xl font-bold">500+</div>
                <div className="mt-2">{t('home.stats.companies')}</div>
              </div>
              <div className="text-center backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="text-4xl font-bold">5000+</div>
                <div className="mt-2">{t('home.stats.placements')}</div>
              </div>
              <div className="text-center backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="text-4xl font-bold">15+</div>
                <div className="mt-2">{t('home.stats.experience')}</div>
              </div>
              <div className="text-center backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="text-4xl font-bold">98%</div>
                <div className="mt-2">{t('home.stats.satisfaction')}</div>
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

        {/* Newsletter Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent"></div>
          <div className="container relative">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer">
                <Sparkles className="inline-block h-4 w-4 mr-2" />
                {t('home.newsletter.badge')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.newsletter.title')}
              </h2>
              <p className="mt-4 text-muted-foreground mb-6">
                {t('home.newsletter.description')}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input type="email" placeholder={t('home.newsletter.placeholder')} className="magic-input flex-1" />
                <Button className="magic-button">{t('home.newsletter.button')}</Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {t('home.newsletter.privacy')}{" "}
                <Link
                  href="/politique-confidentialite"
                  className="underline underline-offset-2 hover:text-primary transition-colors"
                >
                  {t('home.newsletter.privacy_link')}
                </Link>
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl floating-element"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl floating-element"
            style={{ animationDelay: "-3s" }}
          ></div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="container relative">
            <div className="magic-border">
              <div className="magic-border-content bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="grid gap-6 md:grid-cols-2 md:gap-12 relative p-8 md:p-12">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t('home.cta.title')}</h2>
                    <p className="mt-4">
                      {t('home.cta.description')}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-4 md:items-end md:justify-center">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="rounded-full backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
                    >
                      {t('home.cta.button')}
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