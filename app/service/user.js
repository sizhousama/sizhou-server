/*
 * @Author: sizhou
 * @Date: 2020-09-10 11:59:42
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-02 20:07:56
 */
'use strict';
const Service = require('egg').Service;
const { literal } = require('sequelize');
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

  async getUserPassword(id) {
    return this.ctx.model.User.findOne({
      where: { id, status: 1 },
      attributes: [ 'password' ],
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

  async viewPlusOne(id) {
    return this.ctx.model.User.update(
      {
        total_view: literal('total_view + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async favoritePlusOne(id) {
    return this.ctx.model.User.update(
      {
        total_like: literal('total_like + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async commentPlusOne(id) {
    return this.ctx.model.User.update(
      {
        total_comment: literal('total_comment + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async favoriteReduceOne(id) {
    return this.ctx.model.User.update(
      {
        total_like: literal('total_like - 1'),
      },
      {
        where: { id },
      }
    );
  }

}

module.exports = User;
