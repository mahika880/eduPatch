import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Snackbar,
  Alert,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  Divider,
  TextField,
  InputAdornment,
  CircularProgress,
  Tooltip, // Add this
} from '@mui/material';
import {
  Menu as MenuIcon,
  School,
  KeyboardArrowDown,
  ArrowForward,
  Close,
  Language,
  TrendingUp,
  AccountBalanceWallet,
  AttachMoney,
  Security,
  PieChart,
  ShowChart,
  BarChart,
  Search,
  LightMode,
  DarkMode,
  Notifications,
  MenuBook,
  CheckCircle,
  AccessTime,
  Settings,
  Logout,
  Badge,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../../services/api';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import Person from '@mui/icons-material/Person';
import Create from '@mui/icons-material/Create';
import Quiz from '@mui/icons-material/Quiz';
import QrCode from '@mui/icons-material/QrCode';
import CloudDownload from '@mui/icons-material/CloudDownload';
import Timeline from '@mui/lab/Timeline';
import Avatar from '@mui/material/Avatar';
import { Line, Bar } from 'react-chartjs-2';
import CountUp from 'react-countup';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [pages, setPages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [scrollY, setScrollY] = useState(0); // Add this line
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Scroll animation hook
  const { scrollYProgress } = useScroll();

  // Color Palette - Clean and subtle
  const colors = {
    primary: '#FFFFFF',
    secondary: '#F5F7FA',
    accent: '#0055FF',
    accentLight: '#E6EEFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
  };

  // Apply theme based on dark mode
  const currentTheme = darkMode ? {
    primary: colors.dark.primary,
    surface: colors.dark.surface,
    textPrimary: colors.dark.textPrimary,
    textSecondary: colors.dark.textSecondary,
    accent: colors.accent,
    accentSecondary: colors.accentSecondary,
  } : {
    primary: colors.light.primary,
    surface: colors.light.surface,
    textPrimary: colors.light.textPrimary,
    textSecondary: colors.light.textSecondary,
    accent: colors.accent,
    accentSecondary: '#E0E0E0',
  };

  const sidebarWidth = 280;
  const miniSidebarWidth = 70;

  // Handle scroll events for parallax and animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchPages();
    
    // Initialize intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe elements
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const fetchPages = async () => {
    try {
      const response = await apiService.getAllPages();
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      setPages([]); // Set default empty array if API fails
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Mock data for charts
  const weeklyContentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Content Created',
        data: [3, 5, 2, 8, 6, 4, 7],
        borderColor: colors.accent,
        backgroundColor: `${colors.accent}40`,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const quizCompletionData = {
    labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: [85, 92, 78, 95, 88],
        backgroundColor: `${colors.secondary}`,
        borderColor: colors.accent,
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: currentTheme.textPrimary,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: currentTheme.textSecondary,
        },
      },
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: currentTheme.textSecondary,
        },
      },
    },
  };

  // Recent activity data (mock)
  const recentActivities = [
    { id: 1, action: 'Created new content', page: 'Introduction to AI', time: '2 hours ago', icon: <Create /> },
    { id: 2, action: 'Generated quiz', page: 'Machine Learning Basics', time: '5 hours ago', icon: <Quiz /> },
    { id: 3, action: 'Downloaded QR code', page: 'Neural Networks', time: '1 day ago', icon: <QrCode /> },
    { id: 4, action: 'Updated content', page: 'Deep Learning', time: '2 days ago', icon: <AutoAwesome /> },
  ];

  // Sidebar items
  const sidebarItems = [
    { text: 'Markets', icon: <Language />, path: '/admin/markets', active: location.pathname === '/admin/markets' },
    { text: 'Trading', icon: <TrendingUp />, path: '/admin/trading', active: location.pathname === '/admin/trading' },
    { text: 'Wallet', icon: <AccountBalanceWallet />, path: '/admin/wallet', active: location.pathname === '/admin/wallet' },
    { text: 'Loans', icon: <AttachMoney />, path: '/admin/loans', active: location.pathname === '/admin/loans' },
    { text: 'Vaults', icon: <Security />, path: '/admin/vaults', active: location.pathname === '/admin/vaults' || location.pathname === '/admin/dashboard' },
    { text: 'Portfolio', icon: <PieChart />, path: '/admin/portfolio', active: location.pathname === '/admin/portfolio' },
    { text: 'Liquidity pools', icon: <ShowChart />, path: '/admin/liquidity', active: location.pathname === '/admin/liquidity' },
    { text: 'Swap', icon: <BarChart />, path: '/admin/swap', active: location.pathname === '/admin/swap' },
  ];

  // Profile menu
  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          borderRadius: '12px',
          background: currentTheme.surface,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.secondary}40`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1)`,
          minWidth: 200,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem sx={{ borderRadius: '8px', m: 1 }}>
        <ListItemIcon>
          <Person fontSize="small" sx={{ color: colors.accent }} />
        </ListItemIcon>
        <ListItemText primary="My Profile" primaryTypographyProps={{ color: currentTheme.textPrimary }} />
      </MenuItem>
      <MenuItem sx={{ borderRadius: '8px', m: 1 }}>
        <ListItemIcon>
          <Settings fontSize="small" sx={{ color: colors.accent }} />
        </ListItemIcon>
        <ListItemText primary="Account Settings" primaryTypographyProps={{ color: currentTheme.textPrimary }} />
      </MenuItem>
      <Divider sx={{ my: 1 }} />
      <MenuItem sx={{ borderRadius: '8px', m: 1 }}>
        <ListItemIcon>
          <Logout fontSize="small" sx={{ color: colors.accent }} />
        </ListItemIcon>
        <ListItemText primary="Logout" primaryTypographyProps={{ color: currentTheme.textPrimary }} />
      </MenuItem>
    </Menu>
  );

  // Notifications menu
  const notificationsMenu = (
    <Menu
      anchorEl={notificationAnchorEl}
      open={Boolean(notificationAnchorEl)}
      onClose={handleNotificationMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          borderRadius: '12px',
          background: currentTheme.surface,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.secondary}40`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1)`,
          minWidth: 320,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} color={currentTheme.textPrimary}>
          Notifications
        </Typography>
      </Box>
      <Divider />
      <MenuItem sx={{ borderRadius: '8px', m: 1 }}>
        <ListItemIcon>
          <CheckCircle fontSize="small" sx={{ color: 'success.main' }} />
        </ListItemIcon>
        <ListItemText 
          primary="Content created successfully" 
          secondary="Introduction to AI" 
          primaryTypographyProps={{ color: currentTheme.textPrimary }}
          secondaryTypographyProps={{ color: currentTheme.textSecondary }}
        />
      </MenuItem>
      <MenuItem sx={{ borderRadius: '8px', m: 1 }}>
        <ListItemIcon>
          <AccessTime fontSize="small" sx={{ color: 'info.main' }} />
        </ListItemIcon>
        <ListItemText 
          primary="Quiz completion reminder" 
          secondary="Machine Learning Basics" 
          primaryTypographyProps={{ color: currentTheme.textPrimary }}
          secondaryTypographyProps={{ color: currentTheme.textSecondary }}
        />
      </MenuItem>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Button 
          size="small" 
          sx={{ 
            color: colors.accent,
            '&:hover': { backgroundColor: `${colors.secondary}30` }
          }}
        >
          View All Notifications
        </Button>
      </Box>
    </Menu>
  );

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ background: currentTheme.primary }}
      >
        <Box textAlign="center">
          <CircularProgress 
            size={60} 
            sx={{ color: colors.accent, mb: 2 }} 
          />
          <Typography variant="h6" sx={{ color: currentTheme.textPrimary }}>
            Loading your dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: currentTheme.primary }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: currentTheme.surface,
          backdropFilter: 'blur(20px)',
          boxShadow: `0 4px 20px rgba(0, 0, 0, 0.05)`,
          borderBottom: `1px solid ${colors.secondary}30`,
          color: currentTheme.textPrimary,
        }}
        elevation={0}
      >
        <Toolbar>
          {/* Menu Button */}
          <IconButton
            edge="start"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ 
              mr: 2, 
              color: colors.accent,
              '&:hover': {
                backgroundColor: `${colors.secondary}40`,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Logo */}
          <Box display="flex" alignItems="center" sx={{ flexGrow: { xs: 1, md: 0 } }}>
            <School sx={{ mr: 1, color: colors.accent, fontSize: 32 }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              color: colors.accent,
              display: { xs: 'none', sm: 'block' }
            }}>
              EduPatch
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <TextField
              placeholder="Search content, quizzes..."
              size="small"
              sx={{ 
                width: '50%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: `${colors.secondary}60`,
                  '&:hover': {
                    borderColor: colors.secondary,
                  },
                  '&.Mui-focused': {
                    borderColor: colors.accent,
                  }
                },
                '& .MuiInputBase-input': {
                  color: currentTheme.textPrimary,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: currentTheme.textSecondary }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Dark/Light Mode Toggle */}
            <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
              <IconButton 
                onClick={toggleDarkMode}
                sx={{ 
                  color: currentTheme.textPrimary,
                  '&:hover': {
                    backgroundColor: `${colors.secondary}40`,
                  }
                }}
              >
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton 
                onClick={handleNotificationMenuOpen}
                sx={{ 
                  mx: 1,
                  color: currentTheme.textPrimary,
                  '&:hover': {
                    backgroundColor: `${colors.secondary}40`,
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile Avatar */}
            <Tooltip title="Account">
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ 
                  ml: 1,
                  '&:hover': {
                    backgroundColor: `${colors.secondary}40`,
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    background: `linear-gradient(45deg, ${colors.accent}, ${colors.secondary})`,
                  }}
                >
                  M
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? sidebarWidth : miniSidebarWidth,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? sidebarWidth : miniSidebarWidth,
            boxSizing: 'border-box',
            background: currentTheme.surface,
            backdropFilter: 'blur(20px)',
            borderRight: `1px solid ${colors.secondary}30`,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '12px',
                  mx: 1,
                  mb: 1,
                  px: 2,
                  py: 1.5,
                  background: item.active ? `${colors.secondary}40` : 'transparent',
                  color: item.active ? colors.accent : currentTheme.textSecondary,
                  '&:hover': {
                    background: `${colors.secondary}30`,
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40, 
                  color: item.active ? colors.accent : currentTheme.textSecondary 
                }}>
                  {item.icon}
                </ListItemIcon>
                {sidebarOpen && (
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: item.active ? 600 : 400,
                      fontSize: '0.95rem',
                    }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${sidebarOpen ? sidebarWidth : miniSidebarWidth}px)` },
          ml: { sm: `${sidebarOpen ? sidebarWidth : miniSidebarWidth}px` },
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Toolbar />
        
        <Container maxWidth="xl">
          {/* Welcome Section with Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card 
              sx={{
                mb: 4,
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
                color: 'white',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      Welcome back, Mahika! 👋
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                      Your AI-powered learning platform is ready
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                      {pages.length} content pieces created • {pages.length * 5} AI quizzes generated
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                    {/* Lottie animation would go here */}
                    <Box 
                      sx={{ 
                        width: 180, 
                        height: 180, 
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <School sx={{ fontSize: 80, color: 'white' }} />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Cards with Glassmorphism */}
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3, 
              fontWeight: 600, 
              color: currentTheme.textPrimary,
              pl: 1
            }}
          >
            Dashboard Overview
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { title: 'Total Pages', value: pages.length, icon: <MenuBook />, color: colors.accent },
              { title: 'Quizzes Created', value: pages.length * 5, icon: <Quiz />, color: colors.secondary },
              { title: 'AI Summaries', value: pages.length, icon: <AutoAwesome />, color: colors.accent },
              { title: 'Active Users', value: 42, icon: <Person />, color: colors.secondary },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ 
                    p: 3, 
                    borderRadius: '16px', 
                    background: `rgba(${darkMode ? '255, 255, 255, 0.05' : '255, 255, 255, 0.8'})`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${colors.secondary}30`,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 12px 40px rgba(0, 0, 0, 0.1)`,
                      border: `1px solid ${colors.secondary}60`,
                    }
                  }}>
                    <Box sx={{ 
                      color: stat.color, 
                      mb: 2,
                      p: 1.5,
                      borderRadius: '12px',
                      background: `${stat.color}20`,
                      display: 'inline-flex',
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        color: currentTheme.textPrimary, 
                        mb: 1 
                      }}
                    >
                      <CountUp end={stat.value} duration={2} />
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: currentTheme.textSecondary, 
                        fontWeight: 500 
                      }}
                    >
                      {stat.title}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Quick Actions Row */}
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3, 
              fontWeight: 600, 
              color: currentTheme.textPrimary,
              pl: 1
            }}
          >
            Quick Actions
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { title: 'Create Page', icon: <Create />, color: colors.accent, path: '/admin/create' },
              { title: 'Generate Quiz', icon: <Quiz />, color: colors.secondary, path: '/admin/quizzes' },
              { title: 'Test QR Code', icon: <QrCode />, color: colors.accent, path: '/admin/qr-generator' },
              { title: 'Sync Offline', icon: <CloudDownload />, color: colors.secondary, path: '/admin/cache' },
            ].map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={action.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={action.icon}
                    onClick={() => navigate(action.path)}
                    sx={{
                      py: 3,
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, ${action.color}, ${action.color}90)`,
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: `0 8px 25px ${action.color}40`,
                      '&:hover': { 
                        background: `linear-gradient(135deg, ${action.color}90, ${action.color})`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 30px ${action.color}60`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {action.title}
                  </Button>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity and Analytics */}
          <Grid container spacing={4}>
            {/* Recent Activity Timeline */}
            <Grid item xs={12} md={5} lg={4}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card sx={{ 
                  borderRadius: '16px',
                  background: `rgba(${darkMode ? '255, 255, 255, 0.05' : '255, 255, 255, 0.8'})`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${colors.secondary}30`,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                  height: '100%',
                }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 600, 
                        color: currentTheme.textPrimary,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Timeline sx={{ mr: 1, color: colors.accent }} />
                      Recent Activity
                    </Typography>
                    
                    <Box>
                      {recentActivities.map((activity, index) => (
                        <Box 
                          key={activity.id}
                          sx={{ 
                            display: 'flex', 
                            mb: index !== recentActivities.length - 1 ? 3 : 0,
                            pb: index !== recentActivities.length - 1 ? 3 : 0,
                            borderBottom: index !== recentActivities.length - 1 ? `1px solid ${colors.secondary}30` : 'none',
                          }}
                        >
                          <Avatar 
                            sx={{ 
                              bgcolor: `${colors.secondary}30`,
                              color: colors.accent,
                              mr: 2,
                            }}
                          >
                            {activity.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: currentTheme.textPrimary }}>
                              {activity.action}
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.accent }}>
                              {activity.page}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              display="block" 
                              sx={{ color: currentTheme.textSecondary, mt: 0.5 }}
                            >
                              {activity.time}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            {/* Analytics Section */}
            <Grid item xs={12} md={7} lg={8}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Grid container spacing={3}>
                  {/* Weekly Content Chart */}
                  <Grid item xs={12} lg={6}>
                    <Card sx={{ 
                      borderRadius: '16px',
                      background: `rgba(${darkMode ? '255, 255, 255, 0.05' : '255, 255, 255, 0.8'})`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${colors.secondary}30`,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                      height: '100%',
                    }}>
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 3, 
                            fontWeight: 600, 
                            color: currentTheme.textPrimary 
                          }}
                        >
                          Content Created per Week
                        </Typography>
                        <Box sx={{ height: 250 }}>
                          <Line data={weeklyContentData} options={chartOptions} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Quiz Completion Chart */}
                  <Grid item xs={12} lg={6}>
                    <Card sx={{ 
                      borderRadius: '16px',
                      background: `rgba(${darkMode ? '255, 255, 255, 0.05' : '255, 255, 255, 0.8'})`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${colors.secondary}30`,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                      height: '100%',
                    }}>
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 3, 
                            fontWeight: 600, 
                            color: currentTheme.textPrimary 
                          }}
                        >
                          Quiz Completion Rate
                        </Typography>
                        <Box sx={{ height: 250 }}>
                          <Bar data={quizCompletionData} options={chartOptions} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
          
          {/* Footer */}
          <Box 
            sx={{ 
              mt: 6, 
              pt: 3, 
              pb: 2,
              borderTop: `1px solid ${colors.secondary}30`,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: currentTheme.textSecondary }}>
              EduPatch © 2025 | Built with ❤️ by Mahika & Team
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Profile Menu */}
      {profileMenu}
      
      {/* Notifications Menu */}
      {notificationsMenu}

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            borderRadius: '12px',
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard ;

