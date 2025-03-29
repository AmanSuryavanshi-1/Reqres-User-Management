import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../utils/api';
import { toast } from 'sonner';

interface User {
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('authToken'),
  user: localStorage.getItem('userData') 
    ? JSON.parse(localStorage.getItem('userData') || '{}') 
    : null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        
        // Mock user data (since login endpoint doesn't return user details)
        const mockUserData = {
          email,
          name: 'User',
        };
        
        localStorage.setItem('userData', JSON.stringify(mockUserData));
        toast.success("Login successful!");
        return mockUserData;
      }
      
      return rejectWithValue('Login failed');
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      return rejectWithValue('Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    toast.success("Logged out successfully");
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        state.isAuthenticated = true;
        
        // Try to get user data from localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
          try {
            state.user = JSON.parse(userData);
          } catch (error) {
            console.error('Failed to parse user data');
          }
        }
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { checkAuth } = authSlice.actions;
export default authSlice.reducer;
