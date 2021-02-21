
const clock=document.querySelector('.js-clock');
const time=clock.querySelector(".js-clock-Time");
const ampm=clock.querySelector(".js-clock-AmPm");

function clocking(){
    const now=new Date();
    const Hour=now.getHours();
    const Minute=now.getMinutes();
    const Second=now.getSeconds();
    time.innerText=`${Hour<12?(Hour<10?`0${Hour}`:Hour):(Hour-12<10?`0${Hour-12}`:Hour-12)} : ${Minute < 10 ? `0${Minute}` : Minute}`; 
    ampm.innerText=`${Hour<13?"AM":"PM"}`;
}

function init(){
    clocking();
    setInterval(clocking,1000);
}

init();