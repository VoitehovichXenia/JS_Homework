/*  Задание 1:
    Переписать предыдущий пример с кошками на прототипный стиль ООП.*/

function Animal(name){

    this._foodAmount = 50;
    this.name = name;

}

Animal.prototype._formatFoodAmount = function () {
    return this._foodAmount + ' гр.';
}

Animal.prototype.dailyNorm = function (food) {

    if(!arguments.length) return this._formatFoodAmount();

    if (food < 50){
        throw new Error('Слишком мало, котику нужно хотя бы 50 гр.');
    }
    if (food > 500){
        throw new Error('А не боитесь, что котик заплывет жирком?');
    }

    this._foodAmount = food;

}

Animal.prototype.feed = function () {
    console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
}

function Cat(){

    Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.feed = function () {
    Animal.prototype.feed.apply(this, arguments);
    console.log('Кот доволен ^_^');
    return this;
}

Cat.prototype.stroke = function () {
    console.log('Гладим кота.');
    return this;
}


var lila = new Cat('Лиля');
lila.dailyNorm(100);
console.log(lila.feed().feed().stroke().stroke());

/*Задание 2:
    Написать функцию глубокого клонирования объектов. Клонироваться должны значения всех типов данных (+ массивы
    и функции), а также любого уровня вложенности. Метод isArray использовать можно.*/

function cloneObject(obj) {

    var clone;

    if (!(obj instanceof Object)){

        return obj;

    }

    if (Array.isArray(obj)) {

        clone = [];
        for(var i = 0, n = obj.length; i < n; i++){
            clone[i] = cloneObject(obj[i]);
        }

        return clone;

    }

    if (typeof obj === 'function'){
        clone = function () {

            return obj.apply(this, arguments);

        }

        return clone;

    }



    if (typeof obj === 'object' && !obj.length) {

        clone = {};
        for (var key in obj){
            clone[key] = cloneObject(obj[key]);

        }

        return clone;

    }

}

var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function() {
        alert('Hello');
    }
};

var clonedObj = cloneObject(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);

console.log(initialObj);
console.log(clonedObj);


/*Задание 3:
    Написать функцию глубокого сравнения объектов. Сравниваться должны значения всех типов, а также любого уровня
    вложенности. Хорошо протестировать работу функции.*/

function deepCompare(obj_1,obj_2) {

    var arr = [];

    deepCompareInternal(obj_1, obj_2);

    function deepCompareInternal(obj1, obj2) {

        if ( typeof obj1 === 'function' ){

            if (typeof obj2 !== "function" || toString(obj1) !== toString(obj2)){
                arr.push(false);
            }

        }

        if (!(obj1 instanceof Object)){

            if (obj1 !== obj2) {
                arr.push(false);
            }

        }

        if (obj1 instanceof Array){

            if ( !(obj2 instanceof Array) || obj1.length !== obj2.length ) {
                arr.push(false);
            }

            for (i = 0, len = obj1.length; i < len; i++){
                deepCompareInternal(obj1[i], obj2[i]);
            }

        }

        if (obj1 !== null && typeof obj1 === 'object' && !obj1.length) {

            if (!(typeof obj2 === 'object' && obj2 !== null && !obj2.length)) {
                arr.push(false);
            }

            var numberOfProp1 = 0,
                numberOfProp2 = 0;

            for (var a in obj1){
                numberOfProp1++;
            }
            for (var b in obj2){
                numberOfProp2++;
            }

            if (numberOfProp1 !== numberOfProp2) {
                arr.push(false);
            }

            if (numberOfProp1 === numberOfProp2){

                for (var key in obj1) {
                    if (obj1.hasOwnProperty(key) !== obj2.hasOwnProperty(key)) {
                        arr.push(false);
                    }
                    deepCompareInternal(obj1[key], obj2[key]);
                }
            }
        }
    }

    if (!arr.length) {

        return true;

    } else if (arr.length) {

        return false;
    }
}


var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function() {
        alert('Hello');
    }
};

var initialObj2= {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function() {
        alert('Hello');
    }
};
initialObj2.object.object2.array2[1].name = 'Vasya';
initialObj2.array.push(2);
deepCompare(initialObj,initialObj2);