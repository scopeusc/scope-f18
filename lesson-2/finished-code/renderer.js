// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// TODO: PART 4
const ipc = require('electron').ipcRenderer

ipc.on('start timer', function (event, arg) {
    startTimer(arg);
});

var timerStarted = false;

function startTimer(timeInSeconds) {
    if(timerStarted) return;

    timerStarted = true;
    var timerElement = document.getElementById('timer');
    timerElement.innerHTML = formatTimer(timeInSeconds);
    function countdown(){
        --timeInSeconds;
        timerElement.innerHTML = formatTimer(timeInSeconds);
        if(timeInSeconds == 0){
            timerStarted = false;
            alert('Done!');
        }else{
            setTimeout(countdown, 1000);
        }
    }
    setTimeout(countdown, 1000);
}

function formatTimer(timeInSeconds){
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = timeInSeconds % 60;
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
}