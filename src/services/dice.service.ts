export function rollDice(nDices: number, nSides: number): number {
  let result = 0;
  for (let i = 0; i < nDices; i += 1) {
    result += Math.floor(Math.random() * nSides) + 1;
  }
  return result;
}
