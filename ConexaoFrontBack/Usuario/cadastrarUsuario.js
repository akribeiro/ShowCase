document.getElementById('formularioCadastro').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarEmail = document.getElementById("confirmarEmail").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const storeLogo = document.getElementById('logo');

    let file = null;

    if (storeLogo.files.length > 0) {
        // Um arquivo foi selecionado pelo usuário
        file = storeLogo.files[0];
    }
    

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
            url: 'https://showcase-api.azurewebsites.net/api/v1/Auth/Register',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            },
            data: data
        };

        axios.request(config)
        .then((response) => {
            if (response.status === 200 && response.data.statusCode === 200) {
                
                const storeData = {
                    name: nome,
                    storeLogo: file,
                    userId: response.data.data.id
                };

                // Crie um objeto FormData para o cadastro da loja
                const storeFormData = new FormData();
                storeFormData.append('name', storeData.name);
                storeFormData.append('storeLogo', storeData.storeLogo);
                storeFormData.append('userId', storeData.userId);

                let configStore = {
                    method: 'post',
                    url: 'https://showcase-api.azurewebsites.net/api/v1/Store',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': ''
                    },
                    data: storeFormData
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
                .catch((error) => {
                    console.log(error);
                });

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
