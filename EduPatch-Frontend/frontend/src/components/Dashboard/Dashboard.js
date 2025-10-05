import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  School,
  ArrowForward,
  Star,
  AutoAwesome,
  Psychology,
  Speed,
  Send,
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  Twitter,
  Instagram,
  GitHub,
} from '@mui/icons-material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Subtle color theme
const colors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F7',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#2997FF',
  subtle: '#E8E8E8',
  navBackground: 'rgba(255, 255, 255, 0.8)',
  sidebarBackground: '#FFFFFF',
  hover: 'rgba(41, 151, 255, 0.1)',
  activeLink: '#2997FF',
  divider: 'rgba(0, 0, 0, 0.06)'
};

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ background: colors.primary, minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: 15 }}>
        {/* Your existing dashboard content */}
      </Container>
    </Box>
  );
};

export default Dashboard;