// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API,
  authDomain: "flicko-c831f.firebaseapp.com",
  projectId: "flicko-c831f",
  storageBucket: "flicko-c831f.appspot.com",
  messagingSenderId: "589454435717",
  appId: "1:589454435717:web:c1fe9e8a330816042950ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);