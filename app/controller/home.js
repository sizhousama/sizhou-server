/*
 * @Author: sizhou
 * @Date: 2020-09-18 14:59:17
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-21 17:27:33
 */
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class HomeController extends Controller {
  async categories() {
    const { ctx } = this;
    ctx.body = Success(1, 'Success', await ctx.service.category.categories());
  }
  async tags() {
    const { ctx } = this;
    ctx.body = Success(1, 'Success', await ctx.service.tag.tags());
  }
  async articles() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'string' },
      size: { type: 'string' },
      orderType: { type: 'string' },
      category: { type: 'string', allowEmpty: true, required: false },
      tag: { type: 'string', allowEmpty: true, required: false },
    }, ctx.query);
    const articles = await ctx.service.article.articles(ctx.query);
    ctx.body = Success(1, 'Success', articles);
  }
}

module.exports = HomeController;
