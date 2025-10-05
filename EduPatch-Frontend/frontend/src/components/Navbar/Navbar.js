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
  InputBase,
  Badge,
  Container,
} from '@mui/material';
import {
  Search,
  Notifications,
  Settings,
  Person,
  Logout,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, useScroll, useTransform } from 'framer-motion';

// Updated color theme to match dashboard
export const colors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F7',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#833AB4', // Purple accent to match theme
  subtle: '#E8E8E8',
  navBackground: 'rgba(255, 255, 255, 0.8)',
  glassBg: 'rgba(255, 255, 255, 0.7)',
};

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.5)", colors.navBackground]
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
          background: 'transparent',
          borderBottom: `1px solid ${colors.subtle}`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, px: '24px' }}>
            {/* Search Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                px: 2,
                width: '300px',
                height: '40px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              }}
            >
              <Search sx={{ color: colors.textSecondary, mr: 1 }} />
              <InputBase
                placeholder="Search content, quizzes..."
                sx={{ 
                  color: colors.text,
                  '& input::placeholder': {
                    color: colors.textSecondary,
                    fontSize: '0.875rem',
                  }
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Right side icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'rgba(131, 58, 180, 0.05)',
                    '&:hover': { bgcolor: 'rgba(131, 58, 180, 0.1)' },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <Notifications sx={{ color: colors.text }} />
                  </Badge>
                </IconButton>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'rgba(131, 58, 180, 0.05)',
                    '&:hover': { bgcolor: 'rgba(131, 58, 180, 0.1)' },
                  }}
                >
                  <Settings sx={{ color: colors.text }} />
                </IconButton>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Box
                  onClick={handleMenu}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    py: 1,
                    px: 1,
                    borderRadius: '12px',
                    '&:hover': { bgcolor: 'rgba(131, 58, 180, 0.05)' },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: colors.accent,
                      fontSize: '0.875rem',
                    }}
                  >
                    {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: colors.text,
                      fontWeight: 500,
                    }}
                  >
                    {user?.name || user?.email || 'Admin'}
                  </Typography>
                </Box>
              </motion.div>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: `1px solid ${colors.subtle}`,
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleLogout} sx={{ gap: 1 }}>
                  <Logout fontSize="small" />
                  <Typography variant="body2">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;