// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-49192.firebaseapp.com",
  projectId: "blog-app-49192",
  storageBucket: "blog-app-49192.firebasestorage.app",
  messagingSenderId: "1028560160399",
  appId: "1:1028560160399:web:ab29323d17d8ef914ed2fa"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);