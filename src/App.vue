<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'
import bootstrapVue from 'bootstrap-vue'
import responsive from 'vue-responsive'

Vue.use(responsive)

Vue.use(VueFire)
Vue.use(bootstrapVue)

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
