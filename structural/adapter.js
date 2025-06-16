var AirConditioner = /** @class */ (function () {
    function AirConditioner() {
    }
    AirConditioner.prototype.connectWifi = function () {
        console.log('AC Connecting to wifi');
    };
    AirConditioner.prototype.startCooling = function () {
        console.log('AC starting cooling');
    };
    AirConditioner.prototype.stopCooling = function () {
        console.log('AC stopping cooling');
    };
    AirConditioner.prototype.disconnectWifi = function () {
        console.log('AC disconnecting wifi');
    };
    return AirConditioner;
}());
var SmartLight = /** @class */ (function () {
    function SmartLight() {
    }
    SmartLight.prototype.connectBluetooth = function () {
        console.log('SmartLight Connecting to bluetooth');
    };
    SmartLight.prototype.start = function () {
        console.log('SmartLight starting ');
    };
    SmartLight.prototype.stop = function () {
        console.log('SmartLight stopping ');
    };
    SmartLight.prototype.disconnectBluetooth = function () {
        console.log('SmartLight disconnecting bluetooth');
    };
    return SmartLight;
}());
var CoffeeMachine = /** @class */ (function () {
    function CoffeeMachine() {
    }
    CoffeeMachine.prototype.connectZigbee = function () {
        console.log('CoffeeMachine Connecting to zigbee');
    };
    CoffeeMachine.prototype.startBrew = function () {
        console.log('CoffeeMachine starting brew ');
    };
    CoffeeMachine.prototype.stopBrew = function () {
        console.log('CoffeeMachine stopping brew');
    };
    CoffeeMachine.prototype.disconnectZigbee = function () {
        console.log('CoffeeMachine disconnecting zigbee');
    };
    return CoffeeMachine;
}());
var AirConditionerAdapter = /** @class */ (function () {
    function AirConditionerAdapter(ac) {
        this.ac = ac;
    }
    AirConditionerAdapter.prototype.on = function () {
        this.ac.connectWifi();
        this.ac.startCooling();
    };
    AirConditionerAdapter.prototype.off = function () {
        this.ac.stopCooling();
        this.ac.disconnectWifi();
    };
    return AirConditionerAdapter;
}());
var SmartLightAdapter = /** @class */ (function () {
    function SmartLightAdapter(sm) {
        this.sm = sm;
    }
    SmartLightAdapter.prototype.on = function () {
        this.sm.connectBluetooth();
        this.sm.start();
    };
    SmartLightAdapter.prototype.off = function () {
        this.sm.stop();
        this.sm.disconnectBluetooth();
    };
    return SmartLightAdapter;
}());
var CoffeeMachineAdapter = /** @class */ (function () {
    function CoffeeMachineAdapter(cm) {
        this.cm = cm;
    }
    CoffeeMachineAdapter.prototype.on = function () {
        this.cm.connectZigbee();
        this.cm.startBrew();
    };
    CoffeeMachineAdapter.prototype.off = function () {
        this.cm.stopBrew();
        this.cm.disconnectZigbee();
    };
    return CoffeeMachineAdapter;
}());
var Remote = /** @class */ (function () {
    function Remote(instance) {
        this.instance = instance;
    }
    Remote.prototype.on = function () {
        this.instance.on();
    };
    Remote.prototype.off = function () {
        this.instance.off();
    };
    return Remote;
}());
// client code
// const aca = new AirConditionerAdapter();
var rm = new Remote(new AirConditionerAdapter(new AirConditioner()));
rm.on();
rm.off();
