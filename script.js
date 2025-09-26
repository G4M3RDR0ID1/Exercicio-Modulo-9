//ciclo de vida: DNS, conexão, requisição, resposta.

//pegar a lista de clientes para manipular
const listaDeCliente = document.getElementById("listaCliente");
//pegar o endpoint "Servidor-BackEnd"
const url = "https://crudcrud.com/api/36646ad954d845f6a4803db335c2d964/CadastroCliente"

//Estabelecer conexão
fetch(url)
.then(resposta => resposta.json())
.then((cadastros) =>{//Pegar o cadastros e manipular elee
    cadastros.forEach(cadastro => {
        const linha = document.createElement("tr");
        const linhaNome = document.createElement("td"); //Elemento criado para a linha do nome
        const linhaEmail = document.createElement("td"); //Elemento criado para a linha do email
        const botao = document.createElement("td"); 

        linhaNome.innerHTML = `${cadastro.nome}`;
        linhaEmail.innerHTML = `${cadastro.email}`;
        botao.innerHTML= `<button type="button" onclick="excluirCadastro('${cadastro._id}', this)">Excluir</button>`;

        linha.appendChild(linhaNome);
        linha.appendChild(linhaEmail);
        linha.appendChild(botao);
        listaDeCliente.appendChild(linha);
    });
})

//enviar pro servidor oque o usuario digitar e mostrar na tela

document.getElementById("cadastrar").addEventListener("click", ()=>{
    const userName = document.getElementById("nome").value;
    const userEmail= document.getElementById("email").value;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: userName,
            email: userEmail
        })
    })
    .then(resposta => resposta.json())
    .then((novoCadastro) =>{
        const linha = document.createElement("tr");

        const linhaNome = document.createElement("td");
        const linhaEmail = document.createElement("td"); 
        const botao = document.createElement("td"); 

        linhaNome.innerHTML = `${novoCadastro.nome}`
        linhaEmail.innerHTML = `${novoCadastro.email}`
        botao.innerHTML =  `<button type="button" onclick="excluirCadastro('${novoCadastro._id}', this)">Excluir</button>`;

        linha.appendChild(linhaNome);
        linha.appendChild(linhaEmail);
        linha.appendChild(botao);

        listaDeCliente.appendChild(linha);

        //limpar os campos
        document.getElementById("nome").value = '';
        document.getElementById("email").value = '';
    })
})

function excluirCadastro(_id, linha){
fetch(`${url}/${_id}`, {
            method: "DELETE",       
        })    
        .then(()=>{
           linha.parentElement.parentElement.remove(); 
        })
}
