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

}

module.exports = AdminCateController;
