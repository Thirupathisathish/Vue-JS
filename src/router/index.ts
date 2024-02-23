import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import MenuView from '../views/MenuView.vue'
import ReservationView from '../views/ReservationView.vue'
import MenuBar from '../views/MenuBar.vue'
import ComponentA from '../views/ComponentA.vue'
import ComponentB from '../views/ComponentB.vue'
import MenuItem from '../views/MenuItem.vue'
import MenuFile from '../views/MenuFile.vue'
import ReserveView from '../views/ReserveView.vue'
import Cart from '../views/Cart.vue'
import CartPage from '../views/CartPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: ReserveView,
  },
  {
    path: '/reservation',
    name: 'reservation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ReservationView.vue')
  },
  {
    path: '/menu',
    name: 'menufile',
    component: MenuFile
  },
  
  {
    path: '/menuitem',
    name: 'menuitem',
    component: MenuItem
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path:'/compA',
    name:'CompA',
    component: ComponentA
  },
  {
    path:'/compB',
    name:'CompB',
    component: ComponentB
  },
  {
    path:'/menuview',
    name:'MenuView',
    component:MenuView
  }, 
  {
    path: '/cartpage',
    name: 'cartpage',
    component: CartPage
  },
  {
    path:'/menubar',
    name:'menubar',
    component:MenuBar
  }
  
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
