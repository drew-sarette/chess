export function getNotation([rank, file]) {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return letters[file] + numbers[rank];
}

export function getCoord(notation) {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return [letters.indexOf(notation[0]), numbers.indexOf(notation[1])];
}

class Piece {
  #history
  constructor(color, coord) {
    this.color = color;
    this.#history = [coord];
  }

  get history() {
    return this.#history;
  }

  set history(newHistory) {
    this.#history = newHistory;
  }

  move(coord) {
    this.#history = [...this.#history, coord]
  }
}

class Pawn extends Piece {
  constructor(color, coord) {
    super(color, coord);
    this.name = "pawn";
    this.short = "P";
    this.value = 1;
    this.spriteClass = this.color === "white" ? "pw" : "pb";
  }
}

class Rook extends Piece {
  constructor(color, coord) {
    super(color, coord);
    this.name = "rook";
    this.short = "R";
    this.value = 5;
    this.spriteClass = this.color === "white" ? "rw" : "rb";
  }
}

class Knight extends Piece {
  constructor(color, coord) {
    super(color, coord);
    this.name = "knight";
    this.short = "N";
    this.value = 3;
    this.spriteClass = this.color === "white" ? "nw" : "nb";
  }
}

class Bishop extends Piece {
  constructor(color, coord) {
    super(color, coord);
    this.name = "bishop";
    this.short = "B";
    this.value = 3;
    this.spriteClass = this.color === "white" ? "bw" : "bb";
  }
}

class Queen extends Piece {
  constructor(color, coord) {
    super(color, coord);
    this.name = "queen";
    this.short = "Q";
    this.value = 9;
    this.spriteClass = this.color === "white" ? "qw" : "qb";
  }
}

class King extends Piece {
  constructor(color, coord) {
    super(color, coord);
    this.name = "king";
    this.short = "K";
    this.vallue = 0;
    this.spriteClass = this.color === "white" ? "kw" : "kb";
  }
}

export const startPosition = [
  [
    new Rook("white", [0, 0]),
    new Knight("white", [1, 0]),
    new Bishop("white", [2, 0]),
    new Queen("white", [3, 0]),
    new King("white", [4, 0]),
    new Bishop("white", [5, 0]),
    new Knight("white", [6, 0]),
    new Rook("white", [7, 0]),
  ],
  [0, 1, 2, 3, 4, 5, 6, 7].map((file) => new Pawn("white", [1, file])),
  [],
  [],
  [],
  [],
  [0, 1, 2, 3, 4, 5, 6, 7].map((file) => new Pawn("black", [6, file])),
  [
    new Rook("black", [0, 7]),
    new Knight("black", [1, 7]),
    new Bishop("black", [2, 7]),
    new Queen("black", [3, 7]),
    new King("black", [4, 7]),
    new Bishop("black", [5, 7]),
    new Knight("black", [6, 7]),
    new Rook("black", [7, 7]),
  ],
];
