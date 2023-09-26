import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAL9WJcZf3kLSUKEawrFFpR5GTegi-HlDw",
  authDomain: "aarogyadisha-fb7b9.firebaseapp.com",
  projectId: "aarogyadisha-fb7b9",
  storageBucket: "aarogyadisha-fb7b9.appspot.com",
  messagingSenderId: "718145025164",
  appId: "1:718145025164:web:eeaf8c39d8d0142d83f7a9",
  measurementId: "G-F417868HFZ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage, firebase };
