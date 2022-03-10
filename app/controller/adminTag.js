/*
 * @Author: sizhou
 * @Date: 2020-11-16 11:23:39
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:34:14
 */
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class AdminTagController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.validate({
      name: { type: 'string', allowEmpty: true, required: false },
      catId: { type: 'id', allowEmpty: true, required: false },
      status: { type: 'string', allowEmpty: true, required: false },
    }, ctx.query);
    ctx.body = Success(1, 'Success', await ctx.service.adminTag.tagList(ctx.query));
  }

  async add() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      category_id: 'int',
      name: 'string',
      en_name: 'string',
    });
    let status = 400;
    await ctx.service.adminTag.tagAdd(body);
    status = 1;
    ctx.body = Success(status, 'Success');
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.adminTag.tagDelete(id);
    ctx.body = Success(1, 'Success', { id });
  }

  async update() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'int', required: true },
      category_id: { type: 'int' },
      name: { type: 'string' },
      en_name: { type: 'string' },
    });
    await ctx.service.adminTag.tagUpdate(ctx.request.body);
    ctx.body = Success(1, 'Success');
  }

  async get() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) {
      ctx.body = Success(1, 'id is required');
    }
    const tag = await ctx.service.adminTag.tagGet(id);
    ctx.body = Success(1, 'Success', tag);
  }
}

module.exports = AdminTagController;
