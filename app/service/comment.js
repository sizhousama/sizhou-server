/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-06 19:56:10
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
            'profession',
            'avatar',
          ],
        },
        {
          model: this.ctx.model.Comment,
          as: 'replys',
          include: [
            {
              model: this.ctx.model.User,
              as: 'user',
              attributes: [
                'id',
                'username',
                'total_like',
                'profession',
                'avatar',
              ],
            },
            {
              model: this.ctx.model.User,
              as: 'reply_user',
              attributes: [
                'id',
                'username',
                'total_like',
                'profession',
                'avatar',
              ],
            },
          ],
        },
        {
          model: this.ctx.model.User,
          as: 'reply_user',
          attributes: [
            'id',
            'username',
            'total_like',
            'profession',
            'avatar',
          ],
        },
      ],
    });
    return { total: count, comments: rows };

  }


  async deleteComment(id) {
    return this.ctx.model.Comment.destroy(
      {
        where: { id },
      }
    );
  }

  async createComment(params, uid) {
    const { content, articleId, replyId, parentId } = params;
    const data = {
      content,
      article_id: articleId,
      reply_id: replyId,
      parent_id: parentId,
    };
    const result = await this.ctx.model.Comment.create({
      ...data,
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
            'total_like',
            'profession',
            'avatar',
          ],
        },
        {
          model: this.ctx.model.User,
          as: 'reply_user',
          attributes: [
            'id',
            'username',
            'total_like',
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
