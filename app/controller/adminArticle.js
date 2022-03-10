/*
 * @Author: sizhou
 * @Date: 2020-11-16 11:23:39
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:34:14
 */
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class AdminArticleController extends Controller {
  async list() {
    try {
      const { ctx } = this;
      ctx.validate({
        page: { type: 'string' },
        size: { type: 'string' },
        orderType: { type: 'string' },
        status: { type: 'string', required: false },
      }, ctx.query);
      const data = await ctx.service.adminArticle.articleList({ ...ctx.query });
      ctx.body = Success(1, 'Success', data);
    } catch (e) {
      console.log(e);
    }
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.adminArticle.articleDelete(id);
    ctx.body = Success(1, 'Success', { id });
  }

  async update() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'int', required: true },
    });
    await ctx.service.adminArticle.articleUpdate(ctx.request.body);
    ctx.body = Success(1, 'Success');
  }

  async get() {
    const { ctx } = this;
    const { id } = ctx.params;
    console.log(id);
    const article = await ctx.service.adminArticle.articleGet(id);
    ctx.body = Success(1, 'Success', article);
  }
}

module.exports = AdminArticleController;
