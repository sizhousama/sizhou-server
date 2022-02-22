/*
 * @Author: sizhou
 * @Date: 2020-11-16 11:23:39
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:33:54
 */
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class AdminController extends Controller {
  async draftlist() {
    try {
      const { ctx } = this;
      ctx.validate({
        page: { type: 'string' },
        size: { type: 'string' },
        orderType: { type: 'string' },
        status: { type: 'string', required: false },
      }, ctx.query);
      const data = await ctx.service.admin.draftList({ ...ctx.query });
      ctx.body = Success(1, 'Success', data);
    } catch (e) {
      console.log(e);
    }
  }
  async categoryList() {
    const { ctx } = this;
    ctx.validate({
      status: { type: 'string', required: false },
    }, ctx.query);
    const data = await ctx.service.admin.categoryList(ctx.query);
    ctx.body = Success(1, 'Success', data);
  }
  async tags() {
    const { ctx } = this;
    ctx.validate({
      name: { type: 'string', allowEmpty: true, required: false },
      catId: { type: 'id', allowEmpty: true, required: false },
      status: { type: 'string', allowEmpty: true, required: false },
    }, ctx.query);
    ctx.body = Success(1, 'Success', await ctx.service.tag.tags(ctx.query));
  }

}

module.exports = AdminController;
