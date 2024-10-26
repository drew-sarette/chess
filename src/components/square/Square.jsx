import css from "./square.module.css";
import { classy } from "../../lib/utils";
import { getNotation } from "../../lib/chess.js";

function Square({ coord }) {
  const [rank, file] = coord;

  let label = getNotation([rank, file]);

  return (
    <div className={classy(css, "base")}>
      <span className="llcorner">{label}</span>
    </div>
  );
}

export default Square;
