var Square = /** @class */ (function () {
    function Square(side) {
        this.side = side;
        this.side = side;
    }
    Square.prototype.calcArea = function () {
        return this.side * this.side;
    };
    Square.prototype.calcPeri = function () {
        return 4 * this.side;
    };
    return Square;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(length, width) {
        this.length = length;
        this.width = width;
        this.length = length;
        this.width = width;
    }
    Rectangle.prototype.calcArea = function () {
        return this.length * this.width;
    };
    Rectangle.prototype.calcPeri = function () {
        return 2 * (this.length + this.width);
    };
    return Rectangle;
}());
var area_1 = new Square(2);
console.log(area_1.calcArea());
console.log(area_1.calcPeri());
