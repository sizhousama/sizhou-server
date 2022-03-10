/*
 * @Author: sizhou
 * @Date: 2020-11-16 11:23:39
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:34:14
 */
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class AdminUserController extends Controller {
  async list() {
    try {
      const { ctx } = this;
      ctx.validate({
        page: { type: 'string' },
        size: { type: 'string' },
        orderType: { type: 'string' },
        status: { type: 'string', required: false },
      }, ctx.query);
      const data = await ctx.service.adminUser.userList({ ...ctx.query });
      ctx.body = Success(1, 'Success', data);
    } catch (e) {
      console.log(e);
    }
  }

  async add() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      email: 'string',
      password: 'string',
    });
    let status = 400;
    const user = await ctx.service.user.findUser(body);
    if (!user) {
      await ctx.service.adminUser.userAdd(body);
      status = 1;
      ctx.body = Success(status, 'Success');
    }
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    // ctx.validate({ id: 'int', required: true });
    // const { id } = ctx.request.body;
    await ctx.service.adminUser.userDelete(id);
    ctx.body = Success(1, 'Success', { id });
  }

  async update() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'int', required: true },
      email: { type: 'string' },
      avatar: { type: 'string' },
      username: { type: 'string' },
    });
    await ctx.service.adminUser.userUpdate(ctx.request.body);
    ctx.body = Success(1, 'Success');
  }

  async get() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) {
      ctx.body = Success(1, 'id is required');
    }
    const user = await ctx.service.adminUser.userGet(id);
    ctx.body = Success(1, 'Success', user);
  }
}

module.exports = AdminUserController;
