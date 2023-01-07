import { app, auth } from './config/firebase.js'
import { db, storage } from './config/firebase.js'
import { signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { uploadBytes, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

var file = null;
var inputFile = null;

auth.onAuthStateChanged(function (user) {
    if (!auth.currentUser) {
        window.location.href = "./index.html"
    }
    // else{
    //     const usuarioLogadoID = auth.currentUser.uid
    // }    
})



const deslogar = () => {
    signOut(auth)

}

document.getElementById("btnDeslogar").addEventListener('click', deslogar)




