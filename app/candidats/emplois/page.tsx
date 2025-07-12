"use client"

import { useContext } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { JobCard } from "@/components/ui/job-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import React from "react"

// Define the job type based on JobCardProps with support for both languages
interface Job {
  title: string;
  company: string;
  location: string;
  type: "Temps plein" | "Temps partiel" | "Contractuel" | "Temporaire" | "Full-time" | "Part-time" | "Contract" | "Temporary";
  salary: string;
  tags: string[];
  posted: string;
}

export default function EmploisPage() {
  const { t } = useLanguage()
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedLocation, setSelectedLocation] = React.useState<string>("all");
  const [locations, setLocations] = React.useState<string[]>([]);
  
  // Cette fonction serait normalement connectée à un vrai système de candidature
  const handleApply = () => {
    console.log("Candidature soumise")
  }

  // Get the job examples from the translation and map them to the Job interface
  const getJobExamples = (): Job[] => {
    const jobExamplesData = t('candidates.jobs.job_examples');
    if (Array.isArray(jobExamplesData)) {
      return jobExamplesData.map((job: any) => ({
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type as Job["type"],
        salary: job.salary,
        tags: job.tags,
        posted: job.posted
      }));
    }
    return [];
  };

  const jobExamples = getJobExamples();

  // Extract unique locations on mount (client only)
  React.useEffect(() => {
    setLocations(Array.from(new Set(jobExamples.map(j => j.location))).filter(Boolean));
  }, [t]);

  // Read location from query param on mount
  React.useEffect(() => {
    const loc = searchParams.get("location") || "all";
    setSelectedLocation(loc);
  }, [searchParams]);

  // Filter jobs by selected location
  const filteredJobs = selectedLocation && selectedLocation !== "all"
    ? jobExamples.filter(j => j.location === selectedLocation)
    : jobExamples;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30 floating-element"></div>
          <div
            className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-30 floating-element"
            style={{ animationDelay: "-3s" }}
          ></div>
          
          <div className="container relative z-10">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm shimmer mx-auto">
              <Search className="inline-block h-4 w-4 mr-2" />
              {t('candidates.jobs.badge')}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('candidates.jobs.title')}
              </span>
            </h1>
            
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('candidates.jobs.subtitle')}
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-background/80 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-6">
              <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder={t('candidates.jobs.search_placeholder')} 
                    className="pl-10 bg-background/50 backdrop-blur-sm border-white/20 focus:border-primary/50" 
                  />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder={t('candidates.jobs.location_placeholder')} 
                    className="pl-10 bg-background/50 backdrop-blur-sm border-white/20 focus:border-primary/50" 
                  />
                </div>
                <Button 
                  size="lg" 
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white"
                >
                  {t('candidates.jobs.search_button')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              {/* Filters Sidebar */}
              <div className="bg-background/80 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg h-fit sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-primary" />
                    {t('candidates.jobs.filters')}
                  </h3>
                </div>

                <div className="space-y-8">
                  {/* Type d'emploi */}
                  <div>
                    <h4 className="font-medium mb-3 text-primary">{t('candidates.jobs.job_types.title')}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="fulltime" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="fulltime" className="text-sm">{t('candidates.jobs.job_types.full_time')}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="parttime" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="parttime" className="text-sm">{t('candidates.jobs.job_types.part_time')}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="contract" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="contract" className="text-sm">{t('candidates.jobs.job_types.contract')}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="temporary" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="temporary" className="text-sm">{t('candidates.jobs.job_types.temporary')}</label>
                      </div>
                    </div>
                  </div>

                  {/* Expérience */}
                  <div>
                    <h4 className="font-medium mb-3 text-primary">{t('candidates.jobs.experience.title')}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="entry" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="entry" className="text-sm">{t('candidates.jobs.experience.entry')}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="mid" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="mid" className="text-sm">{t('candidates.jobs.experience.mid')}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="senior" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="senior" className="text-sm">{t('candidates.jobs.experience.senior')}</label>
                      </div>
                    </div>
                  </div>

                  {/* Salaire */}
                  <div>
                    <h4 className="font-medium mb-3 text-primary">{t('candidates.jobs.salary.title')}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="salary1" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="salary1" className="text-sm">{t('candidates.jobs.salary.range1')}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="salary2" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="salary2" className="text-sm">{t('candidates.jobs.salary.range2')}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="salary3" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="salary3" className="text-sm">{t('candidates.jobs.salary.range3')}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="salary4" 
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/25 mr-3" 
                        />
                        <label htmlFor="salary4" className="text-sm">{t('candidates.jobs.salary.range4')}</label>
                      </div>
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <h4 className="font-medium mb-3 text-primary">{t('candidates.jobs.location_filter') || "Localisation"}</h4>
                    <Select value={selectedLocation} onValueChange={value => {
                      setSelectedLocation(value);
                      // Update query param
                      const params = new URLSearchParams(Array.from(searchParams.entries()));
                      if (value && value !== "all") params.set("location", value); else params.delete("location");
                      router.replace(`?${params.toString()}`);
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('candidates.jobs.location_placeholder') || "Choisir une localisation"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('candidates.jobs.location_all') || "Toutes les localisations"}</SelectItem>
                        {locations.map(loc => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white font-medium"
                  >
                    {t('candidates.jobs.apply_filters')}
                  </Button>
                </div>
              </div>

              {/* Job Listings */}
              <div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {t('candidates.jobs.found_jobs', { count: 128 })}
                  </h2>
                  <div className="flex items-center bg-background/70 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm px-4 py-2">
                    <span className="mr-3 text-sm font-medium">{t('candidates.jobs.sort_by')}</span>
                    <select className="text-sm bg-transparent border-none focus:ring-0 focus:outline-none">
                      <option>{t('candidates.jobs.sort_options.recent')}</option>
                      <option>{t('candidates.jobs.sort_options.relevance')}</option>
                      <option>{t('candidates.jobs.sort_options.salary')}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  {filteredJobs.map((job: Job, index: number) => (
                    <Link 
                      key={index} 
                      href={`/candidats/emplois/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 overflow-hidden"
                    >
                      <JobCard
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        type={job.type}
                        salary={job.salary}
                        tags={job.tags}
                        postedDate={job.posted}
                        onApply={(e) => {
                          e.preventDefault(); // Prevent the link from navigating
                          e.stopPropagation(); // Prevent event bubbling
                          handleApply();
                        }}
                      />
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-3 bg-background/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      disabled
                      className="rounded-lg text-muted-foreground"
                    >
                      {t('common.previous')}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-lg bg-primary/20 text-primary font-medium hover:bg-primary/30"
                    >
                      1
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-lg hover:bg-primary/10"
                    >
                      2
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-lg hover:bg-primary/10"
                    >
                      3
                    </Button>
                    
                    <span className="text-muted-foreground">...</span>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-lg hover:bg-primary/10"
                    >
                      10
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-lg text-primary hover:bg-primary/10"
                    >
                      {t('common.next')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
