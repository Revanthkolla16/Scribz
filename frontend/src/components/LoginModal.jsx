import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon
} from '@mui/icons-material';

const LoginModal = ({ open, onClose, onSwitchToSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isLogin) {
        // Login logic
        console.log('Attempting login with:', formData.email);
        result = await login(formData.email, formData.password);
        console.log('Login result:', result);
      } else {
        // Signup logic
        console.log('Attempting signup with:', formData.email);
        result = await signup(formData.email, formData.password);
        console.log('Signup result:', result);
      }

      if (result.success) {
        console.log('Authentication successful, navigating to dashboard');
        onClose();
        console.log('Modal closed, about to navigate...');
        // Add a small delay to ensure state updates
        setTimeout(() => {
          console.log('Navigating to dashboard now...');
          navigate('/dashboard');
        }, 100);
      } else {
        console.log('Authentication failed:', result.message);
        setError(result.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleClose = () => {
    setError('');
    setFormData({ email: '', password: '' });
    setIsLogin(true);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Box sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        bgcolor: 'rgba(10, 10, 10, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        backdropFilter: 'blur(20px)',
        p: 4,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: 'white'
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Typography variant="h4" component="h2" gutterBottom sx={{
          fontWeight: 700,
          color: 'white',
          textAlign: 'center',
          mb: 1
        }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Typography>
        
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{
          textAlign: 'center',
          mb: 4
        }}>
          {isLogin ? 'Sign in to your Scribz account' : 'Join Scribz and start organizing your notes'}
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(244, 67, 54, 0.1)', color: '#ff6b6b' }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#64ffda',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#64ffda',
                },
              },
            }}
          />
          
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#667eea',
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : (isLogin ? <LoginIcon /> : <SignupIcon />)}
            sx={{
              py: 2,
              bgcolor: '#64ffda',
              color: '#0a0a0a',
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#4cd6b3',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 25px rgba(100, 255, 218, 0.3)'
              },
              '&:disabled': {
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.5)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>

          {/* Switch Mode */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Button
                onClick={() => setIsLogin(!isLogin)}
                sx={{
                  color: '#64ffda',
                  textTransform: 'none',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    color: '#4cd6b3',
                    background: 'none'
                  }
                }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal; 