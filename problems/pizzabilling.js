// factory pattern for pizza
// builder pattern for topping
// singleton pattern for order
// factory pattern for payment
var Margerhita = /** @class */ (function () {
    function Margerhita() {
    }
    // totalOrder: string;
    Margerhita.prototype.createPizza = function () {
        console.log('Creating Margherita');
    };
    return Margerhita;
}());
var Pepperoni = /** @class */ (function () {
    function Pepperoni() {
    }
    // totalOrder: string;
    Pepperoni.prototype.createPizza = function () {
        console.log('Creating Pepperoni');
    };
    return Pepperoni;
}());
var Pizza = /** @class */ (function () {
    function Pizza(type) {
        this.totalOrder = '';
        this.type = type;
    }
    Pizza.prototype.createPizza = function () {
        switch (this.type) {
            case 'margherita':
                var m = new Margerhita();
                m.createPizza();
                this.totalOrder += ' + margherita';
                break;
            case 'pepperoni':
                var p = new Pepperoni();
                p.createPizza();
                this.totalOrder += ' + pepperoni';
                break;
            default:
                console.log('Unknown pizza: defaulting to margherita');
                var m_d = new Margerhita();
                m_d.createPizza();
                break;
        }
    };
    Pizza.prototype.addToppings = function () {
        var top = new Toppings.ToppingsInside()
            .setCheese('yes')
            .setChicken('yes')
            .setMushrooms('yes')
            .build();
        this.totalOrder += top.getCheese();
        this.totalOrder += top.getChicken();
        this.totalOrder += top.getMushrooms();
    };
    Pizza.prototype.generateOrderId = function () {
        console.log('creating pizza ' + this.totalOrder);
        this.orderId = '123456aa';
        return this.orderId;
    };
    return Pizza;
}());
// add builder pattern here
// c toppings
// constructorss
var Toppings = /** @class */ (function () {
    function Toppings(cheese, chickens, mushrooms) {
        this.cheese = '';
        this.chickens = '';
        this.mushrooms = '';
        this.cheese = cheese;
        this.chickens = chickens;
        this.mushrooms = mushrooms;
    }
    Toppings.prototype.getCheese = function () {
        return this.cheese;
    };
    Toppings.prototype.getChicken = function () {
        return this.chickens;
    };
    Toppings.prototype.getMushrooms = function () {
        return this.mushrooms;
    };
    Toppings.ToppingsInside = /** @class */ (function () {
        function class_1() {
            this.cheese = ' + cheese';
            this.chickens = '+ chicken';
            this.mushrooms = '+ msuhroom';
        }
        class_1.prototype.setCheese = function (choice) {
            choice === 'yes' ? (this.cheese = ' + cheese') : (this.cheese = '');
            return this;
        };
        class_1.prototype.setChicken = function (choice) {
            choice === 'yes' ? (this.chickens = ' + chicken') : (this.chickens = '');
            return this;
        };
        class_1.prototype.setMushrooms = function (choice) {
            choice === 'yes'
                ? (this.mushrooms = ' + mushrooms')
                : (this.mushrooms = '');
            return this;
        };
        class_1.prototype.build = function () {
            return new Toppings(this.cheese, this.chickens, this.mushrooms);
        };
        return class_1;
    }());
    return Toppings;
}());
// interface order {
// 	placeOrder(orderId: string): void;
// 	cancelOrder(orderId: string): void;
// 	payForOrder(Payment: Payment): void;
// 	private static etInstance(): Order;
// }
var Order = /** @class */ (function () {
    function Order() {
    }
    // constructor(Payment: Payment, orderId: string) {
    // 	this.Payment = Payment;
    // 	this.orderId = orderId;
    // }
    Order.getInstance = function () {
        if (!Order.instance) {
            Order.instance = new Order();
        }
        return Order.instance;
    };
    Order.prototype.placeOrder = function (orderId) {
        console.log('Placing order for ' + orderId);
    };
    Order.prototype.cancelOrder = function (orderId) {
        console.log('Canceling order for ' + orderId);
    };
    Order.prototype.payForOrder = function () {
        var pay = new Payment();
        pay.cash();
    };
    return Order;
}());
var Payment = /** @class */ (function () {
    function Payment() {
    }
    Payment.prototype.applePay = function () {
        var p = new ApplePay();
        p.pay();
    };
    Payment.prototype.cash = function () {
        var p = new Cash();
        p.pay();
    };
    Payment.prototype.creditCard = function () {
        var p = new CreditCard();
        p.pay();
    };
    Payment.prototype.debitCard = function () {
        var p = new DebitCard();
        p.pay();
    };
    return Payment;
}());
var ApplePay = /** @class */ (function () {
    function ApplePay() {
    }
    // public payment: Payment;
    ApplePay.prototype.pay = function () {
        console.log('Paying through apple pay');
    };
    return ApplePay;
}());
var Cash = /** @class */ (function () {
    function Cash() {
    }
    // public payment: Payment;
    Cash.prototype.pay = function () {
        console.log('Paying through cash');
    };
    return Cash;
}());
var CreditCard = /** @class */ (function () {
    function CreditCard() {
    }
    // public payment: Payment;
    CreditCard.prototype.pay = function () {
        console.log('Paying through credit card');
    };
    return CreditCard;
}());
var DebitCard = /** @class */ (function () {
    function DebitCard() {
    }
    // public payment: Payment;
    DebitCard.prototype.pay = function () {
        console.log('paying through debit card');
    };
    return DebitCard;
}());
// call payemtn class in orderclass
// client code
// call pizza class
// call add toppings class
// call order class
// singleton pattern like if there is already some instance of order, then okay, else create
// client code
var pizzaobj = new Pizza('pepperoni');
pizzaobj.createPizza();
pizzaobj.addToppings();
var orderId = pizzaobj.generateOrderId();
console.log('orderId: ', orderId);
var createOrder = Order.getInstance();
createOrder.placeOrder(orderId);
createOrder.payForOrder(Payment);
createOrder.cancelOrder(orderId);
