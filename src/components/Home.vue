<template>
  <div>
    <h2>Funciona Home</h2>
    <a href="#" @click ="logout"> Salir </a>

  </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'

export default {

  methods: {
    logout(){
      firebase
      .auth()
      .signOut()
      .then(()=>this.$router.replace('login'));
    }
  }
}
</script>

<style scoped>
</style>
