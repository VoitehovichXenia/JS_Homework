var table = document.getElementsByClassName('table'),
    allRows = table[0].getElementsByTagName('tr'),
    addRow = allRows[allRows.length - 1];

addRow.onclick = function () {
    table[0].insertAdjacentHTML('afterBegin', '<td class="cell"></td>\n' +
        '            <td class="cell"></td>\n' +
        '            <td class="cell"></td>');
}

table[0].addEventListener('click', insertInput, false);
function insertInput(event) {

    var target = event.target;

    if (target.tagName === 'TD'){
        var cellVal = target.textContent,
            input = document.createElement('input');

        input.classList.add('input');
        input.setAttribute('type','text');

        target.textContent = null;
        target.appendChild(input);

        input = target.getElementsByTagName('input')[0];
        input.focus();
        input.value = cellVal;

        input.onblur = function () {
            target.textContent = input.value;
        }

        input.onkeydown = function (event) {

           if(event.keyCode === 13){
               target.textContent = input.value;
           }

        }

    }

}



