import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  modals: {
    [key: string]: boolean;
  };
  globalLoading: boolean;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
  read: boolean;
}

const initialState: UiState = {
  sidebarOpen: false,
  theme: 'light',
  notifications: [],
  modals: {},
  globalLoading: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    
    // Theme
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    
    // Notifications
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false,
      };
      state.notifications.unshift(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    
    // Modals
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false;
      });
    },
    
    // Global Loading
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    
    // Snackbar
    showSnackbar: (state, action: PayloadAction<{
      message: string;
      severity?: 'success' | 'error' | 'warning' | 'info';
    }>) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  toggleTheme,
  addNotification,
  removeNotification,
  markNotificationRead,
  markAllNotificationsRead,
  clearAllNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setGlobalLoading,
  showSnackbar,
  hideSnackbar,
} = uiSlice.actions;

// Selectors
export const selectUi = (state: { ui: UiState }) => state.ui;
export const selectSidebarOpen = (state: { ui: UiState }) => state.ui.sidebarOpen;
export const selectTheme = (state: { ui: UiState }) => state.ui.theme;
export const selectNotifications = (state: { ui: UiState }) => state.ui.notifications;
export const selectUnreadNotifications = (state: { ui: UiState }) => 
  state.ui.notifications.filter(n => !n.read);
export const selectModal = (modalName: string) => (state: { ui: UiState }) => 
  state.ui.modals[modalName] || false;
export const selectGlobalLoading = (state: { ui: UiState }) => state.ui.globalLoading;
export const selectSnackbar = (state: { ui: UiState }) => state.ui.snackbar;

export default uiSlice.reducer;
