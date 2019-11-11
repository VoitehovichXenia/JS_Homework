/*Задание 1:
Написать функцию, принимающую массив имен и возвращающую массив объектов вида {name: 'Vasya'}.*/

function convertElementsToObject(arr) {

    return arr.map(function(element,i,arr){

        return (element = {name: element});

    });

}

console.log(convertElementsToObject(['Xania', 'Ann', 'Jamie', 'Charlie']));

/*Задание 2:
Написать функцию, принимающую массив вида ['00', '13', '24'] и возвращающую строку "Текущее время : 00 : 13 : 24".
Для решения использовать перебирающий метод массивов.*/

function convertToTime(arr) {

    return arr.reduce(function (result, current) {
        return result + ' : ' + current;
    }, 'Текущее время');

}

console.log(convertToTime(['00','13','14']));

/*Задание 3:
Написать чистую функцию, которая будет возвращать количество гласных в переданном тексте. Регистр любой. Решение не
должно быть "топорным".*/

function numberOfVowels(str) {

    var vowelsLatin = 'aeiouy',
        vowelsKyrillic = 'аеёиоуыэюя',
        counterLatin = 0,
        counterKyrillic = 0;

    str = str.toLowerCase().split('');

    str.map(function (element) {
        for (var i = 0; i < vowelsLatin.length || i < vowelsKyrillic.length; i++){
            if (element === vowelsLatin[i]){
                counterLatin++;
            }
            if (element === vowelsKyrillic[i]){
                counterKyrillic++;
            }
        }
    });

    if (counterLatin && counterKyrillic) return 'Number of vowels: ' + counterLatin + '\nКоличество гласных: ' + counterKyrillic;
    if (counterLatin) return 'Number of vowels: ' + counterLatin;
    if (counterKyrillic) return 'Количество гласных: ' + counterKyrillic;
}

console.log(numberOfVowels('Vowels'));
console.log(numberOfVowels('Гласные'));
console.log(numberOfVowels('I love to есть!'));


/*Задание 4:
Написать функцию, которая будет принимать текст в качестве параметра. У текста должны быть пробелы, точки, запятые,
восклицательные и вопросительные знаки. Текст необходимо разбить на предложения (по точкам, восклицательным и
вопросительным знакам - убрав их - разрешается использовать регулярное выражение в методе split).
Для каждого из предложений вывести текст предложения и рядом количество букв в нем (без учета пробелов, запятых
и т.д. - именно букв).*/

function divideToSentences(text) {

    var temp;

    temp = text.split(/\.|\?|!/);
    if (temp[temp.length-1] === ''){
        temp.pop();
    }


    for (var i = 0; i < temp.length; i++){
        var arr;
        arr = temp[i].trim().split(/[,|:|;|\-|\s]/).join('');
        arr = arr.length;
        console.log(temp[i] + '\nКоличество букв в предложении: ' + arr);
    }

    return;
}

console.log(divideToSentences('Какой хороший день! Какой хороший я? И песенка моя, видимо, тоже ничего так. Песня - вещь очень замечательная!'));

/*Задание 5 *:
Написать функцию, которая будет находить в переданном ей тексте наиболее часто повторяемое слово и возвращать
информацию вида:
"Максимальное число повторений у слова "привет" - 8"
При решении предположить, что у двух и более слов не может быть одинакового количества повторений.
Для удобного разделения текста на слова сразу по нескольким знакам препинания - разрешается использовать регулярное
выражение в методе split.*/

function findRepeat(text) {

    var temp;

    text = text.toLowerCase().split(/[^a-zа-яё]+/g);
    if (text[text.length-1] === ''){
        text.pop();
    }

    temp = text.map(function (element) {
        var counter = 0,
            obj= {};
        for (var i = 0; i < text.length; i++){
            if (element === text[i]) counter++;
        }
        obj.name = element;
        obj.number = counter;
        return obj;
    });

    function compareNumber(first,second) {
        if (first.number > second.number) return 1;
        if (first.number < second.number) return -1;
        return 0;
    }

    temp.sort(compareNumber);

    return 'Максимальное число повторений у слова "'+ temp[temp.length - 1].name + '" - ' + temp[temp.length - 1].number;

}

console.log(findRepeat('Я все время говорю только о себе! Все я да я!'));
console.log(findRepeat('Олень-северное животное.В летнее время оленям в тайге жарко,а в горах даже в июле холодно.\n' +
    'Олень как бы создан для северных просторов,жёсткого ветра,длинных морозных ночей.Олень легко бежит вперёд по тайге,'+
    'подминает под себя кусты,переплывает быстрые реки.'+
    'Олень не тонет,потому что каждая его шерстинка-это длинная трубочка,которую внутри наполняет воздух..\n' +
    'Нос у оленя покрыт серебристой шёрсткой.Если бы шерсти на носу не было,олень бы его отморозил '));