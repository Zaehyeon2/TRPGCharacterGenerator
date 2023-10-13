import { Button, Card, Container, Flex, Grid, Group, Stack, Text, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import logo from '../assets/coc-logo.png';
import { Logo } from '../components/logo';
import { Skills } from '../components/skills';
import { Stats } from '../components/stats';
import { IInnerSkills, ISkills, IStats, SkillParams } from '../interfaces/interfaces';
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

  const [skillValues, setSkillValues] = useState({
    appraise: {
      value: 0,
      valueAddedByBaseValue: 5,
      isChecked: false,
    },
    archaeology: {
      value: 0,
      valueAddedByBaseValue: 1,
      isChecked: false,
    },
    spotHidden: {
      value: 0,
      valueAddedByBaseValue: 25,
      isChecked: false,
    },
    mechanicalRepair: {
      value: 0,
      valueAddedByBaseValue: 10,
      isChecked: false,
    },
    jump: {
      value: 0,
      valueAddedByBaseValue: 20,
      isChecked: false,
    },
    listen: {
      value: 0,
      valueAddedByBaseValue: 20,
      isChecked: false,
    },
    fastTalk: {
      value: 0,
      valueAddedByBaseValue: 5,
      isChecked: false,
    },
    charm: {
      value: 0,
      valueAddedByBaseValue: 15,
      isChecked: false,
    },
    law: {
      value: 0,
      valueAddedByBaseValue: 5,
      isChecked: false,
    },
    disguise: {
      value: 0,
      valueAddedByBaseValue: 5,
      isChecked: false,
    },
    persuade: {
      value: 0,
      valueAddedByBaseValue: 10,
      isChecked: false,
    },
    sleightOfHand: {
      value: 0,
      valueAddedByBaseValue: 10,
      isChecked: false,
    },
    swim: {
      value: 0,
      valueAddedByBaseValue: 20,
      isChecked: false,
    },
    psychology: {
      value: 0,
      valueAddedByBaseValue: 10,
      isChecked: false,
    },
    languageOwn: {
      value: 0,
      valueAddedByBaseValue: statValues.education,
      isChecked: false,
    },
    history: {
      value: 0,
      valueAddedByBaseValue: 5,
      isChecked: false,
    },
    locksmith: {
      value: 0,
      valueAddedByBaseValue: 1,
      isChecked: false,
    },
    climb: {
      value: 0,
      valueAddedByBaseValue: 20,
      isChecked: false,
    },
    occult: {
      value: 0,
      valueAddedByBaseValue: 5,
      isChecked: false,
    },
    intimidate: {
      value: 0,
      valueAddedByBaseValue: 15,
      isChecked: false,
    },
    stealth: {
      value: 0,
      valueAddedByBaseValue: 20,
      isChecked: false,
    },
    firstAid: {
      value: 0,
      valueAddedByBaseValue: 30,
      isChecked: false,
    },
    medicine: {
      value: 0,
      valueAddedByBaseValue: 1,
      isChecked: false,
    },
    anthropology: {
      value: 0,
      valueAddedByBaseValue: 1,
      isChecked: false,
    },
    driveAuto: {
      value: 0,
      valueAddedByBaseValue: 20,
      isChecked: false,
    },
    libraryUse: {
      value: 0,
      valueAddedByBaseValue: 20,
      isChecked: false,
    },
    naturalWorld: {
      value: 0,
      valueAddedByBaseValue: 10,
      isChecked: false,
    },
    electricalRepair: {
      value: 0,
      valueAddedByBaseValue: 10,
      isChecked: false,
    },
    operateElectronics: {
      value: 0,
      valueAddedByBaseValue: 1,
      isChecked: false,
    },
    psychoanalysis: {
      value: 0,
      valueAddedByBaseValue: 1,
      isChecked: false,
    },
    operateHeavyMachine: {
      value: 0,
      valueAddedByBaseValue: 1,
      isChecked: false,
    },
    track: {
      value: 0,
      valueAddedByBaseValue: 10,
      isChecked: false,
    },
    operateComputer: {
      value: 0,
      valueAddedByBaseValue: 5,
      isChecked: false,
    },
    cthulhuMythos: {
      value: 0,
      valueAddedByBaseValue: 0,
      isChecked: false,
    },
    throw: {
      value: 0,
      valueAddedByBaseValue: 20,
      isChecked: false,
    },
    navigate: {
      value: 0,
      valueAddedByBaseValue: 10,
      isChecked: false,
    },
    accounting: {
      value: 0,
      valueAddedByBaseValue: 5,
      isChecked: false,
    },
    dodge: {
      value: 0,
      valueAddedByBaseValue: Math.floor(statValues.dex / 2),
      isChecked: false,
    },
    credit: {
      value: 0,
      valueAddedByBaseValue: 0,
      isChecked: false,
    },
  } as ISkills);

  const getAndSetStats = (key: string, value: number) => {
    setStatsValue({ ...statValues, [key]: value });
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
  };

  useEffect(() => {
    getMobility();
  }, [statValues.str, statValues.dex, statValues.size, statValues.age]);

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

  const skillsParams: SkillParams[][] = [
    // first row
    [
      {
        label: '감정',
        skillKey: 'appraise',
        baseValue: 5,
      },
      {
        label: '고고학',
        skillKey: 'archaeology',
        baseValue: 1,
      },
      {
        label: '과학 (1)',
        skillKey: 'science',
        baseValue: 1,
      },
      {
        label: '과학 (2)',
        skillKey: 'science',
        baseValue: 1,
      },
      {
        label: '과학 (3)',
        skillKey: 'science',
        baseValue: 1,
      },
      {
        label: '관찰력',
        skillKey: 'spotHidden',
        baseValue: 25,
      },
      {
        label: '근접전 (1)',
        skillKey: 'fighting',
        baseValue: 25,
      },
      {
        label: '근접전 (2)',
        skillKey: 'fighting',
        baseValue: 25,
      },
      {
        label: '근접전 (3)',
        skillKey: 'fighting',
        baseValue: 25,
      },
      {
        label: '기계수리',
        skillKey: 'mechanicalRepair',
        baseValue: 10,
      },
      {
        label: '도약',
        skillKey: 'jump',
        baseValue: 20,
      },
      {
        label: '듣기',
        skillKey: 'listen',
        baseValue: 20,
      },
      {
        label: '말재주',
        skillKey: 'fastTalk',
        baseValue: 5,
      },
      {
        label: '매혹',
        skillKey: 'charm',
        baseValue: 15,
      },
      {
        label: '법률',
        skillKey: 'law',
        baseValue: 5,
      },
    ],
    // second row
    [
      {
        label: '변장',
        skillKey: 'disguise',
        baseValue: 5,
      },
      {
        label: '사격 (1)',
        skillKey: 'firearms',
        baseValue: 20,
      },
      {
        label: '사격 (2)',
        skillKey: 'firearms',
        baseValue: 25,
      },
      {
        label: '사격 (3)',
        skillKey: 'firearms',
        baseValue: 1,
      },
      {
        label: '생존술 (??)',
        skillKey: 'survival',
        baseValue: 10,
      },
      {
        label: '설득',
        skillKey: 'persuade',
        baseValue: 10,
      },
      {
        label: '손놀림',
        skillKey: 'sleightOfHand',
        baseValue: 10,
      },
      {
        label: '수영',
        skillKey: 'swim',
        baseValue: 20,
      },
      {
        label: '심리학',
        skillKey: 'psychology',
        baseValue: 10,
      },
      {
        label: '언어 (모국어)',
        skillKey: 'languageOwn',
        baseValue: statValues.education,
      },
      {
        label: '언어 (외국어1)',
        skillKey: 'languageOther1',
        baseValue: 1,
      },
      {
        label: '언어 (외국어2)',
        skillKey: 'languageOther2',
        baseValue: 1,
      },
      {
        label: '언어 (외국어3)',
        skillKey: 'languageOther3',
        baseValue: 1,
      },
      {
        label: '역사',
        skillKey: 'history',
        baseValue: 5,
      },
      {
        label: '열쇠공',
        skillKey: 'locksmith',
        baseValue: 1,
      },
    ],
    // third row
    [
      {
        label: '예술/공예 (1)',
        skillKey: 'artcraft',
        baseValue: 5,
      },
      {
        label: '예술/공예 (2)',
        skillKey: 'artcraft',
        baseValue: 5,
      },
      {
        label: '예술/공예 (3)',
        skillKey: 'artcraft',
        baseValue: 5,
      },
      {
        label: '오르기',
        skillKey: 'climb',
        baseValue: 20,
      },
      {
        label: '오컽트',
        skillKey: 'occult',
        baseValue: 5,
      },
      {
        label: '위협',
        skillKey: 'intimidate',
        baseValue: 15,
      },
      {
        label: '은밀행동',
        skillKey: 'stealth',
        baseValue: 20,
      },
      {
        label: '응급처치',
        skillKey: 'firstAid',
        baseValue: 30,
      },
      {
        label: '의료',
        skillKey: 'medicine',
        baseValue: 1,
      },
      {
        label: '인류학',
        skillKey: 'anthropology',
        baseValue: 1,
      },
      {
        label: '자동차운전',
        skillKey: 'driveAuto',
        baseValue: 20,
      },
      {
        label: '자료조사',
        skillKey: 'libraryUse',
        baseValue: 20,
      },
      {
        label: '자연',
        skillKey: 'naturalWorld',
        baseValue: 10,
      },
      {
        label: '재력',
        skillKey: 'credit',
        baseValue: 0,
        checkboxDisabled: true,
      },
      {
        label: '전기수리',
        skillKey: 'electricalRepair',
        baseValue: 10,
      },
    ],
    // fourth row
    [
      {
        label: '전자기기',
        skillKey: 'operateElectronics',
        baseValue: 1,
      },
      {
        label: '정신분석',
        skillKey: 'psychoanalysis',
        baseValue: 1,
      },
      {
        label: '조종 (1)',
        skillKey: 'pilot',
        baseValue: 1,
      },
      {
        label: '중장비조작',
        skillKey: 'operateHeavyMachine',
        baseValue: 1,
      },
      {
        label: '추적',
        skillKey: 'track',
        baseValue: 10,
      },
      {
        label: '컴퓨터사용',
        skillKey: 'operateComputer',
        baseValue: 5,
      },
      {
        label: '크툴루신화',
        skillKey: 'cthulhuMythos',
        baseValue: 0,
        checkboxDisabled: true,
      },
      {
        label: '투척',
        skillKey: 'throw',
        baseValue: 20,
      },
      {
        label: '항법',
        skillKey: 'navigate',
        baseValue: 10,
      },
      {
        label: '회계',
        skillKey: 'accounting',
        baseValue: 5,
      },
      {
        label: '회피',
        skillKey: 'dodge',
        baseValue: Math.floor(statValues.dex / 2),
      },
      {
        label: 'something1',
        skillKey: 'rare',
        baseValue: 20,
      },
      {
        label: 'something2',
        skillKey: 'rare',
        baseValue: 20,
      },
      {
        label: 'something3',
        skillKey: 'rare',
        baseValue: 20,
      },
      {
        label: 'something4',
        skillKey: 'rare',
        baseValue: 20,
      },
    ],
  ];

  const explorerSkills = (
    <Container sx={{ padding: '0', paddingBottom: '10px', border: 'solid', marginTop: '16px' }}>
      <Text sx={{ backgroundColor: 'brown' }}>기능</Text>
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
