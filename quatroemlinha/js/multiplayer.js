
function inputCheck() {
  username = document.getElementById('muser').value;
  password = document.getElementById('mpsw').value
  if (/[^a-zA-Z0-9\-\/]/.test(username) || username.length < 4) {
    if (username.length < 4) {
      alert("Nome de utilizador tem de ter mais de 4 caracteres!");
    } else {
      alert("Caracteres especiais não suportados!");
    }
    return false;
  }
  else {
    if (/[^a-zA-Z0-9\-\/]/.test(password) || password.length < 4) {
      if (password.length < 4) {
        alert("Tamanho minimo de password de 4 caracteres!");
      } else {
        alert("Caracteres especiais na password não suportados!");
      }
      return false;
    } else {
      login();
      return true;
    }
  }
}

function login () {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://twserver.alunos.dcc.fc.up.pt:8008/register', true);
  username = document.getElementById('muser').value;
  password = document.getElementById('mpsw').value;
  var dados = {
    "nick": username,
    "pass": password
  };
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) { console.log("Pending " + xhr.readyState);}
    if (xhr.status != 200){
      alert("Error connecting to the server. Error: " + xhr.status);
      return;
    }

    if (xhr.readyState == 4 && xhr.status == 200) {
      var resposta = xhr.responseText;
      if (resposta == "{}") { //Não há erros
        sessionStorage.setItem("nick", username);
        sessionStorage.setItem("pass", password);
        isEmpty();
      }

      else {
        var erro = JSON.parse(resposta, function(key, tipeErro) {
          if (key == "error") {
            alert("One or more errors occured");
          }
        });
      }
    }
  }
  xhr.send(JSON.stringify(dados));

}

function waitGame() {
  var merro;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/join", true);
  var dados = {
    "group": 25,
    "nick": sessionStorage.getItem('nick'),
    "pass": sessionStorage.getItem('pass'),
    "size": {"rows": gridRows, "columns": gridCols}
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) { console.log("Pending " + xhr.readyState);}
    if (xhr.status != 200){
      alert("Error connecting to the server. Error: " + xhr.status);
      return;
    }

    if (xhr.readyState == 4 && xhr.status == 200) {
      var resposta = xhr.response;
      var jsonText = JSON.parse(resposta);
      var erro = JSON.parse(resposta, function(key, tipoerro){
        if (key == "error") {
          if (tipoerro != "") {
            merro = true;
          }
        } else {
          sessionStorage.setItem(key,tipoerro);
        }
      });

      if (!merro) {
        waiting();
      }
    }
  }
  xhr.send(JSON.stringify(dados));
}

function waiting() {
  var xhr = new XMLHttpRequest();
  var dados = {
    "nick":sessionStorage.getItem('nick'),
    "game":sessionStorage.getItem('game')
  };

  string = "http://twserver.alunos.dcc.fc.up.pt:8008/update?nick=" + dados.nick + "&game=" + dados.game;
  findGame = new EventSource(string);
  findGame.onmessage = function(event){
    varWait = document.getElementById("emparelha");
    varWait.style.display = "none";
    doGame();

  }
}

function quitWait() {
  var dados = {
    "nick":sessionStorage.getItem('nick'),
    "pass":sessionStorage.getItem('pass'),
    "game":sessionStorage.getItem('game')
  };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://twserver.alunos.dcc.fc.up.pt:8008/leave", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) { console.log("Pending " + xhr.readyState);}
    if (xhr.status != 200){
      alert("Error connecting to the server. Error: " + xhr.status);
      return;
    }

    if (xhr.readyState == 4 && xhr.status == 200) {
      var resposta = xhr.responseText;
      if(resposta == "{}"){
          showAbout();
      } else {
          var erro = JSON.parse(resposta, function(key, tipoerro){
            if(key == "error") {
              alert(tipoerro);
            }
          });
        }
    }
  }
  xhr.send(JSON.stringify(dados));
}
