// Amazon wants to build a system to compute few performance metrics for 3rd party sellers
// based on their customer order delivery experience
// Amazon customers want their orders delivered by the promised date and especially for
// buisness customers, it is also important that the orders are delivered during open buisness
// hours (Mon-Fri, 9am - 5pm)
var FetchData = /** @class */ (function () {
    function FetchData() {
    }
    FetchData.prototype.callAPI = function () {
        console.log('Calling API to fill data');
        this.data = [
            {
                orderId: 'abc123',
                typeOfCustomer: 'business',
                deliveryDate: '24-12-1293',
                deliveryTime: '9am-5pm',
                deliveryDay: 'Wednesday',
                actualDeliveryDate: '24-12-1293',
                actualDeliveryTime: '13:05:34',
                actualDeliveryDay: 'Thursday',
            },
            {
                orderId: 'bvuv67',
                typeOfCustomer: 'personal',
                deliveryDate: '24-12-1293',
                deliveryTime: '9am-5pm',
                deliveryDay: 'Wednesday',
                actualDeliveryDate: '25-12-1293',
                actualDeliveryTime: '13:05:34',
                actualDeliveryDay: 'Thursday',
            },
        ];
    };
    FetchData.prototype.getData = function () {
        return this.data;
    };
    return FetchData;
}());
var TDR = /** @class */ (function () {
    function TDR(dp) {
        this.dp = dp;
    }
    TDR.prototype.compute = function () {
        var deliveredOnPromisedDate = 0;
        var totalDeliveries = 0;
        var data = this.dp.getData();
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            if (obj.deliveryDate === obj.actualDeliveryDate) {
                deliveredOnPromisedDate += 1;
            }
            totalDeliveries += 1;
        }
        return deliveredOnPromisedDate / totalDeliveries;
    };
    return TDR;
}());
var OHDR = /** @class */ (function () {
    function OHDR(dp) {
        this.dp = dp;
    }
    OHDR.prototype.compute = function () {
        var hh = [];
        var deliveriesNotOnBusinessHours = 0;
        var totalDeliveries = 0;
        var data = this.dp.getData();
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            hh = obj.actualDeliveryTime.split(':');
            if (Number(hh[0]) < 9 || Number(hh[0]) > 17) {
                deliveriesNotOnBusinessHours += 1;
            }
            totalDeliveries += 1;
        }
        return (totalDeliveries - deliveriesNotOnBusinessHours) / totalDeliveries;
    };
    return OHDR;
}());
var MetricsManager = /** @class */ (function () {
    function MetricsManager(mI) {
        this.mI = mI;
    }
    MetricsManager.prototype.setManager = function (mI) {
        this.mI = mI;
    };
    MetricsManager.prototype.computeMetrics = function () {
        var results = this.mI.compute();
        console.log(results);
    };
    return MetricsManager;
}());
var fD = new FetchData();
fD.callAPI();
var mM = new MetricsManager(new TDR(fD));
mM.computeMetrics();
mM.setManager(new OHDR(fD));
mM.computeMetrics();
// mM.set(new ODHR());
