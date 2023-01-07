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

        document.getElementById("btnImagem").addEventListener('click', () => {
            inputFile = document.getElementById("ComprovanteFile")
            inputFile.click()
        })

        document.getElementById("btnSalvar").addEventListener('click', () => {salvar(id)})
        document.getElementById("btnConfirmaExclu").addEventListener('click', () => {excluir(id)})

        document.getElementById("ComprovanteFile").addEventListener('change', function (event) {
            file = event.target.files[0]
        })

        if (id) {
            let iduser = auth.currentUser.uid
            getDoc(doc(db, "usuarios/" + iduser + "/vacinas", id))

                .then((documento) => {
                    setDataVacina(documento.data().DataVacina)
                    setNomeVacina(documento.data().NomeVacina)
                    setProximaVacina(documento.data().ProximaVacina)
                    setPathFoto(documento.data().pathFoto)

                })
                .catch((error) => {
                    console.log("Erro ao recuperar o documento: " + error)
                })

        }
        
        const salvar = (id) => {
            let iduser = auth.currentUser.uid

            if (file) {
                uploadBytes(ref(storage, getPathFoto()), file)
                    .then((result) => {
                        updateDoc(doc(db, "usuarios/" + iduser + "/vacinas", id), {
                            DataVacina: getDataVacina(),
                            NomeVacina: getNomeVacina(),
                            Dose: getDose(),
                            ProximaVacina: getProximaVacina(),
                            pathFoto: getPathFoto()
                        })
                            .then(() => {
                                window.location.href = "./Home.html"
                            })
                            .catch((error) => {
                                console.log("Erro ao atualizar o documento: " + error)
                            })
                    })
                    .catch((error) => {
                        console.log("Erro ao enviar arquivo: " + error)
                    })
            } else {
                updateDoc(doc(db, "usuarios/" + iduser + "/vacinas", id), {
                    DataVacina: getDataVacina(),
                    NomeVacina: getNomeVacina(),
                    Dose: getDose(),
                    ProximaVacina: getProximaVacina(),
                })
                    .then(() => {
                        window.location.href = "./Home.html"
                    })
                    .catch((error) => {
                        console.log("Erro ao atualizar o documento: " + error)
                    })
            }

        }

        const excluir = (id) => {
            let iduser = auth.currentUser.uid
            deleteObject(ref(storage, getPathFoto()))
            .then(() => {
                deleteDoc(doc(db, "usuarios/" + iduser + "/vacinas", id))
                .then(() => {
                    window.location.href = "./Home.html"
                })
                .catch((error) => {
                    console.log("Erro ao excluir documento: " + error)
                })
            })
            .catch((error) => {
                console.log("Erro ao excluir o arquivo.")
            })


        }
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
