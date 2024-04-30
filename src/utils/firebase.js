// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvmI_7ThGDevC6AyBGKSoFeP-KMTnqhB4",
  authDomain: "twitter-clone-28691.firebaseapp.com",
  projectId: "twitter-clone-28691",
  storageBucket: "twitter-clone-28691.appspot.com",
  messagingSenderId: "538911208786",
  appId: "1:538911208786:web:50a3fc067942d78ea4368b",
  measurementId: "G-1VST2E0S1C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
