// Variaveis globais:

var nJog;
var tam;
var difi;

var coordX = -1;
var coordY = -1;
var jogadorAtual = 0;

function Transition() {
    var x = document.getElementById("config");
    var x1 = document.getElementById("inputStuff");
    if (x.hidden === true) {
        x.hidden = false;
        x1.hidden = true;
    }
}

function Transition2() {
    var x = document.getElementById("config");
    var x1 = document.getElementById("myTopnav");
    var x2 = document.getElementById("instrucoes");
    var x3 = document.getElementById("jogo");
    if (x1.hidden === true) {
      x1.hidden = false;
      x.hidden = true;
      x2.hidden = false;
      x3.hidden = true;
    }
}

function TransitionInst() {
    var x = document.getElementById("instrucoes");
    var x1 = document.getElementById("config");
    var x3 = document.getElementById("classifica");
    var x2 = document.getElementById("myTopnav");
    var x4 = document.getElementById("jogo");
    if (x.hidden == true) {
      x.hidden = false;
      x2.hidden = false;
      x1.hidden = true;
      x3.hidden = true;
      x4.hidden = true;
    }
}

function TransitionConfig() {
    var x = document.getElementById("instrucoes");
    var x1 = document.getElementById("config");
    var x2 = document.getElementById("myTopnav");
    var x3 = document.getElementById("classifica");
    if (x1.hidden === true) {
      x.hidden = true;
      x1.hidden = false;
      x2.hidden = true;
      x3.hidden = true;
    }
}

function TransitionClassifica() {
  var x = document.getElementById("instrucoes");
  var x1 = document.getElementById("config");
  var x2 = document.getElementById("classifica");
  if (x2.hidden === true) {
      x.hidden = true;
      x1.hidden = true;
      x2.hidden = false;
  }
}

function checkRadios() {

  var radios = document.getElementsByName('tamanho');
  for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
          tam = radios[i].value;
          break;
      }
  }
  var radios1 = document.getElementsByName('njogadores');
  for (var i = 0, length = radios1.length; i < length; i++) {
      if (radios1[i].checked) {
          nJog = radios1[i].value;
          break;
      }
  }
  var radios2 = document.getElementsByName('dificuldade');
  for (var i = 0, length = radios2.length; i < length; i++) {
      if (radios2[i].checked) {
          difi = radios2[i].value;
          break;
      }
  }
  gameConfig();
}

function gameConfig() {
  var toggle = 0;
  if (tam == "10");
  else if (tam == "15");
  else if (tam == "21");
  else {
    alert ("Erro: Tamanho não foi escolhido");
    toggle = 1;
  }
  if (nJog == "1jog");
  else if (nJog == "2jog");
  else {
    alert ("Erro: Número de jogadores não foi escolhido");
    toggle = 1;
  }
  if (difi == "easy");
  else if (difi == "hard");
  else {
    alert ("Erro: Dificuldade não foi escolhida");
    toggle = 1;
  }
  if (toggle == 1) TransitionConfig();
  else {
    alert ("Foi escolhido um tamanho de tabuleiro de " + tam + " no modo de " + nJog + " na dificuldade " + difi);
    Transition2();
  }
}



function TransitionJogar() {
  console.log("tam = " + tam);
  switch (tam) {
    case "10":
      definePecas();
      prepara();
      showGame();
      break;
    case "15":
      definePecas();
      prepara();
      showGame();
      break;
    case "21":
      definePecas();
      prepara();
      showGame();
      break;
    default: alert("Algo correu mal na configuração...");
  }
}

function showGame () {
  var x = document.getElementById("jogo");
  var x1 = document.getElementById("myTopnav");
  var x2 = document.getElementById("instrucoes");
  var x3 = document.getElementById("config");
  var x4 = document.getElementById("classifica");
  if (x.hidden === true) {
    x.hidden = false;
    x1.hidden = true;
    x2.hidden = true;
    x3.hidden = true;
    x4.hidden = true;
  }
}


//Jogo
var pecas;
var cols;

function definePecas () {
  if (tam == "10") {
    pecas = new Array(4);
    pecas[0] = 1;
    pecas[1] = 2;
    pecas[2] = 3;
    pecas[3] = 4;
    cols = 4;
  }
  if (tam == "15") {
    console.log ("entrou em definepecas");
    pecas = new Array(5);
    pecas[0] = 1;
    pecas[1] = 2;
    pecas[2] = 3;
    pecas[3] = 4;
    pecas[4] = 5;
    cols = 5;
  }
  if (tam == "21") {
    pecas = new Array(6);
    pecas[0] = 1;
    pecas[1] = 2;
    pecas[2] = 3;
    pecas[3] = 4;
    pecas[4] = 5;
    pecas[5] = 6;
    cols = 6;
  }
}


function terminou() {
  var vazio = 1;
  for (var x = 0; x < cols; x++) {
    if (pecas[x] > 0) {
      vazio = 0;
    }
  }
  if (vazio) {
    var vencedor = "";
    if (jogadorAtual == 2) {
      vencedor = "O jogo acabou. O computador ganhou.";
    } else {
      vencedor = "O jogo acabou. Você venceu!";
    }
    alert(vencedor);
    var x = document.getElementById("jogo");
    var html = "";
    editarHTML('game').innerHTML = html;
    html = "<p> <strong> <span button class = 'submeter' onclick='TransitionJogar()'> Jogar outra vez!<\/span><\/strong> <\/p>";
    html += "<p> <strong> <span button class = 'submeter' onclick='TransitionInst()'> Sair <\/span><\/strong><\/p>";
    editarHTML('game').innerHTML = html;
    jogadorAtual = 0;
  }
}

function prepara() {
    var html = "<p> <strong> <span button class = 'submeter' onclick='primeiroPC()'> O PC joga primeiro<\/span><\/strong> <\/p>";
    html += "<p> <strong> <span button class = 'submeter' onclick='primeiroJogador()'> Eu jogo primeiro<\/span><\/strong><\/p>";
    editarHTML('game').innerHTML = html;
  }

function editarHTML(id){
  if (document.getElementById){
    return document.getElementById(id);
  }
  else if (window[id]){
    return window[id];
  }
  return null;
}

function sobrePeca(x, y) {
  if (jogadorAtual == 1) {
    if ((coordX != x) || (coordY != y)) {
      coordX = x;
      coordY = y;
        for (var iy = 0; iy < pecas[x]; iy++)
        if (iy <= y)
          editarHTML('img' + x + iy).src = "coin2.png";
    }
  }
    return true;
}

function largaPeca(x, y) {
  if (jogadorAtual == 1) {
    coordX = -1;
    coordY = -1;
      for (var iy = 0; iy < pecas[x]; iy++)
      if (iy <= y)
        editarHTML('img' + x + iy).src = "coin.png";
  }
    return true;
}

function clicaPeca(x, y) {
  largaPeca(x, y);
  if (jogadorAtual == 1) {
    pecas[x] -= y + 1;
      atualizarPecas();
    terminou();
    if (jogadorAtual != 0) {
      computador();
    }
  }
    return true;
}

function atualizarPecas() {
  var html = "<table height='150' onmouseout='largaPeca(0, 0)' style='margin-left: auto; margin-right: auto;'><tr>";
  for (var x = 0; x < cols; x++) {
    html += "<td valign='bottom' width='20'>";
    for (var y = 0; y < pecas[x]; y++) {
      var name = "coin.png";
      if ((x == coordX) && (y <= coordY)) {
        name = "coin2.png";
      }
      html += "<img id='img" + x + y + "' style='margin-bottom: 5px;' src='" + name + "' onMouseDown=\"clicaPeca(" + x + ", " + y + ")\" onMouseOver='sobrePeca(" + x + ", " + y + ")' onMouseOut='largaPeca(" + x + ", " + y + ")'><br>";
    }
    html += "<\/td>";
  }
  html += "<\/tr><\/table>";
    editarHTML('game').innerHTML = html;
}

function JogadaPC() {
  pecas[coordX] -= coordY + 1;
  coordX = -1;
  coordY = -1;
  atualizarPecas();
  terminou();
    if (jogadorAtual != 0) {
    jogador();
  }
}

function algoritmoDeJogada() {
  var bit1 = 0;
  var bit2 = 0;
  var bit3 = 0;
  for (var x = 0; x < cols; x++) {
    if (pecas[x] % 2 == 1) {
      bit1++;
      bit1 = bit1 % 2;
    }
    if (pecas[x] % 4 >= 2) {
      bit2++;
      bit2 = bit2 % 2;
    }
    if (pecas[x] >= 4) {
      bit3++;
      bit3 = bit3 % 2;
    }
  }
    var value = bit1 + bit2 * 2 + bit3 * 4;
    return (value == 0);
}

function decisaoPC() {
  coordY = 0;
  coordX = -1;
    for (var x = 0; x < cols; x++) {
    for (var y = 1; y <= pecas[x]; y++) {
      pecas[x] -= y;
      if (algoritmoDeJogada()) {
        pecas[x] += y;
        coordX = x;
        coordY = y - 1;
        y = pecas[x];
        x = cols;
      } else {
        pecas[x] += y;
      }
    }
  }
  if (coordX == -1) {
    for (var x = 0; x < cols; x++) {
      if (pecas[x] >= 1) {
        coordX = x;
        x = cols;
      }
    }
  }
  atualizarPecas();
  setTimeout('JogadaPC()', 500);
}

function computador() {
  largaPeca(0, 0);
  atualizarPecas();
    jogadorAtual = 2;
    setTimeout('decisaoPC()', 500);
}

function jogador() {
  jogadorAtual = 1;
}

function primeiroPC() {
  atualizarPecas();
  computador();
}

function primeiroJogador() {
  atualizarPecas();
  jogador();
}
