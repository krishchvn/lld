// import promptSync from 'prompt-sync';
var Player = /** @class */ (function () {
    function Player(name, symbol) {
        this.name = '';
        this.symbol = '';
        this.name = name;
        this.symbol = symbol;
    }
    Player.prototype.getPlayerName = function () {
        return this.name;
    };
    Player.prototype.getPlayerSymbol = function () {
        return this.symbol;
    };
    return Player;
}());
var Board = /** @class */ (function () {
    function Board() {
        this.board = [];
        for (var i = 0; i < 3; i++) {
            this.board[i] = [];
            for (var j = 0; j < 3; j++) {
                this.board[i][j] = '_';
            }
            this.board.push(this.board[i]);
        }
    }
    Board.prototype.getBoard = function () {
        for (var i = 0; i < 3; i++) {
            console.log(this.board[i][0] + ' ' + this.board[i][1] + ' ' + this.board[i][2]);
        }
    };
    Board.prototype.validMove = function (row, col, board) {
        if (board[row][col] == '_' && row < 3 && row > -1 && col < 3 && col > -1) {
            return true;
        }
        return false;
    };
    Board.prototype.move = function (row, col, symbol) {
        if (this.validMove(row, col, this.board)) {
            this.board[row][col] = symbol;
            return true;
        }
        console.log('Invalid move, play again');
        return false;
    };
    Board.prototype.checkWin = function (symbol) {
        var _this = this;
        var _loop_1 = function (i) {
            if (this_1.board[i].every(function (cell) { return cell === symbol; })) {
                return { value: true };
            }
            if ([0, 1, 2].every(function (j) { return _this.board[j][i] === symbol; })) {
                return { value: true };
            }
        };
        var this_1 = this;
        for (var i = 0; i < 3; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        if ([0, 1, 2].every(function (i) { return _this.board[i][i] === symbol; })) {
            return true;
        }
        if ([0, 1, 2].every(function (i) { return _this.board[i][2 - i] === symbol; })) {
            return true;
        }
        return false;
    };
    Board.prototype.checkDraw = function () {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.board[i][j] == '_') {
                    return false;
                }
            }
        }
        return true;
    };
    return Board;
}());
var TicTacToe = /** @class */ (function () {
    function TicTacToe() {
        this.player1 = new Player('ABC', 'X');
        this.player2 = new Player('XYZ', 'O');
        this.board = new Board();
        this.turn = true;
    }
    TicTacToe.prototype.switchPlayers = function (turn) {
        if (turn === true)
            turn = false;
        else
            turn = true;
        return turn;
    };
    TicTacToe.prototype.startGame = function () {
        var prompt = require('prompt-sync')();
        while (true) {
            var input1 = prompt('Enter row');
            var input2 = prompt('Enter col');
            var row = Number(input1);
            var col = Number(input2);
            console.log(row, col);
            if (this.turn === true) {
                if (this.board.move(row, col, this.player1.getPlayerSymbol())) {
                    this.turn = this.switchPlayers(this.turn);
                }
                if (this.board.checkWin(this.player1.getPlayerSymbol())) {
                    console.log(this.player1.getPlayerName() + 'wins!');
                    break;
                }
            }
            else {
                if (this.board.move(row, col, this.player2.getPlayerSymbol())) {
                    this.turn = this.switchPlayers(this.turn);
                }
                if (this.board.checkWin(this.player2.getPlayerSymbol())) {
                    console.log(this.player2.getPlayerName() + 'wins!');
                    break;
                }
            }
            //  this.switchPlayers(this.turn);
            if (this.board.checkDraw()) {
                console.log('It"s a draw');
                return;
            }
            this.board.getBoard();
        }
    };
    return TicTacToe;
}());
var game = new TicTacToe();
game.startGame();
