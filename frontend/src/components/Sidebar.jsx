import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography
} from '@mui/material';
import {
  Note as NoteIcon,
  Favorite as FavoriteIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const Sidebar = ({ currentFilter, onFilterChange }) => {
  const menuItems = [
    { text: 'All Notes', icon: <NoteIcon />, filter: 'all' },
    { text: 'Favorites', icon: <FavoriteIcon />, filter: 'favorites' },
    { text: 'Trash', icon: <DeleteIcon />, filter: 'trash' }
  ];

  return (
    <Box sx={{ 
      height: '100%',
      bgcolor: 'rgba(255, 255, 255, 0.03)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)'
    }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ 
          color: '#64ffda',
          fontWeight: 'bold'
        }}>
          Scribz
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={currentFilter === item.filter}
              onClick={() => onFilterChange(item.filter)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(100, 255, 218, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(100, 255, 218, 0.15)'
                  }
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              <ListItemIcon sx={{ color: currentFilter === item.filter ? '#64ffda' : 'rgba(255, 255, 255, 0.7)' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  color: currentFilter === item.filter ? '#64ffda' : 'rgba(255, 255, 255, 0.7)',
                  '& .MuiTypography-root': {
                    fontWeight: currentFilter === item.filter ? 600 : 400
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar; 