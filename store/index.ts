import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './slices/accountSlice'
import jobsReducer from './slices/jobsSlice'
import jobApplicationsReducer from './slices/jobApplicationsSlice'
import recommendedJobsReducer from './slices/recommendedJobsSlice'
import employerDashboardReducer from './slices/employerDashboardSlice'

export const store = configureStore({
  reducer: {
    account: accountReducer,
    jobs: jobsReducer,
    jobApplications: jobApplicationsReducer,
    recommendedJobs: recommendedJobsReducer,
    employerDashboard: employerDashboardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch