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
import ContentLibrary from './components/ContentLibrary/ContentLibrary';
import QuizManagement from './components/QuizManagement/QuizManagement';
import QRScanner from './components/QRScanner/QRScanner';
import Settings from './components/Settings/Settings'; // Add this import
import About from './components/About/About';
import AdminLayout from './components/Layout/AdminLayout';
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
      <Routes>
        {/* Public routes for students (no authentication required) */}
        <Route path="/page/:pageId" element={<TextbookViewer />} />
        <Route path="/quiz/:pageId" element={<QuizInterface />} />
        
        {/* Admin login (no layout) */}
        <Route path="/admin/login" element={user ? <Navigate to="/admin/dashboard" /> : <AuthPage />} />
        
        {/* Admin routes with shared layout */}
        <Route 
          path="/admin/*" 
          element={
            <AdminRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="create" element={<ContentCreator />} />
                  <Route path="content" element={<ContentLibrary />} />
                  <Route path="quizzes" element={<QuizManagement />} />
                  <Route path="qr-scanner" element={<QRScanner />} />
                  <Route path="about" element={<About />} />
                  <Route path="cache" element={<div>Offline Cache Page (Coming Soon)</div>} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          } 
        />
        
        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/admin/login" />} />
      </Routes>
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
