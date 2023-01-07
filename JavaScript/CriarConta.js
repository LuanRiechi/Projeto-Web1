import { app, auth } from './config/firebase.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import { db } from './config/firebase.js'
import { setDoc, doc, } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"


const validarSenha = () => {
    let nome = document.getElementById("nome").value
    let sexo = document.querySelector('input[name="sexo"]:checked').value
    let data = document.getElementById("data").value
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    let validasenha = document.getElementById("validaSenha").value

    if (senha != validasenha) {
        document.getElementById("error").style.display = "flex"
    } else {

        createUserWithEmailAndPassword(auth, email, senha)
            .then((result) => {
                    setDoc(doc(db, "usuarios", result.user.uid ), {
                    nome: nome,
                    sexo: sexo,
                    dataNascimento: data,
                    email: email,
                    senha: senha
                })
                    .then((resultTab) => {
                        window.location.href = "./Entrar.html"
                    })
                    .catch((error) => {
                        console.log("Erro ao persistir dados: " + error)
                    })


            })
            .catch((error) => {
                console.log(error.message)
                console.log("esta caindo aqui!!!!!!")
            })

    }
}

document.getElementById("btnCadastrar").addEventListener('click', validarSenha)