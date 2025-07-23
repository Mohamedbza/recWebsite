'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Search, X, Plus, Check } from 'lucide-react';
import { employerApiService, Skill } from '@/lib/employer-api';

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  placeholder?: string;
}

export default function SkillSelector({ 
  selectedSkills, 
  onSkillsChange, 
  placeholder 
}: SkillSelectorProps) {
  const { locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load skills and categories on component mount
  useEffect(() => {
    loadSkills();
    loadCategories();
  }, []);

  // Load skills from API
  const loadSkills = async (search?: string, category?: string) => {
    setIsLoading(true);
    try {
      const response = await employerApiService.getSkills({
        limit: 100,
        search,
        category
      });
      setSkills(response.skills);
    } catch (error) {
      console.error('Failed to load skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load categories from API
  const loadCategories = async () => {
    try {
      const categoriesData = await employerApiService.getSkillCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  // Filter skills based on search term and selected category
  useEffect(() => {
    let filtered = skills;
    
    if (searchTerm) {
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(skill => 
        skill.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Remove already selected skills
    filtered = filtered.filter(skill => !selectedSkills.includes(skill.name));
    
    setFilteredSkills(filtered);
  }, [skills, searchTerm, selectedCategory, selectedSkills]);

  // Handle skill selection
  const handleSkillSelect = (skill: Skill) => {
    if (!selectedSkills.includes(skill.name)) {
      onSkillsChange([...selectedSkills, skill.name]);
    }
    setSearchTerm('');
    setShowDropdown(false);
  };

  // Handle skill removal
  const handleSkillRemove = (skillName: string) => {
    onSkillsChange(selectedSkills.filter(skill => skill !== skillName));
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowDropdown(true);
    
    // Debounced search
    const timeoutId = setTimeout(() => {
      loadSkills(value, selectedCategory);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    loadSkills(searchTerm, category === selectedCategory ? '' : category);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-3">
      <div className="relative" ref={dropdownRef}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              placeholder={placeholder || (locale === 'fr' ? 'Rechercher des compétences...' : 'Search skills...')}
              className="pl-10"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {locale === 'fr' ? 'Parcourir' : 'Browse'}
          </Button>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === '' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleCategoryChange('')}
            >
              {locale === 'fr' ? 'Toutes' : 'All'}
            </Badge>
            {categories.slice(0, 8).map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {/* Skills Dropdown */}
        {showDropdown && (
          <Card className="absolute top-full left-0 right-0 z-50 mt-1 shadow-lg">
            <CardContent className="p-0">
              <ScrollArea className="max-h-60">
                {isLoading ? (
                  <div className="p-4 text-center text-muted-foreground">
                    {locale === 'fr' ? 'Chargement...' : 'Loading...'}
                  </div>
                ) : filteredSkills.length > 0 ? (
                  <div className="p-2">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill._id}
                        className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                        onClick={() => handleSkillSelect(skill)}
                      >
                        <div>
                          <div className="font-medium">{skill.name}</div>
                          <div className="text-sm text-muted-foreground">{skill.category}</div>
                        </div>
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    {searchTerm 
                      ? (locale === 'fr' ? 'Aucune compétence trouvée' : 'No skills found')
                      : (locale === 'fr' ? 'Commencez à taper pour rechercher' : 'Start typing to search')
                    }
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {locale === 'fr' ? 'Compétences sélectionnées' : 'Selected Skills'}
          </Label>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skillName) => (
              <Badge
                key={skillName}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Check className="h-3 w-3" />
                {skillName}
                <button
                  type="button"
                  onClick={() => handleSkillRemove(skillName)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 