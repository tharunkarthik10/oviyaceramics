// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

export { app, analytics };
