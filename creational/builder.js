var Car1 = /** @class */ (function () {
    function Car1(name, model, year, seats, insurance, sunroof) {
        this.name = name;
        this.model = model;
        this.year = year;
        this.seats = seats;
        this.insurance = insurance;
        this.sunroof = sunroof;
    }
    // public getName(name: string): string {
    // 	return this.name;
    // }
    // public getModel(model: string): string {
    // 	return this.model;
    // }
    // public getYear(year: number): number {
    // 	return this.year;
    // }
    // public getSeats(seats: number): number {
    // 	return this.seats;
    // }
    // public hasInsurance(insurance: boolean): boolean {
    // 	return this.insurance;
    // }
    // public hasSunroof(sunroof: boolean): boolean {
    // 	return this.sunroof;
    // }
    Car1.prototype.getAll = function () {
        return ('This car is ' +
            this.name +
            ' of model ' +
            this.model +
            ' of year ' +
            this.year +
            ' with ' +
            this.seats +
            'seats and insurance is ' +
            this.insurance +
            ' sunroof ' +
            this.sunroof);
    };
    Car1.CarBuilder = /** @class */ (function () {
        function class_1() {
            this.name = 'Prius';
            this.model = 'Ultra';
            this.year = 2009;
            this.seats = 4;
            this.insurance = false;
            this.sunroof = false;
        }
        class_1.prototype.setName = function (name) {
            this.name = name;
            return this;
        };
        class_1.prototype.setModel = function (model) {
            this.model = model;
            return this;
        };
        class_1.prototype.setYear = function (year) {
            this.year = year;
            return this;
        };
        class_1.prototype.setSeats = function (seats) {
            this.seats = seats;
            return this;
        };
        class_1.prototype.setInsurance = function (insurance) {
            this.insurance = insurance;
            return this;
        };
        class_1.prototype.setSunroof = function (sunroof) {
            this.sunroof = sunroof;
            return this;
        };
        class_1.prototype.build = function () {
            return new Car1(this.name, this.model, this.year, this.seats, this.insurance, this.sunroof);
        };
        return class_1;
    }());
    return Car1;
}());
// client code
var car = new Car1.CarBuilder()
    .setName('Tesla')
    .setModel('Model X')
    .setYear(2024)
    // .setSeats(7)
    // .setInsurance(true)
    // .setSunroof(true)
    .build();
console.log(car.getAll());
