import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FileButton,
  Grid,
  Group,
  Popover,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import logo from '../assets/coc-logo.png';
import dice20 from '../assets/dice20.png';
import { ExplorerCombat } from '../components/cthulhu/ExplorerCombat';
import { ExplorerCredit } from '../components/cthulhu/ExplorerCredit';
import { ExplorerInfo } from '../components/cthulhu/ExplorerInfo';
import { ExplorerTraits } from '../components/cthulhu/ExplorerTraits';
import { ExplorerTraits2 } from '../components/cthulhu/ExplorerTraits2';
import { Logo } from '../components/logo';
import { SkillColumn } from '../components/SkillColumn';

import { defaultSkills } from '../consts/defaultValues';
import {
  INITIAL_EXPECTED_SKILLS,
  INITIAL_RELOAD_STATE,
  INITIAL_SKILL_POINTS,
  INITIAL_STATS,
  INITIAL_STAT_PENALTY,
} from '../consts/initialStates';
import { penaltyText } from '../consts/penaltyByAge';
import { skillsParamsFunction } from '../consts/skills';
import {
  IExplorerData,
  IInnerSkills,
  ISelectedDetailedSkills,
  ISimplifiedExplorerData,
  ISkills,
} from '../interfaces/interfaces';
import { rollDice } from '../services/dice.service';
import { downloadAsJson, isNumber, loadFromJsonFile } from '../services/utils.service';

export function CthulhuGenerator() {
  const isLoadingRef = useRef(false);
  const [statValues, setStatsValue] = useState(INITIAL_STATS);
  const [statPenaltyValues, setStatPenaltyValues] = useState(INITIAL_STAT_PENALTY);
  const [skillValues, setSkillValues] = useState(
    defaultSkills(statValues.dex.value2, statValues.education.value2) as ISkills,
  );
  const [educationBonusText, setEducationBonusText] = useState('');
  const [expectedSkills, setExpectedSkills] = useState(INITIAL_EXPECTED_SKILLS);
  const [skillPoints, setSkillPoints] = useState(INITIAL_SKILL_POINTS);
  const [reloadState, setReloadState] = useState(INITIAL_RELOAD_STATE);
  const [reloadStatBool, setReloadStatBool] = useState(false);
  const [selectedDetailedSkills, setSelectedDetailedSkills] = useState<ISelectedDetailedSkills>({
    science: '',
    science1: '',
    science2: '',
    science3: '',
    fighting: '',
    fighting1: '',
    fighting2: '',
    fighting3: '',
    firearms: '',
    firearms1: '',
    firearms2: '',
    firearms3: '',
    survival: '',
    survival1: '',
    artcraft: '',
    artcraft1: '',
    artcraft2: '',
    artcraft3: '',
    pilot: '',
    pilot1: '',
    rare: '',
    rare1: '',
    rare2: '',
    rare3: '',
    rare4: '',
  });
  const resetFileRef = useRef<() => void>(null);

  const handleExportJson = useCallback(() => {
    const explorerData: IExplorerData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      statValues,
      statPenaltyValues,
      skillValues,
      skillPoints,
      expectedSkills,
      selectedDetailedSkills,
      educationBonusText,
    };
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
    const filename = statValues.name
      ? `${statValues.name}_${timestamp}.json`
      : `탐사자_${timestamp}.json`;
    downloadAsJson(explorerData, filename);
  }, [
    statValues,
    statPenaltyValues,
    skillValues,
    skillPoints,
    expectedSkills,
    selectedDetailedSkills,
    educationBonusText,
  ]);

  const handleExportSimplifiedJson = useCallback(() => {
    const hp = Math.floor((statValues.size.value2 + statValues.health.value2) / 10);
    const combatStats = (() => {
      const sum = statValues.str.value2 + statValues.size.value2;
      if (sum <= 64) return { damageBonus: '-2', build: -2 };
      if (sum <= 84) return { damageBonus: '-1', build: -1 };
      if (sum <= 124) return { damageBonus: '0', build: 0 };
      if (sum <= 164) return { damageBonus: '1D4', build: 1 };
      return { damageBonus: '1D6', build: 2 };
    })();

    const creditValue = skillValues.credit.valueAddedByBaseValue;
    const creditInfo = (() => {
      if (creditValue === 0) return { cash: '0.5', assets: '0', spendingLevel: '0.5' };
      if (creditValue <= 9)
        return {
          cash: creditValue.toString(),
          assets: (creditValue * 10).toString(),
          spendingLevel: '2',
        };
      if (creditValue <= 49)
        return {
          cash: (creditValue * 2).toString(),
          assets: (creditValue * 50).toString(),
          spendingLevel: '10',
        };
      if (creditValue <= 89)
        return {
          cash: (creditValue * 5).toString(),
          assets: (creditValue * 500).toString(),
          spendingLevel: '50',
        };
      if (creditValue <= 98)
        return {
          cash: (creditValue * 20).toString(),
          assets: (creditValue * 2000).toString(),
          spendingLevel: '250',
        };
      return { cash: '50000', assets: '5000000+', spendingLevel: '5000' };
    })();

    const skills: { [key: string]: number } = {};
    Object.keys(skillValues).forEach((key) => {
      if (key !== 'credit') {
        skills[key] = skillValues[key].valueAddedByBaseValue;
      }
    });

    const simplifiedData: ISimplifiedExplorerData = {
      info: {
        name: statValues.name,
        player: statValues.player,
        job: statValues.job,
        age: statValues.age,
        gender: statValues.gender,
        residence: statValues.residence,
        birthplace: statValues.birthplace,
      },
      stats: {
        str: statValues.str.value2,
        dex: statValues.dex.value2,
        int: statValues.int.value2,
        health: statValues.health.value2,
        appeareance: statValues.appeareance.value2,
        mentality: statValues.mentality.value2,
        size: statValues.size.value2,
        education: statValues.education.value2,
        mobility: statValues.mobility,
        luck:
          typeof statValues.luck === 'number'
            ? statValues.luck
            : (statValues.luck as { value: number; value2: number }).value2,
        hp,
        sanity: statValues.mentality.value2,
        magicPoints: Math.floor(statValues.mentality.value2 / 5),
      },
      combat: {
        damageBonus: combatStats.damageBonus,
        build: combatStats.build,
        dodge: skillValues.dodge.valueAddedByBaseValue,
      },
      credit: creditInfo,
      skills,
    };

    const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
    const filename = statValues.name
      ? `${statValues.name}_simplified_${timestamp}.json`
      : `탐사자_simplified_${timestamp}.json`;
    downloadAsJson(simplifiedData, filename);
  }, [statValues, skillValues]);

  const handleImportJson = useCallback(async (file: File | null) => {
    if (!file) return;
    try {
      isLoadingRef.current = true;
      const data = await loadFromJsonFile<IExplorerData>(file);
      if (!data.version || !data.statValues || !data.skillValues) {
        alert('유효하지 않은 탐사자 데이터 파일입니다.');
        isLoadingRef.current = false;
        return;
      }
      setStatsValue(data.statValues);
      setStatPenaltyValues(data.statPenaltyValues);
      setSkillValues(data.skillValues);
      setSkillPoints(data.skillPoints);
      setExpectedSkills(data.expectedSkills);

      if (data.selectedDetailedSkills) {
        setSelectedDetailedSkills(data.selectedDetailedSkills);
      }

      if (data.educationBonusText) {
        setEducationBonusText(data.educationBonusText);
      }

      const dex = data.statValues.dex?.value2 ?? 0;
      const education = data.statValues.education?.value2 ?? 0;
      setSkillsParams(() => {
        const updated = skillsParamsFunction(dex, education);
        updated[3] = [...updated[3]];
        updated[3][10] = { ...updated[3][10], baseValue: Math.floor(dex / 2) };
        updated[1] = [...updated[1]];
        updated[1][9] = { ...updated[1][9], baseValue: education };
        return updated;
      });

      setReloadStatBool((prev) => !prev);
      alert('탐사자 데이터를 불러왔습니다.');
      setTimeout(() => {
        isLoadingRef.current = false;
      }, 100);
    } catch (error) {
      isLoadingRef.current = false;
      alert(error instanceof Error ? error.message : '파일을 불러오는 중 오류가 발생했습니다.');
    }
  }, []);

  const defaultSkillParams = skillsParamsFunction(0, 0);

  const [skillsParams, setSkillsParams] = useState(defaultSkillParams);

  // useMemo(() => {
  //   return skillsParamsFunction(statValues.dex, statValues.education);
  // }, [statValues.dex, statValues.education]);

  const getBonus = useCallback(
    (key: string, num: string) => {
      let skillKey = key;
      if (key.startsWith('languageOther')) {
        skillKey = 'languageOther';
      }
      if (num === '50') {
        return expectedSkills[`${skillKey}50`];
      }
      return expectedSkills[`${skillKey}90`];
    },
    [expectedSkills],
  );

  const onChangeExpectedSkills = useCallback((key: string, value: boolean) => {
    setExpectedSkills((prev) => ({ ...prev, [key]: value }));
  }, []);

  const getAndSetSkills = useCallback((key: string, value: IInnerSkills | undefined) => {
    if (!value) {
      setSkillValues((prev) => {
        const keys = Object.keys(prev);
        const updatedSkillValues: ISkills = { ...prev };
        keys.forEach((skillKey) => {
          if (skillKey.startsWith(key)) {
            updatedSkillValues[skillKey] = {
              value: 0,
              valueAddedByBaseValue: prev[skillKey].valueAddedByBaseValue,
              isJobSkill: false,
            };
          }
        });
        return updatedSkillValues;
      });
      setReloadState((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      setSkillValues((prev) => ({ ...prev, [key]: value }));
    }
  }, []);

  const getAndSetStats = useCallback((key: string, value: { value: number; value2: number }) => {
    setStatsValue((prev) => ({ ...prev, [key]: value }));
    if (key === 'int') {
      setSkillPoints((prev) => ({ ...prev, baseInterest: value.value2 * 2 }));
    }
    if (key === 'dex') {
      setSkillValues((prev) => ({
        ...prev,
        dodge: {
          ...prev.dodge,
          valueAddedByBaseValue: prev.dodge.value + Math.floor(value.value2 / 2),
        },
      }));
      setSkillsParams((prev) => {
        const updated = [...prev];
        updated[3] = [...updated[3]];
        updated[3][10] = { ...updated[3][10], baseValue: Math.floor(value.value2 / 2) };
        return updated;
      });
    }
    if (key === 'education') {
      setSkillsParams((prev) => {
        const updated = [...prev];
        updated[1] = [...updated[1]];
        updated[1][9] = { ...updated[1][9], baseValue: value.value2 };
        return updated;
      });
    }
  }, []);

  const getMobility = useCallback(() => {
    setStatsValue((prev) => {
      const { str, dex, size, age } = prev;

      let mobility: number;
      if (str.value2 < size.value2 && dex.value2 < size.value2) mobility = 7;
      else if (str.value2 > size.value2 && dex.value2 > size.value2) mobility = 9;
      else mobility = 8;
      if (age >= 80) mobility -= 5;
      else if (age >= 70) mobility -= 4;
      else if (age >= 60) mobility -= 3;
      else if (age >= 50) mobility -= 2;
      else if (age >= 40) mobility -= 1;

      return { ...prev, mobility };
    });
  }, []);

  const getCombatStats = () => {
    let combatStats = { damageBonus: '', build: 0 };
    if (statValues.str.value2 + statValues.size.value2 <= 64)
      combatStats = { damageBonus: '-2', build: -2 };
    else if (statValues.str.value2 + statValues.size.value2 <= 84)
      combatStats = { damageBonus: '-1', build: -1 };
    else if (statValues.str.value2 + statValues.size.value2 <= 124)
      combatStats = { damageBonus: '0', build: 0 };
    else if (statValues.str.value2 + statValues.size.value2 <= 164) {
      combatStats = { damageBonus: '1D4', build: 1 };
    } else {
      combatStats = { damageBonus: '1D6', build: 2 };
    }
    return combatStats;
  };

  const getCredit = useCallback(() => {
    if (skillValues.credit.valueAddedByBaseValue === 0)
      return { cash: '0.5', assets: '0', spendingLevel: '0.5' };
    if (skillValues.credit.valueAddedByBaseValue <= 9)
      return {
        cash: skillValues.credit.valueAddedByBaseValue.toLocaleString(),
        assets: (skillValues.credit.valueAddedByBaseValue * 10).toLocaleString(),
        spendingLevel: '2',
      };
    if (skillValues.credit.valueAddedByBaseValue <= 49)
      return {
        cash: (skillValues.credit.valueAddedByBaseValue * 2).toLocaleString(),
        assets: (skillValues.credit.valueAddedByBaseValue * 50).toLocaleString(),
        spendingLevel: '10',
      };
    if (skillValues.credit.valueAddedByBaseValue <= 89)
      return {
        cash: (skillValues.credit.valueAddedByBaseValue * 5).toLocaleString(),
        assets: (skillValues.credit.valueAddedByBaseValue * 500).toLocaleString(),
        spendingLevel: '50',
      };
    if (skillValues.credit.valueAddedByBaseValue <= 98)
      return {
        cash: (skillValues.credit.valueAddedByBaseValue * 20).toLocaleString(),
        assets: (skillValues.credit.valueAddedByBaseValue * 2000).toLocaleString(),
        spendingLevel: '250',
      };
    return {
      cash: '50,000',
      assets: '5,000,000+',
      spendingLevel: '5,000',
    };
  }, [skillValues.credit.valueAddedByBaseValue]);

  useEffect(() => {
    const skillValueKeys = Object.keys(skillValues);
    const updatedSkillPoints = { ...skillPoints, job: 0, interest: 0 };
    skillValueKeys.forEach((skillKey) => {
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

  useEffect(() => {
    getMobility();
  }, [
    statValues.str,
    statValues.dex,
    statValues.size,
    statValues.age,
    statPenaltyValues.str,
    statPenaltyValues.dex,
    statPenaltyValues.size,
  ]);

  useEffect(() => {
    setSkillPoints({
      ...skillPoints,
      baseInterest: statValues.int.value2 * 2,
    });
  }, [statValues.int]);

  const handleDetailedKeyChange = useCallback((skillKey: string, detailedKey: string) => {
    setSelectedDetailedSkills((prev) => ({ ...prev, [skillKey]: detailedKey }));
  }, []);

  const handleJobChange = useCallback((job: string) => {
    setStatsValue((prev) => ({ ...prev, job }));
  }, []);

  const handleAgeChange = useCallback((age: number) => {
    setStatsValue((prev) => ({ ...prev, age }));
  }, []);

  const handleNameChange = useCallback((name: string) => {
    setStatsValue((prev) => ({ ...prev, name }));
  }, []);

  const handlePlayerChange = useCallback((player: string) => {
    setStatsValue((prev) => ({ ...prev, player }));
  }, []);

  const handleGenderChange = useCallback((gender: string) => {
    setStatsValue((prev) => ({ ...prev, gender }));
  }, []);

  const handleResidenceChange = useCallback((residence: string) => {
    setStatsValue((prev) => ({ ...prev, residence }));
  }, []);

  const handleBirthplaceChange = useCallback((birthplace: string) => {
    setStatsValue((prev) => ({ ...prev, birthplace }));
  }, []);

  const explorerSkills = useMemo(() => {
    return (
      <Container sx={{ padding: '0', paddingBottom: '10px', border: 'solid', marginTop: '16px' }}>
        <Text sx={{ backgroundColor: 'purple' }}>기능</Text>
        <Text sx={{ backgroundColor: 'lightgray', color: 'black' }}>
          ✔ 직업 기능에 체크표시 하세요.
          <br />✔ 직업 기능 점수는 탐사자 핸드북 또는 수호자 룰북을 참고해주세요.
        </Text>
        <Text sx={{ backgroundColor: 'yellow', color: 'black' }}>
          ⚠ 전문 분야를 모두 고르고 스탯 배분을 시작해주세요.
          <br />⚠ 중간에 전문 분야를 바꿀시 다른 관련 전문 분야 스탯도 다시 적어주세요.
        </Text>
        <Grid justify="center" align="center" sx={{ marginTop: '5px' }} columns={12}>
          <Grid.Col xs={12} sm={5}>
            <Container>
              <Stack
                sx={{
                  border: '1px solid',
                  borderRadius: '0.5em',
                  paddingTop: '11.15px',
                  paddingBottom: '11.25px',
                }}
                justify="center"
                spacing={0}
              >
                <Grid>
                  <Grid.Col span={6}>
                    <Text fz="sm">직업 기능 점수</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text fz="sm">남은 점수</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      value={skillPoints.baseJob}
                      sx={{ marginLeft: '5px', marginRight: '5px' }}
                      onChange={(event) => {
                        if (!isNumber(event.currentTarget.value)) return;
                        setSkillPoints({ ...skillPoints, baseJob: +event.currentTarget.value });
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text sx={{ marginLeft: '5px', marginRight: '5px' }}>
                      {skillPoints.baseJob - skillPoints.job}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Container>
          </Grid.Col>
          <Grid.Col span={2} sx={{ '@media (max-width: 768px)': { display: 'none' } }} />
          <Grid.Col xs={12} sm={5}>
            <Container>
              <Stack
                sx={{
                  border: '1px solid',
                  borderRadius: '0.5em',
                  paddingTop: '11.15px',
                  paddingBottom: '11.25px',
                  height: '98.08px',
                }}
                justify="center"
                spacing={0}
              >
                <Grid>
                  <Grid.Col span={6}>
                    <Text fz="sm">관심 기능 점수</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text fz="sm">남은 점수</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text sx={{ marginLeft: '5px', marginRight: '5px' }}>
                      {skillPoints.baseInterest}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text sx={{ marginLeft: '5px', marginRight: '5px' }}>
                      {skillPoints.baseInterest - skillPoints.interest}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Container>
          </Grid.Col>
        </Grid>
        <Grid justify="center" align="center" sx={{ marginTop: '5px' }} columns={10}>
          <Grid.Col span={10}>
            <Container>
              <Stack
                sx={{
                  border: '1px solid',
                  borderRadius: '0.5em',
                  paddingTop: '11.15px',
                  paddingBottom: '11.25px',
                }}
                justify="center"
                spacing={0}
              >
                <Text>보너스 기능 점수</Text>
                <Grid columns={12}>
                  <Grid.Col span={6} sm={2}>
                    <Stack spacing={0} align="center">
                      <Text fz="sm">과학</Text>
                      <Checkbox
                        label="50%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('science50', event.currentTarget.checked);
                        }}
                      />
                      <Checkbox
                        label="90%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('science90', event.currentTarget.checked);
                        }}
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6} sm={2}>
                    <Stack spacing={0} align="center">
                      <Text fz="sm">근접전</Text>
                      <Checkbox
                        label="50%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('fighting50', event.currentTarget.checked);
                        }}
                      />
                      <Checkbox
                        label="90%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('fighting90', event.currentTarget.checked);
                        }}
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6} sm={2}>
                    <Stack spacing={0} align="center">
                      <Text fz="sm">사격</Text>
                      <Checkbox
                        label="50%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('firearms50', event.currentTarget.checked);
                        }}
                      />
                      <Checkbox
                        label="90%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('firearms90', event.currentTarget.checked);
                        }}
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6} sm={2}>
                    <Stack spacing={0} align="center">
                      <Text fz="sm">생존술</Text>
                      <Checkbox
                        label="50%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('survival50', event.currentTarget.checked);
                        }}
                      />
                      <Checkbox
                        label="90%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('survival90', event.currentTarget.checked);
                        }}
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6} sm={2}>
                    <Stack spacing={0} align="center">
                      <Text fz="sm">언어(외국어)</Text>
                      <Checkbox
                        label="50%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('languageOther50', event.currentTarget.checked);
                        }}
                      />
                      <Checkbox
                        label="90%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('languageOther90', event.currentTarget.checked);
                        }}
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6} sm={2}>
                    <Stack spacing={0} align="center">
                      <Text fz="sm">예술/공예</Text>
                      <Checkbox
                        label="50%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('artcraft50', event.currentTarget.checked);
                        }}
                      />
                      <Checkbox
                        label="90%"
                        size="xs"
                        onChange={(event) => {
                          onChangeExpectedSkills('artcraft90', event.currentTarget.checked);
                        }}
                      />
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Container>
          </Grid.Col>
        </Grid>
        <Grid
          justify="center"
          align="center"
          sx={{ marginTop: '5px' }}
          gutter="xs"
          gutterSm="md"
          px="xs"
        >
          {skillsParams.map((skillParams, idx) => (
            <SkillColumn
              key={idx}
              skillParams={skillParams}
              getAndSetSkills={getAndSetSkills}
              getBonus={getBonus}
              reloadState={reloadState}
              skillValues={skillValues}
              selectedDetailedSkills={selectedDetailedSkills}
              onDetailedKeyChange={handleDetailedKeyChange}
            />
          ))}
        </Grid>
      </Container>
    );
  }, [
    skillPoints,
    skillsParams,
    getAndSetSkills,
    getBonus,
    onChangeExpectedSkills,
    expectedSkills,
    reloadState,
    skillValues,
    selectedDetailedSkills,
    handleDetailedKeyChange,
  ]);

  const penaltyByAge = useMemo(() => {
    const getEducationBonus = (num: number) => {
      const { education: educatioN } = statValues;
      let education = educatioN.value;
      education += statPenaltyValues.education;
      education = Math.max(0, education);
      console.log('[교육 판정] start - base education', education);
      let totalBonus = 0;
      let result = '';
      for (let i = 0; i < num; i += 1) {
        const roll = rollDice(1, 100, '교육 판정');
        console.log('[교육 판정] current education', education, ', roll', roll);
        if (roll > education) {
          const bonus = rollDice(1, 10, '교육 판정 (보너스)');
          totalBonus += bonus;
          education += bonus;
          result += '🏆';
          console.log(
            '[교육 판정] success - current education',
            education,
            ', current bonus',
            bonus,
            ', total bonus',
            totalBonus,
          );
        } else {
          result += '❌';
          console.log(
            '[교육 판정] fail - current education',
            education,
            ', total bonus',
            totalBonus,
          );
        }
      }
      console.log(
        '[교육 판정] end - current education',
        education,
        ', total bonus',
        totalBonus,
        'result',
        result,
      );
      setEducationBonusText(result);
      setStatPenaltyValues({ ...statPenaltyValues, education: -totalBonus });
    };
    let text = '';
    let panelyAppearance = 0;
    let educationBonusNum = 0;
    if (statValues.age <= 19) {
      [text] = penaltyText;
    } else if (statValues.age <= 39) {
      [, text] = penaltyText;
      educationBonusNum = 1;
    } else if (statValues.age <= 49) {
      [, , text] = penaltyText;
      panelyAppearance = 5;
      educationBonusNum = 2;
    } else if (statValues.age <= 59) {
      [, , , text] = penaltyText;
      panelyAppearance = 10;
      educationBonusNum = 3;
    } else if (statValues.age <= 69) {
      [, , , , text] = penaltyText;
      panelyAppearance = 20;
      educationBonusNum = 4;
    } else if (statValues.age <= 79) {
      [, , , , , text] = penaltyText;
      panelyAppearance = 20;
      educationBonusNum = 4;
    } else {
      [, , , , , , text] = penaltyText;
      panelyAppearance = 25;
      educationBonusNum = 4;
    }
    return (
      <Container sx={{ padding: '0', paddingBottom: '10px', border: 'solid', marginTop: '16px' }}>
        <Text sx={{ backgroundColor: 'red', color: 'white' }}>나이에 따른 조정 사항</Text>
        <Text sx={{ backgroundColor: 'lightgray', color: 'black' }}>{text}</Text>
        <Grid justify="center" align="center" sx={{ marginTop: '5px' }}>
          <Grid.Col span={12}>
            <Text fz="sm">
              뺴야하는 스탯 -{' '}
              {statPenaltyValues.total -
                statPenaltyValues.str -
                statPenaltyValues.dex -
                statPenaltyValues.health -
                statPenaltyValues.size}
            </Text>
          </Grid.Col>
          {!(statValues.age >= 20 && statValues.age <= 39) && (
            <Grid.Col xs={6} sm={3}>
              <Container>
                <Stack
                  sx={{
                    border: '1px solid',
                    borderRadius: '0.5em',
                    paddingTop: '11.15px',
                    paddingBottom: '11.25px',
                  }}
                  justify="center"
                  spacing={0}
                >
                  <Text fz="sm">근력</Text>
                  <TextInput
                    sx={{ marginLeft: '5px', marginRight: '5px' }}
                    value={statPenaltyValues.str}
                    onChange={(event) => {
                      if (!isNumber(event.currentTarget.value)) return;
                      setStatPenaltyValues({
                        ...statPenaltyValues,
                        str: +event.currentTarget.value,
                        appeareance: panelyAppearance,
                      });
                      setReloadStatBool(!reloadStatBool);
                    }}
                  />
                </Stack>
              </Container>
            </Grid.Col>
          )}
          {!(statValues.age > 19) && (
            <Grid.Col xs={6} sm={3}>
              <Container>
                <Stack
                  sx={{
                    border: '1px solid',
                    borderRadius: '0.5em',
                    paddingTop: '11.15px',
                    paddingBottom: '11.25px',
                  }}
                  justify="center"
                  spacing={0}
                >
                  <Text fz="sm">크기</Text>
                  <TextInput
                    sx={{ marginLeft: '5px', marginRight: '5px' }}
                    value={statPenaltyValues.size}
                    disabled={statValues.age > 19}
                    onChange={(event) => {
                      if (!isNumber(event.currentTarget.value)) return;
                      setStatPenaltyValues({
                        ...statPenaltyValues,
                        size: +event.currentTarget.value,
                        appeareance: panelyAppearance,
                      });
                      setReloadStatBool(!reloadStatBool);
                    }}
                  />
                </Stack>
              </Container>
            </Grid.Col>
          )}
          {!(statValues.age < 40) && (
            <Grid.Col xs={6} sm={3}>
              <Container>
                <Stack
                  sx={{
                    border: '1px solid',
                    borderRadius: '0.5em',
                    paddingTop: '11.15px',
                    paddingBottom: '11.25px',
                  }}
                  justify="center"
                  spacing={0}
                >
                  <Text fz="sm">건강</Text>
                  <TextInput
                    sx={{ marginLeft: '5px', marginRight: '5px' }}
                    value={statPenaltyValues.health}
                    disabled={statValues.age < 40}
                    onChange={(event) => {
                      if (!isNumber(event.currentTarget.value)) return;
                      setStatPenaltyValues({
                        ...statPenaltyValues,
                        health: +event.currentTarget.value,
                        appeareance: panelyAppearance,
                      });
                      setReloadStatBool(!reloadStatBool);
                    }}
                  />
                </Stack>
              </Container>
            </Grid.Col>
          )}
          {!(statValues.age < 40) && (
            <Grid.Col xs={6} sm={3}>
              <Container>
                <Stack
                  sx={{
                    border: '1px solid',
                    borderRadius: '0.5em',
                    paddingTop: '11.15px',
                    paddingBottom: '11.25px',
                  }}
                  justify="center"
                  spacing={0}
                >
                  <Text fz="sm">민첩성</Text>
                  <TextInput
                    sx={{ marginLeft: '5px', marginRight: '5px' }}
                    value={statPenaltyValues.dex}
                    disabled={statValues.age < 40}
                    onChange={(event) => {
                      if (!isNumber(event.currentTarget.value)) return;
                      setStatPenaltyValues({
                        ...statPenaltyValues,
                        dex: +event.currentTarget.value,
                        appeareance: panelyAppearance,
                      });
                      setReloadStatBool(!reloadStatBool);
                    }}
                  />
                </Stack>
              </Container>
            </Grid.Col>
          )}
          {educationBonusNum !== 0 && (
            <Grid.Col xs={6} sm={3}>
              <Container>
                <Stack
                  sx={{
                    border: '1px solid',
                    borderRadius: '0.5em',
                    paddingTop: '11.15px',
                    paddingBottom: '11.25px',
                    height: '82.08px',
                    width: '171.5px',
                  }}
                  justify="center"
                  spacing={0}
                >
                  <Text fz="sm">교육 판정</Text>
                  <Text fz="sm">
                    {educationBonusText === '' ? (
                      <UnstyledButton
                        onClick={() => {
                          getEducationBonus(educationBonusNum);
                        }}
                      >
                        <img src={dice20} alt="roll" width="15px" />
                      </UnstyledButton>
                    ) : (
                      <Text>{educationBonusText}</Text>
                    )}
                  </Text>
                </Stack>
              </Container>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    );
  }, [statValues.age, statPenaltyValues, statValues.education, educationBonusText]);

  useEffect(() => {
    if (isLoadingRef.current) return;
    let panelyAppearance = 0;
    let total = 0;
    if (statValues.age <= 19) {
      panelyAppearance = 0;
      total = 5;
    } else if (statValues.age <= 39) {
      panelyAppearance = 0;
    } else if (statValues.age <= 49) {
      panelyAppearance = 5;
      total = 5;
    } else if (statValues.age <= 59) {
      panelyAppearance = 10;
      total = 10;
    } else if (statValues.age <= 69) {
      panelyAppearance = 15;
      total = 20;
    } else if (statValues.age <= 79) {
      panelyAppearance = 20;
      total = 40;
    } else {
      panelyAppearance = 25;
      total = 80;
    }
    setStatPenaltyValues({
      str: 0,
      dex: 0,
      size: 0,
      health: 0,
      education: 0,
      appeareance: panelyAppearance,
      total,
    });
    setEducationBonusText('');
  }, [statValues.age]);

  useEffect(() => {
    console.log('[education reset useEffect] isLoadingRef:', isLoadingRef.current);
    if (isLoadingRef.current) return;
    setStatPenaltyValues({
      ...statPenaltyValues,
      education: 0,
    });
    setEducationBonusText('');
  }, [statValues.education.value]);

  return (
    <Card>
      <Group position="right" mb="md" spacing="xs">
        <Button variant="outline" color="blue" size="xs" onClick={handleExportJson}>
          JSON 내보내기
        </Button>
        <Button variant="outline" color="cyan" size="xs" onClick={handleExportSimplifiedJson}>
          간략화 내보내기
        </Button>
        <FileButton resetRef={resetFileRef} onChange={handleImportJson} accept="application/json">
          {(props) => (
            <Button variant="outline" color="green" size="xs" {...props}>
              JSON 불러오기
            </Button>
          )}
        </FileButton>
      </Group>
      <Logo image={logo} />
      <Grid justify="center" align="center">
        <Grid.Col xs={12} md={3}>
          <ExplorerInfo
            statValues={statValues}
            onJobChange={handleJobChange}
            onAgeChange={handleAgeChange}
            onNameChange={handleNameChange}
            onPlayerChange={handlePlayerChange}
            onGenderChange={handleGenderChange}
            onResidenceChange={handleResidenceChange}
            onBirthplaceChange={handleBirthplaceChange}
          />
        </Grid.Col>
        <Grid.Col xs={12} md={9}>
          <ExplorerTraits
            statPenaltyValues={statPenaltyValues}
            mobility={statValues.mobility}
            getAndSetStats={getAndSetStats}
            reloadStatBool={reloadStatBool}
            statValues={statValues}
          />
        </Grid.Col>
      </Grid>
      {penaltyByAge}
      <ExplorerTraits2
        sizeValue2={statValues.size.value2}
        healthValue2={statValues.health.value2}
        mentalityValue2={statValues.mentality.value2}
        getAndSetStats={getAndSetStats}
      />
      {explorerSkills}
      <Grid justify="center" align="center">
        <Grid.Col xs={12} sm={6}>
          <ExplorerCombat
            combatStats={getCombatStats()}
            dodgeValue={skillValues.dodge.valueAddedByBaseValue}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <ExplorerCredit creditInfo={getCredit()} />
        </Grid.Col>
      </Grid>

      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Popover position="top-end" shadow="xl" withArrow arrowSize={12}>
          <Popover.Target>
            <ActionIcon
              size={48}
              radius="xl"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              sx={{
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <Text fz={10} fw={700} sx={{ textAlign: 'center', lineHeight: 1.2 }}>
                기능
                <br />
                점수
              </Text>
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown
            sx={{
              background: 'linear-gradient(135deg, #1a1b1e 0%, #25262b 100%)',
              border: '1px solid #373A40',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <Stack spacing="sm">
              <Text
                fz="md"
                fw={600}
                sx={{ borderBottom: '1px solid #373A40', paddingBottom: '8px' }}
              >
                남은 기능 점수
              </Text>
              <Grid>
                <Grid.Col span={6}>
                  <Text fz="sm" color="dimmed">
                    직업
                  </Text>
                  <Text fz="lg" fw={700} color="cyan">
                    {skillPoints.baseJob - skillPoints.job}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text fz="sm" color="dimmed">
                    관심
                  </Text>
                  <Text fz="lg" fw={700} color="grape">
                    {skillPoints.baseInterest - skillPoints.interest}
                  </Text>
                </Grid.Col>
              </Grid>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Box>
    </Card>
  );
}
