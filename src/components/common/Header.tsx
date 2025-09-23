import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux';
import { logout, selectUser, selectIsAuthenticated } from '../../store/slices/authSlice';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  AccountCircle, 
  Hotel, 
  Menu as MenuIcon,
  Home,
  Bed,
  Info,
  ContactMail,
  BookOnline,
  Person,
  Dashboard
} from '@mui/icons-material';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    setMobileDrawerOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
    setMobileDrawerOpen(false);
  };

  const handleMyBookings = () => {
    navigate('/bookings');
    handleMenuClose();
    setMobileDrawerOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileDrawerOpen(false);
  };

  // Navigation items for mobile drawer
  const navigationItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'Rooms', path: '/rooms', icon: <Bed /> },
    { text: 'About', path: '/about', icon: <Info /> },
    { text: 'Contact', path: '/contact', icon: <ContactMail /> },
    { text: 'Bookings', path: '/bookings', icon: <BookOnline /> },
  ];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, background: 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)', color: 'white' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <Hotel sx={{ mr: 1 }} />
           Oracle Inn
        </Typography>
      </Box>
      
      <List>
        {navigationItems.map((item) => (
          <ListItemButton 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
            sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}
          >
            <ListItemIcon sx={{ color: '#2c5364' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      
      <Divider />
      
      {isAuthenticated ? (
        <List>
          <ListItem sx={{ py: 2 }}>
            <ListItemIcon>
              {user?.avatar ? (
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }} />
              ) : (
                <AccountCircle sx={{ color: '#2c5364' }} />
              )}
            </ListItemIcon>
            <ListItemText 
              primary={`Welcome, ${user?.name}`} 
              primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
            />
          </ListItem>
          
          <ListItemButton onClick={handleProfile}>
            <ListItemIcon>
              <Person sx={{ color: '#2c5364' }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
          
          <ListItemButton onClick={handleMyBookings}>
            <ListItemIcon>
              <BookOnline sx={{ color: '#2c5364' }} />
            </ListItemIcon>
            <ListItemText primary="My Bookings" />
          </ListItemButton>
          
          {user?.role === 'admin' && (
            <ListItemButton onClick={() => handleNavigation('/admin')}>
              <ListItemIcon>
                <Dashboard sx={{ color: '#2c5364' }} />
              </ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItemButton>
          )}
          
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <AccountCircle sx={{ color: '#f44336' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ color: '#f44336' }} />
          </ListItemButton>
        </List>
      ) : (
        <List>
          <ListItemButton onClick={() => handleNavigation('/login')}>
            <ListItemIcon>
              <Person sx={{ color: '#2c5364' }} />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
          
          <ListItemButton onClick={() => handleNavigation('/register')}>
            <ListItemIcon>
              <AccountCircle sx={{ color: '#2c5364' }} />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItemButton>
        </List>
      )}
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)"
      }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            component={Link}
            to="/"
            sx={{ mr: 2 }}
          >
            <Hotel />
          </IconButton>
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
           Oracle Inn
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <Box sx={{ display: 'flex', mr: 2 }}>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/rooms">
                  Rooms
                </Button>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
                <Button color="inherit" component={Link} to="/contact">
                  Contact
                </Button>
                <Button color="inherit" component={Link} to="/bookings">
                  Bookings
                </Button>
              </Box>

              {isAuthenticated ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                    Welcome, {user?.name}
                  </Typography>
                  <IconButton
                    size="large"
                    onClick={handleMenuOpen}
                    color="inherit"
                  >
                    {user?.avatar ? (
                      <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }} />
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleMyBookings}>My Bookings</MenuItem>
                    {user?.role === 'admin' && (
                      <MenuItem onClick={() => { navigate('/admin'); handleMenuClose(); }}>
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box>
                  <Button color="inherit" component={Link} to="/login" sx={{ mr: 1 }}>
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </Box>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;