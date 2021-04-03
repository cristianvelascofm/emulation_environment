import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MiniNet from '../views/MiniNet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mininet',
    name: 'MiniNet',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MiniNet//() => import(/* webpackChunkName: "about" */ '../views/MiniNet.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
