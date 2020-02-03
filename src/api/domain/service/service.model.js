const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');


/**
 * User Schema
 * @private
 */
const serviceSchema = new mongoose.Schema({
  _user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  family: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  telegram: String,
  send_via: {
    type: String,
    enum: ['telegram', 'email'],
    visited: {
      type: Boolean,
      default: false,
    },
    payment_status: {
      type: Boolean,
      default: false,
    },
    call_to_user: {
      type: Boolean,
      default: false,
    },
    serviceType: {
      type: String,
      enum: ['ielts', 'tofel'],
      required: true,
    },
    serviceKind: {
      type: String,
      enum: ['speaking', 'writing'],
      required: true,
    },
    service_file: {
      type: String,
    },
    service_result: {
      type: String,
    },
    invoice_id: String,


  },
}, {
  timestamps: true,
});

/**
 * @typedef Service
 */
module.exports = mongoose.model('Service', serviceSchema);
