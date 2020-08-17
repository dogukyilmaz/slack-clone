import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBAcRyjuL47kemVEnRJTZVdEUjzwWZxxmI",
  authDomain: "slack-clone-76dee.firebaseapp.com",
  databaseURL: "https://slack-clone-76dee.firebaseio.com",
  projectId: "slack-clone-76dee",
  storageBucket: "slack-clone-76dee.appspot.com",
  messagingSenderId: "1012863067423",
  appId: "1:1012863067423:web:1694168aa9b61f3783bc2a",
  measurementId: "G-Y8FWFZ41H7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
