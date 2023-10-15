import {
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import logo from '../assets/coc-logo.png';
import { Logo } from '../components/logo';
import { Skills } from '../components/skills';
import { Stats } from '../components/stats';
import { defalutSkills } from '../consts/defaultValues';
import { skillsParamsFunction } from '../consts/skills';
import {
  IInnerSkills,
  ISkills,
  IStats,
  IExpcetedSkills,
  ReloadStateParams,
} from '../interfaces/interfaces';
import { rollDice } from '../services/dice.service';
import { isNumber } from '../services/utils.service';
import { explorerStyles } from '../styles/styles';

export function CthulhuGenerator() {
  const { classes } = explorerStyles();
  const [statValues, setStatsValue] = useState({
    age: 0,
    str: 0,
    dex: 0,
    int: 0,
    health: 0,
    appeareance: 0,
    mentality: 0,
    size: 0,
    education: 0,
    mobility: 0,
    luck: 0,
  } as IStats);

  const [skillValues, setSkillValues] = useState(
    defalutSkills(statValues.dex, statValues.education) as ISkills,
  );

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
  } as IExpcetedSkills);

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
    [expectedSkills, statValues],
  );

  const onChangeExpectedSkills = useCallback(
    (key: string, value: boolean) => {
      setExpectedSkills({ ...expectedSkills, [key]: value });
    },
    [expectedSkills],
  );

  const getAndSetStats = useCallback(
    (key: string, value: number) => {
      setStatsValue({ ...statValues, [key]: value });
      if (key === 'int') {
        setSkillPoints({ ...skillPoints, baseInterest: value * 2 });
      }
    },
    [skillPoints],
  );

  const getAndSetSkills = useCallback(
    (key: string, value: IInnerSkills | undefined) => {
      if (!value) {
        const keys = Object.keys(skillValues);
        const updatedSkillValues: ISkills = { ...skillValues };
        const updatedKeys: string[] = [];
        keys.map((skillKey) => {
          if (skillKey.startsWith(key)) {
            updatedSkillValues[skillKey] = {
              value: 0,
              valueAddedByBaseValue: skillValues[skillKey].valueAddedByBaseValue,
              isChecked: false,
            };
            updatedKeys.push(skillKey);
          }
          return 0;
        });
        setSkillValues(updatedSkillValues);
        setReloadState({ ...reloadState, [key]: !reloadState[key] });
        // setInnerSkillPoints(updatedKeys, { value: 0, valueAddedByBaseValue: 0, isChecked: false });
      } else {
        setSkillValues({ ...skillValues, [key]: value });
        // setInnerSkillPoints([key], value);
      }
    },
    [skillValues],
  );

  const getMobility = useCallback(() => {
    const { str, dex, size, age } = statValues;

    let mobility: number;
    if (str < size && dex < size) mobility = 7;
    else if (str > size && dex > size) mobility = 9;
    else mobility = 8;
    if (age >= 80) mobility -= 5;
    else if (age >= 70) mobility -= 4;
    else if (age >= 60) mobility -= 3;
    else if (age >= 50) mobility -= 2;
    else if (age >= 40) mobility -= 1;

    setStatsValue({ ...statValues, mobility });
  }, [statValues.str, statValues.dex, statValues.size, statValues.age]);

  const getCombatStats = useCallback(() => {
    if (statValues.str + statValues.size <= 64) return { damageBonus: -2, build: -2 };
    if (statValues.str + statValues.size <= 84) return { damageBonus: -1, build: -1 };
    if (statValues.str + statValues.size <= 124) return { damageBonus: 0, build: 0 };
    if (statValues.str + statValues.size <= 164) return { damageBonus: rollDice(1, 4), build: 1 };
    return { damageBonus: rollDice(1, 6), build: 2 };
  }, [statValues.str, statValues.size]);

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
      if (skillValue.isChecked) {
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
  }, [statValues.str, statValues.dex, statValues.size, statValues.age]);

  useEffect(() => {
    setSkillPoints({
      ...skillPoints,
      baseInterest: statValues.int * 2,
    });
  }, [statValues.int]);

  const skillsParams = useMemo(() => {
    return skillsParamsFunction(statValues.dex, statValues.education);
  }, [statValues.dex, statValues.education]);

  const explorerInfos = useMemo(() => {
    return (
      <Stack spacing="xs" sx={{ border: 'solid', paddingBottom: '10px', height: '330px' }}>
        <Text sx={{ backgroundColor: 'black', width: '100%' }}>현대 탐사자</Text>
        <Group sx={{ margin: 'auto' }}>
          <Text className={classes.label}>이름</Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
        <Group sx={{ margin: 'auto' }}>
          <Text className={classes.label}>플레이어</Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
        <Group sx={{ margin: 'auto' }}>
          <Text className={classes.label}>직업</Text>
          <TextInput
            value={statValues.job}
            size="xs"
            sx={{ width: '60%' }}
            onChange={(event) => {
              setStatsValue({ ...statValues, job: event.currentTarget.value });
            }}
          />
        </Group>
        <Group sx={{ margin: 'auto' }}>
          <Text className={classes.label}>나이</Text>
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
        <Group sx={{ margin: 'auto' }}>
          <Text className={classes.label}>성별</Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
        <Group sx={{ margin: 'auto' }}>
          <Text className={classes.label}>거주지</Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
        <Group sx={{ margin: 'auto' }}>
          <Text className={classes.label}>출생지</Text>
          <TextInput size="xs" sx={{ width: '60%' }} />
        </Group>
      </Stack>
    );
  }, [statValues.job, statValues.age]);

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
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Stats
              statKey="dex"
              label="민첩성"
              nDices={3}
              nSides={6}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
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
              baseValue={0}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Stats
              statKey="appeareance"
              label="외모"
              nDices={3}
              nSides={6}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
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
              baseValue={6}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Stats
              statKey="education"
              label="교육"
              nDices={2}
              nSides={6}
              baseValue={6}
              multiplyValue={5}
              getAndSetFunction={getAndSetStats}
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
  }, [statValues, getAndSetStats, getMobility]);

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
                <Text>{Math.floor((statValues.size + statValues.health) / 10)}</Text>
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
                <Text>{statValues.mentality}</Text>
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
                <Text>{Math.floor(statValues.mentality / 5)}</Text>
              </Stack>
            </Container>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }, [statValues.size, statValues.health, statValues.mentality]);

  const explorerCombat = useMemo(() => {
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
                <Text>{getCombatStats().damageBonus}</Text>
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
                <Text>{getCombatStats().build}</Text>
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
                    <Text fz="xl">{skillValues.dodge.valueAddedByBaseValue}</Text>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <Stack spacing={0} align="center">
                      <Text fz="xs">{Math.floor(skillValues.dodge.valueAddedByBaseValue / 2)}</Text>
                      <Text fz="xs">{Math.floor(skillValues.dodge.valueAddedByBaseValue / 5)}</Text>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Container>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }, [skillValues.dodge.valueAddedByBaseValue, getCombatStats]);

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
          {skillsParams.map((skillParams) => (
            <Grid.Col span={3}>
              <Flex direction="column" gap="md" justify="center" align="center">
                {useMemo(() => {
                  return skillParams.map((skill) => (
                    <Skills
                      value={skill.value}
                      key={skill.label}
                      skillKey={skill.skillKey}
                      label={skill.label}
                      baseValue={skill.baseValue}
                      getAndSetFunction={getAndSetSkills}
                      state={skillValues}
                      setStateFunction={setSkillValues}
                      checkboxDisabled={skill.checkboxDisabled}
                      bonus50={getBonus(skill.skillKey, '50')}
                      bonus90={getBonus(skill.skillKey, '90')}
                      reloadState={reloadState}
                    />
                  ));
                }, [skillParams, expectedSkills, skillValues])}
              </Flex>
            </Grid.Col>
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
    skillValues.value,
  ]);

  return (
    <Card>
      {import.meta.env.BASE_URL === '/' && (
        <Button onClick={() => console.log(skillValues, skillPoints)} />
      )}
      {/* Logo */}
      <Logo image={logo} />
      <Grid justify="center" align="center">
        <Grid.Col span={4}>
          {/* 탐사자 정보 */}
          {explorerInfos}
        </Grid.Col>
        <Grid.Col span={8}>
          {/* 특성치 */}
          {explorerTraits}
        </Grid.Col>
      </Grid>
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
