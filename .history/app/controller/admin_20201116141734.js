/*
 * @Author: sizhou
 * @Date: 2020-11-16 11:23:39
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 11:44:10
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
    ctx.body = Success(1, 'Success', await ctx.service.category.categories());
  }
}

module.exports = AdminController;
