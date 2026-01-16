export interface CreditInfo {
  cash: string;
  assets: string;
  spendingLevel: string;
}

export function calculateCredit(creditValue: number): CreditInfo {
  if (creditValue === 0) return { cash: '0.5', assets: '0', spendingLevel: '0.5' };
  if (creditValue <= 9)
    return {
      cash: creditValue.toLocaleString(),
      assets: (creditValue * 10).toLocaleString(),
      spendingLevel: '2',
    };
  if (creditValue <= 49)
    return {
      cash: (creditValue * 2).toLocaleString(),
      assets: (creditValue * 50).toLocaleString(),
      spendingLevel: '10',
    };
  if (creditValue <= 89)
    return {
      cash: (creditValue * 5).toLocaleString(),
      assets: (creditValue * 500).toLocaleString(),
      spendingLevel: '50',
    };
  if (creditValue <= 98)
    return {
      cash: (creditValue * 20).toLocaleString(),
      assets: (creditValue * 2000).toLocaleString(),
      spendingLevel: '250',
    };
  return { cash: '50,000', assets: '5,000,000+', spendingLevel: '5,000' };
}
