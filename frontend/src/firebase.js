import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAeiNPCZua5PJAqJ0Lv1Rj87dn_G1U1gNc",
  authDomain: "portfolio-bbd04.firebaseapp.com",
  projectId: "portfolio-bbd04",
  storageBucket: "portfolio-bbd04.firebasestorage.app",
  messagingSenderId: "1071146129576",
  appId: "1:1071146129576:web:d6cdeff71beaf87207ca9d",
  measurementId: "G-JRVY0TNG2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };