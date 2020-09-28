/*
 * @Author: sizhou
 * @Date: 2020-09-17 18:56:02
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-17 19:16:05
 */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [
      {
        name: '前端',
        en_name: 'frontend',
        category_id: 1,
      },
      {
        name: '后端',
        en_name: 'back',
        category_id: 2,
      },
      {
        name: 'JavaScript',
        en_name: 'JavaScript',
        category_id: 1,
      },
      {
        name: 'react',
        en_name: 'react',
        category_id: 1,
      },
      {
        name: 'Node',
        en_name: 'node',
        category_id: 2,
      },
      {
        name: 'Egg',
        en_name: 'egg',
        category_id: 2,
      },
      {
        name: 'Python',
        en_name: 'python',
        category_id: 2,
      },
      {
        name: 'Vue',
        en_name: 'vue',
        category_id: 1,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  },
};
