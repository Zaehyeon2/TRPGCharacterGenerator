/* eslint-disable react/require-default-props */
import { Text, Stack, Grid, TextInput, Button, UnstyledButton, Group } from '@mantine/core';
import React, { useState } from 'react';
import { rollDice } from '../services/dice.service';

interface StatsProps {
  value: number;
  valueAddedBaseValue: number;
  valueDividedBy2: number;
  valueDividedBy5: number;
}

interface StatsParams {
  label?: string;
  value: number;
  nDices?: number;
  nSides?: number;
  baseValue?: number;
  maxValue: number;
}

export function Stats({ label, value, nDices, nSides, baseValue = 0, maxValue }: StatsParams) {
  const [statValues, setStatValues] = useState<StatsProps>({
    value,
    valueAddedBaseValue: Math.min(maxValue, value + baseValue),
    valueDividedBy2: Math.floor(Math.min(maxValue, value + baseValue) / 2),
    valueDividedBy5: Math.floor(Math.min(maxValue, value + baseValue) / 5),
  });

  function setStats(stat: number) {
    const valueAddedBaseValue = Math.min(maxValue, stat + baseValue);
    setStatValues({
      value: stat,
      valueAddedBaseValue,
      valueDividedBy2: Math.floor(valueAddedBaseValue / 2),
      valueDividedBy5: Math.floor(valueAddedBaseValue / 5),
    });
  }

  function rollStat() {
    if (!nDices || !nSides) return;
    const roll = rollDice(nDices, nSides);
    setStats(roll);
  }

  return (
    <Stack align="center" spacing={0} sx={{ border: '2px solid', borderRadius: '1em' }}>
      <Text align="center">{label}</Text>
      <Grid justify="center" align="center" sx={{ padding: '5px' }}>
        <Grid.Col span={5}>
          <TextInput
            value={statValues.value}
            onChange={(event) => {
              const numberedValue = Number(event.currentTarget.value);
              if (Number.isNaN(numberedValue) || numberedValue < 0) return;
              setStats(numberedValue);
            }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Grid justify="center" align="center">
            <Grid.Col span={6}>
              <Text>{statValues.valueAddedBaseValue}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack spacing={0} align="center">
                <Text>{statValues.valueDividedBy2}</Text>
                <Text>{statValues.valueDividedBy5}</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        {nDices && nSides && (
          <Grid.Col span={3}>
            <UnstyledButton onClick={() => rollStat()}>
              <img src="/src/assets/dice20.png" alt="roll" width="20px" />
            </UnstyledButton>
          </Grid.Col>
        )}
      </Grid>
    </Stack>
  );
}
