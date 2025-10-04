import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School,
  ArrowForward,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Subtle color theme
const colors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F7',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#2997FF',
  subtle: '#E8E8E8',
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ background: colors.primary, minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colors.subtle}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <School sx={{ color: colors.text, mr: 1 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                color: colors.text,
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}
            >
              EduPatch
            </Typography>
          </Box>

          {/* Navigation Links - Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {['Features', 'How it Works', 'Pricing', 'Contact'].map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: colors.text,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      color: colors.accent,
                      background: 'transparent',
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}

          <Button
            variant="contained"
            sx={{
              bgcolor: colors.text,
              color: 'white',
              textTransform: 'none',
              px: 3,
              py: 1,
              borderRadius: '50px',
              '&:hover': {
                bgcolor: colors.accent,
              }
            }}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 15 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4.5rem' },
                fontWeight: 700,
                color: colors.text,
                lineHeight: 1.1,
                mb: 3,
                letterSpacing: '-0.5px'
              }}
            >
              Transform Learning<br />
              with AI-Powered Education
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: colors.textSecondary,
                mb: 4,
                fontWeight: 400,
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Create interactive learning experiences with intelligent content generation 
              and smart assessment tools.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: colors.text,
                color: 'white',
                textTransform: 'none',
                px: 4,
                py: 2,
                borderRadius: '50px',
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: colors.accent,
                }
              }}
            >
              Start Creating
            </Button>
          </Box>
        </motion.div>

        {/* Hero Image/Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            sx={{
              width: '100%',
              height: { xs: '300px', md: '500px' },
              borderRadius: '24px',
              overflow: 'hidden',
              background: colors.secondary,
              position: 'relative'
            }}
          >
            {/* Add your hero image or animation here */}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingPage;