// IMPORTS
import {Player} from './player/player.js'  
import {Virus} from './obstacle/obstacle.js'

// ELEMENTEN
const playerDOM = document.querySelector('#player');
const grid = document.querySelector('.grid');
let obstacles = [];
let lives = document.querySelector('#lives');

let player = new Player(playerDOM);

// GAME CONTROLS
function keyDown(e){
    if(e.keyCode == 32){
        if(!player.jump){
            player.velocity = 30;
        }
    }
}

function keyUp(e){
    if(e.keyCode == 32){
        if(player.velocity > 2){
            player.velocity = -3;
        }
    }
}

// GAME
function gameLoop(){
    player.renderPlayer();
    renderObstacles();
}

function spawnObstacles(){
    obstacles.push(new Virus(1800,grid));
    console.log(obstacles);
    setTimeout(spawnObstacles, Math.random() * 5000);  

}

function renderObstacles(){
    if(obstacles.length != 0){
        let index = 0;

        obstacles.forEach(e => {
            e.renderVirus();
            collision(player,e);
            if(e.checkBoundary()){
                obstacles.splice(index, index);
            }
            index++;
        });
    }
}



function collision(player, virus){
    if(virus.position <= 320 && virus.position >= 120 && player.position <= 130 && player.position >= 30 && virus.hitPlayer == false){
        player.lives--;
        virus.hitPlayer = true;
        virus.element.classList.add('hit-player');       
        lives.innerHTML = player.lives;
        if(player.lives === 0){
            alert('game over');
        }
    }
}

let level = document.querySelector('#level');

let scoreCounter = document.querySelector('#score-counter');
let counter = 0;

function scoreIsCounting (){
    let timerId = setInterval(function(){
        if(player.lives === 0){
            clearInterval(timerId);
        } else {
            counter += 1;
            scoreCounter.innerHTML = counter; 
        }

    },20);

}
scoreIsCounting ()


function cleanUpHTML(){
    let canBeDeleted = document.querySelectorAll('.canBeDeleted');
    canBeDeleted.forEach(e => {
        e.parentNode.removeChild(e);
    })
}




export function startGame() {
    // Game Controls
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    document.addEventListener("touchstart", keyDown);
    document.addEventListener("touchend", keyUp);

    setInterval(gameLoop,20); 
    spawnObstacles();  
    setInterval(cleanUpHTML,10000);  
}

