import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import {
  Lock,
  Visibility,
  VisibilityOff,
  Hotel,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'; // useSearchParams hataya
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetPassword, selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
import ButtonLoader from '../common/ButtonLoader';

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  // useParams se token get karein
  const { token } = useParams<{ token: string }>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const checkToken = async () => {
      console.log("Checking token:", token);
      
      if (!token) {
        console.log("No token found in URL params");
        setIsValidToken(false);
        return;
      }

      // Temporary - set as valid for testing
      console.log("Token found, setting as valid");
      setIsValidToken(true);

      // Uncomment when ready for actual validation
      // try {
      //   await dispatch(validateResetToken({ token })).unwrap();
      //   setIsValidToken(true);
      // } catch (error) {
      //   setIsValidToken(false);
      // }
    };

    checkToken();
  }, [token, dispatch]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    try {
      await dispatch(resetPassword({ 
        token, 
        passwordData: { 
          password: data.password,
          confirmPassword: data.confirmPassword
        }
      })).unwrap();
      setIsPasswordReset(true);
    } catch (error) {
      // Error handled by Redux
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  // Loading state while validating token
  if (isValidToken === null) {
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              <Typography variant="h6" color="text.secondary">
                Validating reset link...
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }

  // Invalid token state
  if (!isValidToken) {
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

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Error 
                sx={{ 
                  fontSize: 80, 
                  color: 'error.main', 
                  mb: 2 
                }} 
              />
              <Typography variant="h5" fontWeight="600" gutterBottom>
                Invalid Reset Link
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                This password reset link is invalid or has expired. Please request a new password reset.
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleBackToLogin}
                sx={{ py: 1.5 }}
              >
                Back to Login
              </Button>

              <Link
                component={RouterLink}
                to="/forgot-password"
                sx={{ textAlign: 'center', textDecoration: 'none' }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  sx={{ py: 1.5 }}
                >
                  Request New Reset Link
                </Button>
              </Link>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }

  // Success state after password reset
  if (isPasswordReset) {
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

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <CheckCircle 
                sx={{ 
                  fontSize: 80, 
                  color: 'success.main', 
                  mb: 2 
                }} 
              />
              <Typography variant="h5" fontWeight="600" gutterBottom>
                Password Reset Successful
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your password has been successfully reset. You can now sign in with your new password.
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleBackToLogin}
              sx={{ py: 1.5 }}
            >
              Continue to Sign In
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  // Reset password form
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
              Reset Your Password
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Enter your new password below
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Reset Password Form */}
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
              {...register('password')}
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              autoFocus
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
              label="Confirm New Password"
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

            {/* Password Requirements */}
            <Box sx={{ px: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Password requirements:
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                • At least 8 characters long
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                • Contains uppercase and lowercase letters
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                • Contains at least one number
              </Typography>
            </Box>

            {/* Submit Button */}
            <ButtonLoader
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loading={loading}
              loadingText="Resetting password..."
              sx={{ py: 1.5 }}
            >
              Reset Password
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

export default ResetPassword;