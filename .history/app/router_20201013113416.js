/*
 * @Author: sizhou
 * @Date: 2020-09-09 15:48:11
 * @LastEditors: sizhou
 * @LastEditTime: 2020-10-13 11:34:16
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/util/upload', controller.alioss.upload);
  // 用户
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.get('/user/info', controller.user.info);
  router.post('/user/updateUserInfo', controller.user.updateInfo);
  router.get('/user/articles', controller.article.userArticles);
  // home
  router.get('/categories', controller.home.categories);
  router.get('/tags', controller.home.tags);
  router.get('/articles', controller.home.articles);
};
