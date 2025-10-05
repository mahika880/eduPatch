import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Home,
  Create,
  School,
  AccountCircle,
  Logout,
  Dashboard,
  NotificationsNone,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, useScroll, useTransform } from 'framer-motion';

// Export colors for use in other components
export const colors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F7',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#2997FF',
  subtle: '#E8E8E8',
  navBackground: 'rgba(255, 255, 255, 0.8)',
  glassBg: 'rgba(255, 255, 255, 0.7)',
  light: '#64B5F6',
  lightest: '#90CAF9'
};

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", colors.navBackground]
  );

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/admin/login');
  };

  return (
    <motion.div style={{ background: navBackground }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colors.accent}40`,
          boxShadow: `0 4px 20px ${colors.primary}20`,
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          {/* Logo Section */}
          <Box 
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            display="flex" 
            alignItems="center" 
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/admin/dashboard')}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: `0 4px 15px ${colors.accent}40`,
              }}
            >
              <School sx={{ fontSize: 24, color: colors.primary }} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: colors.text,
                letterSpacing: '0.5px',
              }}
            >
              EduPatch AI
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mr: 2 }}>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                color="inherit"
                startIcon={<Dashboard />}
                onClick={() => navigate('/admin/dashboard')}
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  '&:hover': {
                    background: `${colors.accent}20`,
                  },
                }}
              >
                Dashboard
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                color="inherit"
                startIcon={<Create />}
                onClick={() => navigate('/admin/create')}
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  '&:hover': {
                    background: `${colors.accent}20`,
                  },
                }}
              >
                Create Content
              </Button>
            </motion.div>
          </Box>

          {/* User Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                size="medium"
                sx={{
                  color: colors.text,
                  '&:hover': {
                    background: `${colors.accent}20`,
                  },
                }}
              >
                <NotificationsNone />
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Chip
                avatar={
                  <Avatar 
                    sx={{ 
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                      color: colors.primary,
                      fontWeight: 700,
                    }}
                  >
                    {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
                  </Avatar>
                }
                label={user?.name || user?.email || 'Admin'}
                onClick={handleMenu}
                sx={{
                  background: `${colors.accent}10`,
                  color: colors.text,
                  fontWeight: 600,
                  '&:hover': {
                    background: `${colors.accent}20`,
                  },
                }}
              />
            </motion.div>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  background: colors.primary,
                  boxShadow: `0 4px 20px ${colors.accent}20`,
                }
              }}
            >
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;