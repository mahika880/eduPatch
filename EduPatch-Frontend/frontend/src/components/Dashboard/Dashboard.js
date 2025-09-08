import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CardActions,
  CircularProgress,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  TextField,
  InputAdornment,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  MenuBook,
  Quiz,
  QrCode,
  Visibility,
  AutoAwesome,
  Dashboard as DashboardIcon,
  Create,
  Settings,
  Notifications,
  Search,
  Menu,
  School,
  CloudDownload,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

const Dashboard = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Sunset Color Palette
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
  };

  const sidebarWidth = 280;
  const miniSidebarWidth = 70;

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await apiService.getAllPages();
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sidebarItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard', active: true },
    { text: 'Create Content', icon: <Create />, path: '/admin/create' },
    { text: 'Manage Quizzes', icon: <Quiz />, path: '/admin/quizzes' },
    { text: 'Offline Cache', icon: <CloudDownload />, path: '/admin/cache' },
    { text: 'Settings', icon: <Settings />, path: '/admin/settings' },
  ];

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{
          background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.lightest} 100%)`,
        }}
      >
        <Box textAlign="center">
          <CircularProgress 
            size={60} 
            sx={{ color: colors.primary, mb: 2 }} 
          />
          <Typography variant="h6" sx={{ color: colors.primary }}>
            Loading your dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colors.light}`,
          boxShadow: `0 4px 20px ${colors.primary}10`,
          color: colors.primary,
        }}
      >
        <Toolbar>
          {/* Menu Button */}
          <IconButton
            edge="start"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ 
              mr: 2, 
              color: colors.primary,
              '&:hover': {
                backgroundColor: `${colors.accent}40`,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Menu />
          </IconButton>
          
          {/* Logo */}
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <School sx={{ mr: 1, color: colors.secondary, fontSize: 32 }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              EduPatch AI
            </Typography>
          </Box>

          {/* Search Bar */}
          <TextField
            placeholder="Search content, quizzes..."
            size="small"
            sx={{ 
              mr: 2, 
              minWidth: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                background: colors.lightest,
                borderColor: colors.light,
                '&:hover': {
                  borderColor: colors.accent,
                },
                '&.Mui-focused': {
                  borderColor: colors.secondary,
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: colors.secondary }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Notifications */}
          <IconButton sx={{ 
            mr: 2, 
            color: colors.primary,
            '&:hover': {
              backgroundColor: `${colors.accent}40`,
            }
          }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Profile Avatar */}
          <Avatar sx={{ 
            background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
          }}>
            A
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Foldable Left Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? sidebarWidth : miniSidebarWidth,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? sidebarWidth : miniSidebarWidth,
            boxSizing: 'border-box',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: `1px solid ${colors.light}`,
            boxShadow: `4px 0 20px ${colors.primary}10`,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar /> {/* Spacer for top navbar */}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Sidebar Toggle Button */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: sidebarOpen ? 'flex-end' : 'center',
            p: 1,
            borderBottom: `1px solid ${colors.light}`,
          }}>
            <IconButton
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{
                color: colors.secondary,
                '&:hover': {
                  backgroundColor: `${colors.accent}40`,
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Box>

          {/* User Info - Only show when expanded */}
          {sidebarOpen && (
            <Box sx={{ 
              p: 2,
              borderBottom: `1px solid ${colors.light}`,
            }}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 2, 
                borderRadius: 3,
                background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.lightest} 100%)`,
              }}>
                <Avatar sx={{ 
                  width: 50, 
                  height: 50, 
                  mx: 'auto', 
                  mb: 1,
                  background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                }}>
                  A
                </Avatar>
                <Typography variant="subtitle1" sx={{ color: colors.primary, fontWeight: 600 }}>
                  Admin User
                </Typography>
                <Typography variant="caption" sx={{ color: colors.secondary }}>
                  Content Creator
                </Typography>
              </Box>
            </Box>
          )}

          {/* Mini User Avatar - Only show when collapsed */}
          {!sidebarOpen && (
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              borderBottom: `1px solid ${colors.light}`,
            }}>
              <Tooltip title="Admin User" placement="right">
                <Avatar sx={{ 
                  width: 40, 
                  height: 40,
                  background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                }}>
                  A
                </Avatar>
              </Tooltip>
            </Box>
          )}

          {/* Navigation Menu */}
          <Box sx={{ flexGrow: 1, p: sidebarOpen ? 2 : 1 }}>
            {sidebarOpen && (
              <Typography variant="overline" sx={{ 
                color: colors.secondary, 
                fontWeight: 600,
                px: 2,
                mb: 1,
                display: 'block'
              }}>
                Navigation
              </Typography>
            )}
            
            <List sx={{ p: 0 }}>
              {sidebarItems.map((item, index) => (
                <Tooltip 
                  key={item.text}
                  title={!sidebarOpen ? item.text : ''} 
                  placement="right"
                  arrow
                >
                  <ListItem 
                    button 
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      minHeight: 48,
                      justifyContent: sidebarOpen ? 'initial' : 'center',
                      px: sidebarOpen ? 2 : 1.5,
                      background: item.active ? `${colors.accent}40` : 'transparent',
                      color: item.active ? colors.primary : colors.secondary,
                      '&:hover': {
                        background: `${colors.accent}60`,
                        color: colors.primary,
                        transform: sidebarOpen ? 'translateX(4px)' : 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <ListItemIcon sx={{ 
                      color: 'inherit',
                      minWidth: sidebarOpen ? 40 : 'auto',
                      mr: sidebarOpen ? 2 : 0,
                      justifyContent: 'center',
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    {sidebarOpen && (
                      <ListItemText 
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: item.active ? 600 : 500,
                          fontSize: '0.95rem'
                        }}
                      />
                    )}
                  </ListItem>
                </Tooltip>
              ))}
            </List>
          </Box>

          {/* Quick Stats - Only show when expanded */}
          {sidebarOpen && (
            <Box sx={{ 
              p: 2,
              borderTop: `1px solid ${colors.light}`,
            }}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 3,
                background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`,
              }}>
                <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                  📊 Quick Stats
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="caption" sx={{ color: colors.secondary }}>
                    Content Created
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.primary, fontWeight: 600 }}>
                    {pages.length}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: colors.secondary }}>
                    AI Quizzes
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.primary, fontWeight: 600 }}>
                    {pages.length * 5}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.lightest} 100%)`,
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
          marginLeft: 0, // Remove margin since we're using permanent drawer
        }}
      >
        <Toolbar /> {/* Spacer for top navbar */}
        
        <Container maxWidth="xl">
          {/* Welcome Header */}
          <Card sx={{
            mb: 4,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: 'white',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              transform: 'translate(50px, -50px)',
            }
          }}>
            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                Welcome back, Admin! 👋
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                Your AI-powered learning platform is ready
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                {pages.length} content pieces created • {pages.length * 5} AI quizzes generated
              </Typography>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ mb: 4, p: 3, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: colors.primary }}>
              🚀 Quick Actions
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<Create />}
                  onClick={() => navigate('/admin/create')}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    background: colors.primary,
                    '&:hover': { 
                      background: colors.secondary,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${colors.primary}40`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Create Content
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<Quiz />}
                  onClick={() => navigate('/admin/quizzes')}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    background: colors.secondary,
                    '&:hover': { 
                      background: colors.primary,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${colors.secondary}40`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Manage Quizzes
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<CloudDownload />}
                  onClick={() => navigate('/admin/cache')}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    background: colors.accent,
                    color: colors.primary,
                    '&:hover': { 
                      background: colors.light,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${colors.accent}40`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Offline Cache
                </Button>
              </Grid>
            </Grid>
          </Card>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { title: 'Total Content', value: pages.length, icon: <MenuBook />, color: colors.primary },
              { title: 'AI Quizzes', value: pages.length * 5, icon: <Quiz />, color: colors.secondary },
              { title: 'Success Rate', value: '98%', icon: <AutoAwesome />, color: colors.accent },
              { title: 'AI Generated', value: '100%', icon: <AutoAwesome />, color: colors.primary },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <Card sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px ${stat.color}20`,
                  }
                }}>
                  <Box sx={{ 
                    color: stat.color, 
                    mb: 2,
                    p: 2,
                    borderRadius: '50%',
                    background: `${stat.color}10`,
                    display: 'inline-flex',
                  }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 500 }}>
                    {stat.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Content Grid */}
          {pages.length === 0 ? (
            <Card sx={{ textAlign: 'center', p: 6, borderRadius: 3 }}>
              <AutoAwesome sx={{ fontSize: 80, mb: 2, color: colors.accent }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: colors.primary }}>
                Ready to Create Amazing Content?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: colors.secondary }}>
                Start by creating your first AI-powered educational content!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Create />}
                onClick={() => navigate('/admin/create')}
                sx={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${colors.primary}40`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Create Your First Content
              </Button>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {pages.map((page, index) => (
                <Grid item xs={12} md={6} lg={4} key={page.pageId}>
                  <Card sx={{ 
                    borderRadius: 3, 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 30px ${colors.primary}15`,
                    }
                  }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <MenuBook sx={{ mr: 1, color: colors.secondary }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary }}>
                          {page.chapter}
                        </Typography>
                      </Box>
                      
                      <Chip 
                        label={`Page ${page.pageNumber}`} 
                        size="small" 
                        sx={{ mb: 2, backgroundColor: colors.light, color: colors.primary }}
                      />
                      
                      <Typography variant="body2" sx={{ color: colors.secondary, mb: 2 }}>
                        {page.content.substring(0, 150)}...
                      </Typography>
                      
                      {page.summary && (
                        <Box sx={{ p: 2, background: colors.lightest, borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ color: colors.primary }}>
                            <AutoAwesome sx={{ fontSize: 14, mr: 1 }} />
                            AI Summary: {page.summary.substring(0, 60)}...
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                    
                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => navigate(`/page/${page.pageId}`)}
                        sx={{ color: colors.primary }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Quiz />}
                        onClick={() => navigate(`/quiz/${page.pageId}`)}
                        sx={{ color: colors.secondary }}
                      >
                        Quiz
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;