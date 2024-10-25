import css from "./board.module.css";
import { classy } from "../../lib/utils";
import Square from "../square/Square";

function Board({ player = "white", position }) {
  const squares = [];

  if (player === "white")
    for (let rank = 7; rank >= 0; rank--) {
      for (let file = 0; file < 8; file++) {
        squares.push(<Square key={`${rank}${file}`} coord={[rank, file]} />);
      }
    }
  else {
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 7; file >= 0; file--) {
        squares.push(<Square key={`${rank}${file}`} coord={[rank, file]} />);
      }
    }
  }
  return (
    <div className={classy(css, "base", player === "white" && "white-view")}>
      {squares}
    </div>
  );
}

export default Board;
