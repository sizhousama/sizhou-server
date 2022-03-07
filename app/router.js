/*
 * @Author: sizhou
 * @Date: 2020-09-09 15:48:11
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:34:42
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
  // 文章
  router.get('/user/draft', controller.write.draft);
  router.get('/user/drafts', controller.write.drafts);
  router.post('/user/addDraft', controller.write.createDraft);
  router.post('/user/updateDraft', controller.write.updateDraft);
  router.post('/user/delDraft', controller.write.deleteDraft);
  router.get('/user/articleDetail', controller.write.articleDetail);
  router.post('/user/addArticle', controller.write.createPublish);
  router.post('/user/updateArticle', controller.write.updateArticle);
  router.post('/user/delArticle', controller.write.deleteArticle);
  // 评论
  router.get('/article/comments', controller.article.comments);
  router.post('/article/addComment', controller.article.createComment);
  router.post('/article/delComment', controller.article.deleteComment);
  // home
  router.get('/categories', controller.home.categories);
  router.get('/tags', controller.home.tags);
  router.get('/articles', controller.home.articles);

  // admin-user
  router.get('/adminUser/list', controller.adminUser.list);
  router.post('/adminUser/add', controller.adminUser.add);
  router.post('/adminUser/delete', controller.adminUser.delete);
  router.post('/adminUser/update', controller.adminUser.update);
  router.get('/adminUser/get', controller.adminUser.get);

  // admin-draft
  router.get('/adminDraft/list', controller.adminDraft.list);

  // admin-cate
  router.get('/adminCate/list', controller.adminCate.list);

  // admin-tag
  router.get('/adminTag/list', controller.adminTag.list);
};
