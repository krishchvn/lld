var BakeBread = /** @class */ (function () {
	function BakeBread() {}
	BakeBread.prototype.bake = function () {
		console.log('Inside class of BakeBread');
	};
	return BakeBread;
})();
var Inventory = /** @class */ (function () {
	function Inventory() {}
	Inventory.prototype.invent = function () {
		console.log('Inside class of Inventory');
	};
	return Inventory;
})();
var ManageSupplies = /** @class */ (function () {
	function ManageSupplies() {}
	ManageSupplies.prototype.manage = function () {
		console.log('Inside class of ManageSupplies');
	};
	return ManageSupplies;
})();
var CleanBakery = /** @class */ (function () {
	function CleanBakery() {}
	CleanBakery.prototype.clean = function () {
		console.log('Inside class of class CleanBakery');
	};
	return CleanBakery;
})();
var order = new BakeBread();
console.log(order.bake());
var invent = new Inventory();
console.log(invent.invent());
var manage = new ManageSupplies();
console.log(manage.manage());
var clean = new CleanBakery();
console.log(clean.clean());
