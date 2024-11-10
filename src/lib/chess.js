import Position from "./position";
import { Pawn, King } from "./pieces";

export default class Chess {
  whosNext = "white";
  #history;
  constructor() {
    this.#history = [new Position()];
  }

  get current() {
    return this.#history.at(-1);
  }

  move(selected, target) {
    const nextPosition = new Position(this.current.outputShorts());
    nextPosition.setSquare(target, nextPosition.getSquare(selected)); 
    nextPosition.setSquare(selected, null);
    // nextPosition.setSquares([target, nextPosition.getSquare(selected)], [selected, null])
    if (nextPosition.isValid()){
      this.#history.push(nextPosition);
      this.whosNext = this.whosNext === "white" ? "black" : "white";
    }
    return this;
  }
}
