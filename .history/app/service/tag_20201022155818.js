'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class Tag extends Service {
  async tags({ name, cid }) {
    return this.ctx.model.Tag.findAll({
      where: {
        status: 1,
        category_id: cid,
        name: {
          [Op.like]: '%' + name + '%',
        },
      },
      attributes: [ 'id', 'category_id', 'name', 'en_name' ],
      include: [{
        model: this.ctx.model.Category,
        as: 'category',
        attributes: [ 'id', 'name', 'en_name' ],
      }],
    });
  }

  async createTag(data) {
    return this.ctx.model.Tag.create(data);
  }

  async deleteTag(id) {
    return this.ctx.model.Tag.update({
      status: 2,
    }, {
      where: { id },
    });
  }
}

module.exports = Tag;
