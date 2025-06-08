interface VehicleFunctions {
	start(): void;
	stop(): void;
}

// this is main layer, if this would have been called directly in client code
// then you would have factory design pattern
class BMWFunctions implements VehicleFunctions {
	public start(): void {
		console.log('BMW starts');
	}

	public stop(): void {
		console.log('BMW stops');
	}
}

class HondaFunctions implements VehicleFunctions {
	public start(): void {
		console.log('Honda starts');
	}

	public stop(): void {
		console.log('Honda stops');
	}
}

class HyundaiFunctions implements VehicleFunctions {
	public start(): void {
		console.log('Hyundai starts');
	}

	public stop(): void {
		console.log('Hyundai stops');
	}
}

// this is an extra layer, what you call abstract factory method
interface Company {
	companyName(): any;
}

class BMW implements Company {
	public companyName() {
		return new BMWFunctions();
	}
}

class Honda implements Company {
	public companyName() {
		return new HondaFunctions();
	}
}

class Hyundai implements Company {
	public companyName() {
		return new HyundaiFunctions();
	}
}

// client code
const firstChoice: string = 'BMW';
const secondChoice: string = 'Hyundai';

const firstChoiceObj = new BMW();
const callOne = firstChoiceObj.companyName();
callOne.start();
callOne.stop();

const secondChoiceObj = new Hyundai();
const callTwo = secondChoiceObj.companyName();
callTwo.start();
callTwo.stop();

// this also works, you can access extra layer directly from variables too
firstChoiceObj.companyName().start();
secondChoiceObj.companyName().stop();

// companyName is your extra layer
