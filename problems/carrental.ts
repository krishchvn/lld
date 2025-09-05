interface CarProperties {
	id: string;
	model: string;
	year: string;
	getPricingStategy(): Price;
}

class CarProperty {
	public id: string = '';
	public model: string = '';
	public year: string = '';
	allCars = AllCars.getInstance();
	cp: CarProperties;
	constructor(cp: CarProperties) {
		this.cp = cp;
	}

	public onboard(cp: CarProperties): void {
		this.allCars.addCarstoList(cp);
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
	public getPricingStategy(): Price {
		return new SUVPrice();
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
	public getPricingStategy(): Price {
		return new SedanPrice();
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
	public getPricingStategy(): Price {
		return new MiniPrice();
	}
}

class Borrower {
	public name: string = '';
	private price: PricingStrategy;
	allCars = AllCars.getInstance();
	public carBorrowed: CarProperties;
	prompt = require('prompt-sync')();

	constructor(name: string) {
		this.name = name;
	}

	public setTicket() {
		this.price = new PricingStrategy();
	}

	public borrowCar(carP: CarProperties) {
		this.carBorrowed = this.allCars.carsList.find(
			car => car.model === carP.model
		);
		console.log(this.carBorrowed);
		this.allCars.carsList = this.allCars.carsList.filter(
			car => car.model !== this.carBorrowed.model
		);
		this.price.entryTimestamp = Date.now();
	}

	public returnCar(carP: CarProperties) {
		this.allCars.carsList.push(carP);
		this.price.exitTimestamp = Date.now();
		this.price.calculatePrice(
			this.price.entryTimestamp,
			this.price.exitTimestamp,
			carP.getPricingStategy()
		);
	}
}
// singleton
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

	public addCarstoList(cp: CarProperties): void {
		this.carsList.push(cp);
	}
}

// strategy
interface Price {
	getBasePrice(): number;
}

class PricingStrategy {
	public entryTimestamp: number = 0;
	public exitTimestamp: number = 0;
	price: Price;

	public calculatePrice(
		entryTimestamp: number,
		exitTimestamp: number,
		price: Price
	): void {
		let basePrice: number = price.getBasePrice();
		console.log(
			exitTimestamp - entryTimestamp > 86400
				? basePrice + (exitTimestamp - entryTimestamp - 86400)
				: basePrice
		);
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
const car4 = new CarProperty(new Sedan('45678', 'Camaro', '2022'));

const cars = AllCars.getInstance();

car1.onboard(car1.cp);
car2.onboard(car2.cp);
car3.onboard(car3.cp);
car4.onboard(car4.cp);

cars.availableCars();

const borrower1 = new Borrower('ABC');
borrower1.setTicket();
borrower1.borrowCar(car2.cp);
cars.availableCars();
borrower1.returnCar(car2.cp);

const borrower2 = new Borrower('ABC');
borrower2.setTicket();
borrower1.borrowCar(car3.cp);
borrower1.returnCar(car3.cp);
cars.availableCars();
