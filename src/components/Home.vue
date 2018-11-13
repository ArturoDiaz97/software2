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
              <b-list-group flush>
                <b-list-group-item v-for="asesoria in asesorias"  v-if="id == asesoria.profesor && asesoria.estado=='ATENDIDA'">
                  <table style="margin: 0 auto;">
                      {{asesoria.nameAlumno}}
                      {{asesoria.dia}}
                  </table>
                </b-list-group-item>
              </b-list-group>
            </b-tab>
            <b-tab title="Asesorias por atender">
              <b-list-group flush>
                <b-list-group-item   v-for="asesoria in asesorias"  v-if="id == asesoria.profesor && asesoria.estado=='ACEPTADO'">
                  <table style="margin: 0 auto;">
                      {{asesoria.nameAlumno}}
                      {{asesoria.dia}}
                  </table>
                  <div>
                    <input id="file" type="file" value="upload" @change="fileBtn($event, asesoria['.key'])">
                  </div>
                  <div>
                    <progress value="0" max="100" id="uploader"></progress>
                  </div>
                  <div>
                    <b-button @click ="marcar_atendida(asesoria['.key'])"> Marcar atendida</b-button>
                  </div>
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
                <b-list-group-item
                v-for="asesoria in asesorias" v-if="id == asesoria.profesor && asesoria.estado=='ENVIADO'">
                  <table style="margin: 0 auto;">
                    {{asesoria.nameAlumno}}
                    {{asesoria.dia}}
                    <div>
                      <b-button @click ="confirmar_cita(asesoria['.key'])"> Aceptar</b-button>
                      <b-btn v-b-toggle.collapse3 class="m-1">ver mas</b-btn>
                      <b-collapse  id="collapse3">
                        <b-card>
                          Alumno:{{asesoria.nameAlumno}}
                          Dia:{{asesoria.dia}}
                          Hora:{{asesoria.hora}}
                          Tema:{{asesoria.tema}}
                        </b-card>
                      </b-collapse>
                      <b-btn v-b-toggle.collapse2 class="m-1">rechazar</b-btn>
                      <b-collapse  id="collapse2">
                        <b-card>
                          <b-form-input v-model="text1" id="text1" type="text" placeholder="Razon"></b-form-input>
                          <b-button v-if="text1"  @click ="rechazar_cita(asesoria['.key'])">Rechazar cita</b-button>
                        </b-card>
                      </b-collapse>
                    </div>
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
import swal from 'sweetalert2'

export default {
  data() {
    return {
      email: firebase.auth().currentUser.email,
      n: db.ref('user/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
        return snapshot.val().name
      }),
      id: db.ref('user/' + firebase.auth().currentUser.uid).key
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(
        ()=>this.$router.replace('login')
      );
    },
    confirmar_cita(id){
       firebase.database().ref('solicitudes/' + id).update({
       estado: 'ACEPTADO',
        });
    },
    rechazar_cita(id){
      firebase.database().ref('solicitudes/' + id).update({
       estado: 'RECHAZADO',
       });
   },
    marcar_atendida(id){
      firebase.database().ref('solicitudes/' + id).update({
       estado: 'ATENDIDA',
       });
   },
    subir_archivo(id){
      firebase.storage().ref('archivos').put(this.file).then(function(snapshot){
        console.log("archivo subido!!")
      });
  },
    fileBtn(e, k){
        e.preventDefault();
      const uploader = document.getElementById('uploader');
      let size = 5242880 // equivale a 5MB -> 5242880
      let getFile = e.target.files[0];
      let storageRef = firebase.storage().ref('archivos/' + getFile.name);
      let task = storageRef.put(getFile);
      task.on('state_changed',
       function progress(snapshot){
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        uploader.value = percentage;
      },
      function error(err){
        console.log(err)
      },
      function complete(){
        var URL_r = storageRef.getDownloadURL().then(function(url){
          var firebaseRef= db.ref('solicitudes/' + k);
          var archivoRef = firebaseRef.child('archivos');
          if (getFile.size <= size){
            var newPostRef = archivoRef.push();
            newPostRef.set({
              url_archivo : url,
              name_archivo : getFile.name
            })
            swal({
                  position: 'top-start',
                  type: 'success',
                  title: 'Archivo subido exitosamente!',
                  showConfirmButton: false,
                  timer: 1500,
                  toast: true
                })
            uploader.value = null
          }
          else{
            swal({
                  position: 'top-start',
                  type: 'error',
                  title: 'Tu archivo no puede exceder a los 5 MB',
                  showConfirmButton: false,
                  timer: 2500,
                  toast: true
            })
            uploader.value = null
            storageRef.delete().then(function() {
                console.log("Borrado bien")
              })
          }
        });
        console.log(getFile.size)
        }
      );
    }
  },
  firebase: {
      asesorias: db.ref('solicitudes'),
      solicitud: db.ref('solicitudes'),
      sol : db.ref('solicitudes'),
      archivos: db.ref('solicitudes')

  },
  created() {
    console.log(this.archivos)
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
