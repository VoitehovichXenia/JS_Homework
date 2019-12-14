var mainButton,
    buttonCollection,
    buttonContainers,
    timerId,
    resetButton,
    saveButton,
    minuteContainer,
    secondContainer,
    millisecondContainer,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    marksCounter = 1;


window.onload = function () {

    if (sessionStorage.getItem('currentState')) {

        document.body.innerHTML = JSON.parse(sessionStorage.getItem('currentState'));
        buttonCollection = document.getElementsByClassName('btn');
        resetButton = buttonCollection[1];
        saveButton = buttonCollection[2];

    } else {

        buttonCollection = document.getElementsByClassName('btn');
        resetButton = document.createElement('button');
        saveButton = document.createElement('button');
    }

    mainButton = document.getElementById('main_button');
    buttonContainers = document.getElementsByClassName('buttons');
    minuteContainer = document.getElementsByClassName('minutes')[0];
    secondContainer = document.getElementsByClassName('seconds')[0];
    millisecondContainer = document.getElementsByClassName('milliseconds')[0];

    mainButton.addEventListener('click', addButtonsAndChangeMainButtonState, false);
    resetButton.addEventListener('click', reset, false);
    saveButton.addEventListener('click', save, false);

    if (sessionStorage.getItem('currentParameters')) {
        var timeParameters = JSON.parse(sessionStorage.getItem('currentParameters'));
        milliseconds = timeParameters[2];
        seconds = timeParameters[1];
        minutes = timeParameters[0];
    }
    if (sessionStorage.getItem('currentMarkNumber')) {
        marksCounter = JSON.parse(sessionStorage.getItem('currentMarkNumber'));
    }
    if (mainButton.dataset.state === 'stop'){
        mainButton.dataset.state = 'run';
        mainButton.click();
    }
};


function addButtonsAndChangeMainButtonState() {
    if(buttonCollection.length === 1){

        resetButton.classList.add('btn');
        resetButton.textContent = 'Reset';
        saveButton.classList.add('btn');
        saveButton.textContent = 'Save';
        buttonContainers[1].appendChild(resetButton);
        buttonContainers[1].appendChild(saveButton);
    }

    if (mainButton.dataset.state === 'stop') {

        mainButton.textContent = 'Run';
        mainButton.dataset.state = 'run';
        stopTimer();
        sessionStorage.setItem('currentState', JSON.stringify(document.body.innerHTML));
        sessionStorage.setItem('currentParameters', JSON.stringify([minutes,seconds,milliseconds]));
        return;
    }

    mainButton.textContent = 'Stop';
    mainButton.dataset.state = 'stop';
    timerId = setInterval(runTimer,10);

}


function runTimer() {
    ++milliseconds;

    if (milliseconds > 99){
        milliseconds = 0;
        ++seconds;
    }

    if(seconds > 59){
        seconds = 0;
        ++minutes;
    }

    if (minutes === 60){
        stopTimer();
        mainButton.remove();
        saveButton.remove();
    }

    millisecondContainer.textContent = ifElementLessTen(milliseconds);
    secondContainer.textContent = ifElementLessTen(seconds);
    minuteContainer.textContent = ifElementLessTen(minutes);

    sessionStorage.setItem('currentState', JSON.stringify(document.body.innerHTML));
    sessionStorage.setItem('currentParameters', JSON.stringify([minutes,seconds,milliseconds]));

    function ifElementLessTen (el){
        return (+el < 10) ? '0' + el : el;
    }

}


function stopTimer() {
    clearInterval(timerId);
}


function reset() {
    buttonContainers[1].textContent = null;
    stopTimer();
    millisecondContainer.textContent = '00';
    milliseconds = 0;
    secondContainer.textContent = '00';
    seconds = 0;
    minuteContainer.textContent = '00';
    minutes = 0;
    document.body.firstElementChild.appendChild(mainButton);
    mainButton.textContent = 'Start';
    mainButton.dataset.state = 'start';
    marksCounter = 1;
    document.getElementsByClassName('time_marks')[0].remove();
    sessionStorage.clear();
}


function save() {
    var timeMarks = document.getElementsByClassName('time_marks')[0],
        timeMarksContainer = document.createElement('div');

    if(!timeMarks) {
        timeMarksContainer.classList.add('time_marks');
        document.body.appendChild(timeMarksContainer);
    }else{
        timeMarksContainer = timeMarks;
    }

    var mark = document.createElement('div');

    mark.textContent = marksCounter + ') ' + minuteContainer.textContent + ' : ' + secondContainer.textContent + ' : ' + millisecondContainer.textContent;
    timeMarksContainer.appendChild(mark);
    ++marksCounter;

    sessionStorage.setItem('currentMarkNumber', JSON.stringify(marksCounter));
}