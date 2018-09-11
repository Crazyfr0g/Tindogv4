import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/Pages/LandingPage/LandingPage'
import HomePage from '@/Pages/HomePage/HomePage'
import SellingPage from '@/Pages/SellingPage/SellingPage'
import ProfilePage from '@/Pages/ProfilePage/ProfilePage'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },

    {
      path: '/Home',
      name: 'HomePage',
      component: HomePage
    },

    {
      path: '/Selling',
      name: 'SellingPage',
      component: SellingPage
    },

    {
      path: '/Profile',
      name: 'ProfilePage',
      component: ProfilePage
    },

  ]
})
