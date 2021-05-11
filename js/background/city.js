let cityArray = [];
let imageUrl;
class City {
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

    renderCity(){
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

function createCity(position, speed, width,_class){
    cityArray.push(new City(position, speed, width,_class));
}

export function setCityImage(img){
    imageUrl = img;
}

export function startCity(speed, image, width, _class){
    setCityImage(image);
    for (let index = 0; index < 4 ; index++) {
        createCity(width *index, speed, width, _class);
    }
}

export function renderCity(screenSize){
    var newcity_needed = false;
	var this_width = 0;
	var this_speed = 0;
	var this_class = "";
	if(cityArray.length != 0){
            cityArray.forEach(e=>{
                e.renderCity();
                if(e.checkBoundary(screenSize)){
                    newcity_needed = true;
					this_width = e.width;
					this_speed = e.speed;
					this_class = e._class;
                }
            }

        )
		if (newcity_needed) {
			  cityArray.shift();
			  createCity((this_width*2),this_speed,this_width,this_class)
		}
    }
}





