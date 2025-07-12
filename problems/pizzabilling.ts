// factory pattern for pizza
// builder pattern for topping
// singleton pattern for order
// factory pattern for payment

interface typePizza {
	createPizza(): void;
}
class Margerhita implements typePizza {
	// totalOrder: string;
	public createPizza(): void {
		console.log('Creating Margherita');
	}
}
class Pepperoni implements typePizza {
	// totalOrder: string;
	public createPizza(): void {
		console.log('Creating Pepperoni');
	}
}

class Pizza {
	orderId: string;
	totalOrder: string = '';
	type: string;

	constructor(type: string) {
		this.type = type;
	}
	createPizza(): void {
		switch (this.type) {
			case 'margherita':
				const m = new Margerhita();
				m.createPizza();
				this.totalOrder += ' + margherita';
				break;
			case 'pepperoni':
				const p = new Pepperoni();
				p.createPizza();
				this.totalOrder += ' + pepperoni';
				break;
			default:
				console.log('Unknown pizza: defaulting to margherita');
				const m_d = new Margerhita();
				m_d.createPizza();
				break;
		}
	}

	addToppings(): void {
		const top: any = new Toppings.ToppingsInside()
			.setCheese('yes')
			.setChicken('yes')
			.setMushrooms('no')
			.build();

		this.totalOrder += top.getCheese();
		this.totalOrder += top.getChicken();
		this.totalOrder += top.getMushrooms();
	}

	generateOrderId(): string {
		console.log('creating pizza ' + this.totalOrder);
		this.orderId = '123456aa';
		return this.orderId;
	}
}

// add builder pattern here
// c toppings
// constructorss

class Toppings {
	private cheese: string = '';
	private chickens: string = '';
	private mushrooms: string = '';
	constructor(cheese: string, chickens: string, mushrooms: string) {
		this.cheese = cheese;
		this.chickens = chickens;
		this.mushrooms = mushrooms;
	}

	public getCheese(): string {
		return this.cheese;
	}
	public getChicken(): string {
		return this.chickens;
	}
	public getMushrooms(): string {
		return this.mushrooms;
	}

	static ToppingsInside = class {
		private cheese = ' + cheese';
		private chickens = '+ chicken';
		private mushrooms = '+ msuhroom';
		private choice: string;

		public setCheese(choice: string): this {
			choice === 'yes' ? (this.cheese = ' + cheese') : (this.cheese = '');
			return this;
		}
		public setChicken(choice: string): this {
			choice === 'yes' ? (this.chickens = ' + chicken') : (this.chickens = '');
			return this;
		}
		public setMushrooms(choice: string): this {
			choice === 'yes'
				? (this.mushrooms = ' + mushrooms')
				: (this.mushrooms = '');
			return this;
		}

		public build(): Toppings {
			return new Toppings(this.cheese, this.chickens, this.mushrooms);
		}
	};
}

// interface order {
// 	placeOrder(orderId: string): void;
// 	cancelOrder(orderId: string): void;
// 	payForOrder(Payment: Payment): void;
// 	private static etInstance(): Order;
// }

class Order {
	public Payment: Payment;
	public orderId: string;
	public static instance: Order;

	// constructor(Payment: Payment, orderId: string) {
	// 	this.Payment = Payment;
	// 	this.orderId = orderId;
	// }

	public static getInstance(): any {
		if (!Order.instance) {
			Order.instance = new Order();
		}
		return Order.instance;
	}

	public placeOrder(orderId: string): void {
		console.log('Placing order for ' + orderId);
	}

	public cancelOrder(orderId: string): void {
		console.log('Canceling order for ' + orderId);
	}

	public payForOrder(): void {
		const pay = new Payment();
		pay.cash();
	}
}

interface payment {
	pay(): void;
}

class Payment {
	public applePay(): void {
		const p = new ApplePay();
		p.pay();
	}
	public cash(): void {
		const p = new Cash();
		p.pay();
	}
	public creditCard(): void {
		const p = new CreditCard();
		p.pay();
	}
	public debitCard(): void {
		const p = new DebitCard();
		p.pay();
	}
}

class ApplePay implements payment {
	// public payment: Payment;
	public pay() {
		console.log('Paying through apple pay');
	}
}
class Cash implements payment {
	// public payment: Payment;
	public pay() {
		console.log('Paying through cash');
	}
}
class CreditCard implements payment {
	// public payment: Payment;
	public pay() {
		console.log('Paying through credit card');
	}
}
class DebitCard implements payment {
	// public payment: Payment;
	public pay() {
		console.log('paying through debit card');
	}
}
// call payemtn class in orderclass

// client code
// call pizza class
// call add toppings class
// call order class
// singleton pattern like if there is already some instance of order, then okay, else create

// client code

const pizzaobj = new Pizza('pepperoni');
pizzaobj.createPizza();
pizzaobj.addToppings();
const orderId = pizzaobj.generateOrderId();
console.log('orderId: ', orderId);

const createOrder = Order.getInstance();
createOrder.placeOrder(orderId);
createOrder.payForOrder(Payment);

createOrder.cancelOrder(orderId);
