let roadArray = [];

class Road {
    constructor(position, speed, image, width,_class){
        this.position = position;
        this.speed = speed;
        this.image = image;
        this.width = width;
        this._class = _class;
        this.element = document.createElement('img');

        this.element.setAttribute('src', 'img/' + image + '.png');
        this.element.classList.add(_class);
        this.element.style.width = width + 'px';
        let grid = document.querySelector('.background');
        grid.appendChild(this.element);
    }

    renderRoad(){
        this.position -= this.speed;
        this.element.style.left = this.position + 'px';
    }

    checkBoundary(screenSize){
        if(this.position < -this.width){
            this.element.classList.add("canBeDeleted");
            createRoad(screenSize,this.speed, this.image,this.width,this._class)
            return true;   
        }
    }

}

function createRoad(position, speed, image, width,_class){
    roadArray.push(new Road(position-100, speed, image, width,_class));
}

export function startRoad(speed, image, width, _class){
    for (let index = 0; index < 2; index++) {
        createRoad(width*index, speed, image, width, _class);
    }
}

export function renderRoads(screenSize){
    if(roadArray.length != 0){
            roadArray.forEach(e=>{
                e.renderRoad();
                if(e.checkBoundary(screenSize)){
                    roadArray.shift();
                }
            }

        )
    }
}





