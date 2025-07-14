import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import {
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  FormatStrikethrough as StrikethroughIcon,
  FormatListBulleted as ListIcon,
  FormatListNumbered as NumberedListIcon,
  FormatQuote as QuoteIcon,
  Code as CodeIcon,
  Title as TitleIcon,
  LooksOne as H1Icon,
  LooksTwo as H2Icon,
  Looks3 as H3Icon,
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import { useNotes } from '../contexts/NotesContext.jsx';

const NoteEditor = ({ open, note, onClose }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#1a1a1a');
  const [saving, setSaving] = useState(false);
  
  const { createNote, updateNote, toggleFavorite } = useNotes();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      // Auto-save functionality could be added here
    },
  });

  useEffect(() => {
    // Helper to check if color is white or missing
    const isWhite = (color) => {
      if (!color) return true;
      const c = color.toLowerCase();
      return c === '#fff' || c === '#ffffff' || c === 'white' || c === 'rgb(255,255,255)' || c === 'rgba(255,255,255,1)';
    };

    if (note) {
      setTitle(note.title);
      setColor(isWhite(note.color) ? '#1a1a1a' : note.color);
      if (editor) {
        editor.commands.setContent(note.content);
      }
    } else {
      setTitle('');
      setColor('#1a1a1a');
      if (editor) {
        editor.commands.setContent('');
      }
    }
  }, [note, editor, open]);

  const handleSave = async () => {
    if (!title.trim()) {
      setTitle('Untitled');
    }

    setSaving(true);
    
    const noteData = {
      title: title.trim() || 'Untitled',
      content: editor?.getHTML() || '',
      color
    };

    let result;
    if (note) {
      result = await updateNote(note._id, noteData);
    } else {
      result = await createNote(noteData);
    }

    if (result.success) {
      onClose();
    }
    
    setSaving(false);
  };

  const handleToggleFavorite = async () => {
    if (note) {
      await toggleFavorite(note._id);
    }
  };

  const handleClose = () => {
    if (saving) return;
    onClose();
  };

  const colorOptions = [
    { value: '#1a1a1a', label: 'Dark Gray' },
    { value: '#0a0a0a', label: 'Black' },
    { value: '#1e1e2e', label: 'Dark Blue' },
    { value: '#1a1a2e', label: 'Navy' },
    { value: '#16213e', label: 'Deep Blue' },
    { value: '#0f3460', label: 'Dark Cyan' },
    { value: '#2d1b69', label: 'Purple' },
    { value: '#1a1a3a', label: 'Dark Purple' }
  ];

  if (!editor) {
    return null;
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { 
          background: 'rgba(30, 32, 38, 0.85)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          boxShadow: '0 12px 48px 0 rgba(100,255,218,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.10)',
          border: 'none',
          p: { xs: 2, md: 4 },
          minHeight: '420px',
        }
      }}
    >
      <DialogTitle sx={{ pb: 0, border: 'none', background: 'none' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.01em',
                background: 'transparent',
                borderRadius: '12px',
                px: 1,
                mb: 1,
                '&::placeholder': {
                  color: 'rgba(255,255,255,0.4)',
                  fontWeight: 400
                }
              }
            }}
            sx={{
              mb: 0,
              '.MuiInputBase-input': {
                textAlign: 'left',
                background: 'none',
              }
            }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            {note && (
              <Tooltip title={note.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                <IconButton 
                  onClick={handleToggleFavorite}
                  color={note.isFavorite ? 'primary' : 'default'}
                  disabled={saving}
                  sx={{
                    bgcolor: 'transparent',
                    color: note.isFavorite ? '#64ffda' : 'rgba(255,255,255,0.6)',
                    '&:hover': { bgcolor: 'rgba(100,255,218,0.08)' }
                  }}
                >
                  {note.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
            )}
            <IconButton onClick={handleClose} disabled={saving} sx={{ color: 'rgba(255,255,255,0.6)' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 0, background: 'none', border: 'none', px: { xs: 0, md: 2 } }}>
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', px: 1 }}>
          {/* Minimalist Toolbar */}
          <Tooltip title="Bold">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBold().run()}
              color={editor.isActive('bold') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('bold') ? 'rgba(100,255,218,0.12)' : 'transparent',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(100,255,218,0.12)' },
                color: editor.isActive('bold') ? '#64ffda' : 'rgba(255,255,255,0.7)',
                p: 0.5
              }}
            >
              <BoldIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              color={editor.isActive('italic') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('italic') ? 'rgba(100,255,218,0.12)' : 'transparent',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(100,255,218,0.12)' },
                color: editor.isActive('italic') ? '#64ffda' : 'rgba(255,255,255,0.7)',
                p: 0.5
              }}
            >
              <ItalicIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Underline">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              color={editor.isActive('underline') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('underline') ? 'rgba(100,255,218,0.12)' : 'transparent',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(100,255,218,0.12)' },
                color: editor.isActive('underline') ? '#64ffda' : 'rgba(255,255,255,0.7)',
                p: 0.5
              }}
            >
              <UnderlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Strikethrough">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              color={editor.isActive('strike') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('strike') ? 'rgba(100,255,218,0.12)' : 'transparent',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(100,255,218,0.12)' },
                color: editor.isActive('strike') ? '#64ffda' : 'rgba(255,255,255,0.7)',
                p: 0.5
              }}
            >
              <StrikethroughIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Heading 1">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('heading', { level: 1 }) ? 'rgba(100,255,218,0.12)' : 'transparent',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(100,255,218,0.12)' },
                color: editor.isActive('heading', { level: 1 }) ? '#64ffda' : 'rgba(255,255,255,0.7)',
                p: 0.5
              }}
            >
              <H1Icon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bullet List">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              color={editor.isActive('bulletList') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('bulletList') ? 'rgba(100,255,218,0.12)' : 'transparent',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(100,255,218,0.12)' },
                color: editor.isActive('bulletList') ? '#64ffda' : 'rgba(255,255,255,0.7)',
                p: 0.5
              }}
            >
              <ListIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Numbered List">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              color={editor.isActive('orderedList') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('orderedList') ? 'rgba(100,255,218,0.12)' : 'transparent',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(100,255,218,0.12)' },
                color: editor.isActive('orderedList') ? '#64ffda' : 'rgba(255,255,255,0.7)',
                p: 0.5
              }}
            >
              <NumberedListIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Blockquote">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              color={editor.isActive('blockquote') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('blockquote') ? 'rgba(100,255,218,0.12)' : 'transparent',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(100,255,218,0.12)' },
                color: editor.isActive('blockquote') ? '#64ffda' : 'rgba(255,255,255,0.7)',
                p: 0.5
              }}
            >
              <QuoteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Code Block">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              color={editor.isActive('codeBlock') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('codeBlock') ? 'rgba(100,255,218,0.12)' : 'transparent',
                borderRadius: '8px',
                '&:hover': { bgcolor: 'rgba(100,255,218,0.12)' },
                color: editor.isActive('codeBlock') ? '#64ffda' : 'rgba(255,255,255,0.7)',
                p: 0.5
              }}
            >
              <CodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            minHeight: '320px',
            border: 'none',
            borderRadius: '16px',
            p: { xs: 1, md: 2 },
            bgcolor: 'rgba(255,255,255,0.02)',
            boxShadow: '0 2px 16px 0 rgba(100,255,218,0.04)',
            mt: 1,
            mb: 2,
            '& .ProseMirror': {
              outline: 'none',
              minHeight: '300px',
              color: 'white',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              background: 'none',
              padding: 0,
            },
            '& .ProseMirror p': {
              margin: '0.5em 0',
              color: 'white'
            },
            '& .ProseMirror h1, .ProseMirror h2, .ProseMirror h3': {
              margin: '1em 0 0.5em 0',
              color: 'white',
              fontWeight: 'bold'
            },
            '& .ProseMirror ul, .ProseMirror ol': {
              padding: '0 1em',
              color: 'white'
            },
            '& .ProseMirror blockquote': {
              borderLeft: '3px solid #64ffda',
              margin: '1em 0',
              paddingLeft: '1em',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.8)'
            },
            '& .ProseMirror pre': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '1em',
              borderRadius: '4px',
              overflow: 'auto',
              color: '#64ffda',
              border: '1px solid rgba(100,255,218,0.2)'
            },
            '& .ProseMirror code': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              color: '#64ffda',
              fontSize: '0.95em'
            }
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'flex-end', background: 'none', border: 'none', px: { xs: 1, md: 3 }, pb: 2 }}>
        <Button onClick={handleClose} disabled={saving} sx={{
          color: 'rgba(255,255,255,0.7)',
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          px: 2,
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.06)'
          }
        }}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          disabled={saving}
          sx={{
            bgcolor: '#64ffda',
            color: '#0a0a0a',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            ml: 1,
            px: 3,
            boxShadow: '0 2px 8px 0 rgba(100,255,218,0.10)',
            '&:hover': {
              bgcolor: '#4cd6b3'
            }
          }}
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteEditor; 