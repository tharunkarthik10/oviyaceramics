// Firebase Configuration & Services
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA1gTYsjEYsW38ws7abF9kUfSROtdQ644",
  authDomain: "oviyaceramics-392f2.firebaseapp.com",
  projectId: "oviyaceramics-392f2",
  storageBucket: "oviyaceramics-392f2.firebasestorage.app",
  messagingSenderId: "69359247758",
  appId: "1:69359247758:web:c69d8f47ffdc80e02884df",
  measurementId: "G-WZNZJ7LLPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, googleProvider };
