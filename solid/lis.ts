abstract class Vehicles {
	public move() {
		console.log('move');
	}
	public chainRotate() {
		console.log('Chain Rotate');
	}
	public sparkPlug() {
		console.log('Spark Plug');
	}
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

class Car2 extends EngineVehicle {
	public sparkPlug() {
		console.log('Car need spark plugs');
	}
}

class Bicyle extends NonEngineVehicle {
	public chainRotate(): void {
		console.log('Fix bicycle chain');
	}
}

const obj1 = new Car2();
obj1.move();
obj1.sparkPlug();

const obj2 = new Bicyle();
obj2.move();
obj2.chainRotate();
