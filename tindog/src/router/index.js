import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/Pages/LandingPage/LandingPage'
import HomePage from '@/Pages/HomePage/HomePage'
import SellingPage from '@/Pages/SellingPage/SellingPage'
import ProfilePage from '@/Pages/ProfilePage/ProfilePage'
import NotificationPage from '@/Pages/NotificationPage/NotificationPage'
import BreedingPage from '@/Pages/BreedingPage/BreedingPage'
import AccessoriesPage from '@/Pages/AccessoriesPage/AccessoriesPage'

import Sample from '@/Pages/Sample/Sample'
import SampleProf from '@/Pages/Sample/SampleProfile'

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

    {
      path: '/Sample2',
      name: 'Sample',
      component: SampleProf
    },

    {
      path: '/Notification',
      name: 'NotificationPage',
      component: NotificationPage
    },

    {
      path: '/Breeding',
      name: 'BreedingPage',
      component: BreedingPage
    },

    {
      path: '/Accessories',
      name: 'AccessoriesPage',
      component: AccessoriesPage
    },

    {
      path: '/Sample',
      name: 'Sample',
      component: Sample
    }

  ]
})
