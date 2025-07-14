// design a system that takes a url and shortens it, for ex: into a short sequence of alphanumerical symbols
// sample: input: http://www.example.com/my-super-awesome-blog-about-squirrels/2022/10/23/live-with-a-squirrel-fan--they%27/re-awesome
// sample output: https://amz.com/l4fscx
// shorter urls are easy to share, write down, print or spell over the phone
// you might know some examples, like bit.ly, TinyUrl, BLL.INK , etc
// please only focus on backend part
var InteractWithUser = /** @class */ (function () {
    function InteractWithUser(input) {
        this.inputLongUrl = input;
    }
    InteractWithUser.prototype.userInput = function () {
        return this.inputLongUrl;
    };
    return InteractWithUser;
}());
var Url = /** @class */ (function () {
    function Url() {
        this.shortToLong = new Map();
        this.longToShort = new Map();
    }
    Url.getInstance = function () {
        if (!Url.instance) {
            this.instance = new Url();
        }
        return Url.instance;
    };
    Url.prototype.generateRandomStringUrl = function () {
        var randomStr = '';
        var charsToPickFrom = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        for (var i = 0; i < 6; i++) {
            randomStr += charsToPickFrom.charAt(Math.floor(Math.random() * charsToPickFrom.length));
        }
        return randomStr;
    };
    Url.prototype.checkIfShortExists = function (userUrl) {
        if (!this.longToShort.has(userUrl)) {
            //genrrate a random string
            // check if exists in shortToLong
            // if not, add it to map and return longToShort[key]
            // if yes, then return key
            var shortString = this.generateRandomStringUrl();
            while (this.shortToLong.has(shortString)) {
                console.log(shortString);
                shortString = this.generateRandomStringUrl();
            }
            this.shortToLong.set(shortString, userUrl);
            this.longToShort.set(userUrl, shortString);
            return shortString;
        }
        else {
            return this.longToShort.get(userUrl);
        }
    };
    return Url;
}());
// client code
var prompt2 = require('prompt-sync')();
while (true) {
    var user_prompt = prompt2('Insert url');
    var user = new InteractWithUser(user_prompt);
    var user_input = user.userInput();
    var url = Url.getInstance();
    var short_url = url.checkIfShortExists(user_input);
    console.log('Your generated url is: https://shortedned.com/' + short_url);
}
