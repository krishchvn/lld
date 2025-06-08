class BakeBread {
	public bake() {
		console.log('Inside class of BakeBread');
	}
}

class Inventory {
	public invent() {
		console.log('Inside class of Inventory');
	}
}

class ManageSupplies {
	public manage() {
		console.log('Inside class of ManageSupplies');
	}
}

class CleanBakery {
	public clean() {
		console.log('Inside class of class CleanBakery');
	}
}

const order = new BakeBread();
console.log(order.bake());

const invent = new Inventory();
console.log(invent.invent());

const manage = new ManageSupplies();
console.log(manage.manage());

const clean = new CleanBakery();
console.log(clean.clean());
