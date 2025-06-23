// one entry, one exit
// four types of vehicles
// prices are hourly/minutes based
// multiple floors
// diff strategies to find spots, like near elevator, near to entrance, etc

//approach
//strategy pattern on vehicle class with two functions entry() and exit()
// strategy pattern on spot class with different strategies of near Elevator and near Entry

import { Heap } from 'heap-js';

class ParkingLot {
	public veh: Vehicle;
	public ticket: Ticket;
	// public spot: ParkingSpot;

	constructor(veh: Vehicle, ticket: Ticket) {
		this.veh = veh;
		this.ticket = ticket;
		// this.spot.initializeAllSpots();
	}
	public entry() {
		console.log(this.veh.getVehicleType() + ' is incoming');
	}

	public exit() {
		this.ticket.getTicketPrice();
	}
}

class Ticket {
	public basePrice: number = 10;
	public entryTimestamp: number = 1;
	public exitTimestamp: number = 10;
	public vehicleType: string = '';

	constructor(
		entryTimestamp: number,
		exitTimestamp: number,
		vehicleType: string
	) {
		this.entryTimestamp = entryTimestamp;
		this.exitTimestamp = exitTimestamp;
		this.vehicleType = vehicleType;
	}

	public getTicketPrice(): void {
		let price: number =
			this.basePrice + this.exitTimestamp - this.entryTimestamp;
		console.log('You have to pay ' + price);
	}
}

interface VehicleType {
	entry(): void;
	exit(): void;
	getType(): string;
}

class Bike implements VehicleType {
	public entry(): void {
		console.log('Bike entry');
	}
	public exit(): void {
		console.log('Bike exit');
	}
	public getType(): string {
		return 'Car';
	}
}

class Car implements VehicleType {
	public entry(): void {
		console.log('Car entry');
	}
	public exit(): void {
		console.log('Car exit');
	}
	public getType(): string {
		return 'Car';
	}
}

class Truck implements VehicleType {
	public entry(): void {
		console.log('Truck entry');
	}
	public exit(): void {
		console.log('Truck exit');
	}
	public getType(): string {
		return 'Truck';
	}
}

class Vehicle {
	public vehicleType: VehicleType;
	public constructor(vehicleType: VehicleType) {
		this.vehicleType = vehicleType;
	}

	public setVehicle(vehicleType: VehicleType) {
		this.vehicleType = vehicleType;
	}
	public processVehicleEntry() {
		this.vehicleType.entry();
	}
	public processVehicleExit() {
		this.vehicleType.exit();
	}
	public getVehicleType(): string {
		return this.vehicleType.getType();
	}
}

interface Spot {
	setParkingSpot(ps: ParkingSpot): void;
	findSpot(): [number, number];
	getTypeSpot(): string;
}

class ParkingSpot {
	public row: number = 0;
	public col: number = 0;
	public occupied: boolean = false;
	public spots = new Map<string, boolean>();
	public distanceFromElevator = new Heap<[number, string]>();
	public distanceFromEntry = new Heap<[number, string]>();
	public ps!: Spot;

	public constructor(ps: Spot) {
		this.ps = ps;
		ps.setParkingSpot(this);
	}
	public setSpot(spot: Spot): void {
		this.ps = spot;
	}

	public initializeAllSpots(): void {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				this.spots.set(`${i},${j}`, false);
				let distElevator = (5 - i) ** 2 + (5 - i) ** 2;
				let distEntry = (5 - i) ** 2 + (0 - i) ** 2;

				this.distanceFromElevator.push([distElevator, `${i},${j}`]);
				this.distanceFromEntry.push([distEntry, `${i},${j}`]);
			}
		}
	}

	public occupy(row: number, col: number) {
		if (this.spots.get(`${row},${col}`) === false) {
			this.spots.set(`${row},${col}`, true);
			return true;
		}
		return false;
	}
	public unoccupy(row: number, col: number, type: string): void {
		this.spots.set(`${row},${col}`, false);

		// little bad code
		if (type === 'Elevator') {
			this.distanceFromElevator.push([
				(5 - row) ** 2 + (5 - col) ** 2,
				`${row},${col}`,
			]);
			console.log(`Spot ${row} ${col} is unoccupied`);
		} else if (type === 'Entry') {
			this.distanceFromEntry.push([
				(5 - row) ** 2 + (0 - col) ** 2,
				`${row},${col}`,
			]);
			console.log(`Spot ${row} ${col} is unoccupied`);
		} else {
			console.log('Invalid distance point');
		}
	}
	public findParkingSpot(): [number, number] {
		return this.ps.findSpot();
	}
	public getTypeParkingSpot(): string {
		return this.ps.getTypeSpot();
	}
}

class SpotNearElevator implements Spot {
	ps: ParkingSpot;

	public setParkingSpot(ps: ParkingSpot): void {
		this.ps = ps;
	}

	public findSpot(): [number, number] {
		let [_, pos] = this.ps.distanceFromElevator.pop();
		let [a, b] = pos.split(',').map(Number);
		return [a, b];
	}
	public getTypeSpot(): string {
		return 'Elevator';
	}
}

class SpotNearEntry implements Spot {
	ps: ParkingSpot;

	public setParkingSpot(ps: ParkingSpot): void {
		this.ps = ps;
	}

	public findSpot(): [number, number] {
		let [_, pos] = this.ps.distanceFromEntry.pop();
		let [a, b] = pos.split(',').map(Number);
		return [a, b];
	}
	public getTypeSpot(): string {
		return 'Entry';
	}
}

// client code
const park = new ParkingLot(new Vehicle(new Car()), new Ticket(1, 10, 'Car'));
park.entry();
const spot = new SpotNearElevator();
const parkingSpot = new ParkingSpot(spot);
parkingSpot.initializeAllSpots();
spot.setParkingSpot(parkingSpot);

const [i, j] = parkingSpot.findParkingSpot();
if (parkingSpot.occupy(i, j) === true) {
	console.log(`Spot ${i} ${j} is occupied`);
} else {
	console.log('Error! may be spot is not vacant, try another');
}

const park1 = new ParkingLot(
	new Vehicle(new Bike()),
	new Ticket(1, 10, 'Bike')
);
park1.entry();
const spot1 = new SpotNearEntry();
spot1.setParkingSpot(parkingSpot);
const [i1, j1] = parkingSpot.findParkingSpot();
if (parkingSpot.occupy(i1, j1) === true) {
	console.log(`Spot ${i1} ${j1} is occupied`);
} else {
	console.log('Error! may be spot is not vacant, try another');
}

park.exit();
parkingSpot.unoccupy(i, j, parkingSpot.getTypeParkingSpot());

// const spot = new Vehicle(new Bike());
// spot.processVehicleEntry();
// spot.getVehicleType();

// const spot = new ParkingSpot(new SpotNearElevator());
// const type_spot = spot.getTypeParkingSpot();
// let [r, c] = spot.findParkingSpot();
// spot.occupy(r, c);
// spot.unoccupy(r, c, type_spot);
