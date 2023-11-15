document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");

    // Verifica se há um userId válido
    //carrega listagem de produtos
    if (userId) {
        const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/Store/GetAllStoresByUserId/${userId}`;

                // Faz a solicitação para obter os detalhes da loja
                axios.get(apiUrl)
                    .then((response) => {
                        if (response.status === 200 && response.data.statusCode === 200) {
                            // PEGAR AQUI O storeId para criar uma nova vitrine
                            const storeId = response.data.data[0].id;
                            const storeName = response.data.data[0].name;
                            const storeImageURL = response.data.data[0].urlStoreLogo;
                            const lojaTronicElements = document.querySelector('.col-md-4.d-flex.flex-column.justify-content-center');
                            console.log(lojaTronicElements);

                            const imagemElement = document.createElement("img");
                            imagemElement.src = storeImageURL; // Defina o link da imagem
                            imagemElement.className = "img-fluid";
                            imagemElement.alt = "Logo Loja";
                            lojaTronicElements.appendChild(imagemElement);

                            const h3Element = document.createElement("h3");
                            h3Element.className = "d-flex justify-content-center mb-0 mt-3";
                            h3Element.textContent = storeName;
                            lojaTronicElements.appendChild(h3Element);

                            const searchUrl = `https://showcase-api.azurewebsites.net/api/v1/StoreProduct/GetAllProductsByStoreId/${storeId}`;

                            // Fazer uma solicitação ao banco de dados para obter a lista de produtos
                            axios.get(searchUrl)
                            .then(function (response) {
                                const produtos = response.data.data; //Lista de Produtos
                                const produtosLista = document.getElementById("produtosLista");

                                //Iterar sobre os produtos e criar elementos <li> para cada um
                                produtos.forEach(function (produto) {
                                    const li = document.createElement("li");
                                    li.innerHTML = `<p class="dropdown-item" id="${produto.id}">${produto.name}</p>`;
                                    produtosLista.appendChild(li);

                                    // Adicione um evento de clique para cada produto
                                    li.addEventListener("click", function () {
                                        vincularProduto(produto);

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

    //cria botões de modelos da vitrine
    if (userId) {
        const apiUrl2 = `https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle/GetAllTemplates`;

        // Faz a solicitação para obter os modelos das vitrines
        axios.get(apiUrl2)
            .then((response) => {
                if (response.status === 200 && response.data.statusCode === 200) {
                    const vitrines = response.data.data; //Lista de vitrines
                    const modeloVitrine = document.getElementById("modelosVitrines");
                    var contagem = 1;
                    //Iterar sobre os vitrine e criar elementos <li> para cada um
                    vitrines.forEach(function (vitrine) {
                        if (contagem === 1) {
                            const link = document.createElement("a");
                            link.id = vitrine.id;
                            link.className = "me-3"
                            link.innerHTML = `<i class="bi bi-window-stack" style="color: #F0A732; font-size: xx-large;"></i>`;
                            modeloVitrine.appendChild(link);
                            contagem++;
                            // Adicione um ouvinte de evento de clique a esta tag <a>
                            link.addEventListener("click", function (event) {
                                event.preventDefault(); // Impede que o link redirecione imediatamente

                                const showcaseId = localStorage.getItem("showcaseId");
                                const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle/GetStyleByShowcaseId/${showcaseId}`;
                                    axios.request(apiUrl)
                                        .then(async (response) => {
                                            if (response.status === 200 && response.data.statusCode === 200) {
                                                const id = response.data.data.id;
                                                const templateId = vitrines[0].id;
                                                const backgroundColorCode = response.data.data.backgroundColorCode;
                                                const showProductValue = response.data.data.showProductValue;
                                                const showStoreLogo = response.data.data.showStoreLogo;
                                                const redirectLink = response.data.data.redirectLink;

                                                const postData = {
                                                    showcaseStyleId: id,
                                                    templateId: templateId,
                                                    backgroundColor: backgroundColorCode,
                                                    showProductValue: Boolean(showProductValue),
                                                    showStoreLogo: Boolean(showStoreLogo),
                                                    redirectLink: redirectLink,
                                                };
                                            
                                                let data = JSON.stringify({
                                                    "showcaseStyleId": postData.showcaseStyleId,
                                                    "templateId": postData.templateId,
                                                    "backgroundColorCode": postData.backgroundColor,
                                                    "showProductValue": postData.showProductValue,
                                                    "showStoreLogo": postData.showStoreLogo,
                                                    "redirectLink": postData.redirectLink
                                                });
                                            
                                                let config = {
                                                    method: 'put',
                                                    maxBodyLength: Infinity,
                                                    url: 'https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': ''
                                                    },
                                                    data: data
                                                };
                                            
                                                axios.request(config)
                                                    .then((response) => {
                                                        const novaURL = `./CriacaoDaVitrine.html`;
                                                        window.location.href = novaURL;
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });

                                            }
                                            else{
                                                console.log(response.data);
                                            }
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                            });
                        } else if (contagem === 2) {
                            const link = document.createElement("a");
                            link.id = vitrine.id;
                            link.className = "me-3"
                            link.innerHTML = `<i class="bi bi-window-stack" style="color: #F0A732; font-size: xx-large;"></i>`;
                            modeloVitrine.appendChild(link);
                            contagem++;
                            // Adicione um ouvinte de evento de clique a esta tag <a>
                            link.addEventListener("click", function (event) {
                                event.preventDefault(); // Impede que o link redirecione imediatamente

                                const showcaseId = localStorage.getItem("showcaseId");
                                const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle/GetStyleByShowcaseId/${showcaseId}`;
                                    axios.request(apiUrl)
                                        .then(async (response) => {
                                            if (response.status === 200 && response.data.statusCode === 200) {
                                                const id = response.data.data.id;
                                                const templateId = vitrines[1].id;
                                                const backgroundColorCode = response.data.data.backgroundColorCode;
                                                const showProductValue = response.data.data.showProductValue;
                                                const showStoreLogo = response.data.data.showStoreLogo;
                                                const redirectLink = response.data.data.redirectLink;

                                                const postData = {
                                                    showcaseStyleId: id,
                                                    templateId: templateId,
                                                    backgroundColor: backgroundColorCode,
                                                    showProductValue: Boolean(showProductValue),
                                                    showStoreLogo: Boolean(showStoreLogo),
                                                    redirectLink: redirectLink,
                                                };
                                            
                                                let data = JSON.stringify({
                                                    "showcaseStyleId": postData.showcaseStyleId,
                                                    "templateId": postData.templateId,
                                                    "backgroundColorCode": postData.backgroundColor,
                                                    "showProductValue": postData.showProductValue,
                                                    "showStoreLogo": postData.showStoreLogo,
                                                    "redirectLink": postData.redirectLink
                                                });
                                            
                                                let config = {
                                                    method: 'put',
                                                    maxBodyLength: Infinity,
                                                    url: 'https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': ''
                                                    },
                                                    data: data
                                                };
                                            
                                                axios.request(config)
                                                    .then((response) => {
                                                        const novaURL = `./CriacaoDaVitrine2.html`;
                                                        window.location.href = novaURL;
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });

                                            }
                                            else{
                                                console.log(response.data);
                                            }
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                            });
                        }
                    });
                }
                else {
                    console.log("Erro para pegar storeId:", response.data);
                }
            });
    } else {
        console.log("UserId não encontrado na URL.");
    }

    //Carregar produtos da vitrine
    if (userId) {
        const showcaseId = localStorage.getItem("showcaseId");
        const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/ShowcaseProduct/GetProductsByShowcaseId/${showcaseId}`;
        axios.request(apiUrl)
            .then(async (response) => {
                if (response.status === 200 && response.data.statusCode === 200) {
                    const array = response.data.data;
                    var arrayIds = [];
                    for (const item of array) {
                        var produtoId = item.storeProductId;
                        arrayIds.push(produtoId);
                    }
                    var arrayProdutos = [];
                    for (const id of arrayIds) {
                        const apiUrl2 = `https://showcase-api.azurewebsites.net/api/v1/StoreProduct/GetProductById/${id}`;
                        try {
                            const response = await axios.request(apiUrl2);
                            const product = response.data.data;

                            // Crie uma cópia do elemento do produto
                            const productCard = createProductCard(product);

                            // Encontre a div "m-2" na página CriacaoDaVitrine.html
                            const Div = document.querySelector('.row.mx-auto');

                            // Insira o produto na div "m-2"
                            Div.appendChild(productCard);

                            // Guarde os produtos na ordem em que são processados
                            arrayProdutos.push(product);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } else {
                    console.log(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    else {
        console.log("UserId não encontrado na URL.");
    }

    //Carrega link da vitrine
    if(userId){
        const showcaseId = localStorage.getItem("showcaseId");
        const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/Showcase/GetById/${showcaseId}`;
        axios.request(apiUrl)
            .then(async (response) => {
                if (response.status === 200 && response.data.statusCode === 200) {
                    const uniqueLink = response.data.data.uniqueLink;
                    const lojaTronicElements = document.querySelector('.d-flex.justify-content-center.mb-2');
                    lojaTronicElements.textContent = `Link da sua vitrine para divulgação: ${uniqueLink}`
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else{
        console.log("UserId não encontrado")
    }
});

//Adicionar produto na vitrine
function vincularProduto(produto) {
    const showcaseId = localStorage.getItem("showcaseId");
    const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/ShowcaseProduct/GetProductsByShowcaseId/${showcaseId}`;
    axios.request(apiUrl)
        .then(async (response) => {
            if (response.status === 200 && response.data.statusCode === 200) {
                const array = [];
                for(const ids of response.data.data){
                    array.push(ids.storeProductId);
                }
                array.push(produto.id);

                // Armazena o array no localStorage após serializá-lo para JSON
                localStorage.setItem("array", JSON.stringify(array));

                const Data = {
                    showcaseId: showcaseId,
                    productIds: array // Usa o array atualizado
                };

                let data = JSON.stringify(Data);

                let config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: 'https://showcase-api.azurewebsites.net/api/v1/ShowcaseProduct',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': ''
                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        console.log("Produto adicionado!"); // Correção no nome do método
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Função para criar um elemento de produto
function createProductCard(produto) {
    const showcaseId = localStorage.getItem("showcaseId");

    const searchUrl = `https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle/GetStyleByShowcaseId/${showcaseId}`;
    axios.get(searchUrl)
    .then(function (response) {
        if (response.status === 200 && response.data.statusCode === 200) {
            if(response.data.data.showProductValue == true){
                localStorage.setItem("showProductValue", true);
            }
            else{
                localStorage.setItem("showProductValue", false);
            }
            if(response.data.data.showStoreLogo === true){
                localStorage.setItem("showStoreLogo", true);
            }
            else{
                localStorage.setItem("showStoreLogo", false);
            }
            const backgroundColor = response.data.data.backgroundColorCode;
            if(backgroundColor === null){
                const backgroundColor = "#1af5b6";
                localStorage.setItem("backgroundColor", backgroundColor);
            }
            else{
                localStorage.setItem("backgroundColor", backgroundColor);
            }
        }
        else{
            const backgroundColor = "#1af5b6";
            localStorage.setItem("backgroundColor", backgroundColor);
        }
        const redirectLink = response.data.data.redirectLink;
        localStorage.setItem("redirectLink", redirectLink);
    });
    const customProductCard = document.createElement("div");
    customProductCard.className = "col-md-4 mb-2";
    customProductCard.id=produto.id;

    //MUDAR A COR AQUI
    const backgroundColor = localStorage.getItem("backgroundColor");
    const showProductValue = localStorage.getItem("showProductValue");
    const showStoreLogo = localStorage.getItem("showStoreLogo");
    const redirectLink = localStorage.getItem("redirectLink");

    if(showProductValue === "true" && showStoreLogo === "true"){
        // Defina o conteúdo do cartão do produto com base nos dados do produto
        customProductCard.innerHTML = `
            <div class="text-decoration-none border mx-1 w-100 p-3" style="color: white; background: url('../Imagens/backgroundTexture.png') repeat, linear-gradient(to top, ${backgroundColor}, black);background-blend-mode: overlay; border-radius: 40px;">
                <div class="d-flex justify-content-center">
                    <img src="${produto.urlProductPicture}" width="150px" class="my-2">
                </div>
                <div class="d-flex flex-column">
                    <h1>${produto.name}</h1>
                    <h5>Valor: ${produto.value} av<br>ou ${produto.value} em até 12x</h5>
                    <h6>Descrição: ${produto.sku}</h6>
                </div>
                <div class="mt-3 d-flex justify-content-center" style="color: white; border: none; background: none;">
                    <a href="${redirectLink}" class="btn btn-primary">Quero Este!</a>
                    <button class="btn btn-danger ms-5 btn-excluir" data-produto-id="${produto.id}">Excluir</button>
                </div>
            </div>
        `;

        return customProductCard;
    }
    else if(showProductValue === "false" && showStoreLogo === "true"){
        customProductCard.innerHTML = `
            <div class="text-decoration-none border mx-1 w-100 p-3" style="color: white; background: url('../Imagens/backgroundTexture.png') repeat, linear-gradient(to top, ${backgroundColor}, black);background-blend-mode: overlay; border-radius: 40px;">
                <div class="d-flex justify-content-center">
                    <img src="${produto.urlProductPicture}" width="150px" class="my-2">
                </div>
                <div class="d-flex flex-column">
                    <h1>${produto.name}</h1>
                    <h6>Descrição: ${produto.sku}</h6>
                </div>
                <div class="mt-3 d-flex justify-content-center" style="color: white; border: none; background: none;">
                    <a href="${redirectLink}" class="btn btn-primary">Quero Este!</a>
                    <button class="btn btn-danger ms-5 btn-excluir" data-produto-id="${produto.id}">Excluir</button>
                </div>
            </div>
        `;

        return customProductCard;
    }
    else if(showProductValue === "true" && showStoreLogo === "false"){
        customProductCard.innerHTML = `
            <div class="text-decoration-none border mx-1 w-100 p-3" style="color: white; background: url('../Imagens/backgroundTexture.png') repeat, linear-gradient(to top, ${backgroundColor}, black);background-blend-mode: overlay; border-radius: 40px;">
                <div class="d-flex flex-column">
                    <h1>${produto.name}</h1>
                    <h5>Valor: ${produto.value} av<br>ou ${produto.value} em até 12x</h5>
                    <h6>Descrição: ${produto.sku}</h6>
                </div>
                <div class="mt-3 d-flex justify-content-center" style="color: white; border: none; background: none;">
                    <a href="${redirectLink}" class="btn btn-primary">Quero Este!</a>
                    <button class="btn btn-danger ms-5 btn-excluir" data-produto-id="${produto.id}">Excluir</button>
                </div>
            </div>
        `;

        return customProductCard;
    }
    else if(showProductValue === "false" && showStoreLogo === "false"){
        customProductCard.innerHTML = `
            <div class="text-decoration-none border mx-1 w-100 p-3" style="color: white; background: url('../Imagens/backgroundTexture.png') repeat, linear-gradient(to top, ${backgroundColor}, black);background-blend-mode: overlay; border-radius: 40px;">
                <div class="d-flex flex-column">
                    <h1>${produto.name}</h1>
                    <h6>Descrição: ${produto.sku}</h6>
                </div>
                <div class="mt-3 d-flex justify-content-center" style="color: white; border: none; background: none;">
                    <a href="${redirectLink}" class="btn btn-primary">Quero Este!</a>
                    <button class="btn btn-danger ms-5 btn-excluir" data-produto-id="${produto.id}">Excluir</button>
                </div>
            </div>
        `;

        return customProductCard;
    }
}

// Adicione um ouvinte de evento para os botões de exclusão
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-excluir")) {
        const produtoId = event.target.getAttribute("data-produto-id");
        excluirProduto(produtoId);
    }
});

function excluirProduto(produtoId) {
    const showcaseId = localStorage.getItem("showcaseId");
    const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/ShowcaseProduct/GetProductsByShowcaseId/${showcaseId}`;
    axios.request(apiUrl)
        .then(async (response) => {
            if (response.status === 200 && response.data.statusCode === 200) {
                const array = [];
                for(const ids of response.data.data){
                    array.push(ids.storeProductId);
                }
                var contador = 0;

                for (let i = 0; i < array.length; i++) {
                    if (array[i] === produtoId) {
                        array.splice(i, 1); // Remove o elemento encontrado
                        break;
                    } else {
                        console.log("Nenhum produto encontrado!");
                    }
                }

                const Data = {
                    showcaseId: showcaseId,
                    productIds: array// Usa o array atualizado
                };

                let data = JSON.stringify(Data);

                let config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: 'https://showcase-api.azurewebsites.net/api/v1/ShowcaseProduct',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': ''
                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        const produtoElement = document.getElementById(produtoId);
                        if (produtoElement) {
                            produtoElement.remove();
                        } else {
                            console.log("Erro ao retirar produto da pagina");
                        } // Correção no nome do método
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
}

// Selecione o elemento input pelo ID
const colorPicker = document.getElementById("colorPicker");

const sendStyleButton = document.querySelector(".send-styles"); // Selecione o botão

sendStyleButton.addEventListener("click", function () {
    const checkbox1 = document.getElementById("checkbox1");
    const checkbox2 = document.getElementById("checkbox2");

    const showcaseId = localStorage.getItem("showcaseId");
    const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle/GetStyleByShowcaseId/${showcaseId}`;
        axios.request(apiUrl)
            .then(async (response) => {
                const id = response.data.data.id;
                const templateId = response.data.data.templateId;
                const checkbox1 = document.getElementById("checkbox1");
                const checkbox2 = document.getElementById("checkbox2");
                const backgroundColorCode = colorPicker.value;
                const showProductValue = checkbox1.checked;
                const showStoreLogo = checkbox2.checked;
                let redirectLink = response.data.data.redirectLink;

                if(response.data.data.redirectLink === null){
                    redirectLink = "";
                }

                const postData = {
                    showcaseStyleId: id,
                    templateId: templateId,
                    backgroundColor: backgroundColorCode,
                    showProductValue: Boolean(showProductValue),
                    showStoreLogo: Boolean(showStoreLogo),
                    redirectLink: redirectLink,
                };
            
                let data = JSON.stringify({
                    "showcaseStyleId": postData.showcaseStyleId,
                    "templateId": postData.templateId,
                    "backgroundColorCode": postData.backgroundColor,
                    "showProductValue": postData.showProductValue,
                    "showStoreLogo": postData.showStoreLogo,
                    "redirectLink": postData.redirectLink
                });
            
                let config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: 'https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': ''
                    },
                    data: data
                };
            
                axios.request(config)
                    .then((response) => {
                        console.log("ESTILO ALTERADO COM SUCESSO!");
                        location.reload();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
});


//Altera Link
const alterarLink = document.querySelector(".send-link");

alterarLink.addEventListener("click", function(){
    const showcaseId = localStorage.getItem("showcaseId");
    const apiUrl = `https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle/GetStyleByShowcaseId/${showcaseId}`;
        axios.request(apiUrl)
            .then(async (response) => {
                if (response.status === 200 && response.data.statusCode === 200) {

                    const id = response.data.data.id;
                    const templateId = response.data.data.templateId;
                    const backgroundColorCode = response.data.data.backgroundColorCode;
                    const showProductValue = response.data.data.showProductValue;
                    const showStoreLogo = response.data.data.showStoreLogo;
                    const novoLink = document.getElementById("linkBotao");
                    let redirectLink = novoLink.value;

                    if(response.data.data.redirectLink === null){
                        redirectLink = "";
                    }

                    const postData = {
                        showcaseStyleId: id,
                        templateId: templateId,
                        backgroundColor: backgroundColorCode,
                        showProductValue: Boolean(showProductValue),
                        showStoreLogo: Boolean(showStoreLogo),
                        redirectLink: redirectLink,
                    };
                
                    let data = JSON.stringify({
                        "showcaseStyleId": postData.showcaseStyleId,
                        "templateId": postData.templateId,
                        "backgroundColorCode": postData.backgroundColor,
                        "showProductValue": postData.showProductValue,
                        "showStoreLogo": postData.showStoreLogo,
                        "redirectLink": postData.redirectLink
                    });

                
                    let config = {
                        method: 'put',
                        maxBodyLength: Infinity,
                        url: 'https://showcase-api.azurewebsites.net/api/v1/ShowcaseStyle',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': ''
                        },
                        data: data
                    };
                
                    axios.request(config)
                        .then((response) => {
                            console.log("LINK ALTERADO COM SUCESSO!");
                            location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                }
                else{
                    console.log(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
})