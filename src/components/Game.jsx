import { useState } from "react";
import Board from "./Board";
import Info from "./Info";
import { startPosition } from "../lib/chess";
import SVGComponent from "./SVGComponent";

function Game() {
  const [history, setHistory] = useState([startPosition]);

  return (
    <div className="h-[500px] w-full flex">
      <Board position={history[0]}/>
      <Info />
      <SVGComponent />
    </div>
  );
}
export default Game;
