const express = require('express');
const uploder = require('../../services/upload');
const Upload = require('../../domain/upload/upload.model');

const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/service/i/w', (req, res, next) => {
  res.render('services/ielts_writing');
});


router.post('/upload', uploder.single('singleFile'), async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      res.status(400).json({
        status: 'failed',
        code: '400',
        message: 'Please upload file',
      });
    }

    const fileUploded = {
      file_name: file.filename,
      field_name: file.fieldname,
    };
    const newUpload = new Upload(fileUploded);
    const uploadedFile = await newUpload.save();

    res.status(200).json({
      uploadedFile,
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
