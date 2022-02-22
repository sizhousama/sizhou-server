/*
 * @Author: sizhou
 * @Date: 2020-11-16 13:53:22
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:33:09
 */
/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-02 09:29:19
 */
'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Admin extends Service {
  async draftList({ page, size, orderType, status }) {
    const where = { };
    if (status) where.status = parseInt(status);
    const { count, rows } = await this.ctx.model.Draft.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(size),
      limit: parseInt(size),
      order: [[ orderType, 'DESC' ]],
      attributes: [
        'title',
        'id',
        'cover',
        'createdAt',
        'updatedAt',
        'status',
      ],
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
          attributes: [ 'id', 'name' ],
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
          attributes: [ 'id', 'name' ],
        },
      ],
    });
    return { total: count, list: rows, page: parseInt(page), size: parseInt(size) };
  }
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
  async tags({ name, catId, status }) {
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

module.exports = Admin;
