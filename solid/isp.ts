interface Print {
	print: () => void;
}

interface Scan {
	scan: () => void;
}

interface Fax {
	fax: () => void;
}

class OnlyPrinter implements Print {
	public print(): void {
		console.log('Only prints');
	}
}

class AllInOnePrinter implements Print, Scan, Fax {
	public print(): void {
		console.log(' prints');
	}

	public scan(): void {
		console.log(' scans');
	}

	public fax(): void {
		console.log(' faxes');
	}
}

const obj1_isp = new OnlyPrinter();
obj1_isp.print();

const obj2_isp = new AllInOnePrinter();
obj2_isp.print();
obj2_isp.scan();
obj2_isp.fax();
