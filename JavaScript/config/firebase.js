// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5gIy5NorOWTQqnnEaPGDh2ANWPhAarWE",
    authDomain: "projeto-web-1-e3419.firebaseapp.com",
    projectId: "projeto-web-1-e3419",
    storageBucket: "projeto-web-1-e3419.appspot.com",
    messagingSenderId: "838653158453",
    appId: "1:838653158453:web:6244db8af2bc329b243d7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true})

const storage = getStorage(app)

export {app, auth, db, storage}