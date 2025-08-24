// abstract class NotificationService {
// 	sendEmail(): void {}
// 	sendText(): void {}
// }

// abstract class LoggingService {
// 	databaseLogger(): void {}
// 	errorLogger(): void {}
// }

// abstract class InventoryService {
// 	updateInventory(): void {}
// }

interface NotificationService {
	sendEmail?(): void;
	sendText?(): void;
}

interface LoggingService {
	databaseLogger?(): void;
	errorLogger?(): void;
}

interface InventoryService {
	updateInventory(): void;
}

// low level modules
class EmailNotifs implements NotificationService {
	public sendEmail() {
		console.log('Sending Email');
	}
}

class TextNotifs implements NotificationService {
	public sendText() {
		console.log('Sending text');
	}
}

class DatabaseLogger implements LoggingService {
	public databaseLogger() {
		console.log('Daytabase loggijn');
	}
}

class ErrorLogger implements LoggingService {
	public errorLogger() {
		console.log('Error logging');
	}
}

class UpdateInventory implements InventoryService {
	public updateInventory() {
		console.log('Updating inventory');
	}
}

// High level module
class Order2 {
	// write something here, so that these functions will be dependent on interfaces
	// and those interfaces will call classes
	private emailService: NotificationService;
	private textService: NotificationService;
	private databaseLoggerService: LoggingService;
	private errorLoggerService: LoggingService;
	private updateInventoryService: InventoryService;

	constructor() {}

	public generateService() {
		this.emailService = new EmailNotifs();
		this.textService = new TextNotifs();
		this.databaseLoggerService = new DatabaseLogger();
		this.errorLoggerService = new ErrorLogger();
		this.updateInventoryService = new UpdateInventory();
	}

	public placeOrder() {
		this.emailService.sendEmail?.();
		this.textService.sendText?.();
		this.databaseLoggerService.databaseLogger?.();
		this.errorLoggerService.errorLogger?.();
		this.updateInventoryService.updateInventory();
	}
}

const orderService = new Order2();
orderService.generateService();
orderService.placeOrder();

// both modules are dependent on interfaces or abstract classes
