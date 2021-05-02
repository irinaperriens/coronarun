let cloudArray = [];

class Cloud {
    constructor(position, speed, image, width, _class){
        this.position = position;
        this.speed = speed;
        this.image = image;
        this.width = width, 
        this._class = _class,
        this.element = document.createElement('img');

        this.element.setAttribute('src','img/' + image + '.png');
        this.element.classList.add(_class);
        this.element.style.width = width + 'px';
        let grid = document.querySelector('.background');
        grid.appendChild(this.element);
    }

    renderCloud(){
        this.position -= this.speed;
        this.element.style.left = this.position + 'px';
    }

    checkBoundary(screenSize){
        if(this.position < -this.width){
            this.element.classList.add("canBeDeleted");
            createCloud(screenSize,this.speed, this.image,this.width,this._class)
            return true;    
        }
    }
}

function createCloud(position, speed, image, width,_class){
    cloudArray.push(new Cloud(position-100, speed, image, width,_class));
}

export function startCloud(speed, image, width, _class){
    for (let index = 0; index < 2; index++) {
        createCloud(width*index, speed, image, width, _class);
    }
}

export function renderCloud(screenSize){
    if(cloudArray.length != 0){
            cloudArray.forEach(e=>{
                e.renderCloud();
                if(e.checkBoundary(screenSize)){
                    cloudArray.shift();
                }
            }

        )
    }
}
