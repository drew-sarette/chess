import { useState } from "react";
import Board from "./Board";
import Info from "./Info";
import Chess from "../lib/chess";
import SVGComponent from "./SVGComponent";

function Game() {
  const [game, setGame] = useState(new Chess());
  const handleMove = (selected, target) => {
    setGame(game.move(selected, target));
  }

  return (
    <div className="h-[500px] w-full flex">
      <Board game={game} handleMove={handleMove} />
      <Info />
      <SVGComponent />
    </div>
  );
}
export default Game;