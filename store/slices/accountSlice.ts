import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiService } from '@/lib/api'

export interface User {
  id: string
  email: string
  name: string
  role: 'candidate' | 'employer'
  avatar?: string
  location?: string
}

interface AccountState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AccountState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

// Async thunk for login
export const loginUser = createAsyncThunk(
  'account/login',
  async (
    { email, password, userType }: 
    { email: string; password: string; userType: 'candidate' | 'employer' }, 
    { rejectWithValue }
  ) => {
    try {
      const rawBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
      const normalizedBase = rawBase.endsWith('/api') ? rawBase : `${rawBase.replace(/\/$/, '')}/api`
      const endpoint = userType === 'candidate' 
        ? `${normalizedBase}/auth/candidates/login/public`
        : `${normalizedBase}/auth/companies/login/public`

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const data = await response.json()

      if (!data.token) {
        throw new Error('No token provided')
      }

      // Extract user data based on user type
      const userData: User = {
        id: userType === 'candidate' ? data.candidate._id : data.company._id,
        email: userType === 'candidate' ? data.candidate.email : data.company.email,
        name: userType === 'candidate' 
          ? `${data.candidate.firstName} ${data.candidate.lastName}`
          : data.company.name,
        role: userType,
        location: userType === 'candidate' ? data.candidate.location : data.company.location,
        avatar: userType === 'candidate' ? data.candidate.profilePicture : data.company.logo,
      }

      // Store in localStorage
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_user', JSON.stringify(userData))

      return { user: userData, token: data.token }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed')
    }
  }
)

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'account/logout',
  async () => {
    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    return null
  }
)

// Async thunk to initialize auth from localStorage
export const initializeAuth = createAsyncThunk(
  'account/initialize',
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window === 'undefined') return null

      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('auth_user')
      
      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser)
        return { user: userData, token: storedToken }
      }
      
      return null
    } catch (error) {
      // Clear corrupted data
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      return rejectWithValue('Failed to initialize auth')
    }
  }
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    clearUser: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = action.payload as string
      })
    
    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.isLoading = false
        state.error = null
      })
    
    // Initialize
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user
          state.token = action.payload.token
          state.isAuthenticated = true
        }
        state.isLoading = false
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setUser, clearUser, setLoading, updateUser, clearError } = accountSlice.actions
export default accountSlice.reducer