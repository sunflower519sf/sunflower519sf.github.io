var words = '無法讀取資料';
let index = 0, num = 0, showRun = false;
const imgPath = "img/end/"
var music = document.getElementById('music');
let promptText = '如音樂無正常播放請點擊左上方播放文字開始'
var playButton = document.getElementById('playButton');
const numimg = document.getElementById('end-img')

fetch('setting.json')
.then(response => response.json())
.then(data => {
    window.data = data;
})
.catch(error => console.error('取得資料時出現錯誤:', error));

function showEnd() {
    document.querySelectorAll('.fadeOut').forEach(element => {element.style.display = 'none';});
    document.querySelector(".show-end").style.display = "block";
    setTimeout(() => {
        document.querySelector(".show-end").style.display = "none";
        document.querySelector(".page-end").style.display = "block";
    }, 100000);
}


function wordShow() {
    showRun = true
    setTimeout(() => {
        let part = words.substr(0, index+1);
        document.querySelector('.word').textContent = part;
        index++;
        (index < words.length) ? wordShow() : setTimeout(wordDel, 10000);
    }, 100);
}

function wordDel() {
    document.querySelectorAll('.fadeOut').forEach(element => {element.style.animation = 'fadeOut 5s forwards';});
    setTimeout(() => {
        index = 0;
        showRun = false;
        num += 1;
        (num < data.end.length) ? go() : showEnd();
    }, 5000);
}

function go(){
    if (!showRun) {
        words = "";
        document.querySelector('.word').textContent = "";
        numimg.src = imgPath + data.end[num][0]
        numimg.onload = function() {
            document.querySelectorAll('.fadeOut').forEach(element => {element.style.animation = 'none';});
            for(j=1;j < data.end[num].length;j++) {
                words += data.end[num][j] + "\n";
            }
            wordShow()
        };
    }
}

function prompt() {
    const alertWindow = document.createElement('div');
        alertWindow.textContent = promptText;
        alertWindow.style.position = 'fixed';
        alertWindow.style.bottom = '10px';
        alertWindow.style.left = '50%';
        alertWindow.style.transform = 'translateX(-50%)';
        alertWindow.style.background = 'rgba(0, 0, 0, 0.5)';
        alertWindow.style.color = '#fff';
        alertWindow.style.padding = '10px';
        alertWindow.style.borderRadius = '5px';
        alertWindow.style.zIndex = '9999';
        document.body.appendChild(alertWindow);
        setTimeout(function() {
            document.body.removeChild(alertWindow);
        }, 5000);
}

setTimeout(() => {
    go();
    music.play();
    prompt();
}, 3000);

window.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('touchstart', function() {
        music.play();
    });
    document.addEventListener('click', function() {
        music.play();
    });
    playButton.addEventListener('click', function() {
        music.play();
    });
});

music.addEventListener('ended', function() {
    promptText = "點擊左上方播放文字可以再次聆聽音樂"
    prompt();
});