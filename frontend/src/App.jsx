import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { NotesProvider } from './contexts/NotesContext.jsx';
import LandingPage from './components/LandingPage.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

// Wrapper component to conditionally render NotesProvider
const AuthenticatedApp = () => {
  const { user, loading } = useAuth();

  console.log('AuthenticatedApp: Current state:', { user: user ? 'logged in' : 'not logged in', loading });

  if (loading) {
    console.log('AuthenticatedApp: Showing loading state');
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#0a0a0a'
      }}>
        <div style={{ color: '#64ffda' }}>Loading...</div>
      </div>
    );
  }

  console.log('AuthenticatedApp: Rendering routes, user:', user ? 'present' : 'not present');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={
            user ? (
              <NotesProvider>
                <Dashboard />
              </NotesProvider>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('dark');

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AuthenticatedApp />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
