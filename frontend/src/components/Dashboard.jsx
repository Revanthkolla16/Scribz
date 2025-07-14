import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNotes } from '../contexts/NotesContext.jsx';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Fab,
  Tooltip,
  CircularProgress,
  IconButton,
  Button,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
  Favorite as FavoriteIcon,
  Delete as DeleteIcon,
  AllInclusive as AllIcon
} from '@mui/icons-material';
import NoteCard from './NoteCard.jsx';
import NoteEditor from './NoteEditor.jsx';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  
  const { user, loading: authLoading, logout } = useAuth();
  const { notes, loading: notesLoading, filterNotes, currentFilter, isAuthenticated } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: '#0a0a0a'
      }}>
        <CircularProgress sx={{ color: '#64ffda' }} />
      </Box>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return null;
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterNotes(currentFilter, query);
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setEditorOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFilterChange = (filter) => {
    filterNotes(filter, searchQuery);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      bgcolor: '#0a0a0a',
      position: 'relative',
      justifyContent: 'space-between',
      overflow: 'hidden'
    }}>
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
      
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: '100%',
          bgcolor: 'rgba(30,32,38,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1.5px solid rgba(100,255,218,0.08)',
          boxShadow: '0 2px 16px 0 rgba(100,255,218,0.04)',
          borderRadius: 0,
          zIndex: 1200
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: 72, position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo Left */}
          <Typography variant="h6" noWrap component="div" sx={{ 
            fontWeight: 'bold', 
            color: '#64ffda',
            minWidth: 'fit-content',
            letterSpacing: '-0.01em',
            ml: 1,
            zIndex: 2
          }}>
            Scribz
          </Typography>
          {/* Filter Buttons Centered Absolutely */}
          <Box sx={{
            position: 'absolute',
            left: '45%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Box
                component="button"
                onClick={() => handleFilterChange('all')}
                sx={{
                  background: 'none !important',
                  border: 'none !important',
                  outline: 'none !important',
                  boxShadow: 'none !important',
                  color: currentFilter === 'all' ? '#64ffda' : 'rgba(255,255,255,0.7)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginRight: 3,
                  marginLeft: 0,
                  padding: 0,
                  borderBottom: currentFilter === 'all' ? '2px solid #64ffda' : '2px solid transparent',
                  transition: 'color 0.2s, border-bottom 0.2s',
                  pb: '2px',
                  '&:hover': {
                    color: '#64ffda',
                  },
                  '&:focus': {
                    color: '#64ffda',
                    borderBottom: '2px solid #64ffda',
                  },
                  '&:active': {
                    background: 'none',
                  }
                }}
              >
                All
              </Box>
              <Box
                component="button"
                onClick={() => handleFilterChange('favorites')}
                sx={{
                  background: 'none !important',
                  border: 'none !important',
                  outline: 'none !important',
                  boxShadow: 'none !important',
                  color: currentFilter === 'favorites' ? '#64ffda' : 'rgba(255,255,255,0.7)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginRight: 3,
                  marginLeft: 0,
                  padding: 0,
                  borderBottom: currentFilter === 'favorites' ? '2px solid #64ffda' : '2px solid transparent',
                  transition: 'color 0.2s, border-bottom 0.2s',
                  pb: '2px',
                  '&:hover': {
                    color: '#64ffda',
                  },
                  '&:focus': {
                    color: '#64ffda',
                    borderBottom: '2px solid #64ffda',
                  },
                  '&:active': {
                    background: 'none',
                  }
                }}
              >
                Favorites
              </Box>
              <Box
                component="button"
                onClick={() => handleFilterChange('trash')}
                sx={{
                  background: 'none !important',
                  border: 'none !important',
                  outline: 'none !important',
                  boxShadow: 'none !important',
                  color: currentFilter === 'trash' ? '#64ffda' : 'rgba(255,255,255,0.7)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginRight: 3,
                  marginLeft: 0,
                  padding: 0,
                  borderBottom: currentFilter === 'trash' ? '2px solid #64ffda' : '2px solid transparent',
                  transition: 'color 0.2s, border-bottom 0.2s',
                  pb: '2px',
                  '&:hover': {
                    color: '#64ffda',
                  },
                  '&:focus': {
                    color: '#64ffda',
                    borderBottom: '2px solid #64ffda',
                  },
                  '&:active': {
                    background: 'none',
                  }
                }}
              >
                Trash
              </Box>
            </Box>
          </Box>
          
          {/* Spacer for right alignment */}
          <Box sx={{ flexGrow: 1 }} />
          
          <TextField
            size="small"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ 
              mr: 2, 
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255,255,255,0.08)',
              boxShadow: '0 1px 4px 0 rgba(100,255,218,0.04)',
              '& .MuiOutlinedInput-root': {
                color: 'white',
                fontWeight: 500,
                fontSize: '1.1rem',
                borderRadius: '12px',
                background: 'none',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(102,126,234,0.18)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#64ffda',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout} sx={{
              color: '#64ffda',
              bgcolor: 'rgba(100,255,218,0.08)',
              borderRadius: '10px',
              ml: 1,
              '&:hover': {
                bgcolor: 'rgba(100,255,218,0.16)'
              }
            }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: '100%',
          mt: 10,
          position: 'relative',
          zIndex: 1,
          minHeight: 'calc(100vh - 72px)',
          background: 'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {notesLoading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            flexDirection: 'column',
            gap: 2
          }}>
            <CircularProgress sx={{ color: '#64ffda' }} />
            <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Loading your notes...
            </Typography>
          </Box>
        ) : notes.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            flexDirection: 'column',
            gap: 3
          }}>
            <Typography variant="h4" sx={{ 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 600,
              mb: 2
            }}>
              Welcome to Scribz!
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.6)',
              textAlign: 'center',
              maxWidth: '400px'
            }}>
              Start organizing your thoughts by creating your first note
            </Typography>
          </Box>
        ) : (
          <Grid container columns={12} spacing={4} sx={{ mt: 1, width: '100%', maxWidth: '1400px', mx: 'auto' }}>
            {notes.map((note) => (
              <Grid key={note._id} span={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <NoteCard 
                  note={note} 
                  onEdit={() => handleEditNote(note)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Fab
          color="primary"
          aria-label="add"
          onClick={handleCreateNote}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#64ffda',
            color: '#0a0a0a',
            borderRadius: '16px',
            boxShadow: '0 4px 24px 0 rgba(100,255,218,0.18)',
            '&:hover': {
              bgcolor: '#4cd6b3',
              transform: 'scale(1.08)',
              boxShadow: '0 10px 25px rgba(100,255,218,0.22)'
            },
            transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
            zIndex: 1200
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <NoteEditor
        open={editorOpen}
        note={selectedNote}
        onClose={() => setEditorOpen(false)}
      />
    </Box>
  );
};

export default Dashboard; 