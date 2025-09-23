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
  Typography,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Close, Warning, Lock } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../common/ButtonLoader';
import api from '../../service/api';

const schema = yup.object().shape({
  password: yup.string().required('Password is required for account deletion'),
  confirmation: yup
    .string()
    .matches(/^DELETE$/, 'Please type "DELETE" to confirm')
    .required('Confirmation is required'),
});

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  password: string;
  confirmation: string;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      await api.delete('/profile/delete-account', { 
        data: { password: data.password } 
      });
      
      // Clear local storage and redirect
      localStorage.clear();
      navigate('/');
      onClose();
    } catch (error: any) {
      // Error handled by API interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
            <Warning />
            Delete Account
          </Box>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            This action cannot be undone!
          </Typography>
          <Typography variant="body2">
            Deleting your account will permanently remove all your data, including bookings, 
            preferences, and personal information.
          </Typography>
        </Alert>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          To confirm account deletion, please:
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 3 }}>
          <TextField
            {...register('password')}
            fullWidth
            label="Enter your password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            {...register('confirmation')}
            fullWidth
            label='Type "DELETE" to confirm'
            placeholder="DELETE"
            error={!!errors.confirmation}
            helperText={errors.confirmation?.message || 'Type exactly "DELETE" in capital letters'}
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
          color="error"
          loading={loading}
          loadingText="Deleting..."
        >
          Delete Account
        </ButtonLoader>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountModal;
