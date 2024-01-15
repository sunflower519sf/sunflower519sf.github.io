
const audioButton = document.getElementById('startButton');
const asks = document.querySelectorAll(".answer");

let askCount = 0;
let errorCheck = false


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
            },
            elements: {
                line: {
                    hide: false // 禁用點擊線段時隱藏的功能
                }
            }
        }
    }
    const myChart = new Chart(ctxChart, configChart);
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

    fetch('setting.json')
    .then(response => response.json())
    .then(data => {
        window.data = data;
        askReplace();

        if (!(window.errorCount = localStorage.getItem("errorCount"))) {
            window.errorCount = Array(data.ask.length).fill(0);
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


