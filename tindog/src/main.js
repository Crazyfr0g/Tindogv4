// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
// Vue.use(firebase)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyDoBEFvFWuoWm-uSXFCadq49r8eH6g5Fhg",
      authDomain: "tindog-4e7f2.firebaseapp.com",
      databaseURL: "https://tindog-4e7f2.firebaseio.com",
      projectId: "tindog-4e7f2",
      storageBucket: "tindog-4e7f2.appspot.com",
      messagingSenderId: "957819378545"
    })
  }
})
