import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, ProfileStats, LoginData, RegisterData } from '../../types';
import authService from '../../service/authService';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  stats: ProfileStats | null;
  activity: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  stats: null,
  activity: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await authService.login(loginData);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(registerData);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch profile';
      return rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(userData);
      toast.success('Profile updated successfully');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Update failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(passwordData);
      toast.success('Password changed successfully');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Password change failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email);
      toast.success('Password reset link sent to your email');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Request failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, passwordData }: {
    token: string;
    passwordData: { password: string; confirmPassword: string };
  }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(token, passwordData);
      toast.success('Password reset successful');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Reset failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Add these thunks to existing authSlice

export const fetchCompleteProfile = createAsyncThunk(
  'auth/fetchCompleteProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(userData);
      toast.success('Profile updated successfully');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Update failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  'auth/changeUserPassword',
  async (passwordData: any, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(passwordData);
      toast.success('Password changed successfully');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Password change failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.stats = null;
      state.activity = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      authService.logout();
      toast.success('Logged out successfully');
    },
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    updateUserInState: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
     // Complete extraReducers with all missing fulfilled cases

// Fetch Profile
.addCase(fetchProfile.pending, (state) => {
  state.loading = true;
})
.addCase(fetchProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload.user || action.payload;
  state.stats = action.payload.stats || null;
  state.activity = action.payload.activity || null;
  state.error = null;
})
.addCase(fetchProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})

// Update Profile
.addCase(updateProfile.pending, (state) => {
  state.loading = true;
})
.addCase(updateProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.user = state.user ? { ...state.user, ...action.payload } : action.payload;
  state.error = null;
})
.addCase(updateProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})
      
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
   
  },
});

export const { logout, clearError, setCredentials, updateUserInState } = authSlice.actions;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsAdmin = (state: { auth: AuthState }) => state.auth.user?.role === 'admin';
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectUserStats = (state: { auth: AuthState }) => state.auth.stats;
export const selectUserActivity = (state: { auth: AuthState }) => state.auth.activity;

export default authSlice.reducer;
