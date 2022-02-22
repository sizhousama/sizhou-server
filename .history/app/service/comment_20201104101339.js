/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-04 10:13:39
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
    const list = await this.ctx.model.Comment.findAll({
      where:{status:1,article_id: articleId},
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
    rows.forEach(one=>{
      one.replys=[]
      list.forEach(item=>{
        if(item.parent_id === one.id){
          one.replys.push(item)
          await this.ctx.model.User.findOne({
            where:{id:item.reply_id},
            attributes:['id','username']
          }).then(res=>{
            item.reply_user = res
          })
        }
      })
    })
    return { total: count, comments: rows };
  }

  // async comments({ parentId }) {
  //   const where = { status: 1, parent_id: parentId };
  //   return this.ctx.model.Comment.findAll({
  //     where,
  //     include: [
  //       {
  //         model: this.ctx.model.User,
  //         as: 'user',
  //         attributes: [
  //           'id',
  //           'username',
  //           'total_like',
  //           'total_comment',
  //           'profession',
  //           'avatar',
  //         ],
  //       },
  //     ],
  //   });
  // }

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
