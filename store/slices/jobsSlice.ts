import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { searchJobs, type JobSearchParams } from '@/lib/api';

interface Job {
  _id: string;
  title: string;
  companyId: {
    name: string;
    logo: string;
  };
  location: string;
  address?: string;
  jobType: string;
  description: string;
  salary: string;
  createdAt: string;
  skills: string[];
}

interface JobsState {
  jobs: Job[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  filters: {
    search: string;
    location: string;
    skills: string[];
    jobTypes: string[];
    experienceLevel: string;
    sortBy: string;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalJobs: number;
    hasMore: boolean;
    limit: number;
  };
  lastFetch: number | null;
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  loadingMore: false,
  error: null,
  filters: {
    search: '',
    location: '',
    skills: [],
    jobTypes: [],
    experienceLevel: 'all',
    sortBy: 'newest',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    hasMore: true,
    limit: 20,
  },
  lastFetch: null,
};

// Async thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ page = 1, append = false }: { page?: number; append?: boolean }, { getState }) => {
    const state = getState() as { jobs: JobsState };
    const { filters, pagination } = state.jobs;
    
    const params: JobSearchParams = {
      search: filters.search,
      location: filters.location,
      skills: filters.skills,
      page,
      limit: pagination.limit,
    };
    
    const response = await searchJobs(params);
    return { ...response, append, page };
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1;
      state.jobs = [];
    },
    setLocationFilter: (state, action: PayloadAction<string>) => {
      state.filters.location = action.payload;
      state.pagination.currentPage = 1;
      state.jobs = [];
    },
    setSkillsFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.skills = action.payload;
      state.pagination.currentPage = 1;
      state.jobs = [];
    },
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.filters.skills.includes(action.payload)) {
        state.filters.skills.push(action.payload);
        state.pagination.currentPage = 1;
        state.jobs = [];
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.filters.skills = state.filters.skills.filter(skill => skill !== action.payload);
      state.pagination.currentPage = 1;
      state.jobs = [];
    },
    setJobTypesFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.jobTypes = action.payload;
      state.pagination.currentPage = 1;
      state.jobs = [];
    },
    toggleJobType: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      if (state.filters.jobTypes.includes(type)) {
        state.filters.jobTypes = state.filters.jobTypes.filter(t => t !== type);
      } else {
        state.filters.jobTypes.push(type);
      }
      state.pagination.currentPage = 1;
      state.jobs = [];
    },
    setExperienceFilter: (state, action: PayloadAction<string>) => {
      state.filters.experienceLevel = action.payload;
      state.pagination.currentPage = 1;
      state.jobs = [];
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.filters.sortBy = action.payload;
      // Apply sorting to existing jobs
      state.jobs = sortJobs(state.jobs, action.payload);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
      state.jobs = [];
    },
    resetJobs: (state) => {
      state.jobs = [];
      state.pagination.currentPage = 1;
      state.pagination.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state, action) => {
        if (action.meta.arg.append) {
          state.loadingMore = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        const { jobs, totalJobs, totalPages, append, page } = action.payload;
        
        // Filter jobs based on job types
        let filteredJobs = jobs;
        if (state.filters.jobTypes.length > 0) {
          filteredJobs = jobs.filter((job: Job) => 
            state.filters.jobTypes.some(type => 
              job.jobType.toLowerCase().includes(type.toLowerCase())
            )
          );
        }
        
        // Sort jobs
        filteredJobs = sortJobs(filteredJobs, state.filters.sortBy);
        
        if (append) {
          state.jobs = [...state.jobs, ...filteredJobs];
          state.loadingMore = false;
        } else {
          state.jobs = filteredJobs;
          state.loading = false;
        }
        
        state.pagination.currentPage = page;
        state.pagination.totalPages = totalPages || Math.ceil(totalJobs / state.pagination.limit);
        state.pagination.totalJobs = totalJobs || jobs.length;
        state.pagination.hasMore = page < (totalPages || 1);
        state.lastFetch = Date.now();
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      });
  },
});

// Helper function to sort jobs
function sortJobs(jobs: Job[], sortBy: string): Job[] {
  const sorted = [...jobs];
  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'salary-high':
        return parseInt(b.salary || '0') - parseInt(a.salary || '0');
      case 'salary-low':
        return parseInt(a.salary || '0') - parseInt(b.salary || '0');
      default:
        return 0;
    }
  });
  return sorted;
}

export const {
  setSearchFilter,
  setLocationFilter,
  setSkillsFilter,
  addSkill,
  removeSkill,
  setJobTypesFilter,
  toggleJobType,
  setExperienceFilter,
  setSortBy,
  clearFilters,
  resetJobs,
} = jobsSlice.actions;

export default jobsSlice.reducer;