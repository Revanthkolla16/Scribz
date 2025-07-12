import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('Auth middleware: No token provided');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    console.log('Auth middleware: Token received:', token.substring(0, 20) + '...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Auth middleware: Decoded token:', decoded);
    console.log('Auth middleware: Looking for userId:', decoded.userId);
    
    const user = await User.findById(decoded.userId).select('-password');
    console.log('Auth middleware: User found:', user ? `yes (${user.email})` : 'no');
    console.log('Auth middleware: User object:', user);
    
    if (!user) {
      console.log('Auth middleware: User not found, returning 401');
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    console.log('Auth middleware: Setting req.user to:', user.email);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth; 