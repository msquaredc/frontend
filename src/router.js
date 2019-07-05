import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'
import CreationWizard from './views/CreationWizard.vue'
import Code from './views/Code.vue'
import CodingWizard from './views/CodingWizard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/index',
      name: 'start',
      component: Index
    },
    {
      path: '/code/:id/:index',
      name: 'code',
      component: Code,
      props: castRouteParams
    },
    {
      path: '/coding/:id',
      name: 'code',
      component: CodingWizard,
      props: true
    },
    {
      path: '/create/*',
      name: 'create',
      component: CreationWizard
    },
  ]
})

function castRouteParams(route) {
  return {
    index: Number(route.params.index),
    id: route.params.id,
  };
}