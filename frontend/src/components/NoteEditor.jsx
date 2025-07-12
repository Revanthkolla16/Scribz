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
    if (note) {
      setTitle(note.title);
      setColor(note.color || '#1a1a1a');
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
          backgroundColor: color,
          borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ 
              '& .MuiInputBase-input': { 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                color: 'white'
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: 'rgba(255, 255, 255, 0.3)'
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#64ffda'
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottomColor: 'rgba(255, 255, 255, 0.5)'
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
                >
                  {note.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
            )}
            <IconButton onClick={handleClose} disabled={saving}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Text Formatting */}
          <Tooltip title="Bold">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBold().run()}
              color={editor.isActive('bold') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('bold') ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <BoldIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Italic">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              color={editor.isActive('italic') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('italic') ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <ItalicIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Underline">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              color={editor.isActive('underline') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('underline') ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <UnderlineIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Strikethrough">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              color={editor.isActive('strike') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('strike') ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <StrikethroughIcon />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />
          
          {/* Headings */}
          <Tooltip title="Heading 1">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('heading', { level: 1 }) ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <H1Icon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Heading 2">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('heading', { level: 2 }) ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <H2Icon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Heading 3">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              color={editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('heading', { level: 3 }) ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <H3Icon />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />
          
          {/* Lists */}
          <Tooltip title="Bullet List">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              color={editor.isActive('bulletList') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('bulletList') ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <ListIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Numbered List">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              color={editor.isActive('orderedList') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('orderedList') ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <NumberedListIcon />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />
          
          {/* Advanced Formatting */}
          <Tooltip title="Blockquote">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              color={editor.isActive('blockquote') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('blockquote') ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <QuoteIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Code Block">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              color={editor.isActive('codeBlock') ? 'primary' : 'default'}
              sx={{ 
                bgcolor: editor.isActive('codeBlock') ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(100, 255, 218, 0.1)' }
              }}
            >
              <CodeIcon />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          {/* Note Color */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={color}
              label="Color"
              onChange={(e) => setColor(e.target.value)}
            >
              {colorOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: option.value,
                        border: '1px solid #ccc'
                      }}
                    />
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            minHeight: '300px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 1,
            p: 2,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            '& .ProseMirror': {
              outline: 'none',
              minHeight: '280px',
              color: 'white',
              fontSize: '1rem',
              lineHeight: 1.6
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
              color: 'rgba(255, 255, 255, 0.8)'
            },
            '& .ProseMirror pre': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: '1em',
              borderRadius: '4px',
              overflow: 'auto',
              color: '#64ffda',
              border: '1px solid rgba(100, 255, 218, 0.2)'
            },
            '& .ProseMirror code': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              color: '#64ffda',
              fontSize: '0.9em'
            }
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={saving}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          disabled={saving}
          sx={{
            bgcolor: '#64ffda',
            color: '#0a0a0a',
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