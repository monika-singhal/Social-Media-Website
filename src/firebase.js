import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD5YwDZdYZPbQNHQsG7tq7Y4CcTQilhHdo",
    authDomain: "social-media-app-b8b6b.firebaseapp.com",
    projectId: "social-media-app-b8b6b",
    storageBucket: "social-media-app-b8b6b.appspot.com",
    messagingSenderId: "299463564253",
    appId: "1:299463564253:web:9e97197e3207ea804f3434",
    measurementId: "G-07ERNPXTDP"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db , auth, storage}
