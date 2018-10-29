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
      name: 'home',
      component: Home,
      children: [
        {
          path: '/details',
          name: 'details',
          component: () => import('./components/DetailsVideo.vue'),
          props: (route) => ({ query: route.query.q })
        },
        {
          path: '/list',
          name: 'videolist',
          component: () => import('./components/VideoList.vue'),
        }
      ]
    },
    {
      path: '/trending',
      name: 'trending',
      component: () => import('./views/Trending.vue')
    },
    {
      path: '/like',
      name: 'like',
      component: () => import('./views/LikedVideo.vue')
    }
  ]
})
