// Задание 1:
// Написать регулярное выражение, которое будет тестировать на соответствие строки вида - name_surname-1234@gmail.com :
// - имя и фамилия должны состоять только из англ. букв и быть длиной от 3 до 10 символов, между ними _ обязательно
// - далее опциональная часть, начинающаяся с тире и состоящая из 4-х цифр
// - затем обязательный знак @
//       - название почтового сервиса должно быть длиной от 2-х до 20-ти символов, может состоять из букв английского
// алфавита и цифр, а также опционально может содержать внутри себя одно тире или одну точку
// - обязательная часть .com
// Хорошо протестировать регулярное выражение.

var emailTemplate = /^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@[a-z\d]{1,10}[-.]?[a-z\d]{1,10}\.com$/i;

console.log(emailTemplate.test('name_surname-1234@gmail.com'));
console.log(emailTemplate.test('name_surname@g-mail.com'));
console.log(emailTemplate.test('name_surname-1234@g--ma..il.com'));
console.log(emailTemplate.test('name_surname-1234@g-ma..il.com'));


//     Задание 2:
// Написать функцию, которая с помощью регулярного выражения будет тестировать на соответствие строки вида:
//     +375-25-777-77-77
// 375299999999
// 8-044-444-44-44
// 8033-6666666
// и возвращать boolean.
//
//     Условия:
// - + перед 375 - опциональный
// - номер может начинаться с 375 (без 0) либо с 80
// - номер должен содержать один из кодов - 25, 29, 33, 44 либо 17
// - основная часть номера не может начинаться с 0
// - некоторые или все тире могут быть пропущены, но расположение тех, которые пропущены не будут, может быть только
// таким, как в примерах 1 и 3
//
// Перед отправкой постараться максимально соптимизировать своё решение и убрать все лишнее.

function isItPhoneNumber(phoneNumber) {

    phoneNumber = phoneNumber.trim();
    var phoneTemplate = /^(\+?375-?|8-?0)(25|29|33|44|17)-?\d{3}(-?\d{2}){2}$/;
    console.log(phoneTemplate.test(phoneNumber));

}

isItPhoneNumber('+375-25-777-77-77');
isItPhoneNumber('375299999999');
isItPhoneNumber('8-0-44-444-44-44');
isItPhoneNumber('8033-6666666');

isItPhoneNumber('+8-044-444-44-44');
isItPhoneNumber('8033-666');

//     Задание 3:
// Переписать решение задачи с поиском гласных с использованием регулярного выражения. Протестировать ситуацию, когда
// гласных в переданном тексте будет 0. По возможности придумать несколько вариантов решения.
//
//     function countVowelLetters(text) {
//     text = text.toLowerCase().split('');
//
//     var vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'],
//         counter = 0;
//
//     text.forEach(function(letter) {
//         vowelLetters.indexOf(letter) !== -1 && counter++;
//     });
//
//     return counter;
// }
//
// countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12

function countVowelLetters(text) {

    var vowelsTemplate = new RegExp('[уеаоэяиюaeyuio]','igm');
    text = (text.match(vowelsTemplate)) ? text.match(vowelsTemplate).length : 0;
    return console.log('Количество гласных в тексте: ' + text);

}

countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12
countVowelLetters('Wow, it is great!\n' + 'I\'m so happy for you!'); //13
countVowelLetters('BMW');
