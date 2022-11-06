//import { initializeApp } from 'firebase/app'
//import { getAuth } from 'firebase/auth'

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXX.firebaseapp.com",
  projectId: "XXXXXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXXXX.appspot.com",
  messagingSenderId: "XXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXX"

}

// init firebase
//initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig);

// init firebase auth
//const auth = getAuth()
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();



export { auth }
export { storage, db };