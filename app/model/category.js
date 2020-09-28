/*
 * @Author: sizhou
 * @Date: 2020-09-17 19:32:30
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-17 19:34:11
 */
'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Category = app.model.define('categories', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      defaultValue: null,
    },
    en_name: {
      type: STRING(50),
      defaultValue: null,
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
  });
  Category.associate = () => {
    app.model.Category.hasMany(app.model.Tag, { as: 'tags' });
    app.model.Category.hasMany(app.model.Article, { as: 'article' });
  };
  return Category;
};
