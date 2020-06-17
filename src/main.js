import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import routes from './router'
import VueRouter from "vue-router";

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

// import '../static/jquery.min.js'
// import layer from '../static/layer/layer'
// import '../static/layer/theme/default/layer.css'

import * as filters from './filters' // global filters

import "./public-path";


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

 console.log('子项目路由1', routes)
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 声明变量管理vue及路由实例
let router = null;
let instance = null;

// 导出子应用生命周期 挂载前
export async function bootstrap(props) {
    console.log(props)
}

// 导出子应用生命周期 挂载前 挂载后
// **注意，实例化路由时，判断当运行在qiankun环境时，路由要添加前缀，前缀与主应用注册子应用函数genActiveRule("/aaa")内的参数一致**
export async function mount(props) {
  // router = new VueRouter({
  //   base: window.__POWERED_BY_QIANKUN__ ? "/aaa" : "/",
  //   // mode: "history",
  //   scrollBehavior: () => ({ y: 0 }),
  //   routes: routes.options.routes
  // });
  // console.log('子项目路由2', router)
  instance = new Vue({
    router: routes,
    store,
    render: h => h(App)
  }).$mount("#app");
}

// 导出子应用生命周期 挂载前 卸载后
export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}

// 单独开发环境
window.__POWERED_BY_QIANKUN__ || mount();

// new Vue({
//   el: '#app',
//   router: routes,
//   store,
//   render: h => h(App)
// })
