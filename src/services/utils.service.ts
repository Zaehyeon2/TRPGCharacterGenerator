export function isNumber(value: string) {
  const numberedValue = Number(value);
  return !Number.isNaN(numberedValue) || numberedValue >= 0;
}

export function formStat(value: number, divider: number) {
  if (divider === 1) {
    if (value < 0) {
      return '0*';
    }
    if (value >= 100) {
      return '99*';
    }
  }
  if (divider === 2) {
    if (value < 0) {
      return '0*';
    }
    if (value >= 50) {
      return '49*';
    }
  }
  if (divider === 5) {
    if (value < 0) {
      return '0*';
    }
    if (value >= 20) {
      return '19*';
    }
  }
  return value;
}

export function formHp(size: number, health: number) {
  const hp = Math.floor((size + health) / 10);
  if (size > 99 || health > 99) {
    if (hp < 19) {
      return `${hp}*`
    }
    return '19*';
  }
  if (size < 0 || health < 0) {
    return '0*';
  }
  return hp;
}
