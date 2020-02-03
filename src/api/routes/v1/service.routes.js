const express = require('express');
const serviceController = require('../../domain/service/service.controller');


const router = express.Router();

router
  .route('/')
  .get(serviceController.get)
  .post(serviceController.create);

module.exports = router;
