import React, { useState, useEffect } from 'react';
import {
  Box,
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
  Tooltip,
  Typography,
} from '@mui/material';
import {
  MenuBook,
  Quiz,
  QrCode,
  Dashboard as DashboardIcon,
  Create,
  Settings,
  Notifications,
  Search,
  Menu,
  School,
  CloudDownload,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../../services/api';

// Sunset Color Palette
const colors = {
  primary: '#493129',
  secondary: '#8b597b',
  accent: '#e1c3d0',
  light: '#f5e6d3',
  lightest: '#faf5f0',
};

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
    }
  };

  const sidebarItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Create Content', icon: <Create />, path: '/admin/create' },
    { text: 'Manage Quizzes', icon: <Quiz />, path: '/admin/quizzes' },
    { text: 'QR Scanner', icon: <QrCode />, path: '/admin/qr-scanner' },
    { text: 'Offline Cache', icon: <CloudDownload />, path: '/admin/cache' },
    { text: 'Settings', icon: <Settings />, path: '/admin/settings' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 4px 20px ${colors.primary}10`,
          borderBottom: `1px solid ${colors.light}`,
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
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* User Profile Section - Only show when expanded */}
          {sidebarOpen && (
            <Box sx={{ 
              p: 3, 
              borderBottom: `1px solid ${colors.light}`,
              background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light}40 100%)`,
            }}>
              <Box sx={{ 
                textAlign: 'center',
                p: 2,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.7)',
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
              {sidebarItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
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
                        background: isActive ? `${colors.accent}40` : 'transparent',
                        color: isActive ? colors.primary : colors.secondary,
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
                            fontWeight: isActive ? 600 : 500,
                            fontSize: '0.95rem'
                          }}
                        />
                      )}
                    </ListItem>
                  </Tooltip>
                );
              })}
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
          background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.lightest} 100%)`,
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Toolbar /> {/* Spacer for top navbar */}
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;