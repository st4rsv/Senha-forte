// Captura dos elementos HTML
const campoSenha = document.getElementById('campo-senha');
const btnMenos = document.getElementById('btn-menos');
const btnMais = document.getElementById('btn-mais');
const textoTamanho = document.querySelector('.parametro-senha__texto');
const chkMaiusculas = document.getElementById('chk-maiusculas');
const chkSimbolos = document.getElementById('chk-simbolos');
const barraForca = document.querySelector('.barra-forca');

// Valor padrão inicial
let tamanhoSenha = 12;

// Bancos de caracteres
const minusculas = "abcdefghijklmnopqrstuvwxyz";
const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()_+-=[]{}|;:',./<>?";

function gerarSenha() {
    let caracteresValidos = minusculas + numeros;

    if (chkMaiusculas.checked) {
        caracteresValidos += maiusculas;
    }
    if (chkSimbolos.checked) {
        caracteresValidos += simbolos;
    }

    let senhaFinal = "";
    for (let i = 0; i < tamanhoSenha; i++) {
        const indexAleatorio = Math.floor(Math.random() * caracteresValidos.length);
        senhaFinal += caracteresValidos[indexAleatorio];
    }

    campoSenha.value = senhaFinal;
    atualizarForca();
}

function atualizarForca() {
    let pontos = 0;

    // Critérios para calcular a segurança da senha
    if (tamanhoSenha >= 8) pontos++;
    if (tamanhoSenha >= 14) pontos++;
    if (chkMaiusculas.checked) pontos++;
    if (chkSimbolos.checked) pontos++;

    let porcentagem = 0;
    let corBarra = "#ef4444"; // Fraca (Vermelha)

    if (pontos <= 1) {
        porcentagem = 25;
        corBarra = "#ef4444";
    } else if (pontos === 2 || pontos === 3) {
        porcentagem = 60;
        corBarra = "#f59e0b"; // Média (Amarela)
    } else if (pontos === 4) {
        porcentagem = 100;
        corBarra = "#10b981"; // Forte (Verde)
    }

    // Altera as propriedades CSS dinamicamente
    barraForca.style.setProperty('--largura-forca', `${porcentagem}%`);
    barraForca.style.setProperty('--cor-forca', corBarra);
}

// Ouvintes de eventos nos botões de menos e mais
btnMenos.addEventListener('click', () => {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        textoTamanho.textContent = tamanhoSenha;
        gerarSenha();
    }
});

btnMais.addEventListener('click', () => {
    if (tamanhoSenha < 30) {
        tamanhoSenha++;
        textoTamanho.textContent = tamanhoSenha;
        gerarSenha();
    }
});

// Atualiza a senha ao ligar/desligar opções
chkMaiusculas.addEventListener('change', gerarSenha);
chkSimbolos.addEventListener('change', gerarSenha);

// Roda a primeira vez ao carregar a página
document.addEventListener('DOMContentLoaded', gerarSenha);
