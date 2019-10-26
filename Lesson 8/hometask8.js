function Animal(name){
    this._foodAmount = 50;

    this.name = name;
    this.feed = function () {

        console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');

    };

    this.dailyNorm = function (food) {

        if(!arguments.length) return this._formatFoodAmount();

        if (food < 50){
            throw new Error('Слишком мало, котику нужно хотя бы 50 гр.');
        }
        if (food > 500){
            throw new Error('А не боитесь, что котик заплывет жирком?');
        }

        this._foodAmount = food;
        this._formatFoodAmount();
    };

    this._formatFoodAmount = function () {
        return this._foodAmount + ' гр.';
    }
}


function Cat(){

    Animal.apply(this, arguments);

    var animalFeed = this.feed;
    this.feed = function () {
        animalFeed.call(this);
        console.log('Кот доволен ^_^');
        return this;
    }

    this.stroke = function () {
        console.log('Гладим кота.');
        return this;
    }


}


var lila = new Cat('Лиля');
lila.dailyNorm(100);
console.log(lila.feed().feed().stroke().stroke());