// Age penalty configuration
export interface AgePenaltyConfig {
  minAge: number;
  maxAge: number;
  appearancePenalty: number;
  totalPenalty: number;
  educationBonusRolls: number;
  mobilityPenalty: number;
}

export const AGE_PENALTIES: AgePenaltyConfig[] = [
  {
    minAge: 0,
    maxAge: 19,
    appearancePenalty: 0,
    totalPenalty: 5,
    educationBonusRolls: 0,
    mobilityPenalty: 0,
  },
  {
    minAge: 20,
    maxAge: 39,
    appearancePenalty: 0,
    totalPenalty: 0,
    educationBonusRolls: 1,
    mobilityPenalty: 0,
  },
  {
    minAge: 40,
    maxAge: 49,
    appearancePenalty: 5,
    totalPenalty: 5,
    educationBonusRolls: 2,
    mobilityPenalty: 1,
  },
  {
    minAge: 50,
    maxAge: 59,
    appearancePenalty: 10,
    totalPenalty: 10,
    educationBonusRolls: 3,
    mobilityPenalty: 2,
  },
  {
    minAge: 60,
    maxAge: 69,
    appearancePenalty: 15,
    totalPenalty: 20,
    educationBonusRolls: 4,
    mobilityPenalty: 3,
  },
  {
    minAge: 70,
    maxAge: 79,
    appearancePenalty: 20,
    totalPenalty: 40,
    educationBonusRolls: 4,
    mobilityPenalty: 4,
  },
  {
    minAge: 80,
    maxAge: 999,
    appearancePenalty: 25,
    totalPenalty: 80,
    educationBonusRolls: 4,
    mobilityPenalty: 5,
  },
];

export function getAgePenalty(age: number): AgePenaltyConfig {
  return AGE_PENALTIES.find((p) => age >= p.minAge && age <= p.maxAge) || AGE_PENALTIES[0];
}

// Credit tier configuration
export interface CreditTierConfig {
  minCredit: number;
  maxCredit: number;
  cashMultiplier: number;
  assetsMultiplier: number;
  spendingLevel: string;
  fixedCash?: string;
  fixedAssets?: string;
}

export const CREDIT_TIERS: CreditTierConfig[] = [
  {
    minCredit: 0,
    maxCredit: 0,
    cashMultiplier: 0,
    assetsMultiplier: 0,
    spendingLevel: '0.5',
    fixedCash: '0.5',
    fixedAssets: '0',
  },
  { minCredit: 1, maxCredit: 9, cashMultiplier: 1, assetsMultiplier: 10, spendingLevel: '2' },
  { minCredit: 10, maxCredit: 49, cashMultiplier: 2, assetsMultiplier: 50, spendingLevel: '10' },
  { minCredit: 50, maxCredit: 89, cashMultiplier: 5, assetsMultiplier: 500, spendingLevel: '50' },
  {
    minCredit: 90,
    maxCredit: 98,
    cashMultiplier: 20,
    assetsMultiplier: 2000,
    spendingLevel: '250',
  },
  {
    minCredit: 99,
    maxCredit: 999,
    cashMultiplier: 0,
    assetsMultiplier: 0,
    spendingLevel: '5,000',
    fixedCash: '50,000',
    fixedAssets: '5,000,000+',
  },
];

// Combat stat thresholds
export interface CombatThreshold {
  maxSum: number;
  damageBonus: string;
  build: number;
}

export const COMBAT_THRESHOLDS: CombatThreshold[] = [
  { maxSum: 64, damageBonus: '-2', build: -2 },
  { maxSum: 84, damageBonus: '-1', build: -1 },
  { maxSum: 124, damageBonus: '0', build: 0 },
  { maxSum: 164, damageBonus: '1D4', build: 1 },
  { maxSum: Infinity, damageBonus: '1D6', build: 2 },
];
