document.addEventListener('DOMContentLoaded', () => {

    // ELEMENTEN

    const dino = document.querySelector('.dino');
    let grid = document.querySelector('.grid');
    const gameOverAlert = document.querySelector('#game-over');
    let jumping = false;
    let gravity = 0.9;
    let gameOver = false;
    let scoreCounter = document.querySelector('#score-counter');
    let lives = 3;
    let livesContainer = document.querySelector('#lives');
    let explainerVideo = document.querySelector('#explainerVideo');

    // CONTROLS

    function control(e){
        if(e.keyCode === 32){
            if(jumping === false){
                jumping = true;
                jump();
            }
        }
    }
    document.addEventListener('keyup', control)

    // SPRINGEN EN VALLEN

    let position = 0;
    function jump(){
        let count = 0; 
        let timerId = setInterval(function(){

            // beneden
            if(count === 20){
                clearInterval(timerId);
                console.log('down');
                let downTimerId = setInterval(function(){ 
                    if(count === 0){
                        clearInterval(downTimerId);
                        jumping = false;
                    }
                    position -= 4
                    count --
                    position = position * gravity;
                    dino.style.bottom = position +'px'
                },20)
            };
            
            // springen
            console.log('jump');
            count ++;
            position += 30;
            position = position * gravity;
            dino.style.bottom = position +'px';
            console.log(dino.style.bottom);
        },20);
    }

    // OBSTAKELS 

    function generateObstacles(){

        let randomTime = Math.random() * 5000

        let obstaclePosition = 1500;
        const obstacle = document.createElement('div');
        if(!gameOver) obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';

        let timerId = setInterval(function(){

            if(obstaclePosition > 0 && obstaclePosition < 160 && position < 160){
                
                gameOver = true;
                explainerVideo.classList.remove('invisible');
                gameOverAlert.innerHTML = 'Game Over!'

               
                clearInterval(timerId);
            }

            obstaclePosition -=10;
            obstacle.style.left = obstaclePosition + 'px'
        },20);
        
        if(!gameOver)  setTimeout(generateObstacles, randomTime);
    }

    function hit(){
        lives--;
        livesContainer.innerHTML = lives;
        if(lives == 0){
            gameOver = true;
            explainerVideo.classList.remove('invisible');
            gameOverAlert.innerHTML = 'Game Over!'
        } 
    }

    generateObstacles()


    // NAVIGATIE
    // #SCORE TELLER

    scoreCounter;

    function scoreIsCouunting (){
        let counter = 0;

        let timerId = setInterval(function(){

            if(gameOver === true){
                clearInterval(timerId);
            } else {
                counter += 1;
                scoreCounter.innerHTML = counter; 
            }

        },20);
    }

    scoreIsCouunting ()

    // moving bg


});