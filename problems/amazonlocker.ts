enum SizeEnum {
	SMALL,
	MEDIUM,
	LARGE,
}

class Locker {
	public lockerId: number;
	public size: SizeEnum;
	public isAssigned: boolean;
	public pin: number;

	public constructor(lockerId: number, size: SizeEnum) {
		this.lockerId = lockerId;
		this.size = size;
		this.pin = -1;
	}

	public assign(pin: number): void {
		this.isAssigned = true;
		this.pin = pin;
	}
	public unassign() {
		this.isAssigned = false;
		this.pin = -1;
	}

	public authenticatePin(pin: number) {
		return this.isAssigned && this.pin === pin;
	}
}

class Customer {
	pin: number;
	customerId: number;
	latitude: number;
	longitude: number;
	assignedLocker: number;
	public constructor(customerId: number, latitude: number, longitude: number) {
		this.pin = -1;
		this.customerId = customerId;
		this.latitude = latitude;
		this.longitude = longitude;
		this.assignedLocker = -1;
	}

	public update(lockerId: number, pin: number) {
		this.assignedLocker = lockerId;
		this.pin = pin;
	}
	public orderPackage(size: SizeEnum, amazonlocker: AmazonLockerInterface) {
		// amazonlocker.assign_l;
	}
	public unAssignLocker(pin: number, locker: Locker): boolean {
		if (this.assignedLocker !== -1 && locker.authenticatePin(pin)) {
			this.assignedLocker = -1;
			this.pin = -1;
			console.log('Locker from ' + this.customerId + ' unassigned');
			return true;
		} else {
			console.log('Some error while unassigning locker');
			return false;
		}
	}
	public getLatitude() {
		return this.latitude;
	}
	public getLongitude() {
		return this.longitude;
	}
}

interface DistanceStrategy {
	getDistance(latitude: number, longitude: number): number;
}

class EuclideanDistance implements DistanceStrategy {
	public getDistance(latitude: number, longitude: number): number {
		return (longitude ** 2 - latitude ** 2) ** 0.5;
	}
}

interface AmazonLockerInterface {
	instance: AmazonLocker;
	getInstance();
}

class AmazonLocker {
	distance: number;
	private static instance: AmazonLocker;
	private constructor(distance: DistanceStrategy, customer: Customer) {
		AmazonLocker.instance.distance = distance.getDistance(
			customer.getLatitude(),
			customer.getLongitude()
		);
	}

	public static getInstance() {
		if (!AmazonLocker.instance) {
			AmazonLocker.instance = new AmazonLocker(
				new EuclideanDistance(),
				new Customer(123, 3, 8)
			);
		}
		return AmazonLocker.instance;
	}

	public findClosest() {
		closestLocation: 
	}
}

const locker = AmazonLocker.getInstance();
