import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/compat/app'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main',
      auth: true
    },
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/agree',
    name: 'agree',
    meta: { layout: 'empty' },
    component: () => import('../views/Agree.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/leftovers',
    name: 'leftovers',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Leftovers.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('login?message=login')
  } else {
    next()
  }
})

export default router
