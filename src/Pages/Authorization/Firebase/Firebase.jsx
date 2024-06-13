// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzopjMLERLhUH58WkORrHlf1eo-lwUsVM",
  authDomain: "fir-d8384.firebaseapp.com",
  projectId: "fir-d8384",
  storageBucket: "fir-d8384.appspot.com",
  messagingSenderId: "703887830881",
  appId: "1:703887830881:web:9a30087066ac4516b9df20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database=getAuth(app); 
