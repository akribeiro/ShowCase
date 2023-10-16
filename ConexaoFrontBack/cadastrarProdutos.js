document.getElementById('formularioProduto').addEventListener('submit', function (event) {
    event.preventDefault();

    const produto = document.getElementById('produto').value;
    const valor = document.getElementById('valor').value;
    const descricao = document.getElementById('descricao').value;

    const postData = {
        name: produto,
        value: valor
    };

    // Realizar a requisição POST
    axios.post('https://localhost:7058/api/v1/Product', postData)
        .then(response => {
            console.log('Sucesso:', response.data);
            // Adicione aqui qualquer lógica adicional após o sucesso
        })
        .catch(error => {
            console.error('Erro na requisição:', error.message);
            // Adicione aqui qualquer lógica adicional para lidar com erros
        });

});
