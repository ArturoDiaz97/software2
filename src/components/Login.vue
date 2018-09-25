<template >
    <div>
      <form @submit.prevent = 'login' >
        <div class="login-box">
          <img src="../assets/Logo.jpg" alt="avatar" class="avatar">
        </div>
        <div class="container">
            <label for="uname"><b>Usuario</b></label>
              <input v-model = 'usuario' type="text" placeholder="Usuario" name="uname" required>
            <label for="psw"><b>Contraseña</b></label>
              <input v-model = 'contrasena' type="password" placeholder="Contraseña" name="psw" required>
            <button type="submit">Ingresar</button>
            <label>
              <input type="checkbox" checked="checked" name="remember"> Recordar Usuario
            </label>
        </div>
        <div class="container" style="background-color:#f1f1f1">
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import sweetalert from 'sweetalert';
import {db} from '../firebase'


export default {
  data() { //esto es un modelo que estara conectado con los componentes de arriba en los inputs
    return {
      usuario: '',
      contrasena: '',
    }
  },
  methods: { //METODO
    login() {
      firebase
      .auth()
      .signInWithEmailAndPassword(this.usuario, this.contrasena)
      .then((user) =>{
        var starCountRef = db.ref('user/' + firebase.auth().currentUser.uid);
        starCountRef.on('value', function(snapshot) {
          if(snapshot.val().type === "Profesor"){
            swal("Correo validado exitosamente!", "Hola profesor " + snapshot.val().name + "!", "success");
            location.reload()
          }else{
            firebase.auth().signOut();
            swal("Usted no es profesor!", "Ingresar con un correo válido", "error");
          }
        });
      })
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          swal("Credenciales incorrectas!", "Inténtelo de nuevo", "error");
        } else if (errorCode === 'auth/user-not-found') {
          swal("Credenciales incorrectas!", "Inténtelo de nuevo", "error");
        }else {
          swal("Credenciales incorrectas!", "Inténtelo de nuevo", "error");
        }
      })
    }
  }

};
</script>

<style scoped>
form {
    width: 30%;
    border: 3px solid #f1f1f1;
    margin-left: 35%;
    margin-top: 10%;

}

/* Full-width inputs */
input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

/* Set a style for all buttons */
button {
    background-color: #FF9900;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
    opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.Iniciobtn {
    width: auto;
    padding: 10px 18px;
    background-color: #FF9900;
}

/* Center the avatar image inside this container */
.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
    width: 40%;
    border-radius: 50%;
}

/* Add padding to containers */
.container {
    padding: 16px;
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
