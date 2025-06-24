"use strict";
// one entry, one exit -> done two entries, exit points dont really matter
// four types of vehicles -> done
// prices are hourly/minutes based -> can do, just a logic part
// multiple floors
// diff strategies to find spots, like near elevator, near to entrance, etc -> done
Object.defineProperty(exports, "__esModule", { value: true });
//approach
//strategy pattern on vehicle class with two functions entry() and exit()
// strategy pattern on spot class with different strategies of near Elevator and near Entry
// strategy pattern on ticket class
// added new heap for another entry point (so 3 heaps for Spot near elevator, spot near entry 1, spot near entry 2)
var heap_js_1 = require("heap-js");
var ParkingLot = /** @class */ (function () {
    function ParkingLot(veh, ticket) {
        this.veh = veh;
        this.ticket = ticket;
    }
    ParkingLot.prototype.entry = function () {
        console.log(this.veh.getVehicleType() + ' is incoming');
        this.ticket.entryTimestamp = Date.now(); // here i can implement any date.now or time.now fucntion and get timestamp
    };
    ParkingLot.prototype.exit = function () {
        this.ticket.exitTimestamp = Date.now();
        this.ticket.getTicketPrice();
    };
    return ParkingLot;
}());
var BikePrice = /** @class */ (function () {
    function BikePrice() {
    }
    BikePrice.prototype.baseVehiclePrice = function () {
        return 10;
    };
    return BikePrice;
}());
var CarPrice = /** @class */ (function () {
    function CarPrice() {
    }
    CarPrice.prototype.baseVehiclePrice = function () {
        return 20;
    };
    return CarPrice;
}());
var TruckPrice = /** @class */ (function () {
    function TruckPrice() {
    }
    TruckPrice.prototype.baseVehiclePrice = function () {
        return 30;
    };
    return TruckPrice;
}());
var Ticket = /** @class */ (function () {
    function Ticket(entryTimestamp, exitTimestamp, vehicleType) {
        // public basePrice: number = 10;
        this.entryTimestamp = 1;
        this.exitTimestamp = 10;
        this.entryTimestamp = entryTimestamp;
        this.exitTimestamp = exitTimestamp;
        this.vehicleType = vehicleType;
    }
    Ticket.prototype.getTicketPrice = function () {
        var price = this.vehicleType.baseVehiclePrice() +
            this.exitTimestamp -
            this.entryTimestamp;
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
        return 'Bike';
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
        this.distanceFromEntryPoint1 = new heap_js_1.Heap();
        this.distanceFromEntryPoint2 = new heap_js_1.Heap();
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
                var distEntryPoint1 = Math.pow((5 - i_1), 2) + Math.pow((0 - i_1), 2);
                var distEntryPoint2 = Math.pow((0 - i_1), 2) + Math.pow((0 - i_1), 2);
                this.distanceFromElevator.push([distElevator, "".concat(i_1, ",").concat(j_1)]);
                this.distanceFromEntryPoint1.push([distEntryPoint1, "".concat(i_1, ",").concat(j_1)]);
                this.distanceFromEntryPoint2.push([distEntryPoint2, "".concat(i_1, ",").concat(j_1)]);
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
        else if (type === 'Entry Point 1') {
            this.distanceFromEntryPoint1.push([
                Math.pow((5 - row), 2) + Math.pow((0 - col), 2),
                "".concat(row, ",").concat(col),
            ]);
            console.log("Spot ".concat(row, " ").concat(col, " is unoccupied"));
        }
        else if (type === 'Entry Point 2') {
            this.distanceFromEntryPoint2.push([
                Math.pow((0 - row), 2) + Math.pow((0 - col), 2),
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
var SpotNearEntryPoint1 = /** @class */ (function () {
    function SpotNearEntryPoint1() {
    }
    SpotNearEntryPoint1.prototype.setParkingSpot = function (ps) {
        this.ps = ps;
    };
    SpotNearEntryPoint1.prototype.findSpot = function () {
        var _a = this.ps.distanceFromEntryPoint1.pop(), _ = _a[0], pos = _a[1];
        var _b = pos.split(',').map(Number), a = _b[0], b = _b[1];
        return [a, b];
    };
    SpotNearEntryPoint1.prototype.getTypeSpot = function () {
        return 'Entry Point 1';
    };
    return SpotNearEntryPoint1;
}());
var SpotNearEntryPoint2 = /** @class */ (function () {
    function SpotNearEntryPoint2() {
    }
    SpotNearEntryPoint2.prototype.setParkingSpot = function (ps) {
        this.ps = ps;
    };
    SpotNearEntryPoint2.prototype.findSpot = function () {
        var _a = this.ps.distanceFromEntryPoint2.pop(), _ = _a[0], pos = _a[1];
        var _b = pos.split(',').map(Number), a = _b[0], b = _b[1];
        return [a, b];
    };
    SpotNearEntryPoint2.prototype.getTypeSpot = function () {
        return 'Entry Point 2';
    };
    return SpotNearEntryPoint2;
}());
// client code
var park = new ParkingLot(new Vehicle(new Car()), new Ticket(1, 10, new CarPrice()));
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
var park1 = new ParkingLot(new Vehicle(new Bike()), new Ticket(1, 10, new BikePrice()));
park1.entry();
var spot1 = new SpotNearEntryPoint2();
var parkingSpot1 = new ParkingSpot(spot1);
parkingSpot1.initializeAllSpots();
spot1.setParkingSpot(parkingSpot1);
var _b = parkingSpot1.findParkingSpot(), i1 = _b[0], j1 = _b[1];
if (parkingSpot1.occupy(i1, j1) === true) {
    console.log("Spot ".concat(i1, " ").concat(j1, " is occupied"));
}
else {
    console.log('Error! may be spot is not vacant, try another');
}
park.exit();
parkingSpot.unoccupy(i, j, parkingSpot.getTypeParkingSpot());
park1.exit();
parkingSpot1.unoccupy(i1, j1, parkingSpot1.getTypeParkingSpot());
