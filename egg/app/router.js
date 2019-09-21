'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.home.login);
  router.post('/registry', controller.home.registry);
  router.post('/getlist',controller.home.getList);
  router.post('/add',controller.home.add);
  router.delete('/delete',controller.home.delete);
  router.post('/edit',controller.home.edit)
};
