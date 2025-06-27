var CarProperty = /** @class */ (function () {
    function CarProperty(cp) {
        this.id = '';
        this.model = '';
        this.year = '';
        this.cp = cp;
    }
    return CarProperty;
}());
var SUV = /** @class */ (function () {
    function SUV(id, model, year) {
        this.id = '';
        this.model = '';
        this.year = '';
        this.id = id;
        this.model = model;
        this.year = year;
    }
    return SUV;
}());
var Sedan = /** @class */ (function () {
    function Sedan(id, model, year) {
        this.id = '';
        this.model = '';
        this.year = '';
        this.id = id;
        this.model = model;
        this.year = year;
    }
    return Sedan;
}());
var Mini = /** @class */ (function () {
    function Mini(id, model, year) {
        this.id = '';
        this.model = '';
        this.year = '';
        this.id = id;
        this.model = model;
        this.year = year;
    }
    return Mini;
}());
var Borrower = /** @class */ (function () {
    function Borrower(name) {
        this.name = '';
        this.prompt = require('prompt-sync')();
        this.name = name;
    }
    Borrower.prototype.borrowCar = function (carP) {
        this.carBorrowed = this.allCars.carsList.filter(function (car) { return car.model === carP.model; });
        this.price.entryTimestamp = Date.now();
    };
    Borrower.prototype.returnCar = function (carP) {
        this.allCars.carsList.push(carP);
        this.price.exitTimestamp = Date.now();
        this.price.calculatePrice(this.price.entryTimestamp, this.price.exitTimestamp, new SedanPrice());
    };
    return Borrower;
}());
var AllCars = /** @class */ (function () {
    function AllCars() {
        this.carsList = [];
    }
    AllCars.getInstance = function () {
        if (!AllCars.allCars) {
            AllCars.allCars = new AllCars();
        }
        return AllCars.allCars;
    };
    AllCars.prototype.availableCars = function () {
        console.log(this.carsList);
    };
    return AllCars;
}());
var PricingStrategy = /** @class */ (function () {
    function PricingStrategy() {
    }
    PricingStrategy.prototype.calculatePrice = function (entryTimestamp, exitTimestamp, price) {
        var basePrice = price.getBasePrice();
        return exitTimestamp - entryTimestamp > 86400
            ? basePrice + (exitTimestamp - entryTimestamp - 86400)
            : basePrice;
    };
    return PricingStrategy;
}());
var SUVPrice = /** @class */ (function () {
    function SUVPrice() {
    }
    SUVPrice.prototype.getBasePrice = function () {
        return 50;
    };
    return SUVPrice;
}());
var SedanPrice = /** @class */ (function () {
    function SedanPrice() {
    }
    SedanPrice.prototype.getBasePrice = function () {
        return 40;
    };
    return SedanPrice;
}());
var MiniPrice = /** @class */ (function () {
    function MiniPrice() {
    }
    MiniPrice.prototype.getBasePrice = function () {
        return 30;
    };
    return MiniPrice;
}());
// client code
var car1 = new CarProperty(new SUV('12345', 'Toyota 4Runner', '2018'));
var car2 = new CarProperty(new Sedan('23456', 'Camry', '2019'));
var car3 = new CarProperty(new Mini('34567', 'Mini Cooper', '2015'));
var borrower1 = new Borrower('ABC');
var cars = AllCars.getInstance();
cars.availableCars();
borrower1.borrowCar(car2);
borrower1.returnCar(car2);
