
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class WriteController extends Controller {

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
      title: { type: 'string' },
      markdown: { type: 'string' },
    });
    const { uid } = ctx.locals;
    const draft = await ctx.service.draft.createDraft(ctx.request.body, uid);
    ctx.body = Success(1, 'Success', draft);
  }

  async updateDraft() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
      title: { type: 'string' },
      markdown: { type: 'string' },
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

  async createPublish() {
    const { ctx } = this;
    ctx.validate({
      markdown: { type: 'string' },
      title: { type: 'string' },
      html: { type: 'string' },
      selectedTag: { type: 'int' },
      selectedCategory: { type: 'int' },
      coverImageUrl: { type: 'string', required: false },
    });
    const { uid } = ctx.locals;
    await ctx.service.article.createPublish(ctx.request.body, uid);
    ctx.body = Success(1, 'Success');
  }

  async updateArticle() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
      markdown: { type: 'string' },
      title: { type: 'string' },
      html: { type: 'string' },
      selectedTag: { type: 'int' },
      selectedCategory: { type: 'int' },
      coverImageUrl: { type: 'string', required: false },
    });
    await ctx.service.draft.updateDraft(ctx.request.body);
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
