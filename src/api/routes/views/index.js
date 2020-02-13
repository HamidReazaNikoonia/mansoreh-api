const express = require('express');
const uploder = require('../../services/upload');
const Upload = require('../../domain/upload/upload.model');
const Services = require('../../domain/service/service.model');
const checkForExist = require('../../services/core/checkForExist');

const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/service/i/w', (req, res, next) => {
  res.render('services/ielts_writing');
});

router.get('/service/i/s', (req, res, next) => {
  res.render('services/ielts_speaking');
});

router.get('/service/t/s', (req, res, next) => {
  res.render('services/tofel_speaking');
});

router.get('/service/t/w', (req, res, next) => {
  res.render('services/tofel_writing');
});

router.get('/dashboard', async (req, res, next) => {
  const services = await Services.find();
  res.render('dashboard/index', {
    services,
  });
});


router.get('/dashboard/service/:id', async (req, res, next) => {
  const service = await Services.findById(req.params.id).populate('service_file service_result');
  res.render('dashboard/show_product', {
    service,
  });
});


router.post('/dashboard/service/send_result/:id', async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;

    // check if result exist
    const service = await Services.findById(id);
    if (!service) {
      res.json({
        error: 'Result File Not Exist',
      });
    } else {
      const serviceFile = service.service_result;

      const file = await checkForExist(serviceFile, Upload);
      if (file) {
        const data = {
          call_to_user: true,
        };

        /*
        /* @Param
        /* send_via {telegram, email, sms, both(telegram & email) }
        */

        const user_mobile = service.mobile ? service.mobile : false;
        const user_telegram = service.telegram ? service.telegram : false;
        const user_email = service.email ? service.email : false;
        // eslint-disable-next-line no-unused-vars
        const { send_via } = service;
        // callToUser()
        Services.findByIdAndUpdate(id, data, (err, cb) => {
          if (err) {
            res.json({
              error: 'Cant Update Data !',
            });
          } else {
            res.json({
              cb,
            });
          }
        });
      } else {
        res.json({
          error: 'Result File Not Exist!',
        });
      }
    }
  } catch (e) {
    next(e);
  }
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
