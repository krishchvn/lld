var Red = /** @class */ (function () {
    // green: Green;
    // tLs: TrafficLightState;
    function Red(tl) {
        this.tL = tl;
    }
    Red.prototype.next = function (tL) {
        console.log('Red -> Green');
        tl.setState(new Green(tl));
    };
    Red.prototype.getColor = function () {
        console.log('Red');
    };
    return Red;
}());
var Yellow = /** @class */ (function () {
    function Yellow(tl) {
        this.tL = tl;
    }
    Yellow.prototype.next = function (tL) {
        console.log('Yellow -> Red');
        tl.setState(new Red(tl));
    };
    Yellow.prototype.getColor = function () {
        console.log('Yellow');
    };
    return Yellow;
}());
var Green = /** @class */ (function () {
    function Green(tl) {
        this.tL = tl;
    }
    Green.prototype.next = function (tL) {
        console.log('Green -> Yellow');
        tl.setState(new Yellow(tl));
    };
    Green.prototype.getColor = function () {
        console.log('Green');
    };
    return Green;
}());
var TrafficLight = /** @class */ (function () {
    function TrafficLight() {
        this.instance = new Red(tl);
    }
    TrafficLight.prototype.setState = function (instance) {
        this.instance = instance;
    };
    TrafficLight.prototype.next = function () {
        this.instance.next(this);
    };
    TrafficLight.prototype.getColor = function () {
        return this.instance.getColor();
    };
    return TrafficLight;
}());
//client code
var tl = new TrafficLight();
tl.getColor();
tl.next();
tl.getColor();
tl.next();
tl.getColor();
tl.next();
tl.getColor();
// here you have to form a cycle basically
//and how would you do that or how would you pass in what to form a cycle
// ✅ Definition:
// The State Design Pattern allows an object to change its behavior when its internal state changes. It appears as if the object has changed its class.
// Instead of using a bunch of if/else or switch statements to check for a current state and transition to another, we encapsulate each state into its own class, and let the object delegate behavior to the current state object.
// 🚦 Analogy: Traffic Light
// Imagine a traffic light with three states:
// Red
// Green
// Yellow
// Each state knows:
// What color it represents
// What the next state should be
// 🧱 Structure in the Example:
// TrafficLightState (Interface):
// Defines a contract for all states: they must implement:
// next(tL: TrafficLight) – how to move to the next state
// getColor() – to return the current state color
// Concrete State Classes (Red, Green, Yellow):
// Each implements TrafficLightState
// Each knows what the next state is
// When next() is called, it transitions the context (TrafficLight) to a new state
// TrafficLight (Context):
// Holds a reference to the current state
// Delegates calls to the current state via next() and getColor()
// It does not need to know the details of state transitions — those are handled by the current state object
