// class Song
// songName, length, artisit, year
// getInfo()
//

// strategy pattern
// class Playlist (song: Song)
// playlistName, songs: Song[]
// getNextSong()
// addSong()
// removeSong()
// setPlaylistMode()

// (strategy pattern)
// class Loop       ->   Mode
// class Sequential ->  Mode
// class Shuffled   -> Mode

// (singleton pattern)
// class MusicPlayer
// play()
// pause()
// stop()

interface SongInterface {
	songName: string;
	length: string;
	artist: string;
	year: number;
	getInfo(): void;
}

class Song implements SongInterface {
	public songName: string;
	public length: string;
	public artist: string;
	public year: number;

	public constructor(
		songName: string,
		length: string,
		artist: string,
		year: number
	) {
		this.songName = songName;
		this.length = length;
		this.artist = artist;
		this.year = year;
	}

	public getInfo(): void {
		console.log(
			this.songName + ' ' + this.length + ' ' + this.artist + ' ' + this.year
		);
	}
}

// playlist class here
interface PlaylistInterface {
	playListName: string;
	songs: Song[];
	mode: ModeInterface;
	addSong(song: Song): void;
	removeSong(song: Song): void;
	getNextSong(): Song | null;
	setPlaylistMode(mode: ModeInterface): void;
}

class Playlist implements PlaylistInterface {
	playListName: string;
	songs: Song[] = [];
	mode: ModeInterface;
	currentIndex = 0;

	public constructor(name: string, mode: Sequential) {
		this.playListName = name;
		this.mode = mode;
	}

	public addSong(song: Song) {
		this.songs.push(song);
	}
	public removeSong(song: Song) {
		this.songs = this.songs.filter(s => s.songName !== song.songName);
	}
	public getNextSong(): Song | null {
		let nextSongIndex = this.mode.getNextSongIndex(
			this.songs,
			this.currentIndex
		);
		return this.songs[nextSongIndex];
	}
	public setPlaylistMode(mode: ModeInterface) {
		this.mode = mode;
		console.log(this.mode.getModeName());
	}
}

class DefaultPlaylist implements PlaylistInterface {
	playListName: string;
	songs: Song[] = [];
	mode: ModeInterface;
	currentIndex = 0;

	public constructor(name: string, mode: Sequential) {
		this.playListName = name;
		this.mode = mode;
	}

	public addSong(song: Song) {
		this.songs.push(song);
	}
	public removeSong(song: Song) {
		this.songs = this.songs.filter(s => s.songName !== song.songName);
	}
	public getNextSong(): Song | null {
		let nextSongIndex = this.mode.getNextSongIndex(
			this.songs,
			this.currentIndex
		);
		return this.songs[nextSongIndex];
	}
	public setPlaylistMode(mode: ModeInterface) {
		this.mode = mode;
		console.log(this.mode.getModeName());
	}
}

// strategy pattern on Modes

abstract class ModeInterface {
	getNextSongIndex(songs: Song[], currentIndex: number): number {
		return -1;
	}
	getModeName(): string {
		return '';
	}
}

class Loop extends ModeInterface {
	public getNextSongIndex(songs: Song[], currentIndex: number): number {
		return currentIndex;
	}
	public getModeName(): string {
		return 'Loop';
	}
}

class Sequential implements ModeInterface {
	public getNextSongIndex(songs: Song[], currentIndex: number): number {
		if (songs.length === 0) {
			return -1;
		} else {
			if (currentIndex === songs.length - 1) {
				return 0;
			}
			return currentIndex + 1;
		}
	}
	public getModeName(): string {
		return 'Sequential';
	}
}

class Shuffled implements ModeInterface {
	public getNextSongIndex(songs: Song[], currentIndex: number): number {
		return Math.floor(Math.random() * songs.length);
	}
	public getModeName(): string {
		return 'Shuffled';
	}
}

// singleton pattern

class SingleInstance {
	private constructor() {}

	private static instance: SingleInstance;

	public static getInstance(): SingleInstance {
		if (!SingleInstance.instance) {
			SingleInstance.instance = new SingleInstance();
		}
		return SingleInstance.instance;
	}
	public logInstance(): void {
		console.log('Instance started');
	}
}

class MusicPlayer {
	playlist: PlaylistInterface = new DefaultPlaylist(
		'CreatedByUs',
		new Sequential()
	);

	public startMusicPlayer() {
		const musicPlayer = SingleInstance.getInstance();
		musicPlayer.logInstance();
	}

	public play(): void {
		console.log('Play' + this.playlist.getNextSong()?.songName);
	}

	public pause(): void {
		console.log('pause');
	}

	public stop(): void {
		console.log('stop');
	}

	public setPlaylist(playlist: Playlist) {
		this.playlist = playlist;
		console.log('Playlist changed to ' + this.playlist.playListName);
	}
}

// driver code
const song1 = new Song('Wake me up', '3min35sec', 'Avicii', 2012);
const song2 = new Song('Closer', '3min42sec', 'Chainsmokers', 2016);

const musicPlayer = new MusicPlayer();
musicPlayer.startMusicPlayer();
// musicPlayer.play();

const sequential = new Sequential();
const loop = new Loop();
const shuffled = new Shuffled();

const playlist1 = new Playlist('2010s', sequential);
playlist1.addSong(song1);
playlist1.addSong(song2);
musicPlayer.setPlaylist(playlist1);

playlist1.setPlaylistMode(loop);
playlist1.getNextSong();
musicPlayer.play();

playlist1.setPlaylistMode(shuffled);
playlist1.getNextSong();
musicPlayer.play();
