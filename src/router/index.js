import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: 'home' */ '../views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '../views/LoginPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isLogin') === 'true'
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else if (to.name === 'login' && isAuthenticated) next({ name: 'home' })
  else next()
})

export default router
