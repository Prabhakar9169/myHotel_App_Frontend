import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import { PhotoCamera, Close } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/redux';
import { updateProfile } from '../../store/slices/authSlice';
import { User } from '../../types';
import ButtonLoader from '../common/ButtonLoader';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, onClose, user }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  
  // Simple state management - no complex forms
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    avatar: user.avatar || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simple validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.avatar) {
      try {
        new URL(formData.avatar);
      } catch {
        newErrors.avatar = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Prepare clean data
      const updateData: any = {
        name: formData.name.trim()
      };

      if (formData.phone.trim()) {
        updateData.phone = formData.phone.trim();
      }

      if (formData.avatar.trim()) {
        updateData.avatar = formData.avatar.trim();
      }

      await dispatch(updateProfile(updateData)).unwrap();
      handleClose();
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      avatar: user.avatar || ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Edit Profile</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {/* Avatar Preview */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Avatar
                src={formData.avatar || user.avatar}
                sx={{ width: 100, height: 100 }}
              >
                {formData.name.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  bgcolor: 'primary.main',
                  color: 'white',
                  width: 32,
                  height: 32,
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
                size="small"
              >
                <PhotoCamera fontSize="small" />
              </IconButton>
            </Box>
            
            <TextField
              fullWidth
              label="Avatar URL"
              placeholder="https://example.com/avatar.jpg"
              value={formData.avatar}
              onChange={handleInputChange('avatar')}
              error={!!errors.avatar}
              helperText={errors.avatar || 'Optional: Enter image URL'}
              size="small"
            />
          </Box>

          {/* Form Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              required
            />

            <TextField
              fullWidth
              label="Phone Number"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone || 'Optional: 10-digit mobile number'}
            />

            <TextField
              fullWidth
              label="Email Address"
              value={user.email}
              disabled
              helperText="Email cannot be changed"
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <ButtonLoader
          onClick={handleSubmit}
          variant="contained"
          loading={loading}
          loadingText="Updating..."
        >
          Update Profile
        </ButtonLoader>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
