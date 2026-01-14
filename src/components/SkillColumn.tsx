import { Flex, Grid } from '@mantine/core';
import React from 'react';
import { Skills } from './skills';
import { ReloadStateParams, SkillParamsItem } from '../interfaces/interfaces';

interface SkillColumnProps {
  skillParams: SkillParamsItem[];
  getAndSetSkills: (
    key: string,
    value: { value: number; valueAddedByBaseValue: number; isChecked: boolean } | undefined,
  ) => void;
  getBonus: (key: string, num: string) => boolean | undefined;
  reloadState: ReloadStateParams;
}

export const SkillColumn = React.memo(function SkillColumn({
  skillParams,
  getAndSetSkills,
  getBonus,
  reloadState,
}: SkillColumnProps) {
  return (
    <Grid.Col span={3}>
      <Flex direction="column" gap="md" justify="center" align="center">
        {skillParams.map((skill) => (
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
          />
        ))}
      </Flex>
    </Grid.Col>
  );
});
