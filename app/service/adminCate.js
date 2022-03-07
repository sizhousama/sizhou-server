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
}

module.exports = AdminCate;
