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


    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...

        // console.log(displayName)
      } else {
        // User is signed out.
        // ...
      }
    });
  }
})
