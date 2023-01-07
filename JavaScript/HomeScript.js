import {app, auth} from './config/firebase.js'
import { signOut} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import {db} from './config/firebase.js'
import {query, collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

const listaVacinas = []

auth.onAuthStateChanged( function(user) {
    if(!auth.currentUser){
        window.location.href = "./index.html"

    } else{

        document.getElementById("txtPesquisa").addEventListener('keyup', () => {
            const searchString = document.getElementById("txtPesquisa").value.trim()
            showCardsVacinas(listaVacinas.filter(vacina => vacina.nome.includes(searchString)))
        })

        const carregarVacinas = () => {

            let id = auth.currentUser.uid
            const q = query( collection(db, "usuarios/"+id+"/vacinas"))

            onSnapshot(q, (results) => {
                results.forEach((documento) => {
                    listaVacinas.push({
                        id: documento.id,
                        data: documento.data().DataVacina,
                        nome: documento.data().NomeVacina,
                        dose: documento.data().Dose,
                        imagem: documento.data().Comprovante,
                        proximaDose:  documento.data().ProximaVacina,
                    })
                    showCardsVacinas(listaVacinas)
                })
      
            })
        }

        carregarVacinas()

    }

})


const showCardsVacinas = (lista) => {
    document.getElementById("listaVacinas").innerHTML = ""
    lista.forEach((documento) => {
        CardVacinas(documento.nome, documento.dose, documento.data, documento.imagem, documento.proximaDose, documento.id)
    })
}



const CardVacinas = (nome, dose, data, imagem, proximaDose,id) =>{

    const DivVacina = document.createElement("article")

    const NomeVacina = document.createElement("h2")
    NomeVacina.innerHTML = nome

    const DoseVacina = document.createElement("p")
    DoseVacina.innerHTML = dose

    const DataVacina = document.createElement("h3")
    DataVacina.innerHTML = data

    const ComprovanteImagem = document.createElement("img")
    ComprovanteImagem.src = imagem

    const ProxDose = document.createElement("span")
    ProxDose.innerHTML = proximaDose

    const inputHiddenId = document.createElement("input")
    inputHiddenId.type = 'hidden'
    inputHiddenId.hidden = id

    DivVacina.appendChild(NomeVacina)
    DivVacina.appendChild(DoseVacina)
    DivVacina.appendChild(DataVacina)
    DivVacina.appendChild(ComprovanteImagem)
    DivVacina.appendChild(ProxDose)
    DivVacina.appendChild(inputHiddenId)

    DivVacina.addEventListener("click", () => {
        window.location.href = "EditarVacinas.html?id=" + id
    })

    document.getElementById("listaVacinas").appendChild(DivVacina)
}



const deslogar = () => {
    signOut(auth)

}

document.getElementById("btnDeslogar").addEventListener('click', deslogar)


          


