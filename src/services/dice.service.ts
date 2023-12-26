export function rollDice(nDices: number, nSides: number, name?: string): number {
  let result = 0;
  let header = '';
  if (name) {
    header = `[Rolling ${nDices}d${nSides} - ${name}]`;
  } else {
    header = `[Rolling ${nDices}d${nSides}]`;
  }
  console.log(`${header} start`);
  for (let i = 0; i < nDices; i += 1) {
    const dice = Math.floor(Math.random() * nSides) + 1;
    result += dice;
    console.log(`${header} dice ${i + 1}: ${dice}`);
  }
  console.log(`${header} end, result: ${result}`);
  return result;
}
