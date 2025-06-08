// 1. observer interface
interface Subscriber {
	getUpdates(video: String): void;
}

//2. concerte observer classes

class YoutubeSubscriber implements Subscriber {
	private subscriberName: String;

	public constructor(subscriberName: String) {
		this.subscriberName = subscriberName;
	}

	public getUpdates(video: String): void {
		console.log(
			'Fetching updates for YoutubeSubscriber' +
				this.subscriberName +
				' with video' +
				video
		);
	}
}

class EmailNotifications implements Subscriber {
	private email: String;

	public constructor(email: String) {
		this.email = email;
	}

	public getUpdates(video: String): void {
		console.log(
			'Sending email notifications to ' + this.email + ' with video' + video
		);
	}
}

class PushNotifications implements Subscriber {
	private phoneNo: String;

	public constructor(phoneNo: String) {
		this.phoneNo = phoneNo;
	}

	public getUpdates(video: String): void {
		console.log(
			'Sending push notifications to ' + this.phoneNo + ' with video' + video
		);
	}
}

//3 subject interface
interface YoutubeChannel {
	addSubscribers(subscriber: Subscriber): void;
	removeSubscribers(subscriber: Subscriber): void;
	notifySubscribers(): void;
	uploadVideo(video: String): void;
}

// 4 concrete subject class

class AnyYoutubeChannel implements YoutubeChannel {
	public subscribers: Subscriber[] = [];
	public video: String;

	public constructor() {}

	public addSubscribers(subscriber: Subscriber): void {
		this.subscribers.push(subscriber);
	}

	public removeSubscribers(subscriber: Subscriber): void {
		this.subscribers = this.subscribers.filter(sub => {
			sub !== subscriber;
		});
	}

	public notifySubscribers(): void {
		console.log(this.subscribers);
		for (var sub of this.subscribers) {
			sub.getUpdates(this.video);
		}
	}

	public uploadVideo(video: String): void {
		this.video = video;
		this.notifySubscribers();
	}
}

// client code

const anyChannel = new AnyYoutubeChannel();

const newUser1 = new YoutubeSubscriber('Alice');
const newUser2 = new YoutubeSubscriber('Bob');

const emailUser = new EmailNotifications('user@gmail.com');
const textUser = new PushNotifications('788789732');

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

// 🧠 Observer Design Pattern – Key Steps (YouTube Example)
// 1. Define the Observer Interface (Subscriber)

//     This interface declares one method: getUpdates(video: string)

//     All subscriber types (YouTube, Email, Push) must implement this

// ✅ Purpose: Enforces a contract so the subject can notify all observers uniformly.
// 2. Create Concrete Observer Classes

//     Classes like YoutubeSubscriber, EmailNotifications, PushNotifications implement Subscriber

//     Each class provides its own logic in getUpdates()

// ✅ Purpose: Different types of observers can react to updates in different ways.
// 3. Define the Subject Interface (YoutubeChannel)

//     Declares methods:

//         addSubscribers(subscriber: Subscriber)

//         removeSubscribers(subscriber: Subscriber)

//         notifySubscribers()

//         uploadVideo(video: string)

// ✅ Purpose: This abstracts what the "publisher" can do and lets us create any type of channel that can manage subscribers.
// 4. Create the Concrete Subject Class (AnyYoutubeChannel)

//     Stores a list of Subscriber objects (subscribers: Subscriber[])

//     Implements:

//         addSubscribers() → Adds to the list

//         removeSubscribers() → Filters out the subscriber

//         uploadVideo(video) → Saves the video title and calls notifySubscribers()

//         notifySubscribers() → Loops through all subscribers and calls getUpdates(video)

// ✅ Purpose: Handles the subscriber list and notifies them of changes
// 5. Client Code

//     Create subscriber objects (new YoutubeSubscriber('Alice'), etc.)

//     Register them with the channel using addSubscribers()

//     Call uploadVideo() to simulate publishing content

// ✅ Purpose: Demonstrates how everything connects and observers react automatically
// 💡 What to Remember
// Step	Key Point
// ✅ Define interface for observer	So all observers follow the same method signature
// ✅ Implement different observers	Each handles the update in its own way (console log, email, push)
// ✅ Define a subject interface	So multiple types of publishers can exist
// ✅ Store a list of subscribers	Not emails, names — store Subscriber references
// ✅ Notify all subscribers	Call getUpdates() on each one in notifySubscribers()
// ✅ In client code	Add different types of observers to the subject
// ✅ Bonus Tip

//     You don’t check for "type" in your subject — you just call the method.

//     This keeps your code decoupled and extensible — new subscriber types can be added without changing the subject
