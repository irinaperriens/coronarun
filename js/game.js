// IMPORTS
import {Player} from './player/player.js'  
import {Virus} from './obstacle/obstacle.js'
import {Facemask} from './obstacle/facemask.js'
import {Vaccin} from './obstacle/vaccin.js'
import {startRoad, renderRoads, setRoadImage} from './background/road.js'
import {startCity, renderCity, setCityImage} from './background/city.js'
import {startSky, renderSkies} from './background/sky.js'
import {startCloud, renderCloud} from './background/clouds.js'
import * as highscore from './highscores.js'

// ELEMENTEN
const playerDOM = document.querySelector('#player');
const grid = document.querySelector('.grid');
let obstacles = [];
let lives = document.querySelector('#lives');
let screenSize = window.innerWidth;
let background = document.querySelector(".game-bg");

let player = new Player(playerDOM);
player.setPlayerImage(highscore.getCookie("character"));


//INTERVALS
let gameLoopInterval;
let spawnObstaclesInterval;
let cleanupInterval;

//ARRAYS

let cityImages = ['city','city1','city2','city3', 'city4', 'city5', 'city6', 'city7', 'city8', 'city9']
let roadImages = ['road','road1','road2','road3', 'road4', 'road5','road6', 'road7', 'road8', 'road9']

// GAME CONTROLS
function keyDown(e){
    if(e.keyCode == 32){
        if(!player.jump){
            player.velocity = 40;
            let jumpSound = new Audio('/audio/jump.mp3');
            jumpSound.play();
        }
    }
}

/*function keyUp(e){
    if(e.keyCode == 32){
        if(player.velocity > 2){
            player.velocity = -3;
        }
    }
}*/

function touchDown(){
        if(!player.jump){
            player.velocity = 40;
            let jumpSound = new Audio('/audio/jump.mp3');
            jumpSound.play();
        }
}

/*function touchUp(){
    
        if(player.velocity > 2){
            player.velocity = -3;
        }
    
}*/

// GAME
function gameLoop(){
    player.renderPlayer();
    renderObstacles();
    renderRoads(screenSize);
    renderCity(screenSize);
    renderSkies(screenSize);
    renderCloud(screenSize);
    renderSkies(screenSize);
}

function spawnObstacles(){
    let random = Math.floor(Math.random()*100)+1;
    if(random < 10){
        obstacles.push(new Vaccin(screenSize+100,grid));
    } else if(random > 10 && random < 20){
        obstacles.push(new Facemask(screenSize+100,grid));
    } else {
        obstacles.push(new Virus(screenSize+100,grid));
    }
    console.log(obstacles);
    spawnObstaclesInterval = setTimeout(spawnObstacles, Math.floor(Math.random()*1200)+500);  
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
    if(obstacle.position <= 220 && obstacle.position >= 120 && player.position <= 130 && player.position >= 30 && obstacle.hitPlayer == false){
        let hitSound = new Audio('./audio/hit.mp3');
        let maskSound = new Audio('./audio/masksound.mp3');
        let vaccineSound = new Audio('./audio/vaccin.mp3');
        if(obstacle.type == 'virus' && player.shielded == false && player.immune == false){
            player.lives--;
            hitSound.play();
        } else if(obstacle.type == 'virus' && player.shielded == true && player.immune == false){
            player.removeShield();
        }
         else if(obstacle.type == 'facemask'){
            player.shieldPlayer();
            maskSound.play();
        } else if(obstacle.type == 'vaccin'&& player.immune == false){
            player.vaccinatePlayer();
            vaccineSound.play();
        }

        



        obstacle.hitPlayer = true;
        obstacle.element.classList.add('hit-player');       
        lives.innerHTML = player.lives;

        if(player.lives === 0){
            stopGame();
            backgroundMusic.pause();
            let gameover = document.querySelector('.gameover');
            let gameOverScore = document.querySelector('.gameover-score');
            gameOverScore.innerHTML = counter;
            gameover.classList.add("visible");
            let gameoverSound = new Audio('./audio/gameover.mp3');
            gameoverSound.play();
            //stopGame();
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
            let highscores = highscore.getCookie("highscores");
    if(highscores === ""){
        highscores = [0,0,0,0,0];
        highscore.setScoreCookie(highscores);
    }

    return JSON.parse(highscores);
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
        if(levelCounter < cityImages.length){
            setCityImage(cityImages[levelCounter-1]);
            setRoadImage(roadImages[levelCounter-1]);
        } else {
            setCityImage(cityImages[cityImages.length-1]);
            setRoadImage(roadImages[roadImages.length-1]);
        }
    }
    changeBackgroundGradient(levelCounter);
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
    //document.addEventListener("keyup", keyUp);
    document.addEventListener("touchstart", touchDown);
    //document.addEventListener("touchend", touchUp);
    window.addEventListener('scroll', noScroll);
    console.log(screenSize);

    gameLoopInterval =  setInterval(gameLoop,8); 
    spawnObstacles();  
    cleanupInterval = setInterval(cleanUpHTML,10000);  
    startRoad(5, 1080, 'road');
    startCloud(1.1,"cloud", screenSize, 'cloud');
    startSky(0.8, screenSize, 'sky');
    startCity(4, 1080, 'city');

    backgroundMusic.play();
}

export function stopGame(){

    highscore.writeHighscore(counter);
    console.log(highscore.getHighscores());

    clearInterval(gameLoopInterval);
    clearInterval(cleanupInterval);
    clearTimeout(spawnObstaclesInterval);    
}


// ACHTERGROND MUZIEK


let backgroundMusic = new Audio('./audio/bg-music.mp3');
let isPlaying = true; 
let soundButton = document.querySelector('.togglemusic');

soundButton.addEventListener('click', togglePlay);

function togglePlay() {
    if(isPlaying){
        backgroundMusic.pause();
        soundButton.innerHTML = '&#128266;'
    } else {
        backgroundMusic.play();
        soundButton.innerHTML = '&#128264;'
    }
  };
  
  backgroundMusic.onplaying = function() {
    isPlaying = true;
  };
  backgroundMusic.onpause = function() {
    isPlaying = false;
  };

  //Achtergrond gradients
  function changeBackgroundGradient(levelCounter){
      if(levelCounter <= 10){
        background.classList.remove('g' + (levelCounter -1));
        background.classList.add('g' + levelCounter);
      }
  }