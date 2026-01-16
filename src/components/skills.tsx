/* eslint-disable react/require-default-props */
import { Text, Stack, Grid, TextInput, Checkbox, Container, Select } from '@mantine/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  detailedArtcraft,
  detailedFighting,
  detailedFirearm,
  detailedScience,
  detailedSurvive,
  detailedPilot,
  rareSkills,
} from '../consts/skills';
import {
  DetailedSkillProps,
  ReloadStateParams,
  SkillParams,
  SkillProps,
} from '../interfaces/interfaces';
import { formStat, isNumber } from '../services/utils.service';
import { componentStyles } from '../styles/styles';

const scienceLabels = detailedScience.map((s) => s.label);
const fightingLabels = detailedFighting.map((s) => s.label);
const firearmLabels = detailedFirearm.map((s) => s.label);
const surviveLabels = detailedSurvive.map((s) => s.label);
const artcraftLabels = detailedArtcraft.map((s) => s.label);
const pilotLabels = detailedPilot.map((s) => s.label);
const rareLabels = rareSkills.map((s) => s.label);

const DETAILED_SKILL_MAPS: Record<string, DetailedSkillProps[]> = {
  science: detailedScience,
  fighting: detailedFighting,
  firearms: detailedFirearm,
  survival: detailedSurvive,
  artcraft: detailedArtcraft,
  pilot: detailedPilot,
  rare: rareSkills,
};

const SKILL_SELECT_CONFIG: Record<
  string,
  { placeholder: string; data: string[]; defaultSkills: DetailedSkillProps[] }
> = {
  science: { placeholder: '과학', data: scienceLabels, defaultSkills: detailedScience },
  fighting: { placeholder: '근접전', data: fightingLabels, defaultSkills: detailedFighting },
  firearms: { placeholder: '사격', data: firearmLabels, defaultSkills: detailedFirearm },
  survival: { placeholder: '생존술', data: surviveLabels, defaultSkills: detailedSurvive },
  artcraft: { placeholder: '예술/공예', data: artcraftLabels, defaultSkills: detailedArtcraft },
  pilot: { placeholder: '조종', data: pilotLabels, defaultSkills: detailedPilot },
  rare: { placeholder: '기타', data: rareLabels, defaultSkills: rareSkills },
};

// Pre-computed array for performance - avoid recreating on every render
const ALL_DETAILED_SKILLS = [
  ...detailedScience,
  ...detailedFighting,
  ...detailedFirearm,
  ...detailedSurvive,
  ...detailedArtcraft,
  ...detailedPilot,
  ...rareSkills,
];

// Module-level helper functions to avoid recreation on every render
const DETAILED_SKILL_PREFIXES = ['science', 'fighting', 'firearms', 'language', 'artcraft', 'pilot', 'survival', 'rare'];

function isDetailedSkill(key: string): boolean {
  return DETAILED_SKILL_PREFIXES.some(prefix => key.startsWith(prefix));
}

function getBaseSkillType(key: string): string {
  const found = DETAILED_SKILL_PREFIXES.find(prefix => key.startsWith(prefix));
  return found || key;
}

export const Skills = React.memo(function Skills({
  skillKey,
  label,
  reloadState = {} as ReloadStateParams,
  baseValue,
  checkboxDisabled = false,
  getAndSetFunction,
  bonus50,
  bonus90,
  initialSkillValue,
  initialDetailedKey,
  onDetailedKeyChange,
  selectedDetailedSkills,
}: SkillParams) {
  let innerBonus = 0;
  if (bonus50) innerBonus += 10;
  if (bonus90) innerBonus += 10;

  const [skillValues, setSkillValues] = useState<SkillProps>(() => {
    const initValue = initialSkillValue?.value ?? 0;
    const initValueAdded = initialSkillValue?.valueAddedByBaseValue ?? baseValue + innerBonus;
    return {
      value: initValue,
      valueAddedByBaseValue: initValueAdded,
      valueDividedBy2: Math.floor(initValueAdded / 2),
      valueDividedBy5: Math.floor(initValueAdded / 5),
      isClassTraits: initialSkillValue?.isJobSkill ?? false,
      detailedKey: initialDetailedKey || skillKey,
      baseValue,
    };
  });

  const prevInitialSkillValueRef = useRef(initialSkillValue);
  const prevInitialDetailedKeyRef = useRef(initialDetailedKey);

  function getValuesByAddedBonus(value: number) {
    let values = value;
    if (bonus50) {
      if (values <= 50) {
        if (values <= 40) {
          values += 10;
        } else {
          values = 50;
        }
      }
    }
    if (bonus90) {
      if (values <= 90) {
        if (values <= 80) {
          values += 10;
        } else {
          values = 90;
        }
      }
    }
    return values;
  }

  function setStats(stat: number) {
    const valueAddedByBaseValue = getValuesByAddedBonus(skillValues.baseValue + stat);

    setSkillValues({
      value: stat,
      valueAddedByBaseValue,
      valueDividedBy2: Math.floor(valueAddedByBaseValue / 2),
      valueDividedBy5: Math.floor(valueAddedByBaseValue / 5),
      isClassTraits: skillValues.isClassTraits,
      detailedKey: skillValues.detailedKey,
      baseValue: skillValues.baseValue,
    });
  }

  useEffect(() => {
    const valueAddedByBaseValue = getValuesByAddedBonus(skillValues.baseValue);

    setSkillValues({
      value: 0,
      valueAddedByBaseValue,
      valueDividedBy2: Math.floor(valueAddedByBaseValue / 2),
      valueDividedBy5: Math.floor(valueAddedByBaseValue / 5),
      isClassTraits: false,
      detailedKey: skillValues.detailedKey,
      baseValue: skillValues.baseValue,
    });
  }, [reloadState[skillKey]]);

  useEffect(() => {
    setStats(skillValues.value);
  }, [bonus50, bonus90]);

  useEffect(() => {
    const valueAddedByBaseValue = getValuesByAddedBonus(baseValue + skillValues.value);

    setSkillValues({
      ...skillValues,
      valueAddedByBaseValue,
      valueDividedBy2: Math.floor(valueAddedByBaseValue / 2),
      valueDividedBy5: Math.floor(valueAddedByBaseValue / 5),
      baseValue,
    });
  }, [baseValue]);

  useEffect(() => {
    const hasNewSkillValue =
      initialSkillValue && prevInitialSkillValueRef.current !== initialSkillValue;
    const hasNewDetailedKey =
      initialDetailedKey && prevInitialDetailedKeyRef.current !== initialDetailedKey;

    if (hasNewSkillValue || hasNewDetailedKey) {
      if (hasNewSkillValue) {
        prevInitialSkillValueRef.current = initialSkillValue;
      }
      if (hasNewDetailedKey) {
        prevInitialDetailedKeyRef.current = initialDetailedKey;
      }

      const foundDetailedSkill = initialDetailedKey
        ? ALL_DETAILED_SKILLS.find((s) => s.key === initialDetailedKey)
        : null;

      const skillValue = initialSkillValue?.value ?? 0;
      const skillBaseValue = foundDetailedSkill?.baseValue ?? baseValue;
      const valueAddedByBaseValue = getValuesByAddedBonus(skillBaseValue + skillValue);

      setSkillValues({
        value: skillValue,
        valueAddedByBaseValue,
        valueDividedBy2: Math.floor(valueAddedByBaseValue / 2),
        valueDividedBy5: Math.floor(valueAddedByBaseValue / 5),
        isClassTraits: initialSkillValue?.isJobSkill ?? false,
        detailedKey: initialDetailedKey || skillKey,
        baseValue: skillBaseValue,
      });
    }
  }, [initialSkillValue, initialDetailedKey, baseValue, skillKey]);

  const prevSkillValuesRef = useRef(skillValues);

  useEffect(() => {
    if (getAndSetFunction === undefined) return;
    if (skillValues.detailedKey === skillKey && isDetailedSkill(skillKey)) return;

    const prev = prevSkillValuesRef.current;
    const hasChanged =
      prev.value !== skillValues.value ||
      prev.valueAddedByBaseValue !== skillValues.valueAddedByBaseValue ||
      prev.isClassTraits !== skillValues.isClassTraits ||
      prev.detailedKey !== skillValues.detailedKey;

    if (hasChanged) {
      prevSkillValuesRef.current = skillValues;
      getAndSetFunction(skillValues.detailedKey, {
        value: skillValues.value,
        valueAddedByBaseValue: skillValues.valueAddedByBaseValue,
        isJobSkill: skillValues.isClassTraits,
      });
    }
  }, [skillValues, getAndSetFunction, skillKey]);

  function setInnerDetailedKey(detailedKey: DetailedSkillProps, preserveValue = false) {
    if (getAndSetFunction === undefined) return;
    if (!preserveValue) {
      getAndSetFunction(skillKey, undefined);
    }
    setSkillValues({
      ...skillValues,
      value: preserveValue ? skillValues.value : 0,
      detailedKey: detailedKey.key,
      valueAddedByBaseValue: getValuesByAddedBonus(
        detailedKey.baseValue + (preserveValue ? skillValues.value : 0),
      ),
      valueDividedBy2: Math.floor(
        getValuesByAddedBonus(detailedKey.baseValue + (preserveValue ? skillValues.value : 0)) / 2,
      ),
      valueDividedBy5: Math.floor(
        getValuesByAddedBonus(detailedKey.baseValue + (preserveValue ? skillValues.value : 0)) / 5,
      ),
      baseValue: detailedKey.baseValue,
      isClassTraits: preserveValue ? skillValues.isClassTraits : false,
    });
    if (onDetailedKeyChange) {
      onDetailedKeyChange(skillKey, detailedKey.key);
    }
  }

  function setDetailedKey(key: string) {
    const baseType = getBaseSkillType(skillKey);
    const skillArray = DETAILED_SKILL_MAPS[baseType];

    if (skillArray) {
      const detailedKey = skillArray.find((skill) => skill.label === key);
      if (detailedKey) {
        setInnerDetailedKey(detailedKey);
      }
    } else {
      setSkillValues({ ...skillValues, detailedKey: skillKey });
    }
  }

  const handleSelectChange = useCallback(
    (value: string | null) => {
      if (value) setDetailedKey(value);
    },
    [skillKey],
  );

  const selectedLabel = useMemo(() => {
    const found = ALL_DETAILED_SKILLS.find((s) => s.key === skillValues.detailedKey);
    return found?.label;
  }, [skillValues.detailedKey]);

  // Filter out options already selected by other skills of the same type
  const filteredSelectData = useMemo(() => {
    const baseType = getBaseSkillType(skillKey);
    const config = SKILL_SELECT_CONFIG[baseType];
    if (!config) return [];
    if (!selectedDetailedSkills) return config.data;

    // Get keys of other skills with same base type that have selections
    const otherSelectedKeys = Object.entries(selectedDetailedSkills)
      .filter(([key, value]) => key !== skillKey && key.startsWith(baseType) && value)
      .map(([, value]) => value);

    // Get labels of those selected skills
    const otherSelectedLabels = otherSelectedKeys
      .map((key) => ALL_DETAILED_SKILLS.find((s) => s.key === key)?.label)
      .filter(Boolean);

    // Filter out already selected labels
    return config.data.filter((label) => !otherSelectedLabels.includes(label));
  }, [skillKey, selectedDetailedSkills]);

  function setLabel(key: string) {
    if (!isDetailedSkill(key)) {
      return (
        <Text align="center" fz="sm" h={30}>
          {label} ({baseValue}%)
        </Text>
      );
    }

    const baseType = getBaseSkillType(key);
    const config = SKILL_SELECT_CONFIG[baseType];

    if (config) {
      return (
        <Select
          placeholder={config.placeholder}
          value={selectedLabel ?? config.defaultSkills[0].label}
          data={filteredSelectData}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }

    return (
      <Text align="center" fz="sm" h={30}>
        {label} ({baseValue}%)
      </Text>
    );
  }

  function isCheckboxDisabled(key: string) {
    if (key === skillKey && isDetailedSkill(skillKey)) return true;
    if (checkboxDisabled) return true;
    return false;
  }

  const { classes } = componentStyles();

  return (
    <Container sx={{ padding: 0 }}>
      <Stack align="center" spacing={0} className={classes.statContainer}>
        {setLabel(skillKey)}
        <Grid justify="center" align="center" p={5} grow>
          <Grid.Col span="content">
            <Checkbox
              disabled={isCheckboxDisabled(skillValues.detailedKey)}
              checked={skillValues.isClassTraits}
              size="xs"
              onChange={() => {
                setSkillValues({ ...skillValues, isClassTraits: !skillValues.isClassTraits });
              }}
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <TextInput
              autoComplete="off"
              disabled={skillKey !== 'credit' && isCheckboxDisabled(skillValues.detailedKey)}
              value={skillValues.value}
              onChange={(event) => {
                if (!isNumber(event.currentTarget.value)) return;
                setStats(+event.currentTarget.value);
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Grid justify="center" align="center">
              <Grid.Col span={6}>
                <Text fz="xl">{formStat(skillValues.valueAddedByBaseValue, 1)}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack spacing={0} align="center">
                  <Text fz="xs">{formStat(skillValues.valueDividedBy2, 2)}</Text>
                  <Text fz="xs">{formStat(skillValues.valueDividedBy5, 5)}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
});
