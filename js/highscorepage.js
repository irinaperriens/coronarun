import * as highscores from './highscores.js'


let highscoreList = document.querySelectorAll('.highscore');
let allHighscores = highscores.getHighscores();

for (let i = 0; i < highscoreList.length; i++) {
    highscoreList[i].innerHTML = allHighscores[i];
}