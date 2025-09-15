import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import theme from './styles/theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './components/Dashboard/Dashboard';
import TextbookViewer from './components/TextbookViewer/TextbookViewer';
import QuizInterface from './components/QuizInterface/QuizInterface';
import ContentCreator from './components/ContentCreator/ContentCreator';
import QuizManagement from './components/QuizManagement/QuizManagement';
import QRScanner from './components/QRScanner/QRScanner'; // Add this import
import Navbar from './components/Navbar/Navbar';

// Admin-only Protected Route
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/admin/login" />;
};

// Main App Content
const AppContent = () => {
  const { user } = useAuth();

  return (
    <Router>
      {user && <Navbar />}
      <Container maxWidth="lg" sx={{ mt: user ? 4 : 0, mb: 4 }}>
        <Routes>
          {/* Public routes for students (no authentication required) */}
          <Route path="/page/:pageId" element={<TextbookViewer />} />
          <Route path="/quiz/:pageId" element={<QuizInterface />} />
          
          {/* Admin routes (authentication required) */}
          <Route path="/admin/login" element={user ? <Navigate to="/admin/dashboard" /> : <AuthPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/create" 
            element={
              <AdminRoute>
                <ContentCreator />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/quizzes" 
            element={
              <AdminRoute>
                <QuizManagement />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/qr-scanner" 
            element={
              <AdminRoute>
                <QRScanner />
              </AdminRoute>
            } 
          />
          
          {/* Default redirects */}
          <Route path="/" element={<Navigate to="/admin/login" />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Container>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
