import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Inicio from '@/components/Inicio'
import firebase from 'firebase'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:"*",
      redirect: '/login'
    },
    {
      path:"",
      redirect: '/inicio'
    },
    {
      path:"/login",
      name:'Login',
      component: Login
    },
    {
      path:"/inicio",
      name:'Inicio',
      component: Inicio
    },
    {
      path:"/home",
      name:'Home',
      component: Home,
      meta:{  //este meta sirve para proteger la vista home, osea que tienes que estar logueado primero
        autentificado : true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
    let usuario = firebase.auth().currentUser;//usuario devuelve toda la informacion del contacto si esta autentificado o no
    let autorizacion = to.matched.some(record => record.meta.autentificado); // esto revisara si nos hemos autentificado o no)
    if(autorizacion && !usuario){
      next('login')

    } else if (!autorizacion && usuario){
      next('home');

    } else {
      next();
    }
})

export default router;
