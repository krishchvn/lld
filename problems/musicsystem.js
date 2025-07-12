// designed as per question
// https://medium.com/@shubham18p2/adobe-interview-lld-designing-a-carvaan-style-music-player-in-java-12ea87537fef
var Song = /** @class */ (function () {
    function Song(id, name, artist) {
        this.id = id;
        this.name = name;
        this.artist = artist;
    }
    return Song;
}());
var FixedPlaylist = /** @class */ (function () {
    function FixedPlaylist() {
        this.songs = [];
    }
    FixedPlaylist.prototype.addSong = function (song) {
        this.songs.push(song);
    };
    FixedPlaylist.prototype.removeSong = function (song) {
        this.songs = this.songs.filter(function (s) { return s.id !== song.id; });
    };
    FixedPlaylist.prototype.getSizeOfPlaylist = function () {
        return this.songs.length;
    };
    FixedPlaylist.prototype.getIndexOfSong = function (song) {
        return this.songs.findIndex(function (s) { return s.id === song.id; });
    };
    FixedPlaylist.prototype.getPlaylist = function () {
        console.log(this.songs);
    };
    return FixedPlaylist;
}());
var MusicPlayer = /** @class */ (function () {
    function MusicPlayer() {
    }
    // constructor(playBackMode: PlayBackMode) {
    // 	this.playBackMode = playBackMode;
    // }
    MusicPlayer.prototype.setMode = function (playBackMode) {
        this.playBackMode = playBackMode;
    };
    MusicPlayer.prototype.play = function (song) {
        console.log(song.name + ' is playing now');
    };
    MusicPlayer.prototype.pause = function (song) {
        console.log(song.name + ' is pausing now');
    };
    MusicPlayer.prototype.stop = function (song) {
        console.log(song.name + ' is stopping now');
    };
    MusicPlayer.prototype.playNext = function (song) {
        this.playBackMode.getNextSong(song);
    };
    return MusicPlayer;
}());
var Sequential = /** @class */ (function () {
    function Sequential(musicPlayer, fixedPlaylist) {
        this.fixedPlaylist = fixedPlaylist;
        this.musicPlayer = musicPlayer;
    }
    // public setMode(fixedPlaylist: FixedPlaylist, musicPlayer: MusicPlayer) {
    // 	this.fixedPlaylist = fixedPlaylist;
    // 	this.musicPlayer = musicPlayer;
    // }
    Sequential.prototype.getNextSong = function (song) {
        var idx = this.fixedPlaylist.getIndexOfSong(song);
        var size = this.fixedPlaylist.getSizeOfPlaylist();
        // this.musicPlayer.playNext(idx === size - 1 ? 0 : idx + 1);
        idx === size - 1
            ? this.musicPlayer.play(this.fixedPlaylist.songs[0])
            : this.musicPlayer.play(this.fixedPlaylist.songs[idx + 1]);
    };
    return Sequential;
}());
var Loop = /** @class */ (function () {
    function Loop(musicPlayer, fixedPlaylist) {
        this.fixedPlaylist = fixedPlaylist;
        this.musicPlayer = musicPlayer;
    }
    // public setMode(fixedPlaylist: FixedPlaylist, musicPlayer: MusicPlayer) {
    // 	this.fixedPlaylist = fixedPlaylist;
    // 	this.musicPlayer = musicPlayer;
    // }
    Loop.prototype.getNextSong = function (song) {
        var currentIdx = this.fixedPlaylist.getIndexOfSong(song);
        this.musicPlayer.play(this.fixedPlaylist.songs[currentIdx]);
    };
    return Loop;
}());
var Shuffled = /** @class */ (function () {
    function Shuffled(musicPlayer, fixedPlaylist) {
        this.songsPlayed = new Set();
        this.fixedPlaylist = fixedPlaylist;
        this.musicPlayer = musicPlayer;
    }
    // public setMode(fixedPlaylist: FixedPlaylist, musicPlayer: MusicPlayer) {
    // 	this.fixedPlaylist = fixedPlaylist;
    // 	this.musicPlayer = musicPlayer;
    // }
    Shuffled.prototype.getNextSong = function (song) {
        var size = this.fixedPlaylist.getSizeOfPlaylist();
        var currentIdx = this.fixedPlaylist.getIndexOfSong(song);
        this.songsPlayed.add(currentIdx);
        var randomIdx = Math.floor(Math.random() * size);
        while (this.songsPlayed.has(randomIdx)) {
            randomIdx = Math.floor(Math.random() * size);
        }
        this.musicPlayer.play(this.fixedPlaylist.songs[randomIdx]);
    };
    return Shuffled;
}());
// client code
var song1 = new Song('1', 'All star', 'Smash mouth');
var song2 = new Song('2', 'Photograph', 'Ed Sheeran');
var song3 = new Song('3', 'In too deep', 'Sum 41');
var song4 = new Song('4', 'Wake me up', 'Avicii');
var song5 = new Song('5', 'Wake me up when sep ends', 'Green day');
var song6 = new Song('6', 'Ghosts', 'Justin bieber');
var song7 = new Song('7', 'Absolutely', 'Nine Days');
var playlist1 = new FixedPlaylist();
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
var playListSize = playlist1.getSizeOfPlaylist();
console.log(playListSize, 'playLstSize');
var idx = playlist1.getIndexOfSong(song1);
idx !== -1 ? console.log(idx) : console.log('Song not found');
var seqMusicPlayer = new MusicPlayer();
var seq = new Sequential(seqMusicPlayer, playlist1);
var loop = new Loop(seqMusicPlayer, playlist1);
var shuffled = new Shuffled(seqMusicPlayer, playlist1);
seqMusicPlayer.play(song2);
seqMusicPlayer.pause(song2);
seqMusicPlayer.stop(song2);
// shuffled.setMode(playlist1, seqMusicPlayer);
// loop.setMode(playlist1, seqMusicPlayer);
seqMusicPlayer.setMode(shuffled);
seqMusicPlayer.playNext(song2);
seqMusicPlayer.playNext(song2);
seqMusicPlayer.playNext(song2);
seqMusicPlayer.playNext(song2);
seqMusicPlayer.playNext(song2);
seqMusicPlayer.playNext(song2);
seqMusicPlayer.playNext(song2);
// seq.setMode(playlist1, seqMusicPlayer);
seqMusicPlayer.setMode(seq);
seq.getNextSong(song4);
// loop.setMode(playlist1, seqMusicPlayer);
seqMusicPlayer.setMode(loop);
loop.getNextSong(song4);
