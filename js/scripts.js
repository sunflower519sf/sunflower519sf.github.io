const fireworkContainer = document.querySelector('.backGround');
const audioButton = document.getElementById('startButton');
const asks = document.querySelectorAll(".answer");

var askAudio1 = document.getElementById('ask-audio1');
var askmusic = document.getElementById('ask-music');
let musicEnd = false;
let lastTime = 0;

asdEndMsg = document.getElementById('ask-audio2');

let askCount = 0;
let errorCheck = false;


const elts = {
    text1: document.getElementById("bless-text1"),
    text2: document.getElementById("bless-text2")
};

const texts = [
    "", "", "新的一年 在這個新的開始", "希望您能夠放下煩惱", "不要為了小事傷心", "走出困境的唯一方式是面對它", "我們要勇敢面對生活種的挑戰和困難", "相信自己可以克服任何障礙", "在這美好的日子", "請接受我最真誠的新年祝福", "龍年行大運 福自照家門", "好運連連 事業有成", "幸福安康夢想成真", "一切都能如您所願", "一切都能讓您開心"
];

const morphTime = 7;
const cooldownTime = 0.25;

let textIndex = 0; // 從0開始
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;


function goToEnd() {
    document.querySelectorAll('.now-bless').forEach(element => {element.style.display = 'none';});
    const jumpEnd = setInterval(() => {
        console.log("等待音樂")
        if (musicEnd) {
            console.log("等待跳轉")
            clearInterval(jumpEnd);
            window.location = "end.html";
        } else {
            document.querySelectorAll('.wait-music').forEach(element => {element.style.display = 'block';});
            document.getElementById('go-to-end').addEventListener('click', function() {
                window.location = "end.html";
            });
        }
    }, 1000);
}



function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    // 設置顯示文字的span
    const currentText = texts[textIndex % texts.length];
    const nextText = texts[(textIndex + 1) % texts.length];
    elts.text1.textContent = currentText;
    elts.text2.textContent = nextText;

    // 設置文字透明度和模糊效果
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();

        if (textIndex >= texts.length) {
            // 顯示完所有文本後執行endFunction()
            goToEnd()
        }
    } else {
        doCooldown();
    }
}


function endBefore(){
    document.querySelectorAll('.now-ask').forEach(element => {element.style.display = 'none';});
    askmusic.currentTime = lastTime;
    askmusic.play();
    setTimeout(() => {
        document.querySelectorAll('.now-bless').forEach(element => {element.style.display = 'block';});
        animate()
    }, 3000);
    
}


function endPage(msgFM) {
    askmusic.pause();
    lastTime = askmusic.currentTime;
    if (msgFM == "noError") {
        asdEndMsg.src = "https://github.com/sunflower519sf/lunarNY2024/blob/main/audio/ask-noError.MP3?raw=true";
        asdEndMsg.play();
    } else if (msgFM == "yesError") {
        asdEndMsg.src = "https://github.com/sunflower519sf/lunarNY2024/blob/main/audio/ask-yesError.MP3?raw=true";
        asdEndMsg.play();
    }
    asdEndMsg.addEventListener('ended', function() {
        setTimeout(() => {
            console.log('時間到 即將跳轉...');
            endBefore()
        }, 3000);
    });
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


function endChart() {
    
    let errorLable = [''];
    for(let i = 1; i < errorCount.length; i++) {
        if (!errorCount[i] == 0) {
            errorCheck = true
        }
        errorLable[i] = `題目${[i]}`;
    }

    const ctxChart = document.getElementById('myChart');
    const configChart = {
        type: 'line',
        data: {
            labels: errorLable,
            datasets: [{
                label: '每題答錯次數',
                data: errorCount,
                fill: false,
                borderColor: 'rgb(0, 192, 192)',
                backgroundColor: 'rgb(0, 192, 192)',
                borderWidth: 5,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: '答錯次數統計',
                color: "rgb(255, 255, 255)",
                font: {
                    size: 50
                }
              },
              legend: {
                display: false // 禁用图例
              }

            },
            scales: {
              x: {
                display: true,
                title: {
                    display: true,
                    text: '題號',
                    color: "rgb(255, 255, 255)",
                    font: {
                        size: 50
                    }
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.5)"
                },
                ticks:{
                    font:{
                        size: 25
                        
                    },
                    color: "white"
                    
                }
              },
              y: {
                display: true,
                min: 0,
                title: {
                    display: true,
                    text: '錯誤次數',
                    color: "rgb(255, 255, 255)",
                    font: {
                        size: 50
                    }
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.5)"                    
                },
                ticks:{
                    font:{
                        size: 25
                    },
                    color: "white",
                    stepSize: 1
                }
              }
            }
        }
    }


    if (errorCheck){
        const myChart = new Chart(ctxChart, configChart);
        endPage("yesError");
    } else {
        document.querySelectorAll('.pageEnd').forEach(element => {element.style.display = 'none';});
        document.querySelectorAll('.endNoError').forEach(element => {element.style.display = 'block';});
        const fireworks = new Fireworks(fireworkContainer, {
            speed: 4,
            acceleration: 1.05,
            friction: 1,
            gravity: 4,
            particles: 400,
            explosion: 10
        });
        fireworks.start();
        endPage("noError");
    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}  

function askEnd() {
    document.querySelector(".pageAsk").style.display = "none";
    document.querySelector(".pageEnd").style.display = "block";
    document.querySelector(".backGround").style.backgroundImage = "url(../img/background-dark.jpg)";
    endChart();
}

function askError() {
    document.querySelector(".pageStart").style.display = "block";
    document.querySelector(".pageAsk").style.display = "none";
    errorCount[askCount]++;
    localStorage.setItem("errorCount", JSON.stringify(errorCount));
    askCount = 0;
}

function askReplace() {
    asks.forEach(element => {
        element.classList.add('correct-animation');
    });
    if (askCount < data.ask.length){
        const ansData = data.ask[askCount].ans;
        window.askAns = data.ask[askCount].ans[0];
        shuffleArray(ansData);

        document.querySelector(".ask").innerText = data.ask[askCount].ask;
        asks[0].innerText = ansData[0];
        asks[1].innerText = ansData[1];

        askCount++;
    } else {
        askEnd();
    }
}


document.getElementById('startButton').addEventListener('click', function() {
    document.querySelector(".pageStart").style.display = "none";
    document.querySelector(".pageAsk").style.display = "block";

    askAudio1.src = "https://github.com/sunflower519sf/lunarNY2024/blob/main/audio/ask-audio1.MP3?raw=true"
    askAudio1.play();
    askAudio1.addEventListener('ended', function() {
        askmusic.src = "https://github.com/sunflower519sf/lunarNY2024/blob/main/audio/ask-music.MP3?raw=true"
        askmusic.play();
        askmusic.addEventListener('ended', function() {
            musicEnd = true
        });
    });


    fetch('setting.json')
    .then(response => response.json())
    .then(data => {
        window.data = data;
        askReplace();

        if (!(window.errorCount = localStorage.getItem("errorCount"))) {
            window.errorCount = Array(data.ask.length+1).fill(0);
        } else {
            window.errorCount = JSON.parse(window.errorCount);
        }
    })
    .catch(error => console.error('取得題目資料時出現錯誤:', error));
});

asks.forEach(button => {
    button.addEventListener('click', (a) => {
        asks.forEach(element => {
            element.classList.remove('correct-animation');
        });

        if (a.currentTarget.innerText == askAns) {
            console.log('答對囉！', a.currentTarget.innerText);
            
            askReplace();
        } else {
            console.log('答錯囉！')
            askError();
        }


    });
});

document.getElementById('check-jump').addEventListener('click', function() {
    document.querySelectorAll('.check-jump').forEach(element => {element.style.display = 'none';});
    document.querySelectorAll('.pageStart').forEach(element => {element.style.display = 'none';});
    endChart();

});


