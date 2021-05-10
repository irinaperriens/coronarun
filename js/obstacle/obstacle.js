export class Virus {
    constructor(position, grid){
        this.position = position;
        this.type = 'virus';
        this.element = document.createElement('div');
        this.element.classList.add('virus');
        grid.appendChild(this.element);
        this.hitPlayer = false;
        this.element.style.left = position + 'px';
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