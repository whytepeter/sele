import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCcon3r8oLSb6fgsXXXzSEiSIyC765JiVo",
  authDomain: "sele-6357f.firebaseapp.com",
  databaseURL: "https://sele-6357f.firebaseio.com",
  projectId: "sele-6357f",
  storageBucket: "sele-6357f.appspot.com",
  messagingSenderId: "1086670770947",
  appId: "1:1086670770947:web:17a540e38128ad79804f36",
  measurementId: "G-3800WYHCE1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let db = firebase.firestore();
let st = firebase.storage();

export { auth, db, st };
