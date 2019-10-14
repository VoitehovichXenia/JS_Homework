/*  Задание 1:
    Задача из 5 шагов-строк (методы массивов использовать можно):
      - Создать массив styles с элементами "Джаз", "Блюз".
      - Добавить в конец значение "Рок-н-Ролл".
      - Заменить предпоследнее значение с конца на "Классика" - код замены должен работать для массивов любой длины.
      - Удалить первое значение массива и вывести его в alert.
      - Добавить в начало значения "Рэп" и "Регги".*/

var m = ['Джаз','Блюз'];
m[m.length] = 'Рок-н-Ролл';
m[m.length - 2] = 'Классика';
alert(m.shift());
m.unshift('Рэп','Регги');

/* Задание 2:
    При помощи цикла for вывести чётные числа от 2 до 10. Придумать несколько решений.*/

//вариант 1
for (var i = 2; i<=10; i+=2){
    console.log(i);
}

//вариант 2
for (var i = 2; i<=10; i++){
    if (i % 2 == 0) {
        console.log(i);
    }
}

//вариант 3
for (var i = 2; i<=10; i++){
    if (i % 2 == 1) continue;
    console.log(i);
}


/*Задание 3:
    Создать функцию isEmpty(obj), которая возвращает true, если в объекте нет свойств
    и false – если хоть одно свойство есть.*/

function isEmpty(obj) {
    for (var key in obj){
        return false;
    }
    return true;
}
var shoppingList = {fruit: 'peach', number: 10},
    money = {};

alert(isEmpty(shoppingList));
alert(isEmpty(money));


/* Задание 4:
    Написать код, который:
    запрашивает по очереди значения при помощи prompt и сохраняет их в массиве,
    заканчивает ввод, как только посетитель введёт пустую строку, не число или нажмёт "Отмена"
    (при этом ноль 0 не должен заканчивать ввод, это разрешённое число), выводит сумму всех значений массива.*/

var arr=[],
    sum = 0;
    for (;;){
        arr[arr.length] = prompt('Введите число:');
        if (arr[arr.length-1] == '' || arr[arr.length-1] == null || isNaN(arr[arr.length-1])) break;
        if (arr[arr.length-1] == 0) continue;
        sum = sum + Number(arr[arr.length-1]);
    }
    alert(sum);

/*Задание 5 *:
    Натуральное число, большее 1, называется простым, если оно ни на что не делится, кроме себя и 1.
    Другими словами, n>1 – простое, если при делении на любое число от 2 до n-1 есть остаток.
    Создайте код, который выводит все простые числа из интервала от 2 до 10. Результат должен быть: 2,3,5,7.
    P.S. Код также  должен легко модифицироваться для любых других интервалов.*/

//вариант №1 не самый удачный, но работающий
var arr=[],
    conf,
    n,
    begin = +prompt('number'),
    end = +prompt('number2');

for (; begin<=end; begin++){
    for (n = begin-1; n>1 && n<begin; --n) {
        conf = false;
        if (begin%n === 0) break;
        conf = true;
    }
    if (conf == false) {
    } else if (begin == 2 || conf == true){
        arr[arr.length] = begin;
    }
}
alert(arr);

//вариант №2 чуть более удачный и работающий
var arr = [],
    count,
    n,
    begin = +prompt('number'),
    end = +prompt('number2');

for (; begin<= end; begin++){
    count = 0;
    for (n=begin; n>=1 && n<=begin; n--){
        if (begin%n == 0){
            count++;
        }
    }
    if (count <= 2 && begin>1){
        arr[arr.length] = begin;
    }
}
alert(arr);

//вариант №3, который самый удачный, математичный и красивый
var arr = [],
    begin = +prompt('number'),
    end = +prompt('number2');

for (; begin<= end; begin++){
    for (var n=2;begin%n != 0 && n<=Math.sqrt(begin); n++){
        }
    if (n > Math.sqrt(begin) && begin>1){
        arr[arr.length] = begin;
    }
}
alert(arr);

