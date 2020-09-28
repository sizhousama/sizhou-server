/*
 * @Author: sizhou
 * @Date: 2020-09-10 11:59:42
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-12 10:36:36
 */
'use strict';
const Service = require('egg').Service;
// const { literal } = require('sequelize');
const { generatePassWord } = require('../lib/tool_helper');

class User extends Service {
  async register(data) {
    const { email, password } = data;
    return this.ctx.model.User.create({
      email,
      password: generatePassWord(password),
    });
  }
  async findUser(data) {
    const { email } = data;
    return this.ctx.model.User.findOne({
      where: { email, status: 1 },
    });
  }

  async queryUserById(id) {
    return this.ctx.model.User.findOne({
      where: { id, status: 1 },
      attributes: [
        'id',
        'username',
        'email',
        'nickname',
        'avatar',
        'website',
        'github',
        'gitee',
        'weibo',
        'profession',
        'summary',
        'total_view',
        'total_like',
        'account_type',
      ],
    });
  }

  async updateUser(params, id) {
    return this.ctx.model.User.update(params, { where: { id } });
  }

}

module.exports = User;
