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
      const { config } = await import('../../config/environment')
      const endpoint = userType === 'candidate' 
        ? `${config.apiUrl}/auth/candidates/login/public`
        : `${config.apiUrl}/auth/companies/login/public`

      console.log('Attempting login:', { endpoint, userType, email })

      // Add timeout and abort controller
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log('Login response status:', response.status)

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch (e) {
          console.error('Failed to parse error response:', e)
          throw new Error(`Server error (${response.status}): Unable to parse response`)
        }
        
        console.log('Login error data:', errorData)
        
        // Handle specific HTTP status codes
        if (response.status === 401) {
          throw new Error('Invalid email or password. Please check your credentials.')
        } else if (response.status === 404) {
          throw new Error('User not found. Please check your email address.')
        } else if (response.status === 408 || response.status === 504) {
          throw new Error('Request timeout. The server is taking too long to respond. Please try again.')
        } else if (response.status === 422) {
          throw new Error(errorData.message || 'Invalid input data. Please check your information.')
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else {
          throw new Error(errorData.message || `Login failed (${response.status})`)
        }
      }

      let data
      try {
        data = await response.json()
      } catch (e) {
        console.error('Failed to parse login response:', e)
        throw new Error('Invalid response from server. Please try again.')
      }

      console.log('Login response data:', data)

      if (!data.token) {
        console.error('No token in response:', data)
        throw new Error('No authentication token received from server')
      }

      // Extract user data based on user type with better error handling
      let userData: User
      try {
        if (userType === 'candidate') {
          if (!data.candidate) {
            throw new Error('Candidate data not found in response')
          }
          userData = {
            id: data.candidate._id,
            email: data.candidate.email,
            name: `${data.candidate.firstName} ${data.candidate.lastName}`,
            role: 'candidate',
            location: data.candidate.location,
            avatar: data.candidate.profilePicture,
          }
        } else {
          if (!data.company) {
            throw new Error('Company data not found in response')
          }
          userData = {
            id: data.company._id,
            email: data.company.email,
            name: data.company.name,
            role: 'employer',
            location: data.company.location,
            avatar: data.company.logo,
          }
        }
      } catch (e) {
        console.error('Error extracting user data:', e, data)
        throw new Error('Invalid user data received from server')
      }

      console.log('Extracted user data:', userData)

      // Store in localStorage
      try {
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('auth_user', JSON.stringify(userData))
      } catch (e) {
        console.error('Failed to store auth data:', e)
        throw new Error('Failed to save authentication data')
      }

      return { user: userData, token: data.token }
    } catch (error) {
      console.error('Login error:', error)
      
      if (error.name === 'AbortError') {
        return rejectWithValue('Request timeout. Please check your internet connection and try again.')
      }
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return rejectWithValue('Network error. Please check your internet connection.')
      }
      
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