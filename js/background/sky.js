let skyArray = [];
class Sky {
    constructor(position, speed, width,_class){
        this.position = position;
        this.speed = speed;
        this.width = width;
        this._class = _class;
        this.element = document.createElement('img');

        this.element.setAttribute('src', 'img/sky.png');
        this.element.classList.add(_class);
        this.element.style.width = width + 'px';
        let grid = document.querySelector('.background');
        grid.appendChild(this.element);
    }

    renderSky(){
        this.position -= this.speed;
        this.element.style.left = this.position + 'px';
    }

    checkBoundary(screenSize){
        if(this.position < -this.width){
            this.element.classList.add("canBeDeleted");
            return true;   
        }
    }

}

function createSky(position, speed, width,_class){
    skyArray.push(new Sky(position, speed, width,_class));
}


export function startSky(speed, width, _class){
        for (let index = 0; index < 3 ; index++) {
            createSky(width *index, speed, width, _class);
        }
    
}

export function renderSkies(screenSize){
    var newsky_needed = false;
	var this_width = 0;
	var this_speed = 0;
	var this_class = "";
	if(skyArray.length != 0){
            skyArray.forEach(e=>{
                e.renderSky();
                if(e.checkBoundary(screenSize)){
                    newsky_needed = true;
					this_width = e.width;
					this_speed = e.speed;
					this_class = e._class;
                }
            }

        )
		if (newsky_needed) {
			  skyArray.shift();
			  createSky((this_width*2),this_speed,this_width,this_class)
		}
    }
}





