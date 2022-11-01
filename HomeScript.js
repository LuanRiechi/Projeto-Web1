vacinas = [
    {
        NomeVacina: "BCG",
        DoseVacina: "Dose única",
        data: "10/06/2022",
        imagem: "images/ComprovanteVacina.jpg",
        proxmaData:"Não há próxima dose"
    },

    {   
        NomeVacina: "Hepatite B",
        DoseVacina: "1a. Dose",
        data: "11/08/2022",
        imagem: "images/ComprovanteVacina.jpg",
        proxmaData:"Proxima dose em: 11/10/2022"
    },

    {
        NomeVacina: "Rotavírus",
        DoseVacina: "1a. Dose",
        data: "11/10/2022",
        imagem: "images/ComprovanteVacina.jpg",
        proxmaData:"Proxima dose em: 11/10/2023"
    },

    {
        NomeVacina: "Febre amarela",
        DoseVacina: "1a. Dose",
        data: "11/10/2022",
        imagem: "images/ComprovanteVacina.jpg",
        proxmaData:"Proxima dose em: 11/10/2023"
    },
]

const CardVacinas = (nome, dose, data, imagem, proximaDose) =>{

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

    DivVacina.appendChild(NomeVacina)
    DivVacina.appendChild(DoseVacina)
    DivVacina.appendChild(DataVacina)
    DivVacina.appendChild(ComprovanteImagem)
    DivVacina.appendChild(ProxDose)

    DivVacina.addEventListener("click", () => {
        window.location.href = "EditarVacinas.html"
    })

    return DivVacina
}

for (v of vacinas) {
   document.getElementById("listaVacinas").appendChild(CardVacinas(v.NomeVacina,v.DoseVacina,v.data,v.imagem,v.proxmaData))
}