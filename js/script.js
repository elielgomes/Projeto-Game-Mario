const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const pipeAnimation = document.querySelector('.pipe-animation');

const chao1 = document.querySelector(".chao-1");
const chao2 = document.querySelector(".chao-2");

let displayScore = document.getElementById("text-score")
let pipePosition;
let score = 0;

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};


const increaseScore = setInterval(() => {
  score += 1;
  displayScore.textContent = score * 100;
}, 1000);




function loop(){
  

  pipePosition = pipe.offsetLeft;
  const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''));
  const cloudsPostion = clouds.offsetLeft;
  const chao1Position = chao1.offsetLeft;
  const chao2Position = chao2.offsetLeft;

  
  //[VERIFICAÇÃO DE PERDA]

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = 'assets/game-over.png'
    mario.style.width = '75px'
    mario.style.marginLeft = '50px'

    clouds.style.left = `${cloudsPostion}px`
    clouds.style.animation = 'none';

    chao1.style.animation = 'none';
    chao1.style.left = `${chao1Position}px`;

    chao2.style.animation = 'none';
    chao2.style.left = `${chao2Position}px`;

    clearInterval(loop);
    clearInterval(increaseScore);
  }

  if(score > 10 && score < 20 && pipePosition < -80){

    pipe.classList.remove('animation-pipe-1');
    pipe.classList.add('animation-pipe-2');
    chao1.classList.remove('animation-chao1-1');
    chao2.classList.remove('animation-chao2-1');
    chao1.classList.add('animation-chao1-2');
    chao2.classList.add('animation-chao2-2');
  

  }else if(score > 20 && score < 30 && pipePosition < -80){

    pipe.classList.remove('animation-pipe-2')
    pipe.classList.add('animation-pipe-3')
    chao1.classList.remove('animation-chao1-2');
    chao2.classList.remove('animation-chao2-2');
    chao1.classList.add('animation-chao1-3');
    chao2.classList.add('animation-chao2-3');

  }else if(score > 30 && score < 40 && pipePosition < -80){

    pipe.classList.remove('animation-pipe-3')
    pipe.classList.add('animation-pipe-4')
  }else if(score > 40 && score < 50 && pipePosition < -80){
    pipe.classList.remove('animation-pipe-4')
    pipe.classList.add('animation-pipe-5')
    chao1.classList.remove('animation-chao1-3');
    chao2.classList.remove('animation-chao2-3');
    chao1.classList.add('animation-chao1-4');
    chao2.classList.add('animation-chao2-4');

  }else if(score > 50 && score < 60 && pipePosition < -80){
    pipe.classList.remove('animation-pipe-5')
    pipe.classList.add('animation-pipe-6')

  }else if(score > 60 && score < 70 && pipePosition < -80){
    pipe.classList.remove('animation-pipe-6')
    pipe.classList.add('animation-pipe-7')
    chao1.classList.remove('animation-chao1-4');
    chao2.classList.remove('animation-chao2-4');
    chao1.classList.add('animation-chao1-5');
    chao2.classList.add('animation-chao2-5');

  }else if(score > 60 && score < 70 && pipePosition < -80){
    pipe.classList.remove('animation-pipe-7')
    pipe.classList.add('animation-pipe-8')

  }else if(score > 80 && score < 90 && pipePosition < -80){
    pipe.classList.remove('animation-pipe-8')
    pipe.classList.add('animation-pipe-9')
    chao1.classList.remove('animation-chao1-5');
    chao2.classList.remove('animation-chao2-5');
    chao1.classList.add('animation-chao1-6');
    chao2.classList.add('animation-chao2-6');
  }else if(score > 90 && score < 100 && pipePosition < -80){
    pipe.classList.remove('animation-pipe-9')
    pipe.classList.add('animation-pipe-10')
  }else if(score > 100 && score < 110 && pipePosition < -80){
    pipe.classList.remove('animation-pipe-10')
    pipe.classList.add('animation-pipe-11')
  }

  requestAnimationFrame(loop)
}

loop()

document.addEventListener('keydown', jump);