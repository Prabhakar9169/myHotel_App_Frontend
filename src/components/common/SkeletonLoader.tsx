import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Skeleton, 
  Stack
} from '@mui/material';

interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'profile' | 'room' | 'booking' | 'dashboard' | 'table' | 'stats';
  count?: number;
  height?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  variant = 'card', 
  count = 1,
  height = 200
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <Card elevation={2}>
            <Skeleton variant="rectangular" width="100%" height={height} />
            <CardContent>
              <Stack spacing={1}>
                <Skeleton variant="text" width="80%" height={28} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mt: 2 
                  }}
                >
                  <Skeleton variant="text" width="30%" height={24} />
                  <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        );

      case 'room':
        return (
          <Card elevation={2}>
            <Skeleton variant="rectangular" width="100%" height={240} />
            <CardContent>
              <Stack spacing={1.5}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start'
                  }}
                >
                  <Skeleton variant="text" width="70%" height={32} />
                  <Skeleton variant="rounded" width={60} height={24} />
                </Box>
                
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} variant="rounded" width={60} height={24} />
                  ))}
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    pt: 1
                  }}
                >
                  <Box>
                    <Skeleton variant="text" width={80} height={32} />
                    <Skeleton variant="text" width={60} height={16} />
                  </Box>
                  <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 2 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        );

      case 'profile':
        return (
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Skeleton variant="circular" width={64} height={64} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} />
                  </Box>
                </Box>
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
              </Stack>
            </CardContent>
          </Card>
        );

      case 'booking':
        return (
          <Card elevation={1}>
            <CardContent>
              <Stack spacing={2}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start'
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={28} />
                    <Skeleton variant="text" width="40%" height={20} />
                  </Box>
                  <Skeleton variant="rounded" width={80} height={24} />
                </Box>
                
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: 2
                  }}
                >
                  <Box>
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} />
                  </Box>
                  <Box>
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </Box>
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    pt: 1
                  }}
                >
                  <Skeleton variant="text" width="30%" height={32} />
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rectangular" width={70} height={36} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width={70} height={36} sx={{ borderRadius: 1 }} />
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        );

      case 'dashboard':
        return (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
              gap: 2
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Skeleton variant="text" width="80%" height={48} sx={{ mx: 'auto' }} />
                  <Skeleton variant="text" width="60%" height={20} sx={{ mx: 'auto', mt: 1 }} />
                </CardContent>
              </Card>
            ))}
          </Box>
        );

      case 'stats':
        return (
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Skeleton variant="text" width="40%" height={32} />
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 3
                  }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <Box key={i} sx={{ textAlign: 'center' }}>
                      <Skeleton variant="text" width="100%" height={48} />
                      <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', mt: 1 }} />
                    </Box>
                  ))}
                </Box>
                <Skeleton variant="rectangular" width="100%" height={8} sx={{ borderRadius: 1 }} />
              </Stack>
            </CardContent>
          </Card>
        );

      case 'table':
        return (
          <Card>
            <CardContent>
              <Stack spacing={2}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Box 
                    key={index}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr auto',
                      gap: 2,
                      alignItems: 'center',
                      py: 1
                    }}
                  >
                    <Skeleton variant="text" width="100%" height={24} />
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="rounded" width={60} height={24} />
                    <Skeleton variant="circular" width={32} height={32} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        );

      case 'list':
        return (
          <Stack spacing={2}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Box 
                key={index} 
                sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}
              >
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" height={24} />
                  <Skeleton variant="text" width="80%" height={20} />
                </Box>
                <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: 1 }} />
              </Box>
            ))}
          </Stack>
        );

      default:
        return <Skeleton variant="rectangular" width="100%" height={height} />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} sx={{ mb: count > 1 ? 2 : 0 }}>
          {renderSkeleton()}
        </Box>
      ))}
    </>
  );
};

export default SkeletonLoader;
