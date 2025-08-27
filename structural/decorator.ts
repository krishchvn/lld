// Strategy interface
interface SizeStrategy {
	getSizeMultiplier(): number;
	getSize(): string;
}

// Concrete strategies
class TallSize implements SizeStrategy {
	getSizeMultiplier(): number {
		return 1.0; // base price
	}
	getSize(): string {
		return 'Tall';
	}
}

class GrandeSize implements SizeStrategy {
	getSizeMultiplier(): number {
		return 1.2;
	}
	getSize(): string {
		return 'Grande';
	}
}

class VentiSize implements SizeStrategy {
	getSizeMultiplier(): number {
		return 1.4;
	}
	getSize(): string {
		return 'Venti';
	}
}

interface Coffee {
	getDesc(): string;
	getBaseCost(): number;
	getTags(): string[];
	size: SizeStrategy;
}

class Espresso implements Coffee {
	size: SizeStrategy;
	constructor(size: SizeStrategy) {
		this.size = size;
	}
	public getDesc(): string {
		return 'Espresso';
	}
	public getBaseCost(): number {
		let c = 5 * this.size.getSizeMultiplier();
		// console.log(c, 'c');
		return c;
	}
	public getTags(): string[] {
		return ['Espresso'];
	}
}

class Latte implements Coffee {
	size: SizeStrategy;
	constructor(size: SizeStrategy) {
		this.size = size;
	}
	public getDesc(): string {
		return 'Latte';
	}
	public getBaseCost(): number {
		return 7 * this.size.getSizeMultiplier();
	}
	public getTags(): string[] {
		return ['Latte'];
	}
}

abstract class CoffeeDecorator implements Coffee {
	protected coffee: Coffee;
	size: SizeStrategy;
	public constructor(coffee: Coffee) {
		this.coffee = coffee;
		this.size = coffee.size;
	}
	public getDesc(): string {
		return this.coffee.getDesc();
	}
	public getBaseCost(): number {
		return this.coffee.getBaseCost();
	}
	public getTags(): string[] {
		return this.coffee.getTags();
	}
	// public getSizeOfCoffee(): string {
	// 	// console.log(this.size.constructor.name, 'aaaaa');
	// 	return this.size.getSize();
	// }
}

class MilkDecorator extends CoffeeDecorator {
	// protected coffee: Coffee;
	public constructor(coffee: Coffee) {
		super(coffee);
		// this.coffee = coffee;
	}
	public getDesc(): string {
		return super.getDesc() + ' Milk';
	}
	public getBaseCost(): number {
		return super.getBaseCost() + 1;
	}
	public getTags(): string[] {
		return [...this.coffee.getTags(), ' Milk'];
	}
}

class SugarDecorator extends CoffeeDecorator {
	// protected coffee: Coffee;
	public constructor(coffee: Coffee) {
		super(coffee);
		// this.coffee = coffee;
	}
	public getDesc(): string {
		return super.getDesc() + ' Sugar';
	}
	public getBaseCost(): number {
		return super.getBaseCost() + 0.5;
	}
	public getTags(): string[] {
		return [...this.coffee.getTags(), ' Sugar'];
	}
}

class SoyMilkDecorator extends CoffeeDecorator {
	// protected coffee: Coffee;
	public constructor(coffee: Coffee) {
		super(coffee);
		// this.coffee = coffee;
	}
	public getDesc(): string {
		return super.getDesc() + ' Soy-Milk';
	}
	public getTags(): string[] {
		return [...this.coffee.getTags(), 'Soy-Milk'];
	}
}

class CouponDecorator extends CoffeeDecorator {
	discount: number;
	public constructor(coffee: Coffee, discount: number) {
		super(coffee);
		this.discount = discount;
	}

	public getDesc(): string {
		return super.getDesc() + ' Coupon Applied';
	}
	public getBaseCost(): number {
		let cost: number = super.getBaseCost();
		console.log(cost);
		// discount on certain toppings
		// if (super.getDesc().includes('Milk') && super.getDesc().includes('Soy')) {
		// 	// cost = cost - (cost % 10);
		// 	cost -= this.discount;
		// }

		// discount on more than or less than x toppings
		// const tags = super.getTags();
		// console.log(tags);
		// if (tags.length > 3) {
		// 	cost -= cost * 0.3;
		// }

		// coupon doesn't work on x size
		console.log(this.size.getSize());
		if (super.getTags().length > 2 && this.size.getSize() !== 'Tall') {
			cost -= cost * 0.3;
		}

		return cost;
	}
}

//driver code

const coffee1 = new CouponDecorator(
	new SoyMilkDecorator(new SugarDecorator(new Espresso(new GrandeSize()))),
	1
);

const yourcoffee = coffee1.getDesc();
const yourprice = coffee1.getBaseCost();

console.log(yourcoffee, yourprice);

const coffee2 = new CouponDecorator(
	new SoyMilkDecorator(new SugarDecorator(new Espresso(new TallSize()))),
	1
);

const yourcoffee1 = coffee2.getDesc();
const yourprice1 = coffee2.getBaseCost();

console.log(yourcoffee1, yourprice1);
