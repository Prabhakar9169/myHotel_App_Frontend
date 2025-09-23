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
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import {
  Email,
  Lock,
  Person,
  Phone,
  Visibility,
  VisibilityOff,
  Hotel,
  Google,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registerUser, selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
import ButtonLoader from '../common/ButtonLoader';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  agreeToTerms: yup
    .boolean()
    .required('You must agree to the terms and conditions')
    .oneOf([true], 'You must agree to the terms and conditions'),
});

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, agreeToTerms, ...registerData } = data;
      await dispatch(registerUser(registerData)).unwrap();
      navigate('/');
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
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Join us and start booking your dream stays
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Register Form */}
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
              {...register('name')}
              fullWidth
              label="Full Name"
              type="text"
              autoComplete="name"
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              {...register('email')}
              fullWidth
              label="Email Address"
              type="email"
              autoComplete="email"
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
              {...register('phone')}
              fullWidth
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2
              }}
            >
              <TextField
                {...register('password')}
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
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
              
              <TextField
                {...register('confirmPassword')}
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Terms and Conditions */}
            <Box>
              <FormControlLabel
                control={<Checkbox {...register('agreeToTerms')} color="primary" />}
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link component={RouterLink} to="/terms" color="primary">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link component={RouterLink} to="/privacy" color="primary">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                sx={{ alignItems: 'flex-start' }}
              />
              {errors.agreeToTerms && (
                <Typography variant="body2" color="error">
                  {errors.agreeToTerms.message}
                </Typography>
              )}
            </Box>

            {/* Submit Button */}
            <ButtonLoader
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loadingText="Creating account..."
              sx={{ py: 1.5 }}
            >
              Create Account
            </ButtonLoader>

            {/* Divider */}
            <Divider>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Google Register */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<Google />}
              sx={{ py: 1.5 }}
            >
              Sign up with Google
            </Button>

            {/* Login Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  color="primary"
                  fontWeight="600"
                >
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
