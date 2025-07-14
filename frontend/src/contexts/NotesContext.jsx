import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // Set Authorization header if token exists
  const setAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } else {
      delete axios.defaults.headers.common['Authorization'];
      return false;
    }
  };

  const fetchNotes = async (filter = 'all', search = '') => {
    // Only fetch if authenticated
    if (!isAuthenticated()) {
      setNotes([]);
      return;
    }

    setLoading(true);
    try {
      // Ensure auth header is set
      setAuthHeader();
      
      const response = await axios.get(`https://scribz-api.onrender.com/api/notes?filter=${filter}&search=${search}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      if (error.response?.status === 401) {
        // Token is invalid, clear it
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setNotes([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData) => {
    if (!isAuthenticated()) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      setAuthHeader();
      const response = await axios.post('https://scribz-api.onrender.com/api/notes', noteData);
      setNotes(prev => [response.data, ...prev]);
      return { success: true, note: response.data };
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create note' 
      };
    }
  };

  const updateNote = async (id, noteData) => {
    if (!isAuthenticated()) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      setAuthHeader();
      const response = await axios.put(`https://scribz-api.onrender.com/api/notes/${id}`, noteData);
      setNotes(prev => prev.map(note => 
        note._id === id ? response.data : note
      ));
      return { success: true, note: response.data };
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update note' 
      };
    }
  };

  const deleteNote = async (id) => {
    if (!isAuthenticated()) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      setAuthHeader();
      await axios.delete(`https://scribz-api.onrender.com/api/notes/${id}`);
      setNotes(prev => prev.filter(note => note._id !== id));
      return { success: true };
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete note' 
      };
    }
  };

  const toggleFavorite = async (id) => {
    if (!isAuthenticated()) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      setAuthHeader();
      const response = await axios.patch(`https://scribz-api.onrender.com/api/notes/${id}/favorite`);
      setNotes(prev => prev.map(note => 
        note._id === id ? response.data : note
      ));
      return { success: true, note: response.data };
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to toggle favorite' 
      };
    }
  };

  const toggleTrash = async (id) => {
    if (!isAuthenticated()) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      setAuthHeader();
      const response = await axios.patch(`https://scribz-api.onrender.com/api/notes/${id}/trash`);
      setNotes(prev => prev.map(note => 
        note._id === id ? response.data : note
      ));
      return { success: true, note: response.data };
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to move to trash' 
      };
    }
  };

  const filterNotes = (filter, search = '') => {
    setCurrentFilter(filter);
    setSearchQuery(search);
    fetchNotes(filter, search);
  };

  // Only fetch notes if user is authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      fetchNotes(currentFilter, searchQuery);
    }
  }, []);

  const value = {
    notes,
    loading,
    currentFilter,
    searchQuery,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    toggleTrash,
    filterNotes,
    isAuthenticated
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}; 