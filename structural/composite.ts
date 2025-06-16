interface SmartHome {
	on(): void;
	off(): void;
}

class AC implements SmartHome {
	public on(): void {
		console.log('TUrning on AC');
	}
	public off(): void {
		console.log('Turning off AC');
	}
}

class SmartL implements SmartHome {
	public on(): void {
		console.log('Smart light on');
	}
	public off(): void {
		console.log('Smart light off');
	}
}

class SmartHomeRemote implements SmartHome {
	private devices: SmartHome[] = [];

	// public instance: SmartHome;
	// public constructor(instance: SmartHome) {
	// 	this.instance = instance;
	// }

	public addDevice(instance: SmartHome) {
		this.devices.push(instance);
	}
	public removeDevice(instance: SmartHome) {
		this.devices = this.devices.filter(ins => {
			ins != instance;
		});
	}

	public on() {
		this.devices.map(device => device.on());
		console.log('All devices on for ' + JSON.stringify(this.devices));
	}
	public off() {
		this.devices.map(device => device.off());
		console.log('All devices off for ' + JSON.stringify(this.devices));
	}
}

//client code
const room1 = new SmartHomeRemote();
const ac = new AC();
const sml = new SmartL();
room1.addDevice(ac);
room1.addDevice(sml);
room1.on();

room1.removeDevice(ac);
room1.on();

room1.off();

const room2 = new SmartHomeRemote();
room2.addDevice(new SmartL());

room2.on();

const floor = new SmartHomeRemote();
floor.addDevice(room1);
floor.on();

floor.off();

// here we need a hierarchical plot -> rooms -> floor -> house, etc
// so we need to create such a layer which will take all room, floor house etc as arguments and add it to list

// so if you see here we have created a SMartHomeRemote class which implements interface and also takes the same interface as
// an argument(not direclty), but works on objects referencing to the instance which is why it works
// but for any questions which needs hierarchy, this is a full proof you can implement.
