'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Award
} from 'lucide-react';
import { DashboardStats as DashboardStatsType } from '@/lib/employer-api';

interface DashboardStatsProps {
  stats: DashboardStatsType;
  isLoading?: boolean;
}

const statConfig = {
  jobs: {
    icon: Briefcase,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  applications: {
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  recent: {
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  conversion: {
    icon: Award,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
};

const applicationStatusConfig = {
  new: {
    label: { en: 'New', fr: 'Nouveau' },
    icon: Plus,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  reviewed: {
    label: { en: 'Reviewed', fr: 'Examiné' },
    icon: Eye,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  interview: {
    label: { en: 'Interview', fr: 'Entrevue' },
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  hired: {
    label: { en: 'Hired', fr: 'Embauché' },
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  rejected: {
    label: { en: 'Rejected', fr: 'Rejeté' },
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  }
};

export default function DashboardStats({ stats, isLoading = false }: DashboardStatsProps) {
  const { locale } = useLanguage();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Defensive programming: provide default values if stats structure is incomplete
  const safeStats = {
    jobs: {
      total: stats?.jobs?.total ?? 0,
      active: stats?.jobs?.active ?? 0,
      draft: stats?.jobs?.draft ?? 0,
      closed: stats?.jobs?.closed ?? 0,
    },
    applications: {
      total: stats?.applications?.total ?? 0,
      new: stats?.applications?.new ?? 0,
      reviewed: stats?.applications?.reviewed ?? 0,
      interview: stats?.applications?.interview ?? 0,
      hired: stats?.applications?.hired ?? 0,
      rejected: stats?.applications?.rejected ?? 0,
      recent: stats?.applications?.recent ?? 0,
    },
    topJobs: stats?.topJobs ?? [],
  };

  // Calculate conversion rate safely
  const conversionRate = safeStats.applications.total > 0 
    ? ((safeStats.applications.hired / safeStats.applications.total) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Jobs */}
        <Card className={`border-l-4 ${statConfig.jobs.borderColor}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <statConfig.jobs.icon className={`h-4 w-4 ${statConfig.jobs.color}`} />
              {locale === 'fr' ? 'Offres actives' : 'Active Jobs'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeStats.jobs.active}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'fr' 
                ? `${safeStats.jobs.total} au total`
                : `${safeStats.jobs.total} total`
              }
            </p>
          </CardContent>
        </Card>

        {/* Total Applications */}
        <Card className={`border-l-4 ${statConfig.applications.borderColor}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <statConfig.applications.icon className={`h-4 w-4 ${statConfig.applications.color}`} />
              {locale === 'fr' ? 'Candidatures' : 'Applications'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeStats.applications.total}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'fr' 
                ? `${safeStats.applications.recent} récentes`
                : `${safeStats.applications.recent} recent`
              }
            </p>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className={`border-l-4 ${statConfig.recent.borderColor}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <statConfig.recent.icon className={`h-4 w-4 ${statConfig.recent.color}`} />
              {locale === 'fr' ? 'Nouvelles candidatures' : 'New Applications'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeStats.applications.new}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'fr' 
                ? 'Cette semaine'
                : 'This week'
              }
            </p>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card className={`border-l-4 ${statConfig.conversion.borderColor}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <statConfig.conversion.icon className={`h-4 w-4 ${statConfig.conversion.color}`} />
              {locale === 'fr' ? 'Taux de conversion' : 'Conversion Rate'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'fr' 
                ? `${safeStats.applications.hired} embauchés`
                : `${safeStats.applications.hired} hired`
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Application Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {locale === 'fr' ? 'Statut des candidatures' : 'Application Status'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(applicationStatusConfig).map(([status, config]) => {
                const count = safeStats.applications[status as keyof typeof safeStats.applications];
                const Icon = config.icon;
                
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.bgColor}`}>
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>
                      <div>
                        <p className="font-medium">
                          {config.label[locale as keyof typeof config.label]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'fr' 
                            ? `${count} candidatures`
                            : `${count} applications`
                          }
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {safeStats.applications.total > 0 
                        ? `${((count / safeStats.applications.total) * 100).toFixed(1)}%`
                        : '0%'
                      }
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {locale === 'fr' ? 'Offres populaires' : 'Top Jobs'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeStats.topJobs.length > 0 ? (
                safeStats.topJobs.map((job, index) => (
                  <div key={job._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{job.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'fr' 
                            ? `${job.count} candidatures`
                            : `${job.count} applications`
                          }
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {safeStats.applications.total > 0 
                        ? `${((job.count / safeStats.applications.total) * 100).toFixed(1)}%`
                        : '0%'
                      }
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Briefcase className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">
                    {locale === 'fr' 
                      ? 'Aucune offre avec candidatures'
                      : 'No jobs with applications yet'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {locale === 'fr' ? 'Aperçu des offres' : 'Job Overview'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{safeStats.jobs.active}</div>
              <p className="text-sm text-green-700">
                {locale === 'fr' ? 'Actives' : 'Active'}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{safeStats.jobs.draft}</div>
              <p className="text-sm text-gray-700">
                {locale === 'fr' ? 'Brouillons' : 'Draft'}
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{safeStats.jobs.closed}</div>
              <p className="text-sm text-red-700">
                {locale === 'fr' ? 'Fermées' : 'Closed'}
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {safeStats.jobs.total - safeStats.jobs.active - safeStats.jobs.draft - safeStats.jobs.closed}
              </div>
              <p className="text-sm text-orange-700">
                {locale === 'fr' ? 'Autres' : 'Other'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 