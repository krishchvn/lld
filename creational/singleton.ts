class Logger {
	private constructor() {}

	private static instance: Logger;

	public static getInstance() {
		if (Logger.instance === null) {
			Logger.instance = new Logger();
		}
		return Logger.instance;
	}

	public static getLogger(message: string) {
		console.log('Log: ' + message);
	}
}

class Application {
	public run() {
		// const obj = new Logger();
		const logger = Logger.getInstance();
		logger.getInstance();
		logger.getLogger('Application run function');
	}
}

const application = new Application();
application.run();

// you have to use static when you have to run a function from class without creating an object of the class
// here you have kept constructor has private so that you cannot call constructor from another class,
// basically just to not reinitialize again and again

// here you check if logger instance is created only once, if it is that's it, uses it again and again , even from diff classes
