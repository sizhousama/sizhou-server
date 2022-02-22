/*
 * @Author: sizhou
 * @Date: 2020-09-09 15:48:11
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-04 11:25:57
 */

'use strict';
const { USERNAME, PASSWORD, PORT, HOST, DATABASE } = require('./secret');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599636596444_2961';

  // add your middleware config here
  config.middleware = [ 'auth' ];

  config.auth = {
    enable: true,
    ignore: [
      '/articles',
      '/tags',
      '/categories',
      '/user/register',
      '/user/login',
      '/user/articleDetail',
      '/article/comments',
    ],
  };
  config.multipart = {
    mode: 'file',
    fileSize: '50mb', // 接收文件大小
    whitelist: [ // 允许接收的文件类型
      '.png',
      '.jpg',
      '.jpeg',
    ],
  };
  config.logger = {
    consoleLevel: 'DEBUG',
  };


  config.sequelize = {
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: DATABASE,
    host: HOST,
    port: PORT,
    username: USERNAME,
    password: PASSWORD,
    logging: false,
    timezone: '+08:00',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    credentials: true,
    // origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    onerror: {
      all(err, ctx) {
        ctx.status = 200;
        ctx.body = { status: err.status, message: err.message };
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

