// Banco de dados com elementos da Agricultura Familiar (Agrinho)
let elementos = [
  "🍎", "🌽", "🐄", "🚜", 
  "🌻", "🌾", "🍅", "🐝"
];

let cartas = [];
let primeiraEscolha = null;
let segundaEscolha = null;
let bloqueado = false;
let paresEncontrados = 0;
let mensagemInfo = "Clique nas cartas para jogar!";

function setup() {
  createCanvas(500, 550); // Canvas com espaço extra embaixo para o texto
  
  // Duplica os elementos para criar os pares e embaralha
  let listaCartas = [...elementos, ...elementos];
  listaCartas = shuffle(listaCartas); 
  
  // Cria a estrutura das cartas (4x4)
  let index = 0;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      cartas.push({
        emoji: listaCartas[index],
        x: 25 + c * 115,
        y: 80 + r * 105,
        w: 100,
        h: 90,
        revelada: false,
        escondida: false
      });
      index++;
    }
  }
}

function draw() {
  background("#e8f5e9"); // Fundo verde claro rural

  // Título do Jogo
  fill("#2e7d32");
  noStroke();
  rect(0, 0, width, 60);
  
  fill(255);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("Agrinho: Agricultura Familiar", width / 2, 30);

  // Desenha as cartas no tabuleiro
  for (let i = 0; i < cartas.length; i++) {
    let carta = cartas[i];
    function setup() {
2
  createCanvas(400, 400);
3
}
4

5
function draw() {
6
  background(220);
7
}
    if (carta.escondida) {
      // Se já acertou o par, mostra o fundo verde escuro sem a borda ativa
      fill("#c8e6c9");
      stroke("#a5d6a7");
      rect(carta.x, carta.y, carta.w, carta.h, 10);
      textSize(36);
      textAlign(CENTER, CENTER);
      text(carta.emoji, carta.x + carta.w / 2, carta.y + carta.h / 2);
      continue;
    }

    // Cor da carta se estiver virada ou não
    if (carta.revelada) {
      fill(255);function setup() {
2
  createCanvas(400, 400);
3
}
4

5
function draw() {
6
  background(220);
7
}
      stroke("#2e7d32");
      strokeWeight(2);
      rect(carta.x, carta.y, carta.w, carta.h, 10);
      
      // Desenha o emoji
      textSize(36);
      textAlign(CENTER, CENTER);
      text(carta.emoji, carta.x + carta.w / 2, carta.y + carta.h / 2);
    } else {
      fill("#a5d6a7"); // Cor da carta fechada
      stroke("#1b5e20");
      strokeWeight(2);
      rect(carta.x, carta.y, carta.w, carta.h, 10);
      
      // Desenha o ponto de interrogação
      fill("#1b5e20");
      textSize(28);
      textAlign(CENTER, CENTER);
      text("❓",   carta.x + carta.w / 2, carta.y + carta.h / 2);
    }
  }

  // Texto informativo e educativo na parte inferior
  fill("#1b5e20");
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text(mensagemInfo, width / 2, 515);
}

function mousePressed() {
  if (bloqueado) return;

  // Verifica qual carta recebeu o clique do mouse
  for (let i = 0; i < cartas.length; i++) {
    let carta = cartas[i];
    
    if (carta.revelada || carta.escondida) continue;

    // Checa se o clique foi dentro dos limites da carta
    if (mouseX > carta.x && mouseX < carta.x + carta.w &&
        mouseY > carta.y && mouseY < carta.y + carta.h) {
      
      carta.revelada = true;

      if (primeiraEscolha === null) {
        primeiraEscolha = i;
      } else {
        segundaEscolha = i;
        bloqueado = true;
        
        // Espera 1 segundo para checar o par e fechar ou validar
        setTimeout(checarPar, 1000);
      }
      break;
    }
  }
}

function checarPar() {
  let c1 = cartas[primeiraEscolha];
  let c2 = cartas[segundaEscolha];

  if (c1.emoji === c2.emoji) {
    // Par correto!
    c1.escondida = true;
    c2.escondida = true;
    paresEncontrados++;
    
    // Atualiza a frase informativa com base no emoji encontrado
    mensagemInfo = "Boa! Você encontrou um par de " + obterNome(c1.emoji) + "!";
    
    if (paresEncontrados === 8) {
      mensagemInfo = "Parabéns! Você salvou o campo e venceu o jogo do Agrinho! 🎉";
    }
  } else {
    // Errou, desvira as cartas
    c1.revelada = false;
    c2.revelada = false;
    mensagemInfo = "Tente novamente! Os elementos não eram iguais.";
  }

  // Libera para a próxima jogada
  primeiraEscolha = null;
  segundaEscolha = null;
  bloqueado = false;
}

// Função auxiliar para dar nome aos elementos do Agrinho
function obterNome(emoji) {
  switch(emoji) {
    case "🍎": return "Maçã";
    case "🌽": return "Milho";
    case "🐄": return "Vaca Leiteira";
    case "🚜": return "Trator";
    case "🌻": return "Girassol";
    case "🌾": return "Arroz";
    case "🍅": return "Tomate";
    case "🐝": return "Abelha";
    default: return "Item";
  }
}
