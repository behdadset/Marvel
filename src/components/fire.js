import * as firebase from 'firebase';
import "firebase/storage"

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
  const storage = firebase.storage()
  // Initialize Firebase
  export {storage, fire as default};
