// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueSweetalert2 from 'vue-sweetalert2';
import Home from './components/Home'

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user){
  var user = firebase.auth().currentUser;
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
});
