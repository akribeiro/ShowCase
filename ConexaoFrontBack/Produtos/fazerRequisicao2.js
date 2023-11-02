document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    // Verifica se há um userId válido
    if (userId) {
        const apiUrl = `https://localhost:7058/api/v1/Store/GetAllStoresByUserId/${userId}`;

                // Faz a solicitação para obter os detalhes da loja
                axios.get(apiUrl)
                    .then((response) => {
                        if (response.status === 200 && response.data.statusCode === 200) {
                            // PEGAR AQUI O storeId para criar uma nova vitrine
                            const storeId = response.data.data[0].id;

                            const searchUrl = `https://localhost:7058/api/v1/StoreProduct/GetAllProductsByStoreId/${storeId}`;

                            // Fazer uma solicitação ao banco de dados para obter a lista de produtos
                            axios.get(searchUrl)
                            .then(function (response) {
                                const produtos = response.data.data; //Lista de Produtos
                                console.log(response);

                                const produtosLista = document.getElementById("produtosLista");

                                //Iterar sobre os produtos e criar elementos <li> para cada um
                                produtos.forEach(function (produto) {
                                    const li = document.createElement("li");
                                    li.innerHTML = `<p class="dropdown-item" id="${produto.id}">${produto.name}</p>`;
                                    produtosLista.appendChild(li);

                                    // Adicione um evento de clique para cada produto
                                    li.addEventListener("click", function () {
                                        // Crie uma cópia do elemento do produto
                                        const productCard = createProductCard(produto);

                                        // Encontre a div "m-2" na página CriacaoDaVitrine.html
                                        const Div = document.querySelector('.row.mx-auto');

                                        // Insira o produto na div "m-2"
                                        Div.appendChild(productCard);
                                    });
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


// Função para criar um elemento de produto
function createProductCard(produto) {
    const customProductCard = document.createElement("div");
    customProductCard.className = "col-md-4 mb-2";

    customProductCard.innerHTML = `
        <div class="text-decoration-none border mx-1 w-100 p-3" style="color: white; background: url('../Imagens/backgroundTexture.png') repeat, linear-gradient(to top, rgb(0, 81, 156), black);background-blend-mode: overlay; border-radius: 40px;">
            <div class="d-flex justify-content-center">
                <img src="${produto.imageUrl}" width="150px" class="my-2">
            </div>
            <div class="d-flex flex-column">
                <h1>${produto.name}</h1>
                <h5>Valor: ${produto.value} av<br>ou ${produto.value} em até 12x</h5>
                <h6>Descrição: ${produto.sku}</h6>
            </div>
            <div class="mt-3 d-flex justify-content-center" style="color: white; border: none; background: none;">
                <a href="#" class="btn btn-primary">Quero Este!</a>
            </div>
        </div>
    `;

    return customProductCard;
}

