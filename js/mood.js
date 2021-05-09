let moods = document.querySelectorAll(".mood");
console.log(moods.length);

for (let i = 0; i < moods.length; i++) {
        moods[i].addEventListener("click",function(){
    
        let mood = moods[i].getAttribute('data-mood');
        console.log(mood);
        window.location.href = mood + "video.html";
    })
}