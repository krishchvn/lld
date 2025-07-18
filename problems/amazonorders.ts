// Amazon wants to build a system to compute few performance metrics for 3rd party sellers
// based on their customer order delivery experience
// Amazon customers want their orders delivered by the promised date and especially for
// buisness customers, it is also important that the orders are delivered during open buisness
// hours (Mon-Fri, 9am - 5pm)

// Build a data model and implement a code logic to compute these performance metrics for an
// input seller over all his orderService.
// You can assume that the dataset for these data models will be populated for you offline
// and you can call APIs to collect those dataset
// Implement the system in such a way that you can initially compute the following two
// performance metrics and ensure that it is flexible enough to add additional metrics later

// *Timely-Delivery-Rate (TDR) measures the fraction of total orders that arrived before or on
// promised delivery Date
// *Open-Hour-Delivery-Rate (OHDR) measures the fraction of total orders that were delivered
// during open business hours (Mon-Fri, 9am-5pm)

interface orderDetails {
	orderId: string;
	typeOfCustomer: 'business' | 'personal';
	deliveryDate: string;
	deliveryTime: string;
	deliveryDay: string;
	actualDeliveryDate: string;
	actualDeliveryTime: string;
	actualDeliveryDay: string;
}

interface DataProvider {
	getData(): orderDetails[];
}

class FetchData implements DataProvider {
	public data: orderDetails[];

	public callAPI(): void {
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
	}

	public getData(): orderDetails[] {
		return this.data;
	}
}

// strategy pattern
interface MetricsInterface {
	compute(): void;
}

class TDR implements MetricsInterface {
	dp: DataProvider;
	public constructor(dp: DataProvider) {
		this.dp = dp;
	}

	public compute(): number {
		let deliveredOnPromisedDate: number = 0;
		let totalDeliveries: number = 0;
		let data = this.dp.getData();

		for (let i = 0; i < data.length; i++) {
			let obj = data[i];

			if (obj.deliveryDate === obj.actualDeliveryDate) {
				deliveredOnPromisedDate += 1;
			}
			totalDeliveries += 1;
		}

		return deliveredOnPromisedDate / totalDeliveries;
	}
}

class OHDR implements MetricsInterface {
	dp: DataProvider;

	public constructor(dp: DataProvider) {
		this.dp = dp;
	}

	public compute(): number {
		let hh = [];
		let deliveriesNotOnBusinessHours = 0;
		let totalDeliveries = 0;
		let data = this.dp.getData();

		for (let i = 0; i < data.length; i++) {
			let obj = data[i];
			hh = obj.actualDeliveryTime.split(':');
			if (Number(hh[0]) < 9 || Number(hh[0]) > 17) {
				deliveriesNotOnBusinessHours += 1;
			}
			totalDeliveries += 1;
		}

		return (totalDeliveries - deliveriesNotOnBusinessHours) / totalDeliveries;
	}
}

class MetricsManager {
	mI: MetricsInterface;
	public constructor(mI: MetricsInterface) {
		this.mI = mI;
	}

	public setManager(mI: MetricsInterface) {
		this.mI = mI;
	}

	public computeMetrics() {
		let results = this.mI.compute();
		console.log(results);
	}
}

const fD = new FetchData();
fD.callAPI();
const mM = new MetricsManager(new TDR(fD));
mM.computeMetrics();

mM.setManager(new OHDR(fD));
mM.computeMetrics();

// mM.set(new ODHR());
