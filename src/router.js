import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/plantdb',
      name: 'plantdb',
      component: () => import('./views/Plantdb.vue')
    },
    {
      path: '/plantalbum',
      name: 'plantalbum',
      component: () => import('./views/PlantAlbum.vue')
    },
    {
      path: '/plantdetail',
      name: 'plantdetail',
      component: () => import('@/components/PlantDetail.vue')
    },
    {
      path: '/plantmap',
      name: 'plantmap',
      component: () => import('./views/Plantmap.vue')
    },
    {
      path: '/plantmap/list',
      name: 'maplist',
      component: () => import('./views/MapList.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('./views/Mine.vue')
    },
    // {
    //   path: '/upload',
    //   name: 'upload',
    //   component: () => import('@/components/Upload.vue')
    // },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/components/Upload.vue')
    }
  ]
})
