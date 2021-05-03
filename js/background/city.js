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
        let grid = document.querySelector('.background');
        grid.appendChild(this.element);
    }

    renderCity(){
        this.position -= this.speed;
        this.element.style.left = this.position + 'px';
    }

    checkBoundary(screenSize){
        if(this.position < -this.width){
            this.element.classList.add("canBeDeleted");
            createCity(screenSize,this.speed,this.width,this._class)
            return true;   
        }
    }

}

function createCity(position, speed, width,_class){
    cityArray.push(new City(position-100, speed, width,_class));
}

export function setCityImage(img){
    imageUrl = img;
}

export function startCity(speed, image, width, _class){
    setCityImage(image);
    for (let index = 0; index < 3 ; index++) {
        createCity(width *index, speed, width, _class);
    }
}

export function renderCities(screenSize){
    if(cityArray.length != 0){
            cityArray.forEach(e=>{
                e.renderCity();
                if(e.checkBoundary(screenSize)){
                    cityArray.shift();
                }
            }

        )
    }
}





