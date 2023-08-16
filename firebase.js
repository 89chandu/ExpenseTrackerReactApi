

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmw4DPGG0jvxVFST88yKGx4u-Q79Tjovo",
  authDomain: "expensetracker-dc91c.firebaseapp.com",
  projectId: "expensetracker-dc91c",
  storageBucket: "expensetracker-dc91c.appspot.com",
  messagingSenderId: "575042241884",
  appId: "1:575042241884:web:c069978dd6ff2d6309ad99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app,auth};