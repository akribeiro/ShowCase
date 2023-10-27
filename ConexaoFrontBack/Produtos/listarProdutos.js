document.addEventListener("DOMContentLoaded", function () {
    // Fazer uma solicitação ao banco de dados para obter a lista de produtos
    axios.get("https://localhost:7058/api/v1/Product/GetAll")
        .then(function (response) {
            const produtos = response.data; // Lista de Produtos

            const tabelaProdutos = document.getElementById("tabelaDeProdutos"); // Seleciona o corpo da tabela

            // Iterar sobre os produtos e criar linhas na tabela para cada um
            produtos.forEach(function (produto, index) {
                const newRow = tabelaProdutos.insertRow();
                newRow.className = "align-middle";

                const cellNumero = newRow.insertCell(0);
                cellNumero.textContent = index + 1;

                const cellNome = newRow.insertCell(1);
                cellNome.textContent = produto.name;

                const cellValor = newRow.insertCell(2);

                // Crie a estrutura dentro da célula de Valor
                const valorContainer = document.createElement("div");
                valorContainer.className = "d-flex align-items-center justify-content-between";

                const valorTexto = document.createElement("div");
                valorTexto.textContent = `Valor: R$${produto.value.toFixed(2)}`;
                valorContainer.appendChild(valorTexto);

                const botoesContainer = document.createElement("div");

                const editarLink = document.createElement("a");
                editarLink.href = "#";
                editarLink.style.textDecoration = "none";
                const editarBtn = document.createElement("button");
                editarBtn.className = "btn btn-secondary";
                editarBtn.style.color = "black";
                editarBtn.type = "button";
                editarBtn.innerHTML = '<i class="bi bi-pencil"></i>';
                editarLink.appendChild(editarBtn);
                botoesContainer.appendChild(editarLink);
                editarBtn.style.marginRight = "5px";

                const excluirLink = document.createElement("a");
                excluirLink.href = "#";
                excluirLink.style.textDecoration = "none";
                const excluirBtn = document.createElement("button");
                excluirBtn.className = "btn btn-danger";
                excluirBtn.style.color = "black";
                excluirBtn.type = "button";
                excluirBtn.innerHTML = '<i class="bi bi-trash"></i>';
                excluirLink.appendChild(excluirBtn);
                botoesContainer.appendChild(excluirLink);

                valorContainer.appendChild(botoesContainer);

                cellValor.appendChild(valorContainer);

                // Atribuir um ID exclusivo à linha com base no ID do produto
                newRow.id = `produto_${produto.id}`;

                // Adicionar um evento de clique ao botão de exclusão
                excluirBtn.addEventListener("click", function () {
                    // Chamar a função para excluir o produto e passar o ID do produto
                    excluirProduto(produto.id);
                });
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

// Função para excluir um produto com base no ID
function excluirProduto(id) {
    // Fazer uma solicitação para excluir o produto com o ID fornecido
    axios.delete(`https://localhost:7058/api/v1/Product/${id}`)
        .then(function (response) {
            // Remover a linha da tabela após a exclusão bem-sucedida
            const linhaProduto = document.getElementById(`produto_${id}`);
            linhaProduto.remove();
        })
        .catch(function (error) {
            console.log(error);
            const linhaProduto = document.getElementById(`produto_${id}`);
            linhaProduto.remove();
        });
}
