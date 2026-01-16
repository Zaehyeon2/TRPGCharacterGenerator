// Combat stats calculation based on STR + SIZE
export interface CombatStats {
  damageBonus: string;
  build: number;
}

export function calculateCombatStats(str: number, size: number): CombatStats {
  const sum = str + size;
  if (sum <= 64) return { damageBonus: '-2', build: -2 };
  if (sum <= 84) return { damageBonus: '-1', build: -1 };
  if (sum <= 124) return { damageBonus: '0', build: 0 };
  if (sum <= 164) return { damageBonus: '1D4', build: 1 };
  return { damageBonus: '1D6', build: 2 };
}
