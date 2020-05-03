const Post = require('./post.model');

/**
 * Get Book
 *  @public
 */

exports.get = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('image');
    res.json({
      data: posts,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Get Specific Blog
 * @public
 */

exports.getById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const post = await Post.findById(blogId).populate('image');
    res.json({
      data: post,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Create Book
 * @public
 */

exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data) {
      next();
    }

    const newPost = new Post(data);
    const createdPost = await newPost.save();
    res.json({
      data: createdPost,
    });
  } catch (e) {
    next(e);
  }
};


exports.update = async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;
    if (!id || id === '') {
      next();
      return;
    }
    const updatedPost = await Post.findByIdAndUpdate(id, req.body);
    res.json({
      data: updatedPost,
    });
  } catch (e) {
    next(e);
  }
};


exports.delete = async (req, res, next) => {
  try {
    if (!req.params.id) {
      next();
      return;
    }
    const deleted = await Post.findByIdAndDelete(req.params.id);
    res.json({
      data: deleted,
    });
  } catch (e) {
    next(e);
  }
};
