// Задание 7:
// Написать функцию, принимающую массив объектов вида:
//     [
//         {name: 'Vasya Pupkin', age: 25},
//         {name: 'Ivan Petrov', age: 30},
//         {name: 'Fedor Ivanov', age: 42}
//     ]
// и возвращающую объект вида:
// {
//     Пользователи младше 40: [
//     {name: 'Vasya Pupkin', age: 25},
//     {name: 'Ivan Petrov', age: 30}
// ],
//     Пользователь с именем Федор: {name: 'Fedor Ivanov', age: 42}
// }
// Для свойства "Пользователь с именем Федор" осуществлять поиск объекта по имени, которое начинается с подстроки Fedor.

{
    function filterArrOfObj(arr){
        return {
            ['Пользователи младше 40']: arr.filter(item => item.age < 40),
            ['Пользователь с именем Федор']: arr.find(item => item.name.startsWith('Fedor'))
        };
    }

    filterArrOfObj([
        {name: 'Vasya Pupkin', age: 25},
        {name: 'Ivan Petrov', age: 30},
        {name: 'Fedor Ivanov', age: 42}
    ]);
}

//     Задание 8:
// Написать функцию, принимающую массив имен пользователей и возвращающую массив объектов вида:
//     [
//         {Пользователь 1: 'Вася'},
// {Пользователь 2: 'Петя'}
// ]

{
    function covertToObjects(names) {
        return names.map((name, i) => ({[`Пользователь ${ i + 1 }`] : name }));
    }

    covertToObjects( ['Vasya', 'Ivan', 'Fedor'] );
}

// Задание 9:
// Написать функцию, принимающую массив объектов и объединяющую их в один новый объект. Например:
// [
//     {name: 'Vasya'},
//     {name: 'Piotr', age: 25},
//     {salary: '2000$'}
// ]
// необходимо преобразовать в
// {
//     name: 'Piotr',
//         age: 25,
//     salary: '2000$'
// }
// Spread-оператор не использовать. Использовать перебирающий метод массивов. Старые объекты не должны преобразовываться.

{
    const info =  [
        {name: 'Vasya'},
        {name: 'Piotr', age: 25},
        {salary: '2000$'}
    ];

    function concatObjects(arr){
        return arr.reduce((previousItem, currentItem) => Object.assign(previousItem, currentItem), {});
    }

    concatObjects(info);
}

//     Задание 10:
// Переписать последнее задание с ООП на новый синтаксис. Проверить работоспособность всех методов.

{
    class Animal {
        constructor(name){
            this.name = name;
            this._foodAmount = 50;
        }

        _formatFoodAmount(){
            return `${this._foodAmount} гр.`;
        }

        dailyNorm(amount){
            if (!arguments.length) return this._formatFoodAmount();

            if (amount < 50 || amount > 500) {
                throw new Error('Недопустимое количество корма.');
            }
            this._foodAmount = amount;
        }

        feed(){
            console.log(`Насыпаем в миску ${this.dailyNorm()} корма.`);
        }

    }

    class Cat extends Animal{
        feed(){
            super.feed();
            console.log('Кот доволен ^_^');
            return this;
        }
        stroke(){
            console.log('Гладим кота.');
            return this;
        }

    }

    const lila = new Cat('Лиля');

    lila.dailyNorm(150);
    console.log(lila.feed().stroke().stroke().feed());

}

//     Задание 11:
// Написать функцию-промис, которая принимает в себя 2 числа и выводит в консоль целые числа, входящие в диапазон,
// каждую секунду. После окончания работы интервала в консоль должно вывестись последнее запомненное число.
{
    function showIntegerNumbersFromInterval (beginNumber, endNumber) {

        return new Promise((resolve,reject) => {
            if (parseInt(beginNumber) === parseInt(endNumber)) return reject('В интервале нет целых чисел');

            if (beginNumber > endNumber) [beginNumber, endNumber] = [endNumber, beginNumber];

            beginNumber = Math.ceil(beginNumber);
            endNumber = Math.floor(endNumber);

            let timerId = setInterval((currentNumber) => {
                currentNumber = beginNumber;
                currentNumber > endNumber ? !clearInterval(timerId) && resolve(endNumber) : console.log(beginNumber++);
            }, 1000);

        });

    }

    showIntegerNumbersFromInterval(2.5,5)
        .then(lastNumber => console.log(`Последнее запомненное число: ${lastNumber}`))
        .catch(errorMessage => console.log(`Возникла ошибка: ${errorMessage}`));
}