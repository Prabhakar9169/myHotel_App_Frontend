import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Close, Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../hooks/redux';
import { changePassword } from '../../store/slices/authSlice';
import ButtonLoader from '../common/ButtonLoader';

const schema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
    .required('Please confirm your password'),
});

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await dispatch(changePassword(data)).unwrap();
      onClose();
      reset();
    } catch (error) {
      // Error handled by Redux
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Change Password
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Choose a strong password to keep your account secure.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 3 }}>
          <TextField
            {...register('currentPassword')}
            fullWidth
            label="Current Password"
            type={showPasswords.current ? 'text' : 'password'}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('current')}
                    edge="end"
                  >
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            {...register('newPassword')}
            fullWidth
            label="New Password"
            type={showPasswords.new ? 'text' : 'password'}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('new')}
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            {...register('confirmPassword')}
            fullWidth
            label="Confirm New Password"
            type={showPasswords.confirm ? 'text' : 'password'}
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
                    onClick={() => togglePasswordVisibility('confirm')}
                    edge="end"
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <ButtonLoader
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          loading={loading}
          loadingText="Changing..."
        >
          Change Password
        </ButtonLoader>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
