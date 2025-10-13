import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid,
  Chip,
  Paper,
  Fade,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import {
  Person,
  Email,
  AdminPanelSettings,
  Edit,
  PhotoCamera,
} from '@mui/icons-material';

// Modern Color Palette matching the project theme
const colors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F7',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#2997FF',
  subtle: '#E8E8E8',
  navBackground: 'rgba(255, 255, 255, 0.8)',
  glassBg: 'rgba(255, 255, 255, 0.7)',
};

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    role: '',
    avatar: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await apiService.getUserById(user.id);
      if (response.data) {
        setProfileData({
          name: response.data.name || '',
          email: response.data.email || '',
          role: response.data.role || '',
          avatar: null,
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
          }}
        >
          <Typography variant="h6" sx={{ color: colors.text }}>
            Loading profile...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Fade in={true} timeout={800}>
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            background: colors.glassBg,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${colors.subtle}`,
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Person sx={{ fontSize: 40, mr: 2, color: colors.accent }} />
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: colors.text }}>
                  My Profile 👤
                </Typography>
                <Typography variant="h6" sx={{ color: colors.textSecondary }}>
                  View and manage your account information
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ color: colors.textSecondary }}>
              Keep your profile up to date to personalize your EduPatch experience
            </Typography>
          </CardContent>
        </Paper>
      </Fade>

      {/* Profile Content */}
      <Fade in={true} timeout={1000}>
        <Grid container spacing={4}>
          {/* Profile Avatar Card */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                background: colors.glassBg,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${colors.subtle}`,
                borderRadius: 3,
                textAlign: 'center',
                p: 3,
                position: 'relative',
              }}
            >
              <Box position="relative" display="inline-block" mb={3}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.textSecondary})`,
                    fontSize: '3rem',
                    fontWeight: 700,
                    mx: 'auto',
                  }}
                >
                  {profileData.name.charAt(0) || 'U'}
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    background: colors.accent,
                    color: colors.primary,
                    '&:hover': {
                      background: colors.text,
                    },
                  }}
                  onClick={() => alert('Avatar upload feature coming soon! 📷')}
                >
                  <PhotoCamera />
                </IconButton>
              </Box>
              <Typography variant="h5" sx={{ color: colors.text, fontWeight: 600, mb: 1 }}>
                {profileData.name || 'User'}
              </Typography>
              <Chip
                label={profileData.role || 'User'}
                icon={<AdminPanelSettings />}
                sx={{
                  background: colors.secondary,
                  color: colors.text,
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 2 }}>
                Member since 2024
              </Typography>
            </Card>
          </Grid>

          {/* Profile Details Card */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={0}
              sx={{
                background: colors.glassBg,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${colors.subtle}`,
                borderRadius: 3,
                p: 3,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" sx={{ color: colors.text, fontWeight: 600 }}>
                  Profile Information
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => alert('Edit profile feature available in Settings! ⚙️')}
                  sx={{
                    borderColor: colors.accent,
                    color: colors.text,
                    '&:hover': {
                      borderColor: colors.accent,
                      background: `${colors.accent}10`,
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ color: colors.text, fontWeight: 600, mb: 1 }}>
                  Full Name
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    background: colors.primary,
                    border: `1px solid ${colors.subtle}`,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Person sx={{ color: colors.accent, mr: 2 }} />
                  <Typography variant="body1" sx={{ color: colors.text }}>
                    {profileData.name || 'Not provided'}
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ color: colors.text, fontWeight: 600, mb: 1 }}>
                  Email Address
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    background: colors.primary,
                    border: `1px solid ${colors.subtle}`,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Email sx={{ color: colors.accent, mr: 2 }} />
                  <Typography variant="body1" sx={{ color: colors.text }}>
                    {profileData.email || 'Not provided'}
                  </Typography>
                </Paper>
              </Box>

              <Divider sx={{ my: 3, borderColor: colors.subtle }} />

              <Box>
                <Typography variant="subtitle1" sx={{ color: colors.text, fontWeight: 600, mb: 2 }}>
                  Account Status
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Chip
                    label="Active Account"
                    sx={{
                      background: colors.accent,
                      color: colors.primary,
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={profileData.role || 'User'}
                    sx={{
                      background: colors.secondary,
                      color: colors.text,
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label="Verified"
                    sx={{
                      background: colors.subtle,
                      color: colors.text,
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  );
};

export default Profile;