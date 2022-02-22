/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-04 18:29:56
 */
'use strict';
const Service = require('egg').Service;

class Comment extends Service {
  async comments({ page, size, articleId }) {
    const where = { status: 1, parent_id: 0, article_id: articleId };
    let comments = '';
    let total = 0;
    const list = await this.ctx.model.Comment.findAll({
      where: { status: 1, article_id: articleId },
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
      ],
    });
    await this.ctx.model.Comment.findAndCountAll({
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
      ],
    }).then(res => {
      const { rows, count } = res;
      total = count;
      rows.forEach(one => {
        console.log(one);
        one[0].dataValues.replys = [];
        list.forEach(item => {
          if (item[0].dataValues.parent_id === one[0].dataValues.id) {
            one[0].dataValues.replys.push(item);
            this.ctx.model.User.findOne({
              where: { id: item.reply_id },
              attributes: [ 'id', 'username', 'profession', 'avatar', 'total_like' ],
            }).then(res => {
              item[0].dataValues.reply_user = res;
            });
          }
        });
        one[0].dataValues.reply_count = one.replys.length;
      });
      comments = rows;
    });
    return { total, comments };

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
    const user = this.ctx.model.User.findOne({
      where: { id: replyId },
      attributes: [ 'id', 'username', 'profession', 'avatar', 'total_like' ],
    });
    let comment = '';
    await this.ctx.model.Comment.findOne({
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
      ],
    }).then(res => {
      comment = res;
      comment.reply_user = user;
    });
    return comment;
  }
}

module.exports = Comment;
