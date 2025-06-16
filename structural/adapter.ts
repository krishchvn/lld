class AirConditioner {
	public connectWifi(): void {
		console.log('AC Connecting to wifi');
	}
	public startCooling(): void {
		console.log('AC starting cooling');
	}
	public stopCooling(): void {
		console.log('AC stopping cooling');
	}
	public disconnectWifi(): void {
		console.log('AC disconnecting wifi');
	}
}

class SmartLight {
	public connectBluetooth(): void {
		console.log('SmartLight Connecting to bluetooth');
	}
	public start(): void {
		console.log('SmartLight starting ');
	}
	public stop(): void {
		console.log('SmartLight stopping ');
	}
	public disconnectBluetooth(): void {
		console.log('SmartLight disconnecting bluetooth');
	}
}

class CoffeeMachine {
	public connectZigbee(): void {
		console.log('CoffeeMachine Connecting to zigbee');
	}
	public startBrew(): void {
		console.log('CoffeeMachine starting brew ');
	}
	public stopBrew(): void {
		console.log('CoffeeMachine stopping brew');
	}
	public disconnectZigbee(): void {
		console.log('CoffeeMachine disconnecting zigbee');
	}
}

interface Adapter {
	on(): void;
	off(): void;
}

class AirConditionerAdapter implements Adapter {
	private ac: AirConditioner;
	constructor(ac: AirConditioner) {
		this.ac = ac;
	}
	public on(): void {
		this.ac.connectWifi();
		this.ac.startCooling();
	}
	public off(): void {
		this.ac.stopCooling();
		this.ac.disconnectWifi();
	}
}

class SmartLightAdapter implements Adapter {
	private sm: SmartLight;
	constructor(sm: SmartLight) {
		this.sm = sm;
	}
	public on(): void {
		this.sm.connectBluetooth();
		this.sm.start();
	}
	public off(): void {
		this.sm.stop();
		this.sm.disconnectBluetooth();
	}
}

class CoffeeMachineAdapter implements Adapter {
	private cm: CoffeeMachine;
	constructor(cm: CoffeeMachine) {
		this.cm = cm;
	}
	public on(): void {
		this.cm.connectZigbee();
		this.cm.startBrew();
	}
	public off(): void {
		this.cm.stopBrew();
		this.cm.disconnectZigbee();
	}
}

class Remote {
	public instance: Adapter;
	public constructor(instance: Adapter) {
		this.instance = instance;
	}

	public on() {
		this.instance.on();
	}
	public off() {
		this.instance.off();
	}
}

// client code
const rm = new Remote(new AirConditionerAdapter(new AirConditioner()));
rm.on();
rm.off();

// so here we have diff functions inside diff classes, so we need to have common functions ie, on() and off() here to categorize
// all functions
// as functions are common, we can define an interface and have classes implement that interface, now we directly
// cant call adapter classes, so need a layer between those classes to call from client code

// that is exactly what we have done here in remote class
// but the issue in this code is it violates the dependency inversion principle, high level modules such as
// remote class is dependent on which Adapter class is called which depends on which class is called.
// instead we could do something like Aryan Mittal's code for remote class below

// public class SmartHomeController {
//   public static void main(String[] args) {
//     // Create adapters for each device
//     SmartDevice airConditioner =
//         new AirConditionerAdapter(new AirConditioner());
//     SmartDevice smartLight = new SmartLightAdapter(new SmartLight());
//     SmartDevice coffeeMachine = new CoffeeMachineAdapter(new CoffeeMachine());
//     // Control devices through the unified interface
//     airConditioner.turnOn();
//     smartLight.turnOn();
//     coffeeMachine.turnOn();
//     airConditioner.turnOff();
//     smartLight.turnOff();
//     coffeeMachine.turnOff();
//   }
// }

// the question is, how will you call this in client code? you need to use block nested loops here anyway for logic.
// which i dont think is that correct, either
// ehh you get the idea though what do to, right?
