import firebase from "firebase";

// Initialize Firebase
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAKKxcIG2XWww3l0GtyUwVdJFVUQyfNS8c",
  authDomain: "hangout-application.firebaseapp.com",
  projectId: "hangout-application",
  storageBucket: "hangout-application.appspot.com",
  messagingSenderId: "537988000787",
  appId: "1:537988000787:web:3e01cc6d03a8dc3e3a23e6",
  measurementId: "G-DNWFZR8ZSK",
});

// Get the reference to the database
const database = firebaseConfig.firestore();

//Get reference to the auth service
const auth = firebaseConfig.auth();

// Get reference to the storage service
const storage = firebaseConfig.storage();

//Get reference to google provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { database, auth, storage, googleProvider };