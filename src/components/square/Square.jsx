import css from "./square.module.css";
import { classy } from "../../lib/utils";
import { getNotation } from "../../lib/chess.js";

function Square({ coord }) {
  const [rank, file] = coord;
  let color;
  if (rank % 2) {
    color = file % 2 ? "dark" : "light";
  } else {
    color = file % 2 ? "light" : "dark";
  }

  let label = getNotation([rank, file]);

  return (
    <div className={classy(css, "base", color)}>
      <span className="llcorner">{label}</span>
    </div>
  );
}
export default Square;
