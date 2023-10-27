document.addEventListener("DOMContentLoaded", function () {
    // Seletor para o formulário de cadastro
    const cadastroForm = document.querySelector("form");

    cadastroForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtenha os valores dos campos do formulário
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarEmail = document.getElementById("confirmarEmail").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;
        console.log("OK");

        if (email !== confirmarEmail) {
            // Os valores são diferentes, exiba uma mensagem de erro
            const mensagemErro = document.getElementById("mensagemErro");
            mensagemErro.style.display = "Block";
            return; // Impede o envio do formulário
        }
        else if(senha !== confirmarSenha){
            // Os valores são diferentes, exiba uma mensagem de erro
            const mensagemErro = document.getElementById("mensagemErroSenha");
            mensagemErro.style.display = "Block";
            return; // Impede o envio do formulário
        }
        else{
            // Crie um objeto com os dados do usuário
            const userData = {
                name: nome,
                email: email,
                password: senha
            };

            // Faça uma requisição POST para a API de cadastro
            axios.post("https://localhost:7058/api/v1/Auth/Register", userData)
                .then(function (response) {
                    // Trate a resposta, redirecione ou exiba uma mensagem de sucesso
                    console.log("Cadastro realizado com sucesso!");
                    // Redirecionar o usuário para a página desejada, por exemplo:
                    // window.location.href = "sucesso.html";
                })
                .catch(function (error) {
                    // Trate os erros, por exemplo, exibindo uma mensagem de erro
                    consol
                    e.error("Erro ao cadastrar: " + error.message);
                });
        }
    });
});
