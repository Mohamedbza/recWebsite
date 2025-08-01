"use client"

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
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
  Target, Code, Sparkles, Activity, Loader2, User, LogIn,
  SlidersHorizontal, Building2, Calendar, Filter
} from 'lucide-react'
import JobDetailModal, { JobDetail } from "@/components/jobs/JobDetailModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { 
  fetchJobs, 
  setSearchFilter, 
  setLocationFilter,
  addSkill,
  removeSkill,
  toggleJobType,
  setExperienceFilter,
  setSortBy,
  clearFilters
} from '@/store/slices/jobsSlice'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useDebounce } from '@/hooks/useDebounce'

// Enhanced JobCardSkeleton component
const JobCardSkeleton = () => {
  return (
    <Card className="border border-gray-200 hover:border-gray-300 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded" />
            <div>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
          
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function PublicJobsPage() {
  const { locale, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { jobs, loading, loadingMore, error, filters, pagination } = useAppSelector(state => state.jobs);
  
  // Check if we're using demo data
  const isDemoData = jobs.length > 0 && jobs.some(job => job._id?.startsWith('sample-'));
  
  // Local state
  const [skillInput, setSkillInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  // Create debounced values
  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedLocation = useDebounce(filters.location, 500);

  // Initialize filters from URL params
  useEffect(() => {
    const q = searchParams.get('q');
    const location = searchParams.get('location');
    
    if (q && q !== filters.search) {
      dispatch(setSearchFilter(q));
    }
    if (location && location !== filters.location) {
      dispatch(setLocationFilter(location));
    }
  }, [searchParams]);

  // Fetch jobs when debounced filters change
  useEffect(() => {
    dispatch(fetchJobs({ page: 1, append: false }));
  }, [debouncedSearch, debouncedLocation, filters.skills, filters.jobTypes, filters.experienceLevel]);

  // Load more jobs callback
  const loadMoreJobs = useCallback(() => {
    if (!loadingMore && pagination.hasMore) {
      dispatch(fetchJobs({ page: pagination.currentPage + 1, append: true }));
    }
  }, [dispatch, loadingMore, pagination.hasMore, pagination.currentPage]);

  // Infinite scroll hook
  const loadMoreRef = useInfiniteScroll({
    callback: loadMoreJobs,
    hasMore: pagination.hasMore,
    loading: loadingMore,
    threshold: 200
  });

  const openDetails = (job: any) => {
    setSelectedJob(job);
    setDetailOpen(true);
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput) {
      e.preventDefault();
      dispatch(addSkill(skillInput));
      setSkillInput('');
    }
  };

  // Get location display name
  const getLocationDisplayName = (location: string) => {
    const locationMap: { [key: string]: string } = {
      'montreal': 'Montreal, Canada',
      'dubai': 'Dubai, UAE',
      'turkey': 'Istanbul, Turkey'
    };
    return locationMap[location] || location;
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return t('candidates.jobs.time.just_now');
    if (diffInHours < 24) return t('candidates.jobs.time.hours_ago', { hours: diffInHours });
    if (diffInHours < 48) return t('candidates.jobs.time.yesterday');
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return t('candidates.jobs.time.days_ago', { days: diffInDays });
    
    return date.toLocaleDateString();
  };

  const activeFiltersCount = filters.jobTypes.length + filters.skills.length + (filters.experienceLevel !== 'all' ? 1 : 0);

  return (
    <>
      <style jsx>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0);
          border-radius: 3px;
          transition: background-color 0.2s;
        }
        .sidebar-scroll:hover::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
        }
        .sidebar-scroll:hover::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.8);
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('candidates.jobs.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t('candidates.jobs.subtitle')}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  {t('common.login')}
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register">
                  <User className="h-4 w-4 mr-2" />
                  {t('common.register')}
                </Link>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder={t('candidates.jobs.search.placeholder')}
                className="pl-10 h-11"
                value={filters.search}
                onChange={(e) => dispatch(setSearchFilter(e.target.value))}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder={t('candidates.jobs.search.location')}
                className="pl-10 h-11"
                value={filters.location}
                onChange={(e) => dispatch(setLocationFilter(e.target.value))}
              />
            </div>
            <Button 
              variant="outline" 
              className="lg:hidden h-11"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {t('candidates.jobs.filters.title')}
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80`}>
            <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden sidebar-scroll transition-all duration-200 pr-2">
              <div className="space-y-6 pb-6">
            {/* Filter Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-600" />
                  {t('candidates.jobs.filters.title')}
                </h2>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => dispatch(clearFilters())}>
                    {t('candidates.jobs.filters.clear')}
                  </Button>
                )}
              </div>

              {/* Job Type Filter */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">{t('candidates.jobs.filters.job_type')}</h3>
                  <div className="space-y-2">
                    {['full-time', 'part-time', 'contract', 'internship', 'remote'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={filters.jobTypes.includes(type)}
                          onCheckedChange={() => dispatch(toggleJobType(type))}
                        />
                        <Label htmlFor={type} className="text-sm font-normal cursor-pointer">
                          {t(`candidates.jobs.filters.types.${type}`)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Experience Level */}
                <div>
                  <h3 className="font-medium mb-3">{t('candidates.jobs.filters.experience')}</h3>
                  <RadioGroup value={filters.experienceLevel} onValueChange={(value) => dispatch(setExperienceFilter(value))}>
                    <div className="space-y-2">
                      {['all', 'entry', 'mid', 'senior', 'executive'].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <RadioGroupItem value={level} id={level} />
                          <Label htmlFor={level} className="text-sm font-normal cursor-pointer">
                            {t(`candidates.jobs.filters.experience_levels.${level}`)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Skills Filter */}
                <div>
                  <h3 className="font-medium mb-3">{t('candidates.jobs.filters.skills')}</h3>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder={t('candidates.jobs.filters.add_skill')}
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillInputKeyDown}
                      className="text-sm"
                    />
                    {filters.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {filters.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => dispatch(removeSkill(skill))}
                          >
                            {skill}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Sort By */}
                <div>
                  <h3 className="font-medium mb-3">{t('candidates.jobs.filters.sort_by')}</h3>
                  <Select value={filters.sortBy} onValueChange={(value) => dispatch(setSortBy(value))}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t('candidates.jobs.filters.sort.newest')}</SelectItem>
                      <SelectItem value="oldest">{t('candidates.jobs.filters.sort.oldest')}</SelectItem>
                      <SelectItem value="salary-high">{t('candidates.jobs.filters.sort.salary_high')}</SelectItem>
                      <SelectItem value="salary-low">{t('candidates.jobs.filters.sort.salary_low')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4">{t('candidates.jobs.stats.title')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('candidates.jobs.stats.total_jobs')}</span>
                  <span className="font-medium">{pagination.totalJobs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('candidates.jobs.stats.new_today')}</span>
                  <span className="font-medium text-green-600">
                    {jobs.filter(job => {
                      const today = new Date();
                      const jobDate = new Date(job.createdAt);
                      return jobDate.toDateString() === today.toDateString();
                    }).length}
                  </span>
                </div>
              </div>
            </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Demo Data Notification */}
            {isDemoData && (
              <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-center text-blue-700 dark:text-blue-300">
                    <Sparkles className="h-5 w-5 mr-2" />
                    <div>
                      <p className="font-medium">
                        {locale === 'fr' ? 'Données de démonstration' : 'Demo Data'}
                      </p>
                      <p className="text-sm mt-1">
                        {locale === 'fr' 
                          ? 'Le serveur d\'emplois n\'est pas disponible. Affichage des emplois de démonstration pour présenter les fonctionnalités.'
                          : 'Job server is unavailable. Showing demo jobs to demonstrate functionality.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {error && !isDemoData && (
              <Card className="mb-6 border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center text-red-700">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    {error}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Header */}
            {!loading && jobs.length > 0 && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  {t('candidates.jobs.results', { count: pagination.totalJobs })}
                </p>
              </div>
            )}

            {/* Job Cards */}
            {loading && jobs.length === 0 ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))}
              </div>
            ) : jobs.length === 0 && !loading ? (
              <Card className="border-gray-200">
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t('candidates.jobs.no_results.title')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('candidates.jobs.no_results.description')}
                  </p>
                  <Button onClick={() => dispatch(clearFilters())} variant="outline">
                    {t('candidates.jobs.filters.clear')}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job._id} className="border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => openDetails(job)}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex gap-4">
                            {/* Company Logo Placeholder */}
                            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                              <p className="text-gray-600">
                                {job.companyId?.name || 'Company Name'}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 hover:opacity-100 transition-opacity">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Job Info */}
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {getLocationDisplayName(job.location)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.jobType}
                          </span>
                          {job.salary && (
                            <span className="flex items-center gap-1 text-green-600 font-medium">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {getRelativeTime(job.createdAt)}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 line-clamp-2 mb-4">
                          {job.description}
                        </p>

                        {/* Skills */}
                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {job.skills.slice(0, 5).map((skill, index) => (
                              <Badge 
                                key={index} 
                                variant="secondary" 
                                className="text-xs cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(addSkill(skill));
                                }}
                              >
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 5}
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Loading More Indicator */}
                {loadingMore && (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}

                {/* Infinite Scroll Trigger */}
                <div ref={loadMoreRef} className="h-10" />

                {/* End of Results */}
                {!pagination.hasMore && jobs.length > 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>{t('candidates.jobs.end_of_results')}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
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
    </>
  );
}