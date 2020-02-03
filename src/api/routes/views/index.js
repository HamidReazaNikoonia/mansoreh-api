const express = require('express');


const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/service/i/w', (req, res, next) => {
  res.render('services/ielts_writing');
});

module.exports = router;
