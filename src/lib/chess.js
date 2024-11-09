import Board from "./board";
import { Pawn, King } from "./pieces";

export default class Chess {
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
    return this.#history.at(-1 - this.viewing);
  }

  set view(moveNumber) {
    this.viewing = moveNumber;
  }

  move(selected, target) {
    const piece = this.position[selected[0]][selected[1]];
    if (piece instanceof Pawn && piece.enPassant && piece.enPassant.validTurn === this.#history.length){
      const passantSquare = piece.enPassant.passantSquare;
      if (target[0] === passantSquare[0] && target[1] === passantSquare[1]) {
        const newPosition = this.position.slice();
        newPosition[target[0]][target[1]] = newPosition[selected[0]][selected[1]];
        newPosition[target[0] - piece.direction][target[1]] = null;
        this.#history.push(newPosition);
        this.#whosNext = this.#whosNext === "white" ? "black" : "white";
        this.view = this.#history.length;
        piece.move(target);
        return this;
      }
    }
    const moves = piece.moves(this.position);
    if (
      moves.some((coord) => {
        return coord[0] === target[0] && coord[1] === target[1];
      })
    ) {
      const newPosition = this.position.slice();
      newPosition[target[0]][target[1]] = newPosition[selected[0]][selected[1]];
      newPosition[selected[0]][selected[1]] = null;
      this.#history.push(newPosition);
      this.#whosNext = this.#whosNext === "white" ? "black" : "white";
      this.view = this.#history.length;
      piece.move(target);
      if (piece instanceof Pawn && Math.abs(target[0] - selected[0]) === 2) {
        const neighborPieces = [this.position[target[0]][target[1] + 1], this.position[target[0]][target[1] - 1]]
        const passantSquare = [piece.coord[0] - piece.direction, piece.coord[1]];
        neighborPieces.forEach(p => {
          if (p instanceof Pawn && p.color !== piece.color){
            p.enPassant = {passantSquare: passantSquare, capturePawn: piece, validTurn: this.#history.length};
          }
        })
      }
    }
    return this;
  }
}