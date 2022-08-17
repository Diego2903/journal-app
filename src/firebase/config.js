// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCA4g_93lyT41aFOWcxvpWRXsiGB2J8tpw",
    authDomain: "react-journal-f0d67.firebaseapp.com",
    projectId: "react-journal-f0d67",
    storageBucket: "react-journal-f0d67.appspot.com",
    messagingSenderId: "800856514081",
    appId: "1:800856514081:web:262200b4d062b321e38d60"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );


