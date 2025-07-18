"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchJobs, type JobSearchParams } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/EmployerAuthContext'
import { Search, Briefcase, MapPin, CalendarDays, AlertCircle, X } from 'lucide-react'
import JobDetailModal, { JobDetail } from "@/components/jobs/JobDetailModal";
import ApplyJobModal from "@/components/jobs/ApplyJobModal";

interface Job {
  _id: string;
  title: string;
  companyId: {
    name: string;
    logo: string;
  };
  location: string;
  jobType: string;
  description: string;
  salary: string;
  createdAt: string;
  skills: string[];
}

// Add JobCardSkeleton component
const JobCardSkeleton = () => {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          {/* Title skeleton */}
          <Skeleton className="h-6 w-3/4 mb-2" />
          
          {/* Company info skeleton */}
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
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Skills skeleton */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
      </div>
      
      {/* Description skeleton */}
      <div className="mb-4">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      
      {/* Footer skeleton */}
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
    </div>
  );
};

export default function JobsPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('location') || '');
  const [skillsQuery, setSkillsQuery] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyJobId, setApplyJobId] = useState<string | null>(null);

  const openDetails = (job: Job) => {
    setSelectedJob(job);
    setDetailOpen(true);
  };

  const handleApplyFromDetails = (job: JobDetail) => {
    setApplyJobId(job._id);
    setApplyOpen(true);
  };

  const handleApplyButton = (jobId: string) => {
    setApplyJobId(jobId);
    setApplyOpen(true);
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
        // If user is logged in and has a location, filter by user location
        // Otherwise use the location query from search
        location: user?.location || locationQuery,
        limit: 10,
        page: 1,
        skills: skillsQuery
      };
      
      const response = await searchJobs(params);
      let fetchedJobs: Job[] = response.jobs;
      // Client-side filtering by location if necessary
      const selectedLocation = user?.location || locationQuery;
      if (selectedLocation) {
        fetchedJobs = fetchedJobs.filter(job => job.location === selectedLocation);
      }
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
  }, [searchQuery, locationQuery, skillsQuery, user?.location]);

  const handleSearch = () => {
    fetchJobs();
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

  return (
    <div className="container py-32">
      {/* Location Filter Info */}
      {user?.location && (
        <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center text-primary">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="font-medium">
              Showing jobs in your region: {getLocationDisplayName(user.location)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Jobs are filtered based on your account location. {!user.location && 'Set your location in your profile to see relevant jobs.'}
          </p>
        </div>
      )}

      {/* Search Section */}
      <div className="mb-8">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('candidates.jobs.search_placeholder')}
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
              placeholder={user?.location ? getLocationDisplayName(user.location) : t('candidates.jobs.location_placeholder')}
              className="pl-10"
              value={user?.location ? getLocationDisplayName(user.location) : locationQuery}
              onChange={(e) => !user?.location && setLocationQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={!!user?.location}
            />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : t('candidates.job_search.search_button')}
          </Button>
        </div>

        {/* Skills Search */}
        <div className="mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Add skills (e.g. React, Node.js, Python)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillInputKeyDown}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          {skillsQuery.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skillsQuery.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {!user && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center text-blue-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Get personalized job recommendations</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              <a href="/login" className="underline hover:no-underline">Log in</a> to see jobs specifically for your location and get better matches.
            </p>
          </div>
        )}

        {loading ? (
          <div className="space-y-6">
            {/* Show multiple skeleton cards */}
            {Array.from({ length: 5 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {user?.location 
                ? `No jobs found in ${getLocationDisplayName(user.location)} matching your criteria.`
                : 'No jobs found matching your criteria.'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Found {jobs.length} jobs {user?.location && `in ${getLocationDisplayName(user.location)}`}
              </p>
            </div>
            {jobs.map((job) => (
              <div key={job._id} className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {getLocationDisplayName(job.location)}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.jobType}
                      </span>
                      {job.salary && (
                        
                        <span className="flex items-center"> 
                          {job.salary} $
                        </span>
                      )}
                    </div>
                  </div>
                  
                </div>
                
                {/* Skills Section */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                          onClick={() => addSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-sm line-clamp-2 mb-4">{job.description}</p>
                
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => openDetails(job)}
                      className="hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                    >
                      View Details
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 text-white transition-all duration-300"
                      onClick={() => handleApplyButton(job._id)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <JobDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        job={selectedJob}
        onApply={handleApplyFromDetails}
      />

      <ApplyJobModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        jobId={applyJobId}
      />
    </div>
  );
}
