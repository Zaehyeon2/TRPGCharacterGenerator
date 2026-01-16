import { useState, useCallback, useEffect } from 'react';
import { INITIAL_SKILL_POINTS } from '../consts/initialStates';
import { ISkills, ISkillPoints } from '../interfaces/interfaces';

export function useSkillPoints(
  skillValues: ISkills,
  intValue2: number,
  initialSkillPoints: ISkillPoints = INITIAL_SKILL_POINTS,
) {
  const [skillPoints, setSkillPoints] = useState(initialSkillPoints);

  // Recalculate skill points when skills change
  useEffect(() => {
    const updatedSkillPoints = { ...skillPoints, job: 0, interest: 0 };

    Object.keys(skillValues).forEach((skillKey) => {
      const skillValue = skillValues[skillKey];
      if (skillValue.isJobSkill || skillKey === 'credit') {
        updatedSkillPoints.job += skillValue.value;
      } else {
        updatedSkillPoints.interest += skillValue.value;
      }
    });

    if (updatedSkillPoints.job > skillPoints.baseJob) {
      updatedSkillPoints.interest += updatedSkillPoints.job - skillPoints.baseJob;
      updatedSkillPoints.job = skillPoints.baseJob;
    }

    setSkillPoints(updatedSkillPoints);
  }, [skillValues, skillPoints.baseJob]);

  // Update base interest when INT changes
  useEffect(() => {
    setSkillPoints((prev) => ({
      ...prev,
      baseInterest: intValue2 * 2,
    }));
  }, [intValue2]);

  const setBaseJobPoints = useCallback((value: number) => {
    setSkillPoints((prev) => ({ ...prev, baseJob: value }));
  }, []);

  const remainingJobPoints = skillPoints.baseJob - skillPoints.job;
  const remainingInterestPoints = skillPoints.baseInterest - skillPoints.interest;

  return {
    skillPoints,
    setSkillPoints,
    setBaseJobPoints,
    remainingJobPoints,
    remainingInterestPoints,
  };
}
