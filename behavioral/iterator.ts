// create a class playlist which supports simple, shuffled, fav playlists

//1. iterator interface
interface PlaylistIterator {
	hasNext(): boolean;
	next(): string;
}

//2. concrete iterators
class SimplePlaylist implements PlaylistIterator {
	private playlist: Playlist;
	private index: number;

	constructor(playlist: Playlist, index: number) {
		this.playlist = playlist;
		this.index = index;
	}

	public hasNext(): boolean {
		// console.log('hasnext', this.playlist);
		return this.index < this.playlist.songs.length;
	}

	public next(): string {
		let allSongs = this.playlist.songs;
		return allSongs[this.index++];
	}
}

class ShuffledPlaylist implements PlaylistIterator {
	private playlist: Playlist;
	private index: number;

	constructor(playlist: Playlist, index: number) {
		this.playlist = playlist;
		this.index = index;
	}

	public hasNext(): boolean {
		return this.index < this.playlist.songs.length;
	}

	public next(): string {
		var shuffledPlaylist = this.shuffleArray(this.playlist.songs); // shuffle this somehow
		return shuffledPlaylist[this.index++];
	}

	public shuffleArray(array) {
		return [...array].sort(() => Math.random() - 0.5); // quick but not truly random
	}
}

class FavoritePlaylist implements PlaylistIterator {
	private playlist: Playlist;
	private index: number;

	constructor(playlist: Playlist, index: number) {
		this.playlist = playlist;
		this.index = index;
	}

	public hasNext(): boolean {
		return this.index < this.playlist.songs.length;
	}

	public next(): string {
		let allSongs = this.playlist.songs;
		console.log(allSongs[this.index++]);
		return allSongs[this.index++];
	}
}

//3. playlist class
class Playlist {
	public songs: string[] = [];

	public constructor(songs: string[]) {
		this.songs = songs;
	}

	public addSongs(songName: string): void {
		this.songs.push(songName);
	}

	public getSongs(): string[] {
		return this.songs;
	}

	public playlistIterator(type: string) {
		switch (type) {
			case 'simple':
				return new SimplePlaylist(this, 0);

			case 'shuffled':
				return new ShuffledPlaylist(this, 0);

			case 'favorite':
				return new FavoritePlaylist(this, 0);

			default:
				return null;
		}
	}
}

//4. client code

const playlist = new Playlist([]);
playlist.addSongs('Fav Dream');
playlist.addSongs('Song 2 Fav');
playlist.addSongs('Song 3');
playlist.addSongs('Song 4 Fav');
playlist.addSongs('Song 5');

const simpleIterator = playlist.playlistIterator('simple');
while (simpleIterator?.hasNext()) {
	console.log('playing' + simpleIterator.next());
}

const shuffleIterator = playlist.playlistIterator('simple');
while (shuffleIterator?.hasNext()) {
	console.log('playing' + shuffleIterator.next());
}

// i ll explain later
// if you see this, sit and write explanation
