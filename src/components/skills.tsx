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

  function isDetailedSkill(key: string) {
    return (
      key.startsWith('science') ||
      key.startsWith('fighting') ||
      key.startsWith('firearms') ||
      key.startsWith('language') ||
      key.startsWith('artcraft') ||
      key.startsWith('pilot') ||
      key.startsWith('survival') ||
      key.startsWith('rare')
    );
  }

  function getBaseSkillType(key: string) {
    if (key.startsWith('science')) return 'science';
    if (key.startsWith('fighting')) return 'fighting';
    if (key.startsWith('firearms')) return 'firearms';
    if (key.startsWith('artcraft')) return 'artcraft';
    if (key.startsWith('pilot')) return 'pilot';
    if (key.startsWith('survival')) return 'survival';
    if (key.startsWith('rare')) return 'rare';
    return key;
  }

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

      const allDetailedSkills = [
        ...detailedScience,
        ...detailedFighting,
        ...detailedFirearm,
        ...detailedSurvive,
        ...detailedArtcraft,
        ...detailedPilot,
        ...rareSkills,
      ];
      const foundDetailedSkill = initialDetailedKey
        ? allDetailedSkills.find((s) => s.key === initialDetailedKey)
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
    if (baseType === 'science') {
      const detailedKey = detailedScience.find((science) => {
        return science.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (baseType === 'fighting') {
      const detailedKey = detailedFighting.find((fighting) => {
        return fighting.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (baseType === 'firearms') {
      const detailedKey = detailedFirearm.find((firearm) => {
        return firearm.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (baseType === 'survival') {
      const detailedKey = detailedSurvive.find((survival) => {
        return survival.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (baseType === 'artcraft') {
      const detailedKey = detailedArtcraft.find((artcraft) => {
        return artcraft.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (baseType === 'pilot') {
      const detailedKey = detailedPilot.find((pilot) => {
        return pilot.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (baseType === 'rare') {
      const detailedKey = rareSkills.find((rare) => {
        return rare.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
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

  const getSelectedLabel = useCallback(() => {
    const allDetailedSkills = [
      ...detailedScience,
      ...detailedFighting,
      ...detailedFirearm,
      ...detailedSurvive,
      ...detailedArtcraft,
      ...detailedPilot,
      ...rareSkills,
    ];
    const found = allDetailedSkills.find((s) => s.key === skillValues.detailedKey);
    return found?.label;
  }, [skillValues.detailedKey]);

  function setLabel(key: string) {
    if (!isDetailedSkill(key)) {
      return (
        <Text align="center" fz="sm" h={30}>
          {label} ({baseValue}%)
        </Text>
      );
    }
    const selectedLabel = getSelectedLabel();
    const baseType = getBaseSkillType(key);
    if (baseType === 'science') {
      return (
        <Select
          placeholder="과학"
          value={selectedLabel ?? detailedScience[0].label}
          data={scienceLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (baseType === 'fighting') {
      return (
        <Select
          placeholder="근접전"
          value={selectedLabel ?? detailedFighting[0].label}
          data={fightingLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (baseType === 'firearms') {
      return (
        <Select
          placeholder="사격"
          value={selectedLabel ?? detailedFirearm[0].label}
          data={firearmLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (baseType === 'survival') {
      return (
        <Select
          placeholder="생존술"
          value={selectedLabel ?? detailedSurvive[0].label}
          data={surviveLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (baseType === 'artcraft') {
      return (
        <Select
          placeholder="예술/공예"
          value={selectedLabel ?? detailedArtcraft[0].label}
          data={artcraftLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (baseType === 'pilot') {
      return (
        <Select
          placeholder="조종"
          value={selectedLabel ?? detailedPilot[0].label}
          data={pilotLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }

    return (
      <Select
        placeholder="기타"
        value={selectedLabel ?? rareSkills[0].label}
        data={rareLabels}
        size="xs"
        onChange={handleSelectChange}
      />
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
