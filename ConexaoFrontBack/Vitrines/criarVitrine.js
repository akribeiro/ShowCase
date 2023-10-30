document.getElementById("criarProduto").addEventListener("click", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    // Verifica se há um userId válido
    if (userId) {
        const nextPage = `../../Paginas/Produtos.html?id=${userId}`;
        window.location.href = nextPage;
    } else {
        console.log("UserId não encontrado na URL.");
    }
});


document.getElementById("addVitrine").addEventListener("click", function () {
    document.getElementById("nomeVitrine").style.display = "block";
    document.getElementById("criarVitrine").style.display = "block";
    document.getElementById("opcao1").style.display = "block";
    document.getElementById("opcao2").style.display = "block";
});


document.getElementById("criarVitrine").addEventListener("click", function () {
    var nomeVitrine = document.getElementById("nomeVitrine").value;
    var opcaoSelecionada = document.querySelector('input[name="opcao"]:checked');

    if (nomeVitrine.trim() !== "") {
        if (opcaoSelecionada.value === "Vertical") {
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get("id");

            // Verifica se há um userId válido
            if (!userId) {
                console.log("UserId inválido.");
            } else {
                // Define a URL da API para obter os detalhes da loja com base no userId
                const apiUrl = `https://localhost:7058/api/v1/Store/GetAllStoresByUserId/${userId}`;

                // Faz a solicitação para obter os detalhes da loja
                axios.get(apiUrl)
                    .then((response) => {
                        if (response.status === 200 && response.data.statusCode === 200) {
                            // PEGAR AQUI O storeId para criar uma nova vitrine
                            const storeId = response.data.data[0].id;
                            console.log(storeId);
                            console.log(nomeVitrine);

                            // Crie um objeto com os dados do usuário
                            const vitrineData = {
                                name: nomeVitrine,
                                storeId: storeId
                            };

                            let data = JSON.stringify({
                                "name": vitrineData.name,
                                "storeId": vitrineData.storeId
                            });

                            let config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: 'https://localhost:7058/api/v1/Showcase',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': ''
                                },
                                data: data
                            };

                            axios.request(config)
                            .then((response) => {
                                if (response.status === 200 && response.data.statusCode === 200){
                                    const nextPage = `../../Paginas/CriacaoDaVitrine.html?id=${userId}`;
                                    window.location.href = nextPage;                                    
                                }
                                else{
                                    // Exiba uma mensagem de erro ou trate de outra forma
                                    console.log("Erro no registro da vitrine: " + response.data);
                                }
                            })
                            
                        } else {
                            // Trate erros ou exiba mensagens de erro
                            console.log("Erro ao obter detalhes da loja:", response.data);
                        }
                    })
                    .catch((error) => {
                        console.log("Erro na solicitação:", error);
                    });
            }
        } else if(opcaoSelecionada.value === "Horizontal"){
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get("id");

            // Verifica se há um userId válido
            if (!userId) {
                console.log("UserId inválido.");
            } else {
                // Define a URL da API para obter os detalhes da loja com base no userId
                const apiUrl = `https://localhost:7058/api/v1/Store/GetAllStoresByUserId/${userId}`;

                // Faz a solicitação para obter os detalhes da loja
                axios.get(apiUrl)
                    .then((response) => {
                        if (response.status === 200 && response.data.statusCode === 200) {
                            // PEGAR AQUI O storeId para criar uma nova vitrine
                            const storeId = response.data.data[0].id;

                            // Crie um objeto com os dados do usuário
                            const vitrineData = {
                                name: nomeVitrine,
                                storeId: storeId
                            };

                            let data = JSON.stringify({
                                "name": vitrineData.name,
                                "storeId": vitrineData.storeId
                            });

                            let config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: 'https://localhost:7058/api/v1/Showcase',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': ''
                                },
                                data: data
                            };

                            axios.request(config)
                            .then((response) => {
                                if (response.status === 200 && response.data.statusCode === 200){
                                    const nextPage = `../../Paginas/CriacaoDaVitrine2.html?id=${userId}`;
                                    window.location.href = nextPage;                                     
                                }
                                else{
                                    // Exiba uma mensagem de erro ou trate de outra forma
                                    console.log("Erro no registro da vitrine: " + response.data);
                                }
                            })
                        } else {
                            // Trate erros ou exiba mensagens de erro
                            console.log("Erro ao obter detalhes da loja:", response.data);
                        }
                    })
                    .catch((error) => {
                        console.log("Erro na solicitação:", error);
                    });
            }
        }
        else{
            alert("Selecione uma opção!");
        }
    } else {
        alert("Digite um nome válido para a vitrine.");
    }
});