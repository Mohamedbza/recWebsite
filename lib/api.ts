const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rec-plus-server.vercel.app/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // User Authentication
  async login(email: string, password: string) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Candidate Registration
  async registerCandidate(candidateData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    location: string;
    dateOfBirth?: string;
    profilePicture?: string;
    resumeUrl?: string;
    coverLetter?: string;
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
    isActive?: boolean;
  }) {
    return this.request('/candidate/register/public', {
      method: 'POST',
      body: JSON.stringify(candidateData),
    });
  }

  // Company Registration
  async registerCompany(companyData: {
    name: string;
    industry: string;
    email: string;
    password: string;
    phone: string;
    location: string;
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
    isVerified?: boolean;
    isPremium?: boolean;
    status?: string;
    totalEmployees?: number;
  }) {
    return this.request('/companies/register/public', {
      method: 'POST',
      body: JSON.stringify(companyData),
    });
  }

  // Get current user (requires authentication)
  async getCurrentUser(token: string) {
    return this.request('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiService = new ApiService();

// Job search parameters interface
export interface JobSearchParams {
  search?: string;
  location?: string;
  page?: number;
  limit?: number;
  jobType?: string;
  experienceLevel?: string;
  skills?: string[];
}

// Job search API function
export const searchJobs = async (params: JobSearchParams) => {
  const queryParams = new URLSearchParams();
  
  if (params.search) queryParams.append('search', params.search);
  if (params.location) queryParams.append('location', params.location);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.jobType) queryParams.append('jobType', params.jobType);
  if (params.experienceLevel) queryParams.append('experienceLevel', params.experienceLevel);
  if (params.skills && params.skills.length > 0) queryParams.append('skills', params.skills.join(','));

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const response = await fetch(`${apiUrl}/jobs/public?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
}; 