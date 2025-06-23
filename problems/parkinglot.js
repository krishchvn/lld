"use strict";
// one entry, one exit
// four types of vehicles
// prices are hourly/minutes based
// multiple floors
// diff strategies to find spots, like near elevator, near to entrance, etc
Object.defineProperty(exports, "__esModule", { value: true });
//approach
//strategy pattern on vehicle class with two functions entry() and exit()
// strategy pattern on spot class with different strategies of near Elevator and near Entry
var heap_js_1 = require("heap-js");
var ParkingLot = /** @class */ (function () {
    // public spot: ParkingSpot;
    function ParkingLot(veh, ticket) {
        this.veh = veh;
        this.ticket = ticket;
        // this.spot.initializeAllSpots();
    }
    ParkingLot.prototype.entry = function () {
        console.log(this.veh.getVehicleType() + ' is incoming');
    };
    ParkingLot.prototype.exit = function () {
        this.ticket.getTicketPrice();
    };
    return ParkingLot;
}());
var Ticket = /** @class */ (function () {
    function Ticket(entryTimestamp, exitTimestamp, vehicleType) {
        this.basePrice = 10;
        this.entryTimestamp = 1;
        this.exitTimestamp = 10;
        this.vehicleType = '';
        this.entryTimestamp = entryTimestamp;
        this.exitTimestamp = exitTimestamp;
        this.vehicleType = vehicleType;
    }
    Ticket.prototype.getTicketPrice = function () {
        var price = this.basePrice + this.exitTimestamp - this.entryTimestamp;
        console.log('You have to pay ' + price);
    };
    return Ticket;
}());
var Bike = /** @class */ (function () {
    function Bike() {
    }
    Bike.prototype.entry = function () {
        console.log('Bike entry');
    };
    Bike.prototype.exit = function () {
        console.log('Bike exit');
    };
    Bike.prototype.getType = function () {
        return 'Car';
    };
    return Bike;
}());
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.entry = function () {
        console.log('Car entry');
    };
    Car.prototype.exit = function () {
        console.log('Car exit');
    };
    Car.prototype.getType = function () {
        return 'Car';
    };
    return Car;
}());
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.entry = function () {
        console.log('Truck entry');
    };
    Truck.prototype.exit = function () {
        console.log('Truck exit');
    };
    Truck.prototype.getType = function () {
        return 'Truck';
    };
    return Truck;
}());
var Vehicle = /** @class */ (function () {
    function Vehicle(vehicleType) {
        this.vehicleType = vehicleType;
    }
    Vehicle.prototype.setVehicle = function (vehicleType) {
        this.vehicleType = vehicleType;
    };
    Vehicle.prototype.processVehicleEntry = function () {
        this.vehicleType.entry();
    };
    Vehicle.prototype.processVehicleExit = function () {
        this.vehicleType.exit();
    };
    Vehicle.prototype.getVehicleType = function () {
        return this.vehicleType.getType();
    };
    return Vehicle;
}());
var ParkingSpot = /** @class */ (function () {
    function ParkingSpot(ps) {
        this.row = 0;
        this.col = 0;
        this.occupied = false;
        this.spots = new Map();
        this.distanceFromElevator = new heap_js_1.Heap();
        this.distanceFromEntry = new heap_js_1.Heap();
        this.ps = ps;
        ps.setParkingSpot(this);
    }
    ParkingSpot.prototype.setSpot = function (spot) {
        this.ps = spot;
    };
    ParkingSpot.prototype.initializeAllSpots = function () {
        for (var i_1 = 0; i_1 < 10; i_1++) {
            for (var j_1 = 0; j_1 < 10; j_1++) {
                this.spots.set("".concat(i_1, ",").concat(j_1), false);
                var distElevator = Math.pow((5 - i_1), 2) + Math.pow((5 - i_1), 2);
                var distEntry = Math.pow((5 - i_1), 2) + Math.pow((0 - i_1), 2);
                this.distanceFromElevator.push([distElevator, "".concat(i_1, ",").concat(j_1)]);
                this.distanceFromEntry.push([distEntry, "".concat(i_1, ",").concat(j_1)]);
            }
        }
    };
    ParkingSpot.prototype.occupy = function (row, col) {
        if (this.spots.get("".concat(row, ",").concat(col)) === false) {
            this.spots.set("".concat(row, ",").concat(col), true);
            return true;
        }
        return false;
    };
    ParkingSpot.prototype.unoccupy = function (row, col, type) {
        this.spots.set("".concat(row, ",").concat(col), false);
        // little bad code
        if (type === 'Elevator') {
            this.distanceFromElevator.push([
                Math.pow((5 - row), 2) + Math.pow((5 - col), 2),
                "".concat(row, ",").concat(col),
            ]);
            console.log("Spot ".concat(row, " ").concat(col, " is unoccupied"));
        }
        else if (type === 'Entry') {
            this.distanceFromEntry.push([
                Math.pow((5 - row), 2) + Math.pow((0 - col), 2),
                "".concat(row, ",").concat(col),
            ]);
            console.log("Spot ".concat(row, " ").concat(col, " is unoccupied"));
        }
        else {
            console.log('Invalid distance point');
        }
    };
    ParkingSpot.prototype.findParkingSpot = function () {
        return this.ps.findSpot();
    };
    ParkingSpot.prototype.getTypeParkingSpot = function () {
        return this.ps.getTypeSpot();
    };
    return ParkingSpot;
}());
var SpotNearElevator = /** @class */ (function () {
    function SpotNearElevator() {
    }
    SpotNearElevator.prototype.setParkingSpot = function (ps) {
        this.ps = ps;
    };
    SpotNearElevator.prototype.findSpot = function () {
        var _a = this.ps.distanceFromElevator.pop(), _ = _a[0], pos = _a[1];
        var _b = pos.split(',').map(Number), a = _b[0], b = _b[1];
        return [a, b];
    };
    SpotNearElevator.prototype.getTypeSpot = function () {
        return 'Elevator';
    };
    return SpotNearElevator;
}());
var SpotNearEntry = /** @class */ (function () {
    function SpotNearEntry() {
    }
    SpotNearEntry.prototype.setParkingSpot = function (ps) {
        this.ps = ps;
    };
    SpotNearEntry.prototype.findSpot = function () {
        var _a = this.ps.distanceFromEntry.pop(), _ = _a[0], pos = _a[1];
        var _b = pos.split(',').map(Number), a = _b[0], b = _b[1];
        return [a, b];
    };
    SpotNearEntry.prototype.getTypeSpot = function () {
        return 'Entry';
    };
    return SpotNearEntry;
}());
// client code
var park = new ParkingLot(new Vehicle(new Car()), new Ticket(1, 10, 'Car'));
park.entry();
var spot = new SpotNearElevator();
var parkingSpot = new ParkingSpot(spot);
parkingSpot.initializeAllSpots();
spot.setParkingSpot(parkingSpot);
var _a = parkingSpot.findParkingSpot(), i = _a[0], j = _a[1];
if (parkingSpot.occupy(i, j) === true) {
    console.log("Spot ".concat(i, " ").concat(j, " is occupied"));
}
else {
    console.log('Error! may be spot is not vacant, try another');
}
var park1 = new ParkingLot(new Vehicle(new Bike()), new Ticket(1, 10, 'Bike'));
park1.entry();
var spot1 = new SpotNearEntry();
spot1.setParkingSpot(parkingSpot);
var _b = parkingSpot.findParkingSpot(), i1 = _b[0], j1 = _b[1];
if (parkingSpot.occupy(i1, j1) === true) {
    console.log("Spot ".concat(i1, " ").concat(j1, " is occupied"));
}
else {
    console.log('Error! may be spot is not vacant, try another');
}
park.exit();
parkingSpot.unoccupy(i, j, parkingSpot.getTypeParkingSpot());
// const spot = new Vehicle(new Bike());
// spot.processVehicleEntry();
// spot.getVehicleType();
// const spot = new ParkingSpot(new SpotNearElevator());
// const type_spot = spot.getTypeParkingSpot();
// let [r, c] = spot.findParkingSpot();
// spot.occupy(r, c);
// spot.unoccupy(r, c, type_spot);
