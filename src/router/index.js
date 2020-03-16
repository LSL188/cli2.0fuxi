import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import User from '@/components/user/User'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    { path: '/home', redirect: '/welcome', component: Home, children: [
      {path: '/welcome', component: Welcome},
      {path: '/users', component: User}
    ]}
  ],
  mode: 'history'
})
router.beforeEach((to, from , next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router