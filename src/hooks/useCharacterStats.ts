import { useState, useCallback } from 'react';
import { INITIAL_STATS } from '../consts/initialStates';
import { calculateMobility } from '../domain/character.service';
import { IStats, IInnerStats } from '../interfaces/interfaces';

export function useCharacterStats(initialStats: IStats = INITIAL_STATS) {
  const [statValues, setStatsValue] = useState(initialStats);

  const updateStat = useCallback((key: string, value: IInnerStats) => {
    setStatsValue((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateStatField = useCallback(<K extends keyof IStats>(key: K, value: IStats[K]) => {
    setStatsValue((prev) => ({ ...prev, [key]: value }));
  }, []);

  const recalculateMobility = useCallback(() => {
    setStatsValue((prev) => {
      const mobility = calculateMobility(
        prev.str.value2,
        prev.dex.value2,
        prev.size.value2,
        prev.age,
      );
      return { ...prev, mobility };
    });
  }, []);

  return {
    statValues,
    setStatsValue,
    updateStat,
    updateStatField,
    recalculateMobility,
  };
}
