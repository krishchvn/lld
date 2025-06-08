// abstract class NotificationService {
// 	sendEmail(): void {}
// 	sendText(): void {}
// }
// low level modules
var EmailNotifs = /** @class */ (function () {
    function EmailNotifs() {
    }
    EmailNotifs.prototype.sendEmail = function () {
        console.log('Sending Email');
    };
    return EmailNotifs;
}());
var TextNotifs = /** @class */ (function () {
    function TextNotifs() {
    }
    TextNotifs.prototype.sendText = function () {
        console.log('Sending text');
    };
    return TextNotifs;
}());
var DatabaseLogger = /** @class */ (function () {
    function DatabaseLogger() {
    }
    DatabaseLogger.prototype.databaseLogger = function () {
        console.log('Daytabase loggijn');
    };
    return DatabaseLogger;
}());
var ErrorLogger = /** @class */ (function () {
    function ErrorLogger() {
    }
    ErrorLogger.prototype.errorLogger = function () {
        console.log('Error logging');
    };
    return ErrorLogger;
}());
var UpdateInventory = /** @class */ (function () {
    function UpdateInventory() {
    }
    UpdateInventory.prototype.updateInventory = function () {
        console.log('Updating inventory');
    };
    return UpdateInventory;
}());
// High level module
var Order = /** @class */ (function () {
    function Order() {
    }
    Order.prototype.generateService = function () {
        this.emailService = new EmailNotifs();
        this.textService = new TextNotifs();
        this.databaseLoggerService = new DatabaseLogger();
        this.errorLoggerService = new ErrorLogger();
        this.updateInventoryService = new UpdateInventory();
    };
    Order.prototype.placeOrder = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_b = (_a = this.emailService).sendEmail) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_d = (_c = this.textService).sendText) === null || _d === void 0 ? void 0 : _d.call(_c);
        (_f = (_e = this.databaseLoggerService).databaseLogger) === null || _f === void 0 ? void 0 : _f.call(_e);
        (_h = (_g = this.errorLoggerService).errorLogger) === null || _h === void 0 ? void 0 : _h.call(_g);
        this.updateInventoryService.updateInventory();
    };
    return Order;
}());
var orderService = new Order();
orderService.generateService();
orderService.placeOrder();
// both modules are dependent on interfaces or abstract classes
