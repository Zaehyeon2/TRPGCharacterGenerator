/* eslint-disable react/require-default-props */
import { Text, Stack, Grid, TextInput, Checkbox, Container, Select } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { DetailedSkillProps, SkillParams, SkillProps } from '../interfaces/interfaces';
import { isNumber } from '../services/utils.service';

export function Skills({
  skillKey,
  label,
  baseValue,
  checkboxDisabled = false,
  getAndSetFunction,
}: SkillParams) {
  const [skillValues, setSkillValues] = useState<SkillProps>({
    value: 0,
    valueAddedByBaseValue: baseValue,
    valueDividedBy2: Math.floor(baseValue / 2),
    valueDividedBy5: Math.floor(baseValue / 5),
    isClassTraits: false,
    detailedKey: skillKey,
    baseValue,
  });

  useEffect(() => {
    setSkillValues({
      ...skillValues,
      valueAddedByBaseValue: skillValues.value + baseValue,
      baseValue,
    });
  }, [baseValue]);

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

  function setStats(stat: number) {
    const valueAddedByBaseValue = stat + skillValues.baseValue;
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
    if (getAndSetFunction === undefined) return;
    if (isDetailedSkill(skillValues.detailedKey)) return;
    getAndSetFunction(skillValues.detailedKey, {
      value: skillValues.value,
      valueAddedByBaseValue: skillValues.valueAddedByBaseValue,
      isChecked: skillValues.isClassTraits,
    });
  }, [skillValues.valueAddedByBaseValue, skillValues.isClassTraits]);

  const detailedScience: DetailedSkillProps[] = [
    {
      label: '과학',
      key: 'science',
      baseValue: 0,
    },
    {
      label: '과학 (공학) (1%)',
      key: 'scienceEngineering',
      baseValue: 1,
    },
    {
      label: '과학 (기상학) (1%)',
      key: 'scienceMeteorology',
      baseValue: 1,
    },
    {
      label: '과학 (동물학) (1%)',
      key: 'scienceZoology',
      baseValue: 1,
    },
    {
      label: '과학 (물리학) (1%)',
      key: 'sciencePhysics',
      baseValue: 1,
    },
    {
      label: '과학 (생물학) (1%)',
      key: 'scienceBiology',
      baseValue: 1,
    },
    {
      label: '과학 (수사과학) (1%)',
      key: 'scienceForensicScience',
      baseValue: 1,
    },
    {
      label: '과학 (수학) (10%)',
      key: 'scienceMathematics',
      baseValue: 10,
    },
    {
      label: '과학 (식물학) (1%)',
      key: 'scienceBotany',
      baseValue: 1,
    },
    {
      label: '과학 (암호학) (1%)',
      key: 'scienceCryptology',
      baseValue: 1,
    },
    {
      label: '과학 (약학) (1%)',
      key: 'sciencePharmacy',
      baseValue: 1,
    },
    {
      label: '과학 (지질학) (1%)',
      key: 'scienceGeology',
      baseValue: 1,
    },
    {
      label: '과학 (천문학) (1%)',
      key: 'scienceAstronomy',
      baseValue: 1,
    },
    {
      label: '과학 (화학) (1%)',
      key: 'scienceChemistry',
      baseValue: 1,
    },
  ];

  const detailedFighting: DetailedSkillProps[] = [
    {
      label: '근접전',
      key: 'fighting',
      baseValue: 0,
    },
    {
      label: '근접전 (가롯테) (15%)',
      key: 'fightingGauntlet',
      baseValue: 15,
    },
    {
      label: '근접전 (격투) (25%)',
      key: 'fightingBrawl',
      baseValue: 25,
    },
    {
      label: '근접전 (도검) (20%)',
      key: 'fightingSword',
      baseValue: 20,
    },
    {
      label: '근접전 (도끼) (15%)',
      key: 'fightingAxe',
      baseValue: 15,
    },
    {
      label: '근접전 (도리깨) (10%)',
      key: 'fightingMace',
      baseValue: 10,
    },
    {
      label: '근접전 (동력톱) (10%)',
      key: 'fightingChainsaw',
      baseValue: 10,
    },
    {
      label: '근접전 (창) (20%)',
      key: 'fightingSpear',
      baseValue: 20,
    },
    {
      label: '근접전 (채찍) (5%)',
      key: 'fightingWhip',
      baseValue: 5,
    },
  ];

  const detailedFirearm: DetailedSkillProps[] = [
    {
      label: '사격',
      key: 'firearms',
      baseValue: 0,
    },
    {
      label: '사격 (권총) (20%)',
      key: 'firearmsHandgun',
      baseValue: 20,
    },
    {
      label: '사격 (기관단총) (15%)',
      key: 'firearmsSubmachineGun',
      baseValue: 15,
    },
    {
      label: '사격 (기관총) (10%)',
      key: 'firearmsMachineGun',
      baseValue: 10,
    },
    {
      label: '사격 (라이플/산탄총) (25%)',
      key: 'firearmsRifle',
      baseValue: 25,
    },
    {
      label: '사격 (중화기) (10%)',
      key: 'firearmsHeavyWeapon',
      baseValue: 10,
    },
    {
      label: '사격 (화염방사기) (10%)',
      key: 'firearmsFlamethrower',
      baseValue: 10,
    },
    {
      label: '사격 (활) (15%)',
      key: 'firearmsBow',
      baseValue: 15,
    },
  ];

  const detailedSurvive: DetailedSkillProps[] = [
    {
      label: '생존술',
      key: 'survival',
      baseValue: 0,
    },
    {
      label: '생존술 (사막) (10%)',
      key: 'survivalDesert',
      baseValue: 10,
    },
    {
      label: '생존술 (바다) (10%)',
      key: 'survivalSea',
      baseValue: 10,
    },
    {
      label: '생존술 (극지방) (10%)',
      key: 'survivalPolar',
      baseValue: 10,
    },
    {
      label: '생존술 (밀림) (10%)',
      key: 'survivalJungle',
      baseValue: 10,
    },
    {
      label: '생존술 (산악) (10%)',
      key: 'survivalMountain',
      baseValue: 10,
    },
  ];

  const detailedArtcraft: DetailedSkillProps[] = [
    {
      label: '예술/공예',
      key: 'artcraft',
      baseValue: 0,
    },
    {
      label: '예술/공예 (도색 및 실내장식) (5%)',
      key: 'artcraftPainting',
      baseValue: 5,
    },
    {
      label: '예술/공예 (도예) (5%)',
      key: 'artcraftPottery',
      baseValue: 5,
    },
    {
      label: '예술/공예 (모리스 댄스) (5%)',
      key: 'artcraftMorrisDance',
      baseValue: 5,
    },
    {
      label: '예술/공예 (목수) (5%)',
      key: 'artcraftCarpentry',
      baseValue: 5,
    },
    {
      label: '예술/공예 (무용) (5%)',
      key: 'artcraftDance',
      baseValue: 5,
    },
    {
      label: '예술/공예 (미술) (5%)',
      key: 'artcraftArt',
      baseValue: 5,
    },
    {
      label: '예술/공예 (사진) (5%)',
      key: 'artcraftPhotography',
      baseValue: 5,
    },
    {
      label: '예술/공예 (서예) (5%)',
      key: 'artcraftCalligraphy',
      baseValue: 5,
    },
    {
      label: '예술/공예 (연기) (5%)',
      key: 'artcraftActing',
      baseValue: 5,
    },
    {
      label: '예술/공예 (오페라 성악) (5%)',
      key: 'artcraftOpera',
      baseValue: 5,
    },
    {
      label: '예술/공예 (요리) (5%)',
      key: 'artcraftCooking',
      baseValue: 5,
    },
    {
      label: '예술/공예 (위조) (5%)',
      key: 'artcraftForgery',
      baseValue: 5,
    },
    {
      label: '예술/공예 (이발) (5%)',
      key: 'artcraftBarber',
      baseValue: 5,
    },
    {
      label: '예술/공예 (작가) (5%))',
      key: 'artcraftWriting',
      baseValue: 5,
    },
    {
      label: '예술/공예 (조각) (5%)',
      key: 'artcraftSculpture',
      baseValue: 5,
    },
    {
      label: '예술/공예 (진공관 제작) (5%)',
      key: 'artcraftVacuumTube',
      baseValue: 5,
    },
  ];

  const detailedPilot: DetailedSkillProps[] = [
    {
      label: '조종',
      key: 'pilot',
      baseValue: 0,
    },
    {
      label: '조종 (항공기) (1%)',
      key: 'pilotAircraft',
      baseValue: 1,
    },
    {
      label: '조종 (선박) (1%)',
      key: 'pilotShip',
      baseValue: 1,
    },
    {
      label: '조종 (비행선) (1%)',
      key: 'pilotAirship',
      baseValue: 1,
    },
    {
      label: '조종 (보트) (1%)',
      key: 'pilotBoat',
      baseValue: 1,
    },
    {
      label: '조종 (??) (1%)',
      key: 'pilotSomething',
      baseValue: 1,
    },
  ];

  const rareSkills: DetailedSkillProps[] = [
    {
      label: '기타',
      key: 'rare',
      baseValue: 0,
    },
    {
      label: '독순술 (1%)',
      key: 'lipReading',
      baseValue: 1,
    },
    {
      label: '동물 다루기 (5%)',
      key: 'animalHandling',
      baseValue: 5,
    },
    {
      label: '비밀지식 (꿈) (1%)',
      key: 'secretKnowledgeDream',
      baseValue: 1,
    },
    {
      label: '비밀지식 (네크로노미콘) (1%)',
      key: 'secretKnowledgeNecronomicon',
      baseValue: 1,
    },
    {
      label: '비밀지식 (UFO) (1%)',
      key: 'secretKnowledgeUFO',
      baseValue: 1,
    },
    {
      label: '비밀지식 (뱀파이어) (1%)',
      key: 'secretKnowledgeVampire',
      baseValue: 1,
    },
    {
      label: '비밀지식 (늑대인간) (1%)',
      key: 'secretKnowledgeWerewolf',
      baseValue: 1,
    },
    {
      label: '비밀지식 (야디스) (1%)',
      key: 'secretKnowledgeYidhra',
      baseValue: 1,
    },
    {
      label: '승마 (5%)',
      key: 'ride',
      baseValue: 5,
    },
    {
      label: '잠수 (1%)',
      key: 'scubaDiving',
      baseValue: 1,
    },
    {
      label: '최면술 (1%)',
      key: 'hypnosis',
      baseValue: 1,
    },
    {
      label: '포격 (1%)',
      key: 'artillery',
      baseValue: 1,
    },
    {
      label: '폭파 (1%)',
      key: 'demolitions',
      baseValue: 1,
    },
  ];

  function setInnerDetailedKey(detailedKey: DetailedSkillProps) {
    if (getAndSetFunction === undefined) return;
    getAndSetFunction(skillValues.detailedKey, undefined);
    setSkillValues({
      ...skillValues,
      value: 0,
      detailedKey: detailedKey.key,
      valueAddedByBaseValue: detailedKey.baseValue,
      valueDividedBy2: Math.floor(detailedKey.baseValue / 2),
      valueDividedBy5: Math.floor(detailedKey.baseValue / 5),
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
        onChange={(value) => {
          setDetailedKey(value as string);
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
