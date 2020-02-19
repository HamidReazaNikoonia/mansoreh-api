const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: String,
  short_details: String,
  demo_page: [String],
  price: Number,
  author: String,
  category: {
    type: String,
    enum: ['ielts', 'tofel'],
  },
  cover: {
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
    },
    color: {
      type: String,
      default: 'null',
    },
  },
  file_url: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upload',
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Book', bookSchema);
