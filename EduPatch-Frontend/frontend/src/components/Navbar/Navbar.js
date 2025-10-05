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
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/system';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Sunset Color Palette
  const colors = {
    primary: '#FFFFFF',
    secondary: '#F5F5F7',
    text: '#1D1D1F',
    textSecondary: '#86868B',
    accent: '#2997FF',
    subtle: '#E8E8E8',
    navBackground: 'rgba(255, 255, 255, 0.8)',
    sidebarBackground: 'rgba(255, 255, 255, 0.8)',
    hover: 'rgba(41, 151, 255, 0.08)',
    activeLink: '#2997FF',
    divider: 'rgba(0, 0, 0, 0.06)',
    glassBg: 'rgba(255, 255, 255, 0.7)'
  };

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
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        ...navbarStyles,
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.accent}40`,
        boxShadow: `0 4px 20px ${colors.primary}20`,
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        {/* Logo Section */}
        <Box 
          display="flex" 
          alignItems="center" 
          sx={{ 
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
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
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.5px',
              textShadow: `0 2px 8px ${colors.primary}60`,
            }}
          >
            EduPatch AI
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mr: 2 }}>
          <Button
            color="inherit"
            startIcon={<Dashboard />}
            onClick={() => navigate('/admin/dashboard')}
            sx={{
              color: 'white',
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
              py: 1,
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: `${colors.accent}30`,
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 15px ${colors.accent}40`,
              },
            }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            startIcon={<Create />}
            onClick={() => navigate('/admin/create')}
            sx={{
              color: 'white',
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
              py: 1,
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: `${colors.accent}30`,
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 15px ${colors.accent}40`,
              },
            }}
          >
            Create Content
          </Button>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Notifications */}
          <IconButton
            size="medium"
            sx={{
              color: 'white',
              background: `${colors.accent}20`,
              '&:hover': {
                background: `${colors.accent}40`,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <NotificationsNone />
          </IconButton>

          {/* User Info Chip */}
          <Chip
            avatar={
              <Avatar 
                sx={{ 
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                  color: colors.primary,
                  fontWeight: 700,
                  width: 32,
                  height: 32,
                }}
              >
                {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
              </Avatar>
            }
            label={user?.name || user?.email || 'Admin'}
            onClick={handleMenu}
            sx={{
              background: `${colors.lightest}20`,
              color: 'white',
              fontWeight: 600,
              border: `1px solid ${colors.accent}40`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: `${colors.lightest}30`,
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 15px ${colors.accent}30`,
              },
              '& .MuiChip-label': {
                color: 'white',
                fontWeight: 600,
              },
            }}
          />

          {/* User Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${colors.lightest}, ${colors.light}60)`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${colors.accent}60`,
                boxShadow: `0 8px 32px ${colors.primary}20`,
                minWidth: 200,
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* User Info */}
            <MenuItem 
              disabled
              sx={{
                background: `${colors.accent}20`,
                borderRadius: 2,
                mx: 1,
                mt: 1,
                mb: 1,
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar 
                  sx={{ 
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: 'white',
                    width: 32,
                    height: 32,
                  }}
                >
                  {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: colors.primary,
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {user?.name || 'Admin User'}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: colors.secondary,
                      lineHeight: 1,
                    }}
                  >
                    {user?.email || 'admin@edupatch.com'}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>

            {/* Logout */}
            <MenuItem 
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 1,
                color: colors.primary,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: `${colors.accent}30`,
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Logout sx={{ mr: 2, color: colors.secondary }} />
              <Typography sx={{ fontWeight: 600 }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Add this styled component for the enhanced sidebar
const StyledSidebar = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  width: 280,
  background: colors.glassBg,
  backdropFilter: 'blur(20px)',
  borderRight: `1px solid ${colors.divider}`,
  zIndex: 1200,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)'
}));

// Enhanced SidebarItem component
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <motion.div
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
  >
    <Button
      fullWidth
      startIcon={
        <Box sx={{ 
          color: active ? colors.accent : colors.textSecondary,
          transition: 'all 0.3s ease'
        }}>
          <Icon />
        </Box>
      }
      onClick={onClick}
      sx={{
        py: 1.5,
        px: 2,
        justifyContent: 'flex-start',
        color: active ? colors.accent : colors.text,
        bgcolor: active ? colors.hover : 'transparent',
        '&:hover': {
          bgcolor: colors.hover,
          '& .MuiTypography-root': {
            color: colors.accent
          }
        },
        borderRadius: '12px',
        mx: 1,
        transition: 'all 0.3s ease'
      }}
    >
      <Typography
        sx={{
          fontWeight: active ? 600 : 500,
          fontSize: '0.95rem',
          transition: 'all 0.3s ease'
        }}
      >
        {label}
      </Typography>
    </Button>
  </motion.div>
);

// Enhanced Sidebar component
const Sidebar = ({ open, onClose }) => {
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -280, opacity: 0 }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <StyledSidebar
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Box sx={{ p: 3 }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box 
                  display="flex" 
                  alignItems="center" 
                  sx={{ 
                    mb: 4,
                    cursor: 'pointer'
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      bgcolor: colors.hover,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <School sx={{ color: colors.accent, fontSize: 24 }} />
                  </Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: colors.text,
                    letterSpacing: '-0.5px'
                  }}>
                    EduPatch
                  </Typography>
                </Box>
              </motion.div>

              <Box sx={{ mb: 4 }}>
                {[
                  { icon: Dashboard, label: 'Overview', active: true },
                  { icon: Book, label: 'Courses' },
                  { icon: People, label: 'Students' },
                  { icon: Assessment, label: 'Analytics' },
                  { icon: Settings, label: 'Settings' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Box sx={{ mb: 1 }}>
                      <SidebarItem {...item} />
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            <Box sx={{ mt: 'auto', p: 3 }}>
              <motion.div whileHover={{ y: -2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    bgcolor: colors.accent,
                    color: 'white',
                    textTransform: 'none',
                    py: 1.5,
                    borderRadius: '12px',
                    boxShadow: '0 4px 14px 0 rgba(41, 151, 255, 0.25)',
                    '&:hover': {
                      bgcolor: colors.text,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  New Course
                </Button>
              </motion.div>
            </Box>
          </StyledSidebar>

          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 1100,
              display: { md: 'none' }
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

// Update the existing navbar styles
const navbarStyles = {
  background: colors.glassBg,
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${colors.divider}`,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
  transition: 'all 0.3s ease'
};

export default Navbar;