import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,  // Add this import
  Button,
  Box,
  IconButton,
  Container,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search,
  AccountCircle,
  NotificationsNone,
  Logout,
  Person,
  Settings,
  Dashboard,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

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
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationEl, setNotificationEl] = useState(null);

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/admin/login');
  };

  const handleNotificationMenuClose = () => {
    setNotificationEl(null);
  };

  // Update the navItems array
  const navItems = [

    {
      text: 'Create Content',
      path: '/admin/create',
      description: 'Generate AI-powered educational content'
    },
    {
      text: 'Content Library',
      path: '/admin/content',
      description: 'View and manage all your created content'
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
            <Toolbar 
              sx={{ 
                py: 1.5,  // Increased padding
                gap: 4,   // Increased gap between items
                minHeight: '64px', // Increased height
                justifyContent: 'space-between', // Better spacing
                mx: 2 // Margin on sides
              }}
            >
              {/* Logo Section */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box
                  component="img"
                  src="/images/FullLogo.png"
                  alt="EduPatch Logo"
                  onClick={() => navigate('/admin/dashboard')}
                  sx={{ 
                    height: '40px',  // Increased logo height
                    cursor: 'pointer',
                    objectFit: 'contain',
                    mr: 4 // Margin right to separate from nav items
                  }}
                />
              </motion.div>

              {/* Navigation Items with better spacing */}
              <Box sx={{ 
                display: 'flex', 
                gap: 6,  // Increased gap between nav items
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
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
                        fontSize: '1rem', // Slightly larger font
                        fontWeight: 500,
                        padding: '8px 16px', // Added padding
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

              {/* Right side actions with better spacing */}
              <Box sx={{ 
                display: 'flex', 
                gap: 3,  // Increased gap
                alignItems: 'center',
                ml: 4 // Margin left to separate from nav items
              }}>
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

              {/* Notification Menu */}
              <Menu
                anchorEl={notificationEl}
                open={Boolean(notificationEl)}
                onClose={handleNotificationMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 300,
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <MenuItem disabled sx={{ opacity: 0.6 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    No new notifications
                  </Typography>
                </MenuItem>
              </Menu>

              {/* Profile Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/admin/dashboard'); }}>
                  <Dashboard sx={{ mr: 1, fontSize: 18 }} />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/admin/settings'); }}>
                  <Person sx={{ mr: 1, fontSize: 18 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/admin/settings'); }}>
                  <Settings sx={{ mr: 1, fontSize: 18 }} />
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
                  <Logout sx={{ mr: 1, fontSize: 18 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Hero Section */}
      

      {/* Main Content */}
      {children}
    </Box>
  );
};

export default AdminLayout;