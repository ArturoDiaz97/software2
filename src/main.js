// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Home from './components/Home'
import VueQRCodeComponent from 'vue-qrcode-component'
import swal from 'sweetalert2'
import responsive from 'vue-responsive'

Vue.component('qr-code', VueQRCodeComponent)
Vue.componne


Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user){
  var user = firebase.auth().currentUser;
  new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
  })
});
