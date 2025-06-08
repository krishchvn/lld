abstract class Vehicles {
	public move() {
		console.log('move');
	}
	public chainRotate() {}
	public sparkPlug() {}
}

abstract class EngineVehicle extends Vehicles {
	public sparkPlug() {
		console.log('Entering spark plug world');
	}
}

abstract class NonEngineVehicle extends Vehicles {
	public chainRotate() {
		console.log('You need to fix chain first');
	}
}

class Car extends EngineVehicle {
	public override sparkPlug() {
		console.log('Car need spark plugs');
	}
}

class Bicyle extends NonEngineVehicle {
	public override chainRotate(): void {
		console.log('Fix bicycle chain');
	}
}

const obj1 = new Car();
obj1.move();
obj1.sparkPlug();

const obj2 = new Bicyle();
obj2.move();
obj2.chainRotate();
