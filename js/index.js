const countdownElement = document.getElementById('countdown');


const countToDate = new Date("Feb 10, 2024 0:0:0").getTime();
// const countToDate = new Date("Dec 31, 2023 14:8:0").getTime();
var eveAudio = document.getElementById('eve-audio');



function eveVideoYes() {
    document.querySelectorAll('.start-eve').forEach(element => {element.style.display = 'none';});
    document.querySelector(".eve-video").style.display = "block";
}

function eveVideoNo() {
    eveAudio.src = "https://github.com/sunflower519sf/lunarNY2024/blob/main/audio/eve-video.MP3?raw=true"
    document.querySelectorAll('.start-eve').forEach(element => {element.style.display = 'none';});
    eveAudio.play()
    eveAudio.addEventListener('ended', function() {
        document.querySelectorAll('.start-eve').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.eve-end').forEach(element => {element.style.display = 'block';});
    });
}

const now = new Date().getTime();
const distance = countToDate - now;
if (distance > 0) {
    document.querySelectorAll('.eve-before').forEach(element => {element.style.display = 'block';});
}
const countdownInterval = setInterval( () => {
    const now = new Date().getTime();
    const distance = countToDate - now;


    if (distance < 0) {
        document.querySelectorAll('.start-NY').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.start-lunarNY').forEach(element => {element.style.display = 'block';});
        




    } else {
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        countdownElement.innerHTML = `距離節目開始還有${days}天 ${hours}小時 ${minutes}分 ${seconds}秒`;
    }


}, 1000);


document.getElementById('startButton').addEventListener('click', function() {
    document.querySelectorAll('.eve-before').forEach(element => {element.style.display = 'none';});
    document.querySelectorAll('.eve-after').forEach(element => {element.style.display = 'block';});

    eveAudio.play()
    eveAudio.addEventListener('ended', function() {
        document.querySelectorAll('.eve-after').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.start-eve').forEach(element => {element.style.display = 'block';});
    });
});



document.getElementById('startButton-NY').addEventListener('click', function() {
    
    

});




