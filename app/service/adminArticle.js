/*
 * @Author: sizhou
 * @Date: 2020-11-16 13:53:22
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:56:01
*/
'use strict';
const Service = require('egg').Service;

class AdminArticle extends Service {
  async articleList({ page, size, category, tag, orderType, status }) {
    const where = { };
    if (status) where.status = parseInt(status);
    if (category) where.category_id = category;
    if (tag) where.tag_id = tag;
    const { count, rows } = await this.ctx.model.Article.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(size),
      limit: parseInt(size),
      order: [[ orderType, 'DESC' ]],
      attributes: [
        'view',
        'title',
        'favorite',
        'id',
        'comment',
        'cover',
        'createdAt',
        'status',
      ],
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
          attributes: [ 'id', 'name', 'en_name' ],
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
          attributes: [ 'id', 'name', 'en_name' ],
        },
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username', 'avatar' ],
        },
      ],
    });
    return { total: count, articles: rows, page: parseInt(page), size: parseInt(size) };
  }

  async articleDelete(id) {
    return this.ctx.model.Article.update(
      {
        status: 2,
      },
      {
        where: { id },
      }
    );
  }

  async articleGet(id) {
    return this.ctx.model.Article.findOne({
      where: { id },
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
        },
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
          ],
        },
      ],
    });
  }

  async articleUpdate(params) {
    const { id, markdown, title, html, tag_id, category_id, cover, view, favorite } = params;
    return this.ctx.model.Article.update(
      {
        markdown,
        title,
        html,
        tag_id,
        category_id,
        cover,
        view,
        favorite,
      },
      {
        where: { id },
      }
    );
  }
}

module.exports = AdminArticle;
