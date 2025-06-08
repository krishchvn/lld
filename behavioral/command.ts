// command interface and concrete classes

interface Commands {
	tv: TV;
	execute(): void;
}

class TVOn implements Commands {
	public tv: TV;
	public constructor(tv: TV) {
		this.tv = tv;
	}

	public execute(): void {
		this.tv.TVOn();
		// console.log('TV On');
	}
}

class TVOff implements Commands {
	public tv: TV;
	public constructor(tv: TV) {
		this.tv = tv;
	}
	public execute(): void {
		this.tv.TVOff();
		// console.log('TV Off');
	}
}

class ChangeChannel implements Commands {
	public tv: TV;
	private channel: number;
	public constructor(channel: number, tv: TV) {
		this.channel = channel;
		this.tv = tv;
	}

	public execute(): void {
		this.tv.TVChangeChannel(this.channel);
		// console.log('TV Change Channel to ' + this.channel);
	}
}

class AdjustVolumne implements Commands {
	public tv: TV;
	private volume: number;
	public constructor(volume: number, tv: TV) {
		this.volume = volume;
		this.tv = tv;
	}

	public execute(): void {
		this.tv.TVAdjustVolume(this.volume);
		// console.log('TV Adjust Volume to ' + this.volume);
	}
}

// remote control to execute everything

// kind of a layer, but just takes one -> many approach (compared to factory which is one-> one)

// so you have just one function pressButton which executes whatever function you want in concrete interface classes
class RemoteControl {
	private cmd: Commands;

	setCommand(cmd: Commands) {
		this.cmd = cmd;
	}

	pressButton() {
		this.cmd.execute();
	}
}

// main TV class, subject class which should be accessed at last
// code workflow should revolve around and get to this at last
class TV {
	public constructor() {}

	public TVOn() {
		console.log('TV on inside TV class');
	}

	public TVOff() {
		console.log('TV ooff inside TV class');
	}

	public TVChangeChannel(channel: number) {
		console.log('TV changing channel inside TV class' + channel);
	}

	public TVAdjustVolume(volume: number) {
		console.log('TV adjusting volumne inside TV class' + volume);
	}
}

// client code
// 1. Create the receiver
const tv = new TV();

// 2. Create concrete command objects (with receiver passed in)
const onCommand = new TVOn(tv);
const offCommand = new TVOff(tv);
const changeChannelCommand = new ChangeChannel(5, tv); // change to channel 5
const adjustVolumeCommand = new AdjustVolumne(10, tv); // set volume to 10

// 3. Create the invoker (RemoteControl)
const remote = new RemoteControl();

// 4. Execute commands via the remote
remote.setCommand(onCommand);
remote.pressButton(); // Output: TV on inside TV class

remote.setCommand(changeChannelCommand);
remote.pressButton(); // Output: TV changing channel inside TV class5

remote.setCommand(adjustVolumeCommand);
remote.pressButton(); // Output: TV adjusting volume inside TV class10

remote.setCommand(offCommand);
remote.pressButton(); // Output: TV ooff inside TV class

// in command pattern, you have to have

// client code -> one extra layer(here remote control class ) {goes to only one function present here} -> calls interface -> calls respective concrete classes

// that means, one layer can execute all functions no matter where they are

// get what the gist is? one -> many
