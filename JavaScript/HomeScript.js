import {app, auth} from './config/firebase.js'
import { signOut} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import {db} from './config/firebase.js'
import {query, collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

auth.onAuthStateChanged( function(user) {
    if(!auth.currentUser){
        window.location.href = "./Index.html"

    } else{

        const deslogar = () => {
            signOut(auth)
        }
        
        document.getElementById("btnDeslogar").addEventListener('click', deslogar)
    }

})