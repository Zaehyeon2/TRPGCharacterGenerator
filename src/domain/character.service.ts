export function calculateMobility(str: number, dex: number, size: number, age: number): number {
  let mobility: number;
  if (str < size && dex < size) mobility = 7;
  else if (str > size && dex > size) mobility = 9;
  else mobility = 8;

  if (age >= 80) mobility -= 5;
  else if (age >= 70) mobility -= 4;
  else if (age >= 60) mobility -= 3;
  else if (age >= 50) mobility -= 2;
  else if (age >= 40) mobility -= 1;

  return mobility;
}

export function calculateHP(size: number, health: number): number {
  return Math.floor((size + health) / 10);
}

export function calculateMagicPoints(mentality: number): number {
  return Math.floor(mentality / 5);
}
