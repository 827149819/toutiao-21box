import Vue from 'vue'
import VueRouter from 'vue-router'
// @就是src路径
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空，默认子路由
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 路由导航守卫，拦截页面
// 全局前置守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
