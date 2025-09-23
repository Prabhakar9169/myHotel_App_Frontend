import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import {
  Home,
  Search,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 6, 
            textAlign: 'center', 
            borderRadius: 3,
            maxWidth: 600,
            width: '100%' 
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            color="text.primary"
            fontWeight="600"
          >
            Page Not Found
          </Typography>
          
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
          >
            The page you're looking for doesn't exist or has been moved to another location.
          </Typography>
          
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              sx={{ px: 3 }}
            >
              Go Home
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Search />}
              onClick={() => navigate('/rooms')}
              sx={{ px: 3 }}
            >
              Search Rooms
            </Button>
            
            <Button
              variant="text"
              size="large"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{ px: 3 }}
            >
              Go Back
            </Button>
          </Stack>
          
          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              If you believe this is a mistake, please{' '}
              <Button
                variant="text"
                size="small"
                onClick={() => navigate('/contact')}
                sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
              >
                contact our support team
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;
