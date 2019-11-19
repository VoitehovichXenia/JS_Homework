var inputElements = document.getElementsByTagName('input'),
    body = document.getElementsByTagName('body'),
    button = document.getElementsByTagName('button');

button[0].setAttribute('disabled', 'true');
button[0].addEventListener('click', chekInputValue, false);
button[0].addEventListener('click', drawChessPad,false);

function clearInputs() {
    for (var m = 0; m < inputElements.length;m++){
        inputElements[m].value = null;
    }
}

for (var i = 0; i < inputElements.length; i++){
    clearInputs();
    inputElements[i].addEventListener('keyup',buttonDisableValue,false);
}

function buttonDisableValue(){
    return  button[0].disabled = !(inputElements[0].value && inputElements[1].value);
}

function chekInputValue() {
    for (var j = 0; j < inputElements.length; j++){
        if (inputElements[j].value <= 10 && inputElements[j].value >= 1) break;
        button[0].disabled = true;
        clearInputs();
        alert ('Please white in the forms below number from 1 to 10!');
        break;
    }
}

function drawChessPad() {

    if (document.getElementsByTagName('table')[0]) {
        document.getElementsByTagName('table')[0].remove();
    }

    var table = document.createElement('table');
    table.classList.add('table');

    for (var i = 1, valY = +(inputElements[1].value); i <= valY; i++) {

            var row = document.createElement('tr'),
                orderForDraw = 0;

            if (i % 2 === 0) orderForDraw = 1;

            for (var j = +(inputElements[0].value); j >= 1; j--) {
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

    clearInputs();

    body[0].appendChild(table);

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