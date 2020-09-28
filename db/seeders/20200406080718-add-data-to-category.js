'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: '后端',
        en_name: 'back',
      },
      {
        name: '前端',
        en_name: 'frontend',
      },
      {
        name: 'Android',
        en_name: 'Android',
      },
      {
        name: 'IOS',
        en_name: 'IOS',
      },
      {
        name: '人工智能',
        en_name: 'ai',
      },
      {
        name: '大数据',
        en_name: 'bigdate',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
