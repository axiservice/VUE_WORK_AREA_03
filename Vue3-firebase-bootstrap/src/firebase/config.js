import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY, 
  authDomain: process.env.VUE_APP_AUTH_DOMAIN, 
  databaseURL: process.env.VUE_APP_DATABASE_URL, 
  projectId: process.env.VUE_APP_PROJECT_ID, 
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET, 
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID, 
  appId: process.env.VUE_APP_APP_ID, 
  measurementId: process.env.VUE_APP_MEASUREMENT_ID, 
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init firebase auth
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

export { auth, storage, db }