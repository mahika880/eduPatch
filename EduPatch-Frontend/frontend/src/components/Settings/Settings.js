import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
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
  const { user } = useAuth(); // Get current user from auth context
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
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
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Sunset Color Palette
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserSettings();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://edupatch.onrender.com'}/user/id/${user.userId}`);
      if (response.ok) {
        const userData = await response.json();
        setProfileData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          role: userData.role || '',
          avatar: null,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      showSnackbar('Failed to load profile data', 'error');
    }
  };

  const fetchUserSettings = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://edupatch.onrender.com'}/user/settings/${user.userId}`);
      if (response.ok) {
        const userSettings = await response.json();
        setSettings({
          notifications: userSettings.notifications || settings.notifications,
          appearance: userSettings.appearance || settings.appearance,
          privacy: userSettings.privacy || settings.privacy,
          system: userSettings.system || settings.system,
        });
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileSave = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://edupatch.onrender.com'}/user/profile/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setEditMode(false);
        showSnackbar('Profile updated successfully! 👤', 'success');
      } else {
        const errorData = await response.json();
        showSnackbar(errorData.error || 'Failed to update profile', 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showSnackbar('Failed to update profile', 'error');
    }
  };

  const handleSettingChange = async (category, setting, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value,
      },
    };
    
    setSettings(newSettings);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://edupatch.onrender.com'}/user/settings/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      if (response.ok) {
        showSnackbar(`${setting.charAt(0).toUpperCase() + setting.slice(1)} ${value ? 'enabled' : 'disabled'}! ⚙️`, 'success');
      } else {
        // Revert on error
        setSettings(settings);
        showSnackbar('Failed to update setting', 'error');
      }
    } catch (error) {
      console.error('Error updating setting:', error);
      setSettings(settings);
      showSnackbar('Failed to update setting', 'error');
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      showSnackbar('Please fill in all password fields', 'error');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showSnackbar('New passwords do not match', 'error');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      showSnackbar('New password must be at least 8 characters long', 'error');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://edupatch.onrender.com'}/user/password/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setPasswordDialog(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        showSnackbar('Password updated successfully! 🔐', 'success');
      } else {
        const errorData = await response.json();
        showSnackbar(errorData.error || 'Failed to change password', 'error');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      showSnackbar('Failed to change password', 'error');
    }
  };

  const handleExportData = () => {
    const exportData = {
      profile: profileData,
      settings: settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `edupatch-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showSnackbar('Settings exported successfully! 📤', 'success');
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const importedData = JSON.parse(e.target.result);
            
            // Update profile if present
            if (importedData.profile) {
              setProfileData(importedData.profile);
              await apiService.updateProfile(user.userId, {
                name: importedData.profile.name,
                email: importedData.profile.email,
              });
            }
            
            // Update settings if present
            if (importedData.settings) {
              setSettings(importedData.settings);
              
              const backendSettings = {
                emailNotifications: importedData.settings.notifications.email,
                pushNotifications: importedData.settings.notifications.push,
                quizAlerts: importedData.settings.notifications.quiz,
                contentUpdates: importedData.settings.notifications.content,
                soundEffects: importedData.settings.notifications.sound,
                darkMode: importedData.settings.appearance.darkMode,
                compactMode: importedData.settings.appearance.compactMode,
                animations: importedData.settings.appearance.animations,
                profileVisible: importedData.settings.privacy.profileVisible,
                analyticsEnabled: importedData.settings.privacy.analyticsEnabled,
                dataSharing: importedData.settings.privacy.dataSharing,
                autoSave: importedData.settings.system.autoSave,
                offlineMode: importedData.settings.system.offlineMode,
                cacheSize: importedData.settings.system.cacheSize,
                language: importedData.settings.system.language,
              };
              
              await apiService.updateUserSettings(user.userId, backendSettings);
            }
            
            showSnackbar('Settings imported successfully! 📥', 'success');
          } catch (error) {
            console.error('Error importing data:', error);
            showSnackbar('Invalid file format or import failed', 'error');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearCache = () => {
    // Simulate cache clearing
    setTimeout(() => {
      showSnackbar('Cache cleared successfully! 🗑️', 'success');
    }, 1000);
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
  
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 100%)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box textAlign="center">
          <Typography variant="h6" sx={{ color: colors.primary }}>
            Loading settings...
          </Typography>
        </Box>
      </Box>
    );
  }

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
                      {profileData.name.charAt(0) || 'U'}
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
                      onClick={() => showSnackbar('Avatar upload feature coming soon! 📷', 'info')}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </Box>
                  <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
                    {profileData.name || 'User'}
                  </Typography>
                  <Chip
                    label={profileData.role || 'User'}
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

                  {editMode && (
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={() => {
                          setEditMode(false);
                          fetchUserData(); // Reset to original data
                        }}
                        sx={{
                          borderColor: colors.accent,
                          color: colors.secondary,
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
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
                      sx={{
                        background: 'white',
                        borderRadius: 2,
                        mb: 2,
                        border: `1px solid ${colors.accent}40`,
                      }}
                    >
                      <ListItemIcon>
                        <Lock sx={{ color: colors.secondary }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Change Password"
                        secondary="Keep your account secure"
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
                            onChange={(e) => showSnackbar(`2FA ${e.target.checked ? 'enabled' : 'disabled'}! 🔐`, 'success')}
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
                            checked={settings.privacy?.[item.key] || false}
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
                            checked={settings.notifications?.[item.key] || false}
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
                      onClick={() => showSnackbar('Schedule customization coming soon! ⏰', 'info')}
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
                            checked={settings.appearance?.[item.key] || false}
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
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s ease',
                            }
                          }
                          title={item.name}
                          onClick={() => showSnackbar(`${item.name} color: ${item.color}`, 'info')}
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
                            checked={settings.system?.[item.key] || false}
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
                      Cache Usage: {settings.system?.cacheSize || '500MB'}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Delete />}
                      onClick={handleClearCache}
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
                          onClick={handleExportData}
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
                          onClick={handleImportData}
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
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              sx={{ mb: 3 }}
              helperText="Password must be at least 8 characters long"
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              error={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== ''}
              helperText={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== '' ? 'Passwords do not match' : ''}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => {
              setPasswordDialog(false);
              setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }}
            sx={{ color: colors.secondary }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePasswordChange}
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