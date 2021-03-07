import firebase from 'firebase';
//import firebase from "firebase/auth";
import "firebase/storage"

/*
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});
*/
const firebaseConfig = {
  apiKey: "AIzaSyBRiTHhGkwWvsA7bs5g8ICajkUXC2r5V-c",
  authDomain: "transferify.firebaseapp.com",
  projectId: "transferify",
  storageBucket: "transferify.appspot.com",
  messagingSenderId: "442434577525",
  appId: "1:442434577525:web:88d910d62844fc61ecc43c",
  measurementId: "G-F74J36SPTS"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default};