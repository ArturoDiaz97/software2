<template>
  <body>
    <div>
      <h1>UNIVERSIDAD DE LIMA</h1>
    </div>
    <div class="container" style="">
    <a href="#" @click ="ir_login"> Loguearse a Asesorias Ulima </a>
    </div>
    <div class="home-box">
      <form action="">
        <div class="imgcontainer">
          <img src="../assets/Logo.jpg" alt="Avatar" class="Logo">
        </div>
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">Docente</span>
          </div>
            <input type="text" v-model="search" class="form-control"
            aria-label="Small" aria-describedby="inputGroup-sizing-sm"
            placeholder="Docente...">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">Carrera</span>
          </div>
            <input type="text" v-model="searchCarrera" class="form-control"
            aria-label="Small" aria-describedby="inputGroup-sizing-sm"
            placeholder="Carrera...">
        </div>
        <div>
        <b-card-group deck>
            <b-card no-body header="<b>Profesores de la Universidad</b>">
              <b-list-group flush>
                <b-list-group-item href="#" v-for="user in filtrarProfes" v-if="user.type=='Profesor'">
                  <table style="margin: 0 auto;">
                    <h6 v-model="user.name">{{user.name}} ({{user.carrera}})</h6>
                    <b-btn v-b-toggle.collapse2 class="m-1">Desplegar QR</b-btn>
                    <b-collapse id="collapse2">
                      <b-card>
                        <qr-code :text="user.name"></qr-code>
                      </b-card>
                    </b-collapse>
                  </table>
                </b-list-group-item>
              </b-list-group>
            </b-card>
        </b-card-group>
        </div>
      </form>
    </div>
  </body>
</template>

<script>
  import Vue from 'vue'
  import Router from 'vue-router'
  import firebase from 'firebase'
  import VueFire from 'vuefire'
  import {db} from '../firebase'

  export default {
    data(){
      return{
        search:"",
        searchCarrera:""
      }
    },
    methods:{
      ir_login(){
        this.$router.replace('login')
      }
    },
    firebase: {
        users: db.ref('user')
    },
    created() {
      console.log(this.users)
    },
    computed:{
      filtrarProfes: function(){
        return this.users.filter((user)=>{
          console.log(user)
          if(user.type=="Profesor"){
            return (user.name.toLowerCase().match(this.search.toLowerCase()) && user.carrera.toLowerCase().match(this.searchCarrera.toLowerCase()))
          }

        });
      }
    }
  }
</script>
<style scoped>
form {
    width: 30%;
    border: 3px solid #f1f1f1;
    margin-left: 35%;
    margin-top: 2%;
}
div {
  text-align: center;
}
/* Center the avatar image inside this container */
.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
}
/* Avatar image */
img.Logo {
    width: 40%;
    border-radius: 50%;
}
/* Add padding to containers */
.container {
    padding: 16px;
}
.btn-secondary {
  color: #fff;
  background-color: rgba(40, 167, 69, 0.5);
  border-color: #6c757d;
}
.m-1{
  color: inherit;
}
.btn-secondary{
  background-color: #e9ecef;
}
/* The "Forgot password" text */
span.psw {
    float: right;
    padding-top: 16px;
}
/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
        display: block;
        float: none;
    }
    .Iniciobtn {
        width: 100%;
    }
}
</style>
