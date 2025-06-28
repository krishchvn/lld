// you are not adding anything to carsList
// make an observer pattern that qwhenever a new object of CarProperty is created, add it to carsList
var CarProperty = /** @class */ (function () {
    function CarProperty(cp) {
        this.id = '';
        this.model = '';
        this.year = '';
        this.allCars = AllCars.getInstance();
        this.cp = cp;
    }
    CarProperty.prototype.onboard = function (cp) {
        this.allCars.addCarstoList(cp);
    };
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
        this.allCars = AllCars.getInstance();
        this.carBorrowed = [];
        this.prompt = require('prompt-sync')();
        this.name = name;
    }
    Borrower.prototype.setTicket = function () {
        this.price = new PricingStrategy();
    };
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
    AllCars.prototype.addCarstoList = function (cp) {
        console.log(this.carsList, '2');
        this.carsList.push(cp);
    };
    return AllCars;
}());
var PricingStrategy = /** @class */ (function () {
    function PricingStrategy() {
        this.entryTimestamp = 0;
        this.exitTimestamp = 0;
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
var cars = AllCars.getInstance();
cars.availableCars();
car1.onboard(car1);
car2.onboard(car2);
car3.onboard(car3);
var borrower1 = new Borrower('ABC');
borrower1.setTicket();
borrower1.borrowCar(car2);
borrower1.returnCar(car2);
