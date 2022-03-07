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
}

module.exports = AdminTag;
