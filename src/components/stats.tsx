/* eslint-disable react/require-default-props */
import { Text, Stack, Grid, TextInput, UnstyledButton, Checkbox, Container } from '@mantine/core';
import React, { useState } from 'react';
import { rollDice } from '../services/dice.service';
import { isNumber } from '../services/utils.service';
import dice20 from '../assets/dice20.png';

interface StatsProps {
  value: number;
  valueAddedBaseValue: number;
  valueDividedBy2: number;
  valueDividedBy5: number;
  isClassTraits: boolean;
}

interface StatsParams {
  statKey: string;
  label?: string;
  value: number;
  nDices?: number;
  nSides?: number;
  baseValue?: number;
  multiplyValue?: number;
  maxValue: number;
  isClass?: boolean;
  getAndSetFunction: (key: string, value: number) => void;
}

export function Stats({
  statKey,
  label,
  value,
  nDices,
  nSides,
  baseValue = 0,
  maxValue,
  isClass = false,
  multiplyValue = 1,
  getAndSetFunction,
}: StatsParams) {
  const [statValues, setStatValues] = useState<StatsProps>({
    value: Math.min(maxValue, value + baseValue) * multiplyValue,
    valueAddedBaseValue: Math.min(maxValue, value + baseValue) * multiplyValue,
    valueDividedBy2: Math.floor((Math.min(maxValue, value + baseValue) * multiplyValue) / 2),
    valueDividedBy5: Math.floor((Math.min(maxValue, value + baseValue) * multiplyValue) / 5),
    isClassTraits: false,
  });

  function setStats(stat: number) {
    setStatValues({
      value: stat,
      valueAddedBaseValue: stat,
      valueDividedBy2: Math.floor(stat / 2),
      valueDividedBy5: Math.floor(stat / 5),
      isClassTraits: statValues.isClassTraits,
    });
  }

  function rollStat() {
    if (!nDices || !nSides) return;
    const roll = rollDice(nDices, nSides);
    setStats((roll + baseValue) * multiplyValue);
    innerAfterHook((roll + baseValue) * multiplyValue)
  }

  function innerAfterHook(value: number) {
    getAndSetFunction(statKey, value);
  }

  return (
    <Container>
      <Stack align="center" spacing={0} sx={{ border: '1px solid', borderRadius: '0.5em' }}>
        <Text align="center" fz="sm">
          {label}
        </Text>
        <Grid justify="center" align="center" sx={{ paddingTop: '5px', paddingBottom: '5px' }}>
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
                innerAfterHook(+event.currentTarget.value)
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Grid justify="center" align="center">
              <Grid.Col span={6}>
                <Text fz="xl">{statValues.valueAddedBaseValue}</Text>
              </Grid.Col>
              <Grid.Col span={5}>
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
                <img src={dice20} alt="roll" width="20px" />
              </UnstyledButton>
            </Grid.Col>
          )}
        </Grid>
      </Stack>
    </Container>
  );
}
