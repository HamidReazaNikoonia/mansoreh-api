const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  short_details: String,
  author: String,
  category: {
    type: String,
    enum: ['ielts', 'tofel'],
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upload',
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Post', postSchema);
