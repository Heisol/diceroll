// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0ETwcMhAtKBsEuT08xKm_YuwffkOB6t4",
  authDomain: "diceroller-aa775.firebaseapp.com",
  projectId: "diceroller-aa775",
  storageBucket: "diceroller-aa775.appspot.com",
  messagingSenderId: "229001905741",
  appId: "1:229001905741:web:11714873975c4444c17e04",
  measurementId: "G-T4MG9LXVGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app