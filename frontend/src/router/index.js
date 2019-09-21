import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    }, {
      path: '/index',
      component: () => import('@/views/Index'),
      beforeEnter(to, from, next) {
        let { token } = window.localStorage;
     
        if (token && token.split('.').length === 3) {
          next();
        } else {
          next('/login');
        }
      },
      children: [{
        path: '/index/list',
        component: () => import("@/views/index/List")
      }, {
        path: '/index/work',
        component: () => import("@/views/index/Work")
      }]
    }, {
      path: '/',
      redirect: '/index/list'
    }
  ]
})
