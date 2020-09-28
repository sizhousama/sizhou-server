'use strict';

const crypto = require('crypto');
const { SECRET } = require('../../config/secret');


const generatePassWord = str => {
  return crypto.createHmac('sha256', SECRET).update(str).digest('hex');
};
const genId = length => {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
};

module.exports = { generatePassWord, genId };
