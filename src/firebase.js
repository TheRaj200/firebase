// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbo96hpporSnciDYyRKnlRsGtRG8b4oss",
  authDomain: "todolist-c3433.firebaseapp.com",
  projectId: "todolist-c3433",
  storageBucket: "todolist-c3433.appspot.com",
  messagingSenderId: "476361801989",
  appId: "1:476361801989:web:a3706b6495fef74000776c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
