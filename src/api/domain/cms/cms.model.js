const mongoose = require('mongoose');


const cmsSchema = new mongoose.Schema({

  home_page: {
    header_title: {
      type: String,
      default: 'This is very good place for translate your content',
    },
    features: {
      title_1: {
        type: String,
        default: 'best quality',
      },
      title_2: {
        type: String,
        default: 'expensive',
      },
      title_3: {
        type: String,
        default: 'trusted',
      },
      content_1: {
        type: String,
        default: 'In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content.',
      },
      content_2: {
        type: String,
        default: 'In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content.',
      },
      content_3: {
        type: String,
        default: 'In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content.',
      },

    },
    steps: {
      step_1_title: {
        type: String,
        default: 'Order your Request',
      },
      step_2_title: {
        type: String,
        default: 'Translate Your Document',
      },
      step_3_title: {
        type: String,
        default: 'Your Request is ready',
      },
      step_1_content: {
        type: String,
        default: 'Order your request at any time you should upload signup and upload your file and pay',
      },
      step_2_content: {
        type: String,
        default: 'We are translate your document in best way with high quality this process till about 4 days',
      },
      step_3_content: {
        type: String,
        default: 'After that you can get your translated document you must to go in your panel and download your result',
      },
    },
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('cms', cmsSchema);
