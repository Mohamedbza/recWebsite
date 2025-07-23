'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Briefcase,
  MapPin,
  Calendar,
  Users,
  Globe,
  Building
} from 'lucide-react';
import { EmployerJob } from '@/lib/employer-api';
import { motion, AnimatePresence } from 'framer-motion';
import { getLocationLabel } from '@/lib/location-utils';

interface JobsManagementProps {
  jobs: EmployerJob[];
  onJobClick: (job: EmployerJob) => void;
  onEditJob: (job: EmployerJob) => void;
  onDeleteJob: (jobId: string) => Promise<void>;
  onCreateJob: () => void;
  isLoading?: boolean;
}

const statusConfig = {
  active: {
    label: { en: 'Active', fr: 'Actif' },
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  draft: {
    label: { en: 'Draft', fr: 'Brouillon' },
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  },
  closed: {
    label: { en: 'Closed', fr: 'Fermé' },
    color: 'bg-red-100 text-red-800 border-red-200'
  },
  expired: {
    label: { en: 'Expired', fr: 'Expiré' },
    color: 'bg-orange-100 text-orange-800 border-orange-200'
  }
};

const jobTypeConfig = {
  'full-time': { en: 'Full Time', fr: 'Temps plein' },
  'part-time': { en: 'Part Time', fr: 'Temps partiel' },
  'contract': { en: 'Contract', fr: 'Contrat' },
  'internship': { en: 'Internship', fr: 'Stage' },
  'freelance': { en: 'Freelance', fr: 'Freelance' }
};

export default function JobsManagement({
  jobs,
  onJobClick,
  onEditJob,
  onDeleteJob,
  onCreateJob,
  isLoading = false
}: JobsManagementProps) {
  const { t, locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [filteredJobs, setFilteredJobs] = useState<EmployerJob[]>(jobs);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Update filtered jobs when jobs, search term, or status filter changes
  useEffect(() => {
    let filtered = jobs;

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, statusFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleDeleteJob = async (jobId: string, jobTitle: string) => {
    if (window.confirm(
      locale === 'fr' 
        ? `Êtes-vous sûr de vouloir supprimer l'offre "${jobTitle}" ?`
        : `Are you sure you want to delete the job "${jobTitle}"?`
    )) {
      try {
        await onDeleteJob(jobId);
      } catch (error) {
        console.error('Failed to delete job:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {locale === 'fr' ? 'Offres d\'emploi' : 'Job Postings'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === 'fr' 
              ? `${jobs.length} offres au total`
              : `${jobs.length} total jobs`
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={locale === 'fr' ? 'Rechercher...' : 'Search...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">
              {locale === 'fr' ? 'Tous les statuts' : 'All Status'}
            </option>
            {Object.entries(statusConfig).map(([status, config]) => (
              <option key={status} value={status}>
                {config.label[locale as keyof typeof config.label]}
              </option>
            ))}
          </select>
          
          {/* View Mode Toggle */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <div className="space-y-1 w-4 h-4">
                <div className="bg-current rounded-sm h-0.5"></div>
                <div className="bg-current rounded-sm h-0.5"></div>
                <div className="bg-current rounded-sm h-0.5"></div>
              </div>
            </Button>
          </div>
          
          <Button onClick={onCreateJob} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {locale === 'fr' ? 'Nouvelle offre' : 'New Job'}
          </Button>
        </div>
      </div>

      {/* Jobs Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold line-clamp-2">
                          {job.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${statusConfig[job.status as keyof typeof statusConfig]?.color}`}
                          >
                            {statusConfig[job.status as keyof typeof statusConfig]?.label[locale as keyof typeof statusConfig.active.label]}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {jobTypeConfig[job.jobType as keyof typeof jobTypeConfig]?.[locale as keyof typeof jobTypeConfig.full_time]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {/* Job Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{getLocationLabel(job.location, locale as 'en' | 'fr')}</span>
                        {job.isRemote && (
                          <Badge variant="outline" className="text-xs">
                            <Globe className="h-3 w-3 mr-1" />
                            {locale === 'fr' ? 'Remote' : 'Remote'}
                          </Badge>
                        )}
                      </div>
                      
                      {job.address && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{job.address}</span>
                        </div>
                      )}
                      
                      {job.department && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span>{job.department}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(job.createdAt)}</span>
                      </div>
                      
                      {job.applications !== undefined && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>
                            {job.applications} {locale === 'fr' ? 'candidatures' : 'applications'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description Preview */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.description}
                    </p>

                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onJobClick(job);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditJob(job);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteJob(job._id, job.title);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {job.salary && (
                        <span className="text-sm font-medium text-green-600">
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${statusConfig[job.status as keyof typeof statusConfig]?.color}`}
                          >
                            {statusConfig[job.status as keyof typeof statusConfig]?.label[locale as keyof typeof statusConfig.active.label]}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {jobTypeConfig[job.jobType as keyof typeof jobTypeConfig]?.[locale as keyof typeof jobTypeConfig.full_time]}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {getLocationLabel(job.location, locale as 'en' | 'fr')}
                          </span>
                          {job.address && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.address}
                            </span>
                          )}
                          {job.department && (
                            <span className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              {job.department}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(job.createdAt)}
                          </span>
                          {job.applications !== undefined && (
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {job.applications} {locale === 'fr' ? 'candidatures' : 'applications'}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {job.salary && (
                          <span className="text-sm font-medium text-green-600">
                            {job.salary}
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onJobClick(job);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditJob(job);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteJob(job._id, job.title);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {locale === 'fr' ? 'Aucune offre trouvée' : 'No jobs found'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {locale === 'fr' 
              ? 'Commencez par créer votre première offre d\'emploi'
              : 'Start by creating your first job posting'
            }
          </p>
          <Button onClick={onCreateJob}>
            <Plus className="h-4 w-4 mr-2" />
            {locale === 'fr' ? 'Créer une offre' : 'Create Job'}
          </Button>
        </div>
      )}
    </div>
  );
} 