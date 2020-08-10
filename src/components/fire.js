import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

//Firebase Config file
const firebaseConfig = {
  apiKey: "AIzaSyCZ5EB5CbVxAycdR5KOX4mFkzqAx5mjbho",
  authDomain: "marvel-shop-6676f.firebaseapp.com",
  databaseURL: "https://marvel-shop-6676f.firebaseio.com",
  projectId: "marvel-shop-6676f",
  storageBucket: "marvel-shop-6676f.appspot.com",
  messagingSenderId: "1071182442858",
  appId: "1:1071182442858:web:29df7b5cbcae466a56f513"
};

  const fire = firebase.initializeApp(firebaseConfig)
  // Initialize Firebase
  export {fire as default};
