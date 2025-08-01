import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getMyJobApplications } from '@/lib/api'

export interface JobApplication {
  _id: string
  job: {
    _id: string
    title: string
    company: {
      name: string
    }
  }
  status: string
  createdAt: string
  updatedAt: string
}

interface JobApplicationsState {
  applications: JobApplication[]
  total: number
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
  stats: {
    totalApplications: number
    inProgress: number
    interviews: number
  }
}

const initialState: JobApplicationsState = {
  applications: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  stats: {
    totalApplications: 0,
    inProgress: 0,
    interviews: 0
  }
}

// Async thunk to fetch job applications
export const fetchJobApplications = createAsyncThunk(
  'jobApplications/fetchJobApplications',
  async (
    { token, page = 1, limit = 10 }: { token: string; page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await getMyJobApplications(token, page, limit)
      
      if (response.success) {
        return {
          applications: response.data.applications || [],
          total: response.data.total || 0,
          page: response.data.page || page,
          totalPages: response.data.totalPages || 1
        }
      } else {
        throw new Error('Failed to fetch job applications')
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch job applications')
    }
  }
)

// Async thunk to fetch recent applications for dashboard
export const fetchRecentApplications = createAsyncThunk(
  'jobApplications/fetchRecentApplications',
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const response = await getMyJobApplications(token, 1, 5)
      
      if (response.success) {
        const applications = response.data.applications || []
        const total = response.data.total || 0
        
        // Calculate stats
        const inProgress = applications.filter((app: JobApplication) => 
          ['pending', 'reviewing', 'shortlisted'].includes(app.status.toLowerCase())
        ).length
        
        const interviews = applications.filter((app: JobApplication) => 
          ['interview', 'interviewed'].includes(app.status.toLowerCase())
        ).length

        return {
          applications,
          total,
          stats: {
            totalApplications: total,
            inProgress,
            interviews
          }
        }
      } else {
        throw new Error('Failed to fetch recent applications')
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch recent applications')
    }
  }
)

const jobApplicationsSlice = createSlice({
  name: 'jobApplications',
  initialState,
  reducers: {
    clearApplications: (state) => {
      state.applications = []
      state.total = 0
      state.currentPage = 1
      state.totalPages = 1
      state.error = null
      state.stats = {
        totalApplications: 0,
        inProgress: 0,
        interviews: 0
      }
    },
    clearError: (state) => {
      state.error = null
    },
    updateApplicationStatus: (state, action: PayloadAction<{ applicationId: string; status: string }>) => {
      const application = state.applications.find(app => app._id === action.payload.applicationId)
      if (application) {
        application.status = action.payload.status
        // Recalculate stats
        const inProgress = state.applications.filter((app) => 
          ['pending', 'reviewing', 'shortlisted'].includes(app.status.toLowerCase())
        ).length
        
        const interviews = state.applications.filter((app) => 
          ['interview', 'interviewed'].includes(app.status.toLowerCase())
        ).length

        state.stats.inProgress = inProgress
        state.stats.interviews = interviews
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch job applications
    builder
      .addCase(fetchJobApplications.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchJobApplications.fulfilled, (state, action) => {
        state.isLoading = false
        state.applications = action.payload.applications
        state.total = action.payload.total
        state.currentPage = action.payload.page
        state.totalPages = action.payload.totalPages
        state.error = null
        
        // Calculate stats
        const inProgress = action.payload.applications.filter((app: JobApplication) => 
          ['pending', 'reviewing', 'shortlisted'].includes(app.status.toLowerCase())
        ).length
        
        const interviews = action.payload.applications.filter((app: JobApplication) => 
          ['interview', 'interviewed'].includes(app.status.toLowerCase())
        ).length

        state.stats = {
          totalApplications: action.payload.total,
          inProgress,
          interviews
        }
      })
      .addCase(fetchJobApplications.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Fetch recent applications
    builder
      .addCase(fetchRecentApplications.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRecentApplications.fulfilled, (state, action) => {
        state.isLoading = false
        state.applications = action.payload.applications
        state.stats = action.payload.stats
        state.total = action.payload.total
        state.error = null
      })
      .addCase(fetchRecentApplications.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearApplications, clearError, updateApplicationStatus } = jobApplicationsSlice.actions
export default jobApplicationsSlice.reducer