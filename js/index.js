const countdownElement = document.getElementById('countdown');



const countToDate = new Date("Feb 10, 2024 0:0:0").getTime();
// const countToDate = new Date("Dec 31, 2023 14:8:0").getTime();


const countdownInterval = setInterval( () => {
    const now = new Date().getTime();
    const distance = countToDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    

    countdownElement.innerHTML = `距離節目開始還有${days}天 ${hours}小時 ${minutes}分 ${seconds}秒`;

}, 1000);