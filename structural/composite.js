var AC = /** @class */ (function () {
    function AC() {
    }
    AC.prototype.on = function () {
        console.log('TUrning on AC');
    };
    AC.prototype.off = function () {
        console.log('Turning off AC');
    };
    return AC;
}());
var SmartL = /** @class */ (function () {
    function SmartL() {
    }
    SmartL.prototype.on = function () {
        console.log('Smart light on');
    };
    SmartL.prototype.off = function () {
        console.log('Smart light off');
    };
    return SmartL;
}());
var SmartHomeRemote = /** @class */ (function () {
    function SmartHomeRemote() {
        this.devices = [];
    }
    // public constructor(instance: SmartHome) {
    // 	this.instance = instance;
    // }
    SmartHomeRemote.prototype.addDevice = function (instance) {
        this.devices.push(instance);
    };
    SmartHomeRemote.prototype.removeDevice = function (instance) {
        this.devices = this.devices.filter(function (ins) {
            ins != instance;
        });
        console.log(this.devices, 'devices here');
    };
    SmartHomeRemote.prototype.on = function () {
        this.devices.map(function (device) { return device.on(); });
        console.log('All devices on for ' + JSON.stringify(this.devices));
    };
    SmartHomeRemote.prototype.off = function () {
        this.devices.map(function (device) { return device.off(); });
        console.log('All devices off for ' + JSON.stringify(this.devices));
    };
    return SmartHomeRemote;
}());
//client code
var room1 = new SmartHomeRemote();
var ac = new AC();
var sml = new SmartL();
room1.addDevice(ac);
room1.addDevice(sml);
room1.on();
room1.removeDevice(ac);
room1.on();
room1.off();
var room2 = new SmartHomeRemote();
room2.addDevice(new SmartL());
room2.on();
var floor = new SmartHomeRemote();
floor.addDevice(room1);
floor.on();
floor.off();
// here we need a hierarchical plot -> rooms -> floor -> house, etc
// so we need to create such a layer which will take all room, floor house etc as arguments and add it to list
