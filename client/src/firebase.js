// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDT6MZgl4ozrP2cREYhEcyOtMjJIKT2LJo",
  authDomain: "open-upload-test.firebaseapp.com",
  projectId: "open-upload-test",
  storageBucket: "open-upload-test.appspot.com",
  messagingSenderId: "445577733528",
  appId: "1:445577733528:web:67edb6e94fc014f33e8b09",
};

export const app = initializeApp(firebaseConfig);
