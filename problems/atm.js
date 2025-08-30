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
        atm.setState(new Authenticate(this.atm, this.atm.getCardObj()));
    };
    EnterPin.prototype.getState = function () {
        return this.state;
    };
    return EnterPin;
}());
var Authenticate = /** @class */ (function () {
    function Authenticate(atm, card) {
        this.atm = atm;
        this.state = ATMStates.AUTHENTICATE;
        this.card = card;
    }
    Authenticate.prototype.next = function (atm) {
        if (this.atm.card.authenticate() === true) {
            atm.setState(new Transaction(this.atm));
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
            atm.setState(new WithDraw(this.atm, this.atm.getAccnObj()));
        }
        else {
            atm.setState(new Deposit(this.atm, this.atm.getAccnObj()));
        }
    };
    Transaction.prototype.getState = function () {
        return this.state;
    };
    return Transaction;
}());
var Deposit = /** @class */ (function () {
    function Deposit(atm, account) {
        this.atm = atm;
        this.state = ATMStates.DEPOSIT;
        this.account = account;
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
    function WithDraw(atm, account) {
        this.atm = atm;
        this.state = ATMStates.WITHDRAW;
        this.account = account;
    }
    WithDraw.prototype.next = function (atm) {
        var bal = this.account.withdrawCash(200);
        if (bal === -1) {
            atm.setState(new Error1(this.atm));
            this.state = ATMStates.ERROR;
        }
        else {
            atm.setState(new Balance(this.atm, this.atm.account));
        }
    };
    WithDraw.prototype.getState = function () {
        return this.state;
    };
    return WithDraw;
}());
var Balance = /** @class */ (function () {
    function Balance(atm, account) {
        this.atm = atm;
        this.state = ATMStates.BALANCE;
        this.account = account;
    }
    Balance.prototype.next = function (atm) {
        console.log(this.account.getBalance());
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
        atm.setState(new Exit(this.atm));
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
    function Atm(card, account) {
        this.instance = new Ready(this);
        this.card = card;
        this.account = account;
    }
    Atm.prototype.setState = function (instance) {
        this.instance = instance;
    };
    Atm.prototype.next = function () {
        this.instance.next(this);
    };
    Atm.prototype.getState = function () {
        return this.instance.getState();
    };
    Atm.prototype.getCardObj = function () {
        return this.card;
    };
    Atm.prototype.getAccnObj = function () {
        return this.account;
    };
    return Atm;
}());
var card = new Card();
var accn = new Account(600, 'abcd1234');
var atm_obj = new Atm(card, accn);
// console.log(atm_obj.getState());
// atm_obj.next();
// console.log(atm_obj.getState());
// atm_obj.next();
// console.log(atm_obj.getState());
// atm_obj.next();
// console.log(atm_obj.getState());
// atm_obj.next();
// console.log(atm_obj.getState());
// atm_obj.next();
// console.log(atm_obj.getState());
// atm_obj.next();
// console.log(atm_obj.getState());
while (true) {
    atm_obj.next();
    console.log(atm_obj.getState());
}
