let skyArray = [];
let imageUrl;
class Sky {
    constructor(position, speed, width,_class){
        this.position = position;
        this.speed = speed;
        this.width = width;
        this._class = _class;
        this.element = document.createElement('img');

        this.element.setAttribute('src', 'img/' + imageUrl + '.png');
        this.element.classList.add(_class);
        this.element.style.width = width + 'px';
        //this.element.style.backgroundColor = "red";
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
            createSky(screenSize,this.speed,this.width,this._class)
            return true;   
        }
    }

}

function createSky(position, speed, width,_class){
    skyArray.push(new Sky(position-100, speed, width,_class));
}

export function setSkyImage(img){
    imageUrl = img;
}

export function startSky(speed, image, width, _class){
    setSkyImage(image);
    
        createSky(width, speed, width, _class);
    
}

export function renderSkies(screenSize){
    if(skyArray.length != 0){
            skyArray.forEach(e=>{
                e.renderSky();
                if(e.checkBoundary(screenSize)){
                    skyArray.shift();
                }
            }

        )
    }
}





