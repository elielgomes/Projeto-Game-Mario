const body = document.querySelector('body');
const mario = document.querySelector('#mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const pipeAnimation = document.querySelector('.pipe-animation');
const chao1 = document.querySelector(".chao-1");
const chao2 = document.querySelector(".chao-2");
const marioLose = document.querySelector('#mario-lose');
let cardInicial = document.querySelector(".card-inicial")
let cardNormal = document.querySelector(".card-normal");
let cardNewRecord = document.querySelector(".card-new-record");
let displayScore = document.getElementById("text-score");
let gameData = JSON.parse(localStorage.getItem('gameData') ?? '{}');
gameData.maxScore = gameData.maxScore ?? 0;
let score = 0;
let loop;
let increaseScore;
let pipePosition;
let musicaTema;
let pipeRefer;
const jumpSound = new Audio();
jumpSound.src = 'assets/sounds/jump.mp3';

const temaSound = new Audio();
temaSound.src = 'assets/sounds/tema.mp3';

const deathSound = new Audio();
deathSound.src = 'assets/sounds/death.mp3';

const stageClear = new Audio();
stageClear.src = 'assets/sounds/stage-clear.mp3';


const jump = () => {
  mario.classList.add('jump');
  jumpSound.play()
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);

};

pipe.style.display = 'none';
clouds.style.display = 'none';

function reloadFrame() {
  temaSound.src = 'assets/sounds/tema.mp3';
  temaSound.play();
  deathSound.pause();
  stageClear.pause();
  jumpSound.src = 'assets/sounds/jump.mp3';
  cardInicial.style.display = 'none';
  cardNewRecord.style.display = 'none';
  cardNormal.style.display = 'none'
  displayScore.textContent = 0;
  clouds.style.display = 'initial';
  clouds.style.left = '';
  clouds.style.animation = '';
  clouds.className = 'clouds clouds-animation-1'
  pipe.style.display = 'initial';
  pipe.style.animation = '';
  pipe.style.left = '';
  pipe.className= 'pipe animation-pipe-1';
  marioLose.style.display = 'none';
  mario.style.display = 'initial';
  mario.style.animation = '';
  mario.style.bottom = '';
  chao1.style.animation = '';
  chao2.style.animation = '';
  chao1.style.left = '';
  chao2.style.left = '';
  chao1.className ='chao-1 animation-chao1-1'
  chao2.className ='chao-2 animation-chao2-1';
  score = 0;

  increaseScore = setInterval(() => {
    score += 1;
    displayScore.textContent = score * 10;
  }, 1000);

  loop = setInterval(() => {
    verifica()
    velocidade()
  }, 10);

  musicaTema = setInterval(()=>{
    temaSound.src = ''
    temaSound.pause();
    temaSound.src = 'assets/sounds/tema.mp3'
    temaSound.play();
    },88000)

}

window.screen.width < 1000 ? pipeRefer = 85 : pipeRefer = 120;

function verifica() {

  pipePosition = pipe.offsetLeft;
  
  const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''));
  const cloudsPostion = clouds.offsetLeft;
  const chao1Position = chao1.offsetLeft;
  const chao2Position = chao2.offsetLeft;

  if (pipePosition <= pipeRefer && pipePosition > 0 && marioPosition < pipe.height) {
    temaSound.pause()
    clearInterval(musicaTema)
    jumpSound.src = '';
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    mario.style.animation = 'none';
    mario.style.display = 'none';
    marioLose.style.display = 'initial';
    marioLose.style.bottom = `${marioPosition}px`;
    clouds.style.left = `${cloudsPostion}px`
    clouds.style.animation = 'none';
    chao1.style.animation = 'none';
    chao1.style.left = `${chao1Position}px`;
    chao2.style.animation = 'none';
    chao2.style.left = `${chao2Position}px`;
    clearInterval(loop)
    clearInterval(increaseScore);

    if (score > gameData.maxScore) {
      deathSound.play()
      setTimeout(() => {
        deathSound.pause()
        stageClear.play()
        marioLose.style.display = 'none';
        gameData.maxScore = score;
        localStorage.setItem('gameData', JSON.stringify(gameData));
        cardNewRecord.style.display = 'initial';
        let newRecord = document.querySelector("#new-record");
        newRecord.textContent = `New record: ${gameData.maxScore * 10}`;
      }, 2000)
    }
    else {
      deathSound.play()
      setTimeout(() => {
        localStorage.setItem('gameData', JSON.stringify(gameData));
        cardNormal.style.display = 'initial';
        let recordScore = document.querySelector(".record-score");
        let lastScore = document.querySelector(".last-score");
        lastScore.textContent = `Last score: ${score * 10}`
        recordScore.textContent = `Record score: ${gameData.maxScore * 10}`
      }, 1500)
    }
  };

}

function velocidade() {

  pipePosition = pipe.offsetLeft;
  const cloudsPostion = clouds.offsetLeft;
  if(score < 10) {
    pipe.classList.add('animation-pipe-1');
    chao1.classList.add('animation-chao1-1');
    chao2.classList.add('animation-chao2-1');
  } else if (score > 10 && score < 20 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-1');
    pipe.classList.add('animation-pipe-2');
    chao1.classList.remove('animation-chao1-1');
    chao2.classList.remove('animation-chao2-1');
    chao1.classList.add('animation-chao1-2');
    chao2.classList.add('animation-chao2-2');
  } else if (score > 20 && score < 30 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-2');
    pipe.classList.add('animation-pipe-3');
    chao1.classList.remove('animation-chao1-2');
    chao2.classList.remove('animation-chao2-2');
    chao1.classList.add('animation-chao1-3');
    chao2.classList.add('animation-chao2-3');
  } else if (score > 30 && score < 40 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-3');
    pipe.classList.add('animation-pipe-4');
    chao1.classList.remove('animation-chao1-3');
    chao2.classList.remove('animation-chao2-3');
    chao1.classList.add('animation-chao1-4');
    chao2.classList.add('animation-chao2-4');
  } else if (score > 40 && score < 60 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-4');
    pipe.classList.add('animation-pipe-5');
    chao1.classList.remove('animation-chao1-4');
    chao2.classList.remove('animation-chao2-4');
    chao1.classList.add('animation-chao1-5');
    chao2.classList.add('animation-chao2-5');
  } else if (score > 60 && score < 80 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-5')
    pipe.classList.add('animation-pipe-6')
    chao1.classList.remove('animation-chao1-5');
    chao2.classList.remove('animation-chao2-5');
    chao1.classList.add('animation-chao1-6');
    chao2.classList.add('animation-chao2-6');
  } else if (score > 80 && score < 100 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-6');
    pipe.classList.add('animation-pipe-7');
    chao1.classList.remove('animation-chao1-6');
    chao2.classList.remove('animation-chao2-6');
    chao1.classList.add('animation-chao1-7');
    chao2.classList.add('animation-chao2-7');
  } else if (score > 100 && score < 120 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-7');
    pipe.classList.add('animation-pipe-8');
    chao1.classList.remove('animation-chao1-7');
    chao2.classList.remove('animation-chao2-7');
    chao1.classList.add('animation-chao1-8');
    chao2.classList.add('animation-chao2-8');
  } else if (score > 120 && score < 150 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-8');
    pipe.classList.add('animation-pipe-9');
    chao1.classList.remove('animation-chao1-8');
    chao2.classList.remove('animation-chao2-8');
    chao1.classList.add('animation-chao1-9');
    chao2.classList.add('animation-chao2-9');
  } else if (score > 150 && score < 180 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-9');
    pipe.classList.add('animation-pipe-10');
    chao1.classList.remove('animation-chao1-9');
    chao2.classList.remove('animation-chao2-9');
    chao1.classList.add('animation-chao1-10');
    chao2.classList.add('animation-chao2-10');
  } else if (score > 180 && pipePosition < -80) {
    pipe.classList.remove('animation-pipe-10');
    pipe.classList.add('animation-pipe-11');
    chao1.classList.remove('animation-chao1-10');
    chao2.classList.remove('animation-chao2-10');
    chao1.classList.add('animation-chao1-11');
    chao2.classList.add('animation-chao2-11');
  };
  if (cloudsPostion < -540 && score > 30 && score < 50) {
    clouds.classList.remove('clouds-animation-1');
    clouds.classList.add('clouds-animation-2');
  } else if (cloudsPostion < -540 && score > 60 && score < 90) {
    clouds.classList.remove('clouds-animation-2');
    clouds.classList.add('clouds-animation-3');
  } else if (cloudsPostion < -540 && score > 100 && score < 110) {
    clouds.classList.remove('clouds-animation-3');
    clouds.classList.add('clouds-animation-4');
  } else if (cloudsPostion < -540 && score > 120) {
    clouds.classList.remove('clouds-animation-4');
    clouds.classList.add('clouds-animation-5');
  }
}


document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
