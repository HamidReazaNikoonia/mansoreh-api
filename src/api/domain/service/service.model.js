/* eslint-disable no-mixed-operators */
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
    ref: 'User',
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
  details: String,
  mobile: {
    type: String,
    required: true,
  },
  telegram: String,
  send_via: {
    type: String,
    enum: ['telegram', 'email', 'both'],
  },
  price: {
    type: Number,
    default: 0,
  },
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
  service_type: {
    type: String,
    enum: ['ielts', 'tofel'],
    required: true,
  },
  service_kind: {
    type: String,
    enum: ['speaking', 'writing'],
    required: true,
  },
  service_file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upload',
  },
  service_result: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upload',
  },
  invoice_id: {
    type: String,
    default: () => Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
  },
}, {
  timestamps: true,
});

/**
 * @typedef Service
 */
module.exports = mongoose.model('Service', serviceSchema);
