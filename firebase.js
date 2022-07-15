
const firebaseConfig = {
    apiKey: "AIzaSyDsrZJnfHb4EavHNnifIhajBwSLfqdcAqg",
    authDomain: "to-do-live-9ef78.firebaseapp.com",
    projectId: "to-do-live-9ef78",
    storageBucket: "to-do-live-9ef78.appspot.com",
    messagingSenderId: "329361254392",
    appId: "1:329361254392:web:b18bf9e45198d46685980d",
    measurementId: "G-5CE1ZH080R"
};

// console.log('hello, firestore!!');

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
