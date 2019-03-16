import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Main.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/home',
          component: resolve => require(['../components/page/Home.vue'], resolve),
          meta: { title: '系统首页' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '*',
      component: resolve => require(['../components/page/404.vue'], resolve)
      // redirect: '/404'
    }
  ]
})
