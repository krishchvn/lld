var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Concrete strategies
var TallSize = /** @class */ (function () {
    function TallSize() {
    }
    TallSize.prototype.getSizeMultiplier = function () {
        return 1.0; // base price
    };
    TallSize.prototype.getSize = function () {
        return 'Tall';
    };
    return TallSize;
}());
var GrandeSize = /** @class */ (function () {
    function GrandeSize() {
    }
    GrandeSize.prototype.getSizeMultiplier = function () {
        return 1.2;
    };
    GrandeSize.prototype.getSize = function () {
        return 'Grande';
    };
    return GrandeSize;
}());
var VentiSize = /** @class */ (function () {
    function VentiSize() {
    }
    VentiSize.prototype.getSizeMultiplier = function () {
        return 1.4;
    };
    VentiSize.prototype.getSize = function () {
        return 'Venti';
    };
    return VentiSize;
}());
var Espresso = /** @class */ (function () {
    function Espresso(size) {
        this.size = size;
    }
    Espresso.prototype.getDesc = function () {
        return 'Espresso';
    };
    Espresso.prototype.getBaseCost = function () {
        var c = 5 * this.size.getSizeMultiplier();
        // console.log(c, 'c');
        return c;
    };
    Espresso.prototype.getTags = function () {
        return ['Espresso'];
    };
    return Espresso;
}());
var Latte = /** @class */ (function () {
    function Latte(size) {
        this.size = size;
    }
    Latte.prototype.getDesc = function () {
        return 'Latte';
    };
    Latte.prototype.getBaseCost = function () {
        return 7 * this.size.getSizeMultiplier();
    };
    Latte.prototype.getTags = function () {
        return ['Latte'];
    };
    return Latte;
}());
var CoffeeDecorator = /** @class */ (function () {
    function CoffeeDecorator(coffee) {
        this.coffee = coffee;
        this.size = coffee.size;
    }
    CoffeeDecorator.prototype.getDesc = function () {
        return this.coffee.getDesc();
    };
    CoffeeDecorator.prototype.getBaseCost = function () {
        return this.coffee.getBaseCost();
    };
    CoffeeDecorator.prototype.getTags = function () {
        return this.coffee.getTags();
    };
    return CoffeeDecorator;
}());
var MilkDecorator = /** @class */ (function (_super) {
    __extends(MilkDecorator, _super);
    // protected coffee: Coffee;
    function MilkDecorator(coffee) {
        return _super.call(this, coffee) || this;
        // this.coffee = coffee;
    }
    MilkDecorator.prototype.getDesc = function () {
        return _super.prototype.getDesc.call(this) + ' Milk';
    };
    MilkDecorator.prototype.getBaseCost = function () {
        return _super.prototype.getBaseCost.call(this) + 1;
    };
    MilkDecorator.prototype.getTags = function () {
        return __spreadArray(__spreadArray([], this.coffee.getTags(), true), [' Milk'], false);
    };
    return MilkDecorator;
}(CoffeeDecorator));
var SugarDecorator = /** @class */ (function (_super) {
    __extends(SugarDecorator, _super);
    // protected coffee: Coffee;
    function SugarDecorator(coffee) {
        return _super.call(this, coffee) || this;
        // this.coffee = coffee;
    }
    SugarDecorator.prototype.getDesc = function () {
        return _super.prototype.getDesc.call(this) + ' Sugar';
    };
    SugarDecorator.prototype.getBaseCost = function () {
        return _super.prototype.getBaseCost.call(this) + 0.5;
    };
    SugarDecorator.prototype.getTags = function () {
        return __spreadArray(__spreadArray([], this.coffee.getTags(), true), [' Sugar'], false);
    };
    return SugarDecorator;
}(CoffeeDecorator));
var SoyMilkDecorator = /** @class */ (function (_super) {
    __extends(SoyMilkDecorator, _super);
    // protected coffee: Coffee;
    function SoyMilkDecorator(coffee) {
        return _super.call(this, coffee) || this;
        // this.coffee = coffee;
    }
    SoyMilkDecorator.prototype.getDesc = function () {
        return _super.prototype.getDesc.call(this) + ' Soy-Milk';
    };
    SoyMilkDecorator.prototype.getTags = function () {
        return __spreadArray(__spreadArray([], this.coffee.getTags(), true), ['Soy-Milk'], false);
    };
    return SoyMilkDecorator;
}(CoffeeDecorator));
var CouponDecorator = /** @class */ (function (_super) {
    __extends(CouponDecorator, _super);
    function CouponDecorator(coffee, discount) {
        var _this = _super.call(this, coffee) || this;
        _this.discount = discount;
        return _this;
    }
    CouponDecorator.prototype.getDesc = function () {
        return _super.prototype.getDesc.call(this) + ' Coupon Applied';
    };
    CouponDecorator.prototype.getBaseCost = function () {
        var cost = _super.prototype.getBaseCost.call(this);
        console.log(cost);
        // discount on certain toppings
        // if (super.getDesc().includes('Milk') && super.getDesc().includes('Soy')) {
        // 	// cost = cost - (cost % 10);
        // 	cost -= this.discount;
        // }
        // discount on more than or less than x toppings
        // const tags = super.getTags();
        // console.log(tags);
        // if (tags.length > 3) {
        // 	cost -= cost * 0.3;
        // }
        // coupon doesn't work on x size
        console.log(this.size.getSize());
        if (_super.prototype.getTags.call(this).length > 2 && this.size.getSize() !== 'Tall') {
            cost -= cost * 0.3;
        }
        return cost;
    };
    return CouponDecorator;
}(CoffeeDecorator));
//driver code
var coffee1 = new CouponDecorator(new SoyMilkDecorator(new SugarDecorator(new Espresso(new GrandeSize()))), 1);
var yourcoffee = coffee1.getDesc();
var yourprice = coffee1.getBaseCost();
console.log(yourcoffee, yourprice);
var coffee2 = new CouponDecorator(new SoyMilkDecorator(new SugarDecorator(new Espresso(new TallSize()))), 1);
var yourcoffee1 = coffee2.getDesc();
var yourprice1 = coffee2.getBaseCost();
console.log(yourcoffee1, yourprice1);
