/* eslint-disable react/require-default-props */
import { Text, Stack, Grid, TextInput, UnstyledButton, Checkbox, Container } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import dice20 from '../assets/dice20.png';
import { rollDice } from '../services/dice.service';
import { isNumber } from '../services/utils.service';

interface StatsProps {
  value: number;
  valueDividedBy2: number;
  valueDividedBy5: number;
  isClassTraits: boolean;
}

interface StatsParams {
  statKey: string;
  label?: string;
  nDices?: number;
  nSides?: number;
  baseValue?: number;
  multiplyValue?: number;
  isClass?: boolean;
  getAndSetFunction: (key: string, value: number) => void;
}

export function Stats({
  statKey,
  label,
  nDices,
  nSides,
  baseValue = 0,
  isClass = false,
  multiplyValue = 1,
  getAndSetFunction,
}: StatsParams) {
  const [statValues, setStatValues] = useState<StatsProps>({
    value: 0,
    valueDividedBy2: 0,
    valueDividedBy5: 0,
    isClassTraits: false,
  });

  function setStats(stat: number) {
    setStatValues({
      value: stat,
      valueDividedBy2: Math.floor(stat / 2),
      valueDividedBy5: Math.floor(stat / 5),
      isClassTraits: statValues.isClassTraits,
    });
  }

  function rollStat() {
    if (!nDices || !nSides) return;
    const roll = rollDice(nDices, nSides);
    setStats((roll + baseValue) * multiplyValue);
  }

  useEffect(() => {
    getAndSetFunction(statKey, statValues.value);
  }, [statValues.value]);

  return (
    <Container>
      <Stack align="center" spacing={0} sx={{ border: '1px solid', borderRadius: '0.5em' }}>
        <Text align="center" fz="sm">
          {label} {multiplyValue !== 1 && '('}
          {nDices && nSides && `${nDices}D${nSides}`}
          {baseValue !== 0 && `+${baseValue}`}
          {multiplyValue !== 1 && ')'}
          {multiplyValue !== 1 && `*${multiplyValue}`}
        </Text>
        <Grid justify="center" align="center" sx={{ padding: '5px' }} grow>
          {isClass && (
            <Grid.Col span="content">
              <Checkbox
                checked={statValues.isClassTraits}
                size="xs"
                onChange={() => {
                  setStatValues({ ...statValues, isClassTraits: !statValues.isClassTraits });
                }}
              />
            </Grid.Col>
          )}
          <Grid.Col span={5}>
            <TextInput
              autoComplete="off"
              value={statValues.value}
              onChange={(event) => {
                if (!isNumber(event.currentTarget.value)) return;
                setStats(+event.currentTarget.value);
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Grid justify="center" align="center">
              <Grid.Col span={6}>
                <Text fz="xl">{statValues.value}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack spacing={0} align="center">
                  <Text fz="xs">{statValues.valueDividedBy2}</Text>
                  <Text fz="xs">{statValues.valueDividedBy5}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          {nDices && nSides && (
            <Grid.Col span="content">
              <UnstyledButton onClick={() => rollStat()}>
                <img src={dice20} alt="roll" width="15px" />
              </UnstyledButton>
            </Grid.Col>
          )}
        </Grid>
      </Stack>
    </Container>
  );
}
