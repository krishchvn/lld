var OnlyPrinter = /** @class */ (function () {
    function OnlyPrinter() {
    }
    OnlyPrinter.prototype.print = function () {
        console.log('Only prints');
    };
    return OnlyPrinter;
}());
var AllInOnePrinter = /** @class */ (function () {
    function AllInOnePrinter() {
    }
    AllInOnePrinter.prototype.print = function () {
        console.log(' prints');
    };
    AllInOnePrinter.prototype.scan = function () {
        console.log(' scans');
    };
    AllInOnePrinter.prototype.fax = function () {
        console.log(' faxes');
    };
    return AllInOnePrinter;
}());
var obj1_isp = new OnlyPrinter();
obj1_isp.print();
var obj2_isp = new AllInOnePrinter();
obj2_isp.print();
obj2_isp.scan();
obj2_isp.fax();
