var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.getInstance = function () {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    Logger.getLogger = function (message) {
        console.log('Log: ' + message);
    };
    return Logger;
}());
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.prototype.run = function () {
        var logger = Logger.getInstance();
        Logger.getInstance();
        Logger.getLogger('Application run function');
    };
    return Application;
}());
var application = new Application();
application.run();
