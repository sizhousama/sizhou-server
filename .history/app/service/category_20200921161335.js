/*
 * @Author: sizhou
 * @Date: 2020-09-17 19:29:23
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-21 16:13:36
 */
'use strict';
const Service = require('egg').Service;

class Category extends Service {
  async categories() {
    return this.ctx.model.Category.findAll({
      where: { status: 1 },
      attributes: [ 'id', 'name', 'en_name' ],
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tags',
          attributes: [ 'id', 'name', 'en_name' ],
        },
      ],
    });
  }

  async createCategory(data) {
    return this.ctx.model.Category.create(data);
  }

  async deleteCategory(id) {
    return this.ctx.model.Category.update({
      status: 2,
    }, {
      where: { id },
    });
  }
}

module.exports = Category;
