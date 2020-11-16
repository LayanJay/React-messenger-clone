import firebase from "firebase";

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCAcmu1sk9fc8yNb6XCnm_O1j4n0Ysb7Ck",
  authDomain: "messenger-clone-5b5dd.firebaseapp.com",
  databaseURL: "https://messenger-clone-5b5dd.firebaseio.com",
  projectId: "messenger-clone-5b5dd",
  storageBucket: "messenger-clone-5b5dd.appspot.com",
  messagingSenderId: "147813960025",
  appId: "1:147813960025:web:500994ab496f8f807b6448",
});

const db = firebaseApp.firestore();

export default db;
