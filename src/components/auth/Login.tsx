import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Hotel,
  Google,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUser, selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
import ButtonLoader from '../common/ButtonLoader';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useAppSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      // Error handled by Redux
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                color: 'primary.main',
              }}
            >
              <Hotel sx={{ fontSize: 40, mr: 1 }} />
              <Typography variant="h4" fontWeight="bold">
               Oracle Inn
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Sign in to your account to continue
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box 
            component="form" 
            onSubmit={handleSubmit(onSubmit)} 
            noValidate
            sx={{
              display: 'grid',
              gap: 3
            }}
          >
            <TextField
              {...register('email')}
              fullWidth
              label="Email Address"
              type="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              {...register('password')}
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot Password Link */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                color="primary"
              >
                Forgot password?
              </Link>
            </Box>

            {/* Submit Button */}
            <ButtonLoader
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loadingText="Signing in..."
              sx={{ py: 1.5 }}
            >
              Sign In
            </ButtonLoader>

            {/* Divider */}
            <Divider>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Google Login */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<Google />}
              sx={{ py: 1.5 }}
            >
              Continue with Google
            </Button>

            {/* Register Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  color="primary"
                  fontWeight="600"
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
