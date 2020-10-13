
function isEmpty() {
  var x = document.forms["loginForm"]["user"].value;
  var y = document.forms["loginForm"]["psw"].value;
    if (x == "" || y == "") {
        alert("Nome de utilizador ou palavra-passe por preencher!");
        return false;
    } else {
      logInto();
    }
}
function logInto() {
  var varLog = document.getElementById("loginForm");
  var varTopNav = document.getElementById("barra");
  var varAbout = document.getElementById("sobre");
  var varTitle = document.getElementById("titleImg");
  var varWait = document.getElementById("emparelha");
  if (varAbout.style.display === "none") {
      varLog.style.display = "none";
      varWait.style.display = "none";
      varTopNav.style.display = "block";
      varTitle.style.display = "none";
      varAbout.style.display = "block";
  }
}

function showAbout() {
  var btn1 = document.getElementById("jogarBtn");
  var btn2 = document.getElementById("configBtn");
  var btn3 = document.getElementById("aboutBtn");
  var btn4 = document.getElementById("scoreBtn");

  btn3.className = btn3.className.replace("inactive", "active");
  if (btn2.className == "active") {
    btn2.className = btn2.className.replace("active", "inactive");
  }
  if (btn1.className == "active") {
    btn1.className = btn1.className.replace("active", "inactive");
  }
  if (btn4.className == "active") {
    btn4.className = btn4.className.replace("active", "inactive");
  }
  var varWait = document.getElementById("emparelha");
  var varAbout = document.getElementById("sobre");
  var confDiv = document.getElementById("config");
  var varScore = document.getElementById("score");
  var varGame = document.getElementById("game");
  var varTopNav = document.getElementById("barra");
  if (varAbout.style.display === "none") {
      varAbout.style.display = "block";
      confDiv.style.display = "none";
      varScore.style.display = "none";
      varGame.style.display = "none";
      canv.style.display = "none";
      varTopNav.style.display = "block";
      varWait.style.display = "none";
  }

}

function showScore() {
  var btn1 = document.getElementById("jogarBtn");
  var btn2 = document.getElementById("configBtn");
  var btn3 = document.getElementById("aboutBtn");
  var btn4 = document.getElementById("scoreBtn");
  btn4.className = btn4.className.replace("inactive", "active");
  if (btn2.className == "active") {
    btn2.className = btn2.className.replace("active", "inactive");
  }
  if (btn3.className == "active") {
    btn3.className = btn3.className.replace("active", "inactive");
  }
  if (btn1.className == "active") {
    btn1.className = btn1.className.replace("active", "inactive");
  }
  var varWait = document.getElementById("emparelha");
  var varAbout = document.getElementById("sobre");
  var confDiv = document.getElementById("config");
  var varScore = document.getElementById("score");
  var varGame = document.getElementById("game");
  if (varScore.style.display === "none") {
      varAbout.style.display = "none";
      confDiv.style.display = "none";
      varScore.style.display = "block";
      varGame.style.display = "none";
      varWait.style.display = "none";
  }

  doScore();

}

function showConfig() {
  var btn1 = document.getElementById("jogarBtn");
  var btn2 = document.getElementById("configBtn");
  var btn3 = document.getElementById("aboutBtn");
  var btn4 = document.getElementById("scoreBtn");
  btn2.className = btn2.className.replace("inactive", "active");
  if (btn1.className == "active") {
    btn1.className = btn1.className.replace("active", "inactive");
  }
  if (btn3.className == "active") {
    btn3.className = btn3.className.replace("active", "inactive");
  }
  if (btn4.className == "active") {
    btn4.className = btn4.className.replace("active", "inactive");
  }
  var varWait = document.getElementById("emparelha");
  var varAbout = document.getElementById("sobre");
  var confDiv = document.getElementById("config");
  var varScore = document.getElementById("score");
  var varGame = document.getElementById("game");
  if (confDiv.style.display === "none") {
      varAbout.style.display = "none";
      confDiv.style.display = "block";
      varScore.style.display = "none";
      varGame.style.display = "none";
      varWait.style.display = "none";
  }
}

function startGame() {
  var btn1 = document.getElementById("jogarBtn");
  var btn2 = document.getElementById("configBtn");
  var btn3 = document.getElementById("aboutBtn");
  var btn4 = document.getElementById("scoreBtn");
  btn1.className = btn1.className.replace("inactive", "active");
  if (btn2.className == "active") {
    btn2.className = btn2.className.replace("active", "inactive");
  }
  if (btn3.className == "active") {
    btn3.className = btn3.className.replace("active", "inactive");
  }
  if (btn4.className == "active") {
    btn4.className = btn4.className.replace("active", "inactive");
  }
  var varTopNav = document.getElementById("barra");
  var varAbout = document.getElementById("sobre");
  var confDiv = document.getElementById("config");
  var varScore = document.getElementById("score");
  var varGame = document.getElementById("game");
  var varTopNav2 = document.getElementById ("barra2");
  var varWait = document.getElementById("emparelha");
  if (varGame.style.display === "none") {
      varAbout.style.display = "none";
      confDiv.style.display = "none";
      varScore.style.display = "none";
      varGame.style.display = "block";
      varTopNav.style.display = "none";
      canv.style.display = "block";
      varTopNav2.style.display = "block";
      if (opponent == 2) varWait.style.display = "block";
  }
  if (opponent == 1) doGame();
  else if (opponent == 2) waitGame();
}

function logout() {
  var btn1 = document.getElementById("jogarBtn");
  var btn2 = document.getElementById("configBtn");
  var btn3 = document.getElementById("aboutBtn");
  var btn4 = document.getElementById("scoreBtn");
  var varLog = document.getElementById("loginForm");
  var varAbout = document.getElementById("sobre");
  var confDiv = document.getElementById("config");
  var varScore = document.getElementById("score");
  var varGame = document.getElementById("game");
  var varTopNav = document.getElementById("barra");
  var varTitle = document.getElementById("titleImg");
  var varWait = document.getElementById("emparelha");
  if (varLog.style.display === "none") {
    varLog.style.display = "block";
    varTopNav.style.display = "none";
    varTitle.style.display = "block";
    varGame.style.display = "none";
    varScore.style.display = "none";
    confDiv.style.display = "none";
    varAbout.style.display = "none";
    varWait.style.display = "none";
  }
  if (btn1.className == "active") {
    btn1.className = btn1.className.replace("active", "inactive");
  }
  if (btn2.className == "active") {
    btn2.className = btn2.className.replace("active", "inactive");
  }
  if (btn3.className == "inactive") {
    btn3.className = btn3.className.replace("inactive", "active");
  }
  if (btn4.className == "active") {
    btn4.className = btn4.className.replace("active", "inactive");
  }
}

function instructions() {
  var btn1 = document.getElementById("retornar");
  var btn2 = document.getElementById("instruct");
  var btn3 = document.getElementById("quitbtn");
  if (btn2.className == "inactive") {
    btn2.className = btn2.className.replace("inactive", "active");
  }
  if (btn1.className == "active") {
    btn1.className = btn1.className.replace("active", "inactive");
  }
  var varWait = document.getElementById("emparelha");
  var varAbout = document.getElementById("sobre");
  var varGame = document.getElementById("game");
  var varTopNav2 = document.getElementById("barra2");
  if (varAbout.style.display === "none") {
      canv.style.display = "none";
      varAbout.style.display = "block";
      varTopNav2.style.display = "block";
      varWait.style.display = "none";
  }
}

function comeBack() {
  var btn1 = document.getElementById("retornar");
  var btn2 = document.getElementById("instruct");
  var btn3 = document.getElementById("quitbtn");
  if (btn1.className == "inactive") {
    btn1.className = btn1.className.replace("inactive", "active");
  }
  if (btn2.className == "active") {
    btn2.className = btn2.className.replace("active", "inactive");
  }
  var varAbout = document.getElementById("sobre");
  var varGame = document.getElementById("game");
  var varTopNav2 = document.getElementById("barra2");
  var varWait = document.getElementById("emparelha");
  if (canv.style.display === "none") {
      canv.style.display = "block";
      varAbout.style.display = "none";
      varGame.style.display = "block";
      varTopNav2.style.display = "block";
      varWait.style.display = "none";
  }
}

function quit() {
  if (opponent == 1) {
    var btn1 = document.getElementById("jogarBtn");
    var btn2 = document.getElementById("configBtn");
    var btn3 = document.getElementById("aboutBtn");
    var btn4 = document.getElementById("scoreBtn");
    var varLog = document.getElementById("loginForm");
    var varAbout = document.getElementById("sobre");
    var confDiv = document.getElementById("config");
    var varScore = document.getElementById("score");
    var varGame = document.getElementById("game");
    var varTopNav = document.getElementById("barra");
    var varTopNav2 = document.getElementById("barra2");
    var varTitle = document.getElementById("titleImg");
    var varWait = document.getElementById("emparelha");
    if (gameOver) {
      if (varLog.style.display === "none") {
        varLog.style.display = "none";
        varTopNav.style.display = "block";
        varTitle.style.display = "none";
        varGame.style.display = "none";
        varScore.style.display = "none";
        confDiv.style.display = "none";
        varAbout.style.display = "block";
        varTopNav2.style.display = "none";
        canv.style.display = "none";
        varWait.style.display = "none";
      }
      if (btn1.className == "active") {
        btn1.className = btn1.className.replace("active", "inactive");
      }
      if (btn2.className == "active") {
        btn2.className = btn2.className.replace("active", "inactive");
      }
      if (btn3.className == "inactive") {
        btn3.className = btn3.className.replace("inactive", "active");
      }
      if (btn4.className == "active") {
        btn4.className = btn4.className.replace("active", "inactive");
      }
    } else {
      alert("Você desistiu!");
      if (varLog.style.display === "none") {
        varLog.style.display = "none";
        varTopNav.style.display = "block";
        varTitle.style.display = "none";
        varGame.style.display = "none";
        varScore.style.display = "none";
        confDiv.style.display = "none";
        varAbout.style.display = "block";
        varTopNav2.style.display = "none";
        canv.style.display = "none";
        varWait.style.display = "none";
      }
      if (btn1.className == "active") {
        btn1.className = btn1.className.replace("active", "inactive");
      }
      if (btn2.className == "active") {
        btn2.className = btn2.className.replace("active", "inactive");
      }
      if (btn3.className == "inactive") {
        btn3.className = btn3.className.replace("inactive", "active");
      }
      if (btn4.className == "active") {
        btn4.className = btn4.className.replace("active", "inactive");
      }
    }
  } else if (opponent == 2) {
    quitWait();
    var btn1 = document.getElementById("jogarBtn");
    var btn2 = document.getElementById("configBtn");
    var btn3 = document.getElementById("aboutBtn");
    var btn4 = document.getElementById("scoreBtn");
    var varLog = document.getElementById("loginForm");
    var varWait = document.getElementById("emparelha");
    var varAbout = document.getElementById("sobre");
    var confDiv = document.getElementById("config");
    var varScore = document.getElementById("score");
    var varGame = document.getElementById("game");
    var varTopNav = document.getElementById("barra");
    var varTopNav2 = document.getElementById("barra2");
    var varTitle = document.getElementById("titleImg");
    if (gameOver) {
      if (varLog.style.display === "none") {
        varLog.style.display = "none";
        varTopNav.style.display = "block";
        varTitle.style.display = "none";
        varGame.style.display = "none";
        varScore.style.display = "none";
        confDiv.style.display = "none";
        varAbout.style.display = "block";
        varTopNav2.style.display = "none";
        canv.style.display = "none";
        varWait.style.display = "none";
      }
      if (btn1.className == "active") {
        btn1.className = btn1.className.replace("active", "inactive");
      }
      if (btn2.className == "active") {
        btn2.className = btn2.className.replace("active", "inactive");
      }
      if (btn3.className == "inactive") {
        btn3.className = btn3.className.replace("inactive", "active");
      }
      if (btn4.className == "active") {
        btn4.className = btn4.className.replace("active", "inactive");
      }
    } else {
      alert("Você desistiu!");
      if (varLog.style.display === "none") {
        varLog.style.display = "none";
        varTopNav.style.display = "block";
        varTitle.style.display = "none";
        varGame.style.display = "none";
        varScore.style.display = "none";
        confDiv.style.display = "none";
        varAbout.style.display = "block";
        varTopNav2.style.display = "none";
        canv.style.display = "none";
        varWait.style.display = "none";
      }
      if (btn1.className == "active") {
        btn1.className = btn1.className.replace("active", "inactive");
      }
      if (btn2.className == "active") {
        btn2.className = btn2.className.replace("active", "inactive");
      }
      if (btn3.className == "inactive") {
        btn3.className = btn3.className.replace("inactive", "active");
      }
      if (btn4.className == "active") {
        btn4.className = btn4.className.replace("active", "inactive");
      }
    }
  }
}
