import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Hotel,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "Rooms", href: "/rooms" },
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "My Bookings", href: "/bookings" }
      ]
    },
    {
      title: "Support", 
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Refund Policy", href: "/refund" },
        { label: "FAQ", href: "/faq" }
      ]
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        mt: 'auto',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '2fr repeat(2, 1fr)',
              lg: '2fr repeat(3, 1fr)'
            },
            gap: { xs: 3, md: 4 }
          }}
        >
          {/* Company Info - Takes more space */}
          <Box>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Hotel sx={{ mr: 1, fontSize: 32, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Oracle Inn
                </Typography>
              </Box>
              
              <Typography variant="body2" color="grey.400" sx={{ maxWidth: 280 }}>
                Your trusted partner for finding the perfect accommodation. 
                Book with confidence and enjoy memorable stays.
              </Typography>
              
              <Stack direction="row" spacing={1}>
                <IconButton color="primary" size="small">
                  <Facebook />
                </IconButton>
                <IconButton color="primary" size="small">
                  <Twitter />
                </IconButton>
                <IconButton color="primary" size="small">
                  <Instagram />
                </IconButton>
                <IconButton color="primary" size="small">
                  <LinkedIn />
                </IconButton>
              </Stack>
            </Stack>
          </Box>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section, index) => (
            <Box key={index}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link, linkIndex) => (
                  <Link 
                    key={linkIndex}
                    href={link.href} 
                    color="grey.400" 
                    underline="hover"
                    sx={{
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          ))}

          {/* Contact Info */}
          <Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Info
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20, color: 'primary.main', mt: 0.2 }} />
                <Typography variant="body2" color="grey.400">
                  123 Hotel Street, Mumbai, India
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20, color: 'primary.main' }} />
                <Typography variant="body2" color="grey.400">
                  +91 98765 43210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20, color: 'primary.main' }} />
                <Typography variant="body2" color="grey.400">
                  info@hotelbooking.com
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Typography variant="body2" color="grey.400">
            © {currentYear} Oracle Inn. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={3}>
            <Link href="/terms" color="grey.400" underline="hover" variant="body2">
              Terms
            </Link>
            <Link href="/privacy" color="grey.400" underline="hover" variant="body2">
              Privacy
            </Link>
            <Link href="/cookies" color="grey.400" underline="hover" variant="body2">
              Cookies
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
