const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const serviceRoutes = require('./service.routes');
const bookRoutes = require('./book.routes');
const postRoutes = require('./post.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/books', bookRoutes);
router.use('/posts', postRoutes);

module.exports = router;
