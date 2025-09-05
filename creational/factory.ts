abstract class VehicleFunctions {
	public start(): void {}
	public stop(): void {}
}

class Car extends VehicleFunctions {
	public start() {
		console.log('Car starting');
	}
	public override stop() {
		console.log('Car stopping');
	}
}

class Truck extends VehicleFunctions {
	public start() {
		console.log('Truck starting');
	}
	public override stop() {
		console.log('Truck stopping');
	}
}

class Bike extends VehicleFunctions {
	public start() {
		console.log('Bike starting');
	}
	public stop() {
		console.log('Bike stopping');
	}
}

class Vehicle {
	public vehicleType(vehicle: string): void {
		if (vehicle === 'Car') {
			const car = new Car();
			car.start();
			car.stop();
		} else if (vehicle === 'Truck') {
			const truck = new Truck();
			truck.start();
			truck.stop();
		} else if (vehicle === 'Bike') {
			const bike = new Bike();
			bike.start();
			bike.stop();
		} else {
			console.error('Unknown vehicle type');
		}
	}
}

const veh = new Vehicle();
veh.vehicleType('Car');
veh.vehicleType('Bike');
veh.vehicleType('Bicycle');

// this is factory design pattern because you have to create a function which can handle everything, and on the client/main function side
// you can just call anything and it works

// think of that function as an assembly line and you just have to give an order to the assembly line and it will create everything for you
// instead of assembly line you can also call it as a factory where it bulids anything you want, just give the argument to the factory andit will create whatever you want
