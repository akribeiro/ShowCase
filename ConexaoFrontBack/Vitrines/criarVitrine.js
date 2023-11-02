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
    document.getElementById("opcoes").style.display = "block";
    document.getElementById("opcoesSelect").style.display = "block";
});

document.getElementById("criarVitrine").addEventListener("click", function () {
    var nomeVitrine = document.getElementById("nomeVitrine").value;
    var opcaoSelecionada = document.getElementById("opcoesSelect");
    var templateId = opcaoSelecionada.value;
    var textoOpcaoSelecionada = opcaoSelecionada.options[opcoesSelect.selectedIndex].innerText;

    console.log("AQUI")
    console.log(textoOpcaoSelecionada);
    console.log(templateId);

    if (nomeVitrine.trim() !== ""){
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
                                    console.log(response.data.data.id);
                                    const showcaseId = response.data.data.id;
                                    
                                    // Crie um objeto com os dados do usuário
                                    const styleData = {
                                        templateId: templateId,
                                        showcaseId: showcaseId
                                    };

                                    let data = JSON.stringify({
                                        "templateId": styleData.templateId,
                                        "showcaseId": styleData.showcaseId
                                    });

                                    let config = {
                                        method: 'post',
                                        maxBodyLength: Infinity,
                                        url: 'https://localhost:7058/api/v1/ShowcaseStyle',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': ''
                                        },
                                        data: data
                                    };

                                    axios.request(config)
                                    .then((response) => {
                                        if (response.status === 200 && response.data.statusCode === 200){
                                            
                                            if (textoOpcaoSelecionada === "Vertical"){
                                                const nextPage = `../../Paginas/CriacaoDaVitrine.html?id=${userId}`;
                                                window.location.href = nextPage;
                                            }
                                            else if(textoOpcaoSelecionada === "Horizontal"){
                                                const nextPage = `../../Paginas/CriacaoDaVitrine2.html?id=${userId}`;
                                                window.location.href = nextPage;  
                                            }
                                        }
                                        else{
                                            // Exiba uma mensagem de erro ou trate de outra forma
                                            console.log("Erro no registro do estilo da vitrine: " + response.data);
                                        }
                                    })
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
});

// Função para carregar as opções de estilo de vitrine
function carregarOpcoesDeEstilo() {
    // Fazer a solicitação para obter as opções de estilo
    axios.get('https://localhost:7058/api/v1/ShowcaseStyle/GetAllTemplates')
        .then((response) => {
            if (response.status === 200 && response.data.statusCode === 200) {
                const opcoesDeEstilo = response.data.data;
                // Criar dinamicamente elementos HTML com as opções de estilo
                const opcoesSelect = document.getElementById("opcoesSelect");

                opcoesDeEstilo.forEach((estilo) => {
                    const option = document.createElement("option");
                    option.value = estilo.id;
                    option.textContent = estilo.name;
                    opcoesSelect.appendChild(option);
                });
            } else {
                // Trate erros ou exiba mensagens de erro
                console.log("Erro ao carregar as opções de estilo de vitrine:", response.data);
            }
        })
        .catch((error) => {
            console.log("Erro na solicitação:", error);
        });
}

// Chame a função para carregar as opções de estilo no carregamento da página
carregarOpcoesDeEstilo();