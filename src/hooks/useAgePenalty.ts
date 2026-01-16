import { useState, useCallback, useEffect } from 'react';
import { getAgePenalty } from '../config/gameRules.config';
import { INITIAL_STAT_PENALTY } from '../consts/initialStates';
import { IStatPenalty } from '../interfaces/interfaces';

export function useAgePenalty(age: number, isLoadingRef: React.MutableRefObject<boolean>) {
  const [statPenaltyValues, setStatPenaltyValues] = useState(INITIAL_STAT_PENALTY);
  const [educationBonusText, setEducationBonusText] = useState('');

  // Reset penalties when age changes
  useEffect(() => {
    if (isLoadingRef.current) return;

    const penalty = getAgePenalty(age);
    setStatPenaltyValues({
      str: 0,
      dex: 0,
      size: 0,
      health: 0,
      education: 0,
      appeareance: penalty.appearancePenalty,
      total: penalty.totalPenalty,
    });
    setEducationBonusText('');
  }, [age, isLoadingRef]);

  const updatePenalty = useCallback(
    <K extends keyof IStatPenalty>(key: K, value: number) => {
      const penalty = getAgePenalty(age);
      setStatPenaltyValues((prev) => ({
        ...prev,
        [key]: value,
        appeareance: penalty.appearancePenalty,
      }));
    },
    [age],
  );

  const remainingPenalty =
    statPenaltyValues.total -
    statPenaltyValues.str -
    statPenaltyValues.dex -
    statPenaltyValues.health -
    statPenaltyValues.size;

  return {
    statPenaltyValues,
    setStatPenaltyValues,
    updatePenalty,
    educationBonusText,
    setEducationBonusText,
    remainingPenalty,
  };
}
