/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-04 18:51:25
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
      attributes: [],
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
      attributes: [ 'replys' ],
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
      for (let i = 0; i < res.rows.length; i++) {
        res.rows[i].replys = [];
      }
      // rows.forEach(one => {

      //   one.replys = [{ id: 1 }];
      //   list.forEach(item => {
      //     if (item.parent_id === one.id) {
      //       one.replys.push(item);
      //       this.ctx.model.User.findOne({
      //         where: { id: item.reply_id },
      //         attributes: [ 'id', 'username', 'profession', 'avatar', 'total_like' ],
      //       }).then(res => {
      //         item.reply_user = res;
      //       });
      //     }
      //   });
      //   one.reply_count = one.replys.length;
      // });
      comments = rows;
    });
    console.log(comments);
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
