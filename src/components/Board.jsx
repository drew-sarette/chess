import Square from "./Square";
import { useState } from "react";
import clsx from "clsx";

function Board({ game, handleMove }) {
  const position = game.position;
  const player = game.whosNext;
  const [selected, setSelected] = useState([null, null]);

  const squareClick = (coord) => {
    // No square selected, empty square clicked
    if (position[coord[0]][coord[1]] === null && selected[0] === null) {
      return;
    }
    // Selected square was clicked
    if (selected[0] === coord[0] && selected[1] === coord[1]) {
      setSelected([null, null]);
      return;
    }
    // No square selected, check if square can be selected
    if (selected[0] === null) {
      const piece = position[coord[0]][coord[1]];
      if (piece && piece.color === player) {
        setSelected(coord);
      }
      return;
    }
    // Square is selected, different square clicked, proceed with move
    if (selected[0] !== null) {
      handleMove(selected, coord);
      setSelected([null, null]);
      return;
    }
  };

  return (
    <div
      className={clsx("flex aspect-square", {
        "flex-col-reverse": player === "white",
        "flex-col": player === "black",
      })}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7].map((rank) => (
        <div
          key={rank}
          className={clsx("flex basis-[12.5%]", {
            "flex-row-reverse": player === "black",
          })}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((file) => (
            <Square
              key={`${rank}${file}`}
              coord={[rank, file]}
              selected={selected[0] === rank && selected[1] === file}
              piece={position[rank][file]}
              onClick={() => squareClick([rank, file])}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
