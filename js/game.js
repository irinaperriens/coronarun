// IMPORTS
import {Player} from './player/player.js'  
import {Virus} from './obstacle/obstacle.js'
import {Facemask} from './obstacle/facemask.js'
import {Vaccin} from './obstacle/vaccin.js'
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
    let random = Math.floor(Math.random()*100)+1;
    if(random < 10){
        obstacles.push(new Vaccin(screenSize+100,grid));
    } else if(random > 10 && random < 30){
        obstacles.push(new Facemask(screenSize+100,grid));
    } else {
        obstacles.push(new Virus(screenSize+100,grid));
    }
    console.log(obstacles);
    spawnObstaclesInterval = setTimeout(spawnObstacles, Math.floor(Math.random()*3000)+1000);  
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



function collision(player, obstacle){
    if(obstacle.position <= 320 && obstacle.position >= 120 && player.position <= 130 && player.position >= 30 && obstacle.hitPlayer == false){

        if(obstacle.type == 'virus' && player.shielded == false && player.immune == false){
            player.lives--;
        } else if(obstacle.type == 'virus' && player.shielded == true && player.immune == false){
            player.removeShield();
        }
         else if(obstacle.type == 'facemask'){
            player.shieldPlayer();
        } else if(obstacle.type == 'vaccin'&& player.immune == false){
            player.vaccinatePlayer();
        }

        obstacle.hitPlayer = true;
        obstacle.element.classList.add('hit-player');       
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
    startRoad(3,setRoadImages[0], 1080, 'road');
    startCity(1,"city", screenSize, 'city');
}

export function stopGame(){

    highscores.writeHighscore(counter);
    console.log(highscores.getHighscores());

    clearInterval(gameLoopInterval);
    clearInterval(cleanupInterval);
    clearTimeout(spawnObstaclesInterval);    
}

