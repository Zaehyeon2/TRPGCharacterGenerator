import { Button, Card, Container, Flex, Grid, Group, Stack, Text, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import logo from '../assets/coc-logo.png';
import { Logo } from '../components/logo';
import { Skills } from '../components/skills';
import { Stats } from '../components/stats';
import { defalutSkills } from '../consts/defaultValues';
import { skillsParamsFunction } from '../consts/skills';
import { IInnerSkills, ISkills, IStats } from '../interfaces/interfaces';
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

  const [isDetailedSkillsExperted, setIsDetailedSkillsExperted] = useState({
    science: false,
    fighting: false,
    firearms: false,
    languageOther: false,
    artcraft: false,
    pilot: false,
    survival: false,
  });

  const [skillPoints, setSkillPoints] = useState({
    baseJob: 0,
    job: 0,
    baseInterest: 0,
    interest: 0,
  });

  const getAndSetStats = (key: string, value: number) => {
    setStatsValue({ ...statValues, [key]: value });
    if (key === 'int') {
      setSkillPoints({ ...skillPoints, baseInterest: value * 2 });
    }
  };

  const getAndSetSkills = (key: string, value: IInnerSkills | undefined) => {
    if (!value) {
      console.log(key);

      const keys = Object.keys(skillValues);
      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] === key) {
          setSkillValues({
            ...skillValues,
            [key]: {
              value: 0,
              valueAddedByBaseValue: skillValues[key].valueAddedByBaseValue,
              isChecked: skillValues[key].isChecked,
            },
          });
        }
      }
      return;
    }
    setSkillValues({ ...skillValues, [key]: value });

    const skillValueKeys = Object.keys(skillValues);
    let job = 0;
    let interest = 0;
    skillValueKeys.forEach((skillKey) => {
      let skillValue: IInnerSkills;
      if (skillKey === key) {
        skillValue = value;
        console.log(skillKey, skillValue);
      } else {
        skillValue = skillValues[skillKey];
      }

      if (skillValue.isChecked) {
        job += skillValue.value;
      } else {
        interest += skillValue.value;
      }
    });
    if (job > skillPoints.baseJob) {
      interest += job - skillPoints.baseJob;
      job = skillPoints.baseJob;
    }

    setSkillPoints({ ...skillPoints, job, interest });
  };

  function getMobility() {
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
  }

  useEffect(() => {
    getMobility();
  }, [statValues.str, statValues.dex, statValues.size, statValues.age]);

  useEffect(() => {
    setSkillPoints({
      ...skillPoints,
      baseInterest: statValues.int * 2,
    });
  }, [statValues.int]);

  const skillsParams = skillsParamsFunction(statValues.dex, statValues.education);

  const explorerInfos = (
    <Stack spacing="xs" sx={{ border: 'solid', paddingBottom: '10px', height: '330px' }}>
      <Text sx={{ backgroundColor: 'black', width: '100%' }}>현대 탐사자</Text>
      <Group sx={{ margin: 'auto' }}>
        <Text className={classes.label}>이름</Text>
        <TextInput size="xs" />
      </Group>
      <Group sx={{ margin: 'auto' }}>
        <Text className={classes.label}>플레이어</Text>
        <TextInput size="xs" />
      </Group>
      <Group sx={{ margin: 'auto' }}>
        <Text className={classes.label}>직업</Text>
        <TextInput
          value={statValues.job}
          size="xs"
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
          onChange={(event) => {
            if (!isNumber(event.currentTarget.value)) return;
            setStatsValue({ ...statValues, age: +event.currentTarget.value });
          }}
        />
      </Group>
      <Group sx={{ margin: 'auto' }}>
        <Text className={classes.label}>성별</Text>
        <TextInput size="xs" />
      </Group>
      <Group sx={{ margin: 'auto' }}>
        <Text className={classes.label}>거주지</Text>
        <TextInput size="xs" />
      </Group>
      <Group sx={{ margin: 'auto' }}>
        <Text className={classes.label}>출생지</Text>
        <TextInput size="xs" />
      </Group>
    </Stack>
  );

  const explorerTraits = (
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

  const explorerTraits2 = (
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

  const explorerSkills = (
    <Container sx={{ padding: '0', paddingBottom: '10px', border: 'solid', marginTop: '16px' }}>
      <Text sx={{ backgroundColor: 'brown', color: 'black' }}>기능</Text>
      <Text sx={{ backgroundColor: 'lightgray', color: 'black' }}>
        ⚠ 직업 기능에 체크표시 하세요
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
      <Grid justify="center" align="center" sx={{ marginTop: '5px' }}>
        {skillsParams.map((skillParams) => (
          <Grid.Col span={3}>
            <Flex direction="column" gap="md" justify="center" align="center">
              {skillParams.map((skill) => (
                <Skills
                  key={skill.label}
                  skillKey={skill.skillKey}
                  label={skill.label}
                  baseValue={skill.baseValue}
                  getAndSetFunction={getAndSetSkills}
                  checkboxDisabled={skill.checkboxDisabled}
                />
              ))}
            </Flex>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );

  return (
    <Card withBorder radius="md">
      <Button onClick={() => console.log(skillValues)} />
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
    </Card>
  );
}
