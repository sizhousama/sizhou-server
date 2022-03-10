/*
 * @Author: sizhou
 * @Date: 2020-11-16 13:53:22
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:56:01
*/
'use strict';
const Service = require('egg').Service;
const { generatePassWord } = require('../lib/tool_helper');

class AdminUser extends Service {
  async userList({ page, size, orderType, status }) {
    const where = { };
    if (status) where.status = parseInt(status);
    const { count, rows } = await this.ctx.model.User.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(size),
      limit: parseInt(size),
      order: [[ orderType, 'DESC' ]],
      attributes: [
        'username',
        'id',
        'avatar',
        'createdAt',
        'status',
        'email',
        'password',
        'account_type',
      ],
    });
    return { total: count, list: rows, page: parseInt(page), size: parseInt(size) };
  }

  async userAdd(data) {
    const { username, email, password, avatar } = data;
    return this.ctx.model.User.create({
      username,
      avatar,
      email,
      password: generatePassWord(password),
    });
  }

  async userDelete(id) {
    return this.ctx.model.User.update({
      status: 2,
    }, {
      where: { id },
    });
  }

  async userUpdate(params) {
    const { id, avatar, username, email, account_type } = params;
    return this.ctx.model.User.update(
      {
        avatar,
        username,
        email,
        account_type,
      },
      {
        where: { id },
      }
    );
  }

  async userGet(id) {
    return this.ctx.model.User.findOne({
      where: { id, status: 1 },
      attributes: [
        'id',
        'username',
        'email',
        'password',
        'avatar',
        'account_type',
      ],
    });
  }
}

module.exports = AdminUser;
