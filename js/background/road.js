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
		this.element.style.left = position + 'px';
        let grid = document.querySelector('.background');
        grid.appendChild(this.element);
    }

    renderRoad(){
        this.position -= this.speed;
        this.element.style.left = this.position + 'px';
    }

    checkBoundary(screenSize){
        if(this.position <= -this.width){
            this.element.classList.add("canBeDeleted");
            return true;   
        }
    }
}

function createRoad(position, speed, width,_class){
    roadArray.push(new Road(position, speed, width,_class));
}

export function setRoadImage(img){
    imageUrl = img;
}

export function startRoad(speed, image, width, _class){
    setRoadImage(image);
    for (let index = 0; index < 3 ; index++) {
        createRoad(width *index, speed, width, _class);
    }
}




export function renderRoads(screenSize){
    var newroad_needed = false;
	var this_width = 0;
	var this_speed = 0;
	var this_class = "";
	if(roadArray.length != 0){
            roadArray.forEach(e=>{
                e.renderRoad();
                if(e.checkBoundary(screenSize)){
                    newroad_needed = true;
					this_width = e.width;
					this_speed = e.speed;
					this_class = e._class;
                }
            }

        )
		if (newroad_needed) {
			  roadArray.shift();
			  createRoad((this_width*2),this_speed,this_width,this_class)
		}
    }
}





