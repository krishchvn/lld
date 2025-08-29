interface UserInterface {
	card: CardInterface;
	account: AccountInterface;
}

class User implements UserInterface {
	card: CardInterface;
	account: AccountInterface;
}

interface AccountInterface {
	balance: number;
	accountno: string;
	withdrawCash(amount: number): number;
	depositCash(amount: number): number;
	getBalance(): number;
}

class Account {
	balance: number;
	accountno: string;

	constructor(amount: number, accountno: string) {
		this.balance = amount;
		this.accountno = accountno;
	}

	public withdrawCash(amount: number): number {
		if (amount > this.balance) {
			return -1;
		}
		this.balance -= amount;
		return this.balance;
	}

	public depositCash(amount: number): number {
		this.balance += amount;
		return this.balance;
	}

	public getBalance(): number {
		return this.balance;
	}
}

interface CardInterface {
	authenticate(): boolean;
}

class Card {
	public authenticate(): boolean {
		return true;
	}
}

enum ATMStates {
	READY,
	ENTER_PIN,
	AUTHENTICATE,
	TRANSACTION,
	DEPOSIT,
	WITHDRAW,
	BALANCE,
	CASH_DISPENSED,
	ERROR,
	EXIT,
}

interface AtmStateInterface {
	state: ATMStates;
	next(atm: Atm): void;
	getState();
}

class Ready implements AtmStateInterface {
	atm: Atm;
	state: ATMStates;
	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.READY;
	}
	public next(atm: Atm): void {
		console.log('Ready -> EnterPin');
		atm.setState(new EnterPin(this.atm));
	}
	public getState() {
		return this.state;
	}
}

class EnterPin implements AtmStateInterface {
	atm: Atm;
	state: ATMStates;

	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.ENTER_PIN;
	}
	public next(atm: Atm): void {
		console.log(' EnterPin -> Authenticate');
		atm.setState(new Authenticate(this.atm));
	}
	public getState() {
		return this.state;
	}
}
class Authenticate implements AtmStateInterface {
	atm: Atm;
	state: ATMStates;
	card: CardInterface;
	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.AUTHENTICATE;
	}
	public next(atm: Atm): void {
		if (this.card.authenticate() === true) {
			atm.setState(new EnterPin(this.atm));
		} else {
			atm.setState(new Error1(this.atm));
			this.state = ATMStates.ERROR;
		}
	}
	public getState() {
		return this.state;
	}
}
class Transaction implements AtmStateInterface {
	atm: Atm;
	state: ATMStates;
	choice: string = 'Withdraw';
	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.TRANSACTION;
	}
	public next(atm: Atm): void {
		if (this.choice == 'Withdraw') {
			atm.setState(new WithDraw(this.atm));
		} else {
			atm.setState(new Deposit(this.atm));
		}
	}
	public getState() {
		return this.state;
	}
}
class Deposit implements AtmStateInterface {
	atm: Atm;
	account: AccountInterface;
	state: ATMStates;
	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.DEPOSIT;
	}
	public next(atm: Atm): void {
		this.account.depositCash(500);
		atm.setState(new CashDispensed(this.atm));
	}
	public getState() {
		return this.state;
	}
}
class WithDraw implements AtmStateInterface {
	atm: Atm;
	account: AccountInterface;
	state: ATMStates;
	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.WITHDRAW;
	}
	public next(atm: Atm): void {
		let bal: number = this.account.withdrawCash(200);
		if (bal === -1) {
			atm.setState(new Error1(this.atm));
			this.state = ATMStates.ERROR;
		} else {
			atm.setState(new Balance(this.atm));
		}
	}
	public getState() {
		return this.state;
	}
}
class Balance implements AtmStateInterface {
	atm: Atm;
	state: ATMStates;
	account: AccountInterface;
	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.BALANCE;
	}
	public next(atm: Atm): void {
		this.account.getBalance();
		atm.setState(new Exit(this.atm));
	}
	public getState() {
		return this.state;
	}
}
class CashDispensed implements AtmStateInterface {
	atm: Atm;
	state: ATMStates;
	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.CASH_DISPENSED;
	}
	public next(atm: Atm): void {
		console.log('Cash Dispensed');
		atm.setState(new Error1(this.atm));
	}
	public getState() {
		return this.state;
	}
}
class Error1 implements AtmStateInterface {
	atm: Atm;
	state: ATMStates;
	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.ERROR;
	}
	public next(atm: Atm): void {
		throw Error('Error in Transaction');
	}
	public getState() {
		return this.state;
	}
}
class Exit implements AtmStateInterface {
	atm: Atm;
	state: ATMStates;
	public constructor(atm: Atm) {
		this.atm = atm;
		this.state = ATMStates.EXIT;
	}
	public next(atm: Atm): void {
		atm.setState(new Ready(this.atm));
	}
	public getState() {
		return this.state;
	}
}

class Atm {
	public instance: AtmStateInterface;

	public constructor() {
		this.instance = new Ready(atm_obj);
	}
	public setState(instance: AtmStateInterface) {
		this.instance = instance;
	}
	public next() {
		this.instance.next(this);
	}
	public getState() {
		this.instance.getState();
	}
}

const atm_obj = new Atm();
const card = new Card();
const accn = new Account(600, 'abcd1234');

console.log(atm_obj.getState());
atm_obj.next();
console.log(atm_obj.getState());
atm_obj.next();
console.log(atm_obj.getState());
atm_obj.next();
console.log(atm_obj.getState());
atm_obj.next();
console.log(atm_obj.getState());
atm_obj.next();
console.log(atm_obj.getState());
