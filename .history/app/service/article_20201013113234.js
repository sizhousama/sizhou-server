
'use strict';
const Service = require('egg').Service;
const { literal } = require('sequelize');

class Article extends Service {
  async articles({ page, size, category, tag, orderType }) {
    const where = { status: 1 };
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
    return { total: count, articles: rows };
  }

  async userArticles({ page, size, uid, orderType }) {
    const where = { status: 1, uid };
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
      ],
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
          attributes: [ 'id', 'name', 'en_name' ],
        },
      ],
    });
    return { total: count, articles: rows };
  }

  async detail({ id }) {
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
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
            'github',
            'weibo',
            'website',
            'gitee',
          ],
        },
      ],
    });
  }

  async deleteArticle(id) {
    return this.ctx.model.Article.update(
      {
        status: 2,
      },
      {
        where: { id },
      }
    );
  }

  async viewPlusOne(id) {
    return this.ctx.model.Article.update(
      {
        view: literal('view + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async favoritePlusOne(id) {
    return this.ctx.model.Article.update(
      {
        favorite: literal('favorite + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async commentPlusOne(id) {
    return this.ctx.model.Article.update(
      {
        comment: literal('comment + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async favoriteReduceOne(id) {
    return this.ctx.model.Article.update(
      {
        favorite: literal('favorite - 1'),
      },
      {
        where: { id },
      }
    );
  }

  async createPublish(params, uid) {
    const {
      markdown,
      title,
      html,
      selectedTag,
      selectedCategory,
      coverImageUrl,
    } = params;
    return this.ctx.model.Article.create({
      markdown,
      title,
      html,
      tag_id: selectedTag,
      category_id: selectedCategory,
      cover: coverImageUrl,
      uid,
    });
  }

  async updatePublish(params) {
    const { id, markdown, title, html, selectedTag, selectedCategory } = params;
    return this.ctx.model.Article.update(
      {
        markdown,
        title,
        html,
        tag_id: selectedTag,
        category_id: selectedCategory,
      },
      {
        where: { id },
      }
    );
  }
}

module.exports = Article;
