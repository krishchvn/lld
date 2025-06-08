var CreditCard = /** @class */ (function () {
    function CreditCard() {
    }
    CreditCard.prototype.processPayment = function () {
        console.log('Credit card payment processing');
    };
    return CreditCard;
}());
var Cash = /** @class */ (function () {
    function Cash() {
    }
    Cash.prototype.processPayment = function () {
        console.log('Cash payment processing');
    };
    return Cash;
}());
var ApplePay = /** @class */ (function () {
    function ApplePay() {
    }
    ApplePay.prototype.processPayment = function () {
        console.log('Apple Pay payment processing');
    };
    return ApplePay;
}());
var PaymentProcesser = /** @class */ (function () {
    function PaymentProcesser(payment) {
        this.payment = payment;
    }
    PaymentProcesser.prototype.processPayment = function () {
        this.payment.processPayment();
    };
    PaymentProcesser.prototype.setPayment = function (payment) {
        this.payment = payment;
    };
    return PaymentProcesser;
}());
// client code
var pay = new PaymentProcesser(new CreditCard());
pay.processPayment();
var pay1 = new PaymentProcesser(new ApplePay());
pay1.processPayment();
pay1.setPayment(new Cash());
pay1.processPayment();
// from what i understood
// in PaymentProcessor class, you are referencing interface Payment
// that means, the memory of interface is now in PaymentProcessor class
// you need to access it
// now, whenever you call an object of PaymentProcessor class
// and assign it another object, let's say CreditCard class's object
// now in constructor, that interface's memory => CreditCard's object
// and when you call processPayment, it obviously accesses interface's declared function
// where CreditCard's object resides now, that is why it calls CreditCard class and outputs the console log there
// real stuff :BOOM
// so in strategy pattern, you have to get a reference of abstract class/interface and assign the reference to
// object that you call
// and you call it in the extra layer class, here PaymentProcessor
// What You Got Right:
//     The PaymentProcessor class holds a reference to a Payment interface
//         ✅ Correct: Payment is a type/interface, and the class holds a variable that’s typed as Payment.
//     You assign a CreditCard object (which implements Payment)
//         ✅ Correct: You pass in an instance of CreditCard, which conforms to the Payment interface.
//     When you call processPayment(), it calls the method on CreditCard
//         ✅ Correct: This is polymorphism — even though you’re calling processPayment() on a variable typed as Payment, the actual object is a CreditCard, so its version of the method is called.
// 🔧 Slight Fixes (Important Nuances)
// Your Wording	Corrected Concept
// “the memory of the interface is now in PaymentProcessor”	Interfaces don’t occupy memory at runtime — the object does. You're storing a reference to an object that implements the interface.
// “interface's memory => CreditCard’s object”	Better phrased: “The variable typed as Payment now points to a CreditCard object.”
// “it accesses interface's declared function”	Technically: it calls the method declared in the interface, but implemented in the CreditCard class. The interface just ensures the method exists.
