import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css'
import './components/js/directives'
import axios from 'axios'

Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(Vuex)
// 引入mockjs
require('./mock.js')
// import Mock from './mock.js'

Vue.prototype.$axios = axios

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403')
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      })
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 判断Vue版本
// var version = Number(Vue.version.split('.')[0])
// console.log(version)
// if (version === 2) {
//     console.log('Vue v2.x.x') 
// } else if (version === 1) {
//     console.log('Vue v1.x.x') 
// } else {
//     // Unsupported versions of Vue
//     console.log('不支持的Vue版本')
// }