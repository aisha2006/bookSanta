import firebase from "firebase"
require("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyCsZlwNYkdZmj1MsnrI-YbfVBZ7HBjMK0c",
    authDomain: "booksanta-76a4f.firebaseapp.com",
    projectId: "booksanta-76a4f",
    storageBucket: "booksanta-76a4f.appspot.com",
    messagingSenderId: "933228810925",
    appId: "1:933228810925:web:cdf9ff5822ca74f3d4ac24"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();