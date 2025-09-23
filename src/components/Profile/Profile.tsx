import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import { 
  Edit, 
  Email, 
  Phone, 
  CalendarToday, 
  Security,
  Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format, isValid, parseISO } from 'date-fns';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { 
  selectUser, 
  selectUserStats, 
  selectUserActivity,
  fetchProfile,
  logout
} from '../../store/slices/authSlice';
import EditProfileModal from '../../components/Profile/EditProfileModal';

// Safe date formatter function
const formatDate = (date: any): string => {
  try {
    // If date is null/undefined
    if (!date) return 'Not available';
    
    // If date is string, parse it first
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
    
    // Check if date is valid
    if (isValid(dateObj)) {
      return format(dateObj, 'PPP');
    } else {
      return 'Invalid date';
    }
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Date unavailable';
  }
};

// Safe date formatter for relative time
const formatDateShort = (date: any): string => {
  try {
    if (!date) return 'Unknown';
    
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
    
    if (isValid(dateObj)) {
      return format(dateObj, 'MMM yyyy');
    } else {
      return 'Unknown';
    }
  } catch (error) {
    return 'Unknown';
  }
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const stats = useAppSelector(selectUserStats);
  const activity = useAppSelector(selectUserActivity);

  const [tabValue, setTabValue] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // if (loading) {
  //   return <Loader variant="fullscreen" message="Loading profile..." />;
  // }

  if (!user) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          User not found. Please login again.
        </Typography>
      </Container>
    );
  }

  console.log(user)

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Profile Header Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
            <Avatar
              src={user.avatar}
              sx={{ width: 100, height: 100 }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip 
                  label={user.role.toUpperCase()} 
                  color={user.role === 'admin' ? 'error' : 'primary'}
                  size="small"
                />
                <Chip 
                  label={user.isActive ? 'Active' : 'Inactive'}
                  color={user.isActive ? 'success' : 'error'}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => setEditModalOpen(true)}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Activity" />
            <Tab label="Settings" />
          </Tabs>
        </Box>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
              gap: 3,
              p: 3
            }}
          >
            {/* Stats Section */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Account Statistics
              </Typography>
              
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: 2,
                  mb: 3
                }}
              >
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {stats?.totalBookings || 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Bookings
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    ₹{stats?.totalSpent?.toLocaleString() || 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Spent
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">
                    {stats?.profileCompleteness || 0}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Profile Complete
                  </Typography>
                </Paper>
              </Box>
              
              {/* Profile Completeness */}
              <Box>
                <Typography variant="body2" gutterBottom>
                  Profile Completeness: {stats?.profileCompleteness || 0}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={stats?.profileCompleteness || 0}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Box>

            {/* Personal Info */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              
              <List>
                <ListItem>
                  <Email sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText primary="Email" secondary={user.email || 'Not provided'} />
                </ListItem>
                <ListItem>
                  <Phone sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText primary="Phone" secondary={user.phone || 'Not provided'} />
                </ListItem>
                <ListItem>
                  <CalendarToday sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText 
                    primary="Member Since" 
                    secondary={formatDateShort(user.createdAt)}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </TabPanel>

        {/* Activity Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            
            {activity?.recentBookings?.length > 0 ? (
              <List>
                {activity.recentBookings.map((booking: any, index: number) => (
                  <React.Fragment key={booking._id || index}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={booking.room?.title || 'Room Booking'}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Amount: ₹{booking.totalAmount?.toLocaleString() || 0}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {formatDate(booking.createdAt)}
                            </Typography>
                            <Chip 
                              label={booking.status || 'Unknown'}
                              size="small"
                              color={
                                booking.status === 'confirmed' ? 'success' :
                                booking.status === 'pending' ? 'warning' : 'error'
                              }
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < activity.recentBookings.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
                <Typography color="textSecondary" gutterBottom>
                  No recent activity found
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/rooms')}
                >
                  Browse Rooms
                </Button>
              </Paper>
            )}
          </Box>
        </TabPanel>

        {/* Settings Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setEditModalOpen(true)}
                fullWidth
              >
                Edit Profile Information
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Security />}
                fullWidth
              >
                Change Password
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </Card>

      {/* Edit Profile Modal */}
      {user && (
        <EditProfileModal 
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={user}
        />
      )}
    </Container>
  );
};

export default ProfilePage;
