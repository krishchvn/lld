// create a class playlist which supports simple, shuffled, fav playlists
// import _ from 'lodash';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//2. concrete iterators
var SimplePlaylist = /** @class */ (function () {
    function SimplePlaylist(playlist, index) {
        this.playlist = playlist;
        this.index = index;
    }
    SimplePlaylist.prototype.hasNext = function () {
        // console.log('hasnext', this.playlist);
        return this.index < this.playlist.songs.length;
    };
    SimplePlaylist.prototype.next = function () {
        var allSongs = this.playlist.songs;
        // console.log(this.index, allSongs[this.index++]);
        return allSongs[this.index++];
    };
    return SimplePlaylist;
}());
var ShuffledPlaylist = /** @class */ (function () {
    function ShuffledPlaylist(playlist, index) {
        this.playlist = playlist;
        this.index = index;
    }
    ShuffledPlaylist.prototype.hasNext = function () {
        return this.index < this.playlist.songs.length;
    };
    ShuffledPlaylist.prototype.next = function () {
        var shuffledPlaylist = this.shuffleArray(this.playlist.songs); // shuffle this somehow
        // console.log(shuffledPlaylist);
        return shuffledPlaylist[this.index++];
    };
    ShuffledPlaylist.prototype.shuffleArray = function (array) {
        return __spreadArray([], array, true).sort(function () { return Math.random() - 0.5; }); // quick but not truly random
    };
    return ShuffledPlaylist;
}());
var FavoritePlaylist = /** @class */ (function () {
    function FavoritePlaylist(playlist, index) {
        this.playlist = playlist;
        this.index = index;
    }
    FavoritePlaylist.prototype.hasNext = function () {
        return this.index < this.playlist.songs.length;
    };
    FavoritePlaylist.prototype.next = function () {
        var allSongs = this.playlist.songs;
        console.log(allSongs[this.index++]);
        return allSongs[this.index++];
    };
    return FavoritePlaylist;
}());
//3. playlist class
var Playlist = /** @class */ (function () {
    function Playlist(songs) {
        this.songs = [];
        this.songs = songs;
    }
    Playlist.prototype.addSongs = function (songName) {
        this.songs.push(songName);
        // console.log(songName);
    };
    Playlist.prototype.getSongs = function () {
        return this.songs;
    };
    Playlist.prototype.playlistIterator = function (type) {
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
    };
    return Playlist;
}());
//4. client code
var playlist = new Playlist([]);
playlist.addSongs('Fav Dream');
playlist.addSongs('Song 2 Fav');
playlist.addSongs('Song 3');
playlist.addSongs('Song 4 Fav');
playlist.addSongs('Song 5');
var simpleIterator = playlist.playlistIterator('simple');
while (simpleIterator === null || simpleIterator === void 0 ? void 0 : simpleIterator.hasNext()) {
    console.log('playing' + simpleIterator.next());
}
var shuffleIterator = playlist.playlistIterator('simple');
while (shuffleIterator === null || shuffleIterator === void 0 ? void 0 : shuffleIterator.hasNext()) {
    console.log('playing' + shuffleIterator.next());
}
