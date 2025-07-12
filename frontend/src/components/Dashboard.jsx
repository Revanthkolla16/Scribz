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
          bgcolor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          zIndex: 1200
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" noWrap component="div" sx={{ 
            fontWeight: 'bold', 
            color: '#64ffda',
            minWidth: 'fit-content'
          }}>
            Scribz
          </Typography>
          
          {/* Filter Buttons */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={<AllIcon />}
              label="All"
              onClick={() => handleFilterChange('all')}
              sx={{
                bgcolor: currentFilter === 'all' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                color: currentFilter === 'all' ? '#64ffda' : 'rgba(255, 255, 255, 0.7)',
                border: currentFilter === 'all' ? '1px solid rgba(100, 255, 218, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(100, 255, 218, 0.1)',
                  color: '#64ffda'
                }
              }}
            />
            <Chip
              icon={<FavoriteIcon />}
              label="Favorites"
              onClick={() => handleFilterChange('favorites')}
              sx={{
                bgcolor: currentFilter === 'favorites' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                color: currentFilter === 'favorites' ? '#64ffda' : 'rgba(255, 255, 255, 0.7)',
                border: currentFilter === 'favorites' ? '1px solid rgba(100, 255, 218, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(100, 255, 218, 0.1)',
                  color: '#64ffda'
                }
              }}
            />
            <Chip
              icon={<DeleteIcon />}
              label="Trash"
              onClick={() => handleFilterChange('trash')}
              sx={{
                bgcolor: currentFilter === 'trash' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                color: currentFilter === 'trash' ? '#64ffda' : 'rgba(255, 255, 255, 0.7)',
                border: currentFilter === 'trash' ? '1px solid rgba(100, 255, 218, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(100, 255, 218, 0.1)',
                  color: '#64ffda'
                }
              }}
            />
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <TextField
            size="small"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ 
              mr: 2, 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: '100%',
          mt: 8,
          position: 'relative',
          zIndex: 1,
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)'
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
            <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 600,
              mb: 2
            }}>
              Welcome to Scribz!
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              maxWidth: '400px'
            }}>
              Start organizing your thoughts by creating your first note
            </Typography>
          </Box>
        ) : (
          <Grid container columns={12} spacing={3}>
            {notes.map((note) => (
              <Grid key={note._id} span={3}>
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
            bottom: 16,
            right: 16,
            bgcolor: '#64ffda',
            color: '#0a0a0a',
            '&:hover': {
              bgcolor: '#4cd6b3',
              transform: 'scale(1.1)',
              boxShadow: '0 10px 25px rgba(100, 255, 218, 0.3)'
            },
            transition: 'all 0.3s ease',
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