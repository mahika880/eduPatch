import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// Updated modern color theme
export const colors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F7',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#833AB4',
  subtle: '#E8E8E8',
  navBackground: 'rgba(255, 255, 255, 0.8)',
  glassBg: 'rgba(255, 255, 255, 0.7)',
};

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Features', path: '/features' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Resources', path: '/resources' },
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: colors.glassBg,
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${colors.subtle}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 2, px: { xs: 2, md: 4 } }}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Typography
                variant="h5"
                onClick={() => navigate('/')}
                sx={{
                  fontWeight: 700,
                  color: colors.text,
                  cursor: 'pointer',
                  letterSpacing: '-0.5px',
                }}
              >
                EduPatch
              </Typography>
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ mx: 'auto', display: 'flex', gap: 4 }}>
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Button
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: colors.text,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        '&:hover': {
                          background: 'transparent',
                          color: colors.accent,
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            )}

            {/* CTA and Mobile Menu */}
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isMobile && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/get-started')}
                    sx={{
                      bgcolor: colors.accent,
                      color: 'white',
                      textTransform: 'none',
                      px: 3,
                      py: 1,
                      borderRadius: '50px',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: colors.text,
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
              )}

              {isMobile && (
                <IconButton
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{ color: colors.text }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            background: colors.glassBg,
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              EduPatch
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem 
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                sx={{ py: 2 }}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  style={{ width: '100%' }}
                >
                  <ListItemText 
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: colors.text,
                      }
                    }}
                  />
                </motion.div>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 4 }}>
            <Button
              fullWidth
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={() => {
                navigate('/get-started');
                setMobileMenuOpen(false);
              }}
              sx={{
                bgcolor: colors.accent,
                color: 'white',
                textTransform: 'none',
                py: 2,
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  bgcolor: colors.text,
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;