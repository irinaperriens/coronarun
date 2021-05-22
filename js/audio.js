console.log('hello world');
let clickSound = new Audio('./audio/click.mp3');
let button = document.querySelectorAll('.sound');

for (let i = 0; i < button.length; i++) {
    button[i].onmouseenter = function(){
        clickSound.play(); 
    }
}
