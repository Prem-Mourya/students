// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7yb8a64jzUrgBxDayWVBsEfPr4R0ckLg",
  authDomain: "users-2c821.firebaseapp.com",
  projectId: "users-2c821",
  storageBucket: "users-2c821.firebasestorage.app",
  messagingSenderId: "789281449118",
  appId: "1:789281449118:web:262a2448bd3313047f478f",
  measurementId: "G-0CEV84G0RJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
