import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)
/* eslint-disable */
export const constantRoutes = [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/',
      component: Layout,
      redirect: '/cache',
      hidden: false,
      children: [
        {
          path: 'cache',
          component: () => import('@/views/cacheManage/index'),
          name: 'cache',
          meta: { title: '缓存管理', icon: 'component', noCache: true }
        }
      ]
    },
    {
      path: '/imgManage',
      component: Layout,
      hidden: false,
      meta: { title: '图片管理', icon: 'component'},
      children: [
        {
          path: 'index',
          component: () => import('@/views/waterfallFlow/index'),
          name: 'imgManage-index',
          meta: { title: '瀑布流', icon: 'component', noCache: true }
        },
        {
          path: 'lazy',
          component: () => import('@/views/waterfallFlow/lazy'),
          name: 'imgManage-lazy',
          meta: { title: '懒加载', icon: 'component', noCache: true }
        }
      ]
    },
    {
      path: '/light',
      component: Layout,
      hidden: false,
      children: [
        {
          path: 'index',
          component: () => import('@/views/trafficLight/index'),
          name: 'light',
          meta: { title: '定时器管理', icon: 'component', noCache: true }
        }
      ]
    },
    {
      path: '/zero',
      component: Layout,
      hidden: false,
      children: [
        {
          path: 'zero',
          component: () => import('@/views/zeroChar/index'),
          name: 'zero',
          meta: { title: '零宽字符', icon: 'component', noCache: true }
        }
      ]
    },
    {
      path: '/drag',
      component: Layout,
      hidden: false,
      children: [
        {
          path: 'drag',
          component: () => import('@/views/dragManage/index'),
          name: 'drag',
          meta: { title: '拖拽管理', icon: 'component', noCache: true }
        }
      ]
    },
    {
      path: '/layout',
      component: Layout,
      hidden: false,
      children: [
        {
          path: 'layout',
          component: () => import('@/views/layoutManage/index'),
          name: 'layout',
          meta: { title: '布局管理', icon: 'component', noCache: true }
        }
      ]
    },
    {
      path: '/communicate',
      component: Layout,
      hidden: false,
      children: [
        {
          path: 'communicate',
          component: () => import('@/views/Communication/index'),
          name: 'communicate',
          meta: { title: '组件间通讯', icon: 'component', noCache: true }
        }
      ]
    },
  ]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    base: window.__POWERED_BY_QIANKUN__ ? "/aaa" : "/",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
  
const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router

