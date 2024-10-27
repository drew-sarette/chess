export function getNotation([rank, file]) {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return letters[file] + numbers[rank];
}

export function getCoord(notation) {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return [letters.indexOf(notation[0]), numbers.indexOf(notation[1])];
}

export class Piece {
  constructor (type, color) {
    this.type = type;
    this.color = color;
    return;
  }

}