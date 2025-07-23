'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Eye, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Briefcase,
  ChevronRight,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { EmployerApplication } from '@/lib/employer-api';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationsKanbanProps {
  applications: EmployerApplication[];
  onApplicationClick: (application: EmployerApplication) => void;
  onStatusUpdate: (applicationId: string, newStatus: string) => Promise<void>;
  isLoading?: boolean;
}

const statusConfig = {
  new: {
    label: { en: 'New', fr: 'Nouveau' },
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    bgColor: 'bg-blue-50',
    count: 0
  },
  reviewed: {
    label: { en: 'Reviewed', fr: 'Examiné' },
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    bgColor: 'bg-yellow-50',
    count: 0
  },
  interview: {
    label: { en: 'Interview', fr: 'Entrevue' },
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    bgColor: 'bg-purple-50',
    count: 0
  },
  offer: {
    label: { en: 'Offer', fr: 'Offre' },
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    bgColor: 'bg-orange-50',
    count: 0
  },
  hired: {
    label: { en: 'Hired', fr: 'Embauché' },
    color: 'bg-green-100 text-green-800 border-green-200',
    bgColor: 'bg-green-50',
    count: 0
  },
  rejected: {
    label: { en: 'Rejected', fr: 'Rejeté' },
    color: 'bg-red-100 text-red-800 border-red-200',
    bgColor: 'bg-red-50',
    count: 0
  }
};

const statusOrder = ['new', 'reviewed', 'interview', 'offer', 'hired', 'rejected'];

export default function ApplicationsKanban({
  applications,
  onApplicationClick,
  onStatusUpdate,
  isLoading = false
}: ApplicationsKanbanProps) {
  const { t, locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplications, setFilteredApplications] = useState<EmployerApplication[]>(applications);
  const [draggedApplication, setDraggedApplication] = useState<string | null>(null);

  // Update filtered applications when applications or search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(app => 
        app.candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApplications(filtered);
    }
  }, [applications, searchTerm]);

  // Group applications by status
  const applicationsByStatus = statusOrder.reduce((acc, status) => {
    acc[status] = filteredApplications.filter(app => app.status === status);
    return acc;
  }, {} as Record<string, EmployerApplication[]>);

  const handleDragStart = (e: React.DragEvent, applicationId: string) => {
    setDraggedApplication(applicationId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    
    if (!draggedApplication) return;

    try {
      await onStatusUpdate(draggedApplication, targetStatus);
      setDraggedApplication(null);
    } catch (error) {
      console.error('Failed to update application status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-20 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
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
            {locale === 'fr' ? 'Candidatures' : 'Applications'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === 'fr' 
              ? `${applications.length} candidatures au total`
              : `${applications.length} total applications`
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
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {locale === 'fr' ? 'Filtres' : 'Filters'}
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statusOrder.map((status) => {
          const config = statusConfig[status as keyof typeof statusConfig];
          const applicationsInStatus = applicationsByStatus[status] || [];
          
          return (
            <div
              key={status}
              className={`${config.bgColor} rounded-lg p-4 min-h-[600px]`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">
                    {config.label[locale as keyof typeof config.label]}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {applicationsInStatus.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Applications */}
              <div className="space-y-3">
                <AnimatePresence>
                  {applicationsInStatus.map((application) => (
                    <motion.div
                      key={application._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, application._id)}
                      className={`bg-white rounded-lg p-3 shadow-sm border cursor-pointer hover:shadow-md transition-shadow ${
                        draggedApplication === application._id ? 'opacity-50' : ''
                      }`}
                      onClick={() => onApplicationClick(application)}
                    >
                      {/* Candidate Info */}
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-xs">
                            {getInitials(application.candidate.firstName, application.candidate.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {application.candidate.firstName} {application.candidate.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {application.candidate.email}
                          </p>
                        </div>
                      </div>

                      {/* Job Info */}
                      <div className="mb-3">
                        <p className="font-medium text-sm text-gray-900 mb-1">
                          {application.job.title}
                        </p>
                        {application.job.department && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {application.job.department}
                          </p>
                        )}
                      </div>

                      {/* Application Details */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(application.createdAt)}
                          </span>
                          {application.resumeUrl && (
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              CV
                            </span>
                          )}
                        </div>

                        {/* Status Badge */}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${config.color}`}
                        >
                          {config.label[locale as keyof typeof config.label]}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t">
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          {locale === 'fr' ? 'Voir' : 'View'}
                        </Button>
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty State */}
                {applicationsInStatus.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">
                      {locale === 'fr' ? 'Aucune candidature' : 'No applications'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 