/*
 * @Author: sizhou
 * @Date: 2020-09-10 11:37:53
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-12 10:07:59
 */
'use strict';

const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config/secret');

module.exports = () => {
  return async function auth(ctx, next) {
    try {
      const token = ctx.headers.token;
      if (!token) {
        ctx.throw(401, 'token does not exist');
      }
      const { uid, exp, email } = jwt.verify(token, SECRET) || {};
      ctx.locals.uid = uid;
      ctx.locals.exp = exp;
      ctx.locals.email = email;
      await next();
    } catch (e) {
      ctx.body = { code: 401, msg: e.message || 'invalid or expired token' };
    }
  };
};
