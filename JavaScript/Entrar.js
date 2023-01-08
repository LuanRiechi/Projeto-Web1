import {app, auth} from './config/firebase.js'
import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"

const autenticarUsuario = () => {
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value


    signInWithEmailAndPassword(auth, email, senha)
    .then( (user) => {
        console.log(JSON.stringify(user))

         window.location.href = "./Home.html" 
    })
    .catch( (error) => {
        console.log(error.code)
        if (error.code === "auth/wrong-password")
            document.getElementById("lblAviso").innerHTML = "Senha incorreta"
        else if(error.code === "auth/user-not-found")
            document.getElementById("lblAviso").innerHTML = "Usuário inválido"
    })

}

document.getElementById("btnEntrar").addEventListener('click', autenticarUsuario)

document.getElementById("divLogo").addEventListener('click', () => {
    window.location.href = "index.html"
})