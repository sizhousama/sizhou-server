'use strict';
const Service = require('egg').Service;

class Comment extends Service {
  async comments(query) {
    const where = { status: 1 };
    if (query) where.article_id = query.id;
    return this.ctx.model.Comment.findAll({
      where,
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
          ],
        },
        {
          model: this.ctx.model.Article,
          as: 'article',
          attributes: [ 'view', 'title', 'favorite', 'id', 'comment' ],
        },
      ],
    });
  }

  async deleteComment(id) {
    return this.ctx.model.Comment.update(
      {
        status: 2,
      },
      {
        where: { id },
      }
    );
  }

  async createComment(params, uid) {
    const result = await this.ctx.model.Comment.create({
      ...params,
      uid,
    });

    const comment = await this.ctx.model.Comment.findOne({
      where: { id: result.id },
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
          ],
        },
      ],
    });
    return comment;
  }
}

module.exports = Comment;
