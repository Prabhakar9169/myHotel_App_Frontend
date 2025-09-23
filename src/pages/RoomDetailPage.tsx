import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Rating,
  Divider,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  LocationOn,
  People,
  ArrowBack,
  Wifi,
  Pool,
  Restaurant,
  Spa,
  LocalParking,
  RoomService,
  AcUnit,
  Tv,
  Phone,
  Email,
  ChevronLeft,
  ChevronRight,
  Close,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectUser } from '../store/slices/authSlice';

import toast from 'react-hot-toast';
import { createBooking } from '../store/slices/bookingSlice';

// Static rooms data
const sampleRooms = [
  {
    id: '507f1f77bcf86cd799439011',
    title: 'Luxury Suite at Grand Hotel Mumbai',
    description: 'Experience ultimate luxury in our premium suite with stunning city views, king-size bed, and world-class amenities. This spacious suite features a separate living area, marble bathroom with jacuzzi, and a private balcony overlooking the Arabian Sea.',
    fullDescription: 'Our Luxury Suite offers the perfect blend of comfort and elegance. The suite features a king-size bed with premium linens, a spacious living area with modern furnishings, and floor-to-ceiling windows that provide breathtaking views of Mumbai\'s skyline. The marble-appointed bathroom includes a deep soaking tub, separate glass-enclosed shower, and luxury amenities. Guests can enjoy 24-hour room service, complimentary high-speed internet, and access to our exclusive concierge services.',
    roomType: 'Suite',
    price: 8500,
    originalPrice: 10000,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    ],
    amenities: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Mini Bar', 'City View', 'King Bed', 'Jacuzzi', 'Balcony', 'Concierge', 'Parking'],
    maxGuests: 2,
    bedType: 'King Size',
    roomSize: 450,
    hotelName: 'Grand Hotel Mumbai',
    address: {
      street: '123 Marine Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    rating: 4.8,
    totalReviews: 234,
    contact: {
      phone: '+91 22 1234 5678',
      email: 'reservations@grandmumbai.com',
    },
    checkIn: '14:00',
    checkOut: '11:00',
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    featured: true,
    available: true,
  },
  
  {
    id: '507f1f77bcf86cd799439012',
    title: 'Deluxe Room at Hotel Sunshine Delhi',
    description: 'Comfortable and well-appointed deluxe room perfect for business travelers and tourists alike.',
    fullDescription: 'Our Deluxe Room provides all the essentials for a comfortable stay in the heart of Delhi. The room features a queen-size bed, work desk, and modern amenities. Perfect for both business and leisure travelers, the room offers easy access to Delhi\'s major attractions and business districts.',
    roomType: 'Deluxe',
    price: 3500,
    originalPrice: 4000,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop',
    ],
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Tea/Coffee', 'Attached Bathroom', 'Queen Bed'],
    maxGuests: 2,
    bedType: 'Queen Size',
    roomSize: 280,
    hotelName: 'Hotel Sunshine Delhi',
    address: {
      street: '45 Connaught Place',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    },
    rating: 4.2,
    totalReviews: 156,
    contact: {
      phone: '+91 11 2345 6789',
      email: 'booking@sunshindelhi.com',
    },
    checkIn: '14:00',
    checkOut: '12:00',
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
    featured: false,
    available: true,
  },

  {
    id: '507f1f77bcf86cd799439013',
    title: 'Beach Resort Villa - Goa Paradise',
    description: 'Wake up to ocean views in this beautiful beach resort villa with private beach access.',
    fullDescription: 'Experience the ultimate beachfront luxury at our Beach Resort Villa. This spacious villa offers direct beach access, panoramic ocean views, and world-class amenities. Perfect for families or couples seeking a romantic getaway, the villa features a private terrace, outdoor dining area, and exclusive access to resort facilities.',
    roomType: 'Premium',
    price: 12000,
    originalPrice: 15000,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574690129004-bc2b8fc7b92e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
    ],
    amenities: ['Beach Access', 'Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Parking', 'Room Service'],
    maxGuests: 4,
    bedType: 'King + Sofa Bed',
    roomSize: 600,
    hotelName: 'Goa Paradise Resort',
    address: {
      street: 'Beach Road, Baga',
      city: 'Goa',
      state: 'Goa',
      pincode: '403516',
    },
    rating: 4.6,
    totalReviews: 89,
    contact: {
      phone: '+91 832 123 4567',
      email: 'resort@goaparadise.com',
    },
    checkIn: '15:00',
    checkOut: '11:00',
    cancellationPolicy: 'Free cancellation up to 7 days before check-in',
    featured: true,
    available: true,
  },
];

const RoomDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Booking form state
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
  });

  // Error state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const room = sampleRooms.find(r => r.id === id);

  if (!room) {
    return (
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Room not found
          </Typography>
          <Button variant="contained" onClick={() => navigate('/rooms')}>
            Back to Rooms
          </Button>
        </Paper>
      </Container>
    );
  }

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <Wifi />;
    if (amenityLower.includes('pool')) return <Pool />;
    if (amenityLower.includes('restaurant')) return <Restaurant />;
    if (amenityLower.includes('spa')) return <Spa />;
    if (amenityLower.includes('parking')) return <LocalParking />;
    if (amenityLower.includes('service')) return <RoomService />;
    if (amenityLower.includes('air') || amenityLower.includes('ac')) return <AcUnit />;
    if (amenityLower.includes('tv')) return <Tv />;
    return null;
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  // Validation function
  const validateBookingData = () => {
    const newErrors: Record<string, string> = {};

    if (!bookingData.checkIn) {
      newErrors.checkIn = 'Check-in date is required';
    }

    if (!bookingData.checkOut) {
      newErrors.checkOut = 'Check-out date is required';
    }

    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      
      if (checkIn >= checkOut) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }

      if (checkIn < new Date()) {
        newErrors.checkIn = 'Check-in date cannot be in the past';
      }
    }

    if (bookingData.guests < 1 || bookingData.guests > room.maxGuests) {
      newErrors.guests = `Guests must be between 1 and ${room.maxGuests}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Updated handleBooking function with API integration
const handleBooking = async () => {
  // Check if user is logged in
  if (!user) {
    toast.error('Please login to make a booking');
    navigate('/login');
    return;
  }

  // Validate form data
  if (!validateBookingData()) {
    toast.error('Please fix the errors before submitting');
    return;
  }

  setBookingLoading(true);

  // Prepare booking payload
  const bookingPayload = {
    roomId: room.id,
    checkIn: bookingData.checkIn,
    checkOut: bookingData.checkOut,
    guests: bookingData.guests,
    roomPrice: room.price,
    specialRequests: bookingData.specialRequests.trim() || 'No special requests',   
  };

  // Make API call
   dispatch(createBooking({ 
    bookingData: bookingPayload, 
    navigate 
  }));
  
  setBookingLoading(false);
  resetBookingForm();
};

// Separate function to reset form
const resetBookingForm = () => {
  setBookingData({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
  });
  setBookingModalOpen(false);
};

  // Handle input changes
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSelectChange = (field: string) => (e: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user changes value
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      {/* Back Button */}
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/rooms')} 
        sx={{ mb: 3 }}
      >
        Back to Rooms
      </Button>

      {/* Main Content */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 4
        }}
      >
        {/* Left Column - Images & Details */}
        <Box>
          {/* Image Gallery */}
          <Card sx={{ mb: 4 }}>
            <Box sx={{ position: 'relative', height: 400 }}>
              <img 
                src={room.images[currentImageIndex]} 
                alt={`${room.title} -${currentImageIndex + 1}`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                onClick={() => setImageModalOpen(true)}
              />
              
              {/* Image Navigation */}
              {room.images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </>
              )}

              {/* Image Counter */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                }}
              >
                {currentImageIndex + 1} / {room.images.length}
              </Box>
            </Box>

            {/* Image Thumbnails */}
            <Box sx={{ display: 'flex', gap: 1, p: 2, overflowX: 'auto' }}>
              {room.images.map((image, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  sx={{
                    width: 80,
                    height: 60,
                    flexShrink: 0,
                    cursor: 'pointer',
                    border: currentImageIndex === index ? 2 : 1,
                    borderColor: currentImageIndex === index ? 'primary.main' : 'grey.300',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          </Card>

          {/* Room Details */}
          <Card>
            <CardContent sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    {room.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {room.hotelName}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={room.rating} readOnly precision={0.1} />
                    <Typography sx={{ ml: 1 }}>
                      {room.rating} ({room.totalReviews} reviews)
                    </Typography>
                  </Box>
                </Box>
                <Chip label={room.roomType} color="primary" size="medium" />
              </Box>

              {/* Location & Basic Info */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>
                    {room.address.street}, {room.address.city}, {room.address.state} - {room.address.pincode}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <People sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>
                    Up to {room.maxGuests} guests • {room.bedType} • {room.roomSize} sq ft
                  </Typography>
                </Box>
              </Box>

              {/* Description */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  About this room
                </Typography>
                <Typography variant="body1" paragraph>
                  {room.fullDescription || room.description}
                </Typography>
              </Box>

              {/* Amenities */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Amenities
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 2
                  }}
                >
                  {room.amenities.map((amenity, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getAmenityIcon(amenity)}
                      <Typography>{amenity}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Check-in/out & Policies */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Policies
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">Check-in</Typography>
                    <Typography>{room.checkIn}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">Check-out</Typography>
                    <Typography>{room.checkOut}</Typography>
                  </Box>
                  <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                    <Typography variant="subtitle2" color="primary">Cancellation Policy</Typography>
                    <Typography>{room.cancellationPolicy}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Contact Info */}
              <Divider sx={{ my: 3 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Contact Hotel
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone color="primary" />
                    <Typography>{room.contact.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email color="primary" />
                    <Typography>{room.contact.email}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Column - Booking Card */}
        <Box>
          <Card sx={{ position: 'sticky', top: 100 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Book this room
              </Typography>
              
              {/* Price Display */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    ₹{room.price.toLocaleString()}
                  </Typography>
                  {room.originalPrice && (
                    <Typography 
                      variant="h6" 
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ₹{room.originalPrice.toLocaleString()}
                    </Typography>
                  )}
                </Box>
                <Typography color="text.secondary">per night</Typography>
                {room.originalPrice && (
                  <Chip 
                    label={`Save ₹${(room.originalPrice - room.price).toLocaleString()}`} 
                    color="success" 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>

              {/* Quick Booking Form */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <TextField
                  label="Check-in Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={bookingData.checkIn}
                  onChange={handleInputChange('checkIn')}
                  error={!!errors.checkIn}
                  helperText={errors.checkIn}
                />
                <TextField
                  label="Check-out Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={bookingData.checkOut}
                  onChange={handleInputChange('checkOut')}
                  error={!!errors.checkOut}
                  helperText={errors.checkOut}
                />
                <FormControl fullWidth error={!!errors.guests}>
                  <InputLabel>Guests</InputLabel>
                  <Select 
                    value={bookingData.guests} 
                    label="Guests"
                    onChange={handleSelectChange('guests')}
                  >
                    {Array.from({ length: room.maxGuests }, (_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1} Guest{i > 0 ? 's' : ''}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.guests && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                      {errors.guests}
                    </Typography>
                  )}
                </FormControl>
              </Box>

              {/* Booking Buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => setBookingModalOpen(true)}
                  disabled={bookingLoading}
                >
                  Book Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  startIcon={<Phone />}
                  href={`tel:${room.contact.phone}`}
                >
                  Call Hotel
                </Button>
              </Box>

              {/* Additional Info */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  • Free cancellation available<br/>
                  • No prepayment needed<br/>
                  • Confirmation is immediate
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Image Modal */}
      <Dialog
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ position: 'relative' }}>
            <img
              src={room.images[currentImageIndex]}
              alt={room.title}
              style={{ width: '100%', height: 'auto' }}
            />
            <IconButton
              onClick={() => setImageModalOpen(false)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white'
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Complete Your Booking
          </Typography>
          
          {/* Show user info if logged in */}
          {user && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Booking for: <strong>{user.name}</strong> ({user.email})
            </Alert>
          )}
          
          {/* Show total calculation */}
          {bookingData.checkIn && bookingData.checkOut && (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Booking Summary
              </Typography>
              {(() => {
                const checkIn = new Date(bookingData.checkIn);
                const checkOut = new Date(bookingData.checkOut);
                const totalNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
                const subtotal = room.price * totalNights;
                const taxes = subtotal * 0.18;
                const total = subtotal + taxes;
                
                return (
                  <>
                    <Typography variant="body2">
                      {totalNights} night{totalNights > 1 ? 's' : ''} × ₹{room.price.toLocaleString()} = ₹{subtotal.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Taxes (18% GST) = ₹{taxes.toLocaleString()}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" fontWeight="bold">
                      Total Amount = ₹{total.toLocaleString()}
                    </Typography>
                  </>
                );
              })()}
            </Box>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Check-in Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={bookingData.checkIn}
              onChange={handleInputChange('checkIn')}
              error={!!errors.checkIn}
              helperText={errors.checkIn}
            />
            <TextField
              label="Check-out Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={bookingData.checkOut}
              onChange={handleInputChange('checkOut')}
              error={!!errors.checkOut}
              helperText={errors.checkOut}
            />
            <FormControl fullWidth error={!!errors.guests}>
              <InputLabel>Number of Guests</InputLabel>
              <Select 
                value={bookingData.guests} 
                label="Number of Guests"
                onChange={handleSelectChange('guests')}
              >
                {Array.from({ length: room.maxGuests }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1} Guest{i > 0 ? 's' : ''}
                  </MenuItem>
                ))}
              </Select>
              {errors.guests && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.guests}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="Special Requests (Optional)"
              multiline
              rows={3}
              fullWidth
              value={bookingData.specialRequests}
              onChange={handleInputChange('specialRequests')}
              placeholder="Any special requirements or requests..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingModalOpen(false)} disabled={bookingLoading}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleBooking}
            disabled={bookingLoading}
            startIcon={bookingLoading ? <CircularProgress size={16} /> : null}
          >
            {bookingLoading ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoomDetailPage;
