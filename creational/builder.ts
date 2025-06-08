class Car1 {
	private name: string;
	private model: string;
	private year: number;
	private seats: number;
	private insurance: boolean;
	private sunroof: boolean;

	constructor(
		name: string,
		model: string,
		year: number,
		seats: number,
		insurance: boolean,
		sunroof: boolean
	) {
		this.name = name;
		this.model = model;
		this.year = year;
		this.seats = seats;
		this.insurance = insurance;
		this.sunroof = sunroof;
	}

	public getName(name: string): string {
		return this.name;
	}
	public getModel(model: string): string {
		return this.model;
	}
	public getYear(year: number): number {
		return this.year;
	}
	public getSeats(seats: number): number {
		return this.seats;
	}
	public hasInsurance(insurance: boolean): boolean {
		return this.insurance;
	}
	public hasSunroof(sunroof: boolean): boolean {
		return this.sunroof;
	}

	public getAll() {
		return (
			'This car is ' +
			this.name +
			' of model ' +
			this.model +
			' of year ' +
			this.year +
			' with ' +
			this.seats +
			'seats and insurance is ' +
			this.insurance +
			' sunroof ' +
			this.sunroof
		);
	}

	static CarBuilder = class {
		private name: string = 'Prius';
		private model: string = 'Ultra';
		private year: number = 2009;
		private seats: number = 4;
		private insurance: boolean = false;
		private sunroof: boolean = false;

		public setName(name: string): this {
			this.name = name;
			return this;
		}
		public setModel(model: string): this {
			this.model = model;
			return this;
		}
		public setYear(year: number): this {
			this.year = year;
			return this;
		}
		public setSeats(seats: number): this {
			this.seats = seats;
			return this;
		}
		public setInsurance(insurance: boolean): this {
			this.insurance = insurance;
			return this;
		}
		public setSunroof(sunroof: boolean): this {
			this.sunroof = sunroof;
			return this;
		}

		public build(): Car1 {
			return new Car1(
				this.name,
				this.model,
				this.year,
				this.seats,
				this.insurance,
				this.sunroof
			);
		}
	};
}

// client code

const car = new Car1.CarBuilder()
	.setName('Tesla')
	.setModel('Model X')
	.setYear(2024)
	// .setSeats(7)
	// .setInsurance(true)
	// .setSunroof(true)
	.build();

console.log(car.getAll());

// so this is basically that you give default values in case you don't use all functions that gives values.
// and for those whose you give values, you override them. in java you might need to mention override, but in ts it does automatically
