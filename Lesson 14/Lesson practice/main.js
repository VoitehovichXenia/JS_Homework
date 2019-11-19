// По клику на имеющуюся кнопку (получать ее по тегу) найти все дочерние ссылки у первого абзаца с помощью возможностей
// DOM-навигации и произвести соответствующие действия с ссылками (задание стилей лучше использовать через добавление css-класса).
// Установить событие клика на второй абзац другим способом. Если пользователь нажимает на ссылки 2-го абзаца, необходимо
// отменить им поведение по-умолчанию и вывести alert со значением атрибута href ссылки.

var block = document.getElementById('block'),
    firstItem = document.createElement('p'),
    secondItem = document.createElement('p');

firstItem.innerHTML += 'If you bad at something, just ask <a href="https://www.google.com/" target="_blank" >google</a> for help. <a href="https://www.google.com/" target="_blank">Press to find some materials.</a>';
secondItem.innerHTML += 'If you bad at something, just ask <a href="https://www.google.com/" target="_blank">google</a> for help. <a href="https://www.google.com/" target="_blank">Press to find some materials.</a>';

block.appendChild(firstItem);
block.appendChild(secondItem);

var button = document.getElementsByTagName('button'),
    links = firstItem.getElementsByTagName('a');

button[0].onclick = function () {

    for (var i = 0; i < links.length; i++)
        links[i].classList.add('red_link');
    };

secondItem.addEventListener('click', alertLink, false);

function alertLink(event) {

    var element = event.target;

    if (element.tagName === 'A'){
        event.preventDefault();
        alert(element.getAttribute('href'));
    }
}


