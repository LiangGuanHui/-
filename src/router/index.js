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
      component: resolve => require(['../components/Main.vue'], resolve),
      meta: { title: '自述文件' },
      // children: routeArr.concat() 如果需要多文件
      children: [
        {
          path: '/home',
          component: resolve => require(['../pages/Home.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/table',
          component: resolve => require(['../pages/Table.vue'], resolve),
          meta: { title: '表格页面' }
        },
        {
          path: '/hello',
          component: resolve => require(['../pages/Hello.vue'], resolve),
          meta: { title: '测试数据' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '*',
      component: resolve => require(['../pages/404.vue'], resolve)
      // redirect: '/404'
    }
  ]
})
