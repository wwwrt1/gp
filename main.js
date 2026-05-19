
// #ifndef VUE3
import Vue from 'vue'
import App from './App'


//导入网络请求的包
import { $http } from '@escook/request-miniprogram'
//在uniapp上有个顶级的对象是uni，给Uni对象添加http属性

uni.$http = $http

//请求的根路径
$http.baseUrl = 'http://127.0.0.1:4523/m1/8284752-8047894-default'

//请求拦截器，在发起请求前需要完成的事情，loading效果
$http.beforeRequest = function(options) {
  uni.showLoading({
    title:'数据正在加载中'
  })
}

// 响应兰拦截器，请求完成关闭loading效果
$http.afterRequest = function () {
  uni.hideLoading()
}


//封装请求失败的弹窗
// uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
//   uni.showToast({
//     title,
//     duration,
//     icon: 'none',
//   })
// }
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif