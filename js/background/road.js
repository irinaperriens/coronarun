let roadArray = [];
let imageUrl;
class Road {
    constructor(position, speed, width,_class){
        this.position = position;
        this.speed = speed;
        this.width = width;
        this._class = _class;
        this.element = document.createElement('img');

        this.element.setAttribute('src', 'img/' + imageUrl + '.png');
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
            createRoad(screenSize,this.speed,this.width,this._class)
            return true;   
        }
    }

}

function createRoad(position, speed, width,_class){
    roadArray.push(new Road(position-100, speed, width,_class));
}

export function setRoadImage(img){
    imageUrl = img;
}

export function startRoad(speed, image, width, _class){
    setRoadImage(image);
    for (let index = 0; index < 4 ; index++) {
        createRoad(width *index, speed, width, _class);
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





