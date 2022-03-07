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
}

module.exports = AdminTagController;
