function Cat(name){
    this.name = name;
    this.feed = function () {};
}
var lila = new Cat('lila');
console.log(lila.name);
lila = null;