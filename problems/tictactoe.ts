// import promptSync from 'prompt-sync';

class Player {
	public name: string = '';
	public symbol: string = '';

	public constructor(name: string, symbol: string) {
		this.name = name;
		this.symbol = symbol;
	}

	public getPlayerName(): string {
		return this.name;
	}

	public getPlayerSymbol(): string {
		return this.symbol;
	}
}

class Board {
	public board: string[][] = [];

	public constructor() {
		for (let i = 0; i < 3; i++) {
			this.board[i] = [];
			for (let j = 0; j < 3; j++) {
				this.board[i][j] = '_';
			}
			this.board.push(this.board[i]);
		}
	}

	public getBoard(): void {
		for (let i = 0; i < 3; i++) {
			console.log(
				this.board[i][0] + ' ' + this.board[i][1] + ' ' + this.board[i][2]
			);
		}
	}

	public validMove(row: number, col: number, board: string[][]): boolean {
		if (board[row][col] == '_' && row < 3 && row > -1 && col < 3 && col > -1) {
			return true;
		}
		return false;
	}

	public move(row: number, col: number, symbol: string): boolean {
		if (this.validMove(row, col, this.board)) {
			this.board[row][col] = symbol;
			return true;
		}
		console.log('Invalid move, play again');
		return false;
	}

	public checkWin(symbol: string): boolean {
		for (let i = 0; i < 3; i++) {
			if (this.board[i].every(cell => cell === symbol)) {
				return true;
			}
			if ([0, 1, 2].every(j => this.board[j][i] === symbol)) {
				return true;
			}
		}

		if ([0, 1, 2].every(i => this.board[i][i] === symbol)) {
			return true;
		}

		if ([0, 1, 2].every(i => this.board[i][2 - i] === symbol)) {
			return true;
		}
		return false;
	}

	public checkDraw(): boolean {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (this.board[i][j] == '_') {
					return false;
				}
			}
		}
		return true;
	}
}

class TicTacToe {
	public player1: Player = new Player('ABC', 'X');
	public player2: Player = new Player('XYZ', 'O');
	public board: Board = new Board();

	public turn: boolean = true;

	public switchPlayers(turn: boolean) {
		if (turn === true) turn = false;
		else turn = true;
		return turn;
	}

	public startGame() {
		const prompt = require('prompt-sync')();
		while (true) {
			let input1 = prompt('Enter row');
			let input2 = prompt('Enter col');
			let row: number = Number(input1);
			let col: number = Number(input2);

			console.log(row, col);

			if (this.turn === true) {
				if (this.board.move(row, col, this.player1.getPlayerSymbol())) {
					this.turn = this.switchPlayers(this.turn);
				}
				if (this.board.checkWin(this.player1.getPlayerSymbol())) {
					console.log(this.player1.getPlayerName() + 'wins!');
					break;
				}
			} else {
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
	}
}

const game = new TicTacToe();
game.startGame();

// not much use of design patterns here, as mostly tictactoe games are 3x3 and have 2 turns X and O. so mostly logic is hardcoded
// one thing you can have is observer pattern to check if anybody wins, but i don't find it necessary. logic and complexity will be same nonetheless
