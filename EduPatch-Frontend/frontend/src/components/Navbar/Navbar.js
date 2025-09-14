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

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Sunset Color Palette
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
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

export default Navbar;