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

// Modern Color Palette
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
            <Toolbar sx={{ py: 1, gap: 2 }}>
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Typography 
                  variant="h5" 
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

              {/* Navigation Links */}
              <Box sx={{ display: 'flex', gap: 3 }}>
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Button
                      startIcon={item.icon}
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: location.pathname === item.path ? colors.accent : colors.text,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        '&:hover': {
                          background: 'transparent',
                          color: colors.accent,
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  </motion.div>
                ))}
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              {/* Search */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button
                  startIcon={<Search />}
                  sx={{
                    color: colors.textSecondary,
                    textTransform: 'none',
                    bgcolor: colors.secondary,
                    px: 2,
                    py: 1,
                    borderRadius: '50px',
                    '&:hover': {
                      bgcolor: colors.subtle,
                    }
                  }}
                >
                  Search
                </Button>
              </motion.div>

              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton
                  onClick={(e) => setNotificationEl(e.currentTarget)}
                  sx={{ color: colors.text }}
                >
                  <Notifications />
                </IconButton>
              </Tooltip>

              {/* Settings */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  endIcon={<KeyboardArrowDown />}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    textTransform: 'none',
                    color: colors.text,
                    gap: 1
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32,
                      bgcolor: colors.accent 
                    }}
                  >
                    A
                  </Avatar>
                </Button>
              </motion.div>
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Main Content */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          pt: '84px',
          minHeight: 'calc(100vh - 84px)',
        }}
      >
        {children}
      </Box>

      {/* Menus */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 2,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }
        }}
      >
        <MenuItem onClick={() => navigate('/admin/settings')}>
          <Settings sx={{ mr: 1 }} /> Settings
        </MenuItem>
        <MenuItem onClick={() => navigate('/admin/logout')}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminLayout;