import api from './api';
import { AuthResponse, LoginData, RegisterData, User } from '../types';

class AuthService {
  // Register user
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      this.setAuthData(response.data.token, response.data.user);
    }
    return response.data;
  }

  // Login user
  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', loginData);
    if (response.data.success) {
      this.setAuthData(response.data.token, response.data.user);
    }
    return response.data;
  }

  // Get user profile
  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data;
  }

  // Update profile
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put('/auth/profile', userData);
    if (response.data.success) {
      const updatedUser = response.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    return response.data;
  }

  // Change password
  async changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> {
    const response = await api.patch('/auth/change-password', passwordData);
    return response.data;
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }

  // Reset password
  async resetPassword(token: string, passwordData: {
    password: string;
    confirmPassword: string;
  }): Promise<AuthResponse> {
    const response = await api.patch(`/auth/reset-password/${token}`, passwordData);
    if (response.data.success) {
      this.setAuthData(response.data.token, response.data.user);
    }
    return response.data;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Check if user is admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  // Set auth data in localStorage
  private setAuthData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default new AuthService();
