const express = require('express');
const uploder = require('../../services/upload');

const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/service/i/w', (req, res, next) => {
  res.render('services/ielts_writing');
});


router.post('/upload', uploder.single('singleFile'), (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      res.status(400).json({
        status: 'failed',
        code: '400',
        message: 'Please upload file',
      });
    }

    res.status(200).json({
      status: 'success',
      code: '200',
      message: 'file uploaded successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({
      status: 'failed',
      code: '500',
      message: error.message,
    });
  }
});

module.exports = router;
