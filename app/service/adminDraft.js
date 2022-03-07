/*
 * @Author: sizhou
 * @Date: 2020-11-16 13:53:22
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:56:01
*/
'use strict';
const Service = require('egg').Service;

class AdminDraft extends Service {
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
}

module.exports = AdminDraft;
