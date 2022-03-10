/*
 * @Author: sizhou
 * @Date: 2020-11-16 11:23:39
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:34:14
 */
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class AdminCateController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.validate({
      status: { type: 'string', required: false },
    }, ctx.query);
    const data = await ctx.service.adminCate.categoryList(ctx.query);
    ctx.body = Success(1, 'Success', data);
  }

  async add() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      name: 'string',
      en_name: 'string',
    });
    let status = 400;
    await ctx.service.adminCate.categoryAdd(body);
    status = 1;
    ctx.body = Success(status, 'Success');
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.adminCate.categoryDelete(id);
    ctx.body = Success(1, 'Success', { id });
  }

  async update() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'int', required: true },
      name: { type: 'string' },
      en_name: { type: 'string' },
    });
    await ctx.service.adminCate.categoryUpdate(ctx.request.body);
    ctx.body = Success(1, 'Success');
  }

  async get() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) {
      ctx.body = Success(1, 'id is required');
    }
    const tag = await ctx.service.adminCate.categoryGet(id);
    ctx.body = Success(1, 'Success', tag);
  }

}

module.exports = AdminCateController;
