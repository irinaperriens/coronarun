// IMPORTS
import {Player} from './player/player.js'  
import {Virus} from './obstacle/obstacle.js'
import {startRoad, renderRoads, setRoadImage} from './background/road.js'
import {startCity, renderCity} from './background/city.js'
import * as highscores from './highscores.js'

// ELEMENTEN
const playerDOM = document.querySelector('#player');
const grid = document.querySelector('.grid');
let obstacles = [];
let lives = document.querySelector('#lives');
let screenSize = window.innerWidth;

let player = new Player(playerDOM);

// ARRAYS
let setRoadImages = ['road', 'road1', 'road2'];

//INTERVALS
let gameLoopInterval;
let spawnObstaclesInterval;
let cleanupInterval;

// GAME CONTROLS
function keyDown(e){
    if(e.keyCode == 32){
        if(!player.jump){
            player.velocity = 40;
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

function touchDown(){
        if(!player.jump){
            player.velocity = 40;
        }
}

function touchUp(){
        if(player.velocity > 2){
            player.velocity = -3;
        }
    
}

// GAME
function gameLoop(){
    player.renderPlayer();
    renderObstacles();
    renderRoads(screenSize);
    renderCity(screenSize);
}

function spawnObstacles(){
    obstacles.push(new Virus(screenSize+100,grid));
    console.log(obstacles);
    spawnObstaclesInterval = setTimeout(spawnObstacles, Math.random() * 5000);  
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
            
            let gameover = document.querySelector('.gameover');
            let gameOverScore = document.querySelector('.gameover-score');
            gameOverScore.innerHTML = counter;
            gameover.classList.add("visible");
            stopGame();
        }
    }
}

let level = document.querySelector('#level');
let levelCounter = 1;

let scoreCounter = document.querySelector('#score-counter');
let counter = 0;

function scoreIsCounting (){
    let timerId = setInterval(function(){
        if(player.lives === 0){
            clearInterval(timerId);
        } else {
            counter += 1;
            scoreCounter.innerHTML = counter; 
            checkLevel(counter);
        }

    },20);
}
scoreIsCounting ();

function checkLevel(counter){
    if(counter >= levelCounter*1000){
        levelCounter++;
        if(levelCounter < setRoadImages.length){
            setRoadImage(setRoadImages[levelCounter-1]);
        } else setRoadImage(setRoadImages[setRoadImages.length-1]);
    }
    level.innerHTML = levelCounter;   
}


function cleanUpHTML(){
    let canBeDeleted = document.querySelectorAll('.canBeDeleted');
    canBeDeleted.forEach(e => {
        e.parentNode.removeChild(e);
    })
}

function noScroll(){
    window.scrollTo(0,0);
}

export function startGame() {
    // Game Controls
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    document.addEventListener("touchstart", touchDown);
    document.addEventListener("touchend", touchUp);
    window.addEventListener('scroll', noScroll);
    console.log(screenSize);

    gameLoopInterval =  setInterval(gameLoop,20); 
    spawnObstacles();  
    cleanupInterval = setInterval(cleanUpHTML,10000);  
    startRoad(3,setRoadImages[0], screenSize, 'road');
    startCity(1,"city", screenSize, 'city');
}

export function stopGame(){

    highscores.writeHighscore(counter);
    console.log(highscores.getHighscores());

    clearInterval(gameLoopInterval);
    clearInterval(cleanupInterval);
    clearTimeout(spawnObstaclesInterval);    
}

