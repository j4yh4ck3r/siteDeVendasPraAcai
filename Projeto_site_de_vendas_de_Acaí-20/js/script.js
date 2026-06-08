function adicionarAoCarrinho(item) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarCarrinho();
}

function mostrarCarrinho() {
    const ResutadoFinalDoPreco = document.getElementById("ResutadoFinalDoPreco");
    let listaDePreco = [];
    let totalDePreco = null;
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let lista = document.getElementById("listaCarrinho");
    lista.innerHTML = "";

    carrinho.forEach((item, index) => {
        listaDePreco.push(item.preco);
        totalDePreco = listaDePreco.reduce((a, b) => a + b, 0);
        let li = document.createElement("li");
        li.textContent = `${item.nome} - R$ ${item.preco}`;
        let btn = document.createElement("button");
        btn.textContent = "Remover";
        btn.onclick = () => deletarItemCarrinho(index);
        li.appendChild(btn);
        lista.appendChild(li);
        ResutadoFinalDoPreco.textContent = `Preço total: R$ ${totalDePreco}`;
    });

    if (carrinho.length === 0){
        ResutadoFinalDoPreco.textContent = "";
    }

}

function deletarItemCarrinho(indice) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(indice, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarCarrinho();
}

function enviarPedidoWhatsApp() {
    let listaDePreco = [];
    let totalDePreco = null;
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let formaPagamento = document.getElementById("pagamento").value;
    let endereco = document.getElementById("endereco").value;

    if (!endereco) {
        const BordeEndereco = document.getElementById("endereco");
        const texto = document.getElementById("texto");
        console.log("Preecha o campo!");
        BordeEndereco.style.border = "4px solid red";
        texto.textContent = "Preecha este campo!";
        setTimeout(() => {
            BordeEndereco.style.border = "";
            texto.textContent = "";
        }, [2000]);
    } else {
        let mensagem = "Meu pedido:\n";
        carrinho.forEach(item => {
            listaDePreco.push(item.preco);
            totalDePreco = listaDePreco.reduce((a, b) => a + b, 0);
            mensagem += `- ${item.nome} | R$ ${item.preco}\n`;
        });

        mensagem += `\nResutado final de lucro: R$ ${totalDePreco}`;

        mensagem += `\nForma de pagamento: ${formaPagamento}`;

        mensagem += `\nEndereço da entrega: ${endereco}`;

        let numero = "5532991150384"; // exemplo
        let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }
}

// Mostrar carrinho ao carregar a página
mostrarCarrinho()