import {
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import logo from '../assets/coc-logo.png';
import dice20 from '../assets/dice20.png';
import { Logo } from '../components/logo';
import { SkillColumn } from '../components/SkillColumn';
import { Stats } from '../components/stats';
import { defaultSkills } from '../consts/defaultValues';
import { penaltyText } from '../consts/penaltyByAge';
import { skillsParamsFunction } from '../consts/skills';
import {
  IInnerSkills,
  ISkills,
  IStats,
  IExpectedSkills,
  ReloadStateParams,
} from '../interfaces/interfaces';
import { rollDice } from '../services/dice.service';
import { formHp, formStat, isNumber } from '../services/utils.service';
import { explorerStyles } from '../styles/styles';

export function CthulhuGenerator() {
  const { classes } = explorerStyles();
  const [statValues, setStatsValue] = useState({
    job: '',
    age: 0,
    str: { value: 0, value2: 0 },
    dex: { value: 0, value2: 0 },
    int: { value: 0, value2: 0 },
    health: { value: 0, value2: 0 },
    appeareance: { value: 0, value2: 0 },
    mentality: { value: 0, value2: 0 },
    size: { value: 0, value2: 0 },
    education: { value: 0, value2: 0 },
    mobility: 0,
    luck: 0,
  } as IStats);

  const [statPenaltyValues, setStatPenaltyValues] = useState({
    str: 0,
    dex: 0,
    health: 0,
    size: 0,
    education: 0,
    appeareance: 0,
    total: 0,
  });

  const [skillValues, setSkillValues] = useState(
    defaultSkills(statValues.dex.value2, statValues.education.value2) as ISkills,
  );

  const [educationBonusText, setEducationBonusText] = useState('');

  const [expectedSkills, setExpectedSkills] = useState({
    science50: false,
    science90: false,
    fighting50: false,
    fighting90: false,
    firearms50: false,
    firearms90: false,
    language50: false,
    language90: false,
    artcraft50: false,
    artcraft90: false,
    pilot50: false,
    pilot90: false,
    survival50: false,
    survival90: false,
  } as IExpectedSkills);

  const [skillPoints, setSkillPoints] = useState({
    baseJob: 0,
    job: 0,
    baseInterest: 0,
    interest: 0,
  });

  const [reloadState, setReloadState] = useState({
    science: false,
    fighting: false,
    firearms: false,
    language: false,
    artcraft: false,
    pilot: false,
    survival: false,
  } as ReloadStateParams);

  const [reloadStatBool, setReloadStatBool] = useState(false);

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
              isChecked: false,
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
      if (skillValue.isChecked || skillKey === 'credit') {
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

  const explorerInfos = () => {
    return (
      <Stack spacing="xs" sx={{ border: 'solid', paddingBottom: '10px', height: '330px' }}>
        <Text sx={{ backgroundColor: 'black', width: '100%' }}>현대 탐사자</Text>
        <Group sx={{ margin: 'auto' }} spacing="xs">
          <Text className={classes.label} fz="xs">
            이름
          </Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
        <Group sx={{ margin: 'auto' }} spacing="xs">
          <Text className={classes.label} fz="xs">
            플레이어
          </Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
        <Group sx={{ margin: 'auto' }} spacing="xs">
          <Text className={classes.label} fz="xs">
            직업
          </Text>
          <TextInput
            value={statValues.job}
            size="xs"
            sx={{ width: '60%' }}
            onChange={(event) => {
              setStatsValue({ ...statValues, job: event.currentTarget.value });
            }}
          />
        </Group>
        <Group sx={{ margin: 'auto' }} spacing="xs">
          <Text className={classes.label} fz="xs">
            나이
          </Text>
          <TextInput
            value={statValues.age}
            size="xs"
            sx={{ width: '60%' }}
            onChange={(event) => {
              if (!isNumber(event.currentTarget.value)) return;
              setStatsValue({ ...statValues, age: +event.currentTarget.value });
            }}
          />
        </Group>
        <Group sx={{ margin: 'auto' }} spacing="xs">
          <Text className={classes.label} fz="xs">
            성별
          </Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
        <Group sx={{ margin: 'auto' }} spacing="xs">
          <Text className={classes.label} fz="xs">
            거주지
          </Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
        <Group sx={{ margin: 'auto' }} spacing="xs">
          <Text className={classes.label} fz="xs">
            출생지
          </Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
      </Stack>
    );
  };

  const explorerTraits = useMemo(() => {
    return (
      <Stack
        justify="space-between"
        spacing="xs"
        sx={{ paddingBottom: '10px', border: 'solid', height: '330px' }}
      >
        <Text sx={{ backgroundColor: 'brown' }}>특성치</Text>
        <Grid justify="center" align="center">
          <Grid.Col span={4}>
            <Stats
              statKey="str"
              label="근력"
              nDices={3}
              nSides={6}
              penaltyByAge={statPenaltyValues.str}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
              reloadStat={reloadStatBool}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Stats
              statKey="dex"
              label="민첩성"
              nDices={3}
              nSides={6}
              penaltyByAge={statPenaltyValues.dex}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
              reloadStat={reloadStatBool}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Stats
              statKey="int"
              label="지능"
              nDices={2}
              nSides={6}
              baseValue={6}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
              reloadStat={reloadStatBool}
            />
          </Grid.Col>
        </Grid>
        <Grid justify="center" align="center">
          <Grid.Col span={4}>
            <Stats
              statKey="health"
              label="건강"
              nDices={3}
              nSides={6}
              penaltyByAge={statPenaltyValues.health}
              baseValue={0}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
              reloadStat={reloadStatBool}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Stats
              statKey="appeareance"
              label="외모"
              nDices={3}
              nSides={6}
              penaltyByAge={statPenaltyValues.appeareance}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
              reloadStat={reloadStatBool}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Stats
              statKey="mentality"
              label="정신력"
              nDices={3}
              nSides={6}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
              reloadStat={reloadStatBool}
            />
          </Grid.Col>
        </Grid>
        <Grid justify="center" align="center">
          <Grid.Col span={4}>
            <Stats
              statKey="size"
              label="크기"
              nDices={2}
              nSides={6}
              penaltyByAge={statPenaltyValues.size}
              baseValue={6}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
              reloadStat={reloadStatBool}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Stats
              statKey="education"
              label="교육"
              nDices={2}
              nSides={6}
              penaltyByAge={statPenaltyValues.education}
              baseValue={6}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
              reloadStat={reloadStatBool}
            />
          </Grid.Col>
          <Grid.Col span={4}>
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
                <Text fz="sm">이동력</Text>
                <Text>{statValues.mobility}</Text>
              </Stack>
            </Container>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }, [statValues, statPenaltyValues, getAndSetStats, reloadStatBool]);

  const explorerTraits2 = useMemo(() => {
    return (
      <Stack
        justify="space-between"
        spacing="xs"
        sx={{ paddingBottom: '10px', border: 'solid', marginTop: '16px' }}
      >
        <Text sx={{ backgroundColor: 'brown' }}>특성치2</Text>
        <Grid justify="center" align="center">
          <Grid.Col span={3}>
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
                <Text fz="sm">체력</Text>
                <Text>{formHp(statValues.size.value2, statValues.health.value2)}</Text>
              </Stack>
            </Container>
          </Grid.Col>
          <Grid.Col span={3}>
            <Stats
              statKey="luck"
              label="운"
              nDices={3}
              nSides={6}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
              reloadStat={false}
            />
          </Grid.Col>
          <Grid.Col span={3}>
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
                <Text fz="sm">이성</Text>
                <Text>{formStat(statValues.mentality.value2, 1)}</Text>
              </Stack>
            </Container>
          </Grid.Col>
          <Grid.Col span={3}>
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
                <Text fz="sm">마력</Text>
                <Text>{formStat(Math.floor(statValues.mentality.value2 / 5), 5)}</Text>
              </Stack>
            </Container>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }, [statValues, statPenaltyValues]);

  const explorerCombat = useMemo(() => {
    const combatStats = getCombatStats();
    return (
      <Stack
        justify="space-between"
        spacing="xs"
        sx={{ paddingBottom: '10px', border: 'solid', marginTop: '16px' }}
      >
        <Text sx={{ backgroundColor: 'teal' }}>전투</Text>
        <Grid justify="center" align="center" columns={1}>
          <Grid.Col span={1}>
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
                <Text fz="sm">피해 보너스</Text>
                <Text>{combatStats.damageBonus}</Text>
              </Stack>
            </Container>
          </Grid.Col>
          <Grid.Col span={1}>
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
                <Text fz="sm">체구</Text>
                <Text>{combatStats.build}</Text>
              </Stack>
            </Container>
          </Grid.Col>
          <Grid.Col span={1}>
            <Container>
              <Stack
                sx={{
                  border: '1px solid',
                  borderRadius: '0.5em',
                  paddingTop: '11.15px',
                  paddingBottom: '11.25px',
                  height: '70.88px',
                }}
                justify="center"
                spacing={0}
              >
                <Text fz="sm">회피</Text>
                <Grid justify="center" align="center">
                  <Grid.Col span={1}>
                    <Text fz="xl">{formStat(skillValues.dodge.valueAddedByBaseValue, 1)}</Text>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <Stack spacing={0} align="center">
                      <Text fz="xs">
                        {formStat(Math.floor(skillValues.dodge.valueAddedByBaseValue / 2), 2)}
                      </Text>
                      <Text fz="xs">
                        {formStat(Math.floor(skillValues.dodge.valueAddedByBaseValue / 5), 5)}
                      </Text>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Container>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }, [
    skillValues.dodge.valueAddedByBaseValue,
    statValues.dex,
    statValues.size,
    statValues.str,
    statPenaltyValues.dex,
    statPenaltyValues.size,
    statPenaltyValues.str,
  ]);

  const explorerCredit = useMemo(() => {
    return (
      <Stack
        justify="space-between"
        spacing="xs"
        sx={{ paddingBottom: '10px', border: 'solid', marginTop: '16px' }}
      >
        <Text sx={{ backgroundColor: 'gold', color: 'black' }}>현금과 자산</Text>
        <Grid justify="center" align="center" columns={1}>
          <Grid.Col span={1}>
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
                <Text fz="sm">소비 수준</Text>
                <Text>💲{getCredit().spendingLevel}</Text>
              </Stack>
            </Container>
          </Grid.Col>
          <Grid.Col span={1}>
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
                <Text fz="sm">현금</Text>
                <Text>💲{getCredit().cash}</Text>
              </Stack>
            </Container>
          </Grid.Col>
          <Grid.Col span={1}>
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
                <Text fz="sm">자산</Text>
                <Text>💲{getCredit().assets}</Text>
              </Stack>
            </Container>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }, [getCredit]);

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
          <Grid.Col span={4}>
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
          <Grid.Col span={2} />
          <Grid.Col span={4}>
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
                <Grid>
                  <Grid.Col span={2}>
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
                  <Grid.Col span={2}>
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
                  <Grid.Col span={2}>
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
                  <Grid.Col span={2}>
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
                  <Grid.Col span={2}>
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
                  <Grid.Col span={2}>
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
        <Grid justify="center" align="center" sx={{ marginTop: '5px' }}>
          {skillsParams.map((skillParams, idx) => (
            <SkillColumn
              key={idx}
              skillParams={skillParams}
              getAndSetSkills={getAndSetSkills}
              getBonus={getBonus}
              reloadState={reloadState}
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
            <Grid.Col span={3}>
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
            <Grid.Col span={3}>
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
            <Grid.Col span={3}>
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
            <Grid.Col span={3}>
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
            <Grid.Col span={3}>
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
  }, [statValues.age, statPenaltyValues, statValues.education]);

  useEffect(() => {
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
    setStatPenaltyValues({
      ...statPenaltyValues,
      education: 0,
    });
    setEducationBonusText('');
  }, [statValues.education.value]);

  return (
    <Card>
      {import.meta.env.BASE_URL === '/' && (
        <Button
          onClick={() =>
            console.log({
              skillValues,
              skillPoints,
              statValues,
              skillsParams,
              statPenaltyValues,
            })
          }
        />
      )}
      {/* Logo */}
      <Logo image={logo} />
      <Grid justify="center" align="center">
        <Grid.Col span={3}>
          {/* 탐사자 정보 */}
          {explorerInfos()}
        </Grid.Col>
        <Grid.Col span={9}>
          {/* 특성치 */}
          {explorerTraits}
        </Grid.Col>
      </Grid>
      {/* 나이에 따른 패널티 */}
      {penaltyByAge}
      {/* 특성치2 */}
      {explorerTraits2}
      {/* 기술 */}
      {explorerSkills}
      <Grid justify="center" align="center">
        <Grid.Col span={6}>
          {/* 탐사자 정보 */}
          {explorerCombat}
        </Grid.Col>
        <Grid.Col span={6}>
          {/* 특성치 */}
          {explorerCredit}
        </Grid.Col>
      </Grid>
    </Card>
  );
}
