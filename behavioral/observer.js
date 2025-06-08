//2. concerte observer classes
var YoutubeSubscriber = /** @class */ (function () {
    function YoutubeSubscriber(subscriberName) {
        this.subscriberName = subscriberName;
    }
    YoutubeSubscriber.prototype.getUpdates = function (video) {
        console.log('Fetching updates for YoutubeSubscriber' +
            this.subscriberName +
            ' with video' +
            video);
    };
    return YoutubeSubscriber;
}());
var EmailNotifications = /** @class */ (function () {
    function EmailNotifications(email) {
        this.email = email;
    }
    EmailNotifications.prototype.getUpdates = function (video) {
        console.log('Sending email notifications to ' + this.email + ' with video' + video);
    };
    return EmailNotifications;
}());
var PushNotifications = /** @class */ (function () {
    function PushNotifications(phoneNo) {
        this.phoneNo = phoneNo;
    }
    PushNotifications.prototype.getUpdates = function (video) {
        console.log('Sending push notifications to ' + this.phoneNo + ' with video' + video);
    };
    return PushNotifications;
}());
// 4 concrete subject class
var AnyYoutubeChannel = /** @class */ (function () {
    function AnyYoutubeChannel() {
        this.subscribers = [];
    }
    AnyYoutubeChannel.prototype.addSubscribers = function (subscriber) {
        this.subscribers.push(subscriber);
    };
    AnyYoutubeChannel.prototype.removeSubscribers = function (subscriber) {
        this.subscribers = this.subscribers.filter(function (sub) {
            sub !== subscriber;
        });
    };
    AnyYoutubeChannel.prototype.notifySubscribers = function () {
        console.log(this.subscribers);
        for (var _i = 0, _a = this.subscribers; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.getUpdates(this.video);
        }
    };
    AnyYoutubeChannel.prototype.uploadVideo = function (video) {
        this.video = video;
        this.notifySubscribers();
    };
    return AnyYoutubeChannel;
}());
// client code
var anyChannel = new AnyYoutubeChannel();
var newUser1 = new YoutubeSubscriber('Alice');
var newUser2 = new YoutubeSubscriber('Bob');
var emailUser = new EmailNotifications('user@gmail.com');
var textUser = new PushNotifications('788789732');
anyChannel.addSubscribers(newUser1);
anyChannel.addSubscribers(newUser2);
anyChannel.uploadVideo('Design patterns');
anyChannel.notifySubscribers();
anyChannel.removeSubscribers(newUser2);
anyChannel.uploadVideo(' again Design patterns ');
anyChannel.notifySubscribers();
anyChannel.addSubscribers(emailUser);
anyChannel.addSubscribers(textUser);
anyChannel.notifySubscribers();
