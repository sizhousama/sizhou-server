/*
 * @Author: sizhou
 * @Date: 2020-11-16 13:53:22
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:56:01
*/
'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class AdminTag extends Service {
  async tagList({ name, catId, status }) {
    const where = {};
    if (status) where.status = status;
    if (name) {
      where.name = {
        [Op.like]: '%' + name + '%',
      };
    }
    if (catId) {
      where.category_id = catId;
    }
    return this.ctx.model.Tag.findAll({
      where,
      attributes: [ 'id', 'category_id', 'name', 'en_name', 'createdAt', 'status' ],
      include: [{
        model: this.ctx.model.Category,
        as: 'category',
        attributes: [ 'id', 'name', 'en_name' ],
      }],
    });
  }

  async tagAdd(data) {
    return this.ctx.model.Tag.create(data);
  }

  async tagDelete(id) {
    return this.ctx.model.Tag.update({
      status: 2,
    }, {
      where: { id },
    });
  }

  async tagUpdate(data) {
    const { id, category_id, name, en_name } = data;
    return this.ctx.model.Tag.update(
      {
        category_id,
        name,
        en_name,
      },
      {
        where: { id },
      }
    );
  }

  async tagGet(id) {
    return this.ctx.model.Tag.findOne({
      where: { id, status: 1 },
      attributes: [
        'id',
        'category_id',
        'name',
        'en_name',
      ],
    });
  }
}

module.exports = AdminTag;
