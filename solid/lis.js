var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicles = /** @class */ (function () {
    function Vehicles() {
    }
    Vehicles.prototype.move = function () {
        console.log('move');
    };
    Vehicles.prototype.chainRotate = function () { };
    Vehicles.prototype.sparkPlug = function () { };
    return Vehicles;
}());
var EngineVehicle = /** @class */ (function (_super) {
    __extends(EngineVehicle, _super);
    function EngineVehicle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EngineVehicle.prototype.sparkPlug = function () {
        console.log('Entering spark plug world');
    };
    return EngineVehicle;
}(Vehicles));
var NonEngineVehicle = /** @class */ (function (_super) {
    __extends(NonEngineVehicle, _super);
    function NonEngineVehicle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NonEngineVehicle.prototype.chainRotate = function () {
        console.log('You need to fix chain first');
    };
    return NonEngineVehicle;
}(Vehicles));
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.sparkPlug = function () {
        console.log('Car need spark plugs');
    };
    return Car;
}(EngineVehicle));
var Bicyle = /** @class */ (function (_super) {
    __extends(Bicyle, _super);
    function Bicyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bicyle.prototype.chainRotate = function () {
        console.log('Fix bicycle chain');
    };
    return Bicyle;
}(NonEngineVehicle));
var obj1 = new Car();
obj1.move();
obj1.sparkPlug();
var obj2 = new Bicyle();
obj2.move();
obj2.chainRotate();
