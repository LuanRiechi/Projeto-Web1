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

const getDataVacina = () => {
    return document.getElementById("dataVacina").value
}

const getNomeVacina = () => {
    return document.getElementById("nomeVacina").value
}

const getDose = () => {
    return document.querySelector('input[name="Dose"]:checked').value
}

const getComprovante = () => {
    return document.getElementById("ComprovanteFile").value
}

const getProximaVacina = () => {
    return document.getElementById("ProximaVacina").value
}

const uid = () => {
    const id = Date.now().toString(16) + Math.random().toString(16)
    return id.replace(/\./g, '')
}

const cadastrar = () => {
    let id = auth.currentUser.uid
    
    const fileRef = "images/" + uid()

    uploadBytes(ref(storage, fileRef), file)
        .then((result) => {
            getDownloadURL(ref(storage, fileRef))
                .then((url) => {
                    addDoc(collection(db, "usuarios/" + id + "/vacinas"), {
                        DataVacina: getDataVacina(),
                        NomeVacina: getNomeVacina(),
                        Dose: getDose(),
                        Comprovante: url,
                        ProximaVacina: getProximaVacina(),
                        pathFoto: fileRef
                    })
                        .then((result) => {
                            window.location.href = "./Home.html"
                        })
                        .catch((error) => {
                            console.log("Erro ao persistir dados: " + error)
                        })
                })
                .catch((error) => {
                    console.log("Erro ao recuperar URL de download: " + error)
                })
        })
        .catch((error) => {
            console.log("Erro ao enviar arquivo: " + error)
        })

}

const deslogar = () => {
    signOut(auth)

}

document.getElementById("btnImagem").addEventListener('click', () => {
    inputFile = document.getElementById("ComprovanteFile")
    inputFile.click()
})

document.getElementById("btnDeslogar").addEventListener('click', deslogar)

document.getElementById("ComprovanteFile").addEventListener('change', function (event) {
    file = event.target.files[0]
})

document.getElementById("btnCadastrar").addEventListener('click', cadastrar)


