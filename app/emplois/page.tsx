"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchJobs, type JobSearchParams } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, Briefcase, MapPin, AlertCircle, X, 
  Star, DollarSign, Clock, 
  Zap, Eye, Bookmark, Share2,
  Target, Code, Sparkles, Activity, Loader2, User, LogIn
} from 'lucide-react'
import JobDetailModal, { JobDetail } from "@/components/jobs/JobDetailModal";

interface Job {
  _id: string;
  title: string;
  companyId: {
    name: string;
    logo: string;
  };
  location: string;
  address?: string;
  jobType: string;
  description: string;
  salary: string;
  createdAt: string;
  skills: string[];
}

// Enhanced JobCardSkeleton component
const JobCardSkeleton = () => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-grow">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>
        
        <div className="mb-4">
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function PublicJobsPage() {
  const { locale } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('location') || '');
  const [skillsQuery, setSkillsQuery] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('all');
  const [salaryFilter, setSalaryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<string>('newest');
  
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const openDetails = (job: Job) => {
    setSelectedJob(job);
    setDetailOpen(true);
  };

  const addSkill = (skill: string) => {
    if (skill && !skillsQuery.includes(skill)) {
      setSkillsQuery([...skillsQuery, skill]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkillsQuery(skillsQuery.filter(s => s !== skill));
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput) {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: JobSearchParams = {
        search: searchQuery,
        location: locationQuery,
        limit: 20,
        page: 1,
        skills: skillsQuery
      };
      
      const response = await searchJobs(params);
      let fetchedJobs: Job[] = response.jobs;
      
      // Apply additional filters
      if (jobTypeFilter !== 'all') {
        fetchedJobs = fetchedJobs.filter(job => job.jobType.toLowerCase() === jobTypeFilter);
      }
      
      // Sort jobs
      fetchedJobs.sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'salary-high':
            return parseInt(b.salary || '0') - parseInt(a.salary || '0');
          case 'salary-low':
            return parseInt(a.salary || '0') - parseInt(b.salary || '0');
          default:
            return 0;
        }
      });
      
      setJobs(fetchedJobs);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, locationQuery, skillsQuery, jobTypeFilter, sortBy]);

  const handleSearch = () => {
    fetchJobs();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSkillsQuery([]);
    setJobTypeFilter('all');
    setSalaryFilter('all');
    setSortBy('newest');
  };

  // Get location display name
  const getLocationDisplayName = (location: string) => {
    const locationMap: { [key: string]: string } = {
      'montreal': 'Canada',
      'dubai': 'UAE',
      'turkey': 'Turkey'
    };
    return locationMap[location] || location;
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return locale === 'fr' ? 'À l\'instant' : 'Just now';
    if (diffInHours < 24) return locale === 'fr' ? `Il y a ${diffInHours}h` : `${diffInHours}h ago`;
    if (diffInHours < 48) return locale === 'fr' ? 'Hier' : 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {locale === 'fr' ? 'Offres d\'emploi' : 'Job Offers'}
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                {locale === 'fr' 
                  ? 'Découvrez des opportunités passionnantes dans votre domaine'
                  : 'Discover exciting opportunities in your field'
                }
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" asChild className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30">
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Se connecter' : 'Log In'}
                </Link>
              </Button>
              <Button variant="secondary" asChild className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30">
                <Link href="/register">
                  <User className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'S\'inscrire' : 'Register'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Enhanced Search Section */}
      <Card className="mb-8 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            {locale === 'fr' ? 'Recherche avancée' : 'Advanced Search'}
          </CardTitle>
          <CardDescription>
            {locale === 'fr' 
              ? 'Filtrez et trouvez les emplois qui vous conviennent'
              : 'Filter and find jobs that suit you'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Search Row */}
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={locale === 'fr' ? 'Titre du poste, entreprise...' : 'Job title, company...'}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={locale === 'fr' ? 'Localisation...' : 'Location...'}
                className="pl-10"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading} className="bg-primary hover:bg-primary/90">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {locale === 'fr' ? 'Recherche...' : 'Searching...'}
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Rechercher' : 'Search'}
                </>
              )}
            </Button>
          </div>

          {/* Skills Search */}
          <div className="space-y-3">
            <div className="relative">
              <Code className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={locale === 'fr' ? 'Ajouter des compétences (ex: React, Node.js, Python)' : 'Add skills (e.g. React, Node.js, Python)'}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillInputKeyDown}
                className="pl-10"
              />
            </div>
            {skillsQuery.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skillsQuery.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer group"
                    onClick={() => removeSkill(skill)}
                  >
                    <Code className="h-3 w-3 mr-1" />
                    {skill}
                    <X className="h-3 w-3 ml-1 group-hover:text-red-600 transition-colors" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Advanced Filters */}
          <div className="grid gap-4 md:grid-cols-4">
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'fr' ? 'Type d\'emploi' : 'Job Type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'fr' ? 'Tous les types' : 'All Types'}</SelectItem>
                <SelectItem value="full-time">{locale === 'fr' ? 'Temps plein' : 'Full-time'}</SelectItem>
                <SelectItem value="part-time">{locale === 'fr' ? 'Temps partiel' : 'Part-time'}</SelectItem>
                <SelectItem value="contract">{locale === 'fr' ? 'Contrat' : 'Contract'}</SelectItem>
                <SelectItem value="internship">{locale === 'fr' ? 'Stage' : 'Internship'}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={salaryFilter} onValueChange={setSalaryFilter}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'fr' ? 'Salaire' : 'Salary'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'fr' ? 'Tous les salaires' : 'All Salaries'}</SelectItem>
                <SelectItem value="0-30000">{locale === 'fr' ? '0 - 30k' : '0 - 30k'}</SelectItem>
                <SelectItem value="30000-60000">{locale === 'fr' ? '30k - 60k' : '30k - 60k'}</SelectItem>
                <SelectItem value="60000-100000">{locale === 'fr' ? '60k - 100k' : '60k - 100k'}</SelectItem>
                <SelectItem value="100000+">{locale === 'fr' ? '100k+' : '100k+'}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'fr' ? 'Trier par' : 'Sort by'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{locale === 'fr' ? 'Plus récent' : 'Newest'}</SelectItem>
                <SelectItem value="oldest">{locale === 'fr' ? 'Plus ancien' : 'Oldest'}</SelectItem>
                <SelectItem value="salary-high">{locale === 'fr' ? 'Salaire élevé' : 'High Salary'}</SelectItem>
                <SelectItem value="salary-low">{locale === 'fr' ? 'Salaire bas' : 'Low Salary'}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters} className="w-full">
              <X className="h-4 w-4 mr-2" />
              {locale === 'fr' ? 'Effacer' : 'Clear'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-6">
        {error && (
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
            <CardContent className="p-4">
              <div className="flex items-center text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Login CTA for better experience */}
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-blue-700 dark:text-blue-400">
                <Star className="h-5 w-5 mr-2" />
                <div>
                  <span className="font-medium">
                    {locale === 'fr' ? 'Obtenez une expérience personnalisée' : 'Get a personalized experience'}
                  </span>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    {locale === 'fr' 
                      ? 'Connectez-vous pour postuler aux emplois et recevoir des recommandations personnalisées'
                      : 'Log in to apply for jobs and receive personalized recommendations'
                    }
                  </p>
                </div>
              </div>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  {locale === 'fr' ? 'Se connecter' : 'Log In'}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="relative">
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-6" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-xl opacity-30"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {locale === 'fr' ? 'Aucun emploi trouvé' : 'No jobs found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {locale === 'fr' 
                  ? 'Aucun emploi trouvé correspondant à vos critères.'
                  : 'No jobs found matching your criteria.'
                }
              </p>
              <Button onClick={clearFilters} variant="outline">
                {locale === 'fr' ? 'Effacer les filtres' : 'Clear filters'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-lg">
                    {jobs.length} {locale === 'fr' ? 'emplois trouvés' : 'jobs found'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <Activity className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Enhanced Job Cards */}
            <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-6'}>
              {jobs.map((job) => (
                <Card key={job._id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  {/* Decorative Bubbles */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-8 translate-x-8 group-hover:bg-primary/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-secondary/10 rounded-full translate-y-6 -translate-x-6 group-hover:bg-secondary/20 transition-colors duration-300"></div>
                  <div className="absolute top-1/2 left-0 w-8 h-8 bg-blue-100 rounded-full -translate-y-4 -translate-x-4 opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-purple-100 rounded-full opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300"></div>
                  <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-green-100 rounded-full opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-300"></div>
                  
                  <CardContent className="p-6 relative z-10">
                    {/* Job Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {job.companyId?.name || 'Company Name'}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="grid gap-3 mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {getLocationDisplayName(job.location)}
                          {job.address && (
                            <span className="text-xs opacity-75">
                              • {job.address}
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.jobType}
                        </span>
                      </div>
                      
                      {job.salary && (
                        <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <DollarSign className="h-4 w-4" />
                          {job.salary} {locale === 'fr' ? 'par an' : 'per year'}
                        </div>
                      )}
                    </div>
                    
                    {/* Skills Section */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 3).map((skill, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer text-xs"
                              onClick={() => addSkill(skill)}
                            >
                              <Code className="h-3 w-3 mr-1" />
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 3} {locale === 'fr' ? 'plus' : 'more'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {job.description}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{getRelativeTime(job.createdAt)}</span>
                      </div>
                      
                      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDetails(job)}
                          className="hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {locale === 'fr' ? 'Détails' : 'Details'}
                        </Button>
                        <Button 
                          size="sm"
                          asChild
                          className="bg-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-300"
                        >
                          <Link href="/login">
                            <Zap className="h-4 w-4 mr-2" />
                            {locale === 'fr' ? 'Postuler' : 'Apply'}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <JobDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        job={selectedJob}
        onApply={() => {
          setDetailOpen(false);
          router.push('/login');
        }}
      />
    </div>
  );
} 