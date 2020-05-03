const Kavenegar = require('kavenegar');

const API_KEY = '4758505236384A622F716163546477704F645859417A7565367452396B37726C6B4D393738314A375A51383D';


const api = Kavenegar.KavenegarApi({
  apikey: API_KEY,
});

module.exports = api;
