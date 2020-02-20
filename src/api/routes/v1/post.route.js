const express = require('express');
const postController = require('../../domain/post/post.controller');

const Route = express.Router();

Route
  .route('/')
  .get(postController.get)
  .post(postController.create);

Route
  .route('/:id')
  .put(postController.update)
  .delete(postController.delete);


module.exports = Route;
