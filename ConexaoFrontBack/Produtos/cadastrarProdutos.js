document.getElementById('formularioProduto').addEventListener('submit', function (event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    // Verifica se há um userId válido
    if (userId) {
        const apiUrl = `https://localhost:7058/api/v1/Store/GetById/${userId}`;
        // Fazer uma solicitação à API para obter o storeId
        axios.get(apiUrl)
            .then((response) => {
                if (response.status === 200 && response.data.statusCode === 200){
                    // Pegar aqui o storeId para criar uma nova vitrine
                    const storeId = response.data.data.storeId;
                    const produto = document.getElementById('produto').value;
                    const valor = document.getElementById('valor').value;
                    const descricao = document.getElementById('descricao').value;
                    const sku = document.getElementById('sku').value;

                    const postData = {
                        storeId: storeId,
                        name: produto,
                        value: parseFloat(valor),
                        sku: sku
                    };

                    let data = JSON.stringify({
                        "storeId": postData.storeId,
                        "name": postData.name,
                        "value": postData.value,
                        "sku": postData.sku
                    });

                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: 'https://localhost:7058/api/v1/StoreProduct/CreateProduct',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': ''
                        },
                        data: data
                    };

                    axios.request(config)
                        .then((response) => {
                            window.location.href = '../../Paginas/Produtos.html';
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