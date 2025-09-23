import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import {
  Search,
  Star,
  LocationOn,
  Wifi,
  Pool,
  Restaurant,
  Spa,
  ArrowForward,
  ArrowBack,
  ArrowForwardIos,
  FitnessCenter,
  LocalParking,
  RoomService,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchRooms, selectAllRooms, selectRoomLoading } from '../store/slices/roomSlice';
import SkeletonLoader from '../components/common/SkeletonLoader';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(selectAllRooms);
  const loading = useAppSelector(selectRoomLoading);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero carousel images
  const heroImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ];

  useEffect(() => {
    dispatch(fetchRooms({ limit: 6 }));
  }, [dispatch]);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const features = [
    {
      icon: <Search sx={{ fontSize: 48, color: '#C9A96E' }} />,
      title: 'Easy Search',
      description: 'Find your perfect room with our advanced search filters and instant availability',
    },
    {
      icon: <Star sx={{ fontSize: 48, color: '#C9A96E' }} />,
      title: 'Luxury Experience',
      description: 'Choose from premium hotels with world-class amenities and exceptional service',
    },
    {
      icon: <LocationOn sx={{ fontSize: 48, color: '#C9A96E' }} />,
      title: 'Prime Locations',
      description: 'Stay in the heart of the city with easy access to business districts and attractions',
    },
  ];

  const amenities = [
    { icon: <Wifi />, label: 'High-Speed WiFi', color: '#1976d2' },
    { icon: <Pool />, label: 'Infinity Pool', color: '#0288d1' },
    { icon: <Restaurant />, label: 'Fine Dining', color: '#f57c00' },
    { icon: <Spa />, label: 'Luxury Spa', color: '#7b1fa2' },
    { icon: <FitnessCenter />, label: '24/7 Gym', color: '#388e3c' },
    { icon: <LocalParking />, label: 'Valet Parking', color: '#5d4037' },
    { icon: <RoomService />, label: 'Room Service', color: '#c2185b' },
    { icon: <Star />, label: '5-Star Service', color: '#fbc02d' },
  ];

  return (
    <Box>
      {/* Enhanced Hero Section with Carousel */}
      <Box
        sx={{
          position: 'relative',
          height: '95vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background Images Carousel */}
        {heroImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentImageIndex === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 1,
            }}
          />
        ))}

        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrevImage}
          sx={{
            position: 'absolute',
            left: 20,
            zIndex: 3,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.2)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
            backdrop: 'blur(10px)',
          }}
        >
          <ArrowBack />
        </IconButton>

        <IconButton
          onClick={handleNextImage}
          sx={{
            position: 'absolute',
            right: 20,
            zIndex: 3,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.2)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
          }}
        >
          <ArrowForwardIos />
        </IconButton>

        {/* Carousel Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 3,
          }}
        >
          {heroImages.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: currentImageIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>

        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box textAlign="center" sx={{ color: 'white' }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                letterSpacing: '-0.02em',
                mb: 3,
              }}
            >
              Luxury Redefined
            </Typography>
            <Typography
              variant="h4"
              component="p"
              gutterBottom
              sx={{ 
                mb: 4, 
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.4,
              }}
            >
              Experience unparalleled hospitality in the world's most exclusive destinations
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center" 
              alignItems="center"
              sx={{ mt: 5 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Search />}
                onClick={() => navigate('/rooms')}
                sx={{ 
                  px: 6, 
                  py: 2,
                  fontSize: '1.1rem',
                  bgcolor: '#C9A96E',
                  '&:hover': { bgcolor: '#B8956A' },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Explore Suites
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ 
                  px: 6, 
                  py: 2,
                  fontSize: '1.1rem',
                  color: 'white', 
                  borderColor: 'white',
                  borderWidth: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }
                }}
                onClick={() => navigate('/about')}
              >
                Our Story
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Enhanced Features Section */}
      <Box sx={{ bgcolor: '#F8F9FA', py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' },
                color: '#2C3E50',
                mb: 2,
              }}
            >
              The Pinnacle of Hospitality
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Discover what sets us apart in the world of luxury accommodation
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 4,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid #E0E0E0',
                  borderRadius: 3,
                  '&:hover': {
                    transform: 'translateY(-15px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    borderColor: '#C9A96E',
                  },
                }}
              >
                <Box sx={{ mb: 3 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Enhanced Featured Rooms Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
            <Box>
              <Typography 
                variant="h2" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '3rem' },
                  color: '#2C3E50',
                }}
              >
                Signature Suites
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Handpicked accommodations for the discerning traveler
              </Typography>
            </Box>
            <Button
              variant="outlined"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/rooms')}
              sx={{
                px: 4,
                py: 1.5,
                borderColor: '#C9A96E',
                color: '#C9A96E',
                '&:hover': {
                  bgcolor: '#C9A96E',
                  color: 'white',
                },
              }}
            >
              View Collection
            </Button>
          </Box>

          {loading ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)'
                },
                gap: 4
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonLoader key={index} variant="room" />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)'
                },
                gap: 4
              }}
            >
              {rooms.slice(0, 6).map((room) => (
                <Card
                  key={room._id}
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderRadius: 3,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    },
                  }}
                  onClick={() => navigate(`/rooms/${room._id}`)}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={room.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                    alt={room.title}
                    sx={{ transition: 'transform 0.3s ease' }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                        {room.title}
                      </Typography>
                      <Chip
                        label={room.roomType.toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: '#C9A96E',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {room.description.substring(0, 100)}...
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn sx={{ fontSize: 18, mr: 0.5, color: '#C9A96E' }} />
                      <Typography variant="body2" color="text.secondary">
                        {room.address.city}, {room.address.state}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <Chip key={index} label={amenity} size="small" variant="outlined" />
                      ))}
                      {room.amenities.length > 3 && (
                        <Chip label={`+${room.amenities.length - 3} more`} size="small" />
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h4" sx={{ color: '#C9A96E', fontWeight: 700 }}>
                          ₹{room.price.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          per night
                        </Typography>
                      </Box>
                      <Rating value={4.8} readOnly precision={0.1} />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Enhanced Amenities Section */}
      <Box sx={{ bgcolor: '#F8F9FA', py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' },
                color: '#2C3E50',
                mb: 2,
              }}
            >
              World-Class Amenities
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Indulge in our comprehensive collection of premium facilities
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(4, 1fr)'
              },
              gap: 3,
            }}
          >
            {amenities.map((amenity, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  borderRadius: 3,
                  bgcolor: 'white',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    borderColor: amenity.color,
                    '& .amenity-icon': {
                      color: amenity.color,
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <Box 
                  className="amenity-icon"
                  sx={{ 
                    color: 'text.secondary', 
                    mb: 2,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {React.cloneElement(amenity.icon, { sx: { fontSize: 48 } })}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2C3E50' }}>
                  {amenity.label}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Enhanced CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
          background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
          color: 'white', 
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center">
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3.5rem' },
                mb: 3,
              }}
            >
              Begin Your Journey
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 6,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              Join the elite circle of travelers who choose excellence. Your extraordinary experience awaits.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#C9A96E',
                color: 'white',
                px: 8,
                py: 3,
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#B8956A',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
              onClick={() => navigate('/rooms')}
            >
              Reserve Your Suite
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;