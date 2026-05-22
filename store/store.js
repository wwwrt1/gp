// 1. 导入 Vue 和 Vuex
// import Vue from 'vue'
// import Vuex from 'vuex'

import { createStore } from 'vuex'
import moduleCart from './cart.js'
 // 将 Vuex 安装为 Vue 的插件
// Vue.use(Vuex)

  // 创建 Store 的实例对象
  // const store = new Vuex.Store({
  //   // TODO：挂载 store 模块
  //   modules: {
  //     // 挂载购物车的 vuex 给购物车模块起个别名 m_cart
  //     //    购物车模块中 cart 数组的访问路径是 m_cart/cart
  //     m_cart: moduleCart,
  //   }
  // })
  const store = createStore({
    //创建模块
    modules: {
      m_cart: moduleCart,
    },
  })


export default store