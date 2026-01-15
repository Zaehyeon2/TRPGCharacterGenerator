import { Flex, Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Skills } from './skills';
import {
  ISelectedDetailedSkills,
  ISkills,
  ReloadStateParams,
  SkillParamsItem,
} from '../interfaces/interfaces';

interface SkillColumnProps {
  skillParams: SkillParamsItem[];
  getAndSetSkills: (
    key: string,
    value: { value: number; valueAddedByBaseValue: number; isJobSkill: boolean } | undefined,
  ) => void;
  getBonus: (key: string, num: string) => boolean | undefined;
  reloadState: ReloadStateParams;
  skillValues: ISkills;
  selectedDetailedSkills: ISelectedDetailedSkills;
  onDetailedKeyChange: (skillKey: string, detailedKey: string) => void;
}

export const SkillColumn = React.memo(function SkillColumn({
  skillParams,
  getAndSetSkills,
  getBonus,
  reloadState,
  skillValues,
  selectedDetailedSkills,
  onDetailedKeyChange,
}: SkillColumnProps) {
  const isDesktop = useMediaQuery('(min-width: 769px)');

  return (
    <Grid.Col span={6} sm={3}>
      <Flex direction="column" gap={isDesktop ? 'md' : 'xs'} justify="center" align="center">
        {skillParams.map((skill) => {
          const detailedKey = selectedDetailedSkills[skill.skillKey] || skill.skillKey;
          const initialValue = skillValues[detailedKey] || skillValues[skill.skillKey];
          return (
            <Skills
              value={skill.value}
              key={skill.skillKey}
              skillKey={skill.skillKey}
              label={skill.label}
              baseValue={skill.baseValue}
              getAndSetFunction={getAndSetSkills}
              checkboxDisabled={skill.checkboxDisabled}
              bonus50={getBonus(skill.skillKey, '50')}
              bonus90={getBonus(skill.skillKey, '90')}
              reloadState={reloadState}
              initialSkillValue={initialValue}
              initialDetailedKey={selectedDetailedSkills[skill.skillKey]}
              onDetailedKeyChange={onDetailedKeyChange}
            />
          );
        })}
      </Flex>
    </Grid.Col>
  );
});
