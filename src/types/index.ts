export interface User {
  _id: string;      // MongoDB ObjectId
  name: string;     // Required
  email: string;    // Required
  phone: string;    // Required
  role: 'user' | 'admin';
  avatar?: string;  // Optional
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: any // username or user identifier
  stats: ProfileStats | null;
  activity: any | null; // Placeholder for user activity data, e.g., recent logins, actions, etc.

}

export interface Room {
  _id: string;
  title: string;
  description: string;
  price: number;
  maxGuests: number;
  roomType: 'single' | 'double' | 'suite' | 'deluxe';
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  user: User;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: 'user' | 'admin';
}

export interface ProfileStats {
  totalBookings: number;
  totalSpent: number;
  bookingsByStatus: any[];
  memberSince: string;
  profileCompleteness: number;
}
