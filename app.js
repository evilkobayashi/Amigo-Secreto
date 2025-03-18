// app.js

// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar amigo à lista
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();
    
    // Verifica se o campo não está vazio e se o nome ainda não foi adicionado
    if (nome !== '' && !amigos.includes(nome)) {
        amigos.push(nome);
        
        // Adiciona o nome à lista visual
        const lista = document.getElementById('listaAmigos');
        const item = document.createElement('li');
        item.textContent = nome;
        lista.appendChild(item);
        
        // Limpa o campo de input
        input.value = '';
    } else if (nome === '') {
        alert('Por favor, digite um nome!');
    } else {
        alert('Este nome já foi adicionado!');
    }
}

// Função para embaralhar array (algoritmo Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para realizar o sorteio
function sortearAmigo() {
    // Verifica se há pelo menos 2 amigos
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para realizar o sorteio!');
        return;
    }

    // Cria uma cópia do array e embaralha
    let amigosSorteados = [...amigos];
    amigosSorteados = shuffle(amigosSorteados);
    
    // Garante que ninguém tire a si mesmo
    let valido = false;
    while (!valido) {
        valido = true;
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === amigosSorteados[i]) {
                valido = false;
                amigosSorteados = shuffle([...amigos]);
                break;
            }
        }
    }

    // Limpa resultados anteriores
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    // Exibe os resultados
    for (let i = 0; i < amigos.length; i++) {
        const item = document.createElement('li');
        item.textContent = `${amigos[i]} tirou ${amigosSorteados[i]}`;
        resultado.appendChild(item);
    }
}

// Permite adicionar amigo pressionando Enter
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarAmigo();
    }
});