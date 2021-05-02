export class Vaccin {
    constructor(position, grid){
        this.position = position;
        this.type = 'vaccin';
        this.element = document.createElement('div');
        this.element.classList.add('vaccin');
        grid.appendChild(this.element);
        this.hitPlayer = false;
    }

    renderVirus(){   
        this.position -= 5;
        this.element.style.left = this.position + 'px';
    }

    checkBoundary(){
        if(this.position < -130){
            this.element.classList.add("canBeDeleted");
            return true;
        }
    }
}