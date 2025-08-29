var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var Account = /** @class */ (function () {
    function Account(amount, accountno) {
        this.balance = amount;
        this.accountno = accountno;
    }
    Account.prototype.withdrawCash = function (amount) {
        if (amount > this.balance) {
            return -1;
        }
        this.balance -= amount;
        return this.balance;
    };
    Account.prototype.depositCash = function (amount) {
        this.balance += amount;
        return this.balance;
    };
    Account.prototype.getBalance = function () {
        return this.balance;
    };
    return Account;
}());
var Card = /** @class */ (function () {
    function Card() {
    }
    Card.prototype.authenticate = function () {
        return true;
    };
    return Card;
}());
var ATMStates;
(function (ATMStates) {
    ATMStates[ATMStates["READY"] = 0] = "READY";
    ATMStates[ATMStates["ENTER_PIN"] = 1] = "ENTER_PIN";
    ATMStates[ATMStates["AUTHENTICATE"] = 2] = "AUTHENTICATE";
    ATMStates[ATMStates["TRANSACTION"] = 3] = "TRANSACTION";
    ATMStates[ATMStates["DEPOSIT"] = 4] = "DEPOSIT";
    ATMStates[ATMStates["WITHDRAW"] = 5] = "WITHDRAW";
    ATMStates[ATMStates["BALANCE"] = 6] = "BALANCE";
    ATMStates[ATMStates["CASH_DISPENSED"] = 7] = "CASH_DISPENSED";
    ATMStates[ATMStates["ERROR"] = 8] = "ERROR";
    ATMStates[ATMStates["EXIT"] = 9] = "EXIT";
})(ATMStates || (ATMStates = {}));
var Ready = /** @class */ (function () {
    function Ready(atm) {
        this.atm = atm;
        this.state = ATMStates.READY;
    }
    Ready.prototype.next = function (atm) {
        console.log('Ready -> EnterPin');
        atm.setState(new EnterPin(this.atm));
    };
    Ready.prototype.getState = function () {
        return this.state;
    };
    return Ready;
}());
var EnterPin = /** @class */ (function () {
    function EnterPin(atm) {
        this.atm = atm;
        this.state = ATMStates.ENTER_PIN;
    }
    EnterPin.prototype.next = function (atm) {
        console.log(' EnterPin -> Authenticate');
        atm.setState(new Authenticate(this.atm));
    };
    EnterPin.prototype.getState = function () {
        return this.state;
    };
    return EnterPin;
}());
var Authenticate = /** @class */ (function () {
    function Authenticate(atm) {
        this.atm = atm;
        this.state = ATMStates.AUTHENTICATE;
    }
    Authenticate.prototype.next = function (atm) {
        if (this.card.authenticate() === true) {
            atm.setState(new EnterPin(this.atm));
        }
        else {
            atm.setState(new Error1(this.atm));
            this.state = ATMStates.ERROR;
        }
    };
    Authenticate.prototype.getState = function () {
        return this.state;
    };
    return Authenticate;
}());
var Transaction = /** @class */ (function () {
    function Transaction(atm) {
        this.choice = 'Withdraw';
        this.atm = atm;
        this.state = ATMStates.TRANSACTION;
    }
    Transaction.prototype.next = function (atm) {
        if (this.choice == 'Withdraw') {
            atm.setState(new WithDraw(this.atm));
        }
        else {
            atm.setState(new Deposit(this.atm));
        }
    };
    Transaction.prototype.getState = function () {
        return this.state;
    };
    return Transaction;
}());
var Deposit = /** @class */ (function () {
    function Deposit(atm) {
        this.atm = atm;
        this.state = ATMStates.DEPOSIT;
    }
    Deposit.prototype.next = function (atm) {
        this.account.depositCash(500);
        atm.setState(new CashDispensed(this.atm));
    };
    Deposit.prototype.getState = function () {
        return this.state;
    };
    return Deposit;
}());
var WithDraw = /** @class */ (function () {
    function WithDraw(atm) {
        this.atm = atm;
        this.state = ATMStates.WITHDRAW;
    }
    WithDraw.prototype.next = function (atm) {
        var bal = this.account.withdrawCash(200);
        if (bal === -1) {
            atm.setState(new Error1(this.atm));
            this.state = ATMStates.ERROR;
        }
        else {
            atm.setState(new Balance(this.atm));
        }
    };
    WithDraw.prototype.getState = function () {
        return this.state;
    };
    return WithDraw;
}());
var Balance = /** @class */ (function () {
    function Balance(atm) {
        this.atm = atm;
        this.state = ATMStates.BALANCE;
    }
    Balance.prototype.next = function (atm) {
        this.account.getBalance();
        atm.setState(new Exit(this.atm));
    };
    Balance.prototype.getState = function () {
        return this.state;
    };
    return Balance;
}());
var CashDispensed = /** @class */ (function () {
    function CashDispensed(atm) {
        this.atm = atm;
        this.state = ATMStates.CASH_DISPENSED;
    }
    CashDispensed.prototype.next = function (atm) {
        console.log('Cash Dispensed');
        atm.setState(new Error1(this.atm));
    };
    CashDispensed.prototype.getState = function () {
        return this.state;
    };
    return CashDispensed;
}());
var Error1 = /** @class */ (function () {
    function Error1(atm) {
        this.atm = atm;
        this.state = ATMStates.ERROR;
    }
    Error1.prototype.next = function (atm) {
        throw Error('Error in Transaction');
    };
    Error1.prototype.getState = function () {
        return this.state;
    };
    return Error1;
}());
var Exit = /** @class */ (function () {
    function Exit(atm) {
        this.atm = atm;
        this.state = ATMStates.EXIT;
    }
    Exit.prototype.next = function (atm) {
        atm.setState(new Ready(this.atm));
    };
    Exit.prototype.getState = function () {
        return this.state;
    };
    return Exit;
}());
var Atm = /** @class */ (function () {
    function Atm() {
        this.instance = new Ready(atm_obj);
    }
    Atm.prototype.setState = function (instance) {
        this.instance = instance;
    };
    Atm.prototype.next = function () {
        this.instance.next(this);
    };
    Atm.prototype.getState = function () {
        this.instance.getState();
    };
    return Atm;
}());
var atm_obj = new Atm();
var card = new Card();
var accn = new Account(600, 'abcd1234');
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
