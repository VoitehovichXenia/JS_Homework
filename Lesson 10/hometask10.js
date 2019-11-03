/*Задание 1:
    Переписать задачу с использованием перебирающего метода массивов:*/

function filterNumbersArr (numbers) {

    var newArr = numbers.filter(function(num){

        return num > 0;

    });

    return newArr;
}

console.log(filterNumbersArr([-1,0,2,34,-2]));


/*Задание 2:
    Написать функцию, принимающую массив чисел и возвращающую первое найденное положительное число.*/

function firstPositiveNumberArr (arr) {

    var firstPositiveNumber = arr.find(function(num){

        return num > 0;

    });

    return firstPositiveNumber;
}

console.log(firstPositiveNumberArr([-1,0,2,34,-2]));


/* Задание 3:
    Написать функцию, которая будет определять, является ли переданное в нее слово палиндромом (напр. шалаш).
    Регистр в словах учитываться не должен. Тестировать функцию можно только на одиночных словах (без фраз).*/

function isPalindrom (string) {

    string = string.toLowerCase();

    var arr = arr.string.split('').reduceRight(function(str, current){
        return str + current;
    }, '');

    return string === arr;
}

console.log(isPalindrom('шалаш'));


/*Задание 4:
    Написать функцию, которая будет определять, являются ли переданные в нее слова анаграммами (напр. кот и отк).
    Регистр в словах учитываться не должен.*/

function areAnagrams (str1, str2) {

    var arr1 = str1.toLowerCase().split('').sort().join(),
        arr2 = str2.toLowerCase().split('').sort().join();

    return arr1 === arr2;
}

console.log(areAnagrams('кот','тоок'));


/* Задание 5:
    Написать функцию, которая будет разбивать массив на под-массивы определенной длины.*/

function divideArr(arr, subArrLength) {

    var tempArr = [];

    for (i = 0, j = 0; i < arr.length; j++){

        tempArr[j] = arr.splice(i, subArrLength);
    }

    return tempArr;
}
console.log(divideArr([1,2,3,4],2))