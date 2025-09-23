import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import roomSlice from './slices/roomSlice';
import bookingSlice from './slices/bookingSlice';
import uiSlice from './slices/uiSlices';

const rootReducer = combineReducers({
  auth: authSlice,
  rooms: roomSlice,
  bookings: bookingSlice,
  ui: uiSlice,
});

export default rootReducer;
