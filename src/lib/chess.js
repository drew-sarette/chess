class Board {
  static #notationBoard = [
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
  static #coords = [
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]], // 1
    [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]], // 2
    [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7]], // 3
    [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7]], // 4
    [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7]], // 5
    [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7]], // 6
    [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7]], // 7
    [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7]], // 8
    // a        b       c       d       e       f       g       h
  ];

  static #files = [
    [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]], // a
    [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]], // b
    [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]], // c
    [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3]], // d
    [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]], // e
    [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5]], // f
    [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6]], // g
    [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7]], // h
    // 1        2       3       4       5       6       7       8
  ];

  static get coords() {
    return this.#coords.slice();
  }

  static #startPosition = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"],
  ];

  static setBoard(position = Board.#startPosition) {
    const result = this.coords;
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

  // Takes a starting square, a direction, and a desired depth, and returns all squares on the board in that direction.
  static ray( origin, direction, depth) {
    let [rank, file] = origin;
    const [r, f] = direction;
    const ray = [];

    rank += r;
    file += f;

    while (rank >= 0 && rank <= 7 && file >= 0 && file <= 7) {
      ray.push([rank, file]);
      rank += r;
      file += f;
    }
    return ray.slice(0, depth);
  }
}


// Return an array of valid squares to move to
function normalMoves(piece, coord, position) {
  //get all directions from piece
  const {directions, depth} = piece.directions;

  const rays = directions.map(dir => Board.ray(coord, dir, depth));
  // follow each ray until meeting a piece. Include opposite-colored pieces, exclude same-colored
  const trimmedRays = rays.map(ray => {
    for (let i = 0; i < ray.length; i++){
      const contents = position[ray[i][0]][ray[i][1]];
      if (!contents) { continue; }
      if (contents.color === piece.color) {
        return ray.slice(0, i);
      }
      else {
        return ray.slice(0, i + 1);
      }
    }
    return ray.slice();
  })

  const normalMoves = trimmedRays.flat();
  
  return normalMoves;
}

class Chess {
  #whosNext = "white";
  #history;
  viewing;
  constructor() {
    this.#history = [Board.setBoard()];
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
      normalMoves(piece, selected, this.position).some((coord) => {
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

  get directions() {
    const direction = this.color === "white" ? 1 : -1;
    const depth = this.hasMoved ? 1 : 2;
    return { directions: [[direction, 0]], depth: depth }
  }
}

class Rook extends Piece {
  constructor(color) {
    super(color);
    this.name = "rook";
    this.short = color === "white" ? "R" : "r";
  }

  get directions() {
    return { directions: [[0, 1], [1, 0], [0, -1], [-1, 0]], depth: undefined }
  }
}

class Knight extends Piece {
  constructor(color) {
    super(color);
    this.name = "knight";
    this.short = color === "white" ? "N" : "n";
  }

  get directions() {
    return { directions: [[2, 1], [2, -1], [-2, -1], [-2, 1]], depth: 1 }
  }
}

class Bishop extends Piece {
  constructor(color) {
    super(color);
    this.name = "bishop";
    this.short = color === "white" ? "B" : "b";
  }

  get directions() {
    return { directions: [[1, 1], [1, -1], [-1, -1], [-1, 1]], depth: undefined }
  }
}

class Queen extends Piece {
  constructor(color) {
    super(color);
    this.name = "queen";
    this.short = color === "white" ? "Q" : "q";
  }
  get directions() {
    return { directions: [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]], depth: undefined }
  }
}

class King extends Piece {
  constructor(color) {
    super(color);
    this.name = "king";
    this.short = color === "white" ? "K" : "k";
  }
  get directions() {
    return { directions: [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]], depth: 1 }
  }
}

export default Chess;
