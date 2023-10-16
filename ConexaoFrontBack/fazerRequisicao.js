const axios = require('axios');
const https = require('https');

// Criar uma instância do agente HTTPS com verificação desativada
const agent = new https.Agent({
    rejectUnauthorized: false,
});

// Defina a configuração do Axios para usar o agente criado
axios.defaults.httpsAgent = agent;

// Agora você pode fazer a sua requisição
axios.get('https://localhost:7058/api/v1/Product/GetAll')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Erro na requisição:', error.message);
    });
