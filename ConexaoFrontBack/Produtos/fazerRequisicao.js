document.addEventListener("DOMContentLoaded", function () {
    // Fazer uma solicitação ao banco de dados para obter a lista de produtos
    axios.get("https://localhost:7058/api/v1/Product/GetAll")
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
});
