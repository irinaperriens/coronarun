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