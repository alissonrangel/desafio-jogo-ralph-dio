

const state = {
  view: { //altera algum elemento visual na tela
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    ranking: document.querySelector("#lista"),
  },
  values: {    
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lives: 3,
    ranking: [],
  },
  actions:{
    timeId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
};

function restart() {
  state.values.currentTime = 60;
  state.view.timeLeft.textContent = state.values.currentTime;
  state.values.result = 0;
  state.view.score.textContent = state.values.result;
  state.values.lives = 3;
  state.view.lives.textContent = state.values.lives;
  state.values.hitPosition = 0;
  state.actions.timeId = setInterval(randomSquare, 1000);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function countDown() {
  state.values.currentTime--;
  
  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
    alert("Jogar Novamente!!!");
    adicionarPontuacao(state.values.result);
    restart();
  } else {
    state.view.timeLeft.textContent = state.values.currentTime;
  }
}

function playSound(soundName) {
  let audio = new Audio(`./src/audios/${soundName}.m4a`);
  if (soundName === 'hit') {
    audio.volume = 0.2;  
  } else {
    audio.volume = 1;
  }
  
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy")
  })

  let randomNumber = Math.floor(Math.random() * 9);

  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;

}

// function moveEnemy() {
//   state.values.timeId = setInterval(randomSquare, state.values.gameVelocity)
// }

function addListenerHitBox() {
  state.view.squares.forEach(square => {
    square.addEventListener("mousedown", () => {
      // let enemy = document.querySelector('.enemy')
      // if (square.id === enemy.id) {
      //   alert('clicou')
      // }      
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound('hit');
      } else {        
        let live = --state.values.lives
        console.log(live);        
        state.view.lives.textContent = live
        if (live === 0) {
          playSound('gameover');
          state.values.currentTime = -1
        } 
      }
    })
  });
}

function adicionarPontuacao(pontos) {
  state.values.ranking.push(pontos)
  console.log(state.values.ranking);
  state.values.ranking.sort(function(a, b) {
    return a - b;
  }).reverse();
  state.view.ranking.innerHTML = "";

  let count = 0;
  for (const element of state.values.ranking) {
    const li = document.createElement('li');    
    li.style.marginTop = '20px';
    li.style.marginLeft = '40px';
    li.textContent = `${element} pontos`;
    state.view.ranking.appendChild(li)
    count++;
    if (count === 5) {
      break;
    }
  }
}

function initialize() {
  const li = document.createElement('li');
  li.style.listStyle = 'none';
  li.style.marginTop = '20px';
  li.textContent = "Lista Vazia";
  state.view.ranking.appendChild(li);
  //moveEnemy()
  addListenerHitBox();
}

initialize();