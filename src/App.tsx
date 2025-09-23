import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

import { store, persistor } from "./store";
import Header from "./components/common/Header";
import Loader from "./components/common/Loader";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/Profile/Profile";
import NotFound from "./pages/NotFound";
import RoomsPage from "./pages/RoomPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import BookingPage from "./pages/BookingPage";
import ForgetPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword"; 

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div className="App">
              <Header />
              <main style={{ minHeight: "calc(100vh - 128px)" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/rooms" element={<RoomsPage />} />
                  <Route path="/rooms/:id" element={<RoomDetailPage />} />
                  <Route path="/bookings" element={<BookingPage />} />
                  <Route path="/forgot-password" element={<ForgetPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Add this route */}

                  {/* Protected Routes */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute adminOnly>
                        <div>Admin Dashboard</div>
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "#333",
                    color: "#fff",
                  },
                }}
              />
            </div>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;