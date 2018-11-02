<template>
  <div>
    <div class="correo">
      <p>{{email}}</p>
    </div>
    <div class="salir">
      <a href="#" @click ="logout"> Cerrar sesión </a>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <b-card no-body>
          <b-tabs pills card>
            <b-tab title="Asesorias atendidas" active>

            </b-tab>
            <b-tab title="Asesorias por atender">
              <b-list-group flush>
                <b-list-group-item href="#" v-for="" v-if="">
                  <table style="margin: 0 auto;">
                    Cita 1
                  </table>
                </b-list-group-item>
                <b-list-group-item href="#" v-for="" v-if="">
                  <table style="margin: 0 auto;">
                    Cita 2
                  </table>
                </b-list-group-item>
              </b-list-group>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
      <div class="col-sm-6">
        <b-card-group deck>
            <b-card no-body header="<b>Solicitudes pendientes</b>">
              <b-list-group flush>
                <b-list-group-item @click ="comprobar_id" href="#"
                v-for="asesoria in asesorias" v-if="id == asesoria['.key']">
                  <table style="margin: 0 auto;">
                    {{asesoria['.value']}}
                  </table>
                </b-list-group-item>
              </b-list-group>
            </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'

export default {
  data() {
    return {
      email: firebase.auth().currentUser.email,
      n: db.ref('user/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
        return snapshot.val().name
      }),
      id: db.ref('user/' + firebase.auth().currentUser.uid).key,
      count : 0
    }
  },
  methods: {
    logout(){
      firebase
      .auth()
      .signOut()
      .then(()=>this.$router.replace('login'));
    },
    comprobar_id(){
      if (firebase.auth().currentUser.uid == this.id){
        console.log("hola")
      }
    }
  },
  firebase: {
      asesorias: db.ref('asesoria')
  },
  created() {
    console.log(this.asesorias)
  },
}
</script>

<style scoped>
  .row{
    padding: 50px
  }
  .correo{
    text-align: right;
    padding-right: 50px

  }
  .salir{
    text-align: right;
    padding-right: 50px

  }
</style>
