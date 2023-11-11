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

                    const imagemProduto = document.getElementById('imagemProduto');

                    let file = null;

                    if (imagemProduto.files.length > 0) {
                        // Um arquivo foi selecionado pelo usuário
                        file = imagemProduto.files[0];
                    }

                    const postData = {
                        ProductId: productId,
                        name: novoNome,
                        value: parseFloat(novoValor),
                        sku: novoSku,
                        description: novaDescricao,
                        productPicture: file
                    };

                    const storeFormData = new FormData();
                    storeFormData.append('ProductId', postData.ProductId);
                    storeFormData.append('Name', postData.name);
                    storeFormData.append('Value', postData.value);
                    storeFormData.append('SKU', postData.sku);
                    storeFormData.append('Description', postData.description);
                    storeFormData.append('ProductPicture', file);

                    let config = {
                        method: 'put', 
                        maxBodyLength: Infinity,
                        url: 'https://showcase-api.azurewebsites.net/api/v1/StoreProduct/CreateProduct',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': ''
                        },
                        data: storeFormData
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