import clsx from "clsx";

function Square({ coord, onClick, piece, selected }) {
  const [rank, file] = coord;
  const isLight = Boolean((rank + file) % 2);

  return (
    <div
      className={clsx("relative basis-[12.5%] overflow-hidden", {
        "border-2 border-red-400": selected,
        "bg-white": isLight,
        "bg-slate-200": !isLight,
      })}
      onClick={onClick}
    >
      {piece && (
        <svg
          className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 45 45"
          preserveAspectRatio="xMidYMid meet"
        >
          <use href={"#" + piece.color + piece.name}></use>
        </svg>
      )}
    </div>
  );
}

export default Square;