import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  isTrashed: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#ffffff'
  }
}, {
  timestamps: true
});

// Index for efficient queries
noteSchema.index({ user: 1, isTrashed: 1 });
noteSchema.index({ user: 1, isFavorite: 1 });

export default mongoose.model('Note', noteSchema); 