
let listaDeNumerosSorteados = [];
let numeroLimiteTentativas = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número Secreto');
    exibirTextoNaTela('p', 'Escolha um núemro de 1 a 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');

        let palavratentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemtentativas = `você descobriu o núemro secreto com ${tentativas} ${palavratentativa}`;

        exibirTextoNaTela('p', mensagemtentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', `O numero secreto é menor que ${chute}`);
        } 
        else{
            exibirTextoNaTela('p', `O numero secreto é maior que ${chute}`);
        }

        tentativas++;
        limparCampo();
    }

}

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimiteTentativas + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimiteTentativas){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumero();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

