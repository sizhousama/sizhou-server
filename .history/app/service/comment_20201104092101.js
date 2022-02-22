/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-04 09:21:01
 */
'use strict';
const Service = require('egg').Service;

class Comment extends Service {
  async comments({ page, size, articleId }) {
    const where = { status: 1, parent_id: 0, article_id: articleId };
    const { count, rows } = await this.ctx.model.Comment.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(size),
      limit: parseInt(size),
      order: [[ 'createdAt', 'DESC' ]],
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
          ],
        },
      ],
    });
    return { total: count, comments: rows };
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
