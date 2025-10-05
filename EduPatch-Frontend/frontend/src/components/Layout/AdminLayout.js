import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Container,
  Tooltip,
} from '@mui/material';
import {
  Search,
  AccountCircle,
  NotificationsNone,  // Add this import
} from '@mui/icons-material';

// Updated Modern Color Palette
const colors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F7',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#2997FF',
  subtle: '#E8E8E8',
  navBackground: 'rgba(255, 255, 255, 0.8)',
  glassBg: 'rgba(255, 255, 255, 0.7)',
};

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationEl, setNotificationEl] = useState(null);

  // Update the navItems array
  const navItems = [
    
    { 
      text: 'Create Content', 
      path: '/admin/create',
      description: 'Generate AI-powered educational content'
    },
    { 
      text: 'Features', 
      path: '/features',
      description: 'Explore our innovative learning tools'
    },
    
    { 
      text: 'Assessments', 
      path: '/admin/quizzes',
      description: 'Create and manage smart assessments'
    },
    { 
      text: 'Resources', 
      path: '/resources',
      description: 'Educational materials and guides'
    },
    { 
      text: 'Community', 
      path: '/community',
      description: 'Connect with other educators'
    },
    { 
      text: 'About', 
      path: '/about',
      description: 'Learn about our AI-powered educational platform'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.primary }}>
      {/* Enhanced Navbar */}
      <motion.div>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{
            background: 'transparent',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${colors.subtle}`,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ py: 1, gap: 2, minHeight: '44px' }}>
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Typography 
                  variant="h6" 
                  onClick={() => navigate('/admin/dashboard')}
                  sx={{ 
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: colors.text,
                    letterSpacing: '-0.5px'
                  }}
                >
                  EduPatch
                </Typography>
              </motion.div>

              {/* Main Navigation */}
              <Box sx={{ 
                display: 'flex', 
                gap: 4, 
                alignItems: 'center',
                mx: 'auto'
              }}>
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Button
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: location.pathname === item.path ? colors.accent : colors.textSecondary,
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        minWidth: 0,
                        p: 0,
                        '&:hover': {
                          background: 'transparent',
                          color: colors.text,
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  </motion.div>
                ))}
              </Box>

              {/* Right Side Actions */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {/* Search */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Tooltip title="Search content">
                    <IconButton
                      size="small"
                      sx={{ color: colors.textSecondary }}
                    >
                      <Search fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </motion.div>

                {/* Notifications */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Tooltip title="Notifications">
                    <IconButton
                      size="small"
                      sx={{ color: colors.textSecondary }}
                      onClick={(e) => setNotificationEl(e.currentTarget)}
                    >
                      <NotificationsNone fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </motion.div>

                {/* Profile */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Tooltip title="Account & Settings">
                    <IconButton
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      size="small"
                      sx={{
                        color: colors.textSecondary,
                        width: 24,
                        height: 24
                      }}
                    >
                      <AccountCircle fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </motion.div>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Hero Section */}
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ 
          pt: '120px',
          textAlign: 'center',
          px: 3
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography 
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4.5rem' },
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: colors.text,
                mb: 3,
                lineHeight: 1.1
              }}
            >
              Transform Learning with{' '}
              <Box 
                component="span" 
                sx={{ 
                  color: colors.accent,
                  background: `linear-gradient(135deg, ${colors.accent}, #64B5F6)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                AI-Powered
              </Box>{' '}
              Education
            </Typography>

            <Typography 
              variant="h5"
              sx={{
                color: colors.textSecondary,
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto',
                mb: 5,
                lineHeight: 1.5
              }}
            >
              Create interactive learning experiences with intelligent content generation and smart assessment tools.
            </Typography>

            <motion.div whileHover={{ y: -2 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: colors.text,
                  color: colors.primary,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  px: 6,
                  py: 1.5,
                  borderRadius: '50px',
                  '&:hover': {
                    bgcolor: colors.accent,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 20px 40px ${colors.accent}20`,
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Start Creating
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Main Content */}
      {children}
    </Box>
  );
};

export default AdminLayout;