var form = document.getElementsByClassName('content')[0],
    xInput = document.getElementById('x'),
    yInput = document.getElementById('y'),
    body = document.body,
    button = document.getElementsByTagName('button')[0];

button.disabled = 'true';
form.addEventListener('keyup', disableButton, false);
button.addEventListener('click', checkInputValue, false);

function disableButton(){
    button.disabled = !(xInput.value.trim() && yInput.value.trim());
}

function checkInputValue() {
    var xValue = +xInput.value,
        yValue = +yInput.value;

    if(!isValidInputValue(xValue)){
        clearInputs([xInput]);
        errorMessage(xInput);
    }
    if(!isValidInputValue(yValue)){
        clearInputs([yInput]);
        errorMessage(yInput);
    }

    if(isValidInputValue(xValue) && isValidInputValue(yValue)) return drawChessPad();
}

function isValidInputValue(value) {
    return value && isInteger(value) && value >= 1 && value <= 10;
}

function isInteger(value) {
    return value === parseInt(value);
}

function clearInputs(inputs) {
    for (var m = 0; m < inputs.length; m++){
        inputs[m].value = null;
    }
}

function errorMessage(input) {
    return alert ('Введице целое число от 1 до 10 в поле ' + input.id.toUpperCase());
}


function drawChessPad() {

    if (document.getElementsByTagName('table')[0]) {
        document.getElementsByTagName('table')[0].remove();
    }

    var table = document.createElement('table');
    table.classList.add('table');

    for (var i = 1, valY = +yInput.value; i <= valY; i++) {

            var row = document.createElement('tr'),
                orderForDraw = 0;

            if (i % 2 === 0) orderForDraw = 1;

            for (var j = +xInput.value; j >= 1; j--) {
                var cell = document.createElement('td');
                orderForDraw++;
                cell.classList.add('light_cell');

                if (orderForDraw % 2 === 0) {
                    cell.classList.add('dark_cell');
                }
                row.appendChild(cell);
            }
            table.appendChild(row);

    }

    clearInputs([xInput, yInput]);

    body.appendChild(table);

    table.onclick = function (event) {

        var whereClickWas = event.target,
            allCells = table.getElementsByTagName('td');

        if (whereClickWas.tagName === 'TD'){

            for (var m = 0; m < allCells.length; m++) {
                allCells[m].classList.toggle('dark_cell')
            }
        }

    }
}