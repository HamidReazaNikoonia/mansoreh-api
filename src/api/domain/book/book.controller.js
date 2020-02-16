const Book = require('./book.model');

/**
 * Get Book
 *  @public
 */

exports.get = async (req, res, next) => {
  try {
    const books = await Book.find().populate('file_url');
    res.json({
      books,
    });
  } catch (e) {
    next(e);
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

    const newBook = new Book(data);
    const createdBook = await newBook.save();
    res.json({
      data: createdBook,
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
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    res.json({
      data: updatedBook,
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
    const deleted = await Book.findByIdAndDelete(req.params.id);
    res.json({
      data: deleted,
    });
  } catch (e) {
    next(e);
  }
};

