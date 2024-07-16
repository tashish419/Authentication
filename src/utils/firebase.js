// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOvYypNC6OEZOcgiwhGI_QBzTL1joTuOQ",
  authDomain: "signup-form-e0c2c.firebaseapp.com",
  projectId: "signup-form-e0c2c",
  storageBucket: "signup-form-e0c2c.appspot.com",
  messagingSenderId: "506348628718",
  appId: "1:506348628718:web:90a714b9a41f789fa361ff",
  measurementId: "G-5YBJJLM438"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();