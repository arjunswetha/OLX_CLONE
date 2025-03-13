import firebase from 'firebase'

import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCqntO8_e9JV_nC8zu9U5il6YfAuwQrjp8",
    authDomain: "olx-clone-9e773.firebaseapp.com",
    projectId: "olx-clone-9e773",
    storageBucket: "olx-clone-9e773.appspot.com",
    messagingSenderId: "1069299236729",
    appId: "1:1069299236729:web:fdd50cad9450ebeeb5b9a8",
    measurementId: "G-TMRQ5ZWV9B"
  };


 export default firebase.initializeApp(firebaseConfig)