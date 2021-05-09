const GRAVITY = 1.5;
const GROUND = 115;

export class Player {
    constructor(element){
        this.position = GROUND;
        this.score = 0;
        this.lives = 3;
        this.jump = false;
        this.velocity = 0;
        this.element = element;
        this.shielded = false;
        this.immune = false;
    }


    shieldPlayer(){
        this.shielded = true;
        this.element.classList.add('shielded');

        let shieldByMask = document.querySelector('.shield-by-mask');
        shieldByMask.classList.remove('hidden');
        console.log('shielded');
    }

    removeShield(){
        this.shielded = false;
        this.element.classList.remove('shielded');

        let shieldByMask = document.querySelector('.shield-by-mask');
        shieldByMask.classList.add('hidden');
        console.log('not shielded');
    }

    vaccinatePlayer(){
        this.immune = true;
        this.element.classList.add("immune");
        let clock = document.querySelector(".clock");
        clock.classList.remove("hidden");
    
        let timeLeft = 10;
    
        let interval = setInterval(() => {
            document.getElementById("seconds").innerHTML = timeLeft;
    
            timeLeft--;
    
            if(timeLeft < 0){
                clearInterval(interval);
                this.immune = false;
                this.element.classList.remove('immune');
                clock.classList.add('hidden');
            }
    
        },1000)
    }



    renderPlayer(){

        if(this.jump){
            this.velocity -= GRAVITY;
        }
        
        this.jump = true;
        this.position += this.velocity;

        if(this.position <= GROUND){
            this.jump = false;
            this.position = GROUND;
        }

        this.element.style.bottom = this.position + 'px';
    }

    setPlayerImage(image){
        let player = document.getElementById('playerimage');
        player.setAttribute('src', 'img/'+ image +'.png');
    }

}
