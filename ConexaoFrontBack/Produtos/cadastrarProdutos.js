document.getElementById('formularioProduto').addEventListener('submit', function (event) {
    event.preventDefault();

    const userId = localStorage.getItem("userId");

    // Verifica se há um userId válido
    if (userId) {
        const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/Store/GetAllStoresByUserId/${userId}`;
        // Fazer uma solicitação à API para obter o storeId
        axios.get(apiUrl)
            .then((response) => {
                if (response.status === 200 && response.data.statusCode === 200){
                    // Pegar aqui o storeId para criar uma nova vitrine
                    const storeId = response.data.data[0].id;

                    const produto = document.getElementById('produto').value;
                    const valor = document.getElementById('valor').value;
                    const descricao = document.getElementById('descricao').value;
                    const sku = document.getElementById('sku').value;

                    const postData = {
                        storeId: storeId,
                        name: produto,
                        value: parseFloat(valor),
                        sku: sku,
                        description: descricao
                    };

                    let data = JSON.stringify({
                        "storeId": postData.storeId,
                        "name": postData.name,
                        "value": postData.value,
                        "sku": postData.sku,
                        "description": postData.description
                    });

                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: 'https://showcase-api.azurewebsites.net/api/v1/StoreProduct/CreateProduct',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': ''
                        },
                        data: data
                    };

                    axios.request(config)
                        .then((response) => {
                            const nextPage = `../../Paginas/Produtos.html`;
                            window.location.href = nextPage;
                        })
                        .catch((error) => {
                            console.log(error);
                        });


                }
                else{
                    console.log("Erro para pegar storeId:", response.data);
                }
        });
        
    } else {
        console.log("UserId não encontrado na URL.");
    }
});