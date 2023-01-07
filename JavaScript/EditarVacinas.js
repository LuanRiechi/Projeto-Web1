import { app, auth } from './config/firebase.js'
import { db, storage } from './config/firebase.js'
import { signOut} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import {  getDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { uploadBytes, ref, deleteObject } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"

var file = null;
var pathFoto = null;
var inputFile = null;

auth.onAuthStateChanged(function (user) {
    if (!auth.currentUser) {
        window.location.href = "./index.html"
    }
    else {
        const id = new URLSearchParams(window.location.search).get('id')

        document.getElementById("btnExcluir").addEventListener("click", () => {
            document.getElementById("popUp").style.display = "flex"
        })

        const deslogar = () => {
            signOut(auth)
        
        }
        
        document.getElementById("btnDeslogar").addEventListener('click', deslogar)
    }
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

const getPathFoto = () => {
    return pathFoto
}



const setDataVacina = (data) => {
    document.getElementById("dataVacina").value = data
}

const setNomeVacina = (nome) => {
    document.getElementById("nomeVacina").value = nome
}


const setProximaVacina = (proxData) => {
    document.getElementById("ProximaVacina").value = proxData
}

const setPathFoto = (caminho) => {
    pathFoto = caminho
}
