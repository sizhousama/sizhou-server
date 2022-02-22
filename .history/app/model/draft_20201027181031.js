/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-10-27 18:10:31
 */
'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Draft = app.model.define('drafts', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      defaultValue: null,
      comment: '文章标题',
    },
    cover: {
      type: STRING,
      defaultValue: null,
      comment: '文章封面图',
    },
    uid: {
      type: INTEGER,
      allowNull: false,
    },
    markdown: {
      type: TEXT,
      defaultValue: null,
      comment: 'markdown内容',
    },
    article_count: {
      type: INTEGER,
      defaultValue: 0,
      comment: '字数',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
    category_id: {
      type: INTEGER,
      defaultValue: null,
    },
    tag_id: {
      type: INTEGER,
      defaultValue: null,
    },
  });
  Draft.associate = () => {
    app.model.Draft.belongsTo(app.model.User, { as: 'user', foreignKey: 'uid' });
  };
  return Draft;
};
