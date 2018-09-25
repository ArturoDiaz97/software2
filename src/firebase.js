import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyAiejA0I0LNE5sV05Vg9hnMi0aB34gFTeo",
  authDomain: "software-25c1e.firebaseapp.com",
  databaseURL: "https://software-25c1e.firebaseio.com",
  projectId: "software-25c1e",
  storageBucket: "software-25c1e.appspot.com",
  messagingSenderId: "476289551753"
});

export const db = firebaseApp.database();
