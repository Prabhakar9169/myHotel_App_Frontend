
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '../../types';
import toast from 'react-hot-toast';
import api from '../../service/api';


interface BookingState {
  bookings: Booking[];
  userBookings: Booking[];
  currentBooking: Booking | null;
  bookingStats: {
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
  };
  loading: boolean;
  submitLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  userBookings: [],
  currentBooking: null,
  bookingStats: {
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
  },
  loading: false,
  submitLoading: false,
  error: null,
};

// Async thunks
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ bookingData, navigate }: {
    bookingData: {
      roomId: string;
      checkIn: string;
      checkOut: string;
      guests: number;
      specialRequests?: string;
    };
    navigate: (path: string) => void;
  }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/bookings', bookingData);
      toast.success('Booking created successfully');
      navigate('/bookings/');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create booking';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/bookings');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch bookings';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchAllBookings = createAsyncThunk(
  'bookings/fetchAllBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/bookings');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch all bookings';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/bookings/${bookingId}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch booking details';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ bookingId, bookingData }: { 
    bookingId: string; 
    bookingData: Partial<Booking> 
  }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/bookings/${bookingId}`, bookingData);
      toast.success('Booking updated successfully');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update booking';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/bookings/${bookingId}`);
      toast.success('Booking cancelled successfully');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to cancel booking';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Booking slice
const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateBookingStatus: (state, action: PayloadAction<{ 
      bookingId: string; 
      status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
    }>) => {
      const { bookingId, status } = action.payload;
      
      // Update in all bookings
      const bookingIndex = state.bookings.findIndex(b => b._id === bookingId);
      if (bookingIndex !== -1) {
        state.bookings[bookingIndex].status = status;
      }
      
      // Update in user bookings
      const userBookingIndex = state.userBookings.findIndex(b => b._id === bookingId);
      if (userBookingIndex !== -1) {
        state.userBookings[userBookingIndex].status = status;
      }
      
      // Update current booking with null check
      if (state.currentBooking && state.currentBooking._id === bookingId) {
        state.currentBooking.status = status;
      }
    },
    updateBookingPaymentStatus: (state, action: PayloadAction<{ 
      bookingId: string; 
      paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
    }>) => {
      const { bookingId, paymentStatus } = action.payload;
      
      // Update in all bookings
      const bookingIndex = state.bookings.findIndex(b => b._id === bookingId);
      if (bookingIndex !== -1) {
        state.bookings[bookingIndex].paymentStatus = paymentStatus;
      }
      
      // Update in user bookings
      const userBookingIndex = state.userBookings.findIndex(b => b._id === bookingId);
      if (userBookingIndex !== -1) {
        state.userBookings[userBookingIndex].paymentStatus = paymentStatus;
      }
      
      // Update current booking with null check
      if (state.currentBooking && state.currentBooking._id === bookingId) {
        state.currentBooking.paymentStatus = paymentStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.submitLoading = false;
        state.userBookings.unshift(action.payload.data);
        state.currentBooking = action.payload.data;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload as string;
      })
      
      // Fetch User Bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload.data;
        state.error = null;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch All Bookings (Admin)
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.data;
        
        // Calculate stats
        const bookingsData = action.payload.data || [];
        const stats = {
          total: bookingsData.length,
          confirmed: bookingsData.filter((b: Booking) => b.status === 'confirmed').length,
          pending: bookingsData.filter((b: Booking) => b.status === 'pending').length,
          cancelled: bookingsData.filter((b: Booking) => b.status === 'cancelled').length,
        };
        state.bookingStats = stats;
        state.error = null;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Booking by ID
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.data;
        state.error = null;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Booking
      .addCase(updateBooking.fulfilled, (state, action) => {
        const updatedBooking = action.payload.data;
        
        // Update in all bookings
        const index = state.bookings.findIndex(b => b._id === updatedBooking._id);
        if (index !== -1) {
          state.bookings[index] = updatedBooking;
        }
        
        // Update in user bookings
        const userIndex = state.userBookings.findIndex(b => b._id === updatedBooking._id);
        if (userIndex !== -1) {
          state.userBookings[userIndex] = updatedBooking;
        }
        
        // Update current booking with null check
        if (state.currentBooking && state.currentBooking._id === updatedBooking._id) {
          state.currentBooking = updatedBooking;
        }
      })
      
      // Cancel Booking
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const cancelledBooking = action.payload.data;
        
        // Update status to cancelled in all arrays
        const updateToCancelled = (bookingId: string) => {
          // Update in bookings
          const bookingIndex = state.bookings.findIndex(b => b._id === bookingId);
          if (bookingIndex !== -1) {
            state.bookings[bookingIndex].status = 'cancelled';
          }
          
          // Update in userBookings
          const userBookingIndex = state.userBookings.findIndex(b => b._id === bookingId);
          if (userBookingIndex !== -1) {
            state.userBookings[userBookingIndex].status = 'cancelled';
          }
          
          // Update currentBooking with null check
          if (state.currentBooking && state.currentBooking._id === bookingId) {
            state.currentBooking.status = 'cancelled';
          }
        };
        
        updateToCancelled(cancelledBooking._id);
      });
  },
});

export const {
  clearCurrentBooking,
  clearError,
  updateBookingStatus,
  updateBookingPaymentStatus,
} = bookingSlice.actions;

// Selectors
export const selectBookings = (state: { bookings: BookingState }) => state.bookings;
export const selectAllBookings = (state: { bookings: BookingState }) => state.bookings.bookings;
export const selectUserBookings = (state: { bookings: BookingState }) => state.bookings.userBookings;
export const selectCurrentBooking = (state: { bookings: BookingState }) => state.bookings.currentBooking;
export const selectBookingStats = (state: { bookings: BookingState }) => state.bookings.bookingStats;
export const selectBookingLoading = (state: { bookings: BookingState }) => state.bookings.loading;
export const selectBookingSubmitLoading = (state: { bookings: BookingState }) => state.bookings.submitLoading;
export const selectBookingError = (state: { bookings: BookingState }) => state.bookings.error;

export default bookingSlice.reducer;
