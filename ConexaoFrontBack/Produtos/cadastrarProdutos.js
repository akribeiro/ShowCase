document.getElementById('formularioProduto').addEventListener('submit', function (event) {
    event.preventDefault();

    const produto = document.getElementById('produto').value;
    const valor = document.getElementById('valor').value;

    const postData = {
        name: produto,
        value: parseFloat(valor)
    };

    let data = JSON.stringify({
        "name": postData.name,
        "value": postData.value
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://localhost:7058/api/v1/Product',
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
});