// Добавить на страницу два поля для ввода - X и Y и кнопку "Create".
//     Если хотя бы одно из полей пустое - кнопка дизэйблится (делать по keyup).
// Поля должны принимать только числа от 1 до 10, в противном случае должно выводиться сообщение об ошибке (делать по click).
// По клику на кнопку должна отрисоваться шахматная доска с размерами X по горизонтали и Y по вертикали.
//     При введении значений X и Y заново таблица должна корректно перерисоваться.
//     По клику на любое поле доски - цвета всех полей должны изменяться на противоположные.

var inputElements = document.getElementsByClassName('input'),
    content = document.getElementsByClassName('content'),
    button = document.getElementsByTagName('button');

button[0].setAttribute('disabled', 'true');
button[0].addEventListener('click', chekInputValue, false);
button[0].addEventListener('click', drawChessPad,false);

for (var i = 0; i < inputElements.length; i++){
    inputElements[i] = null;
    inputElements[i].addEventListener('keyup',buttonDisableValue,false);
}

function buttonDisableValue(){
    return  button[0].disabled = !(inputElements[0].value && inputElements[1].value);
}

function chekInputValue() {
    for (var j = 0; j < inputElements.length; j++){
        if (!(typeof inputElements[j].value === 'number') || inputElements[j].value > 10 && inputElements[j].value < 1){
            alert ('Please white in the forms below number from 1 to 10!');
            button[0].disabled = true;
            break;
        }
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

    for (var l = 0; l < inputElements.length; l++){
        inputElements[l] = null;
    }

    content[0].appendChild(table);

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