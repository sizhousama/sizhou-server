/*
 * @Author: sizhou
 * @Date: 2020-11-16 11:23:39
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 11:37:56
 */
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class AdminController extends Controller {
  async draftlist() {
    const { ctx } = this;
    const err = ctx.validate({
      page: { type: 'string' },
      size: { type: 'string' },
      orderType: { type: 'string' },
      status: { type: 'string', require: false },
    }, ctx.query);
    console.log(err);
    ctx.validate({
      page: { type: 'string' },
      size: { type: 'string' },
      orderType: { type: 'string' },
      status: { type: 'string', require: false },
    }, ctx.query);
    const data = await ctx.service.draft.draftList({ ...ctx.query });
    ctx.body = Success(1, 'Success', data);
  }
}

module.exports = AdminController;
