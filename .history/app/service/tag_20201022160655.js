/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-10-22 16:06:54
 */
'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class Tag extends Service {
  async tags({ name, catId }) {
    const where = {
      status: 1,
      name: {
        [Op.like]: '%' + name + '%',
      },
    };
    if(name){
      where.name= {
        [Op.like]: '%' + name + '%',
      },
    }
    if (catId) {
      where.category_id = catId;
    }
    return this.ctx.model.Tag.findAll({
      where,
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
