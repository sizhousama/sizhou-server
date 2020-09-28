/*
 * @Descripttion:
 * @version:
 * @Author: sizhou
 * @Date: 2020-09-09 15:48:11
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-21 15:50:32
 */

'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const { Success, Fail } = require('../lib/response_status');
const { generatePassWord } = require('../lib/tool_helper');
const { EXPIRES } = require('../../config/secret');


class User extends Controller {
  async register() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      email: 'string',
      password: 'string',
      repassword: 'string',
    });
    let status = 400;
    const user = await ctx.service.user.findUser(body);
    if (!user) {
      await ctx.service.user.register(body);
      status = 1;
      ctx.body = Success(status, 'Success');
    }
  }
  async login() {
    const { ctx } = this;
    ctx.validate({
      email: 'string',
      password: 'string',
    });

    const { password } = ctx.request.body;
    const user = await ctx.service.user.findUser(ctx.request.body);
    if (!user || generatePassWord(password) !== user.password) {
      ctx.body = Fail(0, '账户或密码不正确，请重新输入');
    } else {
      const obj = { uid: user.id, email: user.email, type: user.account_type };
      const token = jwt.sign(
        obj,
        'secret',
        { expiresIn: EXPIRES }
      );
      ctx.body = Success(1, 'Success', { token });
    }
  }
  async info() {
    const { ctx } = this;
    const { uid, exp } = ctx.locals;
    const user = await ctx.service.user.queryUserById(uid);
    user.dataValues.exp = exp;
    ctx.body = Success(1, 'Success', user);
  }

  async updateInfo() {
    const { ctx } = this;
    ctx.validate({
      email: { type: 'string', allowEmpty: true, required: false },
      avatar: { type: 'string', allowEmpty: true, required: false },
      username: { type: 'string', allowEmpty: true, required: false },
      profession: { type: 'string', allowEmpty: true, required: false },
      summary: { type: 'string', allowEmpty: true, required: false },
      website: { type: 'string', allowEmpty: true, required: false },
      github: { type: 'string', allowEmpty: true, required: false },
      gitee: { type: 'string', allowEmpty: true, required: false },
      weibo: { type: 'string', allowEmpty: true, required: false },
    });
    const { uid, exp } = ctx.locals;
    await ctx.service.user.updateUser(ctx.request.body, uid);
    const user = await ctx.service.user.queryUserById(uid);
    user.dataValues.exp = exp;
    ctx.body = Success(1, 'Success', user);
  }
}

module.exports = User;
