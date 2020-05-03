"use strict";

var Kavenegar = require('kavenegar');

var API_KEY = '4758505236384A622F716163546477704F645859417A7565367452396B37726C6B4D393738314A375A51383D';
var api = Kavenegar.KavenegarApi({
  apikey: API_KEY
});
module.exports = api;