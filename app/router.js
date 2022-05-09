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
  router.post('/user/repassword', controller.user.repassword);
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
  router.delete('/adminUser/delete/:id', controller.adminUser.delete);
  router.post('/adminUser/update', controller.adminUser.update);
  router.get('/adminUser/get/:id', controller.adminUser.get);

  // admin-article
  router.get('/adminArticle/list', controller.adminArticle.list);
  router.delete('/adminArticle/delete/:id', controller.adminArticle.delete);
  router.post('/adminArticle/update', controller.adminArticle.update);
  router.get('/adminArticle/get/:id', controller.adminArticle.get);

  // admin-cate
  router.get('/adminCate/list', controller.adminCate.list);
  router.post('/adminCate/add', controller.adminCate.add);
  router.delete('/adminCate/delete/:id', controller.adminCate.delete);
  router.post('/adminCate/update', controller.adminCate.update);
  router.get('/adminCate/get/:id', controller.adminCate.get);

  // admin-tag
  router.get('/adminTag/list', controller.adminTag.list);
  router.post('/adminTag/add', controller.adminTag.add);
  router.delete('/adminTag/delete/:id', controller.adminTag.delete);
  router.post('/adminTag/update', controller.adminTag.update);
  router.get('/adminTag/get/:id', controller.adminTag.get);
};
