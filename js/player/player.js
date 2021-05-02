const GRAVITY = 1.5;
const GROUND = 30;

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
        console.log('shielded');
    }

    removeShield(){
        this.shielded = false;
        this.element.classList.remove('shielded');
        console.log('not shielded');
    }

    vaccinatePlayer(){
        this.immune = true;
        this.element.classList.add('immune');
        setTimeout(()=>{
            this.immune = false;
            this.element.classList.remove('immune');  
            console.log('gestopt');  
        }, 10000);  
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
}