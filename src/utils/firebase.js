// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvmI_7ThGDevC6AyBGKSoFeP-KMTnqhB4",
  authDomain: "twitter-clone-28691.firebaseapp.com",
  databaseURL: "https:twitter-clone-28691.firebaseio.com//",
  projectId: "twitter-clone-28691",
  storageBucket: "twitter-clone-28691.appspot.com",
  messagingSenderId: "538911208786",
  appId: "1:538911208786:web:50a3fc067942d78ea4368b",
  measurementId: "G-1VST2E0S1C",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyA-yCzYCXLcGbTqpvuwyeKFzeO4O82C5Ak",
//   authDomain: "mytwitterapp-38683.firebaseapp.com",
//   databaseURL: "https://mytwitterapp-38683-default-rtdb.firebaseio.com",
//   projectId: "mytwitterapp-38683",
//   storageBucket: "mytwitterapp-38683.appspot.com",
//   messagingSenderId: "632562738553",
//   appId: "1:632562738553:web:f9267d1f8090281f1afba8",
// };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = app.firestore();

// const database = getDatabase(app);

export default db;
