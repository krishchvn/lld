// you are not adding anything to carsList
// make an observer pattern that qwhenever a new object of CarProperty is created, add it to carsList

interface CarProperties {
	id: string;
	model: string;
	year: string;
}

class CarProperty {
	public id: string = '';
	public model: string = '';
	public year: string = '';

	cp: CarProperties;
	constructor(cp: CarProperties) {
		this.cp = cp;
	}
}

class SUV implements CarProperties {
	public id: string = '';
	public model: string = '';
	public year: string = '';
	constructor(id: string, model: string, year: string) {
		this.id = id;
		this.model = model;
		this.year = year;
	}
}
class Sedan implements CarProperties {
	public id: string = '';
	public model: string = '';
	public year: string = '';
	constructor(id: string, model: string, year: string) {
		this.id = id;
		this.model = model;
		this.year = year;
	}
}
class Mini implements CarProperties {
	public id: string = '';
	public model: string = '';
	public year: string = '';
	constructor(id: string, model: string, year: string) {
		this.id = id;
		this.model = model;
		this.year = year;
	}
}

class Borrower {
	public name: string = '';
	private price: PricingStrategy;
	private allCars: AllCars;
	public carBorrowed: CarProperties[];
	prompt = require('prompt-sync')();

	constructor(name: string) {
		this.name = name;
	}

	public borrowCar(carP: CarProperties) {
		this.carBorrowed = this.allCars.carsList.filter(
			car => car.model === carP.model
		);
		this.price.entryTimestamp = Date.now();
	}

	public returnCar(carP: CarProperties) {
		this.allCars.carsList.push(carP);
		this.price.exitTimestamp = Date.now();
		this.price.calculatePrice(
			this.price.entryTimestamp,
			this.price.exitTimestamp,
			new SedanPrice()
		);
	}
}

class AllCars {
	public carsList: CarProperties[] = [];
	public static allCars: AllCars;

	private constructor() {}

	public static getInstance() {
		if (!AllCars.allCars) {
			AllCars.allCars = new AllCars();
		}
		return AllCars.allCars;
	}

	public availableCars(): void {
		console.log(this.carsList);
	}
}

interface Price {
	getBasePrice(): number;
}

class PricingStrategy {
	public entryTimestamp: number;
	public exitTimestamp: number;
	price: Price;

	public calculatePrice(
		entryTimestamp: number,
		exitTimestamp: number,
		price: Price
	): number {
		let basePrice: number = price.getBasePrice();
		return exitTimestamp - entryTimestamp > 86400
			? basePrice + (exitTimestamp - entryTimestamp - 86400)
			: basePrice;
	}
}

class SUVPrice implements Price {
	public getBasePrice(): number {
		return 50;
	}
}
class SedanPrice implements Price {
	public getBasePrice(): number {
		return 40;
	}
}
class MiniPrice implements Price {
	public getBasePrice(): number {
		return 30;
	}
}

// client code
const car1 = new CarProperty(new SUV('12345', 'Toyota 4Runner', '2018'));
const car2 = new CarProperty(new Sedan('23456', 'Camry', '2019'));
const car3 = new CarProperty(new Mini('34567', 'Mini Cooper', '2015'));

const borrower1 = new Borrower('ABC');

const cars = AllCars.getInstance();
cars.availableCars();

borrower1.borrowCar(car2);

borrower1.returnCar(car2);
