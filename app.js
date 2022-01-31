import Ball from './ball.js';
import Player from './player.js';
import Middle from './middleVertical.js';

const ball = new Ball(document.getElementById('ball'));
const player = new Player(document.getElementById('player-paddle'));
const computer = new Player(document.getElementById('computer-paddle'));
const middleVertical = new Middle(document.getElementById('middle-paddle'))
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
console.log(computerScoreEl)


let lastTime = 1  // by default it is null but we set it to 1 to start game faster
function update(time) {
    if (lastTime != null) {
        const deltaTime = time - lastTime;
        ball.update(deltaTime, [player.rect(), computer.rect(), middleVertical.rect()]);
        computer.update(deltaTime, ball.y);
        middleVertical.updateMiddle(deltaTime, ball.x, ball.y);
        const hue = Number(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
        document.documentElement.style.setProperty('--hue', hue + deltaTime * 0.01);

        if (isLost()) handleLost();
     }
    
    lastTime = time;
    requestAnimationFrame(update);
}


function isLost() {
    const rect = ball.rect();
    return rect.left <= 0 || rect.right >= window.innerWidth
}

function handleLost() {
    const rect = ball.rect();
    if (rect.left <= 0) {
        computerScoreEl.textContent  = parseInt(computerScoreEl.textContent ) + 1;
    } else {
        playerScoreEl.textContent  =  parseInt(playerScoreEl.textContent ) + 1;
    }
    ball.reset();
    computer.reset();
    player.reset();
    middleVertical.reset();
}

document.addEventListener('mousemove', event => {
    player.position = ( event.y / window.innerHeight ) * 100 ;
    if (player.position < 5) {
        player.position = 5;
    }
    if (player.position > 95) {
        player.position = 95;
    }
});

/// --------- computer player içinde aynısı yapılacak

window.requestAnimationFrame(update);
// calling inside and outside of the function we are creating
// infinite loop