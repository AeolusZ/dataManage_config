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
    }
  ]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
  
const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }

export default router

