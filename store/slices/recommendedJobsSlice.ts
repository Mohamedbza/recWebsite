import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getRecommendedJobs } from '@/lib/api'

export interface RecommendedJob {
  _id: string
  title: string
  companyId: {
    name: string
  }
  address: string
  skills: string[]
  matchScore: number
  matchingSkills: string[]
  description?: string
  requirements?: string[]
  location?: string
  salary?: {
    min?: number
    max?: number
    currency?: string
  }
  jobType?: string
  experienceLevel?: string
  createdAt: string
  updatedAt: string
}

interface RecommendedJobsState {
  jobs: RecommendedJob[]
  total: number
  isLoading: boolean
  error: string | null
  lastFetchTime: string | null
}

const initialState: RecommendedJobsState = {
  jobs: [],
  total: 0,
  isLoading: false,
  error: null,
  lastFetchTime: null
}

// Async thunk to fetch recommended jobs
export const fetchRecommendedJobs = createAsyncThunk(
  'recommendedJobs/fetchRecommendedJobs',
  async (
    { token, limit = 5 }: { token: string; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await getRecommendedJobs(token, limit)
      
      if (response.success) {
        return {
          jobs: response.data.jobs || [],
          total: response.data.total || 0,
          lastFetchTime: new Date().toISOString()
        }
      } else {
        throw new Error('Failed to fetch recommended jobs')
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch recommended jobs')
    }
  }
)

// Async thunk to refresh recommendations (force refresh)
export const refreshRecommendedJobs = createAsyncThunk(
  'recommendedJobs/refreshRecommendedJobs',
  async (
    { token, limit = 10 }: { token: string; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await getRecommendedJobs(token, limit)
      
      if (response.success) {
        return {
          jobs: response.data.jobs || [],
          total: response.data.total || 0,
          lastFetchTime: new Date().toISOString()
        }
      } else {
        throw new Error('Failed to refresh recommended jobs')
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to refresh recommended jobs')
    }
  }
)

const recommendedJobsSlice = createSlice({
  name: 'recommendedJobs',
  initialState,
  reducers: {
    clearRecommendedJobs: (state) => {
      state.jobs = []
      state.total = 0
      state.error = null
      state.lastFetchTime = null
    },
    clearError: (state) => {
      state.error = null
    },
    removeJobFromRecommendations: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job._id !== action.payload)
      state.total = Math.max(0, state.total - 1)
    },
    updateJobInRecommendations: (state, action: PayloadAction<{ jobId: string; updates: Partial<RecommendedJob> }>) => {
      const jobIndex = state.jobs.findIndex(job => job._id === action.payload.jobId)
      if (jobIndex !== -1) {
        state.jobs[jobIndex] = { ...state.jobs[jobIndex], ...action.payload.updates }
      }
    },
    // Utility to mark a job as applied (could be used to show visual feedback)
    markJobAsApplied: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find(job => job._id === action.payload)
      if (job) {
        // We could add an 'applied' flag to the job object
        (job as any).applied = true
      }
    }
  },
  extraReducers: (builder) => {
    // Fetch recommended jobs
    builder
      .addCase(fetchRecommendedJobs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRecommendedJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobs = action.payload.jobs
        state.total = action.payload.total
        state.lastFetchTime = action.payload.lastFetchTime
        state.error = null
      })
      .addCase(fetchRecommendedJobs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Refresh recommended jobs
    builder
      .addCase(refreshRecommendedJobs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(refreshRecommendedJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobs = action.payload.jobs
        state.total = action.payload.total
        state.lastFetchTime = action.payload.lastFetchTime
        state.error = null
      })
      .addCase(refreshRecommendedJobs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { 
  clearRecommendedJobs, 
  clearError, 
  removeJobFromRecommendations, 
  updateJobInRecommendations,
  markJobAsApplied 
} = recommendedJobsSlice.actions
export default recommendedJobsSlice.reducer