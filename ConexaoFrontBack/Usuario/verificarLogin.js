document.getElementById('formularioLogin').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
        // Crie um objeto com os dados do usuário
    const userData = {
        email: email,
        password: senha
    };

    let data = JSON.stringify({
        "email": userData.email,
        "password": userData.password
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://showcase-api.azurewebsites.net/api/v1/Auth/Login',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        },
        data: data
    };

    axios.request(config)
    .then((response) => {
        if (response.status === 200 && response.data.statusCode === 200) {
            // Registro bem-sucedido, redirecione para a próxima página
            const userId = response.data.data.id;
            const nextPage = `../../Paginas/PaginaPrincipalUsuario.html`;
            localStorage.setItem("userId", userId);
            window.location.href = nextPage;
        } else {
            // Exiba uma mensagem de erro ou trate de outra forma
            console.log("Erro no registro: " + response.data);
        }
    })
    .catch((error) => {
        console.log(error);
    });
});