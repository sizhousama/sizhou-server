/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-02 09:29:19
 */
'use strict';
const Service = require('egg').Service;


class Draft extends Service {
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


  async draft({ id }) {
    return this.ctx.model.Draft.findOne({
      where: { id },
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
          attributes: [ 'id', 'name', 'en_name' ],
        },
      ],
    });
  }

  async drafts(uid) {
    return this.ctx.model.Draft.findAll({
      where: { uid, status: 1 },
      order: [[ 'updatedAt', 'DESC' ]],
      attributes: [ 'id', 'title', 'updatedAt' ],
    });
  }

  async createDraft(params, uid) {
    const { title, markdown, catId } = params;
    const obj = { title, markdown, category_id: catId };
    return this.ctx.model.Draft.create({ ...obj, uid });
  }

  async updateDraft(params) {
    const { title, markdown, catId, tagId, coverImg, id } = params;
    return this.ctx.model.Draft.update(
      { title, markdown, category_id: catId, tag_id: tagId, cover: coverImg },
      {
        where: { id },
      }
    );
  }

  async deleteDraft(id) {
    return this.ctx.model.Draft.update({
      status: 2,
    }, {
      where: { id },
    });
  }
}

module.exports = Draft;
