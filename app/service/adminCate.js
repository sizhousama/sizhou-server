/*
 * @Author: sizhou
 * @Date: 2020-11-16 13:53:22
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:56:01
*/
'use strict';
const Service = require('egg').Service;

class AdminCate extends Service {
  async categoryList({ status }) {
    const where = {};
    if (status) where.status = status;
    return this.ctx.model.Category.findAll({
      where,
      attributes: [ 'id', 'name', 'en_name', 'createdAt', 'status' ],
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tags',
          attributes: [ 'id', 'name', 'en_name' ],
        },
      ],
    });
  }

  async categoryAdd(data) {
    return this.ctx.model.Category.create(data);
  }

  async categoryDelete(id) {
    return this.ctx.model.Category.update({
      status: 2,
    }, {
      where: { id },
    });
  }

  async categoryUpdate(data) {
    const { id, name, en_name } = data;
    return this.ctx.model.Category.update(
      { name, en_name },
      { where: { id } }
    );
  }

  async categoryGet(id) {
    return this.ctx.model.Category.findOne({
      where: { id, status: 1 },
      attributes: [
        'id',
        'name',
        'en_name',
      ],
    });
  }
}

module.exports = AdminCate;
