
var canv = document.createElement("canvas");
document.body.appendChild(canv);
var ctx = canv.getContext("2d");
var height, width, margin;
var gameOver, gameTied, grid = [], playersTurn, timeComp, dif = 1, nullVerifier = 0;

//game parameters
const DELAY_COMP = 0.5;
const GRID_CIRCLE = 0.7;
var gridCols = 7;
var gridRows = 6;
const MARGIN = 0.02;
var opponent = 1;
const COLOR_FRAME = "dodgerblue";
const COLOR_FRAME_BUTT = "royalblue";
const COLOR_BACKGROUND = "teal";
const COLOR_COMP = "red";
const COLOR_COMP_DRK = "darkred";
const COLOR_PLAY = "yellow";
const COLOR_PLAY_DRK = "olive";
const COLOR_TIE = "darkgrey";
const COLOR_TIE_DRK = "black";
const COLOR_WIN = "black";

const TEXT_COMP = "Computador";
const TEXT_PLAY = "Jogador 1";
const TEXT_TIE= "Empate. :-(";
const TEXT_WIN = "vence!";

var timeDelta, timeLast;

class Cell {
  constructor(left, top, w, h, row, col) {
    this.bot = top + h;
    this.left = left;
    this.right = left + width;
    this.top = top;
    this.w = w;
    this.h = h;
    this.row = row;
    this.col = col;
    this.cx = left + w / 2;
    this.cy = top + h / 2;
    this.r = w * GRID_CIRCLE / 2;
    this.highlight = null;
    this.owner = null;
    this.winner = false;
  }

  //draw the circle or placeholder
  draw(ctx) {
    let color = this.owner == null ? COLOR_BACKGROUND : this.owner ? COLOR_PLAY : COLOR_COMP;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
    ctx.fill();

    if (this.winner || this.highlight != null) {
      color = this.winner ? COLOR_WIN : this.highlight ? COLOR_PLAY : COLOR_COMP;
      ctx.lineWidth = this.r / 4;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  contains(x, y) {
    return x > this.left && x < this.right && y > this.top && y < this.bot;
  }
}

function loop(timeNow) {
  if (!timeLast) {
    timeLast = timeNow;
  }

  timeDelta = (timeNow - timeLast) / 1000;
  timeLast = timeNow;

  //update
  if (opponent == 1) {
    if (dif == 1) {
      goComputerEasy(timeDelta);
    }
    if (dif == 2) {
      goComputerMedium(timeDelta);
    }
    if (dif == 3) {
      goComputer(timeDelta);
    }
  }
  //draw
  drawBackground();
  drawGrid();
  drawText();
  // call the next frame
  requestAnimationFrame(loop);
}


function createGrid() {
  grid = [];

  let cell, marginX, marginY;

  if ((width - margin * 2) * gridRows / gridCols < height - margin * 2) {
    cell = (width - margin * 2) / gridCols;
    marginX = margin;
    marginY = (height - cell * gridRows) / 2;
  }
  else {
    cell = (height - margin * 2) / gridRows;
    marginX = (width - cell * gridCols) / 2;
    marginY = margin;
  }

  for (let i = 0; i < gridRows; i++) {
    grid[i] = [];
    for (let j = 0; j < gridCols; j++) {
      let left = marginX + j * cell;
      let top = marginY + i * cell;
      grid[i][j] = new Cell(left, top, cell, cell, i, j);
    }
  }
}

function drawBackground() {
  ctx.fillStyle = COLOR_BACKGROUND;
  ctx.fillRect(0,0, width, height);
}

function drawGrid() {
  let cell = grid[0][0];
  let fh = cell.h * gridRows;
  let fw = cell.w * gridCols;
  ctx.fillStyle = COLOR_FRAME;
  ctx.fillRect(cell.left, cell.top, fw, fh);
  ctx.fillStyle = COLOR_FRAME_BUTT;
  ctx.fillRect(cell.left - margin / 2, cell.top + fh - margin, fw + margin, margin);

  for (let row of grid) {
    for (let cell of row) {
      cell.draw(ctx);
    }
  }
}

function drawText() {
  if (!gameOver) {
    return;
  }

  let size = grid[0][0].h;
  ctx.fillStyle = gameTied ? COLOR_TIE : playersTurn ? COLOR_PLAY : COLOR_COMP;
  ctx.font = size + "px dejavu sans mono";
  ctx.lineWidth = size / 10;
  ctx.lineJoin = "round";
  ctx.strokeStyle = gameTied ? COLOR_TIE_DRK : playersTurn ? COLOR_PLAY_DRK : COLOR_COMP_DRK;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let text = gameTied ? TEXT_TIE : playersTurn ? TEXT_PLAY : TEXT_COMP;
  let offset = size * 0.55;
  if (gameTied) {
    ctx.strokeText(text, width / 2, height / 2 - offset);
    ctx.fillText(text, width / 2, height / 2 - offset);
  } else {
    ctx.strokeText(text, width / 2, height / 2 - offset);
    ctx.fillText(text, width / 2, height / 2 - offset);
    ctx.strokeText(TEXT_WIN, width / 2, height / 2 + offset);
    ctx.fillText(TEXT_WIN, width / 2, height / 2 + offset);
  }
}
function goComputerMedium(delta) {
  if (playersTurn || gameOver) return;

  if (timeComp > 0) {
    timeComp -= delta;
    if (timeComp <= 0) {
      selectCell();
    }
    return;
  }
  if (document.querySelector('input[name=size]:checked').value == 1) {
    var i = Math.floor((Math.random() * 5) + 1);var i = Math.floor((Math.random() * 5) + 1);
  }
  else if (document.querySelector('input[name=size]:checked').value == 2) {
    var i = Math.floor((Math.random() * 7) + 1);
  }
  highlightCell(grid[i][i].cx, grid[i][i].cy);
  if (nullVerifier == 1) {
    goComputerEasy(delta);
  }
  timeComp = DELAY_COMP;
}

function goComputerEasy(delta) {
  if (playersTurn || gameOver) return;

  if (timeComp > 0) {
    timeComp -= delta;
    if (timeComp <= 0) {
      selectCell();
    }
    return;
  }
  var i = 0;
  highlightCell(grid[i][i].cx, grid[i][i].cy);
  if (nullVerifier == 1) {
    i++;
    highlightCell(grid[i][i].cx, grid[i][i].cy);
  }
  if (nullVerifier == 1) {
    i++;
    highlightCell(grid[i][i].cx, grid[i][i].cy);
  }
  if (nullVerifier == 1) {
    i++;
    highlightCell(grid[i][i].cx, grid[i][i].cy);
  }
  if (nullVerifier == 1) {
    i++;
    highlightCell(grid[i][i].cx, grid[i][i].cy);
  }
  if (nullVerifier == 1) {
    i++;
    highlightCell(grid[i][i].cx, grid[i][i].cy);
  }
  timeComp = DELAY_COMP;
}

function goComputer(delta) {
    if (playersTurn || gameOver) return;

    if (timeComp > 0) {
      timeComp -= delta;
      if (timeComp <= 0) {
        selectCell();
      }
      return;
    }

    let options = [];
    options[0] = []; //computer wins
    options[1] = []; //block the player from winning
    options[2] = []; //no significance
    options[3] = []; //give away a win

    let cell;
    for (let i = 0; i < gridCols; i++) {
      cell = highlightCell(grid[0][i].cx, grid[0][i].cy);
      if (cell == null) {
        continue;
      }

      cell.owner = playersTurn;
      if (dif == 2);
      if (checkWin(cell.row, cell.col)) {
        options[0].push(i);
      } else {
        cell.owner = !playersTurn;
        if (checkWin(cell.row, cell.col)) {
          options[1].push(i);
        } else {
          cell.owner = playersTurn;
          if (cell.row > 0) {
            grid[cell.row - 1][cell.col].owner = !playersTurn;
            cell.owner = !playersTurn;
            if (checkWin(cell.row - 1, cell.col)) {
              options[3].push(i);
            }

            else {
              options[2].push(i);
            }

            grid[cell.row - 1][cell.col].owner = null;
          }
          else {
            options[2].push(i);
          }
        }
      }

      cell.highlight = null;
      cell.owner = null;
    }

    for (let row of grid) {
      for (let cell of row) {
        cell.winner = false;
      }
    }

    let col;
    if (options[0].length > 0) {
      col = options[0][Math.floor(Math.random() * options[0].length)];
    } else if (options[1].length > 0) {
      col = options[1][Math.floor(Math.random() * options[1].length)];
    } else if (options[2].length > 0) {
      col = options[2][Math.floor(Math.random() * options[2].length)];
    } else if (options[3].length > 0) {
      col = options[3][Math.floor(Math.random() * options[3].length)];
    }
    highlightCell(grid[0][col].cx, grid[0][col].cy);

    //set Delay
    timeComp = DELAY_COMP;
}

function highlightCell(x, y) {
  let col = null;
  for (let row of grid) {
    for (let cell of row) {
      cell.highlight = null;

      if (cell.contains(x, y)) {
        col = cell.col;
      }
    }
  }
  if (col == null) {
    nullVerifier = 0;
    return;
  }

  for (let i = gridRows - 1; i >= 0; i--) {
    if (grid[i][col].owner == null) {
      grid[i][col].highlight = playersTurn;
      nullVerifier = 0;
      return grid[i][col];
    }
  }
  nullVerifier = 1;
  return null;
}

function highlightGrid(ev) {
  if (!playersTurn || gameOver) {
    return;
  }
  highlightCell(ev.clientX, ev.clientY);
}

function click(ev) {
  if (gameOver) {
    newGame();
    return;
  }
  if (!playersTurn) {
    return;
  }
  selectCell();
}


function checkWin (row, col) {
    let diagL = [], diagR = [], horiz = [], vert = [];
    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        //horizontal
        if (i == row) {
          horiz.push(grid[i][j]);
        }

        //vertical
        if (j == col) {
          vert.push(grid[i][j]);
        }

        //top left to bottom right
        if (i - j == row - col) {
          diagL.push(grid[i][j]);
        }

        //top right to bottom left
        if (i + j == row + col) {
          diagR.push(grid[i][j]);
        }
      }
    }
    return connect4(diagL) || connect4(diagR) || connect4(horiz) || connect4(vert);
}

function connect4(cells = []) {
  let count = 0, lastOwner = null;
  let winningCells = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].owner == null) {
      count = 0;
      winningCells = [];
    }

    else if (cells[i].owner == lastOwner) {
      count++;
      winningCells.push(cells[i]);
    }

    else {
      count = 1;
      winningCells = [];
      winningCells.push(cells[i]);
    }

    lastOwner = cells[i].owner;

    if (count == 4) {
      for (let cell of winningCells) {
        cell.winner = true;
      }
      return true;
    }
  }
  return false;
}

function selectCell() {

  if (opponent == 2) {
    var intCol = 0;
    playersTurn = true;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/notify", true);
    let highlighting = false;
    OUTER: for (let row of grid) {
      for (let cell of row) {
        if (cell.highlight != null) {
          intCol = cell.col;
          break OUTER;
        }
      }
    }
    var dados = {
      "nick": sessionStorage.getItem("nick"),
      "pass": sessionStorage.getItem("pass"),
      "game": sessionStorage.getItem("game"),
      "column": intCol
    }
    xhr.onreadystatechange = function() {
      alert("Clicked, opponent: " + opponent);
      if (xhr.readyState != 4) { console.log("Pending " + xhr.readyState);}
      if (xhr.status != 200){
        alert("Error connecting to the server. Error: " + xhr.status);
        return;
      }
      if (xhr.readyState == 4 && xhr.status == 200) {
        let highlighting = false;
        OUTER: for (let row of grid) {
          for (let cell of row) {
            if (cell.highlight != null) {
              highlighting = true;
              cell.highlight = null;
              cell.owner = playersTurn;
              if (checkWin(cell.row, cell.col)) {
                gameOver = true;
              }
              break OUTER;
            }
          }
        }
        if (!highlighting) return;
        if (!gameOver) {
          gameTied = true;
          OUTER: for (let row of grid) {
            for (let cell of row) {
              if (cell.owner == null) {
                gameTied = false;
                break OUTER;
              }
            }
          }
          if (gameTied) {
            gameOver = true;
          }
        }
        if (!gameOver) {
          playersTurn = !playersTurn;
        }
      }
    }
    xhr.send(JSON.stringify(dados));
  }
  if (opponent == 1) {
    let highlighting = false;
    OUTER: for (let row of grid) {
      for (let cell of row) {
        if (cell.highlight != null) {
          highlighting = true;
          cell.highlight = null;
          cell.owner = playersTurn;
          if (checkWin(cell.row, cell.col)) {
            gameOver = true;
          }
          break OUTER;
        }
      }
    }
    if (!highlighting) return;
    if (!gameOver) {
      gameTied = true;
      OUTER: for (let row of grid) {
        for (let cell of row) {
          if (cell.owner == null) {
            gameTied = false;
            break OUTER;
          }
        }
      }
      if (gameTied) {
        gameOver = true;
      }
    }
    if (!gameOver) {
      playersTurn = !playersTurn;
    }
  }
}

function newGame() {
  console.log(opponent);
  if (opponent == 2) {
    var xhr = new XMLHttpRequest();
    var dados = {
      "nick":sessionStorage.getItem('nick'),
      "game":sessionStorage.getItem('game')
    };
    string = "http://twserver.alunos.dcc.fc.up.pt:8008/update?nick=" + dados.nick + "&game=" + dados.game;
    turnoJoga = new EventSource(string);
    turnoJoga.onmessage = function(event){
      parseJson = JSON.parse(event.data);
      if (sessionStorage.getItem('nick') == parseJson.turn) {
        playersTurn = true;
      } else playersTurn = false;
    }
  } else if (opponent == 1) playersTurn = Math.random() < 0.5;
  gameOver = false;
  gameTied = false;
  createGrid();
}


function setDimensions() {
  height = window.innerHeight;
  width = window.innerWidth;
  canv.height = height;
  canv.width = width;
  margin = MARGIN * Math.min(height, width);
  newGame();
}

function saveConfig(){

    if (document.querySelector('input[name=opponent]:checked').value == 1){
      opponent = 1;
      if (document.querySelector('input[name=size]:checked').value == 1) {
        gridCols = 7;
        gridRows = 6;
      }
      if (document.querySelector('input[name=size]:checked').value == 2) {
        gridCols = 9;
        gridRows = 7;
      }
      if (document.querySelector('input[name=dificulty]:checked').value == 1){
        dif = 1;
      }
      if (document.querySelector('input[name=dificulty]:checked').value == 2){
        dif = 2;
      }
      if (document.querySelector('input[name=dificulty]:checked').value == 3){
        dif = 3;
      }
    } else if (document.querySelector('input[name=opponent]:checked').value == 2){
      opponent = 2;
      if (document.querySelector('input[name=size]:checked').value == 1) {
        gridCols = 7;
        gridRows = 6;
      }
      if (document.querySelector('input[name=size]:checked').value == 2) {
        gridCols = 9;
        gridRows = 7;
      }
    }

    showAbout();
}

function doScore(){
  //TODO return
}

function doGame(){
  setDimensions();
  canv.addEventListener("click", click);
  canv.addEventListener("mousemove", highlightGrid);
  window.addEventListener("resize", setDimensions);
  requestAnimationFrame(loop);
}
