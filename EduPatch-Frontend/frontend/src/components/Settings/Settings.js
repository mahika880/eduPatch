import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Container,
  Fade,
  Slide,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Person,
  Security,
  Notifications,
  Palette,
  Language,
  Storage,
  CloudSync,
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  Delete,
  Backup,
  Download,
  Upload,
  Brightness4,
  Brightness7,
  VolumeUp,
  VolumeOff,
} from '@mui/icons-material';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@edupatch.com',
    phone: '+1 (555) 123-4567',
    role: 'Content Creator',
    avatar: null,
  });
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      quiz: true,
      content: true,
      sound: true,
    },
    appearance: {
      darkMode: false,
      compactMode: false,
      animations: true,
    },
    privacy: {
      profileVisible: true,
      analyticsEnabled: true,
      dataSharing: false,
    },
    system: {
      autoSave: true,
      offlineMode: true,
      cacheSize: '500MB',
      language: 'English',
    },
  });
  const [editMode, setEditMode] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showPassword, setShowPassword] = useState(false);

  // Sunset Color Palette
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileSave = () => {
    setEditMode(false);
    showSnackbar('Profile updated successfully! 👤', 'success');
  };

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
    showSnackbar('Settings updated! ⚙️', 'success');
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`settings-tabpanel-${index}`}
        aria-labelledby={`settings-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ py: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ p: 3 }}>
      {/* Header */}
      <Fade in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: 'white',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <SettingsIcon sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  Settings ⚙️
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Customize your EduPatch AI experience
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Manage your profile, preferences, and system settings
            </Typography>
          </CardContent>
        </Paper>
      </Fade>

      {/* Settings Tabs */}
      <Slide direction="up" in={true} timeout={1000}>
        <Card
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${colors.accent}40`,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  color: colors.secondary,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&.Mui-selected': {
                    color: colors.primary,
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: colors.secondary,
                  height: 3,
                },
              }}
            >
              <Tab icon={<Person />} label="Profile" />
              <Tab icon={<Security />} label="Security" />
              <Tab icon={<Notifications />} label="Notifications" />
              <Tab icon={<Palette />} label="Appearance" />
              <Tab icon={<Storage />} label="Data & Storage" />
            </Tabs>
          </Box>

          {/* Profile Tab */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    background: `${colors.accent}15`,
                    border: `1px solid ${colors.accent}40`,
                    borderRadius: 3,
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Box position="relative" display="inline-block" mb={3}>
                    <Avatar
                      sx={
                        {
                          width: 120,
                          height: 120,
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          fontSize: '3rem',
                          fontWeight: 700,
                        }
                      }
                    >
                      {profileData.name.charAt(0)}
                    </Avatar>
                    <IconButton
                      sx={
                        {
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          background: colors.accent,
                          color: colors.primary,
                          '&:hover': {
                            background: colors.secondary,
                            color: 'white',
                          },
                        }
                      }
                    >
                      <PhotoCamera />
                    </IconButton>
                  </Box>
                  <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                    {profileData.name}
                  </Typography>
                  <Chip
                    label={profileData.role}
                    sx={
                      {
                        background: colors.light,
                        color: colors.primary,
                        fontWeight: 600,
                      }
                    }
                  />
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card
                  elevation={0}
                  sx={
                    {
                      background: colors.lightest,
                      border: `1px solid ${colors.light}`,
                      borderRadius: 3,
                      p: 3,
                    }
                  }
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600 }}>
                      Profile Information
                    </Typography>
                    <Button
                      variant={editMode ? 'contained' : 'outlined'}
                      startIcon={editMode ? <Save /> : <Edit />}
                      onClick={editMode ? handleProfileSave : () => setEditMode(true)}
                      sx={
                        editMode
                          ? {
                              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                            }
                          : {
                              borderColor: colors.accent,
                              color: colors.secondary,
                            }
                      }
                    >
                      {editMode ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!editMode}
                        InputProps={
                          {
                            startAdornment: <Person sx={{ color: colors.secondary, mr: 1 }} />,
                          }
                        }
                        sx={
                          {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              background: editMode ? 'white' : colors.lightest,
                            },
                          }
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!editMode}
                        InputProps={
                          {
                            startAdornment: <Email sx={{ color: colors.secondary, mr: 1 }} />,
                          }
                        }
                        sx={
                          {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              background: editMode ? 'white' : colors.lightest,
                            },
                          }
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!editMode}
                        InputProps={
                          {
                            startAdornment: <Phone sx={{ color: colors.secondary, mr: 1 }} />,
                          }
                        }
                        sx={
                          {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              background: editMode ? 'white' : colors.lightest,
                            },
                          }
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Role"
                        value={profileData.role}
                        disabled
                        sx={
                          {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              background: colors.lightest,
                            },
                          }
                        }
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={
                    {
                      background: colors.lightest,
                      border: `1px solid ${colors.light}`,
                      borderRadius: 3,
                      p: 3,
                    }
                  }
                >
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 3 }}>
                    🔐 Password & Authentication
                  </Typography>
                  <List>
                    <ListItem
                      sx={
                        {
                          background: 'white',
                          borderRadius: 2,
                          mb: 2,
                          border: `1px solid ${colors.accent}40`,
                        }
                      }
                    >
                      <ListItemIcon>
                        <Lock sx={{ color: colors.secondary }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Change Password"
                        secondary="Last changed 30 days ago"
                      />
                      <ListItemSecondaryAction>
                        <Button
                          size="small"
                          onClick={() => setPasswordDialog(true)}
                          sx={{ color: colors.secondary }}
                        >
                          Change
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                      sx={
                        {
                          background: 'white',
                          borderRadius: 2,
                          mb: 2,
                          border: `1px solid ${colors.accent}40`,
                        }
                      }
                    >
                      <ListItemIcon>
                        <Security sx={{ color: colors.secondary }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Two-Factor Authentication"
                        secondary="Add an extra layer of security"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          color="primary"
                          sx={
                            {
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: colors.secondary,
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: colors.secondary,
                              },
                            }
                          }
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={
                    {
                      background: `${colors.accent}15`,
                      border: `1px solid ${colors.accent}40`,
                      borderRadius: 3,
                      p: 3,
                    }
                  }
                >
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 3 }}>
                    🛡️ Privacy Settings
                  </Typography>
                  <List>
                    {[
                      { key: 'profileVisible', label: 'Profile Visibility', desc: 'Make profile visible to others' },
                      { key: 'analyticsEnabled', label: 'Analytics', desc: 'Help improve EduPatch with usage data' },
                      { key: 'dataSharing', label: 'Data Sharing', desc: 'Share anonymized data for research' },
                    ].map((item) => (
                      <ListItem
                        key={item.key}
                        sx={
                          {
                            background: 'white',
                            borderRadius: 2,
                            mb: 2,
                            border: `1px solid ${colors.accent}40`,
                          }
                        }
                      >
                        <ListItemText primary={item.label} secondary={item.desc} />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.privacy[item.key]}
                            onChange={(e) => handleSettingChange('privacy', item.key, e.target.checked)}
                            color="primary"
                            sx={
                              {
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: colors.secondary,
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: colors.secondary,
                                },
                              }
                            }
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={
                    {
                      background: colors.lightest,
                      border: `1px solid ${colors.light}`,
                      borderRadius: 3,
                      p: 3,
                    }
                  }
                >
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 3 }}>
                    🔔 Notification Preferences
                  </Typography>
                  <List>
                    {[
                      { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email', icon: <Email /> },
                      { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications', icon: <Notifications /> },
                      { key: 'quiz', label: 'Quiz Alerts', desc: 'New quiz completions', icon: <SettingsIcon /> },
                      { key: 'content', label: 'Content Updates', desc: 'New content creation alerts', icon: <CloudSync /> },
                      { key: 'sound', label: 'Sound Effects', desc: 'Audio feedback for actions', icon: <VolumeUp /> },
                    ].map((item) => (
                      <ListItem
                        key={item.key}
                        sx={
                          {
                            background: 'white',
                            borderRadius: 2,
                            mb: 2,
                            border: `1px solid ${colors.accent}40`,
                          }
                        }
                      >
                        <ListItemIcon>
                          {React.cloneElement(item.icon, { sx: { color: colors.secondary } })}
                        </ListItemIcon>
                        <ListItemText primary={item.label} secondary={item.desc} />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.notifications[item.key]}
                            onChange={(e) => handleSettingChange('notifications', item.key, e.target.checked)}
                            color="primary"
                            sx={
                              {
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: colors.secondary,
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: colors.secondary,
                                },
                              }
                            }
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={
                    {
                      background: `${colors.accent}15`,
                      border: `1px solid ${colors.accent}40`,
                      borderRadius: 3,
                      p: 3,
                    }
                  }
                >
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 3 }}>
                    📱 Notification Schedule
                  </Typography>
                  <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                    Configure when you want to receive notifications
                  </Alert>
                  <Box sx={{ p: 3, background: 'white', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ color: colors.secondary, mb: 2 }}>
                      🕐 Active Hours
                    </Typography>
                    <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600 }}>
                      9:00 AM - 6:00 PM
                    </Typography>
                    <Button
                      size="small"
                      sx={{ mt: 2, color: colors.secondary }}
                    >
                      Customize Schedule
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Appearance Tab */}
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={
                    {
                      background: colors.lightest,
                      border: `1px solid ${colors.light}`,
                      borderRadius: 3,
                      p: 3,
                    }
                  }
                >
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 3 }}>
                    🎨 Theme & Display
                  </Typography>
                  <List>
                    {[
                      { key: 'darkMode', label: 'Dark Mode', desc: 'Switch to dark theme', icon: <Brightness4 /> },
                      { key: 'compactMode', label: 'Compact Mode', desc: 'Reduce spacing and padding', icon: <Palette /> },
                      { key: 'animations', label: 'Animations', desc: 'Enable smooth transitions', icon: <Brightness7 /> },
                    ].map((item) => (
                      <ListItem
                        key={item.key}
                        sx={
                          {
                            background: 'white',
                            borderRadius: 2,
                            mb: 2,
                            border: `1px solid ${colors.accent}40`,
                          }
                        }
                      >
                        <ListItemIcon>
                          {React.cloneElement(item.icon, { sx: { color: colors.secondary } })}
                        </ListItemIcon>
                        <ListItemText primary={item.label} secondary={item.desc} />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.appearance[item.key]}
                            onChange={(e) => handleSettingChange('appearance', item.key, e.target.checked)}
                            color="primary"
                            sx={
                              {
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: colors.secondary,
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: colors.secondary,
                                },
                              }
                            }
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={
                    {
                      background: `${colors.accent}15`,
                      border: `1px solid ${colors.accent}40`,
                      borderRadius: 3,
                      p: 3,
                    }
                  }
                >
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 3 }}>
                    🌈 Color Palette Preview
                  </Typography>
                  <Box sx={{ p: 3, background: 'white', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ color: colors.secondary, mb: 2 }}>
                      Current Theme: Sunset
                    </Typography>
                    <Box display="flex" gap={1} mb={3}>
                      {[
                        { color: colors.primary, name: 'Primary' },
                        { color: colors.secondary, name: 'Secondary' },
                        { color: colors.accent, name: 'Accent' },
                        { color: colors.light, name: 'Light' },
                        { color: colors.lightest, name: 'Lightest' },
                      ].map((item) => (
                        <Box
                          key={item.name}
                          sx={
                            {
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              background: item.color,
                              border: '2px solid white',
                              boxShadow: `0 2px 8px ${item.color}40`,
                            }
                          }
                          title={item.name}
                        />
                      ))}
                    </Box>
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                      More themes coming soon! 🎨
                    </Alert>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Data & Storage Tab */}
          <TabPanel value={activeTab} index={4}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={
                    {
                      background: colors.lightest,
                      border: `1px solid ${colors.light}`,
                      borderRadius: 3,
                      p: 3,
                    }
                  }
                >
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 3 }}>
                    💾 Storage & Cache
                  </Typography>
                  <List>
                    {[
                      { key: 'autoSave', label: 'Auto Save', desc: 'Automatically save your work', icon: <Save /> },
                      { key: 'offlineMode', label: 'Offline Mode', desc: 'Enable offline functionality', icon: <CloudSync /> },
                    ].map((item) => (
                      <ListItem
                        key={item.key}
                        sx={
                          {
                            background: 'white',
                            borderRadius: 2,
                            mb: 2,
                            border: `1px solid ${colors.accent}40`,
                          }
                        }
                      >
                        <ListItemIcon>
                          {React.cloneElement(item.icon, { sx: { color: colors.secondary } })}
                        </ListItemIcon>
                        <ListItemText primary={item.label} secondary={item.desc} />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.system[item.key]}
                            onChange={(e) => handleSettingChange('system', item.key, e.target.checked)}
                            color="primary"
                            sx={
                              {
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: colors.secondary,
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: colors.secondary,
                                },
                              }
                            }
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ mt: 3, p: 3, background: 'white', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ color: colors.secondary, mb: 2 }}>
                      Cache Usage: {settings.system.cacheSize}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Delete />}
                      sx={
                        {
                          borderColor: colors.accent,
                          color: colors.secondary,
                        }
                      }
                    >
                      Clear Cache
                    </Button>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={
                    {
                      background: `${colors.accent}15`,
                      border: `1px solid ${colors.accent}40`,
                      borderRadius: 3,
                      p: 3,
                    }
                  }
                >
                  <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600, mb: 3 }}>
                    📤 Data Management
                  </Typography>
                  <List>
                    <ListItem
                      sx={
                        {
                          background: 'white',
                          borderRadius: 2,
                          mb: 2,
                          border: `1px solid ${colors.accent}40`,
                        }
                      }
                    >
                      <ListItemIcon>
                        <Backup sx={{ color: colors.secondary }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Export Data"
                        secondary="Download all your content and settings"
                      />
                      <ListItemSecondaryAction>
                        <Button
                          size="small"
                          startIcon={<Download />}
                          sx={{ color: colors.secondary }}
                        >
                          Export
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                      sx={
                        {
                          background: 'white',
                          borderRadius: 2,
                          mb: 2,
                          border: `1px solid ${colors.accent}40`,
                        }
                      }
                    >
                      <ListItemIcon>
                        <Upload sx={{ color: colors.secondary }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Import Data"
                        secondary="Restore from backup file"
                      />
                      <ListItemSecondaryAction>
                        <Button
                          size="small"
                          startIcon={<Upload />}
                          sx={{ color: colors.secondary }}
                        >
                          Import
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Card>
      </Slide>

      {/* Password Change Dialog */}
      <Dialog
        open={passwordDialog}
        onClose={() => setPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: colors.primary, fontWeight: 600 }}>
          🔐 Change Password
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              sx={{ mb: 3 }}
              InputProps={
                {
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }
              }
            />
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setPasswordDialog(false)}
            sx={{ color: colors.secondary }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setPasswordDialog(false);
              showSnackbar('Password updated successfully! 🔐', 'success');
            }}
            sx={
              {
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }
            }
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>

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
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;