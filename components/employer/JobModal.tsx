'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { EmployerJob } from '@/lib/employer-api';
import SkillSelector from './SkillSelector';
import { locationOptions } from '@/lib/location-utils';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: EmployerJob | null;
  onSubmit: (jobData: any) => Promise<void>;
  isLoading?: boolean;
}

const jobTypes = [
  { value: 'full-time', label: { en: 'Full Time', fr: 'Temps plein' } },
  { value: 'part-time', label: { en: 'Part Time', fr: 'Temps partiel' } },
  { value: 'contract', label: { en: 'Contract', fr: 'Contrat' } },
  { value: 'internship', label: { en: 'Internship', fr: 'Stage' } },
  { value: 'freelance', label: { en: 'Freelance', fr: 'Freelance' } }
];

const contractTypes = [
  { value: 'permanent', label: { en: 'Permanent', fr: 'Permanent' } },
  { value: 'contract', label: { en: 'Contract', fr: 'Contrat' } },
  { value: 'temporary', label: { en: 'Temporary', fr: 'Temporaire' } },
  { value: 'internship', label: { en: 'Internship', fr: 'Stage' } }
];

const experienceLevels = [
  { value: 'entry', label: { en: 'Entry Level', fr: 'Débutant' } },
  { value: 'junior', label: { en: 'Junior', fr: 'Junior' } },
  { value: 'mid', label: { en: 'Mid Level', fr: 'Intermédiaire' } },
  { value: 'senior', label: { en: 'Senior', fr: 'Senior' } },
  { value: 'lead', label: { en: 'Lead', fr: 'Lead' } },
  { value: 'executive', label: { en: 'Executive', fr: 'Direction' } }
];

export default function JobModal({ isOpen, onClose, job, onSubmit, isLoading = false }: JobModalProps) {
  const { locale } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    address: '',
    isRemote: false,
    jobType: 'full-time' as const,
    contractType: 'permanent' as const,
    experienceLevel: 'mid' as const,
    department: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: [] as string[],
    qualifications: [] as string[],
    benefits: [] as string[],
    skills: [] as string[],
    applicationDeadline: '',
    applicationUrl: '',
    status: 'draft' as const,
    flags: {
      isFeatured: false,
      isUrgent: false
    }
  });

  const [newResponsibility, setNewResponsibility] = useState('');
  const [newQualification, setNewQualification] = useState('');
  const [newBenefit, setNewBenefit] = useState('');

  // Initialize form data when job is provided (edit mode)
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        location: job.location || '',
        address: job.address || '',
        isRemote: job.isRemote || false,
        jobType: job.jobType || 'full-time',
        contractType: job.contractType || 'permanent',
        experienceLevel: job.experienceLevel || 'mid',
        department: job.department || '',
        salary: job.salary || '',
        description: job.description || '',
        requirements: job.requirements || '',
        responsibilities: job.responsibilities || [],
        qualifications: job.qualifications || [],
        benefits: job.benefits || [],
        skills: job.skills || [],
        applicationDeadline: job.applicationDeadline || '',
        applicationUrl: job.applicationUrl || '',
        status: job.status || 'draft',
        flags: job.flags || { isFeatured: false, isUrgent: false }
      });
    } else {
      // Reset form for new job
      setFormData({
        title: '',
        location: '',
        isRemote: false,
        jobType: 'full-time',
        contractType: 'permanent',
        experienceLevel: 'mid',
        department: '',
        salary: '',
        description: '',
        requirements: '',
        responsibilities: [],
        qualifications: [],
        benefits: [],
        skills: [],
        applicationDeadline: '',
        applicationUrl: '',
        status: 'draft',
        flags: {
          isFeatured: false,
          isUrgent: false
        }
      });
    }
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to submit job:', error);
    }
  };



  const addResponsibility = () => {
    if (newResponsibility.trim() && !formData.responsibilities.includes(newResponsibility.trim())) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility.trim()]
      }));
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (responsibility: string) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter(r => r !== responsibility)
    }));
  };

  const addQualification = () => {
    if (newQualification.trim() && !formData.qualifications.includes(newQualification.trim())) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification.trim()]
      }));
      setNewQualification('');
    }
  };

  const removeQualification = (qualification: string) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q !== qualification)
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(b => b !== benefit)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            {job ? (locale === 'fr' ? 'Modifier l\'offre' : 'Edit Job') : (locale === 'fr' ? 'Nouvelle offre' : 'New Job')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                {locale === 'fr' ? 'Titre du poste *' : 'Job Title *'}
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder={locale === 'fr' ? 'Ex: Développeur Full Stack' : 'e.g. Full Stack Developer'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                {locale === 'fr' ? 'Localisation *' : 'Location *'}
              </Label>
              <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === 'fr' ? 'Sélectionner une localisation' : 'Select a location'} />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label[locale as keyof typeof option.label]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                {locale === 'fr' ? 'Adresse' : 'Address'}
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder={locale === 'fr' ? 'Ex: 123 Rue de la Paix, 75001 Paris' : 'e.g. 123 Main Street, New York, NY'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">
                {locale === 'fr' ? 'Type d\'emploi' : 'Job Type'}
              </Label>
              <Select value={formData.jobType} onValueChange={(value) => setFormData(prev => ({ ...prev, jobType: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label[locale as keyof typeof type.label]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractType">
                {locale === 'fr' ? 'Type de contrat' : 'Contract Type'}
              </Label>
              <Select value={formData.contractType} onValueChange={(value) => setFormData(prev => ({ ...prev, contractType: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contractTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label[locale as keyof typeof type.label]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceLevel">
                {locale === 'fr' ? 'Niveau d\'expérience' : 'Experience Level'}
              </Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label[locale as keyof typeof level.label]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">
                {locale === 'fr' ? 'Salaire' : 'Salary'}
              </Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                placeholder={locale === 'fr' ? 'Ex: 50,000 - 70,000 €' : 'e.g. $50,000 - $70,000'}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isRemote"
              checked={formData.isRemote}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isRemote: checked as boolean }))}
            />
            <Label htmlFor="isRemote">
              {locale === 'fr' ? 'Travail à distance possible' : 'Remote work available'}
            </Label>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {locale === 'fr' ? 'Description du poste *' : 'Job Description *'}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={4}
              placeholder={locale === 'fr' ? 'Décrivez le poste et les responsabilités...' : 'Describe the role and responsibilities...'}
            />
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements">
              {locale === 'fr' ? 'Exigences' : 'Requirements'}
            </Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
              rows={3}
              placeholder={locale === 'fr' ? 'Listez les exigences...' : 'List the requirements...'}
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>
              {locale === 'fr' ? 'Compétences' : 'Skills'}
            </Label>
            <SkillSelector
              selectedSkills={formData.skills}
              onSkillsChange={(skills) => setFormData(prev => ({ ...prev, skills }))}
              placeholder={locale === 'fr' ? 'Rechercher et sélectionner des compétences...' : 'Search and select skills...'}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">
              {locale === 'fr' ? 'Statut' : 'Status'}
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">{locale === 'fr' ? 'Brouillon' : 'Draft'}</SelectItem>
                <SelectItem value="active">{locale === 'fr' ? 'Actif' : 'Active'}</SelectItem>
                <SelectItem value="closed">{locale === 'fr' ? 'Fermé' : 'Closed'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Flags */}
          <div className="space-y-2">
            <Label>{locale === 'fr' ? 'Options' : 'Options'}</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFeatured"
                  checked={formData.flags.isFeatured}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    flags: { ...prev.flags, isFeatured: checked as boolean }
                  }))}
                />
                <Label htmlFor="isFeatured">
                  {locale === 'fr' ? 'Offre en vedette' : 'Featured job'}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isUrgent"
                  checked={formData.flags.isUrgent}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    flags: { ...prev.flags, isUrgent: checked as boolean }
                  }))}
                />
                <Label htmlFor="isUrgent">
                  {locale === 'fr' ? 'Urgent' : 'Urgent'}
                </Label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (locale === 'fr' ? 'Enregistrement...' : 'Saving...') : (job ? (locale === 'fr' ? 'Mettre à jour' : 'Update') : (locale === 'fr' ? 'Créer' : 'Create'))}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 