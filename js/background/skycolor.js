let skycolorArray = [];
let color;
class Skycolor {
    constructor(position, speed, width,_class){
        this.position = position;
        this.speed = speed;
        this.width = width;
        this._class = _class;
        this.color = color;
        this.element = document.createElement('div');

        this.element.classList.add(_class);
        this.element.style.width = width + 'px';
        this.element.style.backgroundColor = color;
        let grid = document.querySelector('.background');
        grid.appendChild(this.element);
    }

    renderSkycolor(){
        this.position -= this.speed;
        this.element.style.left = this.position + 'px';
    }

    checkBoundary(screenSize){
        if(this.position < -this.width){
            this.element.classList.add("canBeDeleted");
            createSkycolor(screenSize,this.speed,this.width,this._class)
            return true;   
        }
    }

}

function createSkycolor(position, speed, width,_class){
    skycolorArray.push(new Skycolor(position-100, speed, width,_class));
}

export function setSkycolor(newcolor){
    color = newcolor;
}

export function startSkycolor(speed, color, width, _class){
    setSkycolor(color);
    
    createSkycolor(width, speed, width, _class);
    
}

export function renderSkycolors(screenSize){
    if(skycolorArray.length != 0){
        skycolorArray.forEach(e=>{
                e.renderSkycolor();
                if(e.checkBoundary(screenSize)){
                    skycolorArray.shift();
                }
            }

        )
    }
}





