document.addEventListener("DOMContentLoaded", function () {
    const productId = localStorage.getItem("productId");

    const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/StoreProduct/GetProductById/${productId}`;
    axios.request(apiUrl)
        .then((response) => {
            if (true){
                console.log(response.data.data);
                const productName = response.data.data.name;
                const productValue = response.data.data.value;
                const productDescription = response.data.data.description;
                const productSku = response.data.data.sku;
                const productImg = response.data.data.urlProductPicture;
                localStorage.setItem("urlProductPicture", productImg);

                // Seleciona os elementos de input
                const inputProduto = document.getElementById("produto");
                const inputValor = document.getElementById("valor");
                const inputDescricao = document.getElementById("descricao");
                const inputSku = document.getElementById("sku");

                // Define os valores nos campos de input
                inputProduto.value = productName;
                inputValor.value = productValue;
                inputDescricao.value = productDescription;
                inputSku.value = productSku;

            }
        });

    // Manipulador de evento de envio do formulário
    document.getElementById('formularioProdutoEdicao').addEventListener('submit', function (event){
        event.preventDefault(); // Impede o envio padrão do formulário

        const inputProduto = document.getElementById("produto");
        const inputValor = document.getElementById("valor");
        const inputDescricao = document.getElementById("descricao");
        const inputSku = document.getElementById("sku");
        
        const novoNome = inputProduto.value;
        const novoValor = inputValor.value;
        const novaDescricao = inputDescricao.value;
        const novoSku = inputSku.value;

        const imagemProduto = document.getElementById('imagemProduto');

        let file = null;

        if (imagemProduto.files.length > 0) {
            // Um arquivo foi selecionado pelo usuário
            file = imagemProduto.files[0];
        }
        else{
            file = localStorage.getItem("urlProductPicture");
            console.log("ATUAL!");
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
            url: 'https://showcase-api.azurewebsites.net/api/v1/StoreProduct/EditProduct',
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
    });
});
