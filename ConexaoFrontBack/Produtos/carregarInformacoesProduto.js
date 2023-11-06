document.addEventListener("DOMContentLoaded", function () {
    const productId = localStorage.getItem("productId");

    const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/StoreProduct/GetProductById/${productId}`;
    axios.request(apiUrl)
        .then((response) => {
            if (true){
                const productName = response.data.data.name;
                const productValue = response.data.data.value;
                const productDescription = "";
                const productSku = response.data.data.sku;
                const productImg = "";

                // Seleciona os elementos de input
                const inputProduto = document.getElementById("produto");
                const inputValor = document.getElementById("valor");
                const inputDescricao = document.getElementById("descricao");
                const inputSku = document.getElementById("sku");
                const inputImagemProduto = document.getElementById("imagemProduto");

                // Define os valores nos campos de input
                inputProduto.value = productName;
                inputValor.value = productValue;
                inputDescricao.value = productDescription;
                inputSku.value = productSku;
                inputImagemProduto.value = productImg;

            }
        });

    // Manipulador de evento de envio do formulário
    document.getElementById('formularioProdutoEdicao').addEventListener('submit', function (event){
        event.preventDefault(); // Impede o envio padrão do formulário

        const inputProduto = document.getElementById("produto");
        const inputValor = document.getElementById("valor");
        const inputDescricao = document.getElementById("descricao");
        const inputSku = document.getElementById("sku");
        const inputImagemProduto = document.getElementById("imagemProduto");
        
        const novoNome = inputProduto.value;
        const novoValor = inputValor.value;
        // const novaDescricao = inputDescricao.value;
        const novoSku = inputSku.value;
        // const novaImagem = inputImagemProduto.value;

        const postData = {
            id: productId,
            name: novoNome,
            value: parseFloat(novoValor),
            sku: novoSku
        };

        // Use o método PUT em vez de POST
        let config = {
            method: 'put', // Altere para 'put'
            maxBodyLength: Infinity,
            url: 'https://showcase-api.azurewebsites.net/api/v1/StoreProduct/EditProduct',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            },
            data: postData // Use o objeto postData diretamente
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
