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
    SUV.prototype.getPricingStategy = function () {
        return new SUVPrice();
    };
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
    Sedan.prototype.getPricingStategy = function () {
        return new SedanPrice();
    };
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
    Mini.prototype.getPricingStategy = function () {
        return new MiniPrice();
    };
    return Mini;
}());
var Borrower = /** @class */ (function () {
    function Borrower(name) {
        this.name = '';
        this.allCars = AllCars.getInstance();
        this.prompt = require('prompt-sync')();
        this.name = name;
    }
    Borrower.prototype.setTicket = function () {
        this.price = new PricingStrategy();
    };
    Borrower.prototype.borrowCar = function (carP) {
        var _this = this;
        this.carBorrowed = this.allCars.carsList.find(function (car) { return car.model === carP.model; });
        console.log(this.carBorrowed);
        this.allCars.carsList = this.allCars.carsList.filter(function (car) { return car.model !== _this.carBorrowed.model; });
        this.price.entryTimestamp = Date.now();
    };
    Borrower.prototype.returnCar = function (carP) {
        this.allCars.carsList.push(carP);
        this.price.exitTimestamp = Date.now();
        this.price.calculatePrice(this.price.entryTimestamp, this.price.exitTimestamp, carP.getPricingStategy());
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
        console.log(exitTimestamp - entryTimestamp > 86400
            ? basePrice + (exitTimestamp - entryTimestamp - 86400)
            : basePrice);
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
var car4 = new CarProperty(new Sedan('45678', 'Camaro', '2022'));
var cars = AllCars.getInstance();
car1.onboard(car1.cp);
car2.onboard(car2.cp);
car3.onboard(car3.cp);
car4.onboard(car4.cp);
cars.availableCars();
var borrower1 = new Borrower('ABC');
borrower1.setTicket();
borrower1.borrowCar(car2.cp);
cars.availableCars();
borrower1.returnCar(car2.cp);
var borrower2 = new Borrower('ABC');
borrower2.setTicket();
borrower1.borrowCar(car3.cp);
borrower1.returnCar(car3.cp);
cars.availableCars();
