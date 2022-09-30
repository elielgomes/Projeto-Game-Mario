const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
let displayScore = document.getElementById("text-score")
let pipePosition;
let score = 0;
let nivel;

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

  if (score > 10 && score < 20) {
    nivel = 1;
  } else if (score > 20 && score < 30) {
    nivel = 2;
  } else if (score > 30 && score < 40) {
    nivel = 3;
  } else if (score > 40 && score < 50) {
    nivel = 4;
  } else if (score > 50 && score < 60) {
    nivel = 5;
  } else if (score > 60 && score < 70) {
    nivel = 6;
  } else if (score > 70 && score < 80) {
    nivel = 7;
  } else if (score > 80 && score < 90) {
    nivel = 8;
  } else if (score > 90 && score < 100) {
    nivel = 9;
  } else if (score > 100 && score < 110) {
    nivel = 10;
  }


  console.log(nivel)
  



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

    clearInterval(loop);
    clearInterval(increaseScore);


  }

  if (pipePosition < -80) {

    switch (nivel) {
      case 1:
        pipe.style.animationDuration = '1900ms';
        break
      case 2:
        pipe.style.animationDuration = '1800ms';
        break
      case 3:
        pipe.style.animationDuration = '1700ms';
        break
      case 4:
        pipe.style.animationDuration = '1600ms';
        break
      case 5:
        pipe.style.animationDuration = '1500ms';
        break
      case 6:
        pipe.style.animationDuration = '1400ms';
        break
      case 7:
        pipe.style.animationDuration = '1300ms';
        break
      case 8:
        pipe.style.animationDuration = '1200ms';
        break
      case 9:
        pipe.style.animationDuration = '1100ms';
        break
      case 10:
        pipe.style.animationDuration = '1000ms';
        break
 
    }

  }

  requestAnimationFrame(loop)

}


loop()




document.addEventListener('keydown', jump);