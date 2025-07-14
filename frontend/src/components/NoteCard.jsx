import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Button
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNotes } from '../contexts/NotesContext.jsx';

const NoteCard = ({ note, onEdit }) => {
  const { toggleFavorite, toggleTrash, deleteNote, filterNotes, currentFilter, searchQuery } = useNotes();

  const handleFavorite = async () => {
    await toggleFavorite(note._id);
  };

  const handleTrash = async () => {
    await toggleTrash(note._id);
    filterNotes(currentFilter, searchQuery);
  };

  const handleRestore = async () => {
    await toggleTrash(note._id);
    filterNotes(currentFilter, searchQuery);
  };

  const handleDeletePermanently = async () => {
    await deleteNote(note._id);
    filterNotes(currentFilter, searchQuery);
  };

  const handleEdit = () => {
    onEdit();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const truncateText = (text, maxLength = 100) => {
    // Remove HTML tags and get plain text
    const plainText = text.replace(/<[^>]*>/g, '');
    
    // Split by line breaks and process each line
    const lines = plainText.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length === 0) return '';
    
    let result = '';
    let totalLength = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.length === 0) continue;
      
      if (totalLength + line.length <= maxLength) {
        result += (result ? '\n' : '') + line;
        totalLength += line.length;
      } else {
        // If this line would exceed the limit, truncate it
        const remainingLength = maxLength - totalLength;
        if (remainingLength > 3) {
          result += (result ? '\n' : '') + line.substring(0, remainingLength - 3) + '...';
        }
        break;
      }
    }
    
    return result;
  };

  return (
    <Card 
      sx={{ 
        height: '280px',
        width: '100%',
        minWidth: '240px',
        maxWidth: '340px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(20, 20, 20, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          transform: 'translateY(-4px) scale(1.02)',
          borderColor: 'rgba(100, 255, 218, 0.3)',
          backgroundColor: 'rgba(30, 30, 30, 0.9)'
        }
      }}
    >
      <CardContent sx={{ 
        flexGrow: 1, 
        p: 3, 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '200px'
      }}>
        <Typography variant="h6" component="h2" sx={{ 
          fontWeight: 'bold',
          color: 'white',
          fontSize: '1.1rem',
          lineHeight: 1.3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          mb: 2,
          height: '24px'
        }}>
          {note.title}
        </Typography>
        
        <Typography variant="body2" sx={{ 
          color: 'rgba(255, 255, 255, 0.8)',
          lineHeight: 1.5,
          fontSize: '0.9rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'pre-line',
          flexGrow: 1,
          height: '100px',
          minHeight: '100px',
          maxHeight: '100px',
        }}>
          {truncateText(note.content, 500)}
        </Typography>
        
        <Typography variant="caption" sx={{ 
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.75rem',
          mt: 'auto',
          height: '16px'
        }}>
          {formatDate(note.updatedAt)}
        </Typography>
      </CardContent>

      <CardActions sx={{ 
        justifyContent: 'space-between', 
        p: 2, 
        pt: 0, 
        flexShrink: 0,
        height: '60px'
      }}>
        {note.isTrashed ? (
          <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto' }}>
            <Button
              size="small"
              disableElevation
              onClick={handleRestore}
              sx={{
                minWidth: 0,
                px: 2,
                fontWeight: 600,
                borderRadius: '999px',
                color: '#64ffda',
                background: 'rgba(100,255,218,0.08)',
                boxShadow: '0 1px 8px 0 rgba(100,255,218,0.08)',
                textTransform: 'none',
                fontSize: '0.95rem',
                letterSpacing: 0,
                transition: 'background 0.18s, color 0.18s',
                '&:hover': {
                  background: 'rgba(100,255,218,0.18)',
                  color: '#64ffda',
                  boxShadow: '0 2px 12px 0 rgba(100,255,218,0.16)'
                },
                border: 'none',
              }}
            >
              Restore
            </Button>
            <Button
              size="small"
              disableElevation
              onClick={handleDeletePermanently}
              sx={{
                minWidth: 0,
                px: 2,
                fontWeight: 600,
                borderRadius: '999px',
                color: '#f44336',
                background: 'rgba(244,67,54,0.08)',
                boxShadow: '0 1px 8px 0 rgba(244,67,54,0.08)',
                textTransform: 'none',
                fontSize: '0.95rem',
                letterSpacing: 0,
                transition: 'background 0.18s, color 0.18s',
                '&:hover': {
                  background: 'rgba(244,67,54,0.18)',
                  color: '#f44336',
                  boxShadow: '0 2px 12px 0 rgba(244,67,54,0.16)'
                },
                border: 'none',
              }}
            >
              Delete
            </Button>
          </Box>
        ) : (
          <>
            <IconButton 
              size="small" 
              onClick={handleFavorite}
              color={note.isFavorite ? 'primary' : 'default'}
              sx={{ 
                color: note.isFavorite ? '#64ffda' : 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: note.isFavorite ? '#64ffda' : 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {note.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton 
              size="small" 
              onClick={handleEdit} 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={handleTrash} 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: '#f44336',
                  bgcolor: 'rgba(244, 67, 54, 0.1)'
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default NoteCard; 