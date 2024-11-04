import { getNotation } from "../lib/chess.js";
import clsx from "clsx";

function Square({ coord, onClick, piece, selected }) {
  const [rank, file] = coord;
  const isLight = Boolean((rank % 2 + file % 2) % 2);

  return (
    <div
      className={clsx("basis-[12.5%] overflow-hidden", {
        "bg-white": isLight,
        "bg-slate-200": !isLight,
        "bg-red-400": selected,
      })}
      onClick={onClick}
    >
      {piece && piece.color + " " + piece.name}
    </div>
  );
}

export default Square;
