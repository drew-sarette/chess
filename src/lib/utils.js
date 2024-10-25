export function classy(stylesObject, ...classes) {
  return classes.map((c) => stylesObject[c]).join(" ");
}
