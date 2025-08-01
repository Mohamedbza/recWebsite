import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { employerApiService, EmployerJob, EmployerApplication, DashboardStats } from '@/lib/employer-api'

interface EmployerDashboardState {
  // Dashboard Stats
  stats: DashboardStats | null
  statsLoading: boolean
  statsError: string | null
  
  // Jobs
  jobs: EmployerJob[]
  jobsTotal: number
  jobsPage: number
  jobsTotalPages: number
  jobsLoading: boolean
  jobsError: string | null
  
  // Applications
  applications: EmployerApplication[]
  applicationsTotal: number
  applicationsPage: number
  applicationsTotalPages: number
  applicationsLoading: boolean
  applicationsError: string | null
  
  // General loading state
  initialLoading: boolean
  
  // Last fetch times for cache management
  lastStatsUpdate: string | null
  lastJobsUpdate: string | null
  lastApplicationsUpdate: string | null
}

const initialState: EmployerDashboardState = {
  // Stats
  stats: null,
  statsLoading: false,
  statsError: null,
  
  // Jobs
  jobs: [],
  jobsTotal: 0,
  jobsPage: 1,
  jobsTotalPages: 1,
  jobsLoading: false,
  jobsError: null,
  
  // Applications
  applications: [],
  applicationsTotal: 0,
  applicationsPage: 1,
  applicationsTotalPages: 1,
  applicationsLoading: false,
  applicationsError: null,
  
  // General
  initialLoading: false,
  
  // Cache
  lastStatsUpdate: null,
  lastJobsUpdate: null,
  lastApplicationsUpdate: null
}

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  'employerDashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const stats = await employerApiService.getDashboardStats()
      return {
        stats,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch dashboard stats')
    }
  }
)

export const fetchEmployerJobs = createAsyncThunk(
  'employerDashboard/fetchJobs',
  async (params: {
    page?: number
    limit?: number
    status?: string
    search?: string
  } = {}, { rejectWithValue }) => {
    try {
      const result = await employerApiService.getJobs(params)
      return {
        ...result,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch jobs')
    }
  }
)

export const fetchEmployerApplications = createAsyncThunk(
  'employerDashboard/fetchApplications',
  async (params: {
    page?: number
    limit?: number
    status?: string
    jobId?: string
    search?: string
  } = {}, { rejectWithValue }) => {
    try {
      const result = await employerApiService.getApplications(params)
      return {
        ...result,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch applications')
    }
  }
)

// Load all dashboard data at once
export const loadDashboardData = createAsyncThunk(
  'employerDashboard/loadAll',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Load all data in parallel
      const [statsResult, jobsResult, applicationsResult] = await Promise.allSettled([
        dispatch(fetchDashboardStats()).unwrap(),
        dispatch(fetchEmployerJobs({ limit: 100 })).unwrap(),
        dispatch(fetchEmployerApplications({ limit: 100 })).unwrap()
      ])

      const errors = []
      if (statsResult.status === 'rejected') errors.push(`Stats: ${statsResult.reason}`)
      if (jobsResult.status === 'rejected') errors.push(`Jobs: ${jobsResult.reason}`)
      if (applicationsResult.status === 'rejected') errors.push(`Applications: ${applicationsResult.reason}`)

      if (errors.length === 3) {
        throw new Error(`All requests failed: ${errors.join(', ')}`)
      }

      return {
        errors: errors.length > 0 ? errors : null,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load dashboard data')
    }
  }
)

// Job management thunks
export const createEmployerJob = createAsyncThunk(
  'employerDashboard/createJob',
  async (jobData: Parameters<typeof employerApiService.createJob>[0], { dispatch, rejectWithValue }) => {
    try {
      const newJob = await employerApiService.createJob(jobData)
      // Refresh the jobs list
      dispatch(fetchEmployerJobs({ limit: 100 }))
      // Refresh stats
      dispatch(fetchDashboardStats())
      return newJob
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create job')
    }
  }
)

export const updateEmployerJob = createAsyncThunk(
  'employerDashboard/updateJob',
  async ({ jobId, jobData }: { jobId: string; jobData: Partial<EmployerJob> }, { dispatch, rejectWithValue }) => {
    try {
      const updatedJob = await employerApiService.updateJob(jobId, jobData)
      // Refresh the jobs list
      dispatch(fetchEmployerJobs({ limit: 100 }))
      return updatedJob
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update job')
    }
  }
)

export const deleteEmployerJob = createAsyncThunk(
  'employerDashboard/deleteJob',
  async (jobId: string, { dispatch, rejectWithValue }) => {
    try {
      await employerApiService.deleteJob(jobId)
      // Refresh the jobs list
      dispatch(fetchEmployerJobs({ limit: 100 }))
      // Refresh stats
      dispatch(fetchDashboardStats())
      return jobId
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete job')
    }
  }
)

// Application management thunk
export const updateApplicationStatus = createAsyncThunk(
  'employerDashboard/updateApplicationStatus',
  async ({ applicationId, status }: { applicationId: string; status: string }, { dispatch, rejectWithValue }) => {
    try {
      const updatedApplication = await employerApiService.updateApplicationStatus(applicationId, status)
      // Refresh applications
      dispatch(fetchEmployerApplications({ limit: 100 }))
      // Refresh stats
      dispatch(fetchDashboardStats())
      return updatedApplication
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update application status')
    }
  }
)

const employerDashboardSlice = createSlice({
  name: 'employerDashboard',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.statsError = null
      state.jobsError = null
      state.applicationsError = null
    },
    clearStatsError: (state) => {
      state.statsError = null
    },
    clearJobsError: (state) => {
      state.jobsError = null
    },
    clearApplicationsError: (state) => {
      state.applicationsError = null
    },
    resetDashboard: (state) => {
      return initialState
    },
    // Optimistic updates for better UX
    optimisticJobUpdate: (state, action: PayloadAction<{ jobId: string; updates: Partial<EmployerJob> }>) => {
      const job = state.jobs.find(j => j._id === action.payload.jobId)
      if (job) {
        Object.assign(job, action.payload.updates)
      }
    },
    optimisticApplicationUpdate: (state, action: PayloadAction<{ applicationId: string; updates: Partial<EmployerApplication> }>) => {
      const application = state.applications.find(a => a._id === action.payload.applicationId)
      if (application) {
        Object.assign(application, action.payload.updates)
      }
    }
  },
  extraReducers: (builder) => {
    // Dashboard Stats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.statsLoading = true
        state.statsError = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.statsLoading = false
        state.stats = action.payload.stats
        state.lastStatsUpdate = action.payload.timestamp
        state.statsError = null
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.statsLoading = false
        state.statsError = action.payload as string
      })

    // Jobs
    builder
      .addCase(fetchEmployerJobs.pending, (state) => {
        state.jobsLoading = true
        state.jobsError = null
      })
      .addCase(fetchEmployerJobs.fulfilled, (state, action) => {
        state.jobsLoading = false
        state.jobs = action.payload.jobs
        state.jobsTotal = action.payload.total
        state.jobsPage = action.payload.page
        state.jobsTotalPages = action.payload.totalPages
        state.lastJobsUpdate = action.payload.timestamp
        state.jobsError = null
      })
      .addCase(fetchEmployerJobs.rejected, (state, action) => {
        state.jobsLoading = false
        state.jobsError = action.payload as string
      })

    // Applications
    builder
      .addCase(fetchEmployerApplications.pending, (state) => {
        state.applicationsLoading = true
        state.applicationsError = null
      })
      .addCase(fetchEmployerApplications.fulfilled, (state, action) => {
        state.applicationsLoading = false
        state.applications = action.payload.applications
        state.applicationsTotal = action.payload.total
        state.applicationsPage = action.payload.page
        state.applicationsTotalPages = action.payload.totalPages
        state.lastApplicationsUpdate = action.payload.timestamp
        state.applicationsError = null
      })
      .addCase(fetchEmployerApplications.rejected, (state, action) => {
        state.applicationsLoading = false
        state.applicationsError = action.payload as string
      })

    // Load all data
    builder
      .addCase(loadDashboardData.pending, (state) => {
        state.initialLoading = true
      })
      .addCase(loadDashboardData.fulfilled, (state, action) => {
        state.initialLoading = false
        // Errors are handled by individual thunks
      })
      .addCase(loadDashboardData.rejected, (state, action) => {
        state.initialLoading = false
        // Set a general error if all requests failed
        if (!state.statsError && !state.jobsError && !state.applicationsError) {
          state.statsError = action.payload as string
        }
      })

    // Job management
    builder
      .addCase(createEmployerJob.fulfilled, (state, action) => {
        // Job will be added via the refresh, but we can show immediate feedback
        state.jobsError = null
      })
      .addCase(createEmployerJob.rejected, (state, action) => {
        state.jobsError = action.payload as string
      })
      .addCase(updateEmployerJob.fulfilled, (state, action) => {
        state.jobsError = null
      })
      .addCase(updateEmployerJob.rejected, (state, action) => {
        state.jobsError = action.payload as string
      })
      .addCase(deleteEmployerJob.fulfilled, (state, action) => {
        state.jobsError = null
      })
      .addCase(deleteEmployerJob.rejected, (state, action) => {
        state.jobsError = action.payload as string
      })

    // Application management
    builder
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.applicationsError = null
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.applicationsError = action.payload as string
      })
  },
})

export const {
  clearErrors,
  clearStatsError,
  clearJobsError,
  clearApplicationsError,
  resetDashboard,
  optimisticJobUpdate,
  optimisticApplicationUpdate,
} = employerDashboardSlice.actions

export default employerDashboardSlice.reducer