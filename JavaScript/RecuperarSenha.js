import {app, auth} from './config/firebase.js'
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"



  const recuperarSenha = () => {
            const email = document.getElementById("email").value

            sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Solicitação realizada com sucesso')

                window.location.href = "Entrar.html"
            })
            .catch(() => {
                console.log('Erro ao solicitar reset de senha')
            })
    }
document.getElementById("btnRec").addEventListener('click', recuperarSenha)    