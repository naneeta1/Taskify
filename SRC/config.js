import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDVtAvw2okXfkJMJcbuTa7JTjBZFg-CtFk",
    authDomain: "taskify-ca83a.firebaseapp.com",
    projectId: "taskify-ca83a",
    storageBucket: "taskify-ca83a.appspot.com",
    messagingSenderId: "690918496484",
    appId: "1:690918496484:web:4d9371fb533217f08134f1",
    measurementId: "G-4HR7WG6NVB"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export {firebase}