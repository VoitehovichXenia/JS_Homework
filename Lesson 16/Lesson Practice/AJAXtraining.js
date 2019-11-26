// Создать GET-запрос по адресу https://reqres.in/api/users?page=2. Проверить, получаются ли данные с сервера.
//     Описать свой блок try/catch в обработчике успешного запроса. В try попытаться распарсить JSON-ответ с сервера.
// Если исключения не возникает - породить его самостоятельно (попробовать 2 способа порождения).
// Если возникает исключение (строка некорректная) - в блоке catch вывести в консоль информацию об ошибке.
//     Протестировать оба варианта. Убедиться, что код после блока try/catch продолжает выполняться.

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://reqres.in/api/users?page=2', true);

xhr.send();

xhr.onload = function(){
    try {
        var response = JSON.parse(this.response);
        throw new Error('Oh! We\'ve got some error!');
    } catch (error) {
        console.error(error.name);
        console.error(error.message);
    }
    console.log('But all the rest code works!');
}




var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://reqres.in/api/users?page=2', true);

xhr.send();

xhr.onload = function(){
    try {
        var response = JSON.parse(this.response);
        throw {name: 'Strange error', message: 'It seems that something went wrong'};
    } catch (error) {
        console.error(error.name);
        console.error(error.message);
    }
    console.log('But all the rest code works!');
}