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
                        storeId: storeId,
                        name: produto,
                        value: parseFloat(valor),
                        sku: sku,
                        description: descricao,
                        productPicture: file
                    };
    
                    const storeFormData = new FormData();
                    storeFormData.append('StoreId', postData.storeId);
                    storeFormData.append('Name', postData.name);
                    storeFormData.append('Value', postData.value);
                    storeFormData.append('SKU', postData.sku);
                    storeFormData.append('Description', postData.description);
                    storeFormData.append('ProductPicture', file);

                    let config = {
                        method: 'post',
                        url: 'https://showcase-api.azurewebsites.net/api/v1/Store',
                        headers: {
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