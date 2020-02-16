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
  cover: {
    image: mongoose.Schema.Types.ObjectId,
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
