import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import {
  Phone,
  Email,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { selectUser } from '../store/slices/authSlice';
import {
  fetchUserBookings,
  cancelBooking,
  selectUserBookings,
  selectBookingLoading,
  selectBookingError,
  clearError
} from '../store/slices/bookingSlice';
import Loader from '../components/common/Loader';

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux selectors with safe fallbacks
  const user = useAppSelector(selectUser);
  const rawBookings = useAppSelector(selectUserBookings);
  const bookings = Array.isArray(rawBookings) ? rawBookings : [];
  const loading = useAppSelector(selectBookingLoading);
  const error = useAppSelector(selectBookingError);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Clear any previous errors
    dispatch(clearError());
    
    // Fetch bookings from Redux store
    dispatch(fetchUserBookings());
  }, [user, navigate, dispatch]);

  // Debug logging
  useEffect(() => {
    console.log('Bookings from Redux:', bookings);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [bookings, loading, error]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      // No need to manually refresh - Redux store will update automatically
    } catch (error: any) {
      console.error('Cancel booking error:', error);
      // Toast notification is already handled in the thunk
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  if (loading) {
    return <Loader variant="fullscreen" message="Loading your bookings..." />;
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          py: 4
        }}
      >
        <Container>
          <Alert 
            severity="error" 
            sx={{ mt: 4 }}
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={() => dispatch(fetchUserBookings())}
              >
                RETRY
              </Button>
            }
          >
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          My Bookings
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your hotel reservations and view booking details
        </Typography>

        {bookings.length === 0 ? (
          <Paper sx={{ 
            p: 6, 
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography variant="h6" gutterBottom>
              No bookings found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You haven't made any bookings yet. Start exploring amazing hotels!
            </Typography>
            <Button variant="contained" onClick={() => navigate('/rooms')}>
              Browse Rooms
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {bookings.map((booking: any) => (
              <Card 
                key={booking._id} 
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {booking.room?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {booking.room?.hotelName}
                        </Typography>
                      </Box>
                      <Chip 
                        label={booking.status.toUpperCase()}
                        color={getStatusColor(booking.status) as any}
                        variant="outlined"
                        sx={{
                          fontWeight: 'bold',
                          borderWidth: 2
                        }}
                      />
                    </Box>

                    {/* Booking Details */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, mb: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold">
                          Booking ID
                        </Typography>
                        <Typography variant="body2">
                          {booking.bookingId}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold">
                          Total Amount
                        </Typography>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          ₹{booking.totalAmount?.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Check-in/out & Guests */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold">
                          Check-in
                        </Typography>
                        <Typography variant="body2">
                          {format(new Date(booking.checkIn), 'PPP')}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold">
                          Check-out
                        </Typography>
                        <Typography variant="body2">
                          {format(new Date(booking.checkOut), 'PPP')}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold">
                          Guests
                        </Typography>
                        <Typography variant="body2">
                          {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Hotel Contact */}
                    {booking.room?.contact && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                          Hotel Contact
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Phone sx={{ fontSize: 16, color: 'primary.main' }} />
                            <Typography variant="body2">{booking.room.contact.phone}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Email sx={{ fontSize: 16, color: 'primary.main' }} />
                            <Typography variant="body2">{booking.room.contact.email}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="primary" fontWeight="bold">
                          Special Requests
                        </Typography>
                        <Typography variant="body2">
                          {booking.specialRequests}
                        </Typography>
                      </Box>
                    )}

                    <Divider sx={{ my: 2, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/rooms/${booking.roomId}`)}
                        sx={{
                          borderWidth: 2,
                          '&:hover': {
                            borderWidth: 2
                          }
                        }}
                      >
                        View Room
                      </Button>
                      
                      {booking.status === 'pending' || booking.status === 'confirmed' ? (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleCancelBooking(booking._id)}
                          sx={{
                            borderWidth: 2,
                            '&:hover': {
                              borderWidth: 2
                            }
                          }}
                        >
                          Cancel Booking
                        </Button>
                      ) : null}
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BookingsPage;
