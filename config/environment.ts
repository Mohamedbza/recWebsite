// Environment configuration
export const config = {
  // API Configuration - Using production URL directly
  apiUrl: 'https://rec-plus-server.vercel.app/api',
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Default API endpoints
  endpoints: {
    auth: {
      candidateLogin: '/auth/candidates/login/public',
      employerLogin: '/auth/companies/login/public',
    },
    jobs: {
      public: '/jobs/public',
      details: '/job-applications/public/jobs',
    },
    applications: {
      create: '/job-applications/public',
      myApplications: '/job-applications/public/my-applications',
      recommended: '/job-applications/public/recommended-jobs',
    },
    candidate: {
      profile: '/candidate-profile/me',
    },
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.apiUrl}${endpoint}`;
};

// Helper function to check if we're using production API
export const isUsingProductionApi = (): boolean => {
  return config.apiUrl.includes('rec-plus-server.vercel.app');
}; 