

let characters = document.querySelectorAll(".character");
console.log(characters.length);


for (let i = 0; i < characters.length; i++) {


    characters[i].addEventListener("click",function(){
    
        let gender = characters[i].getAttribute('data-gender');
        console.log(gender);
        document.cookie = "character=" + gender;
        window.location.href = "game.html";
    })
}
