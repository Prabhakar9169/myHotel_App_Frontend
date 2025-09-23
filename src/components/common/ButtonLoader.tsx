import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

interface ButtonLoaderProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  startIcon,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          startIcon
        )
      }
    >
      {loading ? loadingText : children}
    </Button>
  );
};

export default ButtonLoader;
