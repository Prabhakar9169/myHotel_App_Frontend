import React from 'react';
import { Box, LinearProgress, Typography, Container } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface PageLoaderProps {
  message?: string;
  progress?: number;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = 'Loading page...', 
  progress 
}) => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        gap={3}
        sx={{
          animation: `${fadeIn} 0.5s ease-out`,
        }}
      >
        <Typography variant="h6" color="primary" fontWeight={500}>
          {message}
        </Typography>
        
        {progress !== undefined ? (
          <Box sx={{ width: '100%', maxWidth: 300 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4
                }
              }} 
            />
            <Typography 
              variant="body2" 
              color="textSecondary" 
              align="center" 
              sx={{ mt: 1 }}
            >
              {Math.round(progress)}%
            </Typography>
          </Box>
        ) : (
          <LinearProgress 
            sx={{ 
              width: '100%', 
              maxWidth: 300, 
              height: 8, 
              borderRadius: 4,
              '& .MuiLinearProgress-bar': {
                borderRadius: 4
              }
            }} 
          />
        )}
      </Box>
    </Container>
  );
};

export default PageLoader;
