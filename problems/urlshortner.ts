// design a system that takes a url and shortens it, for ex: into a short sequence of alphanumerical symbols
// sample: input: http://www.example.com/my-super-awesome-blog-about-squirrels/2022/10/23/live-with-a-squirrel-fan--they%27/re-awesome
// sample output: https://amz.com/l4fscx
// shorter urls are easy to share, write down, print or spell over the phone
// you might know some examples, like bit.ly, TinyUrl, BLL.INK , etc
// please only focus on backend part

// class InteractWithUser
// takeUserInput()

// class Url
// hashmap initialization   // two hashmaps for longurl -> shorturl, one for shorturl-> longurl
// checkUrlExists()    // will check if longUrl -> shortUrl exists, if it does, return the same one
// updateMap()  // modifying both hashmaps

interface InteractWithUserInterface {
	userInput(): string;
}

class InteractWithUser implements InteractWithUserInterface {
	public inputLongUrl: string;

	public constructor(input: string) {
		this.inputLongUrl = input;
	}
	public userInput(): string {
		return this.inputLongUrl;
	}
}

class Url {
	private constructor() {}
	private static instance: Url;

	private shortToLong: Map<string, string> = new Map();
	private longToShort: Map<string, string> = new Map();

	public static getInstance(): Url {
		if (!Url.instance) {
			this.instance = new Url();
		}
		return Url.instance;
	}

	private generateRandomStringUrl(): string {
		let randomStr = '';

		let charsToPickFrom = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

		for (let i = 0; i < 6; i++) {
			randomStr += charsToPickFrom.charAt(
				Math.floor(Math.random() * charsToPickFrom.length)
			);
		}

		return randomStr;
	}

	public checkIfShortExists(userUrl: string) {
		if (!this.longToShort.has(userUrl)) {
			//genrrate a random string
			// check if exists in shortToLong
			// if not, add it to map and return longToShort[key]
			// if yes, then return key

			let shortString = this.generateRandomStringUrl();

			while (this.shortToLong.has(shortString)) {
				console.log(shortString);
				shortString = this.generateRandomStringUrl();
			}
			this.shortToLong.set(shortString, userUrl);
			this.longToShort.set(userUrl, shortString);
			return shortString;
		} else {
			return this.longToShort.get(userUrl);
		}
	}
}

// client code

while (true) {
	const prompt2 = require('prompt-sync')();
	let user_prompt: string = prompt2('Insert url');
	const user = new InteractWithUser(user_prompt);
	const user_input = user.userInput();

	const url = Url.getInstance();

	const short_url = url.checkIfShortExists(user_input);

	console.log('Your generated url is: https://shortedned.com/' + short_url);
}
