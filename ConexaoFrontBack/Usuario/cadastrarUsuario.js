document.getElementById('formularioCadastro').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarEmail = document.getElementById("confirmarEmail").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (email !== confirmarEmail) {
        // Os valores são diferentes, exiba uma mensagem de erro
        const mensagemErro = document.getElementById("mensagemErro");
        mensagemErro.style.display = "Block";
        return; // Impede o envio do formulário
    } else if (senha !== confirmarSenha) {
        // Os valores são diferentes, exiba uma mensagem de erro
        const mensagemErro = document.getElementById("mensagemErroSenha");
        mensagemErro.style.display = "Block";
        return; // Impede o envio do formulário
    } else {
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
            url: 'https://localhost:7058/api/v1/Auth/Register',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            },
            data: data
        };

        axios.request(config)
        .then((response) => {
            if (response.status === 200 && response.data.statusCode === 200) {

                // Crie um objeto com os dados do usuário
                const storeData = {
                    name: nome,
                    storeLogo: null,
                    userId: response.data.data.id
                };

                let dataStore = JSON.stringify({
                    "name": storeData.name,
                    "storeLogo": storeData.storeLogo,
                    "userId": storeData.userId
                });

                let configStore = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://localhost:7058/api/v1/Store',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': ''
                    },
                    data: dataStore
                };

                axios.request(configStore)
                .then((response) => {
                    if (response.status === 200 && response.data.statusCode === 200){
                        window.location.href = '../../Paginas/Login.html';
                    }
                    else{
                        // Exiba uma mensagem de erro ou trate de outra forma
                        console.log("Erro no registro: " + response.data);
                    }
                })

            } else {
                // Exiba uma mensagem de erro ou trate de outra forma
                console.log("Erro no registro: " + response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
});
