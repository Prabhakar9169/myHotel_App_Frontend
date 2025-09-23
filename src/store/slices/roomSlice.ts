import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../types';
import toast from 'react-hot-toast';
import api from '../../service/api';

interface RoomState {
  rooms: Room[];
  currentRoom: Room | null;
  searchResults: Room[];
  filters: {
    minPrice: number;
    maxPrice: number;
    roomType: string;
    maxGuests: number;
    city: string;
    checkIn: string;
    checkOut: string;
    amenities: string[];
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  loading: boolean;
  searchLoading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  currentRoom: null,
  searchResults: [],
  filters: {
    minPrice: 0,
    maxPrice: 50000,
    roomType: '',
    maxGuests: 1,
    city: '',
    checkIn: '',
    checkOut: '',
    amenities: [],
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  },
  loading: false,
  searchLoading: false,
  error: null,
};

// Async thunks
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (params: {
    page?: number;
    limit?: number;
    roomType?: string;
    minPrice?: number;
    maxPrice?: number;
    maxGuests?: number;
    city?: string;
  } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== 0) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await api.get(`/rooms?${queryParams.toString()}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch rooms';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchRoomById = createAsyncThunk(
  'rooms/fetchRoomById',
  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/rooms/${roomId}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch room details';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const searchRooms = createAsyncThunk(
  'rooms/searchRooms',
  async (searchParams: {
    q?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    page?: number;
    limit?: number;
  }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== 0) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await api.get(`/rooms/search?${queryParams.toString()}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Search failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (roomData: Partial<Room>, { rejectWithValue }) => {
    try {
      const response = await api.post('/rooms', roomData);
      toast.success('Room created successfully');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create room';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateRoom = createAsyncThunk(
  'rooms/updateRoom',
  async ({ roomId, roomData }: { roomId: string; roomData: Partial<Room> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/rooms/${roomId}`, roomData);
      toast.success('Room updated successfully');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update room';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  'rooms/deleteRoom',
  async (roomId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/rooms/${roomId}`);
      toast.success('Room deleted successfully');
      return roomId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete room';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Room slice
const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    clearCurrentRoom: (state) => {
      state.currentRoom = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPagination: (state, action: PayloadAction<{ page: number; limit?: number }>) => {
      state.pagination.page = action.payload.page;
      if (action.payload.limit) {
        state.pagination.limit = action.payload.limit;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Room by ID
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRoom = action.payload.data;
        state.error = null;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Search Rooms
      .addCase(searchRooms.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchRooms.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(searchRooms.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload as string;
      })
      
      // Create Room
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.unshift(action.payload.data);
      })
      
      // Update Room
      .addCase(updateRoom.fulfilled, (state, action) => {
        const index = state.rooms.findIndex(room => room._id === action.payload.data._id);
        if (index !== -1) {
          state.rooms[index] = action.payload.data;
        }
        if (state.currentRoom?._id === action.payload.data._id) {
          state.currentRoom = action.payload.data;
        }
      })
      
      // Delete Room
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter(room => room._id !== action.payload);
        if (state.currentRoom?._id === action.payload) {
          state.currentRoom = null;
        }
      });
  },
});

export const {
  clearCurrentRoom,
  clearSearchResults,
  setFilters,
  clearFilters,
  setPagination,
  clearError,
} = roomSlice.actions;

// Selectors
export const selectRooms = (state: { rooms: RoomState }) => state.rooms;
export const selectAllRooms = (state: { rooms: RoomState }) => state.rooms.rooms;
export const selectCurrentRoom = (state: { rooms: RoomState }) => state.rooms.currentRoom;
export const selectSearchResults = (state: { rooms: RoomState }) => state.rooms.searchResults;
export const selectRoomFilters = (state: { rooms: RoomState }) => state.rooms.filters;
export const selectRoomPagination = (state: { rooms: RoomState }) => state.rooms.pagination;
export const selectRoomLoading = (state: { rooms: RoomState }) => state.rooms.loading;
export const selectSearchLoading = (state: { rooms: RoomState }) => state.rooms.searchLoading;
export const selectRoomError = (state: { rooms: RoomState }) => state.rooms.error;

export default roomSlice.reducer;
