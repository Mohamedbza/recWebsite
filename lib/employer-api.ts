import { config } from '../config/environment';

const API_BASE_URL = config.apiUrl;

export interface EmployerJob {
  _id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  address?: string;
  isRemote: boolean;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  contractType: 'permanent' | 'contract' | 'temporary' | 'internship';
  experienceLevel: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  department?: string;
  salary?: string;
  description: string;
  requirements?: string;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  skills?: string[];
  applicationDeadline?: string;
  applicationUrl?: string;
  status: 'active' | 'inactive' | 'draft' | 'closed' | 'expired';
  views?: number;
  applications?: number;
  flags?: {
    isFeatured: boolean;
    isUrgent: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface EmployerApplication {
  _id: string;
  candidate: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    experiences?: Array<{
      company: string;
      title: string;
      startDate: string;
      endDate?: string;
      description?: string;
    }>;
    education?: Array<{
      institution: string;
      degree: string;
      fieldOfStudy: string;
      startDate: string;
      endDate?: string;
    }>;
    skills?: string[];
  };
  job: {
    _id: string;
    title: string;
    department?: string;
    description?: string;
    requirements?: string;
  };
  resumeUrl?: string;
  coverLetter?: string;
  status: 'new' | 'reviewed' | 'interview' | 'offer' | 'hired' | 'rejected';
  notes?: string;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  jobs: {
    total: number;
    active: number;
    draft: number;
    closed: number;
  };
  applications: {
    total: number;
    new: number;
    reviewed: number;
    interview: number;
    hired: number;
    rejected: number;
    recent: number;
  };
  topJobs: Array<{
    _id: string;
    jobTitle: string;
    count: number;
  }>;
}

export interface EmployerProfile {
  _id: string;
  name: string;
  industry: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  country?: string;
  website?: string;
  logo?: string;
  coverImage?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  foundedYear?: number;
  registrationNumber?: string;
  taxId?: string;
  isVerified: boolean;
  isPremium: boolean;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  totalEmployees: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

class EmployerApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retries: number = 2
  ): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    const user = typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null;
    
    if (!token || !user) {
      throw new Error('Authentication required');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    };

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Invalid JSON response from server');
      }

      if (!response.ok) {
        // Handle specific HTTP status codes
        if (response.status === 401) {
          throw new Error('Authentication failed - please login again');
        } else if (response.status === 408 || response.status === 504) {
          throw new Error('Request timeout - server is taking too long to respond');
        } else if (response.status === 503) {
          throw new Error('Service temporarily unavailable - please try again later');
        } else if (response.status >= 500) {
          throw new Error('Server error - please try again later');
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server is taking too long to respond');
      }
      
      // Retry logic for network errors
      if (retries > 0 && (error.message.includes('timeout') || error.message.includes('network') || error.message.includes('fetch'))) {
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.request(endpoint, options, retries - 1);
      }
      
      throw error;
    }
  }

  private async publicRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    retries: number = 2
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Invalid JSON response from server');
      }

      if (!response.ok) {
        // Handle specific HTTP status codes
        if (response.status === 408 || response.status === 504) {
          throw new Error('Request timeout - server is taking too long to respond');
        } else if (response.status === 503) {
          throw new Error('Service temporarily unavailable - please try again later');
        } else if (response.status >= 500) {
          throw new Error('Server error - please try again later');
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server is taking too long to respond');
      }
      
      // Retry logic for network errors
      if (retries > 0 && (error.message.includes('timeout') || error.message.includes('network') || error.message.includes('fetch'))) {
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.publicRequest(endpoint, options, retries - 1);
      }
      
      throw error;
    }
  }

  private getCompanyId(): string {
    if (typeof window === 'undefined') {
      throw new Error('Cannot access localStorage on server side');
    }
    
    const user = localStorage.getItem('auth_user');
    if (!user) {
      throw new Error('User not found');
    }
    
    const userData = JSON.parse(user);
    return userData.id;
  }

  // Get employer's jobs
  async getJobs(params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  } = {}): Promise<{
    jobs: EmployerJob[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const companyId = this.getCompanyId();
    const queryParams = new URLSearchParams();
    queryParams.append('companyId', companyId);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.search) queryParams.append('search', params.search);

    return this.publicRequest(`/employer/jobs/public?${queryParams.toString()}`);
  }

  // Get employer's job applications
  async getApplications(params: {
    page?: number;
    limit?: number;
    status?: string;
    jobId?: string;
    search?: string;
  } = {}): Promise<{
    applications: EmployerApplication[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const companyId = this.getCompanyId();
    const queryParams = new URLSearchParams();
    queryParams.append('companyId', companyId);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.jobId) queryParams.append('jobId', params.jobId);
    if (params.search) queryParams.append('search', params.search);

    return this.publicRequest(`/employer/applications/public?${queryParams.toString()}`);
  }

  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    const companyId = this.getCompanyId();
    return this.publicRequest(`/employer/applications/public/stats/dashboard?companyId=${companyId}`);
  }

  // Update application status
  async updateApplicationStatus(applicationId: string, status: string): Promise<EmployerApplication> {
    const companyId = this.getCompanyId();
    return this.request(`/employer-public/applications/${applicationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, companyId }),
    });
  }

  // Get application details
  async getApplicationDetails(applicationId: string): Promise<EmployerApplication> {
    const companyId = this.getCompanyId();
    return this.publicRequest(`/employer/applications/public/${applicationId}?companyId=${companyId}`);
  }

  // Add notes to application
  async addApplicationNotes(applicationId: string, notes: string): Promise<EmployerApplication> {
    const companyId = this.getCompanyId();
    return this.request(`/employer-public/applications/${applicationId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ notes, companyId }),
    });
  }

  // Get employer profile
  async getProfile(): Promise<EmployerProfile> {
    const companyId = this.getCompanyId();
    return this.request(`/employer-public/profile?companyId=${companyId}`);
  }

  // Update employer profile
  async updateProfile(profileData: Partial<EmployerProfile>): Promise<EmployerProfile> {
    const companyId = this.getCompanyId();
    return this.request('/employer-public/profile', {
      method: 'PUT',
      body: JSON.stringify({ ...profileData, companyId }),
    });
  }

  // Create a new job
  async createJob(jobData: {
    title: string;
    location: string;
    address?: string;
    isRemote: boolean;
    jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
    contractType: 'permanent' | 'contract' | 'temporary' | 'internship';
    experienceLevel: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
    department?: string;
    salary?: string;
    description: string;
    requirements?: string;
    responsibilities?: string[];
    qualifications?: string[];
    benefits?: string[];
    skills?: string[];
    applicationDeadline?: string;
    applicationUrl?: string;
    status: 'active' | 'inactive' | 'draft' | 'closed' | 'expired';
    flags?: {
      isFeatured: boolean;
      isUrgent: boolean;
    };
  }): Promise<EmployerJob> {
    const companyId = this.getCompanyId();
    return this.request('/employer-public/jobs', {
      method: 'POST',
      body: JSON.stringify({ ...jobData, companyId }),
    });
  }

  // Update a job
  async updateJob(jobId: string, jobData: Partial<EmployerJob>): Promise<EmployerJob> {
    const companyId = this.getCompanyId();
    return this.request(`/employer-public/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify({ ...jobData, companyId }),
    });
  }

  // Delete a job
  async deleteJob(jobId: string): Promise<{ message: string }> {
    const companyId = this.getCompanyId();
    return this.request(`/employer-public/jobs/${jobId}`, {
      method: 'DELETE',
      body: JSON.stringify({ companyId }),
    });
  }

  // Get all skills
  async getSkills(params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  } = {}): Promise<{
    skills: Skill[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.category) queryParams.append('category', params.category);

    return this.publicRequest(`/employer-public/skills?${queryParams.toString()}`);
  }

  // Get skill categories
  async getSkillCategories(): Promise<string[]> {
    return this.publicRequest('/employer-public/skills/categories/all');
  }

  // Get popular skills
  async getPopularSkills(limit: number = 10): Promise<Skill[]> {
    return this.publicRequest(`/employer-public/skills/popular/all?limit=${limit}`);
  }
}

export const employerApiService = new EmployerApiService(); 