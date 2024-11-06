const board = [
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"], // 0
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"], // 1
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"], // 2
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"], // 3
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"], // 4
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"], // 5
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"], // 6
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"], // 7
  //  0     1     2     3     4     5     6     7
];
const startPosition = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"],
];

function setBoard(position) {
  const result = board.slice();
  for (let rank = 0; rank <= 7; rank++) {
    for (let file = 0; file <= 7; file++) {
      const notation = position[rank][file];
      if (notation) {
        const color = notation.toUpperCase() === notation ? "white" : "black";
        switch (notation.toUpperCase()) {
          case "P":
            result[rank][file] = new Pawn(color);
            break;
          case "R":
            result[rank][file] = new Rook(color);
            break;
          case "B":
            result[rank][file] = new Bishop(color);
            break;
          case "N":
            result[rank][file] = new Knight(color);
            break;
          case "Q":
            result[rank][file] = new Queen(color);
            break;
          case "K":
            result[rank][file] = new King(color);
            break;
        }
      } else {
        result[rank][file] = null;
      }
    }
  }
  return result;
}

// Return an array of valid squares to move to
function validTargets(piece, coord, position) {
  //get all vectors from piece
  const vectors = piece.vectors(coord);
  //trim each vector to the next piece, excluding same color and including opposite color (captures)
  const validVectors = vectors.map((v) => {
    const result = [];
    for (let i = 0; i < v.length; i++) {
      const [rank, file] = v[i];
      const contents = position[rank][file];
      if (contents === null) {
        result.push(v[i]);
        continue;
      }
      if (contents.color === piece.color) {
        break;
      }
      result.push(v[i]);
      if (contents.color !== piece.color) {
        break;
      }
    }
    return result;
  });
  //return a flattened array of those squares.
  return validVectors.flat();
}

class Chess {
  #whosNext = "white";
  #history;
  viewing;
  constructor() {
    this.#history = [setBoard(startPosition)];
  }

  get position() {
    return this.#history[0];
  }

  get whosNext() {
    return this.#whosNext;
  }

  get view() {
    return this.#history.at(-1 - this.view);
  }

  set view(moveNumber) {
    this.viewing = moveNumber;
  }

  move(selected, target) {
    const piece = this.position[selected[0]][selected[1]];
    if (
      validTargets(piece, selected, this.position).some((coord) => {
        return coord[0] === target[0] && coord[1] === target[1];
      })
    ) {
      const newPosition = this.position.slice();
      newPosition[target[0]][target[1]] =
      newPosition[selected[0]][selected[1]];
      newPosition[selected[0]][selected[1]] = null;
      this.#history.push(newPosition);
      this.#whosNext = this.#whosNext === "white" ? "black" : "white";
      this.view = this.#history.length;
    }
    return this;
  }
}

class Piece {
  #color;
  #hasMoved;
  #name;
  #short;
  constructor(color) {
    this.#color = color;
    this.#hasMoved = false;
  }

  get color() {
    return this.#color;
  }

  get hasMoved() {
    return this.#hasMoved;
  }

  get short() {
    return this.#short;
  }

  set short(short) {
    if (!this.#short) {
      this.#short = short;
    }
  }
  get name() {
    return this.#name;
  }

  set name(name) {
    if (!this.#name) {
      this.#name = name;
    }
  }

  move() {
    this.#hasMoved = true;
  }
}

class Pawn extends Piece {
  name = "pawn";
  constructor(color) {
    super(color);
    this.short = color === "white" ? "P" : "p";
  }

  vectors([rank, file]) {
    const direction = this.color === "white" ? 1 : -1;
    const vectors = [];
    if (!this.hasMoved) {
      vectors.push([
        [rank + direction, file],
        [rank + direction + direction, file],
      ]);
    } else {
      vectors.push([[rank + direction, file]]);
    }
    if (file < 7) {
      vectors.push([[rank + direction, file + 1]]);
    }
    if (file > 0) {
      vectors.push([[rank + direction, file - 1]]);
    }
    return vectors;
  }
}

class Rook extends Piece {
  constructor(color) {
    super(color);
    this.name = "rook";
    this.short = color === "white" ? "R" : "r";
  }
  vectors([rank, file]) {
    const direction = this.color === "white" ? 1 : -1;
    const vectors = [];
    const horizontal
    vectors.push([0])
    return vectors;
  }
}

class Knight extends Piece {
  constructor(color) {
    super(color);
    this.name = "knight";
    this.short = color === "white" ? "N" : "n";
  }
}

class Bishop extends Piece {
  constructor(color) {
    super(color);
    this.name = "bishop";
    this.short = color === "white" ? "B" : "b";
  }
}

class Queen extends Piece {
  constructor(color) {
    super(color);
    this.name = "queen";
    this.short = color === "white" ? "Q" : "q";
  }
}

class King extends Piece {
  constructor(color) {
    super(color);
    this.name = "king";
    this.short = color === "white" ? "K" : "k";
  }
}

export default Chess;
