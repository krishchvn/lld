interface Shape {
	calcArea: () => number;
	calcPeri: () => number;
}

class Square implements Shape {
	public constructor(private side: number) {
		this.side = side;
	}

	public calcArea() {
		return this.side * this.side;
	}
	public calcPeri() {
		return 4 * this.side;
	}
}

class Rectangle implements Shape {
	public constructor(private length: number, private width: number) {
		this.length = length;
		this.width = width;
	}

	public calcArea() {
		return this.length * this.width;
	}
	public calcPeri() {
		return 2 * (this.length + this.width);
	}
}

const area_1 = new Square(2);
console.log(area_1.calcArea());
console.log(area_1.calcPeri());
