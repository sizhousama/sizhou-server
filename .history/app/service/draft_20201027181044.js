/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-10-27 18:10:44
 */
'use strict';
const Service = require('egg').Service;


class Draft extends Service {
  async draft({ id }) {
    return this.ctx.model.Draft.findOne({ where: { id } });
  }

  async drafts(uid) {
    return this.ctx.model.Draft.findAll({
      where: { uid, status: 1 },
      order: [[ 'updatedAt', 'DESC' ]],
      attributes: [ 'id', 'title', 'is_publish', 'updatedAt' ],
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

  async updatePublishStatus(id) {
    return this.ctx.model.Draft.update(
      { is_publish: 1 },
      {
        where: { id },
      }
    );
  }


}

module.exports = Draft;
