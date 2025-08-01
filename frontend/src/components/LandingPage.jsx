import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Note as NoteIcon,
  Favorite as FavoriteIcon,
  Palette as PaletteIcon,
  Search as SearchIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import LoginModal from './LoginModal';
import CursorGlow from './CursorTrail';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login'); // 'login' or 'signup'

  const features = [
    {
      icon: <NoteIcon sx={{ fontSize: 40, color: '#64ffda' }} />,
      title: 'Rich Text Editor',
      description: 'Create beautiful notes with formatting, lists, and code blocks'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40, color: '#64ffda' }} />,
      title: 'Favorites & Organization',
      description: 'Mark important notes as favorites and organize with colors'
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: '#64ffda' }} />,
      title: 'Smart Search',
      description: 'Find your notes instantly with powerful search and filters'
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 40, color: '#64ffda' }} />,
      title: 'Custom Themes',
      description: 'Not yet there but will see'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#64ffda' }} />,
      title: 'Secure & Private',
      description: 'Your notes are encrypted and only accessible to you'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#64ffda' }} />,
      title: 'Lightning Fast',
      description: 'Built with modern tech for instant loading and smooth experience'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100%',
      bgcolor: '#0a0a0a',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <CursorGlow />
      {/* Background Grid */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        zIndex: 0
      }} />
      


      {/* Navigation */}
      <AppBar position="fixed" elevation={0} sx={{ 
        bgcolor: 'rgba(10, 10, 10, 0.8)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#64ffda' }}>
            Scribz
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => {
              setModalMode('login');
              setLoginModalOpen(true);
            }}
            startIcon={<LoginIcon />}
            sx={{ 
              mr: 2, 
              color: '#64ffda', 
              textTransform: 'none',
              border: '1px solid rgba(100, 255, 218, 0.3)',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                borderColor: 'rgba(100, 255, 218, 0.5)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(100, 255, 218, 0.15)'
              }
            }}
          >
            Login
          </Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setModalMode('signup');
              setLoginModalOpen(true);
            }}
            startIcon={<SignupIcon />}
            sx={{
              bgcolor: '#64ffda',
              color: '#0a0a0a',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#4cd6b3',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(100, 255, 218, 0.3)'
              }
            }}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ 
        width: '100%',
        minHeight: '100vh', // changed from 120vh to 100vh
        maxWidth: '1200px',
        px: { xs: 3, md: 4 },
        pt: { xs: 14, md: 16 }, // reduced top padding
        pb: { xs: 8, md: 10 }, // reduced bottom padding
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        mx: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 900,
            fontSize: { xs: '3rem', md: '5rem' },
            lineHeight: 1.1,
            color: 'white',
            letterSpacing: '-0.02em',
            '& br': {
              display: 'block',
              content: '""',
              marginTop: '0.5rem'
            }
          }}
        >
          Your Notes,<br />
          <span style={{ color: '#64ffda' }}>Reimagined</span>
        </Typography>
        
        <Typography variant="h5" color="rgba(255, 255, 255, 0.7)" paragraph sx={{ 
          lineHeight: 1.6,
          maxWidth: '600px',
          mx: 'auto',
          fontSize: { xs: '1.2rem', md: '1.5rem' }
        }}>
          A modern, beautiful notes app that helps you capture ideas, organize thoughts, 
          and stay productive. Built with the latest technology for a seamless experience.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', mb: 6 }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => {
              setModalMode('signup');
              setLoginModalOpen(true);
            }}
            endIcon={<ArrowIcon />}
            sx={{ 
              px: 6, 
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
              transition: 'all 0.3s ease'
            }}
          >
            Get Started for Free
          </Button>
        </Box>

        {/* Feature Cards */}
        <Grid container columns={12} spacing={4} sx={{ mt: 6, justifyContent: 'center' }}>
          {features.map((feature, index) => (
            <Grid key={index} span={4} sx={{ display: 'flex' }}>
              <Card 
                elevation={0} 
                sx={{ 
                  height: '240px',
                  width: '320px',
                  background: 'rgba(100, 255, 218, 0.03)',
                  border: '1px solid rgba(100, 255, 218, 0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(100, 255, 218, 0.4)',
                    background: 'rgba(100, 255, 218, 0.08)',
                    boxShadow: '0 8px 32px rgba(100, 255, 218, 0.15)'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: 5, mt: 4, width: '100%', textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ 
          fontWeight: 700,
          color: 'white',
          mb: 4
        }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" color="rgba(255, 255, 255, 0.7)" paragraph sx={{ 
          mb: 6,
          maxWidth: '600px',
          mx: 'auto'
        }}>
          Be the first few users who trust Scribz for their note-taking needs. 
          Start organizing your thoughts today.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => {
              setModalMode('signup');
              setLoginModalOpen(true);
            }}
            endIcon={<ArrowIcon />}
            sx={{ 
              px: 6, 
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
              transition: 'all 0.3s ease'
            }}
          >
            Create Free Account
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => {
              setModalMode('login');
              setLoginModalOpen(true);
            }}
            sx={{ 
              px: 6, 
              py: 2,
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              borderColor: '#64ffda',
              color: '#64ffda',
              '&:hover': {
                borderColor: '#4cd6b3',
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(100, 255, 218, 0.15)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, mt: 2, width: '100%' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.5)">
            © 2025 Scribz
          </Typography>
        </Container>
      </Box>

      {/* Login Modal */}
      <LoginModal 
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        initialMode={modalMode}
      />
    </Box>
  );
};

export default LandingPage; 