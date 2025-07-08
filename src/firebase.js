import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxBZGmqm_x3WcpPzYYhnzddyjxL2LT9os",
  authDomain: "blog-app-49192.firebaseapp.com",
  projectId: "blog-app-49192",
  storageBucket: "blog-app-49192.appspot.com",
  messagingSenderId: "1028560160399",
  appId: "1:1028560160399:web:ab29323d17d8ef914ed2fa",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { app };
