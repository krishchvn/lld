// this is main layer, if this would have been called directly in client code
// then you would have factory design pattern
var BMWFunctions = /** @class */ (function () {
    function BMWFunctions() {
    }
    BMWFunctions.prototype.start = function () {
        console.log('BMW starts');
    };
    BMWFunctions.prototype.stop = function () {
        console.log('BMW stops');
    };
    return BMWFunctions;
}());
var HondaFunctions = /** @class */ (function () {
    function HondaFunctions() {
    }
    HondaFunctions.prototype.start = function () {
        console.log('Honda starts');
    };
    HondaFunctions.prototype.stop = function () {
        console.log('Honda stops');
    };
    return HondaFunctions;
}());
var HyundaiFunctions = /** @class */ (function () {
    function HyundaiFunctions() {
    }
    HyundaiFunctions.prototype.start = function () {
        console.log('Hyundai starts');
    };
    HyundaiFunctions.prototype.stop = function () {
        console.log('Hyundai stops');
    };
    return HyundaiFunctions;
}());
var BMW = /** @class */ (function () {
    function BMW() {
    }
    BMW.prototype.companyName = function () {
        return new BMWFunctions();
    };
    return BMW;
}());
var Honda = /** @class */ (function () {
    function Honda() {
    }
    Honda.prototype.companyName = function () {
        return new HondaFunctions();
    };
    return Honda;
}());
var Hyundai = /** @class */ (function () {
    function Hyundai() {
    }
    Hyundai.prototype.companyName = function () {
        return new HyundaiFunctions();
    };
    return Hyundai;
}());
// client code
var firstChoice = 'BMW';
var secondChoice = 'Hyundai';
var firstChoiceObj = new BMW();
var callOne = firstChoiceObj.companyName();
callOne.start();
callOne.stop();
var secondChoiceObj = new Hyundai();
var callTwo = secondChoiceObj.companyName();
callTwo.start();
callTwo.stop();
// this also works, you can access extra layer directly from variables too
firstChoiceObj.companyName().start();
secondChoiceObj.companyName().stop();
// companyName is your extra layer
