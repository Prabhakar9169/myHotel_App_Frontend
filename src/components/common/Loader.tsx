import React from 'react';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Backdrop,
  Card,
  CardContent 
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { Hotel } from '@mui/icons-material';

// Animation keyframes
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'linear' | 'dots' | 'hotel' | 'fullscreen';
  message?: string;
  backdrop?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  variant = 'circular',
  message = 'Loading...',
  backdrop = false
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 24;
      case 'large': return 60;
      default: return 40;
    }
  };

  const renderLoader = () => {
    switch (variant) {
      case 'circular':
        return (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <CircularProgress size={getSize()} thickness={4} />
            <Typography variant="body2" color="textSecondary">
              {message}
            </Typography>
          </Box>
        );

      case 'dots':
        return (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box display="flex" gap={0.5}>
              {[0, 1, 2].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    animation: `${pulse} 1.5s infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
              ))}
            </Box>
            <Typography variant="body2" color="textSecondary">
              {message}
            </Typography>
          </Box>
        );

      case 'hotel':
        return (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box
              sx={{
                animation: `${rotate} 2s linear infinite`,
                color: 'primary.main',
              }}
            >
              <Hotel sx={{ fontSize: getSize() }} />
            </Box>
            <Typography variant="body2" color="textSecondary">
              {message}
            </Typography>
          </Box>
        );

      case 'fullscreen':
        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            gap={3}
          >
            <Card elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                  <Box
                    sx={{
                      animation: `${pulse} 2s infinite`,
                      color: 'primary.main',
                    }}
                  >
                    <Hotel sx={{ fontSize: 48 }} />
                  </Box>
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    Oracle Inn
                  </Typography>
                  <CircularProgress size={40} thickness={4} />
                  <Typography variant="body1" color="textSecondary">
                    {message}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return (
          <Box display="flex" alignItems="center" justifyContent="center" p={2}>
            <CircularProgress size={getSize()} />
          </Box>
        );
    }
  };

  const content = renderLoader();

  if (backdrop) {
    return (
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
        open={true}
      >
        {content}
      </Backdrop>
    );
  }

  return content;
};

export default Loader;
