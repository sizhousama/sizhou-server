'use strict';
const Service = require('egg').Service;

class Tag extends Service {
  async tags() {
    return this.ctx.model.Tag.findAll({
      where: { status: 1 },
      attributes: [ 'id', 'name', 'en_name' ],
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
