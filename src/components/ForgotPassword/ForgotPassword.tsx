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
} from '@mui/material';
import {
  Email,
  Hotel,
  ArrowBack,
  CheckCircle,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { forgotPassword, selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
import ButtonLoader from '../common/ButtonLoader';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectAuthError);

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await dispatch(forgotPassword(data.email)).unwrap();
      setEmailSentTo(data.email);
      setIsEmailSent(true);
    } catch (error) {
      // Error handled by Redux
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendEmail = async () => {
    if (emailSentTo) {
      try {
        await dispatch(forgotPassword(emailSentTo)).unwrap();
      } catch (error) {
        // Error handled by Redux
      }
    }
  };

  if (isEmailSent) {
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
            </Box>

            {/* Success Message */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <CheckCircle 
                sx={{ 
                  fontSize: 80, 
                  color: 'success.main', 
                  mb: 2 
                }} 
              />
              <Typography variant="h5" fontWeight="600" gutterBottom>
                Check Your Email
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                We've sent a password reset link to:
              </Typography>
              <Typography variant="body1" fontWeight="600" color="primary.main" sx={{ mb: 3 }}>
                {emailSentTo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                If you don't see the email, check your spam folder or click the button below to resend.
              </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'grid', gap: 2 }}>
              <ButtonLoader
                fullWidth
                variant="outlined"
                size="large"
                loadingText="Resending..."
                onClick={handleResendEmail}
                sx={{ py: 1.5 }}
              >
                Resend Email
              </ButtonLoader>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ArrowBack />}
                onClick={handleBackToLogin}
                sx={{ py: 1.5 }}
              >
                Back to Login
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }

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
              Forgot Password?
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Forgot Password Form */}
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

            {/* Submit Button */}
            <ButtonLoader
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loadingText="Sending reset link..."
              sx={{ py: 1.5 }}
            >
              Send Reset Link
            </ButtonLoader>

            {/* Back to Login Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Remember your password?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  color="primary"
                  fontWeight="600"
                >
                  Back to Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;