/* eslint-disable react/require-default-props */
import { Text, Stack, Grid, TextInput, Checkbox, Container, Select } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import {
  detailedArtcraft,
  detailedFighting,
  detailedFirearm,
  detailedScience,
  detailedSurvive,
  detailedPilot,
  rareSkills,
} from '../consts/skills';
import { DetailedSkillProps, SkillParams, SkillProps } from '../interfaces/interfaces';
import { isNumber } from '../services/utils.service';

export function Skills({
  skillKey,
  label,
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
    setStats(skillValues.value);
  }, [bonus50, bonus90]);

  useEffect(() => {
    if (getAndSetFunction === undefined) return;
    if (isDetailedSkill(skillValues.detailedKey)) return;
    getAndSetFunction(skillValues.detailedKey, {
      value: skillValues.value,
      valueAddedByBaseValue: getValuesByAddedBonus(
        skillValues.valueAddedByBaseValue + skillValues.value,
      ),
      isChecked: skillValues.isClassTraits,
    });
  }, [skillValues.valueAddedByBaseValue, skillValues.isClassTraits]);

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

  function setLabel(key: string) {
    if (!isDetailedSkill(key)) {
      return (
        <Text align="center" fz="sm" sx={{ height: '30px' }}>
          {label} ({baseValue}%)
        </Text>
      );
    }
    if (key === 'science') {
      return (
        <Select
          placeholder="과학"
          defaultValue={detailedScience[0].label}
          data={detailedScience.map((science) => {
            return science.label;
          })}
          size="xs"
          onChange={(value) => {
            setDetailedKey(value as string);
          }}
        />
      );
    }
    if (key === 'fighting') {
      return (
        <Select
          placeholder="근접전"
          defaultValue={detailedFighting[0].label}
          data={detailedFighting.map((fighting) => {
            return fighting.label;
          })}
          size="xs"
          onChange={(value) => {
            setDetailedKey(value as string);
          }}
        />
      );
    }
    if (key === 'firearms') {
      return (
        <Select
          placeholder="사격"
          defaultValue={detailedFirearm[0].label}
          data={detailedFirearm.map((firearm) => {
            return firearm.label;
          })}
          size="xs"
          onChange={(value) => {
            setDetailedKey(value as string);
          }}
        />
      );
    }
    if (key === 'survival') {
      return (
        <Select
          placeholder="생존술"
          defaultValue={detailedSurvive[0].label}
          data={detailedSurvive.map((survival) => {
            return survival.label;
          })}
          size="xs"
          onChange={(value) => {
            setDetailedKey(value as string);
          }}
        />
      );
    }
    if (key === 'artcraft') {
      return (
        <Select
          placeholder="예술/공예"
          defaultValue={detailedArtcraft[0].label}
          data={detailedArtcraft.map((artcraft) => {
            return artcraft.label;
          })}
          size="xs"
          onChange={(value) => {
            setDetailedKey(value as string);
          }}
        />
      );
    }
    if (key === 'pilot') {
      return (
        <Select
          placeholder="조종"
          defaultValue={detailedPilot[0].label}
          data={detailedPilot.map((pilot) => {
            return pilot.label;
          })}
          size="xs"
          onChange={(value) => {
            setDetailedKey(value as string);
          }}
        />
      );
    }

    return (
      <Select
        placeholder="기타"
        defaultValue={rareSkills[0].label}
        data={rareSkills.map((rare) => {
          return rare.label;
        })}
        size="xs"
        onChange={(values) => {
          setDetailedKey(values as string);
        }}
      />
    );
  }

  function isCheckboxDisabled(key: string) {
    if (isDetailedSkill(key)) return true;
    if (checkboxDisabled) return true;
    return false;
  }

  return (
    <Container>
      <Stack align="center" spacing={0} sx={{ border: '1px solid', borderRadius: '0.5em' }}>
        {setLabel(skillKey)}
        <Grid justify="center" align="center" sx={{ padding: '5px' }} grow>
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
                <Text fz="xl">{skillValues.valueAddedByBaseValue}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack spacing={0} align="center">
                  <Text fz="xs">{skillValues.valueDividedBy2}</Text>
                  <Text fz="xs">{skillValues.valueDividedBy5}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
