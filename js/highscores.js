// neem de array vast uit de gethighscore.
// ga na of de score groter is dan het eerste getal in de array
// Als dit zo is wordt de laatste uit de Array verwijderd en de eerste vervangen door de score.

export function writeHighscore(score){
    let highscores = getHighscores();
    if(score > highscores[0]){
        highscores.pop();
        highscores.unshift(score);
        setScoreCookie(highscores);
    }
}

// neem de cookie vastmet de naam highscores.
// kijk of de cookie iets bevat.
// als dit niet het geval is dan krijgt die een array met nullen mee en wordt dat overgeschreven naar je cookie.
// de string die je terugkrigjt van je getCookie en wordt omgezet naar een Array. 

export function getHighscores(){
    let highscores = getCookie("highscores");
    if(highscores === ""){
        highscores = [0,0,0,0,0];
        setScoreCookie(highscores);
    }

    return JSON.parse(highscores);
}

// Maak een cookie aan met de naam highscore en zet deze om naar een string
// highscore = array (zie hierboven)

export function setScoreCookie(highScores){
    document.cookie = "highscores=" + JSON.stringify(highScores);
}

// uitgel cookie op W3Schools
// https://www.w3schools.com/js/js_cookies.asp

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }




