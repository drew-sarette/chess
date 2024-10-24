import css from "./board.module.css";
import { classy } from "../../lib/utils";
import { sq } from "../../lib/chess";

import Square from "../square/Square";

function Board() {
  return (
    <div className={classy(css, "base")}>
      {Array(64)
        .fill()
        .map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const notation = String.fromCharCode(97 + col) + (row + 1);
          return (
            <Square key={i} num={i} coord={[row, col]} />
          );
        })}
    </div>
  );
}
export default Board;
