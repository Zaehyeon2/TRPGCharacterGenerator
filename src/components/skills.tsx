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
}: SkillParams) {
  let innerBonus = 0;
  if (bonus50) innerBonus += 10;
  if (bonus90) innerBonus += 10;

  const [skillValues, setSkillValues] = useState<SkillProps>({
    value: 0,
    valueAddedByBaseValue: baseValue + innerBonus,
    valueDividedBy2: Math.floor((baseValue + innerBonus) / 2),
    valueDividedBy5: Math.floor((baseValue + innerBonus) / 5),
    isClassTraits: false,
    detailedKey: skillKey,
    baseValue,
  });

  function isDetailedSkill(key: string) {
    return (
      key === 'science' ||
      key === 'fighting' ||
      key === 'firearms' ||
      key === 'language' ||
      key === 'artcraft' ||
      key === 'pilot' ||
      key === 'survival' ||
      key === 'rare'
    );
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

  const prevSkillValuesRef = useRef(skillValues);

  useEffect(() => {
    if (getAndSetFunction === undefined) return;
    if (isDetailedSkill(skillValues.detailedKey)) return;

    const prev = prevSkillValuesRef.current;
    const hasChanged =
      prev.value !== skillValues.value ||
      prev.valueAddedByBaseValue !== skillValues.valueAddedByBaseValue ||
      prev.isClassTraits !== skillValues.isClassTraits;

    if (hasChanged) {
      prevSkillValuesRef.current = skillValues;
      getAndSetFunction(skillValues.detailedKey, {
        value: skillValues.value,
        valueAddedByBaseValue: skillValues.valueAddedByBaseValue,
        isChecked: skillValues.isClassTraits,
      });
    }
  }, [skillValues, getAndSetFunction]);

  function setInnerDetailedKey(detailedKey: DetailedSkillProps) {
    if (getAndSetFunction === undefined) return;
    getAndSetFunction(skillKey, undefined);
    setSkillValues({
      ...skillValues,
      value: 0,
      detailedKey: detailedKey.key,
      valueAddedByBaseValue: getValuesByAddedBonus(detailedKey.baseValue),
      valueDividedBy2: Math.floor(getValuesByAddedBonus(detailedKey.baseValue) / 2),
      valueDividedBy5: Math.floor(getValuesByAddedBonus(detailedKey.baseValue) / 5),
      baseValue: detailedKey.baseValue,
      isClassTraits: false,
    });
  }

  function setDetailedKey(key: string) {
    if (skillKey === 'science') {
      const detailedKey = detailedScience.find((science) => {
        return science.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (skillKey === 'fighting') {
      const detailedKey = detailedFighting.find((fighting) => {
        return fighting.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (skillKey === 'firearms') {
      const detailedKey = detailedFirearm.find((firearm) => {
        return firearm.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (skillKey === 'survival') {
      const detailedKey = detailedSurvive.find((survival) => {
        return survival.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (skillKey === 'artcraft') {
      const detailedKey = detailedArtcraft.find((artcraft) => {
        return artcraft.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (skillKey === 'pilot') {
      const detailedKey = detailedPilot.find((pilot) => {
        return pilot.label === key;
      });
      if (detailedKey === undefined) return;
      setInnerDetailedKey(detailedKey);
    } else if (skillKey === 'rare') {
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

  function setLabel(key: string) {
    if (!isDetailedSkill(key)) {
      return (
        <Text align="center" fz="sm" h={30}>
          {label} ({baseValue}%)
        </Text>
      );
    }
    if (key === 'science') {
      return (
        <Select
          placeholder="과학"
          defaultValue={detailedScience[0].label}
          data={scienceLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (key === 'fighting') {
      return (
        <Select
          placeholder="근접전"
          defaultValue={detailedFighting[0].label}
          data={fightingLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (key === 'firearms') {
      return (
        <Select
          placeholder="사격"
          defaultValue={detailedFirearm[0].label}
          data={firearmLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (key === 'survival') {
      return (
        <Select
          placeholder="생존술"
          defaultValue={detailedSurvive[0].label}
          data={surviveLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (key === 'artcraft') {
      return (
        <Select
          placeholder="예술/공예"
          defaultValue={detailedArtcraft[0].label}
          data={artcraftLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }
    if (key === 'pilot') {
      return (
        <Select
          placeholder="조종"
          defaultValue={detailedPilot[0].label}
          data={pilotLabels}
          size="xs"
          onChange={handleSelectChange}
        />
      );
    }

    return (
      <Select
        placeholder="기타"
        defaultValue={rareSkills[0].label}
        data={rareLabels}
        size="xs"
        onChange={handleSelectChange}
      />
    );
  }

  function isCheckboxDisabled(key: string) {
    if (isDetailedSkill(key)) return true;
    if (checkboxDisabled) return true;
    return false;
  }

  const { classes } = componentStyles();

  return (
    <Container>
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
