const express = require('express');
const bookController = require('../../domain/book/book.controller');

const Route = express.Router();

Route
  .route('/')
  .get(bookController.get)
  .post(bookController.create);

Route
  .route('/:id')
  .put(bookController.update)
  .delete(bookController.delete);


module.exports = Route;
