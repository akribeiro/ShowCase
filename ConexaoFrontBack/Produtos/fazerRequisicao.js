document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    // Verifica se há um userId válido
    if (userId) {
        const apiUrl = `https://localhost:7058/api/v1/Store/GetById/${userId}`;

                // Faz a solicitação para obter os detalhes da loja
                axios.get(apiUrl)
                    .then((response) => {
                        if (response.status === 200 && response.data.statusCode === 200) {
                            // PEGAR AQUI O storeId para criar uma nova vitrine
                            const storeId = response.data.data.storeId;

                            searchUrl = `https://localhost:7058/api/v1/StoreProduct/GetAllProductsByStoreId/${storeId}`;

                            // Fazer uma solicitação ao banco de dados para obter a lista de produtos
                            axios.get(searchUrl)
                            .then(function (response) {
                                const produtos = response.data; //Lista de Produtos

                                const produtosLista = document.getElementById("produtosLista");

                                //Iterar sobre os produtos e criar elementos <li> para cada um
                                produtos.forEach(function (produto) {
                                    const li = document.createElement("li");
                                    li.innerHTML = `<p class="dropdown-item">${produto.name}</p>`;
                                    produtosLista.appendChild(li);
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        }
                        else {
                            console.log("Erro para pegar storeId:", response.data);
                        }
                    });
    } else {
        console.log("UserId não encontrado na URL.");
    }
});
