<template>
  <div>

      <div class="correo" align="RIGHT">
      <div class="hom-box"align="center" >
        <img src="../assets/logohome.png" alt="avatar" class="avatar">
      </div>
      <p>{{email}}</p>

    </div>
    <div class="salir" align="RIGHT">
      <a href="#" @click ="logout"> Cerrar sesión </a>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <b-card no-body>
          <b-tabs pills card>
            <b-tab title="Asesorias atendidas" active>
              <b-list-group flush>
                <b-list-group-item v-for="asesoria in asesorias"  v-if="id == asesoria.profesor && asesoria.estado=='TERMINADO'">
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
                                <tr>
                                  <td>
                                    <div >
                                      <input id="file" type="file" value="upload" @change="fileBtn($event, asesoria['.key'])">
                                    </div>
                                    <div   align="left">
                                      <progress value="0" max="100" id="uploader"></progress>
                                    </div>
                                  </td>
                                  <td >
                                      <div   align="Center">
                                  {{asesoria.nameAlumno}}
                                   <br />
                                  {{asesoria.dia}}
                                      </div>
                                  </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div   align="left">
                                        <b-button @click ="marcar_atendida(asesoria['.key'])"> Marcar atendida</b-button>
                                      </div>
                                    </td>
                                    <td>
                                     <div >
                                      <b-btn v-b-modal.modal1>Detalle</b-btn>

                                      <!-- Modal Component -->
                                       <b-modal id="modal1" title="Bootstrap-Vue">
                                          Nombre:      {{asesoria.nameAlumno}}<br />
                                          Día:         {{asesoria.dia}}<br />
                                          Lugar:       {{asesoria.lugar}} <br />
                                          Asunto:      {{asesoria.tema}} <br />
                                          Archivo:  {{asesoria.archivos["-LRbZih7lk-kQQQzKI_U"].name_archivo}}{{asesoria.archivos["-LRbZih7lk-kQQQzKI_U"].size_archivo}}
                                          Archivo:  {{asesoria.archivos['.key']}}
                                       </b-modal>
                                      </div>
                                    </td>
                                    </tr>
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
      swal({
            title: 'Estas seguro de marcarla como atendida?',
            text: "No tendrás oportunidad de revertir esto! ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, marcar como atendida'
          }).then((result) => {
            if (result.value) {
              firebase.database().ref('solicitudes/' + id).update({
               estado: 'TERMINADO',
               });
              swal(
                'Marcada exitosamente',
                '',
                'success'
              )
            }
          })
   },
    fileBtn(e, k){
      let getFile = e.target.files[0]
      swal({
            title: `Desea subir el archivo ${getFile.name} (${ (getFile.size) / 1000000 + " MB" })`,
            text: "No habrá manera de revertir esto!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, súbelo!'
          }).then((result) => {
            if (result.value) {
              e.preventDefault();
              const uploader = document.getElementById('uploader');
              let size = 5242880 // equivale a 5MB -> 5242880
              let file_type = getFile.name.split('.').pop();
              let file_name = getFile.name.substr(0, getFile.name.lastIndexOf("."))
              let storageRef = firebase.storage().ref('archivos/' + getFile.name);
              let task = storageRef.put(getFile);
              var tarea = task.on('state_changed',
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
                  if (getFile.size <= size && (file_type == "xlsx" || file_type == "txt"
                      || file_type == "pdf" || file_type == "png" || file_type == "jpg"
                      || file_type == "docx" || file_type == "pptx" || file_type == "jpeg")){
                    var newPostRef = archivoRef.push();
                    newPostRef.set({
                      url_archivo : url,
                      name_archivo : file_name,
                      tipo_archivo : file_type,
                      size_archivo : (getFile.size) / 1000000 + " MB"
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
                  }else if (getFile.size > size) {
                    swal({
                          position: 'top-start',
                          type: 'error',
                          title: 'Tu archivo no puede exceder a los 5 MB',
                          showConfirmButton: false,
                          timer: 7500,
                          toast: true
                    })
                    uploader.value = null
                    storageRef.delete().then(function() {
                        console.log("Borrado bien")
                      })
                  } else{
                    swal({
                          position: 'top-start',
                          type: 'error',
                          title: 'Tipo de archivo no permitido',
                          showConfirmButton: false,
                          timer: 7500,
                          toast: true
                    })
                    uploader.value = null
                    storageRef.delete().then(function() {
                        console.log("Borrado bien")
                      })
                    }
                });
                console.log(getFile.name)
              }
              );
            }
          })

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
