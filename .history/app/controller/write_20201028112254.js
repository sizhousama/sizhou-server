
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class WriteController extends Controller {
  // 草稿
  async draft() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
    }, ctx.query);
    const draft = await ctx.service.draft.draft(ctx.query);
    ctx.body = Success(1, 'Success', draft);
  }

  async drafts() {
    const { ctx } = this;
    const { uid } = ctx.locals;
    ctx.body = Success(1, 'Success', await ctx.service.draft.drafts(uid));
  }

  async createDraft() {
    const { ctx } = this;
    ctx.validate({
      title: { type: 'string', required: false },
      markdown: { type: 'string', required: false },
      catId: { type: 'int', required: false },
    });
    const { uid } = ctx.locals;
    const draft = await ctx.service.draft.createDraft(ctx.request.body, uid);
    ctx.body = Success(1, 'Success', draft);
  }

  async updateDraft() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'int' },
      title: { type: 'string', required: false },
      markdown: { type: 'string', required: false },
      catId: { type: 'int', required: false },
      tagId: { type: 'int', required: false },
      coverImg: { type: 'string', required: false },
    });
    await ctx.service.draft.updateDraft(ctx.request.body);
    ctx.body = Success(1, 'Success');
  }

  async deleteDraft() {
    const { ctx } = this;
    ctx.validate({ id: 'int' });
    const { id } = ctx.request.body;
    await ctx.service.draft.deleteDraft(id);
    ctx.body = Success(1, 'Success', { id });
  }
  // 文章
  async createPublish() {
    const { ctx } = this;
    ctx.validate({
      draftId: { type: 'int' },
      markdown: { type: 'string' },
      title: { type: 'string' },
      html: { type: 'string', required: false },
      selectedTag: { type: 'int' },
      selectedCategory: { type: 'int' },
      coverImageUrl: { type: 'string', required: false },
    });
    const { uid } = ctx.locals;
    await ctx.service.article.createPublish(ctx.request.body, uid);
    ctx.body = Success(1, 'Success');
  }

  async articleDetail() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
    }, ctx.query);
    const [ , detail ] = await Promise.all([
      ctx.service.article.viewPlusOne(ctx.query.id),
      ctx.service.article.detail(ctx.query),
    ]);
    await ctx.service.user.viewPlusOne(detail.user.id);
    ctx.body = Success(1, 'Success', detail);
  }

  async updateArticle() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'int' },
      markdown: { type: 'string' },
      title: { type: 'string' },
      html: { type: 'string', required: false },
      selectedTag: { type: 'int' },
      selectedCategory: { type: 'int' },
      coverImageUrl: { type: 'string', required: false },
    });
    await ctx.service.article.updatePublish(ctx.request.body);
    ctx.body = Success(1, 'Success');
  }

  async deleteArticle() {
    const { ctx } = this;
    ctx.validate({ id: 'int' });
    const { id } = ctx.request.body;
    await ctx.service.article.deleteArticle(id);
    ctx.body = Success(1, 'Success', { id });
  }

}

module.exports = WriteController;
