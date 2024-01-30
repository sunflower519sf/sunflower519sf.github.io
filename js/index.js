const countdownElement = document.getElementById('countdown');


const countToDate = new Date("Feb 10, 2024 0:0:0").getTime();
// const countToDate = new Date("Dec 31, 2023 14:8:0").getTime();
var eveAudio = document.getElementById('eve-audio');
var NYAudio = document.getElementById('NY-audio');
var NYAudio2 = document.getElementById('NY-audio2');


function eveVideoEnd(event) {
    if(event.data === 0) {          
        document.querySelectorAll('.start-eve').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.eve-end').forEach(element => {element.style.display = 'block';});
        document.querySelectorAll('.eve-video').forEach(element => {element.style.display = 'none';});
    }
}

function NYVideoEnd(event) {
    if(event.data === 0) {          
        document.querySelectorAll('.NY-video').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.NY-ask').forEach(element => {element.style.display = 'block';});
        NYAudio2.src = "https://github.com/sunflower519sf/lunarNY2024/blob/main/audio/audio2.MP3?raw=true"
        NYAudio2.play()
        NYAudio2.addEventListener('ended', function() {
            document.querySelectorAll('.NY-ask').forEach(element => {element.style.display = 'none';});
            window.location = "ask.html"
        });
    }
}

// youtube影片播放控制
var youtuPlayer;
function onYouTubePlayerAPIReady(yotuDivID, youtuID, endFunction) {
    youtuPlayer = new YT.Player(yotuDivID, {
        // width: '640',
        // height: '390',
        videoId: youtuID,
        playerVars: {
            controls:0,
            disablekb:1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: endFunction
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

// function onPlayerStateChange(event) {        
//     if(event.data === 0) {          
//         alert('done');
//     }
// }



function eveVideoYes() {
    document.querySelectorAll('.start-eve').forEach(element => {element.style.display = 'none';});
    document.querySelector(".eve-video").style.display = "block";
    onYouTubePlayerAPIReady("eve-video", "KbBOATiwank", eveVideoEnd);
}

function eveVideoNo() {
    eveAudio.src = "https://github.com/sunflower519sf/lunarNY2024/blob/main/audio/eve-video.MP3?raw=true";
    document.querySelectorAll('.start-eve').forEach(element => {element.style.display = 'none';});
    eveAudio.play();
    eveAudio.addEventListener('ended', function() {
        document.querySelectorAll('.start-eve').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.eve-end').forEach(element => {element.style.display = 'block';});
    });
}






const now = new Date().getTime();
const distance = countToDate - now;
if (distance < 0) {
    document.querySelectorAll('.start-NY').forEach(element => {element.style.display = 'none';});
    document.querySelectorAll('.start-lunarNY').forEach(element => {element.style.display = 'block';});
        
} else {
    document.querySelectorAll('.eve-before').forEach(element => {element.style.display = 'block';});

}

const countdownInterval = setInterval( () => {
    const now = new Date().getTime();
    const distance = countToDate - now;


    if (distance < 0) {
        

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

    eveAudio.play();
    eveAudio.addEventListener('ended', function() {
        document.querySelectorAll('.eve-after').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.start-eve').forEach(element => {element.style.display = 'block';});
    });
});


document.getElementById('startButton-NY').addEventListener('click', function() {
    document.querySelectorAll('.lunarNY-before').forEach(element => {element.style.display = 'none';});
    document.querySelectorAll('.lunarNY-after').forEach(element => {element.style.display = 'block';});
    NYAudio.src = "https://github.com/sunflower519sf/lunarNY2024/blob/main/audio/audio1.MP3?raw=true";
    NYAudio.play();
    NYAudio.addEventListener('ended', function() {
        document.querySelectorAll('.lunarNY-after').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.start-lunarNY').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.NY-video').forEach(element => {element.style.display = 'block';});
        onYouTubePlayerAPIReady("NY-video", "WfP-E_7Uoco", NYVideoEnd);
    });

});




