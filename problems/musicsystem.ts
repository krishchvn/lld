// designed as per question
// https://medium.com/@shubham18p2/adobe-interview-lld-designing-a-carvaan-style-music-player-in-java-12ea87537fef

class Song {
	id: string;
	name: string;
	artist: string;

	public constructor(id: string, name: string, artist: string) {
		this.id = id;
		this.name = name;
		this.artist = artist;
	}
}

class FixedPlaylist {
	public songs: Song[] = [];

	public addSong(song: Song): void {
		this.songs.push(song);
	}
	public removeSong(song: Song): void {
		this.songs = this.songs.filter(s => s.id !== song.id);
	}
	public getSizeOfPlaylist(): number {
		return this.songs.length;
	}
	public getIndexOfSong(song: Song): number {
		return this.songs.findIndex(s => s.id === song.id);
	}
	public getPlaylist(): void {
		console.log(this.songs);
	}
}

class MusicPlayer {
	// playBackMode: PlayBackMode;
	fixedPlaylist: FixedPlaylist;

	// constructor(playBackMode: PlayBackMode) {
	// 	this.playBackMode = playBackMode;
	// }

	public play(song: Song) {
		console.log(song.name + ' is playing now');
	}
	public pause(song: Song) {
		console.log(song.name + ' is pausing now');
	}
	public stop(song: Song) {
		console.log(song.name + ' is stopping now');
	}
	public playNext(song: Song, playBackMode: PlayBackMode) {
		playBackMode.getNextSong(song);
	}
}

// strategy pattern on different playback modes and apply that somehow to playNext()

interface PlayBackMode {
	musicPlayer: MusicPlayer;
	fixedPlaylist: FixedPlaylist;
	getNextSong(song: Song);
	setMode(fixedPlaylist: FixedPlaylist, musicPlayer: MusicPlayer);
}

class Sequential implements PlayBackMode {
	musicPlayer: MusicPlayer;
	fixedPlaylist: FixedPlaylist;
	public setMode(fixedPlaylist: FixedPlaylist, musicPlayer: MusicPlayer) {
		this.fixedPlaylist = fixedPlaylist;
		this.musicPlayer = musicPlayer;
	}

	public getNextSong(song: Song) {
		let idx = this.fixedPlaylist.getIndexOfSong(song);
		let size = this.fixedPlaylist.getSizeOfPlaylist();
		// this.musicPlayer.playNext(idx === size - 1 ? 0 : idx + 1);
		idx === size - 1
			? this.musicPlayer.play(this.fixedPlaylist.songs[0])
			: this.musicPlayer.play(this.fixedPlaylist.songs[idx + 1]);
	}
}

class Loop implements PlayBackMode {
	musicPlayer: MusicPlayer;
	fixedPlaylist: FixedPlaylist;

	public setMode(fixedPlaylist: FixedPlaylist, musicPlayer: MusicPlayer) {
		this.fixedPlaylist = fixedPlaylist;
		this.musicPlayer = musicPlayer;
	}
	public getNextSong(song: Song) {
		let currentIdx = this.fixedPlaylist.getIndexOfSong(song);
		this.musicPlayer.play(this.fixedPlaylist.songs[currentIdx]);
	}
}

class Shuffled implements PlayBackMode {
	musicPlayer: MusicPlayer;
	fixedPlaylist: FixedPlaylist;

	songsPlayed = new Set<number>();

	public setMode(fixedPlaylist: FixedPlaylist, musicPlayer: MusicPlayer) {
		this.fixedPlaylist = fixedPlaylist;
		this.musicPlayer = musicPlayer;
	}

	public getNextSong(song: Song) {
		let size = this.fixedPlaylist.getSizeOfPlaylist();

		let currentIdx = this.fixedPlaylist.getIndexOfSong(song);
		this.songsPlayed.add(currentIdx);

		let randomIdx = Math.floor(Math.random() * size);
		while (this.songsPlayed.has(idx)) {
			randomIdx = Math.floor(Math.random() * size);
		}
		this.musicPlayer.play(this.fixedPlaylist.songs[randomIdx]);
	}
}

// client code
const song1 = new Song('1', 'All star', 'Smash mouth');
const song2 = new Song('2', 'Photograph', 'Ed Sheeran');
const song3 = new Song('3', 'In too deep', 'Sum 41');
const song4 = new Song('4', 'Wake me up', 'Avicii');
const song5 = new Song('5', 'Wake me up when sep ends', 'Green day');
const song6 = new Song('6', 'Ghosts', 'Justin bieber');
const song7 = new Song('7', 'Absolutely', 'Nine Days');

const playlist1 = new FixedPlaylist();
playlist1.addSong(song1);
playlist1.addSong(song2);
playlist1.addSong(song3);
playlist1.addSong(song4);
playlist1.addSong(song5);
playlist1.addSong(song6);
playlist1.addSong(song7);

playlist1.getPlaylist();

// playlist1.removeSong(song3);
// playlist1.getPlaylist();

let playListSize = playlist1.getSizeOfPlaylist();
console.log(playListSize, 'playLstSize');

let idx = playlist1.getIndexOfSong(song1);
idx !== -1 ? console.log(idx) : console.log('Song not found');

const seq = new Sequential();
const loop = new Loop();
const shuffled = new Shuffled();

const seqMusicPlayer = new MusicPlayer();
seqMusicPlayer.play(song2);
seqMusicPlayer.pause(song2);
seqMusicPlayer.stop(song2);
shuffled.setMode(playlist1, seqMusicPlayer);
seqMusicPlayer.playNext(song2, shuffled);
seqMusicPlayer.playNext(song2, shuffled);
seqMusicPlayer.playNext(song2, shuffled);
seqMusicPlayer.playNext(song2, shuffled);
seqMusicPlayer.playNext(song2, shuffled);
seqMusicPlayer.playNext(song2, shuffled);
seqMusicPlayer.playNext(song2, shuffled);

seq.setMode(playlist1, seqMusicPlayer);
seq.getNextSong(song4);

loop.setMode(playlist1, seqMusicPlayer);
loop.getNextSong(song4);
