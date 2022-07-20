const { questionEMail } = require("readline-sync")

class Forca {

  // variáveis utilizadas no código: uma string palavra (palvra a ser adivinhada),
  // um array adivinhar (um array de '_', mostrar tamanho da palavra ao jogador),
  // um array letrasChutadas (array com letras ja escolhidas pelo jogador),
  // um inteiro vidas (para contar as vidas do jogador) e uma string estado (o qual 
  // determina o estado do jogo)
  palavra;
  adivinhar;
  letrasChutadas;
  vidas;
  estado;

  //construtor para inicializar as variáveis
  constructor(palavra) {
    this.palavra = palavra;
    this.adivinhar = Array.from({length: this.palavra.length}, () => '_');
    this.letrasChutadas = [];
    this.vidas = 6;
    this.estado = "aguardando chute";
  }

  // método para retornar o array de letras chutadas
  getLetrasChutadas() {
    return this.letrasChutadas;
  }

  // método para retornar o array da palavra sendo adivinhada
  getAdivinhar() {
    return this.adivinhar;
  }

  // método para alterar o array da palavra sendo adivinhada, ao acertar uma letra
  setAdivinhar(array) {
    this.adivinhar = array;
  } 

  // método para retornar a palavra que será adivinhada
  getPalavra() {
    return this.palavra;
  }

  // método para retornar a quanatidade de vidas
  getVidas() {
    return this.vidas;
  }

  // método para decrementar o número de vidas ao errar uma letra
  setVidas() {
    return this.vidas -= 1;
  }

  // método para retornar o estado do jogo
  getEstado() {
    return this.estado;
  }

  // método para alterar o valor da variável estado, quando o jogador vence
  setEstadoGanhou() {
    return this.estado = "ganhou";
  }

  // método para alterar o valor da variável estado, quando o jogador perde
  setEstadoPerdeu() {
    return this.estado = "perdeu";
  }

  // método que contém a lógica do jogo da Forca com base nas regras do desafio.
  // Primeiro temos as variáveis que iremos utilizar, depois fazemos uma verificação
  // no primeiro if caso a entrada só tenha uma letra, se já não foi escolhida e se 
  // não for um número digitado por engano. A seguir, caso seja uma letra a qual não
  // foi chutada, nós adicionamos no array de letras chutadas e então verificamos se
  // contém na palavra. Caso tenha a letra na palavra ela é substituída no array adivinhar
  // a partir da função map, onde salvamos na variável acertos e depois alteramos o array
  // adivinhar com o método correto. Também verificamos se a palavraa ja foi acertada para
  // alterar o estado do jogo para ganhou. Por fim, caso não tenha a letra na palavra e ela 
  //não tenha sido escolhida, diminuímos uma vida do jogador, e ao diminuir for igual a zero,
  // é alterado o estado do jogo para perdeu.
  chutar(letra) {
    var chutes = this.getLetrasChutadas();
    var adivinha = this.getAdivinhar();
    var palavraSecreta = this.getPalavra().split("");
    var acertos = [];

    if(letra.length == 1 && !chutes.includes(letra) && isNaN(letra)) {
      chutes.push(letra);

      if(palavraSecreta.includes(letra)) {

        acertos = adivinha.map((e, i) => {
          if(palavraSecreta[i] === letra){
              return letra;
          } else {
              return e
          }
      });

        this.setAdivinhar(acertos);
        if(!this.getAdivinhar().includes('_')) {
        this.setEstadoGanhou();
        }

      } else {
          this.setVidas();
          if(this.vidas == 0){
            this.setEstadoPerdeu();
          }
      }

    }
    
  }

  // método para retornar o estado do jogo
  buscarEstado() {
        return this.getEstado();
      
       
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  //método para mostrar ao jogador os dados do jogo.
  buscarDadosDoJogo() {
    
      return {
        letrasChutadas: this.getLetrasChutadas(), // Deve conter todas as letras chutadas
        vidas: this.getVidas(), // Quantidade de vidas restantes
        palavra: this.getAdivinhar() // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
    }
}

}

module.exports = Forca;
