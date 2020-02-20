const express = require('express');
const uploder = require('../../services/upload');
const Upload = require('../../domain/upload/upload.model');
const Services = require('../../domain/service/service.model');
const Book = require('../../domain/book/book.model');
const checkForExist = require('../../services/core/checkForExist');
const ZarinpalCheckout = require('../../services/payment');
const Post = require('./../../domain/post/post.model');

const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index');
});

// Services Pages

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


// dashboard routes

router.get('/dashboard', async (req, res, next) => {
  try {
    const services = await Services.find();
    res.render('dashboard/index', {
      services,
    });
  } catch (e) {
    next(e);
  }
});


router.get('/dashboard/service/:id', async (req, res, next) => {
  try {
    const data = {
      visited: true,
    };
    // change product (visited) status
    await Services.findByIdAndUpdate(req.params.id, data);
    const service = await Services.findById(req.params.id).populate('service_file service_result');

    res.render('dashboard/show_product', {
      service,
    });
  } catch (e) {
    next(e);
  }
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


// Upload routes


// router.post('/test', (req, res, next) => {
//   const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
//   zarinpal.PaymentRequest({
//     Amount: '1000',
//     CallbackURL: 'http://siamak.us',
//     Description: 'Hello NodeJS API.',
//     Email: 'hi@maid.work',
//     Mobile: '09120000000',
//   }).then((response) => {
//     if (response.url && response.status == 100) {
//       const callBackUrl = response.url || false;

//       if (callBackUrl) {
//         res.redirect(callBackUrl);
//       }
//     } else {
//       res.json({
//         error: '',
//       });
//     }
//   });
// });


// dashboard book


router.get('/dashboard/book', async (req, res, next) => {
  res.render('dashboard/book');
});

router.get('/dashboard/book/create', async (req, res, next) => {
  res.render('dashboard/book/create');
});


router.get('/dashboard/book/edit/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.json({
        error: 'book not exist',
      });
    }
    const book = await Book.findById(req.params.id).populate('cover.image file_url');

    if (book) {
      res.render('dashboard/book/edit', { book });
    } else {
      res.json({
        error: 'book not exist',
      });
    }
  } catch (error) {
    next(error);
  }
});


// dashboard Post

router.get('/dashboard/post', (req, res, next) => {
  res.render('dashboard/post/index');
});

router.get('/dashboard/post/edit/:id', async (req, res, next) => {
  try {
    const postId = req.params.id || null;
    if (!postId) {
      next();
    } else {
      const post = await Post.findById(postId).populate('image');
      if (post) {
        res.render('dashboard/post/edit', { post });
      } else {
        res.json({
          error: 'post not exist',
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get('/dashboard/post/create', (req, res, next) => {
  try {
    res.render('dashboard/post/create');
  } catch (error) {
    next(error);
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
      return;
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
