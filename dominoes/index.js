const tile = [];

for (let i = 0; i <= 6; i++) {
  for (let j = 0; j <= i; j++) {
    // tiles.push([i, j]);
    tiles.push({ end: i, head: j });
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.tiles = [];
  }
  play(game) {
    const index = this.tiles.findIndex((tile) => {
      if (game.board.length > 1) return tile.head === game.end || tile.end === game.end;

      const lastTile = game.board[game.board.length - 1];
      return (
        tile.head === lastTile.head ||
        tile.head === lastTile.end ||
        tile.end === lastTile.head ||
        tile.end === lastTile.end
      );
    });

    if (index > -1) {
      const lastTile = this.tiles.splice(index, 1)[0];
      const previousTile = game.board[game.board.length - 1];

      console.log(
        `${this.name} plays <${lastTile.head}:${lastTile.end}> to connect to tile <${previousTile.head}:${previousTile.end}> on the board`
      );

      game.addToBoard(lastTile);
      console.log(`Board is now: `, game.boardAsSting);
      if (this.tiles[0]) game.next();
      else game.finish(this.name);
      return;
    }

    if (game.tiles[0]) {
      this.tiles.push(game.getRandomTile());
      this.play(game);
    } else game.next();
  }
}

class Game {
  constructor() {
    this.tiles = tiles;
    this.players = [];
    this.board = [];
    this.boardAsSting = "";
    this.end = 0;
    this.turn = 0;
    this.over = false;
  }
  start(playersNames = ["Alice", "Bob"]) {
    this.players = playersNames.map((name) => new Player(name));
    this.shuffle();
    this.board.push(this.getRandomTile());
    console.log(`Game starting with first tile: <${this.board[0].head}:${this.board[0].end}>`);
  }

  getRandomTile() {
    if (this.tiles[0]) return this.tiles.splice(Math.round(Math.random() * (this.tiles.length - 1)), 1)[0];
  }

  shuffle() {
    for (let times = 0; times < 8; times += 1) {
      this.players.forEach((player) => player.tiles.push(this.getRandomTile()));
    }
  }
  addToBoard(tile) {
    if (this.board.length === 1) {
      if (this.board[0].head === tile.head || this.board[0].head === tile.end) {
        this.boardAsSting = `<${this.board[0].end}:${this.board[0].head}>`;
        this.end = this.board[0].head;
      }
      if (this.board[0].end === tile.head || this.board[0].end === tile.end) {
        this.boardAsSting = `<${this.board[0].head}:${this.board[0].end}>`;
        this.end = this.board[0].end;
      }
    }

    if (tile.head === this.end) {
      this.board.push(tile);
      this.end = tile.end;
      this.boardAsSting = this.boardAsSting + `<${tile.head}:${tile.end}>`;
    } else if (tile.end === this.end) {
      this.board.push(tile);
      this.end = tile.head;
      this.boardAsSting = this.boardAsSting + `<${tile.end}:${tile.head}>`;
    }
  }
  next() {
    this.turn = this.turn ? 0 : 1;
    setTimeout(() => this.players[this.turn].play(this), 500);
  }
  finish(playerName) {
    this.over = true;
    this.winner = playerName;
    console.log("The winner is: ", this.winner);
  }
}

const game = new Game();

// game.start();
// game.players[game.turn].play(game);

// const tiles = [
//   { head: 0, end: 0 },
//   { head: 0, end: 1 },
//   { head: 1, end: 1 },
//   { head: 0, end: 2 },
//   { head: 1, end: 2 },
//   { head: 0, end: 3 },
//   { head: 1, end: 3 },
//   { head: 2, end: 3 },
//   { head: 3, end: 3 },
//   { head: 0, end: 4 },
//   { head: 1, end: 4 },
//   { head: 2, end: 4 },
//   { head: 3, end: 4 },
//   { head: 4, end: 4 },
//   { head: 0, end: 5 },
//   { head: 1, end: 5 },
//   { head: 2, end: 5 },
//   { head: 3, end: 5 },
//   { head: 4, end: 5 },
//   { head: 5, end: 5 },
//   { head: 0, end: 6 },
//   { head: 1, end: 6 },
//   { head: 2, end: 6 },
//   { head: 3, end: 6 },
//   { head: 4, end: 6 },
//   { head: 6, end: 6 },
// ];
