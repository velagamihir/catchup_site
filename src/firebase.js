// src/firebase.js (or wherever your config lives)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 💡 NEW: Import the Authentication module
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSJ8wDsareT-gnf5igjLsJ9TqtrcqV2n4",
  authDomain: "catchup-a16e4.firebaseapp.com",
  projectId: "catchup-a16e4",
  storageBucket: "catchup-a16e4.firebasestorage.app",
  messagingSenderId: "962709998277",
  appId: "1:962709998277:web:322f0654269c57b4df3eac",
  measurementId: "G-HQLMX0BGKM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 💡 NEW: Initialize and export the Auth service
export const auth = getAuth(app);

// You might also export `app` if other parts of your app need it
// export { app };
