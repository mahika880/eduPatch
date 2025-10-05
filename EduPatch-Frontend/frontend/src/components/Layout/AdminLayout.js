import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Create,
  Quiz,
  QrCode,
  CloudDownload,
  Settings,
  Notifications,
  Search,
  KeyboardArrowDown,
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
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", colors.navBackground]
  );

  const navItems = [
    { text: 'Create Content', icon: <Create />, path: '/admin/create' },
    { text: 'Quizzes', icon: <Quiz />, path: '/admin/quizzes' },
    { text: 'QR Scanner', icon: <QrCode />, path: '/admin/qr-scanner' },
    { text: 'Downloads', icon: <CloudDownload />, path: '/admin/cache' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.primary }}>
      {/* Enhanced Navbar */}
      <motion.div style={{ background: navBackground }}>
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
            <Toolbar sx={{ py: 1.5, gap: 4 }}>
              {/* Logo */}
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600,
                  letterSpacing: '-0.5px',
                  color: colors.text,
                }}
              >
                EduPatch
              </Typography>

              {/* Centered Nav Items */}
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
                      sx={{
                        color: location.pathname === item.path ? colors.accent : colors.textSecondary,
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        minWidth: 'auto',
                        p: 1,
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

              {/* Right Section */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    startIcon={<Search sx={{ fontSize: 20 }} />}
                    sx={{
                      color: colors.textSecondary,
                      minWidth: 'auto',
                      p: 1,
                      '&:hover': { color: colors.text }
                    }}
                  />
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: colors.text,
                      color: colors.primary,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      px: 3,
                      py: 1,
                      borderRadius: '50px',
                      '&:hover': {
                        bgcolor: colors.accent,
                      }
                    }}
                  >
                    Start Creating
                  </Button>
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