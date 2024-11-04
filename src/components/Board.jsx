import Square from "./Square";
import { useState } from "react";
import clsx from "clsx";

function Board({ player = "black", position }) {
  const [selected, setSelected] = useState([null, null]);

  const squareClick = (coord) => {
    if (selected[0] === coord[0] && selected[1] === coord[1]) {
      setSelected([null, null]);
    } else {
      setSelected(coord);
    }
  };

  return (
    <div className={clsx("flex aspect-square", {
      "flex-col-reverse": player === "white",
      "flex-col": player === "black",
    })}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((rank) => (
        <div key={rank} className={clsx("flex basis-[12.5%]", {
          "flex-row-reverse": player === "black",
        }
        )}>
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
