const validarSenha = () =>{

    let senha = document.getElementById("senha").value
    let validasenha = document.getElementById("validaSenha").value
    
    if(senha != validasenha){
        document.getElementById("error").style.display="flex"
    } else{
        document.getElementById("btnCadastrar").setAttribute("href","Entrar.html")
    }
}