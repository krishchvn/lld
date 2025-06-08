interface TrafficLightState {
	next(tL: TrafficLight): void;
	getColor(): void;
}

class Red implements TrafficLightState {
	tL: TrafficLight;
	// green: Green;
	// tLs: TrafficLightState;
	public constructor(tl: TrafficLight) {
		this.tL = tl;
	}

	public next(tL: TrafficLight): void {
		console.log('Red -> Green');
		tl.setState(new Green(tl));
	}
	public getColor(): void {
		console.log('Red');
	}
}

class Yellow implements TrafficLightState {
	// red: Red;
	tL: TrafficLight;
	public constructor(tl: TrafficLight) {
		this.tL = tl;
	}

	public next(tL: TrafficLight): void {
		console.log('Yellow -> Red');
		tl.setState(new Red(tl));
	}
	public getColor(): void {
		console.log('Yellow');
	}
}

class Green implements TrafficLightState {
	// yellow: Yellow;
	tL: TrafficLight;
	public constructor(tl: TrafficLight) {
		this.tL = tl;
	}

	public next(tL: TrafficLight): void {
		console.log('Green -> Yellow');
		tl.setState(new Yellow(tl));
	}
	public getColor(): void {
		console.log('Green');
	}
}

class TrafficLight {
	public instance: TrafficLightState;

	public constructor() {
		this.instance = new Red(tl);
	}

	public setState(instance: TrafficLightState) {
		this.instance = instance;
	}

	public next() {
		this.instance.next(this);
	}

	public getColor() {
		return this.instance.getColor();
	}
}

//client code

const tl = new TrafficLight();
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
