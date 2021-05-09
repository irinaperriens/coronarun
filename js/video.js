let videos = document.querySelectorAll('.video');
let numberOfVideos = document.querySelector('.videocontainer').getAttribute('data-number-of-videos');

let random = Math.floor(Math.random()*numberOfVideos)+1;

for (let i = 0; i < videos.length; i++) {
    let videoNumber = videos[i].getAttribute('data-index');
    if(videoNumber != random){
        videos[i].classList.add('hidden');
    }
    
}