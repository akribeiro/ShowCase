// Função para verificar o login do usuário
function verificarLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Fazer uma solicitação para verificar o login no Swagger
    // Substitua a URL pelo endpoint real do seu serviço Swagger
    axios.post("https://localhost:7058/api/v1/Auth/Login", {
        email: email,
        password: senha
    })
    .then(function (response) {
        console.log("LOGADO");
        // Login bem-sucedido, redirecione o usuário para a página principal
        window.location.href = "../../Paginas/PaginaPrincipalUsuario.html";
    })
    .catch(function (error) {
        console.log("OK");
        const mensagemErro = document.getElementById("mensagemErro");
            mensagemErro.style.display = "Block";
            return; // Impede o envio do formulário
    });
}

const formularioLogin = document.querySelector('form');
formularioLogin.addEventListener('submit', function (event) {
    event.preventDefault(); // Evite o comportamento padrão de recarregar a página
    verificarLogin();
});
