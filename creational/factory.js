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
var VehicleFunctions = /** @class */ (function () {
    function VehicleFunctions() {
    }
    VehicleFunctions.prototype.start = function () { };
    VehicleFunctions.prototype.stop = function () { };
    return VehicleFunctions;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.start = function () {
        console.log('Car starting');
    };
    Car.prototype.stop = function () {
        console.log('Car stopping');
    };
    return Car;
}(VehicleFunctions));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Truck.prototype.start = function () {
        console.log('Truck starting');
    };
    Truck.prototype.stop = function () {
        console.log('Truck stopping');
    };
    return Truck;
}(VehicleFunctions));
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bike.prototype.start = function () {
        console.log('Bike starting');
    };
    Bike.prototype.stop = function () {
        console.log('Bike stopping');
    };
    return Bike;
}(VehicleFunctions));
var Vehicle = /** @class */ (function () {
    function Vehicle() {
    }
    Vehicle.prototype.vehicleType = function (vehicle) {
        if (vehicle === 'Car') {
            var car = new Car();
            car.start();
            car.stop();
        }
        else if (vehicle === 'Truck') {
            var truck = new Truck();
            truck.start();
            truck.stop();
        }
        else if (vehicle === 'Bike') {
            var bike = new Bike();
            bike.start();
            bike.stop();
        }
        else {
            console.error('Unknown vehicle type');
        }
    };
    return Vehicle;
}());
var veh = new Vehicle();
veh.vehicleType('Car');
veh.vehicleType('Bike');
veh.vehicleType('Bicycle');
// this is factory design pattern because you have to create a function which can handle everything, and on the client/main function side
// you can just call anything and it works
// think of that function as an assembly line and you just have to give an order to the assembly line and it will create everything for you
// instead of assembly line you can also call it as a factory where it bulids anything you want, just give the argument to the factory andit will create whatever you want
