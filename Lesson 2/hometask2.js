/*Задание 1: Написать программу, которая проделывает следующие операции:
    запрашивает у пользователя число,
    затем последовательно задает вопросы "Сколько прибавить/отнять/умножить/разделить от предыдущего результата?".
    Сложение и вычитание выполнять в первую очередь.
    По окончании вывести пользователю один alert, содержащий математически Правильную формулу
    и результат вида:
      "Формула: 6 + 10 - 5 и т.д.
      Результат: 11"*/

var num1 = +prompt('Введите число:', 1);
var plus = +prompt('Сколько к нему прибавить?', 1);
var subtract = +prompt('Сколько отнять от предыдущего результата?', 1);
var multiply = +prompt('На сколько умножить предыдущий результат?', 1);
var divide = +prompt('На сколько разделить предыдущий результат?', 1);
alert('Формула: ' + '(' + num1 + ' + ' + plus + ' - ' + subtract + ')' +
        ' * ' + multiply + ' / ' + divide + '\n' +
        'Результат: ' + (num1 + plus - subtract) * multiply / divide);

/*Задание 2:
    Написать код, который:
    будет спрашивать логин (prompt),
    если посетитель вводит "Админ", то спрашивать пароль, если нажал отмена – выводить "Вход отменён",
    если вводит что-то другое – "Я вас не знаю".
    Пароль проверять так. Если введён пароль "Чёрный Властелин", то выводить "Добро пожаловать!",
    иначе – "Пароль неверен", при отмене – "Вход отменён".
    Для решения использовать вложенные блоки if.*/

var login = prompt('Введите логин');
if (login === 'Админ') {
    var password = prompt('Введите пароль');
    if (password === 'Чёрный Властелин') {
        alert('Добро пожаловать!');
    } else if (password == null) {
        alert('Вход отменён');
    } else {
        alert('Пароль неверен');
    }
} else if (login == null) {
    alert('Вход отменен');
} else {
    alert('Я вас не знаю');
}

/*Задание 3:
    Переписать if..else с использованием нескольких тернарных операторов:

    var message;

    if (login === 'Вася') {
      message = 'Привет';
    } else if (login === 'Директор') {
      message = 'Здравствуйте';
    } else if (login === '') {
      message = 'Нет логина';
    } else {
      message = '';
    }*/

var message;
message = (login === 'Вася') ? 'Привет' :
    (login === 'Директор') ? 'Здравствуйте' :
        (login === '') ? 'Нет логина' : '';

/*Задание 4 *:
Домашнее задание N.03 - см. скрин. Пояснения:
- При вводе неверных данных в поле необходимо вывести сообщение об ошибке (разрешается использовать дополнительные
alert для этого) и запросить данные заново (здесь можно использовать ранее не пройденную конструкцию).
- При нажатии на "Отмена" можно использовать поведение, описанное выше, или же просто вместо данных из поля
подставлять прочерк.
- Валидацию можно не усложнять, в т.ч. високосные года в подсчете количества дней можно не учитывать.*/

var surname = prompt('Ваша фамилия?'),
    confirm_var;
while (surname == undefined || surname == '' && surname != '---') {
    if (surname == undefined) {
        confirm_var = confirm('Вы нажали отмена\nВы хотите сообщить вашу фамилию?');
        if (confirm_var === true) {
            surname = prompt('Ваша фамилия?');
        } else {
            surname = '---';
        }
    } else if (surname == '') {
        surname = prompt('Вы не ввели фамилию! Попробуйте еще раз!\nВаша фамилия?');
    }
}
if (surname != '---'){
    confirm_var = parseInt(surname);
    while (Boolean(confirm_var) == true){
        surname = prompt('Вы уверены что ввели буквы? Попробуйте еще раз!\nВаша фамилия?');
        confirm_var = parseInt(surname);
    }
}


var first_name = prompt('Ваше имя?');
while (first_name == undefined || first_name == '' && first_name != '---') {
    if (first_name == undefined) {
        confirm_var = confirm('Вы нажали отмена\nВы хотите сообщить ваше имя?');
        if (confirm_var === true) {
            first_name = prompt('Ваше имя?');
        } else {
            first_name = '---';
        }
    } else if (first_name == '') {
        first_name = prompt('Вы не ввели имя! Попробуйте еще раз!\nВаше имя?');
    }
}
if (first_name != '---'){
    confirm_var = parseInt(first_name);
    while (Boolean(confirm_var) == true){
        first_name = prompt('Вы уверены что ввели буквы? Попробуйте еще раз!\nВаше имя?');
        confirm_var = parseInt(first_name);
    }
}


var second_name = prompt('Ваше отчество?');
while (second_name == undefined || second_name == '' && second_name != '---') {
    if (second_name == undefined) {
        confirm_var = confirm('Вы нажали отмена\nВы хотите сообщить ваше отчество?');
        if (confirm_var === true) {
            second_name = prompt('Ваше отчество?');
        } else {
            second_name = '---';
        }
    } else if (second_name == '') {
        second_name = prompt('Вы не ввели отчество! Попробуйте еще раз!\nВаше отчество?');
    }
}
if (second_name != '---'){
    confirm_var = parseInt(second_name);
    while (Boolean(confirm_var) == true){
        second_name = prompt('Вы уверены что ввели буквы? Попробуйте еще раз!\nВаше имя?');
        confirm_var = parseInt(second_name);
    }
}

surname = 'Ваше ФИО: ' + surname + ' ' + first_name + ' ' + second_name;

var age = prompt('Ваш возраст?'),
    age_days,
    age_after5,
    pension;
while (age == undefined || age == '' || Number(age)>120 || Number(age)<6  && age != '---') {
    if (age == undefined) {
        confirm_var = confirm('Вы нажали отмена\nВы хотите сообщить ваш возраст?');
        if (confirm_var === true) {
            age = prompt('Ваш возраст?');
        } else {
            age = '---';
            age_days = '---';
            age_after5 = '---';
        }
    } else if (age == '') {
        age = prompt('Вы не ввели возраст! Попробуйте еще раз!\nВаш возраст?');
    } else if (Number(age)>120){
        age = prompt('Ну столько не живут! А если по честному:\nВаш возраст?');
    } else if (Number(age)<6){
        age = prompt('Еще в школу даже не пошел, а уже такой врун! А если по честному:\nВаш возраст?');
    }
}
if (age !== '---'){
    confirm_var = parseInt(age);
    while (age != confirm_var){
        age = prompt('Вы уверены что ввели цифры? Попробуйте еще раз!\nВаш возраст?');
        confirm_var = parseInt(age);
    }
    age_days = Number(age) * 365;
    age_after5 = Number(age) + 5;
}

var sex = confirm('Ваш пол женский?');
if (sex === true) {
    if (age >= 58) {
        pension = 'Да';
    } else {
        pension = 'Нет';
    }
    sex = 'Женский';
} else {
    if (age >= 63) {
        pension = 'Да';
    } else {
        pension = 'Нет';
    }
    sex = 'Мужской';
}
alert(surname +
    '\nВаш возраст в годах: ' + age +
    '\nВаш возраст в днях: ' + age_days +
    '\nЧерез 5 лет вам будет: ' + age_after5 +
    '\nВаш пол: ' + sex +
    '\nВы на пенсии: ' + pension);

// Задание 4 *
var lastName,
    firstName,
    patronymic,
    age;

while(true) {
    lastName = prompt('Ваша фамилия?');

    if (!lastName) {
        alert('Введите фамилию!');
    } else break;
}

// lastName = prompt('Ваша фамилия?');
// while(!lastName) {
//     alert('Введите фамилию!');
//     lastName = prompt('Ваша фамилия?');
// }

while(true) {
    firstName = prompt('Ваше имя?');

    if (!firstName) {
        alert('Введите имя!');
    } else break;
}

while(true) {
    patronymic = prompt('Ваше отчество?');

    if (!patronymic) {
        alert('Введите отчество!');
    } else break;
}

while(true) {
    age = +prompt('Ваш возраст в годах?');

    if (!age || isNaN(age) || age < 6 || age > 90) {
        alert('Введите корректный возраст!');
    } else break;
}

var isMale = confirm('Ваш пол - мужской?');

alert(
    'Ваше ФИО: ' + lastName + ' ' + firstName + ' ' + patronymic + '\n' +
    'Ваш возраст в годах: ' + age + '\n' +
    'Ваш возраст в днях: ' + (age * 365) + '\n' +
    'Через 5 лет вам будет: ' + (age + 5) + '\n' +
    'Ваш пол: ' + (isMale ? 'мужской' : 'женский') + '\n' +
    'Вы на пенсии: ' + ((isMale && (age >= 63)) || (!isMale && (age >= 58)) ? 'да' : 'нет')
);





