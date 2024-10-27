import css from "./square.module.css";
import { classy } from "../../lib/utils";
import { getNotation } from "../../lib/chess.js";

function Square({ coord, onClick, selected }) {
  const [rank, file] = coord;

  let label = getNotation([rank, file]);

  return (
    <div
      className={classy(css, "base", selected && "selected")}
      onClick={onClick}
    >
      <span className="llcorner">{label}</span>
    </div>
  );
}

export default Square;
