import { Card, Center, Container, Grid, Group, Stack, Text, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import logo from '../assets/coc-logo.png';
import { Stats } from '../components/stats';
import { isNumber } from '../services/utils.service';
import { explorerStyles } from '../styles/styles';
import { Logo } from '../components/logo';

interface IStats {
  job: string;
  age: number;
  str: number;
  dex: number;
  int: number;
  health: number;
  appeareance: number;
  mentality: number;
  size: number;
  education: number;
  mobility: number;
  luck: number;
}

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

  const getAndSetValue = (key: string, value: number) => {
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
            getAndSetFunction={getAndSetValue}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stats
            statKey="dex"
            label="민첩성"
            nDices={3}
            nSides={6}
            multiplyValue={5}
            getAndSetFunction={getAndSetValue}
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
            getAndSetFunction={getAndSetValue}
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
            getAndSetFunction={getAndSetValue}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stats
            statKey="appeareance"
            label="외모"
            nDices={3}
            nSides={6}
            multiplyValue={5}
            getAndSetFunction={getAndSetValue}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Stats
            statKey="mentality"
            label="정신력"
            nDices={3}
            nSides={6}
            multiplyValue={5}
            getAndSetFunction={getAndSetValue}
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
            getAndSetFunction={getAndSetValue}
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
            getAndSetFunction={getAndSetValue}
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
            getAndSetFunction={getAndSetValue}
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

  return (
    <Card withBorder radius="md">
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
    </Card>
  );
}
