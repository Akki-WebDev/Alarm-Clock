//  Changing Color theme of the Alarm Clock
let themeToggler = document.getElementById('theme_toggler');

themeToggler.onclick = () => {
    // themeToggler.classList.remove("fa-solid");
    // themeToggler.classList.remove("fa-moon");
    // themeToggler.classList.add("fa-solid");
    // themeToggler.classList.add("fa-sun");

    themeToggler.classList.toggle("bi-sun");
    if(themeToggler.classList.contains('bi-sun')){
        document.body.classList.add('active');
    }else{
        document.body.classList.remove('active');
    }
};

// Declaring elements
let alarmTime,
ringtone = new Audio("./static/Alarm Clock Alarm.mp3");
 
// function to display Time in Clock
function displayTime() {
    let currTime = new Date();
    let hrs = showZero(currTime.getHours());
    let min = showZero(currTime.getMinutes());
    let sec = showZero(currTime.getSeconds());

    // Getting Current Dates
    let date = showZero(currTime.getDate());
    let month = showZero(currTime.getMonth()+1);
    let year = currTime.getFullYear();

    let session = document.querySelector('.session');
    if (hrs >= 12) {
        session.innerHTML = 'PM';
    } else {
        session.innerHTML = 'AM';
    }
    if (hrs > 12) {
        hrs = showZero(hrs - 12);
    }

    document.querySelector('.curr_date').innerText = `${date}/${month}/${year}`;

    document.querySelector('.time').innerText = `${hrs}:${min}:${sec}`;

    // Code to Play ringtone of alarms
    if (alarmTime == `${hrs}:${min} ${"PM"}`){
       ringtone.play();
       ringtone.loop = true;
    }else if(alarmTime == `${hrs}:${min} ${"AM"}`){
       ringtone.play();
       ringtone.loop = true;
    }

}

setInterval(displayTime, 1000);

// function to show formatted time (Adding zeros)
function showZero(time) {
    return time < 10 ? `0${time}` : time;
}

// Putting Options In Select Menu of Hours & Minutes
const selectMenu = document.querySelectorAll("select");

for (let i=12; i>0; i--){
    i = i < 10 ? "0" + i: i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i=59; i>=0; i--){
    i = i < 10 ? "0" + i: i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i=2; i>0; i--){
    let ampm = i == 1 ? "AM": "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Declarations and Function of Setting Alarm 
const alarmBtn = document.querySelector('.add_alarm');
const alarmListContainer = document.querySelector('#alarm_list_container')
// const alarmTime = document.querySelector('.set_time');

function setAlarm(){
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
   
    if (time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("Please enter valid time to set Alarm");
    }else{
        alarmListContainer.innerHTML += `<div class="alarms_list">
        <p class="set_time">${time}</p>
        <button type="button" class="del_alarm"> <i class="fa-solid fa-trash"></i> Delete </button>
    </div>`
    }

    alarmTime = time;   
}
alarmBtn.addEventListener("click", setAlarm);

// Function for Deleting Alarms
function deleteAlarm(e) {
    if (e.target.classList.contains('del_alarm')) {
      const alarmItem = e.target.closest('.alarms_list');
      alarmItem.remove();
    }
  }

alarmListContainer.addEventListener("click", deleteAlarm);



















