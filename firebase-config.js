// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcbcWNpbWCxY6P-yO1PsXzhIW3lFlUFKM",
  authDomain: "cnproject-d1cf4.firebaseapp.com",
  projectId: "cnproject-d1cf4",
  storageBucket: "cnproject-d1cf4.firebasestorage.app",
  messagingSenderId: "235996301507",
  appId: "1:235996301507:web:1fa081fdf4f4e90c86ba76",
  measurementId: "G-HM1JZY9215"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);