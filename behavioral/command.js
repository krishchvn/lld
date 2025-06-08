var TVOn = /** @class */ (function () {
    function TVOn(tv) {
        this.tv = tv;
    }
    TVOn.prototype.execute = function () {
        this.tv.TVOn();
        // console.log('TV On');
    };
    return TVOn;
}());
var TVOff = /** @class */ (function () {
    function TVOff(tv) {
        this.tv = tv;
    }
    TVOff.prototype.execute = function () {
        this.tv.TVOff();
        // console.log('TV Off');
    };
    return TVOff;
}());
var ChangeChannel = /** @class */ (function () {
    function ChangeChannel(channel, tv) {
        this.channel = channel;
        this.tv = tv;
    }
    ChangeChannel.prototype.execute = function () {
        this.tv.TVChangeChannel(this.channel);
        // console.log('TV Change Channel to ' + this.channel);
    };
    return ChangeChannel;
}());
var AdjustVolumne = /** @class */ (function () {
    function AdjustVolumne(volume, tv) {
        this.volume = volume;
        this.tv = tv;
    }
    AdjustVolumne.prototype.execute = function () {
        this.tv.TVAdjustVolume(this.volume);
        // console.log('TV Adjust Volume to ' + this.volume);
    };
    return AdjustVolumne;
}());
var RemoteControl = /** @class */ (function () {
    function RemoteControl() {
    }
    RemoteControl.prototype.setCommand = function (cmd) {
        this.cmd = cmd;
    };
    RemoteControl.prototype.pressButton = function () {
        this.cmd.execute();
    };
    return RemoteControl;
}());
var TV = /** @class */ (function () {
    function TV() {
    }
    TV.prototype.TVOn = function () {
        console.log('TV on inside TV class');
    };
    TV.prototype.TVOff = function () {
        console.log('TV ooff inside TV class');
    };
    TV.prototype.TVChangeChannel = function (channel) {
        console.log('TV changing channel inside TV class' + channel);
    };
    TV.prototype.TVAdjustVolume = function (volume) {
        console.log('TV adjusting volumne inside TV class' + volume);
    };
    return TV;
}());
// client code
// 1. Create the receiver
var tv = new TV();
// 2. Create concrete command objects (with receiver passed in)
var onCommand = new TVOn(tv);
var offCommand = new TVOff(tv);
var changeChannelCommand = new ChangeChannel(5, tv); // change to channel 5
var adjustVolumeCommand = new AdjustVolumne(10, tv); // set volume to 10
// 3. Create the invoker (RemoteControl)
var remote = new RemoteControl();
// 4. Execute commands via the remote
remote.setCommand(onCommand);
remote.pressButton(); // Output: TV on inside TV class
remote.setCommand(changeChannelCommand);
remote.pressButton(); // Output: TV changing channel inside TV class5
remote.setCommand(adjustVolumeCommand);
remote.pressButton(); // Output: TV adjusting volume inside TV class10
remote.setCommand(offCommand);
remote.pressButton(); // Output: TV ooff inside TV class
