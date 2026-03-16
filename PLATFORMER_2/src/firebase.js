// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Aquesta és la teva configuració personal
const firebaseConfig = {
  apiKey: "AIzaSyBb_-7jdgbS2wtLoVW27Us9HXRolbExbXY",
  authDomain: "platformer-9f999.firebaseapp.com",
  projectId: "platformer-9f999",
  storageBucket: "platformer-9f999.firebasestorage.app",
  messagingSenderId: "1016705962439",
  appId: "1:1016705962439:web:41dc7a3a19c40ef7bd49e2",
  measurementId: "G-E7PXMB7S8W"
};

// Inicialitza Firebase i exporta Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
