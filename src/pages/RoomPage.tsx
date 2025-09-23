import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Rating,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Search,
  LocationOn,
  People,
  Wifi,
  Pool,
  Restaurant,
  Spa,
  LocalParking,
  RoomService,
  AcUnit,
  Tv,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Static rooms data
const sampleRooms = [
  {
    id: '507f1f77bcf86cd799439011',
    title: 'Luxury Suite at Grand Hotel Mumbai',
    description: 'Experience ultimate luxury in our premium suite with stunning city views, king-size bed, and world-class amenities.',
    roomType: 'Suite',
    price: 8500,
    originalPrice: 10000,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop',
    ],
    amenities: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Mini Bar', 'City View', 'King Bed', 'Jacuzzi', 'Balcony'],
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
    featured: true,
    available: true,
  },
  
  {
    id: '507f1f77bcf86cd799439012',
    title: 'Deluxe Room at Hotel Sunshine Delhi',
    description: 'Comfortable and well-appointed deluxe room perfect for business travelers and tourists alike.',
    roomType: 'Deluxe',
    price: 3500,
    originalPrice: 4000,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop',
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
    featured: false,
    available: true,
  },

  {
    id: '507f1f77bcf86cd799439013',
    title: 'Beach Resort Villa - Goa Paradise',
    description: 'Wake up to ocean views in this beautiful beach resort villa with private beach access.',
    roomType: 'Premium',
    price: 12000,
    originalPrice: 15000,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&h=400&fit=crop',
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
    featured: true,
    available: true,
  },

  {
    id: '4',
    title: 'Budget Single Room - Backpackers Den',
    description: 'Clean and comfortable single room perfect for solo travelers on a budget.',
    roomType: 'Single',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=400&fit=crop',
    ],
    amenities: ['Free WiFi', 'Fan', 'Shared Bathroom', 'Common Area', 'Luggage Storage'],
    maxGuests: 1,
    bedType: 'Single',
    roomSize: 120,
    hotelName: 'Backpackers Den',
    address: {
      street: 'Paharganj Main Road',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110055',
    },
    rating: 3.8,
    totalReviews: 67,
    contact: {
      phone: '+91 11 9876 5432',
      email: 'stay@backpackersden.com',
    },
    featured: false,
    available: true,
  },

  {
    id: '5',
    title: 'Heritage Palace Suite - Jaipur Royal',
    description: 'Experience royal treatment in this heritage palace suite with traditional Rajasthani decor.',
    roomType: 'Suite',
    price: 6500,
    images: [
      'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1596596477851-5e2c7bb15319?w=800&h=400&fit=crop',
    ],
    amenities: ['Heritage Architecture', 'Royal Decor', 'Free WiFi', 'Cultural Shows', 'Traditional Food', 'Courtyard View'],
    maxGuests: 3,
    bedType: 'King Size',
    roomSize: 400,
    hotelName: 'Jaipur Royal Palace Hotel',
    address: {
      street: 'Pink City Heritage Area',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
    },
    rating: 4.7,
    totalReviews: 178,
    contact: {
      phone: '+91 141 234 5678',
      email: 'royal@jaipurpalace.com',
    },
    featured: true,
    available: true,
  },

  {
    id: '6',
    title: 'Modern Business Hotel - Bangalore Tech',
    description: 'Perfect for business travelers with high-speed internet, meeting rooms, and modern amenities.',
    roomType: 'Deluxe',
    price: 4500,
    originalPrice: 5200,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=400&fit=crop',
    ],
    amenities: ['High Speed WiFi', 'Air Conditioning', 'Work Desk', 'Meeting Rooms', 'Gym', 'Coffee Shop'],
    maxGuests: 2,
    bedType: 'Queen Size',
    roomSize: 320,
    hotelName: 'Bangalore Tech Hotel',
    address: {
      street: 'Electronic City Phase 1',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560100',
    },
    rating: 4.4,
    totalReviews: 203,
    contact: {
      phone: '+91 80 4567 8901',
      email: 'business@bangaloretech.com',
    },
    featured: false,
    available: true,
  },
];

const RoomsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(sampleRooms);
  const [showToast, setShowToast] = useState(false);

  // Search functionality
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredRooms(sampleRooms);
    } else {
      const filtered = sampleRooms.filter(room =>
        room.title.toLowerCase().includes(term.toLowerCase()) ||
        room.hotelName.toLowerCase().includes(term.toLowerCase()) ||
        room.address.city.toLowerCase().includes(term.toLowerCase()) ||
        room.roomType.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
  };

  // Check authentication and handle booking
  const handleBookNow = (roomId: string) => {
    // Check if user is authenticated (token exists in localStorage)
    const token = localStorage.getItem('token') || '';
    
    if (!token) {
      // Show toast message if not logged in
      setShowToast(true);
      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      // User is authenticated, proceed to booking
      navigate(`/rooms/${roomId}`);
    }
  };

  // Close toast message
  const handleCloseToast = () => {
    setShowToast(false);
  };

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <Wifi fontSize="small" />;
    if (amenityLower.includes('pool')) return <Pool fontSize="small" />;
    if (amenityLower.includes('restaurant')) return <Restaurant fontSize="small" />;
    if (amenityLower.includes('spa')) return <Spa fontSize="small" />;
    if (amenityLower.includes('parking')) return <LocalParking fontSize="small" />;
    if (amenityLower.includes('service')) return <RoomService fontSize="small" />;
    if (amenityLower.includes('air') || amenityLower.includes('ac')) return <AcUnit fontSize="small" />;
    if (amenityLower.includes('tv')) return <Tv fontSize="small" />;
    return null;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Find Your Perfect Stay
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Discover amazing hotels and rooms across India
        </Typography>

        {/* Search Bar */}
        <Paper elevation={2} sx={{ maxWidth: 600, mx: 'auto', p: 1 }}>
          <TextField
            fullWidth
            placeholder="Search by city, hotel name, or room type..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                border: 'none',
                '& fieldset': { border: 'none' },
              },
            }}
          />
        </Paper>
      </Box>

      {/* Results Count */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="text.secondary">
          {filteredRooms.length} rooms found
        </Typography>
      </Box>

      {/* Rooms Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: 3
        }}
      >
        {filteredRooms.map((room) => (
          <Card
            key={room.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
           
          >
            <CardMedia
              component="img"
              height="200"
              image={room.images[0]}
              alt={room.title}
              sx={{ objectFit: 'cover' }}
            />
            
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Hotel & Room Info */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h3" fontWeight="bold" sx={{ flex: 1, pr: 1 }}>
                    {room.title}
                  </Typography>
                  <Chip
                    label={room.roomType}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {room.hotelName}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {room.address.city}, {room.address.state}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <People sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Up to {room.maxGuests} guests • {room.bedType} • {room.roomSize} sq ft
                  </Typography>
                </Box>
              </Box>

              {/* Description */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {room.description.substring(0, 100)}...
              </Typography>

              {/* Amenities */}
              <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                {room.amenities.slice(0, 4).map((amenity, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {getAmenityIcon(amenity)}
                    <Chip 
                      label={amenity} 
                      size="small" 
                      variant="outlined"
                      sx={{ height: 24, fontSize: '0.7rem' }}
                    />
                  </Box>
                ))}
                {room.amenities.length > 4 && (
                  <Chip 
                    label={`+${room.amenities.length - 4} more`} 
                    size="small"
                    color="primary"
                    sx={{ height: 24, fontSize: '0.7rem' }}
                  />
                )}
              </Box>

              {/* Rating & Reviews */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={room.rating} readOnly size="small" precision={0.1} />
                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                  {room.rating} ({room.totalReviews} reviews)
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Price & Booking */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      ₹{room.price.toLocaleString()}
                    </Typography>
                    {room.originalPrice && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ₹{room.originalPrice.toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    per night
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookNow(room.id);
                  }}
                  sx={{ minWidth: 100 }}
                >
                  Book Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* No Results */}
      {filteredRooms.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            No rooms found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search criteria
          </Typography>
          <Button variant="outlined" onClick={() => handleSearch('')}>
            Show All Rooms
          </Button>
        </Paper>
      )}

      {/* Toast Message for Authentication */}
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity="warning" 
          sx={{ width: '100%' }}
        >
          Please login first to book a room. Redirecting to login page...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RoomsPage;