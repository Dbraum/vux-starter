// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
import Home from './components/HelloFromVux'
import { sync } from 'vuex-router-sync'

require('es6-promise').polyfill()
// 添加vue-router

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
}]

const router = new VueRouter({
  routes
})
// 路由切换时切换loading状态，主要在于优化拥护体验
// 参考文档：https://vux.li/#/?id=%E9%A1%B5%E9%9D%A2%E5%88%87%E6%8D%A2%E6%98%BE%E7%A4%BAloading
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

// 将路由的状态同步到store
sync(store, router)

// 添加Fastclick移除移动端点击延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
