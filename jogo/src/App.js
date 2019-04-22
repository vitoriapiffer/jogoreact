import React, { Component } from 'react';

import './App.css';
// Cria os botões quadrados dentro do tabuleiro
function Quadrado(props) {
  return (
    <button className="quadrado" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
// Cria o tabuleiro, é praticamente a estrutura inteira do tabuleiro mesmo. Sendo que cada renderQuadrado se 
//refere  a classe Quadrado acima.
class Tabuleiro extends Component {
  renderQuadrado(i) {
    return (
      <Quadrado
        value={this.props.quadrados[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="tabuleiro-linha">
          {this.renderQuadrado(0)}
          {this.renderQuadrado(1)}
          {this.renderQuadrado(2)}
        </div>
        <div className="tabuleiro-linha">
          {this.renderQuadrado(3)}
          {this.renderQuadrado(4)}
          {this.renderQuadrado(5)}
        </div>
        <div className="tabuleiro-linha">
          {this.renderQuadrado(6)}
          {this.renderQuadrado(7)}
          {this.renderQuadrado(8)}
        </div>
      </div>
    );
  }
}


export class Jogo extends Component {
  //Cria a estrutura inicial do jogo. Seta o State para: x é o proximo jogador e os quadrados começam vazios

  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null) ,
      xDepoist: true
    };
  }

  // Função que altera o que acontece quando se clica no quadrado
  handleClick(i) {
    // variavel que ira carregar o valor dos quadrados do jogo
    const quadrados = this.state.quadrados.slice();
    // verifica se o jogo acabou ou se o quadrado ja esta preenchido
    if (verificaVencer(quadrados) || quadrados[i]) {
      return;
    }
    //altera o status do quadrado para x ou o
    quadrados[i] = this.state.xDepoist ? "X" : "O";
    
    //passa os valores da variavel quadrados para os quadrados do jogo, e seta o proximo jogador
    this.setState({
      quadrados: quadrados,
      xDepoist: !this.state.xDepoist
    });

   }
   //função que reinicia o jogo, zerando os quadrados e setando o x como proximo jogador
   ReiniciaJogo (quadrados) {
    const quadrado=  Array(9).fill(null)
    this.setState({
      quadrados: quadrado,
      xDepoist: true
    });
    
  }

  render() {
    //novamente, passando os valores dos quadrados do jogo para variaveis locais
    const current = this.state.quadrados;
    const quadrados = this.state.quadrados.slice();
    
    //Verifica se o jogo acabou e alterao status (uma div class) para mostrar o vencedor ou o proximo jogador
    let status;
   if ( verificaVencer(current)) {
     status = "Vencedor: " + (this.state.xDepoist ? "O" : "X");
     alert("O jogador "  + (this.state.xDepoist ? "O" : "X") + " ganhou!");
   } else {
     status = "Vez do Jogador: " + (this.state.xDepoist ? "X" : "O");
   }
  //Cria o botao que causa o restart do jogo
   const Reinicio = 
   (
    <div className="botao" key={"btReinicia"}>
      <button onClick={() => this.ReiniciaJogo(quadrados)}>Jogar Novamente!</button>
    </div>
  )
    //instancia o tabuleiro e cria as variaveis de status e reinicio de jogo
    return (
      <div className="jogo">
        <div className="jogo-tabuleiro">
          <Tabuleiro
            quadrados={current}
            onClick={i => this.handleClick(i)}
          />
          
        </div>
            <div>{status}</div>
            <div>{Reinicio}</div>   
      </div>
      
        
    );
  }
}

// ========================================
function verificaVencer(quadrados){
    
   const c11 = quadrados[0];
   const c12 = quadrados[1];
   const c13 = quadrados[2];
   const c21 = quadrados[3];
   const c22 = quadrados[4];
   const c23 = quadrados[5];
   const c31 = quadrados[6];
   const c32 = quadrados[7];
   const c33 = quadrados[8];


   if (((c11 !== null) && (c12 !== null) && (c13 !== null) && (c11 === c12) && (c12 === c13)) || ((c11 !== null) && (c22 !== null) && (c33 !== null) && (c11 === c22) && (c22 === c33)) || ((c11 !== null) && (c21 !== null) && (c31 !== null) && (c11 === c21) && (c21 === c31)) || ((c21 !== null) && (c22 !== null) && (c23 !== null) && (c21 === c22) && (c22 === c23)) || ((c31 !== null) && (c32 !== null) && (c33 !== null) && (c31 === c32) && (c32 === c33)) || ((c12 !== null) && (c22 !== null) && (c32 !== null) && (c12 === c22) && (c22 === c32)) || ((c13 !== null) && (c23 !== null) && (c33 !== null) && (c13 === c23) && (c23 === c33)) || ((c31 !== null) && (c22 !== null) && (c13 !== null) && (c31 === c22) && (c22 === c13))){

      
    return true
   
   }
   return null;
}
