import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcbcWNpbWCxY6P-yO1PsXzhIW3lFlUFKM",
  authDomain: "cnproject-d1cf4.firebaseapp.com",
  projectId: "cnproject-d1cf4",
  storageBucket: "cnproject-d1cf4.firebasestorage.app",
  messagingSenderId: "235996301507",
  appId: "1:235996301507:web:1fa081fdf4f4e90c86ba76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };