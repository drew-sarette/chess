import Board from "./board";
import Chess from "./chess";

class Piece {
    color;
    hasMoved = false;
    name;
    short;
    constructor(color, coord) {
      this.color = color;
      this.coord = coord;
    }
  
    get color() {
      return this.color;
    }
  
    get hasMoved() {
      return this.hasMoved;
    }
    set hasMoved(value) {
        this.hasMoved = value;
    }
  
    get short() {
      return this.short;
    }
  
    set short(short) {
      if (!this.short) {
        this.short = short;
      }
    }
    get name() {
      return this.name;
    }
  
    set name(name) {
      if (!this.name) {
        this.name = name;
      }
    }
  
    move(target) {
      this.hasMoved = true;
      this.coord = target;
    }
  
    moves(position) {
      //get all directions from piece
      const { directions, depth } = this.directions;
  
      const rays = directions.map((dir) => Board.ray(this.coord, dir, depth));
      // follow each ray until meeting a piece. Include opposite-colored pieces, exclude same-colored
      const trimmedRays = rays.map((ray) => {
        for (let i = 0; i < ray.length; i++) {
          const contents = position[ray[i][0]][ray[i][1]];
          if (!contents) {
            continue;
          }
          if (contents.color === this.color) {
            return ray.slice(0, i);
          } else {
            return ray.slice(0, i + 1);
          }
        }
        return ray.slice();
      });
  
      const moves = trimmedRays.flat();
  
      return moves;
    }
}
  
export class Pawn extends Piece {
    name = "pawn";
    enPassant = null;
    direction;
    constructor(color, coord) {
      super(color, coord);
      this.short = color === "white" ? "P" : "p";
      this.direction = this.color === "white" ? 1 : -1;
    }

    set enPassant(enPassant) {
      this.enPassant = enPassant;
    }
  
    moves(position) {
      const [rank, file] = this.coord;
      const moves = [];
      if (position[rank + this.direction][file] === null) {
        moves.push([rank + this.direction, file]);
      }
      if (!this.hasMoved && position[rank + this.direction * 2][file] === null) {
        moves.push([rank + this.direction * 2, file]);
      }
  
      const [capture1, capture2] = [
        position[rank + this.direction][file + 1],
        position[rank + this.direction][file - 1],
      ];
  
      if (capture1 && capture1.color !== this.color) {
        moves.push([rank + this.direction, file + 1]);
      }
      if (capture2 && capture2.color !== this.color) {
        moves.push([rank + this.direction, file - 1]);
      }
      return moves;
    }
}
  
export class Rook extends Piece {
    constructor(color, coord) {
      super(color, coord);
      this.name = "rook";
      this.short = color === "white" ? "R" : "r";
    }
  
    get directions() {
      return {
        directions: [
          [0, 1],
          [1, 0],
          [0, -1],
          [-1, 0],
        ],
        depth: undefined,
      };
    }
}
  
export class Knight extends Piece {
    constructor(color, coord) {
      super(color, coord);
      this.name = "knight";
      this.short = color === "white" ? "N" : "n";
    }
  
    get directions() {
      return {
        directions: [
          [2, 1],
          [2, -1],
          [1, 2],
          [1, -2],
          [-1, 2],
          [-1, -2],
          [-2, -1],
          [-2, 1],
        ],
        depth: 1,
      };
    }
}
  
export class Bishop extends Piece {
    constructor(color, coord) {
      super(color, coord);
      this.name = "bishop";
      this.short = color === "white" ? "B" : "b";
    }
  
    get directions() {
      return {
        directions: [
          [1, 1],
          [1, -1],
          [-1, -1],
          [-1, 1],
        ],
        depth: undefined,
      };
    }
}
  
export class Queen extends Piece {
    constructor(color, coord) {
      super(color, coord);
      this.name = "queen";
      this.short = color === "white" ? "Q" : "q";
    }
    get directions() {
      return {
        directions: [
          [0, 1],
          [1, 0],
          [0, -1],
          [-1, 0],
          [1, 1],
          [1, -1],
          [-1, -1],
          [-1, 1],
        ],
        depth: undefined,
      };
    }
}
  
export class King extends Piece {
    isChecked = false;
    constructor(color, coord) {
      super(color, coord);
      this.name = "king";
      this.short = color === "white" ? "K" : "k";
    }
    get directions() {
      return {
        directions: [
          [0, 1],
          [1, 0],
          [0, -1],
          [-1, 0],
          [1, 1],
          [1, -1],
          [-1, -1],
          [-1, 1],
        ],
        depth: 1,
      };
    }
}