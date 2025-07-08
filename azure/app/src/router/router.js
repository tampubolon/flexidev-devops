import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import DataTables from '../components/DataTables.vue'
import navigation from '../components/navigation.vue'
import login from '../components/login.vue'
import menu from '../components/menu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "",
    component: navigation,
    props: true,
    children: [
      { path: "/login", component: login, props: true },
    ]
  },
  {
    path: "",
    component: menu,
    props: true,
    children: [
      {
        path: '/hello',
        component: HelloWorld,
        props: true
      },
      {
        path: '/datatables',
        component: DataTables,
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
