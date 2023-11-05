document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    // Verifica se há um userId válido
    if (userId) {
        const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/Store/GetAllStoresByUserId/${userId}`;

                // Faz a solicitação para obter os detalhes da loja
                axios.get(apiUrl)
                    .then((response) => {
                        if (response.status === 200 && response.data.statusCode === 200) {
                            // PEGAR AQUI O storeId para criar uma nova vitrine
                            const storeId = response.data.data[0].id;
                            const storeName = response.data.data[0].name;

                            const lojaTronicElement = document.querySelector('.d-flex.justify-content-center.mb-0.mt-3');

                            if (lojaTronicElement) {
                                lojaTronicElement.textContent = storeName;
                            }
                        }
                        else {
                            console.log("Erro para pegar storeId:", response.data);
                        }
                    });    
    } else {
        console.log("UserId não encontrado na URL.");
    }
});