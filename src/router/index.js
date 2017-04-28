import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { sync } from 'vuex-router-sync'

// components
import Hello from '@/components/Hello'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})

// 路由切换时切换loading状态，主要在于优化拥护体验
// 参考文档：https://vux.li/#/?id=%E9%A1%B5%E9%9D%A2%E5%88%87%E6%8D%A2%E6%98%BE%E7%A4%BAloading
router.beforeEach(function(to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })
  next()
})

router.afterEach(function(to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
  // 通过延迟设置loading状态可以查看效果
  // setTimeout(function() {
  //   store.commit('updateLoadingStatus', {
  //     isLoading: false
  //   })
  // }, 1000)
})

// 将路由的状态同步到store
sync(store, router)

export default router
