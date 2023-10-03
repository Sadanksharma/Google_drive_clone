// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBhp6fA2_u0znDL0_VCmlVbimmzCyjFANU",
  authDomain: "drive-clone-c0822.firebaseapp.com",
  projectId: "drive-clone-c0822",
  storageBucket: "drive-clone-c0822.appspot.com",
  messagingSenderId: "645039276815",
  appId: "1:645039276815:web:1c905e814f7bd0c2df347a",
  measurementId: "G-JFS3YDQR93",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, storage, auth, provider};
