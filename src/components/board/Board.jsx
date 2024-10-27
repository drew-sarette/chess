import css from "./board.module.css";
import { classy } from "../../lib/utils";
import Square from "../square/Square";
import { getNotation } from "../../lib/chess";
import { useState } from "react";

function Board({ player = "white", position }) {
  const [selected, setSelected] = useState([null, null]);

  const boardStyle = classy(css, 'board', player === 'black' && 'board-reverse');
  const rankStyle = classy(css, 'rank', player === 'black' && 'rank-reverse');

  const squareClick = (coord) => {
    if (selected[0] === coord[0] && selected[1] === coord[1]) {
      setSelected([null, null]);
    }
    else {
      setSelected(coord);
      console.log(selected);
    }
  }

  return (
    <div className={boardStyle}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((rank) => (
        <div key={rank} className={rankStyle}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((file) => (
            <Square 
              key={`${rank}${file}`} 
              coord={[rank, file]} 
              onClick={() => squareClick([rank, file])}
              selected={selected[0] === rank && selected[1] === file}/>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
