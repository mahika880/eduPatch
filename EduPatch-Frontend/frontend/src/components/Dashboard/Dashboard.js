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
  Switch,
  FormControlLabel,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  MenuBook,
  Quiz,
  QrCode,
  Visibility,
  AutoAwesome,
  TrendingUp,
  Dashboard as DashboardIcon,
  Create,
  Settings,
  Notifications,
  Search,
  Menu,
  School,
  CloudDownload,
  EmojiEvents,
  Speed,
  Psychology,
  Timeline,
  Add,
  QrCodeScanner,
  Lightbulb,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { apiService } from '../../services/api';

const Dashboard = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

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
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Create Content', icon: <Create />, path: '/admin/create' },
    { text: 'Manage Quizzes', icon: <Quiz />, path: '/admin/quizzes' },
    { text: 'Offline Cache', icon: <CloudDownload />, path: '/admin/cache' },
    { text: 'Settings', icon: <Settings />, path: '/admin/settings' },
  ];

  const quickActions = [
    { title: 'Create Content', icon: <Create />, color: '#FF6B6B', action: () => navigate('/admin/create') },
    { title: 'Generate Quiz', icon: <Psychology />, color: '#4ECDC4', action: () => navigate('/admin/create') },
    { title: 'Scan QR Code', icon: <QrCodeScanner />, color: '#45B7D1', action: () => navigate('/admin/scanner') },
  ];

  const recentActivities = [
    { type: 'content', title: 'Physics Chapter 1 created', time: '2 hours ago', icon: <MenuBook /> },
    { type: 'quiz', title: '5 AI quizzes generated', time: '4 hours ago', icon: <Psychology /> },
    { type: 'qr', title: 'QR codes generated', time: '1 day ago', icon: <QrCode /> },
  ];

  const achievements = [
    { title: 'AI Powered', icon: <AutoAwesome />, color: '#FFD93D' },
    { title: 'Content Creator', icon: <Create />, color: '#6BCF7F' },
    { title: 'Quiz Master', icon: <EmojiEvents />, color: '#4D96FF' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{
          background: darkMode 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box textAlign="center">
            <CircularProgress 
              size={80} 
              sx={{ 
                color: '#FFFFFF',
                mb: 3,
              }} 
            />
            <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 300 }}>
              Loading your AI-powered dashboard...
            </Typography>
          </Box>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      background: darkMode 
        ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: darkMode 
          ? 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
          : 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
      }
    }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: 1201,
          background: darkMode 
            ? 'rgba(26, 26, 46, 0.9)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ mr: 2, color: darkMode ? '#fff' : '#333' }}
          >
            <Menu />
          </IconButton>
          
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <School sx={{ mr: 1, color: '#667eea', fontSize: 32 }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              EduPatch AI
            </Typography>
          </Box>

          <TextField
            placeholder="Search content, quizzes..."
            size="small"
            sx={{ 
              mr: 2, 
              minWidth: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: darkMode ? '#fff' : '#666' }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                icon={<LightMode />}
                checkedIcon={<DarkMode />}
              />
            }
            label=""
            sx={{ mr: 2 }}
          />

          <IconButton sx={{ mr: 2, color: darkMode ? '#fff' : '#333' }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Avatar sx={{ 
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            cursor: 'pointer'
          }}>
            A
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            background: darkMode 
              ? 'rgba(26, 26, 46, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: darkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            mt: 8,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ 
            mb: 2, 
            color: darkMode ? '#fff' : '#333',
            fontWeight: 600 
          }}>
            Navigation
          </Typography>
          <List>
            {sidebarItems.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem 
                  button 
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    '&:hover': {
                      background: darkMode 
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(102, 126, 234, 0.1)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: darkMode ? '#fff' : '#667eea' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ color: darkMode ? '#fff' : '#333' }}
                  />
                </ListItem>
              </motion.div>
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
          mt: 8,
          ml: sidebarOpen ? 0 : -35,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Card */}
            <motion.div variants={itemVariants}>
              <Card sx={{
                mb: 4,
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: darkMode 
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
              }}>
                <Box sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  p: 4,
                  color: 'white',
                  position: 'relative',
                }}>
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                        Welcome back, Admin! 👋
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                        Your AI-powered learning platform is ready to create amazing content
                      </Typography>
                      
                      {/* Progress Bar */}
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Content Creation Progress
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={Math.min((pages.length / 10) * 100, 100)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#FFD93D',
                            }
                          }}
                        />
                        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                          {pages.length}/10 content pieces created
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {achievements.map((achievement, index) => (
                          <motion.div
                            key={achievement.title}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <Chip
                              icon={achievement.icon}
                              label={achievement.title}
                              sx={{
                                backgroundColor: achievement.color,
                                color: 'white',
                                fontWeight: 600,
                              }}
                            />
                          </motion.div>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={itemVariants}>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                  { title: 'Total Content', value: pages.length, icon: <MenuBook />, color: '#FF6B6B' },
                  { title: 'AI Quizzes', value: pages.length * 5, icon: <Psychology />, color: '#4ECDC4' },
                  { title: 'Success Rate', value: 98, icon: <TrendingUp />, color: '#45B7D1', suffix: '%' },
                  { title: 'AI Generated', value: 100, icon: <AutoAwesome />, color: '#96CEB4', suffix: '%' },
                ].map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={stat.title}>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Card sx={{
                        p: 3,
                        background: darkMode 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: darkMode 
                          ? '1px solid rgba(255, 255, 255, 0.1)'
                          : '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: `0 20px 40px ${stat.color}30`,
                          transform: 'translateY(-5px)',
                        }
                      }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box>
                            <Typography variant="h3" sx={{ 
                              fontWeight: 700, 
                              color: darkMode ? '#fff' : '#333',
                              mb: 1 
                            }}>
                              <CountUp 
                                end={stat.value} 
                                duration={2} 
                                suffix={stat.suffix || ''}
                              />
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#666',
                              fontWeight: 500 
                            }}>
                              {stat.title}
                            </Typography>
                          </Box>
                          <Box sx={{
                            p: 2,
                            borderRadius: '50%',
                            backgroundColor: `${stat.color}20`,
                            color: stat.color,
                          }}>
                            {stat.icon}
                          </Box>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card sx={{
                mb: 4,
                p: 3,
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: darkMode 
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
              }}>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  fontWeight: 600,
                  color: darkMode ? '#fff' : '#333'
                }}>
                  🚀 Quick Actions
                </Typography>
                <Grid container spacing={3}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={12} md={4} key={action.title}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          startIcon={action.icon}
                          onClick={action.action}
                          sx={{
                            py: 2,
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${action.color}, ${action.color}dd)`,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            boxShadow: `0 8px 32px ${action.color}40`,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${action.color}dd, ${action.color})`,
                              boxShadow: `0 12px 40px ${action.color}60`,
                            }
                          }}
                        >
                          {action.title}
                        </Button>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </motion.div>

            {/* Recent Activity & Content Grid */}
            <Grid container spacing={3}>
              {/* Recent Activity */}
              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <Card sx={{
                    p: 3,
                    background: darkMode 
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: darkMode 
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 3,
                    height: 'fit-content',
                  }}>
                    <Typography variant="h6" sx={{ 
                      mb: 3, 
                      fontWeight: 600,
                      color: darkMode ? '#fff' : '#333'
                    }}>
                      📈 Recent Activity
                    </Typography>
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                          <Box sx={{
                            p: 1,
                            borderRadius: '50%',
                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                            mr: 2,
                            color: '#667eea'
                          }}>
                            {activity.icon}
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ 
                              fontWeight: 500,
                              color: darkMode ? '#fff' : '#333'
                            }}>
                              {activity.title}
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              color: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#666'
                            }}>
                              {activity.time}
                            </Typography>
                          </Box>
                        </Box>
                        {index < recentActivities.length - 1 && <Divider sx={{ my: 1 }} />}
                      </motion.div>
                    ))}
                  </Card>
                </motion.div>
              </Grid>

              {/* Content Grid */}
              <Grid item xs={12} md={8}>
                <motion.div variants={itemVariants}>
                  {pages.length === 0 ? (
                    <Card sx={{
                      textAlign: 'center',
                      p: 6,
                      background: darkMode 
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(20px)',
                      border: darkMode 
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                    }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Lightbulb sx={{ 
                          fontSize: 80, 
                          mb: 2, 
                          color: '#FFD93D'
                        }} />
                        <Typography variant="h4" gutterBottom sx={{ 
                          fontWeight: 600,
                          color: darkMode ? '#fff' : '#333'
                        }}>
                          Ready to Create Amazing Content?
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          mb: 3,
                          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#666'
                        }}>
                          Start by creating your first AI-powered educational content!
                        </Typography>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<Add />}
                          onClick={() => navigate('/admin/create')}
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 600,
                            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 12px 40px rgba(102, 126, 234, 0.6)',
                            },
                          }}
                        >
                          Create Your First Content
                        </Button>
                      </motion.div>
                    </Card>
                  ) : (
                    <Grid container spacing={3}>
                      {pages.slice(0, 4).map((page, index) => (
                        <Grid item xs={12} sm={6} key={page.pageId}>
                          <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                          >
                            <Card sx={{
                              height: '100%',
                              background: darkMode 
                                ? 'rgba(255, 255, 255, 0.05)'
                                : 'rgba(255, 255, 255, 0.9)',
                              backdropFilter: 'blur(20px)',
                              border: darkMode 
                                ? '1px solid rgba(255, 255, 255, 0.1)'
                                : '1px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: 3,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
                                transform: 'translateY(-5px)',
                              }
                            }}>
                              <CardContent sx={{ p: 3 }}>
                                <Box display="flex" alignItems="center" mb={2}>
                                  <MenuBook sx={{ 
                                    mr: 1, 
                                    color: '#667eea'
                                  }} />
                                  <Typography variant="h6" sx={{ 
                                    fontWeight: 600,
                                    color: darkMode ? '#fff' : '#333'
                                  }}>
                                    {page.chapter}
                                  </Typography>
                                </Box>
                                
                                <Chip 
                                  label={`Page ${page.pageNumber}`} 
                                  size="small" 
                                  sx={{
                                    mb: 2,
                                    backgroundColor: '#667eea20',
                                    color: '#667eea',
                                    fontWeight: 600,
                                  }}
                                />
                                
                                <Typography variant="body2" sx={{ 
                                  lineHeight: 1.6,
                                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#666',
                                  mb: 2
                                }}>
                                  {page.content.substring(0, 100)}...
                                </Typography>
                                
                                {page.summary && (
                                  <Box sx={{ 
                                    p: 2, 
                                    background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                                    borderRadius: 2,
                                    mb: 2
                                  }}>
                                    <Typography variant="caption" sx={{ 
                                      fontWeight: 600,
                                      color: '#667eea'
                                    }}>
                                      <AutoAwesome sx={{ fontSize: 14, mr: 1, verticalAlign: 'middle' }} />
                                      AI Summary: {page.summary.substring(0, 60)}...
                                    </Typography>
                                  </Box>
                                )}
                              </CardContent>
                              
                              <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
                                <Button
                                  size="small"
                                  startIcon={<Visibility />}
                                  onClick={() => navigate(`/page/${page.pageId}`)}
                                  sx={{ 
                                    color: '#667eea',
                                    '&:hover': {
                                      backgroundColor: '#667eea20',
                                    }
                                  }}
                                >
                                  View
                                </Button>
                                <Button
                                  size="small"
                                  startIcon={<Quiz />}
                                  onClick={() => navigate(`/quiz/${page.pageId}`)}
                                  sx={{ 
                                    color: '#764ba2',
                                    '&:hover': {
                                      backgroundColor: '#764ba220',
                                    }
                                  }}
                                >
                                  Quiz
                                </Button>
                              </CardActions>
                            </Card>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/admin/create')}
            sx={{
              borderRadius: '50%',
              width: 64,
              height: 64,
              minWidth: 64,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.6)',
              },
            }}
          >
            <Add sx={{ fontSize: 28 }} />
          </Button>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Dashboard;