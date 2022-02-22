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

  // admin
  router.get('/admin/user', controller.admin.userlist);
  router.get('/admin/drafts', controller.admin.draftlist);
  router.get('/admin/cates', controller.admin.categoryList);
  router.get('/admin/tags', controller.admin.tagList);
};
