import Board from "./board";

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
    return this.#history.at(-1 - this.view);
  }

  set view(moveNumber) {
    this.viewing = moveNumber;
  }

  move(selected, target) {
    const piece = this.position[selected[0]][selected[1]];
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
    }
    return this;
  }
}