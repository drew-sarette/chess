import css from "./board.module.css";
import { classy } from "../../lib/utils";
import Square from "../square/Square";

function Board({ player = "white", position }) {

  return (
    <div className={classy(css, 'board', player === 'black' && 'board-reverse')}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((rank) => (
        <div key={rank} className={classy(css, 'rank', player === 'black' && 'rank-reverse')}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((file) => (
            <Square key={`${rank}${file}`} coord={[rank, file]} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
